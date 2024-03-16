import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="flex flex-col pt-5 text-sm text-center text-gray-600 dark:text-gray-600">
                <Link
                    className="hover:underline font-semibold"
                    href="https://github.com/SamLo2200/"
                >
                    Created by Sam Lo
                </Link>

                <Link
                    className="hover:underline"
                    href="https://github.com/SamLo2200/youtube-timestamp-generator-web/tree/main"
                >
                    Source Code
                </Link>
            </div>
        </footer>
    );
}
