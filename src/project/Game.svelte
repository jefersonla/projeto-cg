<script lang="ts"> 
    import { onMount } from 'svelte';

    import { MainGame } from './main-game';

    /* ------ Svelte Components ------ */
    import LoadBar from '../components/LoadBar.svelte';
    import ColorMenu  from '../components/ColorMenu.svelte';

    let focusedCamera = false;

    let canvasArea: HTMLDivElement;
    let displayAlert: boolean = false;

    let colorChanged: (event: CustomEvent) => void;
    let menuStateChanged: (event: CustomEvent) => void;

    // Aguarda o componente carregar
    onMount(() => {
        // Cria e dar inicio ao jogo
        const game = new MainGame(canvasArea, true);

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

        colorChanged = (event: CustomEvent) => {
            const val: {materialColor: string, materialName: string} = JSON.parse(event.detail);
            console.log(JSON.parse(event.detail));
            game.changePlayerMaterial(val.materialName, val.materialColor);
        };

        menuStateChanged = (event: CustomEvent) => {
            focusedCamera = !JSON.parse(event.detail);
            game.useFrontCamera = focusedCamera;
        };
    });
</script>

<!-- LoadBar -->
<LoadBar />
<!-- ./LoadBar -->

<!-- AlertOverlay -->
{#if displayAlert}
    <div class="alert-overlay">
        <span class="material-icons-outlined">
            screen_rotation
        </span>
        <h1>Vire o Smartphone para começar!</h1>
    </div>
{/if}
<!-- ./AlertOverlay -->

<!-- ColorMenu -->
<ColorMenu on:colorChanged={colorChanged} on:menuStateChanged={menuStateChanged} />
<!-- ./ColorMenu -->

<!-- GameArea -->
<div class="canvas-area" class:focusedCamera bind:this={canvasArea}>
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
        color: white;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;        
    }

    .alert-overlay h1 {
        font-size: 18px;
        font-family: sans-serif, 'sans-serif','Roboto';
        max-width: 75vw;
        margin-top: 10px;
    }

    :global(.focusedCamera > canvas) {
        position: absolute;
        top: 0;
        left: -25%;
        z-index: -1;
    }
</style>
