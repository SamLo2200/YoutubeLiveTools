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

        if (!isNaN(convertedObject.seconds)) {
            setConvertedTimeDif(convertedObject);
        }
    }, 5);

    return (
        <div>
            <p>
                {" "}
                The stream started at:
                {convertedTimeDif &&
                    ` ${convertedTimeDif?.hours}:${convertedTimeDif?.minutes}:${convertedTimeDif?.seconds}`}
            </p>
        </div>
    );
}
