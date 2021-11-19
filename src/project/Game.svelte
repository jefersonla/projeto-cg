<script lang="ts">
    import { onMount } from 'svelte';
    import { MainGame } from './main-game';

    let canvasArea: HTMLDivElement;

    // Aguarda o componente carregar
    onMount(() => {
        // Cria e dar inicio ao jogo
        const game = new MainGame(canvasArea);
        game.run();
    });
</script>

<!-- GameArea -->
<div class="canvas-area" bind:this={canvasArea}>
</div>
<!-- ./GameArea -->

<style>
    .canvas-area {
        margin: 10px 0 10px;
    }
</style>
