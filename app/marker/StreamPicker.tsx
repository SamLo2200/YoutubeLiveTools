"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import InfoLoadingSkeleton from "./StreamInfoCard/InfoLoadingSkeleton";
import LiveStreamInfo from "./StreamInfoCard/LiveStreamInfo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useVidStore } from "@/hooks/store/zustandStore";
import { vidParser } from "@/lib/vidParser";
import { Suspense, useState } from "react";

export default function StreamPicker() {
    const setVid = useVidStore((state) => state.setVid);
    const getVid = useVidStore((state) => state.vid);

    const [isProvided, setIsProvided] = useState<boolean>(false);

    function handleStreamURLSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get("url") != null) {
            setVid(vidParser(formData.get("url")?.toString() as string));
            setIsProvided(true);
        }
    }

    return (
        <div className="video-picker gap-2 flex flex-col">
            <p>直播連結</p>
            <div className="url-input">
                <form
                    onSubmit={handleStreamURLSubmit}
                    className="flex flex-row flex-nowrap gap-2">
                    <Input
                        className="basis-9/12"
                        name="url"
                        placeholder="eg. https://www.youtube.com/live/"></Input>

                    <Button className="basis-3/12" type="submit" value="submit">
                        確認
                    </Button>
                </form>
            </div>

            {
                /* Display Stream Info Card */

                isProvided && (
                    <div className="info-card-wrapper flex justify-center items-centers">
                        <Card className="info-card-parent flex items-center gap-3 w-full min-w-[300px] max-w-[1500px] mt-12 my-2 p-2">
                            <ErrorBoundary>
                                <Suspense fallback={<InfoLoadingSkeleton />}>
                                    <LiveStreamInfo />
                                </Suspense>
                            </ErrorBoundary>
                        </Card>
                    </div>
                )
            }
        </div>
    );
}
