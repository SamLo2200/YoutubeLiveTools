import useFetchStreamingInfo from "@/hooks/useFetchStreamingInfo";
import { useEffect, useState } from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import { useStreamingInfoStore, useVidStore } from "@/hooks/store/zustandStore";
import { StreamingInfoJson, VideoListResponse } from "@/types/streamingInfo";

export default function LiveStreamInfo() {
    const [videoInfoJson, setVideoInfoJson] = useState<any>(null);
    const setStreamingInfo = useStreamingInfoStore(
        (state: any) => state.addStreamingInfo
    );
    const getStreamingInfo = useStreamingInfoStore(
        (state: any) => state.streamingInfo
    );

    const vid = {
        get: useVidStore((state) => state.vid),
    };

    const [streamStartTime, setStreamStartTime] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string | null>(null);
    const [creator, setCreator] = useState<string | null>(null);

    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    const [thumbnaillHeight, setThumbnaillHeight] = useState<number>();
    const [thumbnaillWidth, setThumbnaillWidth] = useState<number>();

    const [fetchVideoInfoError, setFetchVideoInfoError] = useState<
        string | null
    >(null);

    //Obtain livestream info

    const jsonResponse: StreamingInfoJson = useFetchStreamingInfo(vid.get);

    useEffect(() => {
        if (jsonResponse) {
            // console.log(jsonResponse);
            try {
                if (!jsonResponse.ok) {
                    setFetchVideoInfoError(
                        `An error occured within the reponse. ${jsonResponse?.error?.code}: ${jsonResponse?.error?.message}`
                    );
                    throw `An error occured within the reponse. ${jsonResponse?.error?.code}: ${jsonResponse?.error?.message}`;
                } else {
                    setVideoInfoJson(jsonResponse);
                    setStreamingInfo(jsonResponse);
                }
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }, [jsonResponse, setStreamingInfo]);

    //Process recieved info
    useEffect(() => {
        if (videoInfoJson) {
            try {
                console.log(videoInfoJson);

                setStreamStartTime(
                    videoInfoJson.items[0].liveStreamingDetails
                        .actualStartTime as string
                );
                setVideoTitle(videoInfoJson.items[0].snippet.title as string);
                setCreator(
                    videoInfoJson.items[0].snippet.channelTitle as string
                );

                setThumbnailURL(
                    videoInfoJson.items[0].snippet.thumbnails.maxres
                        .url as string
                );
                setThumbnaillHeight(
                    videoInfoJson.items[0].snippet.thumbnails.maxres
                        .height as number
                );
                setThumbnaillWidth(
                    videoInfoJson.items[0].snippet.thumbnails.maxres
                        .width as number
                );
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }, [videoInfoJson]);

    return (
        <>
            <div className="info-card-thumbnail h-16 min-w-fit">
                {thumbnailURL && (
                    <Image
                        src={thumbnailURL}
                        height={thumbnaillHeight}
                        width={thumbnaillWidth}
                        alt="The video thumbnaill"
                        className="max-h-full w-auto object-contain rounded-lg"
                    />
                )}
            </div>
            <div className="info-card-meta-wrapper flex flex-col gap-1">
                <CardTitle className="info-card-title leading-[110%]">
                    {videoTitle}
                </CardTitle>
                <CardDescription className="info-card-creator">
                    {creator}
                </CardDescription>
            </div>
        </>
    );
}
