<script>
    import { getContext } from 'svelte'
    import { push } from 'svelte-spa-router'
    import { currQuestionIndex } from '../stores.js'

    const quiz = getContext('quiz')

    $currQuestionIndex = -1

    const firstQuestion = quiz.questions[$currQuestionIndex + 1]
    console.log('question is', firstQuestion)
</script>

<section>
    <h1>{ quiz.title }</h1>
    <p>Click to get started</p>
    <button on:click={() => {
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