<script lang="ts">
  function startGame(): void {
    console.log('Inicia o jogo!');
  }
</script>

<button on:click={startGame}>
  Play!
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2rem;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
