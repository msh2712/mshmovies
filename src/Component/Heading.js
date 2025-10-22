import React from 'react';

function Heading(props) {
    return (
        <div>
            <div className="flex dark:bg-green-50 mb-6 bg-black text-green-50 dark:text-black w-full rounded-lg p-3">
                <img className="size-10 me-2 md:hidden" src="/MshLogo.png" alt="Logo" />
                <h2 className="text-xl md:text-2xl font-bold pt-1 md:pt-0 md:ps-5 font-kids">
                    {props.heading}
                </h2>
            </div>
        </div>
    );
}

export default Heading;
