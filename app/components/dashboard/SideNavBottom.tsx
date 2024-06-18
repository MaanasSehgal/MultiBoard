import React, {useState} from "react";
import {Archive, Flag, Github} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import Constant from "@/app/constant/Constant";
import PricingDialog from "./PricingDialog";

const SideNavBottom = ({onFileCreate, totalFiles}: any) => {
    const menuList = [
        {id: 1, name: "Getting Started", icon: Flag, path: ""},
        {id: 2, name: "Github", icon: Github, path: ""},
        {id: 3, name: "Archive", icon: Archive, path: ""},
    ];
    const [fileInput, setFileInput] = useState("");
    return (
        <div>
            {menuList.map((menu, idx) => (
                <h2 key={idx} className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer">
                    <menu.icon className="h-5 w-5" />
                    {menu.name}
                </h2>
            ))}

            <Dialog>
                <DialogTrigger className="w-full" asChild>
                    <Button
                        className="w-full bg-blue-600 
      hover:bg-blue-700 justify-start mt-3">
                        New File
                    </Button>
                </DialogTrigger>
                {totalFiles < Constant.MAX_FREE_FILES ? (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New File</DialogTitle>
                            <DialogDescription>
                                <Input placeholder="Enter File Name" className="mt-3" onChange={(e) => setFileInput(e.target.value)} />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    className="bg-blue-600
            hover:bg-blue-700"
                                    disabled={!(fileInput && fileInput.length > 3)}
                                    onClick={() => onFileCreate(fileInput)}>
                                    Create
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                ) : (
                    <PricingDialog />
                )}
            </Dialog>

            {/* Progress Bar */}
            <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
                <div
                    style={{
                        width: `${totalFiles <= 5 ? totalFiles * 20 : 0}%`,
                    }}
                    className={`h-4 rounded-full ${totalFiles < 5 ? "bg-blue-600" : "bg-red-600"}`}></div>
            </div>
            <h2 className="text-[12px] mt-3">
                <strong>{totalFiles ? totalFiles : 0}</strong> out of <strong>{Constant.MAX_FREE_FILES}</strong> files used
            </h2>
            <h2 className="text-[12px] mt-1">Upgrade your plan for unlimited access.</h2>
        </div>
    );
};

export default SideNavBottom;
