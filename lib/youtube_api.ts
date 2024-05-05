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
    // console.log("executed getVideoInfo");
    try {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}`
        );

        // Error testing

        // const response = await fetch(
        //     `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}s&key=${process.env.API_KEY}`
        // );

        if (!response.ok) {
            response.json().then((json: any) => {
                throw new Error(`${json.code}, ${json.error.message}`);
            });
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}

// export default async function getVideoInfo(youtube_video_id: string) {
//     // console.log("executed");
//     return new Promise<any>((resolve, reject) => {
//         (async function () {
//             try {
//                 console.log("executed");
//                 const response = await fetch(
//                     `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}`
//                 );
//                 if (!response.ok) {
//                     reject(
//                         new Error(`Network response was not ok. Status: ${response.status}`)
//                     );
//                 }
//                 const data = await response.json();
//                 console.log(data);
//                 resolve(data);
//             } catch (error: any) {
//                 if (error.json) {
//                     error.json().then((errorObject: YoutubeError) => {
//                         const errorMessage = `Error code: ${errorObject.error.code}, Message: ${errorObject.error.message}, Reason: ${errorObject.error.reason}`;
//                         console.log(errorMessage);
//                         reject(new Error(errorMessage));
//                     });
//                 } else {
//                     reject(new Error(`Error fetching data: ${error}`));
//                 }
//             }
//         });
//     });
// }
