"use client";
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

    return (
        <div>
            <p>
                {" "}
                The stream started at:
                {convertedTimeDif &&
                    ` ${convertedTimeDif.displayWithoutOffset.hours}:${convertedTimeDif.displayWithoutOffset.minutes}:${convertedTimeDif.displayWithoutOffset.seconds}`}
            </p>
            <br></br>
            <p>
                {" "}
                The stream started at (With Offset):
                {convertedTimeDif &&
                    ` ${convertedTimeDif.displayWithOffset.hours}:${convertedTimeDif.displayWithOffset.minutes}:${convertedTimeDif.displayWithOffset.seconds}`}
            </p>
        </div>
    );
}
