<script>
    import { push } from 'svelte-spa-router'
    import { getCookie, setCookie } from '../functions/cookies.js'
    import { currQuestionIndex, quiz, debug } from '../stores.js'

    let currQuestionIndexSetter = $quiz.questions.length
    $currQuestionIndex = currQuestionIndexSetter
    let isValid = false
    let email
</script>

<section>
    <h1>Ready to meet your inner goddess?</h1>
    <p>Thank you for sharing a little bit about you. We know you're complex, but you're also a goddess.</p>
    <p style="color: #7e7e7e;">Next we'll show your results.</p>
    <form method="PUSH" on:submit={(e) => {
        e.preventDefault()
        setCookie(Object.assign({}, getCookie(), { email }))
        $currQuestionIndex++
        push(`#/results`)
    }}>
        <div class='field-group'>
            <input id="email-input" type="email" placeholder='Email' on:input={function() {
                isValid = this.checkValidity() && this.value !== ''
                email = this.value
            }}>
            <label for="email-input">Email Address</label>
        </div>
        <button type='submit' disabled={ !isValid } >View My Results</button>
    </form>
</section>

<style>
    section {
        max-width: 720px;
        margin: 15vh auto;
        text-align: center;
    }

    .field-group {
        --l-marg: 1.5rem;
        --font-size: 1.3rem;
        --label-active-font-size: 0.7rem;
        --t-marg: calc(.4rem + var(--label-active-font-size));
        position: relative;
        max-width: 30ch;
        margin: 1.5rem auto;   
        margin-bottom: 0;     
        font-size: var(--font-size);
    }

    .field-group label {
        position: absolute;
        bottom: .4rem;
        left: var(--l-marg);
        transform: translate(0, -60%);
        pointer-events: none;
        user-select: none;
        transition: all .12s ease-in-out;
    }

    .field-group input {
        width: 100%;
        box-sizing: border-box;
        padding: var(--t-marg) var(--l-marg) .4rem var(--l-marg);
    }

    .field-group input::placeholder {
        opacity: 0;
    }

    .field-group input:focus + label,
    .field-group input:not(:placeholder-shown) + label {
        transform: translate(0, calc(-1 * (var(--font-size) + var(--label-active-font-size) + .4rem)));
        font-size: var(--label-active-font-size);
    }
</style>