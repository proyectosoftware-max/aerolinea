import React, { createContext, useState } from 'react';
import dayjs from 'dayjs';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [sharedData, setSharedData] = useState(localStorage.getItem('sharedData') || '');
    const [origen, setOrigen] = useState(localStorage.getItem('origen') || '');
    const [destino, setDestino] = useState(localStorage.getItem('destino') || '');
    const [precio, setPrecio] = useState(localStorage.getItem('precio') || 0);
    const [selectedDate, setSelectedDate] = useState(dayjs()); 
    
    return (
        <DataContext.Provider value={{ sharedData, setSharedData, origen, setOrigen, destino, setDestino, precio, setPrecio, selectedDate, setSelectedDate  }}>
            {children}
        </DataContext.Provider>
    );
};

