export interface TimeObject {
    displayWithoutOffset: DisplayWithoutOffset;
    displayWithOffset: DisplayWithOffset;
}

interface DisplayWithoutOffset {
    hours: string;
    minutes: string;
    seconds: string;
}

interface DisplayWithOffset {
    hours: string;
    minutes: string;
    seconds: string;
}
