interface Welcome {
    ok?: boolean;
    kind?: string;
    etag?: string;
    pageInfo?: PageInfo;
}

interface LiveStreamingDetails {
    actualStartTime?: Date;
    actualEndTime?: Date;
    scheduledStartTime?: Date;
}

interface PageInfo {
    totalResults?: number;
    resultsPerPage?: number;
}

interface ErrorReponse {
    error?: {
        code: number;
        message: string;
    };
}

export type streamingInfoJson =
    | ((Welcome | LiveStreamingDetails | PageInfo) & ErrorReponse)
    | null;
