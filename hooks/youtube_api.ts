"use server";

export default async function getVideoInfo(youtube_video_id: string) {
    const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
