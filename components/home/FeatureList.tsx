"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function FeatureList() {
    const router = useRouter();

    return <Button onClick={() => router.push("/marker")}>制作 Timestamp</Button>;
}
