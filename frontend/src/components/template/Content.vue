<template>
	<div class="content ma-0 pa-6">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
	name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: #efefef;
    }
</style>