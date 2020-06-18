<script context="module" role='build-vars'>
	let quiz = 'quiz.js';
	let buildTime = 'buildTime.js';
	// let geoData = 'geoData.js'; // Working on allowing Promises and async build variables
</script>

<script>
	import TopBar from './components/TopBar.svelte'
	import Router from 'svelte-spa-router'
	import { setContext } from 'svelte'
	import { blankPersonality } from './functions/personality.js'
	import { personality } from './stores.js'
	import AnalyticsTable from './components/AnalyticsTable.svelte'
	import PersonalityBadge from './components/PersonalityBadge.svelte'
	import StartPage from './components/StartPage.svelte'
	import Question from './components/Question.svelte'
	import Interstitial from './components/Interstitial.svelte'
	import EndPage from './components/EndPage.svelte'
	import Analytics from './components/Analytics.svelte'

	setContext('quiz', quiz)
	console.log(quiz)	

	$personality = { metrics: blankPersonality(quiz.results[0].result_metrics[0]), charity: {} }

	const routes = Object.fromEntries([
		//...quiz.questions.map(question => ['/'+question.slug, ((question.slug.includes('interstitial')) ? Interstitial : Question)]),
		['/meet-your-goddess', EndPage],
		['/analytics', Analytics],
		['/i/:slug', Interstitial],
		['/q/:slug', Question],
		['/*', StartPage]
	])

	console.log('routes = ', routes)
</script>

<TopBar />
<main>
	<Router routes={ routes }/>

	<PersonalityBadge />
</main>

<style>
	:global(body) {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100vh;
	}

	main {
		box-sizing: border-box;
		margin: auto;
		overflow: auto;
		width: 100%;
		height: 100%;
	}
</style>