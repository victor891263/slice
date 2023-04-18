import React from 'react';
import createArray from "../functions/createArray";

export default function TableSkeleton() {
    return (
        <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                <tr className="animate-pulse text-gray-500 text-sm">
                    <th className="whitespace-nowrap px-4 py-3.5 font-normal text-left"><div className="w-12 h-4 bg-gray-300 dark:bg-gray-600"/></th>
                    <th className="whitespace-nowrap px-4 py-3.5 font-normal text-left"><div className="w-16 h-4 bg-gray-300 dark:bg-gray-600"/></th>
                    <th className="whitespace-nowrap px-4 py-3.5 font-normal text-left"><div className="w-20 h-4 bg-gray-300 dark:bg-gray-600"/></th>
                    <th className="whitespace-nowrap px-4 py-3.5 font-normal text-left"><div className="w-20 h-4 bg-gray-300 dark:bg-gray-600"/></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                {createArray(8).map((url, index) => (
                    <tr className="animate-pulse" key={index}>
                        <td className="whitespace-nowrap px-4 py-4 text-indigo-600 dark:text-indigo-400"><div className="w-80 h-4 bg-gray-200 dark:bg-gray-700"/></td>
                        <td className="whitespace-nowrap px-4 py-4 text-indigo-600 dark:text-indigo-400"><div className="w-56 h-4 bg-gray-200 dark:bg-gray-700"/></td>
                        <td className="whitespace-nowrap px-4 py-4 font-bold"><div className="w-6 h-4 bg-gray-200 dark:bg-gray-700"/></td>
                        <td className="whitespace-nowrap px-4 py-4"><div className="w-14 h-4 bg-gray-200 dark:bg-gray-700"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}