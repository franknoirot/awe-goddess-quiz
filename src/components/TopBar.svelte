<script>
    import { getContext } from 'svelte'
    import { push } from 'svelte-spa-router'
    import { currQuestionIndex } from '../stores.js'

    let quizLength = getContext('quiz').questions.length
    $: widthPct = $currQuestionIndex / quizLength * 100 + '%'
</script>

<header>
    <div class='top-bar'>
        <a href='/'>Home</a>
        <button on:click={() => {
            $currQuestionIndex = 0
            push('/')
        }}>
            <svg viewBox="0 0 5 5">
                <path d='M 1 1 l 3 3 M 4 1 l -3 3' stroke-linecap='round' stroke='black' stroke-width="0.5px"/>
            </svg>
        </button>
    </div>
    <div class='progress' style={`--width: ${ widthPct }`}></div>
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
        background: dodgerblue;
        height: 5px;
        width: var(--width);
        transition: width .12s ease-in-out;
    }

</style>