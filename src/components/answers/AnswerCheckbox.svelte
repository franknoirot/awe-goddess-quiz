<script>
    export let content
    export let value
    export let name

</script>

<label>
    <input type="radio" value={value} name={name} on:input/>
    <div class='bg'></div>
    <svg class="checkmark" viewBox="0 0 10 10">
      <circle cx="5" cy="5"></circle>
      <path stroke-linecap="round" d="M 3 5.5 l 1.85 1.5 l 1.75 -3.75" fill="none"></path>
    </svg>
    <span>{@html content}</span>
</label>

<style>
    label {
        display: flex;
        align-items: center;
        margin: 0;
        box-sizing: border-box;
        padding: .5em 3em .5em 1.5em;
        margin: 1rem;
        position: relative;
        border-radius: .5rem;
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
        border: solid transparent 1px;
        border-radius: .5rem;
        transition: all .12s ease-in-out;
    }

    input:checked ~ .bg {
        border-color: #333;
    }

    .checkmark {
        width: 2em;
        margin-inline-end: .5rem;
    }

    .checkmark path {
        stroke: #ccc;
        transition: all .12s ease-in-out;
    }

    label:hover path,
    label:focus path {
        stroke: #777;
    }

    input:checked + .checkmark path {
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

    input:checked + .checkmark circle {
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
        margin-left: 1.5rem;
    }

    input:focus:not(:checked) ~ span {
        text-decoration: underline;
    }
</style>