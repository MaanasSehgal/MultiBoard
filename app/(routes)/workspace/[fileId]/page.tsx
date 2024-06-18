"use client";
import {FILE} from "@/app/components/dashboard/FileList";
import Canvas from "@/app/components/workspace/Canvas";
import Editor from "@/app/components/workspace/Editor";
import WorkspaceHeader from "@/app/components/workspace/WorkspaceHeader";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {api} from "@/convex/_generated/api";
import {useConvex} from "convex/react";
import React, {useEffect, useState} from "react";

const Workspace = ({params}: any) => {
    const convex = useConvex();
    const [triggerSave, setTriggerSave] = useState(false);
    const [fileData, setFileData] = useState<FILE | any>();
    const [isVertical, setIsVertical] = useState(window.innerWidth < 768);

    useEffect(() => {
        console.log("File Id: ", params.fileId);
        params.fileId && getFileData();

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsVertical(false); // Horizontal for large screens
            } else {
                setIsVertical(true); // Vertical for medium screens and smaller
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => window.removeEventListener("resize", handleResize);
    }, [params]);

    const getFileData = async () => {
        const result = await convex.query(api.files.getFileById, {_id: params.fileId});
        // console.log(result);
        setFileData(result);
    };

    return (
        <div className={`w-100vw h-[${isVertical ? "186" : "100"}vh]`}>
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
            <ResizablePanelGroup direction={isVertical ? "vertical" : "horizontal"} className="w-full h-full">
                <ResizablePanel defaultSize={50}>
                    <div className="h-full">
                        <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <div className="h-full">
                        <Canvas onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default Workspace;
