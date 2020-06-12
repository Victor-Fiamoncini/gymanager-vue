<template>
	<div>
		<h1>{{ user.name || 'non' }}</h1>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	computed: {
		...mapGetters('session', ['user']),
	},
}
</script>

<style lang="scss" scoped></style>
