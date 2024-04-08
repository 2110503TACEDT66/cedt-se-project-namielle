'use client'
import React from 'react';

export default function CardTemplate( {children, contentName} : {children: React.ReactNode, contentName: string}) {
    function onCardMouseAction(event: React.SyntheticEvent) {
        if (event.type == 'mouseover') {
            event.currentTarget.classList.add('shadow-lg');
        }
        else {
            event.currentTarget.classList.remove('shadow-lg');
        }
    }

    return (
        <div className='w-full h-[300px] bg-white rounded-lg border border-black my-10 flex flex-row' 
        onMouseOver={ (e) => {onCardMouseAction(e)}} 
        onMouseOut={ (e) => {onCardMouseAction(e)}}>
        {children}
        </div>
    );
}