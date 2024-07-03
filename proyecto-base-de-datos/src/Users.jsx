import BasicTable from "./Tabla.jsx"
import MenuPopupState from "./Menu.jsx"
import { useParams, Link } from 'react-router-dom';
import fotohome from './home.png'; 
import TextField from '@mui/material/TextField';

export default function Users() {
    const { userID } = useParams();

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

                        <div className="container-filtros">
                            <div className="controlador-menu">
                                <MenuPopupState/>
                            </div>
                            
                            <div class="InputContainer">
                                <TextField id="standard-basic" label="Standard" variant="standard" />
                            </div>
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