<template>
	<div id="page-home">
		<Navbar />
		<b-container class="py-3">
			<b-card bg-variant="light" class="shadow">
				<b-card-body class="p-0">
					<b-row>
						<b-col>
							<b-jumbotron class="p-0 text-center">
								<b-avatar class="mb-3" size="180px" :src="user.photo_url" />
								<h1>Seja bem-vindo {{ user.name }}</h1>
							</b-jumbotron>
						</b-col>
					</b-row>
					<hr />
					<b-row>
						<b-col class="mt-lg-0 mt-3">
							<b-row>
								<b-col>
									<h4 class="display-6 mb-3">Informações úteis</h4>
								</b-col>
							</b-row>
							<b-jumbotron bg-variant="white" class="p-3 mb-0">
								<b-badge variant="secondary" class="p-2">Hello</b-badge>
							</b-jumbotron>
						</b-col>
					</b-row>
				</b-card-body>
			</b-card>
		</b-container>
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Settings',
	components: {
		Navbar,
	},
	computed: {
		...mapGetters('session', ['loading', 'user']),
	},
}
</script>

<style lang="scss" scoped>
#page-home {
	height: 100vh;
}
</style>
