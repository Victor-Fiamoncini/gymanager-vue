<template>
	<div id="wrapper">
		<NotificationList />
		<router-view />
	</div>
</template>

<script>
import NotificationList from '@/components/layout/NotificationList'

export default {
	name: 'App',
	components: {
		NotificationList,
	},
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
