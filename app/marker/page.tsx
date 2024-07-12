import NavBar from "@/components/NavBar";
import MarkerIcon from "../../Icons/MarkerIcon";
import LiveStreamPicker from "./LiveStreamPicker";
import LiveStreamStartTimer from "./LiveStreamStartTimer";

export default function Main() {
    // const pageOptions = ;

    return (
        <>
            <nav className="navbar-container fixed top-0 w-screen shadow-sm z-50 bg-white">
                <NavBar pageTitle="Timestamp 生成器">
                    <MarkerIcon />
                </NavBar>
            </nav>

            <aside className="sidebar-control fixed top-0 w-[450px] shadow-sm pt-24 p-4 px-9 h-screen bg-white text-sm">
                <LiveStreamPicker />

                <div className="breakline flex justify-center items-center">
                    <hr className="my-3 w-[93%]"></hr>
                </div>

                <LiveStreamStartTimer />
            </aside>
        </>
    );
}
