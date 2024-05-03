import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { vidParser } from "@/lib/vidParser";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import getVideoInfo from "@/lib/youtube_api";
import { any } from "zod";

export default function LiveMarker() {
    const [isProvided, setIsProvided] = useState<boolean>(false);
    const [vid, setVid] = useState<string | null>(null);
    const [videoInfoJson, setVideoInfoJson] = useState<any>(null);
    const [streamStartTime, setStreamStartTime] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string | null>(null);
    const [creator, setCreator] = useState<string | null>(null);
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);

    //Obtain streaming info

    async function apiRequestHandler() {
        (async () => {
            // console.log(vid);
            setVideoInfoJson(await getVideoInfo(vid || "uWvRx-uawIk"));
        })();
    }

    useEffect(() => {
        if (videoInfoJson != null) {
            try {
                console.log(videoInfoJson);

                setStreamStartTime(
                    videoInfoJson.items[0].liveStreamingDetails.actualStartTime
                );
                setVideoTitle(videoInfoJson.items[0].snippet.title);
                setCreator(videoInfoJson.items[0].snippet.channelTitle);
                setThumbnailURL(videoInfoJson.items[0].snippet.thumbnails.standard.url);
            } catch (error: unknown) {
                console.error(error);
            }
        }
    }, [videoInfoJson]);

    useEffect(() => {
        if (streamStartTime || videoTitle || creator || thumbnailURL) {
            console.log(
                `Title:${videoTitle}, Creator:${creator}, Start Time:${streamStartTime}, Thumbnail:${thumbnailURL}`
            );
        }
    }, [streamStartTime, videoTitle, creator, thumbnailURL]);

    //Handle the form submission in the landing page.

    const FormHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        setVid(vidParser(formData.get("youtube-url")?.toString() || ""));
        setIsProvided(true);
    };

    useEffect(() => {
        if (vid) {
            apiRequestHandler();
        }
    }, [vid]);

    if (!isProvided) {
        return (
            <>
                <div className="flex flex-row pt-40 justify-center items-center">
                    <Card className="w-[26%] min-w-[300px]">
                        <CardHeader>
                            <CardTitle>Youtube Live Timestamp Creator</CardTitle>
                            <CardDescription className="">
                                Allowing you to record important moments of the live and export
                                it as a timestamp.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="grid w-full items-center gap-4"
                                onSubmit={FormHandler}
                            >
                                <Label htmlFor="youtube-url">Live URL</Label>
                                <Input type="text" name="youtube-url"></Input>
                                <Button type="submit"> Confirm </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    } else {
        return <></>;
    }
}
