import LiveMarker from "@/components/marker/LiveMarker";
import NavBar from "@/components/NavBar";
import MarkerIcon from "../../Icons/MarkerIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StreamPicker from "./StreamPicker";

export default function Main() {
    // const pageOptions = ;

    return (
        <>
            <nav className="navbar-container fixed top-0 w-screen shadow-sm z-50 bg-white">
                <NavBar pageTitle="Timestamp 生成器">
                    <MarkerIcon />
                </NavBar>
            </nav>

            <aside className="sidebar-control fixed top-0 w-[400px] shadow-sm pt-20 p-4 px-9 h-screen bg-white text-sm">
                <StreamPicker />
            </aside>

            {/* <LiveMarker /> */}
        </>
    );
}
