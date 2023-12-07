import './main.css';
import Storage from './src/storage/app.storage.js';
import { App } from './src/game/app.js';

Storage.init();

App('#game');