import React from "react";
import { Skeleton } from "./Skeleton";
import { toast } from "sonner";

const Row = ({ label, value }) => {
    const handleRowClick = () => {
        if (value) {
            navigator.clipboard
                .writeText(value)
                .then(() => {
                    console.log("");
                    toast(`"${value}" copied to clipboard`);
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        }
    };

    return (
        <tr className="divide-x-[1px] divide-slate-200 ">
            <th className="px-2 py-1 font-normal text-left w-1/4">{label}</th>
            <td
                className="px-2 py-1 hover:bg-slate-100 hover:cursor-pointer"
                onClick={handleRowClick}
            >
                {value ? value : <Skeleton className="h-4 w-full rounded-md" />}
            </td>
        </tr>
    );
};

export { Row };
