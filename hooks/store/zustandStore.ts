"use client";

import { VideoInfoJson } from "@/types/VideoInfoJson";
import { UseVideoInfoStoreType, UseVidStoreType } from "@/types/zusrandStore";
import { create } from "zustand";

export const useVideoInfoStore = create<UseVideoInfoStoreType>((set) => ({
    videoInfo: undefined,
    setVideoInfo: (videoInfo: VideoInfoJson) => set({ videoInfo: videoInfo }),
}));

export const useVidStore = create<UseVidStoreType>((set) => ({
    vid: "",
    setVid: (vid) => set({ vid }),
}));
