import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import axios from "axios";
import {Url} from "../types";
import {Link} from "react-router-dom";
import ThemeButton from "../Components/ThemeButton";
import TableSkeleton from "../Components/TableSkeleton";
import handleError from "../functions/handleError";

export default function Links() {
    const [urlList, setUrlList] = useState<Url[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortBy, setSortBy] = useState({ title: 'createdOn', asc: true });

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setIsLoading(true);
        axios.get(process.env.REACT_APP_API_ENDPOINT as string)
            .then(response => setUrlList(response.data))
            .catch(error => handleError(error, setErrMsg))
            .finally(() => setIsLoading(false));
    }, []);

    function setTimeLabel(time: string) {
        let timeLabel = 's';
        let elapsedTime = Math.floor(getElapsedTime(time));
        if (elapsedTime < 1) elapsedTime = elapsedTime + 1;
        if (60 < elapsedTime && elapsedTime < 3600) {
            elapsedTime = Math.floor(elapsedTime / 60);
            timeLabel = 'min';
        }
        if (3600 < elapsedTime && elapsedTime < 86400) {
            elapsedTime = Math.floor(elapsedTime / 3600);
            timeLabel = 'h';
        }
        if (86400 < elapsedTime) {
            elapsedTime = Math.floor(elapsedTime / 86400);
            timeLabel = 'd';
        }
        return `${elapsedTime}${timeLabel}`
    }

    function getSortedUrls(urls: Url[], sortProperties: { title: string, asc: boolean }) {
        if (sortProperties.title === 'createdOn') {
            return urls.sort((a, b) => {
                if (sortProperties.asc) return getElapsedTime(a.createdOn) - getElapsedTime(b.createdOn)
                return getElapsedTime(b.createdOn) - getElapsedTime(a.createdOn)
            });
        }
        if (sortProperties.title === 'clicks') {
            return urls.sort((a, b) => {
                if (sortProperties.asc) return a.clicks - b.clicks
                return b.clicks - a.clicks
            });
        }
        return urls;
    }

    function getElapsedTime(time: string) {
        return (new Date().getTime() - new Date(time).getTime()) / 1000;
    }

    const filteredUrls = urlList.filter(url => url.full.includes(searchKeyword));
    const sortedUrls = getSortedUrls(filteredUrls, sortBy);

    return (
        <>
            <Helmet>
                <title>Slice - all shortened links</title>
                <meta name="description" content="View all URLs shortened with Slice"/>
                <meta property="og:title" content="Slice - all shortened links" />
                <meta property="og:type" content="web app" />
                <meta property="og:description" content="View all URLs shortened with Slice" />
            </Helmet>
            <div className="h-screen flex flex-col items-center px-6 text-gray-700 dark:text-gray-300">
                <div className="max-w-screen-lg w-full py-16 my-auto">
                    <h1 className="sm:text-3xl text-2xl text-center font-extrabold tracking-tight text-black dark:text-white">All shortened URLs</h1>
                    <Link to="/" className="sm:mt-1.5 mt-1 block w-fit mx-auto text-indigo-600 dark:text-indigo-400">Get started</Link>
                    <div className="sm:mb-9 mb-3 mt-8 relative max-w-sm mx-auto">
                        <input onChange={e => setSearchKeyword(e.target.value)} value={searchKeyword} type="text" name="search" placeholder="What's your URL?" className="w-full shadow-sm rounded bg-transparent border border-gray-300 py-2 px-3 outline-0 focus:border-indigo-600 dark:border-gray-700 dark:focus:border-indigo-400 dark:placeholder:text-gray-600" />
                        <div className="absolute top-0 right-0 pr-2.5 h-full flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 dark:text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>

                    {isLoading ? (
                        <TableSkeleton />
                    ):(
                        errMsg ? (
                            <div className="border rounded-lg border-gray-300 flex flex-col items-center justify-center px-5 mx-auto py-10 space-y-8 text-center dark:border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 text-gray-400 dark:text-gray-600">
                                    <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path><rect width="176" height="32" x="168" y="320" fill="currentColor"></rect><polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon><polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                                </svg>
                                <p className="text-3xl max-w-md">{errMsg}</p>
                            </div>
                        ):(
                            sortedUrls.length > 0 ? (
                                <div className="sm:rounded-md rounded shadow-sm overflow-x-auto border border-gray-300 dark:border-gray-700">
                                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                        <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr className="text-gray-500 text-sm">
                                            <th className="whitespace-nowrap px-3 py-2.5 font-normal text-left">Full URL</th>
                                            <th className="whitespace-nowrap px-3 py-2.5 font-normal text-left">Short URL</th>
                                            <th className="whitespace-nowrap px-3 py-2.5 font-normal text-left">
                                                <div className="flex items-center">
                                                    <span className="mr-0.5">Clicks</span>
                                                    <button onClick={() => setSortBy({ title: 'clicks', asc: true })}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-4 h-4" + ((sortBy.title === 'clicks' && sortBy.asc) ? " text-indigo-600 dark:text-indigo-400" : "")}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" /></svg></button>
                                                    <button onClick={() => setSortBy({ title: 'clicks', asc: false })}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-4 h-4" + ((sortBy.title === 'clicks' && !sortBy.asc) ? " text-indigo-600 dark:text-indigo-400" : "")}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg></button>
                                                </div>
                                            </th>
                                            <th className="whitespace-nowrap px-3 py-2.5 font-normal text-left">
                                                <div className="flex items-center">
                                                    <span className="mr-0.5">Created</span>
                                                    <button onClick={() => setSortBy({ title: 'createdOn', asc: true })}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-4 h-4" + ((sortBy.title === 'createdOn' && sortBy.asc) ? " text-indigo-600 dark:text-indigo-400" : "")}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" /></svg></button>
                                                    <button onClick={() => setSortBy({ title: 'createdOn', asc: false })}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-4 h-4" + ((sortBy.title === 'createdOn' && !sortBy.asc) ? " text-indigo-600 dark:text-indigo-400" : "")}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" /></svg></button>
                                                </div>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                                        {sortedUrls.map((url, index) => (
                                            <tr className="" key={index}>
                                                <td className="whitespace-nowrap px-3 py-2.5 text-indigo-600 dark:text-indigo-400">
                                                    <a href={url.full} target="_blank" rel="noreferrer">{url.full.length > 40 ? (url.full.slice(0, 40) + '...') : url.full}</a>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2.5 text-indigo-600 dark:text-indigo-400">
                                                    <a href={process.env.REACT_APP_API_ENDPOINT + url.short} target="_blank" rel="noreferrer">{process.env.REACT_APP_API_ENDPOINT + url.short}</a>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-2.5 font-bold">{url.clicks}</td>
                                                <td className="whitespace-nowrap px-3 py-2.5">{setTimeLabel(url.createdOn)} ago</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ):(
                                <div className="border rounded-lg border-gray-300 flex flex-col items-center justify-center px-5 mx-auto py-10 space-y-8 text-center dark:border-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 text-gray-400 dark:text-gray-600">
                                        <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path><rect width="176" height="32" x="168" y="320" fill="currentColor"></rect><polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon><polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
                                    </svg>
                                    <p className="text-3xl max-w-md">Looks like the URL you're trying to find doesn't exist.</p>
                                </div>
                            )
                        )
                    )}

                    <div className="mt-6 flex items-center justify-center gap-2">
                        <ThemeButton />
                        <a href="https://github.com/victor891263/slice" target="_blank" rel="noreferrer"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path></svg></a>
                    </div>
                </div>
            </div>
        </>
    )
}