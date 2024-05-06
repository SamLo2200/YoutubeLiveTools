import useAPIFetch from "@/hooks/useAPIFetch";
import { useEffect, useState } from "react";

export default function TestComp() {
    const output = useAPIFetch();

    return (
        <div>
            <p>{output}</p>
        </div>
    );
}
