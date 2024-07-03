import fotomercado from './404/foto-tienda.png';
import error from './404/404.jpg';
import {Link } from 'react-router-dom';


export default function ErrorPage() {
    return (
        <>  
        <div className="fondo" style= {{backgroundColor: "white"}}>
            <div className="otrocontenedor">
            <div class="container2">
                    <div class="left-half2">
                        <img class="foto-tienda" src={fotomercado} alt="Foto Mercadería Banner"/>
                    </div>

                    <div class="right-half2">
                        <div class="textos">
                            <img class="error" src={error} alt="Foto Mercadería Banner"/>
                            <h1>UPS :(</h1>
                            <p>El usuario ingresado no existe.</p>
                            <Link to={`/`}>
                                <button id="botonerror">
                                    Volver al inicio
                                </button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}