import React from 'react';
import { Link } from 'react-router-dom';

function Heading(props) {
    return (
        <div>
            <div className="flex dark:bg-slate-200 mb-6 bg-black text-green-50 dark:text-black w-full rounded-lg p-3">
                <Link to='/'><img className="size-10 me-2 md:hidden" src="/MshLogo.png" alt="Logo" /></Link>
                <h2 className="text-xl md:text-2xl font-bold pt-1 md:pt-0 md:ps-5 font-kids">
                    {props.heading}
                </h2>
            </div>
        </div>
    );
}

export default Heading;
