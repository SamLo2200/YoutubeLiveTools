import getVideoInfo from "@/lib/youtube_api";
import { VideoListResponse } from "@/types/streamingInfo";
import { useEffect, useState } from "react";

export default function useFetchStreamingInfo(
    youtube_video_id: string
): VideoListResponse {
    const [streamingInfo, setStreamingInfo] = useState<VideoListResponse>();
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsFetching(true);
        (async () => {
            let data = await getVideoInfo(youtube_video_id);

            if (data !== undefined || data !== null) {
                setStreamingInfo(data);
                setIsFetching(false);
            }

            //Reserved for skeleton testing

            // setTimeout(() => {
            //     setStreamingInfo(data);
            //     setIsFetching(false);
            // }, 3000);
        })();
    }, [youtube_video_id]);

    if (isFetching) {
        throw Promise.resolve(null);
    } else {
        return streamingInfo as VideoListResponse;
    }
}
