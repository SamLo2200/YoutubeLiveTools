"use server";

export default async function getVideoInfo(youtube_video_id: string) {
    console.log("executed getVideoInfo");
    try {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
