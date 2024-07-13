"use client";
import { Button } from "@/components/ui/button";
import { useVideoInfoStore } from "@/hooks/store/zustandStore";
import convertSeconds from "@/lib/convertSeconds";
import { TimeObject } from "@/types/TimeObject";
import { useEffect, useState } from "react";
import { string } from "zod";

export default function LiveStreamStartTimer() {
    const getLiveStartTimeInTS: number = useVideoInfoStore((state) =>
        new Date(
            state.videoInfo?.items[0]?.liveStreamingDetails?.actualStartTime ??
                new Date("")
        ).getTime()
    );

    const [offsetInSec, setOffsetInSec] = useState<number>(-10);

    const [convertedTimeDif, setConvertedTimeDif] = useState<TimeObject>();

    setInterval(() => {
        let convertedObject = convertSeconds(
            (new Date().getTime() - getLiveStartTimeInTS) / 1000,
            offsetInSec
        );

        if (
            convertedObject.displayWithOffset.seconds &&
            convertedObject.displayWithoutOffset.seconds !== "NaN"
        ) {
            setConvertedTimeDif(convertedObject);
        }
    }, 5);

    if (convertedTimeDif) {
        return (
            <div className="timer-wrapper flex flex-col justify-center items-center py-5 gap-1 w-full">
                <p className="text-4xl font-extrabold text-slate-900">
                    {` ${convertedTimeDif.displayWithoutOffset.hours}:${convertedTimeDif.displayWithoutOffset.minutes}:${convertedTimeDif.displayWithoutOffset.seconds}`}
                </p>
                <p className="text-base font-normal flex flex-row items-center text-slate-900 gap-2">
                    {` ${convertedTimeDif.displayWithOffset.hours}:${convertedTimeDif.displayWithOffset.minutes}:${convertedTimeDif.displayWithOffset.seconds}`}
                    <span className="text-xs">{`(${offsetInSec} sec)`}</span>
                </p>

                <div className="action-center py-3 w-full flex justify-center items-center flex-row">
                    <Button className="record-button w-4/5">記錄</Button>
                </div>
            </div>
        );
    }
}
