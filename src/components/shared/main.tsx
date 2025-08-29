import { Active } from "./active"
import { All } from "./all"
import { useState } from "react"
import { Completed } from "./completed"
import { cn } from "../../lib/utils"

const enum Tab {
    All = "ALL",
    Active = "ACTIVE",
    Comlited = "COMPLITED"
}

export const Main = () => {
    const [activeTab, setActiveTab] = useState("ALL")

    return (
        <div className={"max-w-6xl mx-auto h-screen flex items-center "}>
            <div className={"w-full"}>
                <h1 className={"text-[#eadbda] text-center"}>todos</h1>
                <div className={"shadow relative"}>
                    <div className={cn("absolute w-full transition-all duration-500 ease-in-out", activeTab === Tab.All ? "z-20 scale-100 translate-y-0" : "z-10 scale-95 translate-y-4 opacity-75")}>
                        <All activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    <div className={cn("absolute w-full transition-all duration-500 ease-in-out", activeTab === Tab.Active ? "z-20 scale-100 translate-y-0" : "z-10 scale-95 translate-y-4 opacity-75")}>
                        <Active activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                    <div className={cn("absolute w-full transition-all duration-500 ease-in-out", activeTab === Tab.Comlited ? "z-20 scale-100 translate-y-0" : "z-10 scale-95 translate-y-4 opacity-75")}>
                        <Completed activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>
            </div>
        </div>
    )
}