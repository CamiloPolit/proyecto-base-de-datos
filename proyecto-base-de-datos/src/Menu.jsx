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
            <MenuItem onClick={() => handleMenuItemClick(popupState, 'Profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick(popupState, 'My account')}>My account</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick(popupState, 'Logout')}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}