<script>
    import { getContext } from 'svelte'
    import { currQuestionIndex } from '../stores.js'

    const quiz = getContext('quiz')

    console.log('from inside the StartPage!', quiz)

    const firstQuestion = quiz.questions[$currQuestionIndex]
    console.log('question is', firstQuestion)
</script>

<h1>{ quiz.title }</h1>
<p>Click to get started</p>
<p>Current value of currQuestionIndex is { $currQuestionIndex }</p>
<a href={`#/${ firstQuestion.slug }`}>Let's Get Started</a>