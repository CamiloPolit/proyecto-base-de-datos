import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BasicTable from '../Components/Tabla.jsx';
import MenuPopupState from '../Components/Menu.jsx';
import fotohome from '../assets/images/home.png';
import TextField from '@mui/material/TextField';
import { AppContext } from '../context/AppContext.jsx';
import Button from '@mui/material/Button';


export default function Users() {
    const { userID } = useParams();
    const { numFiltro, filtroSeleccionado } = useContext(AppContext);
    const [orderCount, setOrderCount] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);

    // Definir el diccionario de mapeo con información sobre si requiere userID
    const filtroMap = {
        1: { filtro: '¿Cuántos productos he comprado del [departament] entre todos mis pedidos?', requiresUserID: true },
        2: { filtro: '¿A qué pasillo y categoría corresponde [product_name]?', requiresUserID: false },
        3: { filtro: '¿Cuántos productos se vendieron de [aisle]?', requiresUserID: false }
    };

    const fetchDataUser = async () => {
        setLoading(true);
        setError(null);
        setOrderCount(null);
        setProductInfo(null);

        try {
            console.log(numFiltro);
            // Obtener la información del filtro usando el número de filtro
            const filtroInfo = filtroMap[numFiltro];
            console.log(filtroInfo);
            const requiresUserID = filtroInfo.requiresUserID;
            console.log(requiresUserID);
            const url = requiresUserID
                ? `https://grupo08.cc3201.dcc.uchile.cl/api${numFiltro}/${userID}/${inputValue}`
                : `https://grupo08.cc3201.dcc.uchile.cl/api${numFiltro}/${inputValue}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Hubo un error al hacer la búsqueda por el filtro seleccionado.');
            }
            const result = await response.json();
            console.log(result);

            if (numFiltro === 1 || numFiltro === 3) {
                setOrderCount(result.Cantidad);
            } else if (numFiltro === 2) {
                setProductInfo(result);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataForTable = async () => {
        setLoading(true);
        setError(null);
        setRows([]); // Limpiar las filas antes de la nueva solicitud

        try {
            const response = await fetch(`https://grupo08.cc3201.dcc.uchile.cl/id/${userID}`);
            if (!response.ok) {
                throw new Error('Hubo un error al obtener los datos de las órdenes usados para cargar la tabla, intente nuevamente.');
            }
            const result = await response.json();

            // Transformar los datos obtenidos en un formato adecuado para la tabla
            const transformedRows = result.flatMap(order =>
                order.products.map(product => ({
                    order_id: order.order_id,
                    aisle: product.aisle,
                    department: product.department,
                    product_name: product.product_name
                }))
            );
            setRows(transformedRows);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchDataUser();
        }
    };

    return (
        <>
            <div className="fondo">
                <div className="bloque-central">
                    <div className="container">
                        <Link to={`/`}>
                            <img src={fotohome} className="fotohome" alt="Home" />
                        </Link>

                        <div className="contenedor-filtros">
                            <div className="codigo-usuario">
                                <p>ID de usuario: {userID}</p>
                            </div>

                            <div className="container-filtros">
                                <div className="controlador-menu">
                                    <MenuPopupState />
                                </div>

                                <div className="InputContainer">
                                    <TextField 
                                        id="standard-basic"
                                        label="Buscar por filtro seleccionado"
                                        variant="standard"
                                        style={{ width: '250px' }} 
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>
                            <p>Filtro seleccionado: {filtroSeleccionado}</p>
                            {loading ? (
                                <p>Cargando...</p>
                            ) : error ? (
                                <p>Error: {error}</p>
                            ) : numFiltro === 1 ? (
                                <p>Has comprado {orderCount} productos.</p>
                            ) : numFiltro === 2 ? (
                                <div>
                                    <p>Producto: {productInfo?.Producto}, Pasillo: {productInfo?.Pasillo}, Categoria: {productInfo?.Categoria}</p>
                                </div>
                            ) : numFiltro === 3 ? (
                                <p>Se vendieron {orderCount} productos.</p>
                            ) : null}
                        </div>

                        <div className="table-wrapper">
                            <BasicTable rows={rows} />
                            <div className="carga-datos">
                                <Button variant="contained" style = {{width: "100px", fontSize: "0.7em"}} color="primary" onClick={fetchDataForTable}>
                                Cargar Datos
                                </Button>
                            </div>
                        </div>

                        
                    </div>
                </div>

                <button class="disclaimer">DISCLAIMER:<br></br> La carga de los datos varía según el usuario y puede tardar entre 2 a 40 segundos, sin embargo, no es necesario cargarlos para aplicar filtros.</button>
                
            </div>
        </>
    );
}