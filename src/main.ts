// @ts-ignore
import App from './App.svelte';

// Adiciona método para randomizar vetor
declare global {
  interface Array<T> {
    shuffle<T>(this: Array<T>): Array<T>;
  }
}

/**
 * Randomiza os valores do vetor
 */
Array.prototype.shuffle = function <T>(this: Array<T>): Array<T> {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]];
  }

  return this;
}

// Define a aplicação
const app = new App({
  target: document.getElementById('app')
});

export default app;
