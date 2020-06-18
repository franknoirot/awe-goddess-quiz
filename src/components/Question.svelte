<script>
    import { getContext } from 'svelte'
    import { fade } from 'svelte/transition'
    import { location, push } from 'svelte-spa-router'
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import { personality } from '../stores.js'
    let currQuestion, currQuestionIndex, nextQuestion

    export let params
    $: quiz = getContext('quiz')

    $: {
        currQuestion = quiz.questions.find(q => q.slug === 'q/' + params.slug)
        currQuestionIndex = quiz.questions.findIndex(q => q.slug === 'q/' + params.slug)
        nextQuestion = (currQuestionIndex <= quiz.questions.length) ? quiz.questions[currQuestionIndex+1] : null
    }

    let selectedAnswer = 0
</script>

<div id={'question-'+currQuestionIndex+'-'+$location} class='question' in:fade={{duration: 250}}
    style={`--answer-width: ${ currQuestion.answer_width }; --answer-gap: ${ currQuestion.answer_gap }`}>
    {@html currQuestion.content }
    <div class={'answers '+currQuestion.layout}>
        {#each currQuestion.answers as answer, i ('answer-'+i)}
        <div class='answer'>
            <label>
                <input type='radio' name='question' on:input={() => selectedAnswer = i}>
                {@html answer.content }
            </label>
            {#if answer.answer_metrics[0].__typename === 'ComponentMetricsMyersBriggs'}
            <MyersBriggsChart personality={Object.fromEntries(Object.keys(answer.answer_metrics[0]).filter(key => key !== '__typename').map(key => { return [key, answer.answer_metrics[0][key]]}))} />
            {/if}
        </div>
        {/each}
    </div>

    <button on:click={() => { 
        personality.update(p => {
            const newP = Object.assign({}, p)
            if (currQuestion.answers[selectedAnswer].answer_metrics[0].__typename === 'ComponentMetricsMyersBriggs') {
                Object.keys(newP.metrics).forEach(key => newP.metrics[key] = (newP.metrics[key] + currQuestion.answers[selectedAnswer].answer_metrics[0][key] / quiz.questions.filter(q => q.slug.includes('q/')).length))
                console.log('adding to the personality!', newP)
            } else {
                newP.charity = currQuestion.answers[selectedAnswer].answer_metrics[0].charity
            }


            return newP
        })

        $: console.log('nextQuestion = ', nextQuestion)
        if (nextQuestion) { currQuestionIndex++ }
        push((nextQuestion) ? `#/${ nextQuestion.slug }` : '#/meet-your-goddess')
    }}>Next</button>
</div>

<style>
    .question {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        max-width: 720px;
        margin: 10vh auto;
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