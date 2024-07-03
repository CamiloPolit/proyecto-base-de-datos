import BasicTable from "./Tabla.jsx"
import MenuPopupState from "./Menu.jsx"
import { useParams, Link } from 'react-router-dom';
import fotohome from './home.png'; 
import TextField from '@mui/material/TextField';
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

export default function Users() {
    const { userID } = useParams();
    const { filtroSeleccionado} = useContext(AppContext);

    return (
        <>
            <div className="fondo">
            
                <div className="bloque-central">
                    <div className="container">
                        <Link to={`/`}>
                            <img src={fotohome} className="fotohome" alt="Home" />
                        </Link>
                        

                        <div className="codigo-usuario">
                            <p>ID de usuario: {userID}</p>

                        </div>
                        <div className="contenedor-filtros">
                            <div className="container-filtros">
                                <div className="controlador-menu">
                                    <MenuPopupState/>
                                </div>
                                
                                <div class="InputContainer">
                                    <TextField id="standard-basic" label="Buscar por filtro seleccionado" variant="standard" style={{ width: '250px' }} />
                                </div>
                            </div>
                            <p>Filtro seleccionado: {filtroSeleccionado}</p>
                        </div>
                        

                        <div className="table-wrapper">
                            <BasicTable />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}