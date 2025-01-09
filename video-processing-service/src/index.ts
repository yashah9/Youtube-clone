import express, { Request, Response } from "express";
import { uploadProcessedVideo, downloadRawVideo, deleteRawVideo, deleteProcessedVideo, convertVideo, setupDirectories,
} from "./storage";

// Set up necessary directories
setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req: Request, res: Response) => {
  let data;

  try {
    const message = Buffer.from(req.body.message.data, "base64").toString("utf8");
    data = JSON.parse(message);

    if (!data.name) {
      throw new Error("Invalid message payload received.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad Request: missing or invalid filename.");
    return; // Stop further processing
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  try {
    // Download the raw video from Cloud Storage
    console.log(`Downloading raw video: ${inputFileName}`);
    await downloadRawVideo(inputFileName);

    // Process the video into 360p
    console.log(`Processing video: ${inputFileName} -> ${outputFileName}`);
    await convertVideo(inputFileName, outputFileName);

    // Upload the processed video to Cloud Storage
    console.log(`Uploading processed video: ${outputFileName}`);
    await uploadProcessedVideo(outputFileName);
  } catch (err) {
    console.error("Error during video processing:", err);

    // Clean up raw and processed video files in case of failure
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);

    res.status(500).send("Processing failed");
    return; // Stop further processing
  }

  // Clean up raw and processed video files locally
  console.log(`Cleaning up local files: ${inputFileName}, ${outputFileName}`);
  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName),
  ]);

  res.status(200).send("Processing finished successfully");
});

// Set the port the server will listen on
const port = process.env.PORT || 8080; // Default to 8080 if PORT is not set
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});