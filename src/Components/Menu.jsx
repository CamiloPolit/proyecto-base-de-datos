import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

export default function MenuPopupState() {
  const { setFiltroSeleccionado, setNumFiltro } = useContext(AppContext);

  // Definir el diccionario de mapeo con información sobre si requiere userID
  const filtroMap = {
    '¿Cuántos productos he comprado del [departament] entre todos mis pedidos?': { id: 1, requiresUserID: true },
    '¿A qué pasillo y categoría corresponde [product_name]?': { id: 2, requiresUserID: false },
    '¿Cuántos productos se vendieron de [aisle]?': { id: 3, requiresUserID: false }
  };

  const handleMenuItemClick = (popupState, filtro) => {
    console.log('Selected filtro:', filtro);
    setFiltroSeleccionado(filtro);
    setNumFiltro(filtroMap[filtro].id); // Usar el diccionario para obtener el número del filtro
    popupState.close();
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Filtros
          </Button>
          <Menu {...bindMenu(popupState)}>
            {Object.keys(filtroMap).map((filtro) => (
              <MenuItem key={filtro} onClick={() => handleMenuItemClick(popupState, filtro)}>
                {filtro}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}