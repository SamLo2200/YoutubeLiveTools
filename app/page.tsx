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
                <div className="flex flex-col items-center justify-center">
                    <Card className="w-[30%] ">
                        <CardHeader>
                            <CardTitle>Youtube Live Timestamp Creator</CardTitle>
                            <CardDescription className="">
                                Allowing you to record imporant momenets of the live
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="grid w-full items-center gap-4"
                                onSubmit={formHandler}
                            >
                                <Input type="text" name="youtube-url"></Input>
                                <Button type="submit"> Confirm </Button>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <p>Created by Sam Lo ❤️</p>
                        </CardFooter>
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
