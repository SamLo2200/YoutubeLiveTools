"use client";
import { useVideoInfoStore } from "@/hooks/store/zustandStore";
import convertSeconds from "@/lib/convertSeconds";
import { TimeObject } from "@/types/TimeObject";

import { useEffect, useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TimeRecord, TimestampRecord } from "@/types/TimestampRecords";

export default function LiveStreamStartTimer() {
    // state that will be passed to convertSeconds parameter
    const getLiveStartTimeInTS: number = useVideoInfoStore((state) =>
        new Date(
            state.videoInfo?.items[0]?.liveStreamingDetails?.actualStartTime ??
                new Date("")
        ).getTime()
    );

    const [offsetInSec, setOffsetInSec] = useState<number>(-10);

    // State that handle convertSeconds return
    const [convertedTimeDif, setConvertedTimeDif] = useState<TimeObject>();

    // Pending records by the user
    const [chosenTimestamp, setChosenTimestamp] = useState<string>("");
    const [pendingDescription, setPendingDescription] = useState<string>("");

    // Handle timestamps store
    const [timestampRecords, addTimestampRecords] = useState<TimestampRecord>({
        items: [{ timestamp: "0:00:00", description: "Intro" }],
    });

    function addRecord(newTimestampRecord: TimeRecord): void {
        addTimestampRecords((prevTimestampRecords) => ({
            items: [...prevTimestampRecords.items, newTimestampRecord],
        }));
    }

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

    function record() {
        if (convertedTimeDif?.displayWithOffset.seconds) {
            setChosenTimestamp(
                ` ${convertedTimeDif?.displayWithOffset.hours}:${convertedTimeDif?.displayWithOffset.minutes}:${convertedTimeDif?.displayWithOffset.seconds}`
            );
        }
    }

    function confirmInputDialog() {
        navigator.clipboard.writeText(
            `${chosenTimestamp} ${pendingDescription} for vercel`
        );

        // Test feature

        addRecord({
            timestamp: chosenTimestamp,
            description: pendingDescription,
        });

        // Reset state
        setChosenTimestamp("");
        setPendingDescription("");
    }

    if (convertedTimeDif) {
        return (
            <div className="timer-wrapper flex flex-col justify-center items-center py-5 gap-1 w-full">
                <p className="text-4xl font-extrabold text-slate-900">
                    {` ${convertedTimeDif?.displayWithoutOffset.hours}:${convertedTimeDif?.displayWithoutOffset.minutes}:${convertedTimeDif?.displayWithoutOffset.seconds}`}
                </p>
                <p className="text-base font-normal flex flex-row items-center text-slate-900 gap-2">
                    {` ${convertedTimeDif?.displayWithOffset.hours}:${convertedTimeDif?.displayWithOffset.minutes}:${convertedTimeDif?.displayWithOffset.seconds}`}
                    <span className="text-xs">{`(${offsetInSec} sec)`}</span>
                </p>

                <div className="action-center py-3 w-full flex justify-center items-center flex-row">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="record-button w-4/5"
                                onClick={record}>
                                記錄
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    請為 {chosenTimestamp} 輸入簡介
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    <Input
                                        placeholder="請輸入 Timestamp 簡介"
                                        onChange={(event) =>
                                            setPendingDescription(
                                                event.target.value
                                            )
                                        }></Input>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmInputDialog}>
                                    完成
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <ul className="flex flex-col justify-center items-center text-slate-900">
                    {timestampRecords.items.map((item, index) => (
                        <li key={index}>
                            {item.timestamp}: {item.description}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
