'use client'
import React from 'react';

export default function CardTemplate({ children, contentName }: { children: React.ReactNode, contentName: string }) {
    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type == 'mouseover') {
            event.currentTarget.classList.add('shadow-lg');
        }
        else {
            event.currentTarget.classList.remove('shadow-lg');
        }
    }

    return (
        <div className='w-full h-[300px] bg-white dark:bg-midnight-blue rounded-lg border border-black dark:border-white-grayish my-10 flex flex-row overflow-hidden'
            onMouseOver={(e) => { onCardMouseAction(e) }}
            onMouseOut={(e) => { onCardMouseAction(e) }}>
            {children}
        </div>
    );
}
