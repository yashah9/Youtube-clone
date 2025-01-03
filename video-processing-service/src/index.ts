import express, { Request, Response } from "express";
import { 
  uploadProcessedVideo,
  downloadRawVideo,
  deleteRawVideo,
  deleteProcessedVideo,
  convertVideo,
  setupDirectories
} from './storage';

setupDirectories();


const app = express();
app.use(express.json());


// Your other imports...
app.post("/process-video", async (req: Request, res: Response) => {
  let data;
  
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload received.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request: missing filename.');
    return; // Explicitly return to stop further processing
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  // Download the raw video from Cloud Storage
  await downloadRawVideo(inputFileName);

  try {
    // Process the video into 360p
    await convertVideo(inputFileName, outputFileName);
  } catch (err) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);
    res.status(500).send('Processing failed');
    return; // Explicitly return to stop further processing
  }

  // Upload the processed video to Cloud Storage
  await uploadProcessedVideo(outputFileName);

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName),
  ]);

  res.status(200).send('Processing finished successfully');
});

const port = process.env.PORT || 8080; // Default to 8080 if PORT is not set
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});