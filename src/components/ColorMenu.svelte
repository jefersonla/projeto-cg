<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {fly, fade} from "svelte/transition";

    enum ButtonOptions {
        HAT = 'hat',
        HAIR = 'hair'
    }

    // Cores possíveis
    const cores = [
        "#795548",
        "#333333",
        "#607D8B",
        "#9E9E9E",
        "#FFC107",
        "#FFEB3B",
        "#CDDC39",
        "#4CAF50",
        "#009688",
        "#00BCD4",
        "#03A9F4",
        "#3F51B5",
        "#673AB7",
        "#9C27B0",
        "#E91E63",
        "#F44331",
    ];

    const buttonElements = {
        [ButtonOptions.HAT]: (null as HTMLDivElement),
        [ButtonOptions.HAIR]: (null as HTMLDivElement)
    };
    let buttonSelected: ButtonOptions = ButtonOptions.HAT;

    let modalActive: boolean = true;

    const toggleButton = (buttonName: ButtonOptions) => {
        return () => { buttonSelected = buttonName; };
    };

    const closeMenu = () => {
        modalActive = true;
        dispatch('menuStateChanged', modalActive);
    }
    const openMenu = () => {
        modalActive = false;
        dispatch('menuStateChanged', modalActive);
    }

    const dispatch = createEventDispatcher();

    const colorChanged = (colorName) => {
        return () => dispatch('colorChanged', JSON.stringify({
            materialColor: colorName,
            materialName: buttonSelected
        }));
    };
</script>

<!-- ColorMenu -->
{#if !modalActive}
    <div out:fly="{{duration: 200}}" class:modalActive class="color-menu" >

        <!-- MaterialSelection -->
        <div class="object-selection">

            <!-- HatMaterial -->
            <div class:buttonSelected={buttonSelected === ButtonOptions.HAT}
                class="object-button"
                bind:this={buttonElements[ButtonOptions.HAT]}
                on:click={toggleButton(ButtonOptions.HAT)}>
                <span class="material-icons-outlined"> school </span> Hat
            </div>
            <!-- ./HatMaterial -->

            <!-- HairMaterial -->
            <div class:buttonSelected={buttonSelected === ButtonOptions.HAIR}
                class="object-button"
                bind:this={buttonElements[ButtonOptions.HAIR]}
                on:click={toggleButton(ButtonOptions.HAIR)}>
                <span class="material-icons-outlined"> face </span> Hair
            </div>
            <!-- HairMaterial -->

        </div>
        <!-- ./MaterialSelection -->

        <!-- ColorsButtons -->
        <div class="colors">
            {#each cores as cor}
                <div class="color-button" on:click={colorChanged(cor)} style="background-color: {cor}"></div>
            {/each}
        </div>
        <!-- ./ColorsButtons -->

        <!-- CloseButton -->
        <div class="close-button" on:click={closeMenu}>
            <span class="material-icons-outlined"> close </span>
        </div>
        <!-- ./CloseButton -->
    </div>
{/if}
<!-- ./ColorMenu -->

<!-- OpenMenuButton -->
{#if modalActive}
    <div transition:fade class="open-menu close-button" on:click={openMenu}>
        <span class="material-icons-outlined"> face </span>
    </div>
{/if}
<!-- ./OpenMenuButton -->

<style>
    .color-menu {
        position: absolute;
        left: 50%;
        top: 0;
        margin: 0;
        padding: 0;
        width: 50%;
        height: 100%;
        aspect-ratio: 4/3;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background: #badce3;
    }

    .object-selection {
        width: 100%;
        height: 19%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
        background: #0c63e4;
    }

    .object-button {
        height: 80%;
        background: #ffffff;
        padding: 2px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px solid #888;
        border-radius: 8px;
        min-width: calc(min(50vw / 4, 50vh / 4) - 20px);
        margin: 0 10px;
        aspect-ratio: 1;
        cursor: pointer;
    }

    .object-button:hover, .buttonSelected {
        background-color: #333333;
        color: #ffffff;
        border-color: #ffffff;
    }

    @media only screen and (min-device-height: 380px)
        and (max-device-width: 480px)
        and (orientation: landscape) {
           .object-button {
            height: 100%;
        }
    }

    .colors {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: 81%;
        width: 100%;
        overflow-y: scroll;
    }

    .color-button {
        --margin: 1rem;
        --border-size: 4px;
        --elements-per-line: 4;
        --side-size: calc((50vw / var(--elements-per-line)) - (2 * var(--margin)) - (2 * var(--border-size)));
        flex: 1 0 var(--side-size);
        max-width: var(--side-size);
        height: var(--side-size);
        max-height: calc((50vh / 4));
        border: var(--border-size) solid #e2e6f3;
        margin: 0 var(--margin) 0;
        border-radius: 1rem;
    }

    .color-button:hover {
        border-color: #333333;
        --border-size: 4px;
        cursor: pointer;
    }

    .close-button {
        --size-button: 6vh;
        position: absolute;
        right: calc((19vh / 2) - (var(--size-button) / 2));
        top: calc((19vh / 2) - (var(--size-button) / 2));
        color: #fff;
        cursor: pointer;
        border-radius: 50%;
        width: var(--size-button);
        height: var(--size-button);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0.15rem solid #ffffff;
    }

    .close-button:hover {
        color: #ff3e00;
        background-color: #ffffff;
    }

    .object-selection, .close-button {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    }

    .modalActive {
        background-color: #ff3e00;
        display: none;
    }
</style>
