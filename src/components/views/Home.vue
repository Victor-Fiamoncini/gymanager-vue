<template>
	<div id="home">
		<Navbar />
		<b-container class="py-3">
			<b-jumbotron>
				<div class="brand">
					<p class="text-primary">Bem-vindo(a) ao Gymanager</p>
					<h1>{{ user.name }}</h1>
				</div>
			</b-jumbotron>
		</b-container>
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	components: {
		Navbar,
	},
	computed: {
		...mapGetters('session', ['user']),
	},
}
</script>

<style lang="scss" scoped>
#home {
	.brand {
		p {
			font-size: 1.5rem;
		}
	}
}
</style>
