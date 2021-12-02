<script lang="ts">
    import {fade} from "svelte/transition";

    export let progressValue = 0;
    export let disabled = false;

    export let elements = [
        {
            name: 'Verde',
            color: 'blue',
            correct: true
        },
        {
            name: 'Azul',
            color: 'orange',
            correct: false
        },
        {
            name: 'Preto',
            color: 'red',
            correct: false
        },
        {
            name: 'Vermelho',
            color: 'verde',
            correct: false
        },
        {
            name: 'Amarelo',
            color: 'green',
            correct: false
        },
        {
            name: 'Verde',
            color: 'orange',
            correct: false
        },
    ];
</script>

{#if !disabled}
    <div out:fade class="float-message">
        <div class="title">
            <h2>Sua Missão!</h2>
            <h3>
                Pegue os elementos correspondentes as <b> PALAVRAS </b> abaixo no mapa conforme a ordem.
                <b> Não vale pegar os elementos das cores das palavras abaixo! </b>
            </h3>
        </div>
        <div class="elements">
            {#each elements as element}
                <div class="cor-element" class:correct={element.correct} style="color: {element.color};"> {element.name} </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .float-message{
        z-index: 1;
        position: absolute;
        margin: 0;
        width: 90vw;
        height: 14vh;
        background: #fffeee;
        border: 4px solid #333333;
        border-radius: 3em;
        top: 80vh;
        left: 5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 1rem 2rem;
    }

    .title {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        font-style: italic;
        flex-direction: column;
    }

    .title h2 {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .title h3 {
        font-size: 1.1rem;
    }

    .elements {
        display: flex;
        margin-top: 0.3rem;
    }

    .cor-element {
        padding: 0 1rem;
        border-radius: 2rem;
        border: 2px solid #333333;
        font-size: 1.5rem;
        margin: 0 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .correct {
        border-width: 5px;
        border-color: green;
    }
</style>
