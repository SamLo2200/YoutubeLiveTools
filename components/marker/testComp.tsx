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

    //Obtain livestream info
    let jsonResponse = useFetchStreamingInfo("V11f6AeUFB0");
    useEffect(() => {
        if (jsonResponse) {
            setVideoInfoJson(jsonResponse);
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
            } catch (error: unknown) {
                throw new Error(error);
            }
        }
    }, [videoInfoJson]);

    return (
        <div className="info-wrapper flex justify-center items-center pt-9 max-h-32">
            <Card className="w-[70%] min-w-[300px] min-h-[20px] max-h-32">
                <div className="flex items-center space-x-4 m-5 ">
                    <CardContent className="p-0 max-w-[30%] m-0">
                        {thumbnailURL && <Image src={thumbnailURL} height={thumbnaillHeight} width={thumbnaillWidth} alt="The video thumbnaill" className="rounded-md" />}
                    </CardContent>
                    <div className="">
                        <CardTitle className="leading-6">{videoTitle}</CardTitle>
                        <CardDescription className="">{creator}</CardDescription>
                    </div>
                </div>
            </Card>
        </div>
    );
}
