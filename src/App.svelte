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
  }

  :global(html) {
    height: 100%;
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

  :global(body > div) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main {
    text-align: center;
    margin: 0 auto;
  }
</style>
