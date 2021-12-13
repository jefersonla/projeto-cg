<script lang="ts">
    import {fade} from "svelte/transition";

    export let progressValue = 0;
    export let disabled = true;
</script>

{#if !disabled}
    <div out:fade class="load-bar">
        <img src="images/escolinha.png" alt="Escolinha logo">

        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: {progressValue.toFixed(0)}%;" aria-valuenow="{progressValue.toFixed(0)}" aria-valuemin="0" aria-valuemax="100">{progressValue.toFixed(0)}%</div>
        </div>
    </div>
{/if}

<style>
    .load-bar{
        z-index: 2;
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

    .progress{
        width: 80vw;
        height: 5vh;
    }

    .progress-bar {
        background-color: #d63384;
        font-size: 2rem;
    }
</style>
