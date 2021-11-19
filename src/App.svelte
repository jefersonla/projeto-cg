<script lang="ts">
  /* --- Layout Components --- */
  import Header from './layout/Header.svelte';
  
  /* --- Other Components --- */
  import Game from './project/Game.svelte';
</script>

<main>

  <!-- HeaderComponents -->
  <Header />
  <!-- ./HeaderComponents -->

  <!-- GameComponent -->
  <Game />
  <!-- ./GameComponent -->
</main>

<style>
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
  }

  :global(body > div) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 80vw;
    max-height: 80vw;
  }
</style>
