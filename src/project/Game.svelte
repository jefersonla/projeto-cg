<script lang="ts">
    /* ------ Svelte Libraries ------ */
    // import { onMount } from 'svelte';
    import {fade} from "svelte/transition";

    /* ------ Svelte Components ------ */
    import LoadBar from '../components/LoadBar.svelte';
    import ColorMenu from '../components/ColorMenu.svelte';
    import StartMenu from '../components/StartMenu.svelte';
    import FloatMessage from '../components/FloatMessage.svelte';

    /* ------ App Components ------ */
    import { MainGame } from './main-game';
    import { Vector3 } from "three";
    import {onMount} from "svelte";

    // ---------------------- DEBUG MODE ---------------------- //
    const DEBUG_MODE = true;
    // ---------------------- DEBUG MODE ---------------------- //

    // Camera focada na frente do player
    let focusedCamera = false;

    // Elemento da tela
    let canvasArea: HTMLDivElement;
    let displayAlert: boolean = false;

    // Indica a execução do jogo
    let gameStarted = false;

    // Inicio da aplicação
    let startMenuDisabled = false;
    let loadBarDisabled = true;

    // Component Events
    let colorChanged: (event: CustomEvent) => void;
    let menuStateChanged: (event: CustomEvent) => void;

    // Armazena o jogo
    let game: MainGame;

    // Items do jogo
    let gameItens = [
        {
            name: 'Verde',
            nameColor: 'green',
            textColor: 'blue',
            correct: false,
            position: new Vector3(10, 0, 15)
        },
        {
            name: 'Azul',
            nameColor: 'blue',
            textColor: 'orange',
            correct: false,
            position: new Vector3(0, 0, 10)
        },
        {
            name: 'Preto',
            nameColor: 'black',
            textColor: 'red',
            correct: false,
            position: new Vector3(8, 0, 5)
        },
        {
            name: 'Vermelho',
            nameColor: 'red',
            textColor: 'black',
            correct: false,
            position: new Vector3(4, 0, 3)
        },
        {
            name: 'Amarelo',
            nameColor: 'yellow',
            textColor: 'green',
            correct: false,
            position: new Vector3(10, 0, 2)
        },
        {
            name: 'Rosa',
            nameColor: 'pink',
            textColor: 'purple',
            correct: false,
            position: new Vector3(10, 0, 30)
        }
    ];

    // Redimensiona e checa se o jogo pode rodar
    const resizeAndControlGame = () => {
        // Checa se o jogo pode
        game.setRenderSize();

        if (game.isPageRatioAllowed()) {
            displayAlert = false;
            if (gameStarted) {
                game.run();
            }
        } else {
            displayAlert = true;
            game.stop();
        }
    };

    // Barra de progresso
    let progressValue = 0;

    // Notifica que houve alterações nos dados do jogo para atualizar a interface
    const notify = () => {
        gameItens = gameItens;
    };

    // Estado do jogo mudou
    const gameStateChanged = () => {
        startMenuDisabled = true;
        loadBarDisabled = false;
        gameStarted = true;

        // Cria e dar inicio ao jogo
        game = new MainGame(canvasArea, gameItens, notify, true, (progress, finished) => {
            if (finished) {
                setTimeout(() => loadBarDisabled = true, 600);
            }

            progressValue = progress;
        });

        // Apenas rodar em telas 4:3 até 16:9
        window.addEventListener('resize', resizeAndControlGame);

        // Troca de cor ocorreu
        colorChanged = (event: CustomEvent) => {
            const val: {materialColor: string, materialName: string} = JSON.parse(event.detail);
            game.changePlayerMaterial(val.materialName, val.materialColor);
        };

        // Menu foi clicado
        menuStateChanged = (event: CustomEvent) => {
            focusedCamera = !JSON.parse(event.detail);
            game.useFrontCamera = focusedCamera;
        };

        resizeAndControlGame();
    };

    // Inicia o jogo caso seja ambiente de debug
    if (DEBUG_MODE) {
        onMount(() => {
            startMenuDisabled = true;
            loadBarDisabled = true;
            gameStarted = true;
            gameStateChanged();
        });
    }
</script>

<!--  -->
<StartMenu on:gameStateChanged={gameStateChanged} bind:disabled={startMenuDisabled} />
<!-- ./ -->

<!-- LoadBar -->
<LoadBar bind:disabled={loadBarDisabled} bind:progressValue />
<!-- ./LoadBar -->

<!-- FloatMessage -->
<FloatMessage bind:elements={gameItens} disabled={!(gameStarted && !displayAlert && !focusedCamera)}/>

<!-- AlertOverlay -->
{#if displayAlert}
    <div transition:fade class="alert-overlay">
        <span class="material-icons-outlined">
            screen_rotation
        </span>
        <h1> Vire o Smartphone ou maximize a tela para começar! </h1>
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
    :global(.dg.ac) {
        left: calc(50% - (245px / 2)) !important;
        right: unset !important;
        z-index: 50 !important;
    }

    .canvas-area {
        /* Canvas */
    }

    .alert-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 20px 0 0;
        padding: 0;
        background: #333;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 100;
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
