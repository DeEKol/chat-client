import "normalize.css";
import './app/styles/app.css';
import App from './app/App.svelte';

const app = new App({
  target: document.getElementById('app')!,
})

export default app
