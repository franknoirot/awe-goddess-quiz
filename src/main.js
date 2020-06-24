import App from './App.svelte';

const app = new App({
	target: document.getElementById('quiz'),
	props: {
		origin: document.getElementById('quiz').dataset.origin || '',
	}
});

export default app;