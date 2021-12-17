<script lang="ts">
    import {fade} from "svelte/transition";
    import {GameElement} from "../project/entities/game-element.entity";

    export let disabled = false;

    export let elements: GameElement[] = [];
</script>

{#if !disabled}
    <div out:fade class="float-message">
        <div class="title">
            <h2 class="gradient">Sua Missão!</h2>
            <h3>
                Pegue os elementos correspondentes as <b> PALAVRAS </b> abaixo no mapa conforme a ordem que aparecem. <br>
                <b> Não vale pegar pelas cores dos nomes abaixo, somente pelos nomes! </b>
            </h3>
        </div>
        <div class="elements">
            {#each elements as element}
                <div class="cor-element" class:correct={element.correct} style="color: {element.textColor};"> {element.name} </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .float-message{
        z-index: 1;
        position: absolute;
        margin: 0;
        width: 100ch;
        background: #fffeee;
        border: 4px solid #333333;
        border-radius: 3rem;
        bottom: 6vh;
        left: calc(50vw - 50ch);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 1rem 2rem;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-align: center;
        font-style: italic;
        flex-direction: column;
    }


    .gradient {
        --center-color: rgb(212, 51, 130);
        --side-color: rgba(255,254,238,1);
        color: #ffffff;
        position: relative;
        display: block;
        background: -moz-linear-gradient(left,  var(--side-color) 1%,  var(--center-color)  53%, var(--side-color) 100%); /* FF3.6+ */
        background: -webkit-gradient(linear, left top, right top, color-stop(1%,var(--side-color)), color-stop(53%, var(--center-color) ), color-stop(100%,var(--side-color))); /* Chrome,Safari4+ */
        background: -webkit-linear-gradient(left,  var(--side-color) 1%, var(--center-color)  53%,var(--side-color) 100%); /* Chrome10+,Safari5.1+ */
        background: -o-linear-gradient(left,  var(--side-color) 1%, var(--center-color)  53%,var(--side-color) 100%); /* Opera 11.10+ */
        background: -ms-linear-gradient(left,  var(--side-color) 1%, var(--center-color)  53%,var(--side-color) 100%); /* IE10+ */
        background: linear-gradient(to right,  var(--side-color) 1%, var(--center-color)  53%,var(--side-color) 100%); /* W3C */
    }

    .gradient::after {
        top: auto;
        bottom: -5px;
    }

    .title h2 {
        text-align: center;
        width: 75%;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
    }

    .title h3 {
        font-size: 1.1rem;
        width: 100%;
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
        background-color: #c3f3de;
        text-decoration: line-through;
    }
</style>
