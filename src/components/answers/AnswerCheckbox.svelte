<script>
    import Checkmark from '../Checkmark.svelte'
    export let content
    export let value
    export let name
    export let isChecked = false
</script>

<label>
    <input type="radio" value={value} name={name} on:input />
    <div class='bg'></div>
    <Checkmark checked={ isChecked }/>
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

    .checkmark {
        width: 2em;
    }

    .checkmark path {
        stroke: #ccc;
        transition: all .12s ease-in-out;
    }

    label:hover path,
    label:focus path {
        stroke: #777;
    }

    input:checked ~ .checkmark path {
        stroke: hsl(85deg, 80%, 45%);
    }

    .checkmark circle {
        fill: transparent;
        transition: all .12s ease-in-out;
        r: 0px;
    }

    label:hover circle,
    label:focus circle {
        fill: #dddddd;
        r: 4px;
    }

    input:checked ~ .checkmark circle {
        fill: hsl(80deg, 50%, 80%);
        r: 5px;
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

    @media(max-width: 475px) {
        label {
            margin: 0;
            grid-template-columns: 2rem auto;
            padding: .25rem;
            padding-left: .5rem;
        }
    }
</style>