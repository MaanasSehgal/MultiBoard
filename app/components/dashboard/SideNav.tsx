import React, {useContext, useEffect, useState} from "react";
import SideNavTop, {TEAM} from "./SideNavTop";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottom from "./SideNavBottom";
import {useConvex, useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import { FileListContext } from "@/app/context/FileListContext";

const SideNav = () => {
    const {user} = useKindeBrowserClient();
    const convex = useConvex();
    const createFile = useMutation(api.files.createFile);
    const [activeTeam, setActiveTeam] = useState<TEAM | undefined>();
    const [totalFiles, setTotalFiles] = useState<Number>();
    const {fileList, setFileList} = useContext(FileListContext);

    useEffect(() => {
        activeTeam && getFiles();
    }, [activeTeam]);

    const onFileCreate = (fileName: string) => {
        if (!activeTeam?._id || !user?.email) {
            toast("Error: Missing team ID or user email.");
            return;
        }

        createFile({
            fileName,
            teamId: String(activeTeam._id),
            createdBy: String(user.email),
            archive: false,
            document: "",
            whiteboard: "",
        }).then(
            (res) => {
                if (res) {
                    getFiles();
                    toast("File created successfully!");
                }
            },
            (e) => {
                toast("Error while creating file");
            },
        );
    };

    const getFiles = async () => {
        if (!activeTeam?._id) {
            toast("Error: Missing team ID.");
            return;
        }

        const res = await convex.query(api.files.getFiles, {teamId: String(activeTeam._id)});
        console.log(res);
        setFileList(res);
        setTotalFiles(res?.length);
    };

    return (
        <div className="h-screen w-72 fixed border-r border-[1px] p-6 flex flex-col">
            <div className="flex-1">
                <SideNavTop setActiveTeamInfo={(team: TEAM) => setActiveTeam(team)} user={user} />
            </div>
            <div>
                <SideNavBottom totalFiles={totalFiles} onFileCreate={onFileCreate} />
            </div>
        </div>
    );
};

export default SideNav;
