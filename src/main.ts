import "@app/styles/normalize.scss";
import '@app/styles/global.scss';
import App from './app/App.svelte';

const app = new App({
  target: document.getElementById('app')!,
})

export default app
