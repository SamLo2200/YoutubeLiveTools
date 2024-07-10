import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Skeleton } from "../../../components/ui/skeleton";
// import "./InfoLoadingSkeleton.css";

export default function InfoLoadingSkeleton() {
    return (
        <>
            <div className="info-card-thumbnail-skeleton flex items-center justify-between">
                <Skeleton className="image h-16 w-[127px] rounded" />
            </div>
            <div className="info-card-meta-wrapper-skeleton flex flex-col gap-1 flex-[0.8]">
                <Skeleton className="info-card-title-skeleton w-full max-w-[20rem] h-4" />
                <Skeleton className="info-card-creator-skeleton w-1/2 max-w-[10rem] h-4" />
            </div>
        </>
    );
}
