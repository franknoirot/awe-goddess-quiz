<script>
    import { getContext } from 'svelte'
    import { fade } from 'svelte/transition'
    import { push } from 'svelte-spa-router'
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import { currQuestionIndex, personality } from '../stores.js'



    $: quiz = getContext('quiz')

    $: currQuestion = quiz.questions[$currQuestionIndex]
    $: nextQuestion = ($currQuestionIndex <= quiz.questions.length) ? quiz.questions[$currQuestionIndex+1] : null

    let selectedAnswer = 0
</script>

<div id={'question-'+$currQuestionIndex} class='question' in:fade={{duration: 500}}
    style={`--answer-width: ${ currQuestion.answer_width }; --answer-gap: ${ currQuestion.answer_gap }`}>
    <h3>Question #{ $currQuestionIndex+1 }</h3>
    <p>{ currQuestion.content }</p>
    <div class={'answers '+currQuestion.layout}>
        {#each currQuestion.answers as answer, i ('answer-'+i)}
        <div class='answer'>
            <label>
                <input type='radio' name='question' on:input={() => selectedAnswer = i}>
                { answer.content }
            </label>
            <MyersBriggsChart personality={answer.answer_metrics[0]} />
        </div>
        {/each}
    </div>

    <button on:click={() => { 
        personality.update(p => {
            const newP = Object.assign({}, p)
            Object.keys(newP).forEach(key => newP[key] = (newP[key] + currQuestion.answers[selectedAnswer].answer_metrics[0][key] / quiz.questions.length))
            return newP
        })
        if (nextQuestion) { $currQuestionIndex++ }
        push((nextQuestion) ? `#/${ nextQuestion.slug }` : '#/meet-your-goddess')
    }}>Next</button>
</div>

<style>
    .question {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .question p {
        width: 50ch;
        margin: 5vh auto;
        margin-bottom: 0;
    }

    .answers {
        margin-block-start: 1.2rem;
    }

    .answers.vertical_cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .answer.answers.vertical_cards {
        width: 25%;
        margin: 1rem;
        display: flex;
        align-items: center;
    }

    .answer > * {
        margin: 0 .5rem;
    }

    pre {
        margin: 3vh auto;
    }

    .vertical_cards .answer {
        width: var(--answer-width);
        margin: 0 var(--answer-gap);
    }
</style>