import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import '../styles/responsif.css';
import '../styles/load.css';
import '../styles/detail-wk.css';
import '../styles/favorit-wk.css';
import './components/navbar-comps';
import './components/footer-comps';
import App from './views/app';
import SwRegist from './utils/sw-regist';
import { WebSocketInitiator } from './utils/websocket-initiator';
import CONFIG from './globals/config';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#Maincontent'),
});

window.addEventListener('hashchange', () => {
  document.querySelector('.container').scrollIntoView();
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  SwRegist();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
