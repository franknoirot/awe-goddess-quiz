import App from './App.svelte';

const app = new App({
	target: document.getElementById('quiz') || document.body,
	props: {
		origin: document.getElementById('quiz') ? document.getElementById('quiz').dataset.origin : '',
	}
});

export default app;