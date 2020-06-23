<script>
    import { getContext } from 'svelte'
    import { get } from 'svelte/store'
    import { fade } from 'svelte/transition'
    import { push } from 'svelte-spa-router'
    import { getCookie } from '../functions/cookies'
    import BackButton from './BackButton.svelte'
    import stores from '../stores.js'
    const { currQuestionIndex, personality, quiz } = stores

    export let params
    let currQuestion
    let currQuestionIndexSetter
    let nextQuestion
    let cookie = getCookie()

    console.log('cookie = ', cookie)
    $: {
        currQuestion = $quiz.questions.find(q => q.slug === 'i/' + params.slug)
        currQuestionIndexSetter = $quiz.questions.findIndex(q => q.slug === 'i/' + params.slug)
        $currQuestionIndex = currQuestionIndexSetter
        nextQuestion = ($currQuestionIndex <= $quiz.questions.length) ? $quiz.questions[$currQuestionIndex+1] : null
    }

    function parseSvelteStoreVars(rawContent) {
        console.log('this is parse store vals', this)
        console.log('this = ', Object.keys(this))
        return rawContent.replace(/{{\s*([$\w\d_.]+)\s*}}/g, storeReplacer)
    }

    function objDrilldown(obj, keysArr) {
        let newObj = Object.assign({}, obj)
        keysArr.forEach((key,i) => {
            console.log(i,newObj, key)
            if (i === 0 || !newObj || !newObj[key]) return 
            newObj = newObj[key]
            if ((newObj instanceof Object) && Object.keys(newObj).length === 0) {
                newObj = undefined
            }
        })
        return newObj
    }

    function storeReplacer(match, p1) { 
        console.log('parsing context', p1)
        const keys = p1.split('.')
        const storeObj = objDrilldown(get(stores[keys[0]]), keys)
        let processedObj =  storeObj ? storeObj : objDrilldown(cookie[keys[0]], keys)
        console.log(storeObj, processedObj)
        if (!processedObj && cookie.personality.charity) {
          // TODO: rerun same loop over cookie if we got undefined?  
        }
        return processedObj
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
    <BackButton />
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
        padding: calc(5vh + 2vw) 5vw;
        min-height: 100%;
    }

    .content {
        max-width: 720px;
        margin: 0vh auto;
        margin-bottom: 0;
    }

    @media(max-width: 475px) {
        button {
            margin-top: 1.25rem;
        }
    }
</style>