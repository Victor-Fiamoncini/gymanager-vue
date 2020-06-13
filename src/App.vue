<template>
	<div id="wrapper">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App',
}
</script>

<style lang="scss">
@import '@/assets/scss/app.scss';

#wrapper {
	position: relative;
	height: 100%;
	background: $primary;
}
</style>
