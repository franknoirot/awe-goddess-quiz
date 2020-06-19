<script>
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import { personality } from '../stores.js'

    export let active
</script>

<div class='badge' class:active={ active }>
    <p>Your Personality so far...</p>
    <div style="display: flex; justify-content: center;">
        <MyersBriggsChart personality={ $personality.metrics } width={"90px"}/>
    </div>
</div>

<style>
    .badge {
        position: fixed;
        width: 10ch;
        right: 5vw;
        bottom: 5vh;
        background: white;
        border-radius: .1rem;
        box-shadow: 0 .2rem .6rem rgba(0,0,0,0.2),
                    0 .6rem .9rem rgba(0,0,0,0.08);
        padding: .25rem 2vw;
        border-radius: .5rem;
        transform: translateY(50%);
        opacity: 0;
        transition: all .12s ease-in-out;
    }

    .badge::before {
        content: 'Debug View On';
        position: absolute;
        bottom: calc(100% + .5rem);
        font-size: .75rem;
        text-align: center;
        left: 50%;
        transform: translate(-50%);
        text-transform: uppercase;
        white-space: nowrap;
        font-weight: bold;
    }

    .badge.active {
        transform: none;
        opacity: 1;
    }
</style>