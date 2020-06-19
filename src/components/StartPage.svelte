<script>
    import { getContext } from 'svelte'
    import { push } from 'svelte-spa-router'
    import { currQuestionIndex, quiz, debug } from '../stores.js'

    $currQuestionIndex = -1

    const firstQuestion = $quiz.questions[$currQuestionIndex + 1]
</script>

<section>
    <h1>{ $quiz.title }</h1>
    <p>Click to get started</p>
    <button on:click={(e) => {
        if (e.shiftKey) { $debug = true }
        $currQuestionIndex++
        push(`#/${ firstQuestion.slug }`)
    }}>Let's Get Started</button>
</section>

<style>
    section {
        max-width: 720px;
        margin: 15vh auto;
        text-align: center;
    }
</style>