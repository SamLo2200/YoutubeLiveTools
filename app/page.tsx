"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

import { vidParser } from "@/util/vidParser";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Main() {
    const [isProvided, setIsProvided] = useState<boolean>(false);
    const [vid, setVid] = useState<String | null>("");

    const formHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        console.log(formData.get("youtube-url"));

        setVid(vidParser(formData.get("youtube-url")?.toString() || ""));
        setIsProvided(true);
    };

    if (!isProvided) {
        return (
            <>
                <div className="flex flex-row pt-40 justify-center items-center">
                    <Card className="w-[26%] min-w-[300px]">
                        <CardHeader>
                            <CardTitle>Youtube Live Timestamp Creator</CardTitle>
                            <CardDescription className="">
                                Allowing you to record important moments of the live and export
                                it as a timestamp.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="grid w-full items-center gap-4"
                                onSubmit={formHandler}
                            >
                                <Label htmlFor="youtube-url">Live URL</Label>
                                <Input type="text" name="youtube-url"></Input>
                                <Button type="submit"> Confirm </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </>
        );
    } else {
        return (
            <>
                <p>{vid}</p>
            </>
        );
    }
}
