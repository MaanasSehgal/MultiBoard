"use client";
import React, {useEffect} from "react";
import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import ImageTool from "@editorjs/image";
// @ts-ignore
import CodeBox from "@bomdi/codebox";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";

const Editor = () => {
    useEffect(() => {
        initEditor();
    });

    const initEditor = () => {
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            tools: {
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                header: {
                    class: Header,
                    shortcut: "CTRL+SHIFT+H",
                    config: {
                        placeholder: "Enter Header",
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: "unordered",
                    },
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                            byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
                        },
                    },
                },
                codeBox: {
                    class: CodeBox,
                    config: {
                        themeURL: "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
                        themeName: "atom-one-dark", // Optional
                        useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
                    },
                },
            },
            holder: "editorjs",
        });
    };
    return (
        <div>
            <div className="ml-20" id="editorjs"></div>
        </div>
    );
};

export default Editor;
