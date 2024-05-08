import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Collect from './components/Collect';
import Donate from './components/Donate';
import './App.css';
import CadCollect from './components/locations/form/location-form';

function App() {
  return (
    <Router>
      <div>
	<header>
          <a href="https://www.vakinha.com.br/vaquinha/a-maior-campanha-solidaria-do-rs?">
            <img src="https://static.vakinha.com.br/uploads/vakinha/image/4712837/1714579840.27.png?ims=700x410" alt="Logo" />
          </a>
          <nav>
            <ul>
              <li><a href="/">Início</a></li>
              <li><a href="/locaiscoleta">Onde doar</a></li>
              <li><a href="/cadcollect">Cadastrar local de doação</a></li>
              {/* <li><a to="/contact">Voluntários</a></li> */}
              <li><a href="/contact">Contato</a></li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/locaiscoleta">
            <Collect />
          </Route>
          <Route path="/locaisdoacao">
            <Donate />
          </Route>
          <Route path="/cadcollect">
            <CadCollect />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;

