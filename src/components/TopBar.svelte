<script>
    import { push } from 'svelte-spa-router'
    import { currQuestionIndex, quiz } from '../stores.js'

    let quizLength = $quiz.questions.length + 1
    $: widthPct = ($currQuestionIndex + 1) / quizLength * 100 + '%'
</script>

<header>
    <div class='top-bar'>
        <a href='/'>
            <img src="/assets/awe-inspired-logo_60x.png" alt="Awe Inspired - Link to Home">
        </a>
        <a href='/'>
            <svg viewBox="0 0 5 5">
                <path d='M 1 1 l 3 3 M 4 1 l -3 3' stroke-linecap='round' stroke='black' stroke-width="0.5px"/>
            </svg>
        </a>
    </div>
    <div class='progress' style={`--width: ${ widthPct };`}></div>
</header>

<style>
    header {
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 .2vh .8vh rgba(0,0,0,0.2),
                    0 .6vh 1.2vh rgba(0,0,0,0.08);
        position: relative;
        background: var(--bar-color);
    }

    .top-bar {
        padding: 1rem 2.5rem .5rem 2.5rem;
        display: flex;
        justify-content: space-between;
    }

    a {
        font-size: 1.2rem;
        font-weight: bold;
    }

    button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
    }

    svg {
        width: 25px;
    }

    .progress {
        background: var(--progress-color);
        height: 5px;
        width: var(--width);
        transition: width .12s ease-in-out;
    }

</style>