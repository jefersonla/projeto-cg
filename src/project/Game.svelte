<script lang="ts">
    import { onMount } from 'svelte';

    import { MainGame } from './main-game';

    let canvasArea: HTMLDivElement;
    let displayAlert: boolean = false;

    // Aguarda o componente carregar
    onMount(() => {
        // Cria e dar inicio ao jogo
        const game = new MainGame(canvasArea);

        // Redimensiona e checa se o jogo pode rodar
        const resizeAndControlGame = () => {
            // Checa se o jogo pode
            game.setRenderSize();

            if (game.isPageRatioAllowed()) {
                displayAlert = false;
                game.run();
            } else {
                displayAlert = true;
                game.stop();
            }
        };

        // Apenas rodar em telas 4:3 até 16:9
        window.addEventListener('resize', resizeAndControlGame);
        resizeAndControlGame();
    });
</script>

<!-- AlertOverlay -->
{#if displayAlert}
    <div class="alert-overlay">
        <h1 style="color: red">ALERTA</h1>
    </div>
{/if}
<!-- ./AlertOverlay -->

<!-- GameArea -->
<div class="canvas-area" bind:this={canvasArea}>
</div>
<!-- ./GameArea -->

<style>
    .canvas-area {
    }

    .alert-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: #333;
    }
</style>
