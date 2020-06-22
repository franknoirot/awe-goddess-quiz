<script>
    export let answer
    export let value
    export let name
    export let aspect
</script>

<label>
    <input type="radio" value={value} name={name} on:input/>
    <div class='content'>
        <div class='img' style={(!answer.image) ? `padding-bottom: ${ aspect }; background: lightblue;` : ''}>
        {#if answer.image }
            <img src={ answer.image.url } alt='illustration'>
        {/if}
        </div>
        {@html answer.content}
    </div>
</label>

<style>
    label {
        margin: 0;
    }

    .content {
        box-sizing: border-box;
        padding: .75rem;
        position: relative;
        transition: all .12s ease-in-out;
        border: solid transparent 2px;
        border-radius: 0;
    }

    .img {
        width: 100%;
    }

    .img img {
        max-width: 100%;
    }

    label:hover .content,
    label:focus .content {
        background: #f8f8f8;
    }

    label > input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

    input:checked + .content {
        border-color: var(--answer-selected-border-color);
        background: var(--answer-selected-bg-color);
    }
</style>