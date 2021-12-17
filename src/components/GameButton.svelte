<script lang="ts">
  import {fade} from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  // Exporta o nome do ícone, que pode ser modificado
  export let iconName = 'face';

  const dispatcher = createEventDispatcher();

  /**
 * Dispara evento quando o botão é clicado
 *
 * @param evt
 */
  const buttonClicked = (evt) => {
    dispatcher('buttonClicked', evt);
  }
</script>

<!-- Botão -->
<div transition:fade class="open-menu close-button" on:click={buttonClicked}>
    <span class="material-icons-outlined"> {iconName} </span>
</div>
<!-- ./Botão -->
