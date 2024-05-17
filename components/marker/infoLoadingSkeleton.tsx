import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Skeleton } from "../ui/skeleton";
import "./InfoLoadingSkeleton.css";

export default function InfoLoadingSkeleton() {
    return (
        <>
            {/* <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div> */}

            <div className="info-card-thumbnail-skeleton">
                <Skeleton className="image" />
            </div>
            <div className="info-card-meta-wrapper-skeleton">
                <Skeleton className="info-card-title-skeleton" />
                <Skeleton className="info-card-creator-skeleton" />
            </div>
        </>
    );
}
