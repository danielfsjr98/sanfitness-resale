<template>
	<div class="page-title">
        <h1><v-icon x-large v-if="icon" class="pb-2"> {{ icon }} </v-icon> {{ main }}</h1>
        <h2 class="sub">{{ sub }}</h2>
        <hr>
    </div>
</template>

<script>

export default {
	name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title h1 {
        margin: 0;
    }
    .page-title h2 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }
</style>