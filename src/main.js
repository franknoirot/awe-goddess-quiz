import App from './App.svelte';

const app = new App({
	target: document.getElementById('quiz'),
	props: {
		name: 'world',
	}
});

export default app;