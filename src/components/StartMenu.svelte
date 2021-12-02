<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {fade} from "svelte/transition";

    export let disabled = true;

    const dispatcher = createEventDispatcher();

    const startGame = () => {
        dispatcher('gameStateChanged', true);
    };

</script>

{#if !disabled}
    <div transition:fade class="load-bar">
        <img src="images/escolinha.png" alt="Escolinha logo">

        <div class="menu">
            <button on:click={startGame} type="button" class="button btn btn-primary">Play!</button>
        </div>
    </div>
{/if}

<style>
    .button{
        font-size: 3rem;
        padding: 0.5rem 4rem;
        border-radius: 3rem;
        background-color: #f52ea5;
        border-color: #f52ea5;
    }

    .button:hover, .button:checked, .button:active {
        background-color: #d63384;
        border-color: #d63384;
    }

    .load-bar{
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #fffeee;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .load-bar img {
        width: 40vw;
        height: auto;
        margin-bottom: 2vw;
    }

    .menu {
        width: 80vw;
    }
</style>
