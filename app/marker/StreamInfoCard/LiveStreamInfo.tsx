import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import { useVideoInfoStore, useVidStore } from "@/hooks/store/zustandStore";
import { VideoInfoJson } from "@/types/VideoInfoJson";
import useFetchVideoInfo from "@/hooks/useFetchVideoInfo";

export default function LiveStreamInfo() {
    // const [videoInfoJson, setVideoInfoJson] = useState<StreamingInfoJson>();

    // Defining Zustand Hooks
    // ==============
    const setVideoInfo = useVideoInfoStore((state) => state.setVideoInfo);
    const getVideoInfo = useVideoInfoStore((state) => state.videoInfo);

    const getVid = useVidStore((state) => state.vid);

    // ================

    //Obtain livestream info
    const jsonResponse: VideoInfoJson = useFetchVideoInfo(getVid);

    useEffect(() => {
        if (jsonResponse) {
            // console.log(jsonResponse);
            try {
                if (!jsonResponse.ok) {
                    throw `An error occured within the reponse. ${jsonResponse?.error?.code}: ${jsonResponse?.error?.message}`;
                } else {
                    setVideoInfo(jsonResponse);
                }
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }, [jsonResponse, setVideoInfo]);

    return (
        <>
            <div className="info-card-thumbnail h-16 min-w-fit">
                <Image
                    src={
                        getVideoInfo?.items[0]?.snippet?.thumbnails?.maxres
                            ?.url ?? ""
                    }
                    height={
                        getVideoInfo?.items[0]?.snippet?.thumbnails?.maxres
                            ?.height
                    }
                    width={
                        getVideoInfo?.items[0]?.snippet?.thumbnails?.maxres
                            ?.width
                    }
                    alt="The video thumbnaill"
                    className="max-h-full w-auto object-contain rounded-lg"
                />
            </div>

            <div className="info-card-meta-wrapper">
                <CardTitle className="info-card-title leading-[110%]">
                    {getVideoInfo?.items[0]?.snippet?.title}
                </CardTitle>
                <CardDescription className="info-card-creator">
                    {getVideoInfo?.items[0]?.snippet?.channelTitle}
                </CardDescription>
            </div>
        </>
    );
}
