<script>
    export let content
    export let value
    export let name
    export let checkColor = '#F7DEC0'
    export let dotColor = '#FEFFFF'
    // export let isChecked = false
</script>

<label>
    <input type="radio" value={value} name={name} on:input />
    <div class='bg'></div>
    <svg width="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={`--check-color: ${ checkColor }`}>
        <circle cx="16" cy="16" fill={ dotColor } style={`fill: ${ dotColor };`} />
        <path d="M9 16.5L14 21.5L23 10.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>{@html content}</span>
</label>

<style>
    label {
        display: grid;
        grid-template-columns: 3rem auto;
        grid-gap: 2vw;
        align-items: center;
        margin: 0;
        box-sizing: border-box;
        padding: .5em 3em .5em 1.5em;
        margin: 1rem;
        position: relative;
        border-radius: 0;
        transition: all .12s ease-in-out;
        text-align: left;
        z-index: 0;
    }

    label:hover .bg,
    label:focus .bg {
        background: #f8f8f8;
    }

    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
        border: solid transparent 2px;
        border-radius: 0;
        transition: all .12s ease-in-out;
    }

    input:checked ~ .bg {
        border-color: #F7DEC0;
        background: #FEF7EF;
    }


    label > input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

    label > span { 
        display: block;
    }

    input:focus:not(:checked) ~ span {
        text-decoration: underline;
    }

    circle, path {
        transition: all .12s ease-in-out;
    }

    circle {
        r: 0px;
    }

    input:checked ~ svg circle {
        r: 16px;
    }

    path {
        stroke: #DEDEDE;
    }
    
    input:checked ~ svg path {
        stroke: var(--check-color);
    }

    @media(max-width: 475px) {
        label {
            margin: 0;
            grid-template-columns: 2rem auto;
            padding: .25rem;
            padding-left: .5rem;
        }
    }
</style>