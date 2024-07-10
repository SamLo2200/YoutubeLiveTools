import { Children, ReactNode } from "react";

interface NavBar {
    pageTitle: string;
    pageOption?: string[];
    children?: ReactNode;
}

export default function NavBar(props: NavBar) {
    return (
        <div className="flex flex-wrap items-center w-full justify-between mx-auto p-4 px-10">
            <div className="flex items-center gap-2">
                <span>{props.children}</span>
                <p className="text-base font-semibold ">{props.pageTitle}</p>
            </div>

            <div className="navigator text-lg font-semibold ">
                {props.pageOption?.map((option) => {
                    return <h4 key={option}>{option}</h4>;
                })}
            </div>
        </div>
    );
}
