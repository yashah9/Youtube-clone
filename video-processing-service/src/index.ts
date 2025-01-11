import express from "express";
import { Request, Response } from "express";
import {
  uploadProcessedVideo,
  downloadRawVideo,
  deleteRawVideo,
  deleteProcessedVideo,
  convertVideo,
  setupDirectories,
} from "./storage";
import { isVideoNew, setVideo } from "./firestore";

// Setup necessary directories for processing
setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req: Request, res: Response) => {
  let data;

  try {
    // Parse the incoming message
    const message = Buffer.from(req.body.message.data, "base64").toString("utf8");
    data = JSON.parse(message);

    // Ensure the payload contains a valid file name
    if (!data.name) {
      throw new Error("Invalid message payload received.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Bad Request: Missing or invalid filename.");
    return; // Explicitly stop further processing
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;
  const videoId = inputFileName.split(".")[0];

  try {
    // Check if the video is already processed or in the process of being processed
    if (!(await isVideoNew(videoId))) {
      res.status(400).send("Bad Request: Video already processing or processed.");
      return;
    }

    // Mark the video as "processing" in the database
    await setVideo(videoId, {
      id: videoId,
      uid: videoId.split("-")[0],
      status: "processing",
    });

    // Download the raw video
    await downloadRawVideo(inputFileName);

    // Process the video into 360p
    await convertVideo(inputFileName, outputFileName);

    // Upload the processed video to Cloud Storage
    await uploadProcessedVideo(outputFileName);

    // Update the video status to "processed"
    await setVideo(videoId, {
      status: "processed",
      filename: outputFileName,
    });

    // Clean up local files
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);

    // Respond with success
    res.status(200).send("Processing finished successfully.");
  } catch (error) {
    console.error("Error during video processing:", error);

    // Clean up local files in case of an error
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);

    res.status(500).send("Processing failed.");
  }
});

// Start the server
const port = process.env.PORT || 8080; // Default to port 8080
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});