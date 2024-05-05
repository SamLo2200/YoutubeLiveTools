import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";

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
import Image from "next/image";
import { error } from "console";
import testingPromise from "@/lib/youtube_api";

export default function LiveMarker() {
    const [isProvided, setIsProvided] = useState<boolean>(false);
    const [vid, setVid] = useState<string | null>(null);
    const [videoInfoJson, setVideoInfoJson] = useState<any>(null);
    const [streamStartTime, setStreamStartTime] = useState<string | null>(null);
    const [videoTitle, setVideoTitle] = useState<string | null>(null);
    const [creator, setCreator] = useState<string | null>(null);
    const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);

    const [fetchVideoInfoError, setFetchVideoInfoError] = useState<string | null>(null);

    //Obtain streaming info

    useEffect(() => {
        if (vid) {
            (async function () {
                try {
                    const data = await getVideoInfo(vid);
                    console.log(data);
                    if (!data.ok) {
                        setFetchVideoInfoError(
                            `An error occured within the reponse. ${data.error.code}: ${data.error.message}`
                        );
                        throw new Error(
                            `An error occured within the reponse. ${data.error.code}: ${data.error.message}`
                        );
                    }
                    setVideoInfoJson(data);
                } catch (error) {
                    throw new Error(`${error}`);
                }
            })();

            // (async function () {
            //     try {
            //         const data: string = await testingPromise(vid);
            //         console.log(data);
            //     } catch (error) {
            //         throw new Error(error);
            //     }
            // })();
        }
    }, [vid]);

    useEffect(() => {
        if (videoInfoJson != null) {
            try {
                console.log(videoInfoJson);

                setStreamStartTime(
                    videoInfoJson.items[0].liveStreamingDetails.actualStartTime
                );
                setVideoTitle(videoInfoJson.items[0].snippet.title);
                setCreator(videoInfoJson.items[0].snippet.channelTitle);
                setThumbnailURL(videoInfoJson.items[0].snippet.thumbnails.maxres.url);
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

        if (formData.get("youtube-url")?.toString() !== "") {
            setVid(vidParser(formData.get("youtube-url")?.toString() || ""));
            setIsProvided(true);
        } else {
            throw new Error("The input is invaild");
        }
    };

    function mark() {
        if (streamStartTime) {
            let startTime = new Date(streamStartTime);
            console.log(startTime.getTimezoneOffset() / 60);
            let currentTime = new Date();
            console.log(currentTime.getTimezoneOffset() / 60);

            let minutesDifference = (currentTime.getTime() - startTime.getTime()) / 60000;
            console.log(minutesDifference);

            //10 seconds delay
            let minutesDifOffset: number = minutesDifference - 0.166667;
            let hours = Math.floor(minutesDifOffset / 60);
            let remainingMinutes = Math.floor(minutesDifOffset % 60);
            let seconds = Math.floor((minutesDifOffset * 60) % 60);

            //prettier-ignore
            let output = `${hours}:${String(remainingMinutes).padStart(2, "0")}:${String(seconds).padStart(2,"0")}`;
            console.log(output);
        }
    }

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
        return (
            <>
                <div className="video-info-card flex flex-row pt-40 justify-center items-center">
                    <Card className="w-[26%] min-w-[300px]">
                        <Suspense fallback={<p>loading...</p>}>
                            {fetchVideoInfoError && (
                                <CardDescription className="m-7">
                                    {fetchVideoInfoError}
                                </CardDescription>
                            )}
                            <div className="">
                                <CardTitle className="m-7 leading-6">{videoTitle}</CardTitle>
                                <CardDescription className="m-7 -mt-5">
                                    {creator}
                                </CardDescription>
                                <CardContent className="-mt-3">
                                    {thumbnailURL && (
                                        <Image
                                            src={thumbnailURL}
                                            height="280"
                                            width="640"
                                            alt="The video thumbnaill"
                                            className="rounded-2xl"
                                        />
                                    )}
                                </CardContent>
                            </div>
                        </Suspense>
                    </Card>

                    <Button onClick={mark}>記錄</Button>
                </div>
            </>
        );
    }
}
