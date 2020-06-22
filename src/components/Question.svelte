<script>
    import { getContext, onDestroy } from 'svelte'
    import { fade } from 'svelte/transition'
    import { location, push } from 'svelte-spa-router'
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import AnswerCheckbox from './answers/AnswerCheckbox.svelte'
    import AnswerVerticalCard from './answers/AnswerVerticalCard.svelte'
    import BackButton from './BackButton.svelte'
    import { currQuestionIndex, quiz, personality, debug } from '../stores.js'

    export let params
    let currQuestion, currQuestionIndexSetter, nextQuestion
    let selectedAnswer

    $: {
        currQuestion = $quiz.questions.find(q => q.slug === 'q/' + params.slug)
        currQuestionIndexSetter = $quiz.questions.findIndex(q => q.slug === 'q/' + params.slug)
        $currQuestionIndex = currQuestionIndexSetter
        nextQuestion = ($currQuestionIndex <= $quiz.questions.length) ? $quiz.questions[$currQuestionIndex+1] : null
    }
</script>

<div id={'question-'+$currQuestionIndex+'-'+currQuestion.slug} class='question' in:fade={{duration: 250}}
    style={`--answer-width: ${ currQuestion.answer_width }; --answer-gap: ${ currQuestion.answer_gap }`}>
    {@html currQuestion.content }
    {#if currQuestion.layout === 'checkboxes'}
        <fieldset>
            {#each currQuestion.answers as answer, i ('answer-'+i)}
            <AnswerCheckbox content={answer.content} name={'q-'+$currQuestionIndex} value={ i }
                on:input={() => { selectedAnswer = i } } isChecked={ selectedAnswer === i }/>
            {#if $debug && answer.answer_metrics[0].__component === 'metrics.myers-briggs-answers'}
            <MyersBriggsChart personality={Object.fromEntries(Object.keys(answer.answer_metrics[0]).filter(key => key !== '__component').map(key => { return [key, answer.answer_metrics[0][key]]}))} />
            {/if}
            {/each}
        </fieldset>
    {:else}
    <div class={'answers '+currQuestion.layout}>
        {#each currQuestion.answers as answer, i ('answer-'+i)}
        <div class='answer'>
            <AnswerVerticalCard answer={answer} name={'q-'+$currQuestionIndex} value={ i }
                on:input={() => selectedAnswer = i} aspect={ currQuestion.image_aspect_ratio }/>
            {#if $debug && answer.answer_metrics[0].__component === 'metrics.myers-briggs-answers'}
            <MyersBriggsChart personality={Object.fromEntries(Object.keys(answer.answer_metrics[0]).filter(key => key !== '__component').map(key => { return [key, answer.answer_metrics[0][key]]}))} />
            {/if}
        </div>
        {/each}
    </div>
    {/if}

    <button disabled={ !selectedAnswer && selectedAnswer !== 0 } on:click={() => { 
        personality.update(p => {
            const newP = Object.assign({}, p)
            if (currQuestion.answers[selectedAnswer].answer_metrics[0].__component === 'metrics.myers-briggs-answers') {
                Object.keys(newP.metrics).forEach(key => newP.metrics[key] = (newP.metrics[key] + currQuestion.answers[selectedAnswer].answer_metrics[0][key] / $quiz.questions.filter(q => q.slug.includes('q/')).length))
                console.log('adding to the personality!', newP)
            } else {
                newP.charity = currQuestion.answers[selectedAnswer].answer_metrics[0].charity
            }


            return newP
        })

        push((nextQuestion) ? `#/${ nextQuestion.slug }` : '#/meet-your-goddess')
    }}>Next</button>
    <BackButton />
</div>

<style>
    .question {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        max-width: 720px;
        margin: calc(5vh + 3vw) auto;
        padding: 0 2vw;
    }

    fieldset {
        margin-bottom: 1.5rem;
        border: none;
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
        margin: calc(var(--answer-gap) / 2) var(--answer-gap);
    }
</style>