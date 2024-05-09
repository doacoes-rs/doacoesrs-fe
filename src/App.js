import React, { useState, useEffect } from 'react';
import { BrowserRouter as HashRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/locations/form/location-home';
import Contact from './components/Contact';
import Donate from './components/locations/form/location-donate';
import './App.css';
import CadCollect from './components/locations/form/location-form';
import { Toolbar, IconButton, Menu, MenuItem, ListItemIcon} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenuIcon, setShowMenuIcon] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMenuIcon(window.innerWidth < 600); // Defina a largura limite para exibir o ícone do menu
    };

    handleResize(); // Chama a função para definir o estado inicial ao montar o componente

    window.addEventListener('resize', handleResize); // Adiciona um ouvinte de evento para redimensionamento da janela

    return () => {
      window.removeEventListener('resize', handleResize); // Remove o ouvinte de evento ao desmontar o componente
    };
  }, []);

  return (
    <HashRouter>
      <div>
        <header>
          <a href="https://www.vakinha.com.br/vaquinha/a-maior-campanha-solidaria-do-rs?">
            <img src="https://static.vakinha.com.br/uploads/vakinha/image/4712837/1714579840.27.png?ims=700x410" alt="Logo" />
          </a>
        </header>
          <Toolbar sx={{ alignItems: 'center' }}>
            {showMenuIcon ? (
              <>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleClick}
                  sx={{ mr: 2, marginLeft: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
                <nav className='menu'>
                  <ul>
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/ondedoar">Onde doar</Link></li>
                    <li><Link to="/cadlocal">Cadastrar local de doação</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                  </ul>
              </nav>
            )}
          </Toolbar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            Início
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/ondedoar">
            <ListItemIcon>
              <RoomIcon fontSize="small" />
            </ListItemIcon>
            Onde doar
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/cadlocal">
            <ListItemIcon>
              <AddLocationIcon fontSize="small" />
            </ListItemIcon>
            Cadastrar local de doação
          </MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/contato">
            <ListItemIcon>
              <MailOutlineIcon fontSize="small" />
            </ListItemIcon>
            Contato
          </MenuItem>
        </Menu>

        <Switch>
          <Route path="/contato">
            <Contact />
          </Route>
          <Route path="/ondedoar">
            <Donate />
          </Route>
          <Route path="/cadlocal">
            <CadCollect />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
