<script lang="ts">
    const cores = [
        "#333333",
        "#9E9E9E",
        "#607D8B",
        "#795548",
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
</script>

<div class="color-menu">
    <div class="object-selection">
        <div class="object-button"> <span class="material-icons-outlined"> school </span> Hat </div>
        <div class="object-button"> <span class="material-icons-outlined"> face </span> Hair </div>
    </div>
    <div class="colors">
        {#each cores as cor}
            <div class="color-button" style="background-color: {cor}"></div>
        {/each}
    </div>
</div>

<style>
    .color-menu {
        position: absolute;
        left: 50%;
        top: 0;
        margin: 0;
        padding: 0;
        width: 50%;
        height: 100%;
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
        height: 100%;
        background: #ffffff;
        padding: 2px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px solid #888;
        border-radius: 8px;
        min-width: calc((50vw / 4) - 20px);
        margin: 0 10px;
    }

    .colors {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: 81%;
    }

    .color-button {
        flex: 1 0 calc((50vw / 4) - 20px);
        max-width: calc((50vw / 4) - 20px);
        height: calc((50vw / 4) - 20px);
        border: 4px solid #e2e6f3;
        margin: 0 10px 0;
        border-radius: 8px;
    }
</style>
