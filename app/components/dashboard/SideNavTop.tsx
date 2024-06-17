"use client";
import {ChevronDown, LayoutGrid, LogOut, Settings, Users} from "lucide-react";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs";
import {Separator} from "@/components/ui/separator";
import {useConvex} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export interface TEAM {
    createdBy: String;
    teamName: String;
    _id: String;
}

const SideNavTop = ({user, setActiveTeamInfo}: any) => {
    const menu = [
        {
            id: 1,
            name: "Create Team",
            path: "/teams/create",
            icon: Users,
        },
        {
            id: 2,
            name: "Settings",
            path: "",
            icon: Settings,
        },
    ];
    const convex = useConvex();
    const router = useRouter();
    const [activeTeam, setActiveTeam] = useState<TEAM | null>(null);
    const [teamList, setTeamList] = useState<TEAM[]>([]);
    useEffect(() => {
        user && getTeamList();
    }, [user]);

    useEffect(() => {
        activeTeam && setActiveTeamInfo(activeTeam);
    }, [activeTeam]);

    const getTeamList = async () => {
        const res = await convex.query(api.teams.getTeam, {email: user?.email});
        console.log("Team List: ", res);
        setTeamList(res);
        setActiveTeam(res[0]);
    };
    const onMenuClick = (item: any) => {
        if (item.path) {
            router.push(item.path);
        }
    };
    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
                        <Image src="/logo.png" alt="logo" width={40} height={40}></Image>
                        <h2 className="flex gap-2 items-center font-bold text-[17px]">
                            {activeTeam?.teamName}
                            <ChevronDown />
                        </h2>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="ml-7 p-4">
                    {/* Team Section */}
                    <div>
                        {teamList?.map((team, idx) => (
                            <h2
                                onClick={() => setActiveTeam(team)}
                                className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer ${activeTeam?._id == team._id && "bg-blue-500 text-white"}`}
                                key={idx}>
                                {team.teamName}
                            </h2>
                        ))}
                    </div>
                    <Separator className="mt-2 bg-slate-100" />
                    {/* Option Section */}
                    <div>
                        {menu.map((item, idx) => (
                            <h2 onClick={() => onMenuClick(item)} key={idx} className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 rounded-lg text-sm">
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </h2>
                        ))}
                        <LogoutLink>
                            <h2 className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-100 rounded-lg text-sm">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </h2>
                        </LogoutLink>
                    </div>
                    <Separator className="mt-2 bg-slate-100" />
                    {/* User Info Section */}
                    {user && (
                        <div className="mt-2 flex gap-2 items-center">
                            <Image className="rounded-full" src={user?.picture} alt="user" width={30} height={30}></Image>
                            <div>
                                <h2 className="text-[14px] font-bold">
                                    {user?.given_name}
                                    {user?.family_name}
                                </h2>
                                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
            {/* All File Button */}
            <Button variant="outline" className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100 hover:bg-gray-200">
                <LayoutGrid className="h-5 w-5" />
                All Files
            </Button>
        </div>
    );
};

export default SideNavTop;
