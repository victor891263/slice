import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import axios from "axios";
import {Link} from "react-router-dom";
import ThemeButton from "../Components/ThemeButton";
import ErrorPopup from "../Components/ErrorPopup";
import handleError from "../functions/handleError";

export default function Root() {
    const [shortenedUrl, setShortenedUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    function submitLink(e: any) {
        e.preventDefault();
        setShortenedUrl('');
        setIsLoading(true);
        axios.post(process.env.REACT_APP_API_ENDPOINT + 'shortUrls', { fullUrl: e.target.fullUrl.value })
            .then(response => {
                setShortenedUrl(process.env.REACT_APP_API_ENDPOINT + response.data.short);
                e.target.fullUrl.value = '';
            })
            .catch(error => {
                handleError(error, (msg: string) => {
                    setErrMsg(msg);
                    setTimeout(() => {
                        setErrMsg('');
                    }, 5000);
                })
            }).finally(() => {
                setIsLoading(false);
        });
    }

    function copyLink(e: any) {
        e.target.innerText = "Copied!";
        navigator.clipboard.writeText(shortenedUrl);
        setTimeout(() => {
            e.target.innerText = "Copy";
        }, 2000);
    }

    return (
        <>
            <Helmet>
                <title>Slice - index</title>
                <meta name="description" content="Shorten your URLs with Slice"/>
                <meta property="og:title" content="Slice" />
                <meta property="og:type" content="web app" />
                <meta property="og:description" content="Shorten your URLs with Slice" />
            </Helmet>
            {errMsg && (
                <ErrorPopup msg={errMsg} />
            )}
            <div className="h-screen flex flex-col items-center px-6 text-gray-700 dark:text-gray-300">
                <div className="max-w-2xl w-full h-screen py-20 flex flex-col justify-center">
                    <h1 className="sm:text-4xl text-3xl text-center font-extrabold tracking-tight text-black dark:text-white">Shorten your URL</h1>
                    <p className="mt-4 text-center max-w-lg text-lg mx-auto">Use Slice to transform long, ugly links into nice, memorable and trackable short URLs, which can be posted anywhere.</p>
                    <form onSubmit={submitLink} className="mt-7 grid min-[420px]:grid-cols-[auto_max-content] gap-x-2 gap-y-2.5 w-full">
                        <input disabled={isLoading} className="disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled-text-gray-600 rounded border border-gray-300 bg-transparent py-3 px-4 outline-0 placeholder:text-gray-400 focus:border-indigo-600 dark:border-gray-700 dark:focus:border-indigo-400 dark:placeholder:text-gray-600" required={true} type="url" name="fullUrl" id="fullUrl" placeholder="Enter your URL"/>
                        <button disabled={isLoading} className="sm:w-28 flex items-center justify-center gap-2 rounded bg-indigo-600 text-white font-semibold py-3 focus:outline outline-2 outline-indigo-600 outline-offset-2 dark:bg-indigo-400 dark:text-black dark:outline-indigo-400" type="submit">
                            {isLoading ? (
                                <span>Working...</span>
                            ):(
                                <>
                                    <span>Shrink</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                    {shortenedUrl && (
                        <div className="mt-4 bg-gray-100 rounded py-4 px-5 flex items-center justify-between dark:bg-gray-800">
                            <div>Your link: <span className="font-bold">{shortenedUrl}</span></div>
                            <button onClick={copyLink} className="font-semibold text-indigo-600 dark:text-indigo-400">Copy
                            </button>
                        </div>
                    )}
                    <Link to='/links' className="text-indigo-600 mt-7 w-fit mx-auto dark:text-indigo-400">View all shortened links</Link>
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <ThemeButton />
                        <a href="https://github.com/victor891263/slice" target="_blank" rel="noreferrer"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path></svg></a>
                    </div>
                </div>
            </div>
        </>
    );
}



/*



<div className="text-gray-700 mx-auto max-w-3xl dark:text-gray-300">
            <h1 className="sm:text-3xl text-2xl font-bold tracking-tight text-black dark:text-white">Slice</h1>
            <form className="grid grid-cols-[auto_max-content] gap-2 w-full" action="" method="POST">
                <input className="rounded border py-2 px-3" required={true} type="url" name="fullUrl" id="fullUrl" placeholder="Enter your url"/>
                <button className="rounded bg-indigo-600 text-white font-semibold py-2 px-4" type="submit">Shrink</button>
            </form>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="font-medium text-gray-900">
                            <th className="whitespace-nowrap px-4 py-2">Full URL</th>
                            <th className="whitespace-nowrap px-4 py-2">Short URL</th>
                            <th className="whitespace-nowrap px-4 py-2">Clicks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr className="font-medium text-gray-900">
                            <td className="whitespace-nowrap px-4 py-2"><a href="https://github.com/victor891263">https://github.com/victor891263</a></td>
                            <td className="whitespace-nowrap px-4 py-2"><a href="/123abc">/123abc</a></td>
                            <td className="whitespace-nowrap px-4 py-2">17</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>




 */