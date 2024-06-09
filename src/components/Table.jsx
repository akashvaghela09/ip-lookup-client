import React from "react";

const Table = ({ label, children }) => {
    return (
        <div className="mx-4 flex flex-col gap-2 overflow-hidden">
            <p className="font-bold">{label}</p>
            <table className="min-w-full border-[1px] border-slate-200">
                <tbody className="divide-y-[1px] divide-slate-200">
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export { Table };
