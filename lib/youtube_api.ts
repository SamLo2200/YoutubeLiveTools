"use server";

import { text } from "stream/consumers";

interface YoutubeError {
    error: {
        code: number;
        message: string;
        reason: string;
    };
}

// export default async function testingPromise(youtube_video_id: string) {
//     return new Promise<string>((resolve, reject) => {
//         setTimeout(() => {
//             resolve(youtube_video_id);
//         }, 10000);
//     });
// }

export default async function getVideoInfo(youtube_video_id: string) {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}`);

    // Error testing

    // const response = await fetch(
    //     `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}s`
    // );

    const data = await response.json();
    if (data.items == null || data.items.length === 0) {
        // console.log(data);
        return {
            ok: false,
            error: {
                code: data?.error?.code ?? 400,
                message: data?.error?.message ?? "It is not a livestream or is unavailable",
            },
        };
    }
    if (response.ok) {
        return { ok: true, ...data };
    }
    return { ok: false, ...data };
}
