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

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

#wrapper {
	position: relative;
	height: 100vh;
	background: $primary;
}
</style>
