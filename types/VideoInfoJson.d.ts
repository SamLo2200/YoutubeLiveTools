interface Thumbnail {
    url?: string;
    width?: number;
    height?: number;
}

interface Localized {
    title?: string;
    description?: string;
}

interface Snippet {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: {
        default?: Thumbnail;
        medium?: Thumbnail;
        high?: Thumbnail;
        standard?: Thumbnail;
        maxres?: Thumbnail;
    };
    channelTitle?: string;
    categoryId?: string;
    liveBroadcastContent?: string;
    localized?: Localized;
}

interface LiveStreamingDetails {
    actualStartTime?: Date;
    actualEndTime?: Date;
    scheduledStartTime?: Date;
}

interface Item {
    kind?: string;
    etag?: string;
    id?: string;
    snippet?: Snippet;
    liveStreamingDetails?: LiveStreamingDetails;
}

interface PageInfo {
    totalResults?: number;
    resultsPerPage?: number;
}

interface VideoListResponse {
    ok: boolean;
    kind: string;
    etag: string;
    items: Item[];
    pageInfo: PageInfo;
}

interface ErrorReponse {
    ok: boolean;
    error?: {
        code?: number;
        message?: string;
    };
}

export type VideoInfoJson = VideoListResponse & ErrorReponse;
