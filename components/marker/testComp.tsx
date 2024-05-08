import useFetchStreamingInfo from "@/hooks/useFetchStreamingInfo";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";

export default function TestComp() {
    const [videoInfoJson, setVideoInfoJson] = useState<any>(null);
    const [streamStartTime, setStreamStartTime] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string | null>(null);
    const [creator, setCreator] = useState<string | null>(null);

    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
    const [thumbnaillHeight, setThumbnaillHeight] = useState<number>();
    const [thumbnaillWidth, setThumbnaillWidth] = useState<number>();

    const [fetchVideoInfoError, setFetchVideoInfoError] = useState<string | null>(null);

    //Obtain livestream info
    const jsonResponse: any = useFetchStreamingInfo("V11f6AeUFB0");
    useEffect(() => {
        if (jsonResponse) {
            try {
                if (!jsonResponse.ok) {
                    setFetchVideoInfoError(`An error occured within the reponse. ${jsonResponse.error.code}: ${jsonResponse.error.message}`);
                    throw new Error(`An error occured within the reponse. ${jsonResponse.error.code}: ${jsonResponse.error.message}`);
                } else {
                    setVideoInfoJson(jsonResponse);
                }
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }, [jsonResponse]);

    //Process recieved info
    useEffect(() => {
        if (videoInfoJson) {
            try {
                console.log(videoInfoJson);

                setStreamStartTime(videoInfoJson.items[0].liveStreamingDetails.actualStartTime as string);
                setVideoTitle(videoInfoJson.items[0].snippet.title as string);
                setCreator(videoInfoJson.items[0].snippet.channelTitle as string);

                setThumbnailURL(videoInfoJson.items[0].snippet.thumbnails.maxres.url as string);
                setThumbnaillHeight(videoInfoJson.items[0].snippet.thumbnails.maxres.height as number);
                setThumbnaillWidth(videoInfoJson.items[0].snippet.thumbnails.maxres.width as number);
            } catch (error: any) {
                throw new Error(error);
            }
        }
    }, [videoInfoJson]);

    return (
        <div className="info-card-wrapper">
            <Card className="info-card-parent">
                <div className="info-card-thumbnail">{thumbnailURL && <Image src={thumbnailURL} height={thumbnaillHeight} width={thumbnaillWidth} alt="The video thumbnaill" className="" />}</div>

                <div className="info-card-meta-wrapper">
                    <CardTitle className="info-card-title heading2">{videoTitle}</CardTitle>
                    <CardDescription className="info-card-creator">{creator}</CardDescription>
                </div>
            </Card>
        </div>
    );
}
