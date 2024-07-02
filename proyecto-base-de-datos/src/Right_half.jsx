import React, { useState, useContext } from 'react';
import { AppContext } from './context/AppContext';


export default function Right_half() {
  const [randomNumber, setRandomNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isContainerVisible, setIsContainerVisible } = useContext(AppContext);

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 100000) + 1;
    setRandomNumber(number.toString());
  };

  const handleInputChange = (e) => {
    setRandomNumber(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    setHasError(false);
    try {
      const response = await fetch('https://api.example.com/data');

      if (!response.ok) {
        throw new Error('Operación no autorizada');
      }
      const result = await response.json();
      setData(result);
      setIsContainerVisible(false);
    } catch (error) {
      console.error('Error recuperando los datos:', error);
      setHasError(true);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <div className="loading">Cargando...</div>
        <div className="loader"></div>
      </>)

}

  if (!isContainerVisible) {
    return null;
  }

  return (
    <div className="form-container">
      <h1>¡Bienvenido!</h1>
      <p>Escribe tu código de cliente para continuar</p>
      <form className="iniciar-sesion" onSubmit={(e) => e.preventDefault()}>
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            className={`input ${hasError ? 'error' : ''}`}
            type="text" 
            value={randomNumber}
            placeholder="Buscar"
            onChange={handleInputChange}
          />
        </div>
        <p id="aleatorio" onClick={generateRandomNumber}>
          Generar código aleatorio
        </p>
        <button className="button" type="button" onClick={fetchData}>
          Verificar
          <svg className="cartIcon" viewBox="0 0 576 512">
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
