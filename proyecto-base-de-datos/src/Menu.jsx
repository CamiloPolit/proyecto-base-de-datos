import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';

export default function MenuPopupState() {
  const { setFiltroSeleccionado } = useContext(AppContext);

  const handleMenuItemClick = (popupState, filtro) => {
    console.log('Selected filtro:', filtro);
    setFiltroSeleccionado(filtro);
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
            <MenuItem onClick={() => handleMenuItemClick(popupState, '¿Cuántos productos he comprado del [departament] entre todos mis pedidos?')}>¿Cuántos productos he comprado del [departament] entre todos mis pedidos?</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick(popupState, '¿A qué pasillo y categoría corresponde [product_name]?')}>¿A qué pasillo y categoría corresponde [product_name]?</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick(popupState, '¿Cuántos productos se vendieron de [aisle]?')}>¿Cuántos productos se vendieron de [aisle]?</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}