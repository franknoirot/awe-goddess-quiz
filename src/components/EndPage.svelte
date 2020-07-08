<script>
    import { getContext } from 'svelte'
    import { push } from 'svelte-spa-router'
    import { blankPersonality, calculateMyersBriggs, personalityDistance, personalityDistSum } from '../functions/personality.js'
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import { currQuestionIndex, personality, quiz, debug } from '../stores.js'

    $currQuestionIndex = -1

    const results = $quiz.results
    $: sortedResults = results.sort((a,b) => Math.abs(personalityDistSum($personality.metrics, a.result_metrics[0])) - Math.abs(personalityDistSum($personality.metrics, b.result_metrics[0])))
</script>

<section id='results-header'>
    <h1 class='heading-label'>Your Goddess Quiz Results</h1>
    <div class='row'>
        <div class='left-col'>
            <div class='img-circle'></div>
            <h2><span class='heading-label'>Your Inner Goddess </span>{ sortedResults[0].result_name }</h2>
        </div>
        <div class='right-col'>
            {@html sortedResults[0].description }
        </div>
    </div>
</section>
<section id='primary-product' style='min-height: 30vh;'>
    <h2 class='text-center heading-sans'>You're a modern-day { sortedResults[0].result_name }</h2>
</section>
<section id='style-tips'>
    <h2 class='text-center'>Modern { sortedResults[0].result_name } Style Tips</h2>
    <div class='row'>
        {#each sortedResults[0].style_tip as tip, k ('style-tip-'+k)}
        <div>
            <div class='img-circle'></div>
            {@html tip.content}
        </div>
        {/each}
    </div>
</section>
<section id='secondary-products' style='min-height: 30vh;'>
    <h2 class='text-center heading-sans'>Keep it simple with your single inner goddess, or layer your collection with the iconic women who comprise you</h2>
    <p>Your dynamic results are below.</p>
</section>

{#if $debug}
<h1>Your top goddess is: { sortedResults[0].result_name }</h1>
<section>
    <div class='result'>
        <div>
            <h2 class='res-heading'>{ sortedResults[0].result_name }</h2>
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
            <h2 class='res-heading'>{ result.result_name }</h2>
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
{/if}
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

    #results-header {
        max-width: 100%;
        background: #FEF7EF;
        padding: 1rem 2rem;
    }

    #results-header > h1 {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    #results-header .row {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
        max-width: 1260px;
        margin: 2rem auto;
    }

    #results-header .left-col {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        padding-right: 2rem;
        border-right: solid 1px #F7DEC0;
    }

    .left-col h2 {
        font-size: 3.5rem;
    }

    .img-circle {
        width: 150px;
        padding-bottom: 150px;
        height: auto;
        border-radius: 50%;
        background: lightblue;
        flex-shrink: 0;
    }

    #results-header .right-col {
        padding-left: 2rem;
    }

    #primary-product, #secondary-products {
        margin: 3rem auto;
        line-height: 1.3;
        text-align: center;
    }

    #style-tips {
        background: #F6D1C8;
        max-width: 100%;
        box-sizing: border-box;
        padding: 2rem 2rem;
    }

    #style-tips .row {
        max-width: 1080px;
        margin: 1.5rem auto 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
        text-align: center;
    }

    #style-tips .row > div > * {
        margin: .5rem auto;
        text-align: center;
    }

    .text-center {
        text-align: center;
    }

    .heading-sans {
        font-family: sans-serif;
    }

    .heading-label {
        display: block;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: sans-serif;
        font-size: 1.1rem;

    }

    section, h1, h2:not(.res-heading) {
        padding: 0 2vw;
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