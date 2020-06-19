<template>
	<div id="page-registration">
		<Navbar />
		<b-container class="py-3">
			<b-card bg-variant="light" class="shadow">
				Registration
			</b-card>
		</b-container>
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
	name: 'Registration',
	components: {
		Navbar,
	},
}
</script>

<style lang="scss" scoped>
#page-registration {
	height: 100vh;
}
</style>
