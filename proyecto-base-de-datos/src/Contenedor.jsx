import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Right_half from "./Right_half.jsx";
import Left_half from "./Left_half.jsx";
import { Outlet } from "react-router-dom";

export default function Contenedor() {
    const { isContainerVisible } = useContext(AppContext);

    return (
        <>
        
        <div className="bloque-central">

            <div className="left-half">
                <Left_half/>
            </div>
             
            <div className="right-half">
                <Right_half/>
            </div>
            


        </div>
        </>)
}
