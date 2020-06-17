<script>
    import { getContext } from 'svelte'

    const quiz = getContext('quiz')
</script>

<section>
    <h2>Power Rankings</h2>
    <p>The following metrics reflect how much more or less represented a result is in all possible permutations of the quiz:</p>
    {#each quiz.analytics.resultMetrics.sort((a, b) => b.weight - a.weight) as result, i (`analytics-result-${i}`)}
    <p>{i} {result.result_name}: <strong>{result.weight.toFixed(4)}</strong></p>
    {/each}
</section>

<section>
    <h2>Results Spectrum</h2>
    <p>The following chart shows the distribution of each result along each metric.</p>
    {#each Object.keys(quiz.questions[0].answers[0].answer_metrics[0]) as metric, m (`analytics-metric-${m}`)}
    <div class='metric' style={`--color: hsl(${360/(m+1)}deg, 50%, 60%); --label: '${metric}'`}>
        {#each quiz.analytics.resultMetrics as result, e (`analytics-param-${e}`)}
        <p class='param' style={`--color: hsl(${360/(e+1) + 120}deg, 90%, ${e/quiz.analytics.resultMetrics.length*100}%); left: ${(result.result_metrics[0][metric]+1)*50}%; --label: '${result.result_name}';`}></p>
        {/each}
    </div>
    {/each}
</section>

<style>
    .metric {
        width: 100%;
        height: 2rem;
        margin: 3vh 10vw;
        position: relative;
        background: var(--color);
    }

    .metric::before {
        content: var(--label);
        color: var(--color);
        position: absolute;
        right: calc(100% + 1rem);
        top: 50%;
        transform: translate(0, -50%);
        filter: brightness(.5) saturate(1.2);
    }

    .param {
        transform: translate(-50%, -50%);
        position: absolute;
        top: .1rem;
        border-radius: 50%;
        width: .5rem;
        height: .5rem;
        border-radius: 50%;
        background: var(--color);
        border: solid 2px;
    }

    .param::after {
        content: var(--label);
        opacity: 0;
        transition: all .13s ease-in-out;
        position: absolute;
        bottom: calc(100% + 1rem);
        left: 50%;
        transform: translate(-50%, );
        pointer-events: none;
        padding: .5rem;
    }


    .param:hover::after {
        opacity: 1;
        background: white;
        box-shadow: 0 .2rem .8rem rgba(0,0,0,0.2);
    }
</style>