import React from 'react';

export default function ErrorPopup({ msg }: { msg: string }) {
    return (
        <div className="fixed bottom-5 left-0 w-full">
            <div className="max-w-screen-md bg-red-50 py-3 px-4 rounded-md w-fit mx-auto dark:bg-red-900/50">
                <div className="grid grid-cols-[1.25rem_auto] items-end gap-2 text-red-700 dark:text-red-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    );
}