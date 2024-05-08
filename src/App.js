import React from 'react';
import { BrowserRouter as HashRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/locations/form/location-home';
import Contact from './components/Contact';
import Donate from './components/locations/form/location-donate';
import './App.css';
import CadCollect from './components/locations/form/location-form';

function App() {
  return (
    <HashRouter>
      <div>
	      <header>
          <a href="https://www.vakinha.com.br/vaquinha/a-maior-campanha-solidaria-do-rs?">
            <img src="https://static.vakinha.com.br/uploads/vakinha/image/4712837/1714579840.27.png?ims=700x410" alt="Logo" />
          </a>
          <nav>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/ondedoar">Onde doar</Link></li>
              <li><Link to="/cadlocal">Cadastrar local de doação</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </nav>
        </header>

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

