import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Collect from './components/Collect';
import Donate from './components/Donate';
import './App.css';
import CadCollect from './components/CadCollect';

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
              <li><Link to="/">Início</Link></li>
              <li><Link to="/locaiscoleta">Onde doar</Link></li>
              <li><Link to="/cadcollect">Cadastrar local de doação</Link></li>
              {/* <li><Link to="/contact">Voluntários</Link></li> */}
              <li><Link to="/contact">Contato</Link></li>
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

