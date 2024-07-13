import { TimeObject } from "@/types/TimeObject";

interface ReturnTimeObject {
    hours: string;
    minutes: string;
    seconds: string;
}

function convertSeconds(seconds: number, offsetInSec: number): TimeObject {
    let convertWithoutOffsetResult: ReturnTimeObject =
        convertWithoutOffset(seconds);

    let convertWithOffsetResult: ReturnTimeObject = convertWithOffset(
        seconds,
        offsetInSec
    );

    return {
        displayWithoutOffset: convertWithoutOffsetResult,
        displayWithOffset: convertWithOffsetResult,
    };
}

function convertWithoutOffset(seconds: number): ReturnTimeObject {
    const hours: string = Math.floor(seconds / 3600).toString();

    const minutes: string = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");

    const remainingSeconds: string = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return {
        hours: hours,
        minutes: minutes,
        seconds: remainingSeconds,
    };
}

function convertWithOffset(
    seconds: number,
    offsetInSec: number
): ReturnTimeObject {
    // Calculate the total seconds after offset
    const totalSeconds: number = seconds + offsetInSec;

    const hours: string = Math.floor(totalSeconds / 3600).toString();

    const minutes: string = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");

    const remainingSeconds: string = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");

    return {
        hours: hours,
        minutes: minutes,
        seconds: remainingSeconds,
    };
}

export default convertSeconds;
