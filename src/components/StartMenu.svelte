<script lang="ts">
    export let disabled = true;
</script>

<div class="load-bar" class:disabled>
    <img src="images/escolinha.png" alt="Escolinha logo">

    <div class="menu">
        <button type="button" class="btn btn-primary">Play!</button>
    </div>

</div>

<style>
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
        /*height: 5vh;*/
    }

    .disabled {
        display: none;
    }
</style>
