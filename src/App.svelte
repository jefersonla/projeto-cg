<script lang="ts">
  /* --- Layout Components --- */
  // import Header from './layout/Header.svelte';
  
  /* --- Other Components --- */
  import Game from './project/Game.svelte';
</script>

<main>

  <!-- Header -->
  <!-- <Header /> -->
  <!-- ./Header -->

  <!-- Game -->
  <Game />
  <!-- ./Game -->
  
</main>

<style>
  @import 'material-icons/iconfont/material-icons.css';

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
  }

  :global(html) {
    height: 100%;
  }

  @media only screen and (max-height: 575.98px) and (orientation: landscape) {
    :root{
      font-size: 10px;
    }
  }

  :global(body) {
    margin: 0;
    padding: 0;
    min-height: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    background-color: #222;
  }

  :global(#app) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main {
    text-align: center;
    margin: 0 auto;
  }
</style>
