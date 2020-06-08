<script>
    export let personality = {}
    export let width = '60px'
    export let label = ""
    export let xScale = 1
    export let difference = false
    let viewW = 25

    let fillMode = (val, i) => (!difference) 
        ? `hsl(${360 / (i+1)}deg, 50%, 70%)` 
        : `rgb(${200-100*Math.abs(val)}, 120, ${220-100*Math.abs(val)})`
</script>

<div class='chart-wrapper' style={`--label: "${ label}";`}>
    <svg viewBox={`0 0 ${viewW} 30`} style={`width: ${width};`}>
        {#each Object.keys(personality) as trait, i}
        <g>
            <text x=13 y={ i*6 + 6/2 }>{ trait }</text>
            <rect x=15 y={ i * 6} width={viewW} height=5 fill={fillMode(personality[trait], i)} />
            <line x1={ 15+(personality[trait]*5*xScale+5) } x2={ 15+(personality[trait]*5*xScale+5) } y1={i * 6} y2={ ((i+1) * 6) - 1 } stroke='black' />
        </g>
        {/each}
    </svg>
</div>

<style>
    .chart-wrapper {
        position: relative;
        margin: .5rem;
    }

    .chart-wrapper::before {
        content: var(--label);
        position: absolute;
        bottom: calc(100% + .5em);
        text-align: center;
        left: 50%;
        transform: translate(-50%);
        font-size: .8rem;
    }

    text {
        text-anchor: end;
        font-size: 3.5px;
    }
</style>