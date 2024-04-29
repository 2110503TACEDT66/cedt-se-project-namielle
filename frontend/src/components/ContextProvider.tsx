'use client'

import React,{useContext, useState} from "react";
import { createContext } from "react";

const Context = createContext({});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotelData, setHotelData] = useState<any>();
    const [search, setSearch] = useState('');
    const [change, setChange] = useState({});
    const globalSelect = useState<number[]>([]);

    return (
        <Context.Provider value={{ hotelData, setHotelData, search, setSearch, change, setChange, globalSelect }}>
            {children}
        </Context.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(Context);
}