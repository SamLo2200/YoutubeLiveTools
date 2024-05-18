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
import InfoLoadingSkeleton from "./InfoLoadingSkeleton";
import LiveStreamInfo from "./LiveStreamInfo";
import ErrorBoundary from "../ErrorBoundary";

export default function LiveMarker() {
    const [isProvided, setIsProvided] = useState<boolean>(false);
    const [vid, setVid] = useState<string | null>(null);

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

    // function mark() {
    //     if (streamStartTime) {
    //         let startTime = new Date(streamStartTime);
    //         console.log(startTime.getTimezoneOffset() / 60);
    //         let currentTime = new Date();
    //         console.log(currentTime.getTimezoneOffset() / 60);

    //         let minutesDifference =
    //             (currentTime.getTime() - startTime.getTime()) / 60000;
    //         console.log(minutesDifference);

    //         //10 seconds delay
    //         let minutesDifOffset: number = minutesDifference - 0.166667;
    //         let hours = Math.floor(minutesDifOffset / 60);
    //         let remainingMinutes = Math.floor(minutesDifOffset % 60);
    //         let seconds = Math.floor((minutesDifOffset * 60) % 60);

    //         //prettier-ignore
    //         let output = `${hours}:${String(remainingMinutes).padStart(2, "0")}:${String(seconds).padStart(2,"0")}`;
    //         console.log(output);
    //     }
    // }

    if (!isProvided) {
        return (
            <>
                <div className="flex flex-row pt-40 justify-center items-center">
                    <Card className="w-[26%] min-w-[300px]">
                        <CardHeader>
                            <CardTitle>
                                Youtube Live Timestamp Creator
                            </CardTitle>
                            <CardDescription className="">
                                Allowing you to record important moments of the
                                live and export it as a timestamp.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="grid w-full items-center gap-4"
                                onSubmit={FormHandler}>
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
                <div className="info-card-wrapper">
                    <Card className="info-card-parent">
                        <ErrorBoundary>
                            <Suspense fallback={<InfoLoadingSkeleton />}>
                                <LiveStreamInfo />
                            </Suspense>
                        </ErrorBoundary>
                    </Card>
                </div>
            </>
        );
    }
}
