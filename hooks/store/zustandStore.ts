"use client";

import { streamingInfoJson } from "@/types/streamingInfo";
import { string } from "zod";
import { create } from "zustand";

export const useStreamingInfoStore = create((set) => ({
    streamingInfo: {},
    addStreamingInfo: (jsonData: streamingInfoJson) =>
        set({ streamingInfo: jsonData }),
}));

export const useVidStore = create<UseVidStoreType>((set) => ({
    vid: "",
    setVid: (vid) => set({ vid }),
}));
