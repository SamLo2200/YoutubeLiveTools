import { VideoInfoJson } from "./VideoInfoJson";

interface UseVidStoreType {
    vid: string;
    setVid: (vid: string) => void;
}

interface UseVideoInfoStoreType {
    videoInfo: VideoInfoJson | undefined;
    setVideoInfo: (videoInfo: VideoInfoJson) => void;
}
