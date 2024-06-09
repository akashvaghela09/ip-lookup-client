import React from "react";
import { Skeleton } from "./Skeleton";

const Row = ({ label, value }) => {
    return (
        <tr className="divide-x-[1px] divide-slate-200 ">
            <th className="px-2 py-1 font-normal text-left w-1/4">{label}</th>
            <td className="px-2 py-1">
                {value ? value : <Skeleton className="h-4 w-full rounded-md" />}
            </td>
        </tr>
    );
};

export { Row };
