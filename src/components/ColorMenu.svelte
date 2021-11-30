<script lang="ts">
   const cores = [
        '#9E9E9E',
        '#FFEB3B',
        '#CDDC39',
        '#00BCD4',
        '#FFC107',
        '#03A9F4',
        '#4CAF50',
        '#2196F3',
        '#607D8B',
        '#009688',
        '#F44331',
        '#E91E63',
        '#795548',
        '#9C27B0',
        '#3F51B5',
        '#673AB7',
    ];
</script>

<div class="color-menu">
    {#each cores as cor}
        <div style="background-color: ${cor}; width:30px; heigth:30px">

        </div>
    {/each}
</div>

<style>
    .color-menu{
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
</style>