<script>
    import { pop } from 'svelte-spa-router'
</script>

<button on:click={() => pop()}>
    <div class='dot'>
        <svg viewBox='0 0 10 5'>
            <path stroke='#333' fill='none' stroke-linecap='round' d='M 0.5 2.5 l 9 0 M 2.5 0.5 l -2 2 l 2 2'/>
        </svg>
    </div>
    Back
</button>

<style>
    button {
        position: fixed;
        bottom: 1vw;
        left: 3vw;
        padding: 0;
        background: transparent;
        border: none;
        text-align: center;
        text-transform: uppercase;
        color: #333;
    }

    .dot {
        margin: 1rem;
        border-radius: 50%;
        background: hsl(35deg, 36%, 80%);
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .12s ease-in-out;
    }

    button:hover .dot,
    button:focus .dot {
        transform: translateY(-.3rem);
        box-shadow: 0 .15rem .3rem rgba(0,0,0,0.2),
                    0 .45rem .7rem rgba(0,0,0,0.13);
    }

    svg {
        box-sizing: border-box;
        padding: .5rem;
        width: 100%;
    }

    /* .arrow {
        --arrow-color: #333;
        --arrow-thickness: .2rem;
        box-sizing: border-box;
        width: 2rem;
        height: var(--arrow-thickness);
        background: var(--arrow-color);
        position: relative;
    }

    .arrow::before,
    .arrow::after {
        content: '';
        position: absolute;
        width: .75rem;
        height: var(--arrow-thickness);
        left: 0;
        top: 50%;
        background: var(--arrow-color);
        transform-origin: left center;
        --pivot: 45deg;
        --offset: -1;
        transform: translateY(calc(-60% + var(--offset) * .2 * var(--arrow-thickness))) rotate(var(--pivot));
    }

    .arrow::after {
        --offset: 1;
        --pivot: -45deg;
    } */
</style>