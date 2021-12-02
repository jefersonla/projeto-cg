<script lang="ts">
</script>

<div class="loadbar">
    <img src="images/escolinha.png" alt="Escolinha logo">
    
    <div class="progress ">
        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
    </div>

</div>

<style>
    .loadbar{
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #808080;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .loadbar img {
        width: 40vw;
        height: auto;
    }

    .progress{
        width: 80vw;
        height: 5vh;
    }
    
</style>