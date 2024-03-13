const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({});

const videoUrl = "https://youtu.be/eFJGyT3C-Y0";
const videoUrlLong = "https://www.youtube.com/watch?v=eFJGyT3C-Y0&t=188s";

async function main() {
  try {
    const videoId = extractVideoID(videoUrlLong);
    console.log(` Video ID: ${videoId}`);

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const video = response.data.items[0];

    // Extract relevant information
    const title = video.snippet.title;
    const channel = video.snippet.channelTitle;
    const publishedDate = video.snippet.publishedAt;

    console.log(`Title: ${title}`);
    console.log(`Channel: ${channel}`);
    console.log(`Published At: ${publishedDate}`);

    // Request for transcription (if available)
    const transcriptResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    const transcriptList = transcriptResponse.data.items;
    console.log(transcriptList);

    const captionId = transcriptList[0].id;
    const transcriptUrl = `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=srt&key=${process.env.YOUTUBE_API_KEY}`;
    const transcriptData = await axios.get(transcriptUrl);
    console.log(transcriptData);
  } catch (error) {
    console.error(error);
  }
}

function extractVideoID(videoUrl) {
  const regex = /[?&]v=([^&#]*)/;
  const match = videoUrl.match(regex);
  return match ? match[1] : null;
}

main();
