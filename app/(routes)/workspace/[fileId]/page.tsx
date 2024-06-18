"use client";
import Editor from "@/app/components/workspace/Editor";
import WorkspaceHeader from "@/app/components/workspace/WorkspaceHeader";
import React, {useEffect, useState} from "react";

const Workspace = ({params}: any) => {
    const [triggerSave, setTriggerSave] = useState(false);

    useEffect(() => {
        console.log("File Id: ", params.fileId);
    }, [params]);
    return (
        <div>
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

            {/* Workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Document */}
                <div className="h-screen">
                    <Editor onSaveTrigger={triggerSave} fileId={params.fileId}/>
                </div>
                {/* Whiteboard/canvas */}
                <div className="bg-red-400 h-screen">Canvas</div>
            </div>
        </div>
    );
};

export default Workspace;
