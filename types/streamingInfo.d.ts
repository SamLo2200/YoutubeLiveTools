export interface Welcome {
    ok?: boolean;
    kind?: string;
    etag?: string;
    items?: Item[];
    pageInfo?: PageInfo;
}

export interface Items {
    kind?: string;
    etag?: string;
    id?: string;
    snippet?: Snippet;
    liveStreamingDetails?: LiveStreamingDetails;
}

export interface LiveStreamingDetails {
    actualStartTime?: Date;
    actualEndTime?: Date;
    scheduledStartTime?: Date;
}

export interface Snippet {
    publishedAt?: Date;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: Thumbnails;
    channelTitle?: string;
    categoryId?: string;
    liveBroadcastContent?: string;
    localized?: Localized;
    defaultAudioLanguage?: string;
}

export interface Localized {
    title?: string;
    description?: string;
}

export interface Thumbnails {
    default?: Default;
    medium?: Default;
    high?: Default;
    standard?: Default;
    maxres?: Default;
}

export interface Default {
    url?: string;
    width?: number;
    height?: number;
}

export interface PageInfo {
    totalResults?: number;
    resultsPerPage?: number;
}

export interface ErrorReponse {
    error: {
        code: number;
        message: string;
    };
}

export type streamingInfoJson =
    | Welcome
    | Items
    | LiveStreamingDetails
    | Snippet
    | Localized
    | Thumbnails
    | Default
    | PageInfo
    | ErrorReponse
    | null;
