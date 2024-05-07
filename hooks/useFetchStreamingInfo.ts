import getVideoInfo from "@/lib/youtube_api";
import { useEffect, useState } from "react";

export default function useFetchStreamingInfo(youtube_video_id: string) {
    const [streamingInfo, setStreamingInfo] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsFetching(true);
        (async () => {
            let data = await getVideoInfo(youtube_video_id);

            setTimeout(() => {
                setStreamingInfo(data);
                setIsFetching(false);
            }, 1000);
        })();
    }, [youtube_video_id]);

    if (isFetching) {
        throw Promise.resolve(null);
    } else {
        return streamingInfo;
    }
}

// return fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20liveStreamingDetails&id=${youtube_video_id}&key=${process.env.API_KEY}`)
//     .then((response) => {
//         if (!response.ok) {
//             return {
//                 ok: false,
//                 error: {
//                     code: 502,
//                     message: "Network reponse was not ok.",
//                 },
//             };
//         }

//         return response.json();
//     })
//     .then((data) => {
//         if (data.items == null || data.items.length === 0) {
//             console.log(data);
//             return {
//                 ok: false,
//                 error: {
//                     code: data?.error?.code ?? 400,
//                     message: data?.error?.message ?? "It is not a livestream or is unavailable",
//                 },
//             };
//         }
//         return { ok: true, ...data };
//     })
//     .catch((error) => {
//         console.error("Error fetching video info:", error);
//         return {
//             ok: false,
//             error: {
//                 code: 500,
//                 message: "An error occurred while fetching video info.",
//             },
//         };
//     });
// }
