import Editor from "@/app/components/workspace/Editor";
import WorkspaceHeader from "@/app/components/workspace/WorkspaceHeader";
import React from "react";

const Workspace = () => {
    return (
        <div>
            <WorkspaceHeader />

            {/* Workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Document */}
                <div className="h-screen"><Editor/></div>
                {/* Whiteboard/canvas */}
                <div className="bg-red-400 h-screen">Canvas</div>
            </div>
        </div>
    );
};

export default Workspace;
