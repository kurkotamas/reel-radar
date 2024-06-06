import React, {useEffect} from 'react';

export const DarkThemeToggle = () => {


    useEffect(() => {
        // Apply dark theme if it was set in local storage.
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark');
        }
    }, []);

    const toggleDarkTheme = () => {
        let darkModeEnabled = document.body.classList.contains('dark');
        document.body.classList.toggle('dark', !darkModeEnabled);
        localStorage.setItem('darkMode', `${!darkModeEnabled}`);
    }

    return (
        <button type="button" onClick={toggleDarkTheme} className="absolute inset-y-0 end-0 flex items-center pe-3">
            <svg className="w-[16px] h-[16px] text-white hidden dark:block" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5
                      12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                />
            </svg>
            <svg className="w-[16px] h-[16px] text-gray-800 block dark:hidden" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5
                      1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"
                />
            </svg>
        </button>
    );
}