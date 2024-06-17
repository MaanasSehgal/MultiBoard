import React, {useState} from "react";
import SideNavTop, {TEAM} from "./SideNavTop";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottom from "./SideNavBottom";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";

const SideNav = () => {
    const {user} = useKindeBrowserClient();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<TEAM | undefined>();

    const onFileCreate = (fileName: string) => {
        if (!activeTeam?._id || !user?.email) {
            toast("Error: Missing team ID or user email.");
            return;
        }

        createFile({
            fileName,
            teamId: String(activeTeam._id),
            createdBy: String(user.email),
        }).then(
            (res) => {
                if (res) {
                    toast("File created successfully!");
                }
            },
            (e) => {
                toast("Error while creating file");
            },
        );
    };

    return (
        <div className="h-screen w-72 fixed border-r border-[1px] p-6 flex flex-col">
            <div className="flex-1">
                <SideNavTop setActiveTeamInfo={(team: TEAM) => setActiveTeam(team)} user={user} />
            </div>
            <div>
                <SideNavBottom onFileCreate={onFileCreate} />
            </div>
        </div>
    );
};

export default SideNav;
