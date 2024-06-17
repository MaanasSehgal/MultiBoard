import React from "react";

const FileList = () => {
    return (
        <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        <tr className="odd:bg-gray-50">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileList;
