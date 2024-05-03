import FeatureList from "./FeatureList";

export default function HomePage() {
    return (
        <>
            <div className="title">
                <p className="text-center font-bold text-3xl flex items-center justify-center mt-20">
                    米亞直播工具箱
                </p>
            </div>

            <div className="flex items-center justify-center m-10">
                <FeatureList />
            </div>
        </>
    );
}
