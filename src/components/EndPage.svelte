<script>
    import { getContext } from 'svelte'
    import { push } from 'svelte-spa-router'
    import { blankPersonality, calculateMyersBriggs, personalityDistance, personalityDistSum } from '../functions/personality.js'
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import { currQuestionIndex, personality, quiz } from '../stores.js'

    $currQuestionIndex = $currQuestionIndex + 1

    const results = $quiz.results
    $: sortedResults = results.sort((a,b) => Math.abs(personalityDistSum($personality.metrics, a.result_metrics[0])) > Math.abs(personalityDistSum($personality.metrics, b.result_metrics[0])))
</script>

<h1>Your top goddess is: { sortedResults[0].result_name }</h1>
<section>
    <div class='result'>
        <div>
            <h2>{ sortedResults[0].result_name }</h2>
            <span>{ calculateMyersBriggs(sortedResults[0].result_metrics[0]) }</span>
            <p><strong>Distance:</strong> { personalityDistSum($personality.metrics, sortedResults[0].result_metrics[0]).toFixed(4) }</p>
        </div>
        <div class='charts'>
            <MyersBriggsChart personality={ $personality.metrics } label="You" />
            <MyersBriggsChart personality={ sortedResults[0].result_metrics[0] } label="Them" />
            <MyersBriggsChart personality={ personalityDistance($personality.metrics, sortedResults[0].result_metrics[0]) }
                difference={ true } xScale={0.5} label="Diff."/>
        </div>
    </div>
</section>

<h2 style="margin-top: 3rem;">Here's all your Goddess scores!</h2>
<section>
{#each sortedResults.slice(1) as result, i ('res-'+i)}
    <div class='result'>
        <div>
            <h2>{ result.result_name }</h2>
            <span>{ calculateMyersBriggs(result.result_metrics[0]) }</span>
            <p><strong>Distance:</strong> { personalityDistSum($personality.metrics, result.result_metrics[0]).toFixed(4) }</p>
        </div>
        <div class='charts'>
            <MyersBriggsChart personality={ $personality.metrics } label="You" />
            <MyersBriggsChart personality={ result.result_metrics[0] } label="Them" />
            <MyersBriggsChart personality={ personalityDistance($personality.metrics, result.result_metrics[0]) }
                difference={ true } xScale={0.5} label="Diff."/>
        </div>
    </div>
{/each}
</section>
<button on:click={() => { 
    $currQuestionIndex = 0
    $personality = { metrics: blankPersonality($personality.metrics) }
    push('#/')
}}>Start Over</button>


<style>
    :global(main) {
        counter-reset: result-count;
    }

    section, h1, h2 {
        max-width: 720px;
        margin: auto;
    }

    h1 {
        margin-top: 5vh;
    }

    button {
        display: block;
        margin-bottom: 10vh;
    }

    .result {
        counter-increment: result-count;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        margin-top: 1rem;
    }

    .result::before {
        content: counter(result-count) ".";
        font-size: 1.2rem;
        font-weight: bold;
        position: absolute;
        right: calc(100% + 1rem);
        top: .1rem;
    }

    .result h2 {
        margin-top: 0;
    }

    .charts {
        margin-inline-start: 1rem;
        display: flex;
    }
</style>   