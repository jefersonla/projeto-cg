<script lang="ts">
    import Button from '../components/Button.svelte';
</script>

<nav>
    <h1> 🏫 LowPolySchool! </h1>
    <Button />
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    h1 {
        color: #ff3e00;
        font-size: 2rem;
        font-weight: 200;
        line-height: 1.1;
        margin: 1rem 0 1.3rem;
        text-align: left;
    }
</style>
