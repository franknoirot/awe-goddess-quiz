<script>
    import { getContext } from 'svelte'
    import { get } from 'svelte/store'
    import { fade } from 'svelte/transition'
    import { push } from 'svelte-spa-router'
    import { currQuestionIndex, personality, quiz } from '../stores.js'

    export let params
    let currQuestion
    let currQuestionIndexSetter
    let nextQuestion

    console.log('personality = ', $personality)

    $: {
        currQuestion = $quiz.questions.find(q => q.slug === 'i/' + params.slug)
        currQuestionIndexSetter = $quiz.questions.findIndex(q => q.slug === 'i/' + params.slug)
        $currQuestionIndex = currQuestionIndexSetter
        nextQuestion = ($currQuestionIndex <= $quiz.questions.length) ? $quiz.questions[$currQuestionIndex+1] : null
    }

    function parseSvelteStoreVars(rawContent) {
        console.log('this = ', Object.keys(this))
        return rawContent.replace(/{{\s*([$\w\d_.]+)\s*}}/g, storeReplacer)
    }

    function storeReplacer(match, p1) { 
        console.log('this in replacer = ', this)
        console.log('parsing context', p1)
        const keys = p1.split('.')
        let storeObj = get(eval(keys[0]))
        keys.forEach((key,i) => {
            console.log(keys, storeObj)
            if (i !== 0) {
                storeObj = storeObj[key]
            }
        })
        return storeObj
    }
</script>

<div id={'interstitial-'+$currQuestionIndex} class='interstitial' in:fade={{duration: 500}}
    style={`--angle: ${Math.random()*20 +165}deg;`}>
    <div class='content'>
        {@html parseSvelteStoreVars(currQuestion.content) }
    </div>
    <button on:click={() => { 
        push((nextQuestion) ? `#/${ nextQuestion.slug }` : '#/meet-your-goddess')
    }}>Next</button>
</div>

<style>
    .interstitial {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background: var(--interstitial-background);
        width: 100%;
        box-sizing: border-box;
        padding: 10vh 5vw;
        height: 100%;
    }

    .content {
        max-width: 720px;
        margin: 5vh auto;
        margin-bottom: 0;
        line-height: 2;
    }
</style>