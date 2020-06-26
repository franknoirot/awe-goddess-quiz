<script>
    import { getContext } from 'svelte'
    import { push } from 'svelte-spa-router'
    import { currQuestionIndex, quiz, debug } from '../stores.js'
    import InstagramGradient from './InstagramGradient.svelte'

    $currQuestionIndex = -1

    const firstQuestion = $quiz.questions[$currQuestionIndex + 1]

    const startQuiz = (e) => {
        if (e.shiftKey) { $debug = true }
        $currQuestionIndex++
        push(`#/${ firstQuestion.slug }`)
    }
</script>

<section>
    <h1>Who's Your Inner Goddess?</h1>
    <p class='intro'>Hundreds of thousands of women have channeled their inner goddess. Discover which goddess of past, present, 
    or myth best matches your personality.
    </p>
    <button on:click={ startQuiz }>Let's Get Started</button>
    <div class='three-col-img'>
        <div class='img'></div>
        <div class='img'></div>
        <div class='img'></div>
    </div>
    <p class='post-script'>
        Give your best answers! You can always update later.
    </p>
</section>
<section>
    <h2>Our Goddess Coin Collection</h2>
    <a class='insta-link' href='https://instagram.com/aweinspired_' rel='noopener' target='_blank'>
        <InstagramGradient />
        @aweinspired_
    </a>
    <div class='start-grid'>
        <div class='item-1'>
            <img src='/assets/start-grid-item-1.jpg' alt='Close up of the Athen Goddess Coin Necklace'>
        </div>
        <div class='item-2'>
            <img src='/assets/start-grid-item-2.jpg' alt='Wise. Altruistic. Goddess. Which one are you?'>
        </div>
        <div class='item-3'>
            <img src='/assets/start-grid-item-3.jpg' alt='A woman wears layers of Awe jewelry.'>
        </div>
        <div class='item-4'>
            <img src='/assets/start-grid-item-4.jpg' alt='8 of the Goddess Coin necklaces arranged in a line.'>
        </div>
        <div class='item-5'>
            <img src='/assets/start-grid-item-5.jpg' alt='A celebrity wearing a Goddess Coin Necklace.'>
        </div>
        <div class='item-6'>
            <img src='/assets/start-grid-item-6.jpg' alt='The Harriet Tubman Goddess Coin and Charm necklaces.'>
        </div>
        <div class='item-7'>
            <button on:click={ startQuiz } class='unbutton'>
                <img src='/assets/start-grid-item-7.jpg' alt="Alright, you've sold me. Let's get started.">
            </button>
        </div>
    </div>
</section>

<style>
    section {
        margin: 15vh auto;
        text-align: center;
    }

    section:first-of-type {
        max-width: 720px;
    }

    h1 {
        font-size: 2.7rem;
    }

    .intro {
        font-size: 1.25rem;
        line-height: 1.7;
    }

    section > button {
        margin: 1.5rem auto;
        margin-bottom: 3.5rem;
    }

    .post-script {
        color: gray;
    }

    .three-col-img {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 400px;
        margin: 0 auto;
        margin-bottom: 2rem;
    }

    .three-col-img > .img {
        padding-bottom: 150%;
        width: 100%;
        background: lightblue;
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0rem;
    }

    .insta-link {
        display: flex;
        align-items: center;
        width: max-content;
        margin: auto;
        margin-bottom: 1.5rem;
        padding: .4rem 2rem;
        transition: .13s ease-in-out;
        font-size: 1.3rem;
        border-radius: .3rem;
        color: inherit;
    }

    .insta-link:hover {
        background: #303030a4;
        color: white;
        text-decoration: none;
    }

    .start-grid {
        width: 95%;
        max-width: 1260px;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 1rem;
    }

    .start-grid > div,
    .start-grid button {
        object-fit: cover;
    }

    .start-grid .item-3 {
        grid-row: 1 / 3;
        grid-column: 3 / 4;
    }

    .start-grid .item-4 {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
    }

    img {
        max-width: 100%;
        width: 100%;
        object-fit: cover;
    }

    .unbutton {
        border: none;
        margin: 0;
        padding: 0;
        background: none;
        width: 100%;
    }    
</style>