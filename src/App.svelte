<script context="module" role='build-vars'>
	let quizData = 'quiz.js';
	let buildTime = 'buildTime.js';
	// let geoData = 'geoData.js'; // Working on allowing Promises and async build variables
</script>

<script>
	import TopBar from './components/TopBar.svelte'
	import Router, { location } from 'svelte-spa-router'
	import { setContext, onMount } from 'svelte'
	import { blankPersonality } from './functions/personality.js'
	import { personality, quiz, debug } from './stores.js'
	import AnalyticsTable from './components/AnalyticsTable.svelte'
	import PersonalityBadge from './components/PersonalityBadge.svelte'
	import StartPage from './components/StartPage.svelte'
	import Question from './components/Question.svelte'
	import Interstitial from './components/Interstitial.svelte'
	import EmailCapture from './components/EmailCapture.svelte'
	import EndPage from './components/EndPage.svelte'
	import Analytics from './components/Analytics.svelte'
	import BackButton from './components/BackButton.svelte'

	export let origin = ''

	$quiz = quizData
	let windowQuizData = false
	$: if (windowQuizData) {
		$quiz = Object.assign($quiz, windowQuizData)
		console.log('quiz data overridden!', $quiz)
	}
	onMount(mountFn)

	function mountFn() {
		if (window.quizDataIncoming) {
			console.log('triggered!', window.quiz)
			setQuizDataAsync(window.quiz)
		}
		async function setQuizDataAsync(val) { 
			console.log('setting context!');
			windowQuizData =  await val
		}
	}
	console.log($quiz)	

	$personality = { metrics: blankPersonality($quiz.results[0].result_metrics[0]), charity: {} }

	const routes = Object.fromEntries([
		//...quiz.questions.map(question => ['/'+question.slug, ((question.slug.includes('interstitial')) ? Interstitial : Question)]),
		['/meet-your-goddess', EmailCapture],
		['/results', EndPage],
		['/analytics', Analytics],
		['/i/:slug', Interstitial],
		['/q/:slug', Question],
		['/*', StartPage]
	])

	console.log('routes = ', routes)
</script>

<div class='wrapper' style={`${$quiz.custom_styles.map(style => `--${style.style_name}: ${style.style_value}`).join('; ')}`}>
	<TopBar origin={ origin } />
	<main>
		<Router routes={ routes }/>
		<BackButton hidden={ ['/', 'results', 'analytics'].some(path => path === $location) } />
		<PersonalityBadge active={ $debug } />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100vh;
	}

	.wrapper {
		--answer-selected-bg-color: #FEF7EF;
		--answer-selected-border-color: #F7DEC0;
		--back-button-color: hsl(35deg, 36%, 80%);
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
		background: var(--background);
		color: var(--font-color);

		box-sizing: border-box;
		margin: auto;
		overflow: auto;
		width: 100%;
		height: 100%;
	}
</style>