import { useEffect, useState } from "react";

function useAPIFetch() {
    const [data, setData] = useState<unknown | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    if (loading) {
        // throw Promise.resolve(null);
        throw new Promise((resolve) => {
            resolve(null);
        });
    } else {
        return "Hello World";
    }
}

export default useAPIFetch;
