"use client";
import SideNav from "@/app/components/dashboard/SideNav";
import {FileListContext} from "@/app/context/FileListContext";
import {api} from "@/convex/_generated/api";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {useConvex} from "convex/react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const router = useRouter();
    const convex = useConvex();
    const {user}: any = useKindeBrowserClient();
    const [fileList, setFileList] = useState();

    useEffect(() => {
        user && checkTeam();
    }, [user]);

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, {email: user?.email});
        if (!result?.length) {
            router.push("teams/create");
        }
    };
    return (
        <div>
            <FileListContext.Provider value={{fileList, setFileList}}>
                <div className="grid grid-cols-4">
                    <div className="bg-white h-screen w-72 fixed">
                        <SideNav />
                    </div>
                    <div className="col-span-4 ml-72">{children}</div>
                </div>
            </FileListContext.Provider>
        </div>
    );
};

export default DashboardLayout;
