import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Root from './routes/root';
import Links from './routes/links';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "/links",
        element: <Links />,
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <RouterProvider router={router} />
);

initTheme();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function initTheme() {
    // function to change class of <html> tag accordingly based on value of theme variable
    function toggleThemeClass() {
        if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }

    // if theme variable has no value yet, give it a value based on user's system theme
    if (!localStorage.getItem('theme')) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) localStorage.setItem('theme', 'dark');
        else localStorage.setItem('theme', 'light');
    }

    toggleThemeClass(); // once value has been given to theme variable, change class of <html> tag accordingly
    window.addEventListener('storage', toggleThemeClass); // whenever theme variable is modified, change class of <html> tag accordingly
}