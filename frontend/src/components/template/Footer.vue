<template>
	<footer class="footer">
        <span>Copyright <strong>Daniel</strong></span>
    </footer>
</template>

<script>
export default {
	name: 'Content'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #DDD;
        color: #333;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
    }
</style>