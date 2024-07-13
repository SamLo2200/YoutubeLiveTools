import { TimeObject } from "@/types/TimeObject";

function convertSeconds(seconds: number, offsetInSec: number): TimeObject {
    const totalSeconds: number = seconds + offsetInSec;

    const hours: string = Math.floor(totalSeconds / 3600).toString();

    const minutes: string = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");

    const remainingSeconds: string = Math.floor(totalSeconds % 60)
        .toString()
        .padStart(2, "0");

    return {
        hours,
        minutes,
        seconds: remainingSeconds,
    };
}

export default convertSeconds;
