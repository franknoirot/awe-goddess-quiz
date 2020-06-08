<script>
    import MyersBriggsChart from './MyersBriggsChart.svelte'
    import { personality } from '../stores.js'
</script>

<div class='badge'>
    <p>Your Personality so far...</p>
    <div style="display: flex; justify-content: center;">
        <MyersBriggsChart personality={ $personality } width={"90px"}/>
    </div>
</div>

<style>
    .badge {
        position: fixed;
        width: 10ch;
        left: 5vw;
        bottom: 5vh;
        background: white;
        border-radius: .1rem;
        box-shadow: 0 .2rem .6rem rgba(0,0,0,0.2),
                    0 .6rem .9rem rgba(0,0,0,0,0.08);
        padding: .25rem;
    }
</style>