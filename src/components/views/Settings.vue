<template>
	<div id="page-settings">
		<Navbar />
		<b-container class="py-3">
			<b-card bg-variant="light" class="shadow">
				<b-card-body class="row p-0">
					<b-col lg="6">
						<form @submit.prevent="doUpdateUser">
							<b-row>
								<b-col>
									<h4 class="display-6 mb-3">Atualizar dados</h4>
								</b-col>
							</b-row>
							<b-row>
								<b-col lg="6">
									<b-form-group>
										<b-form-input
											type="text"
											trim
											required
											placeholder="Nome"
											v-model="user.name"
										/>
									</b-form-group>
								</b-col>
								<b-col lg="6">
									<b-form-group>
										<b-form-input
											type="email"
											trim
											required
											placeholder="E-mail"
											v-model="user.email"
										/>
									</b-form-group>
								</b-col>
							</b-row>
							<b-row>
								<b-col lg="6">
									<b-form-group>
										<b-form-input
											type="password"
											trim
											required
											placeholder="Senha"
											v-model="form.password"
										/>
									</b-form-group>
								</b-col>
								<b-col lg="6">
									<b-form-group>
										<b-form-input
											type="password"
											trim
											required
											placeholder="Confirmar senha"
											v-model="form.confirmPassword"
										/>
									</b-form-group>
								</b-col>
							</b-row>
							<b-button variant="primary" type="submit" :disabled="loading">
								<template v-if="loading">
									<font-awesome-icon icon="spinner" class="fa-spin" />
									Atualizando...
								</template>
								<template v-else>
									<font-awesome-icon icon="sign-in-alt" />
									Atualizar
								</template>
							</b-button>
						</form>
					</b-col>
					<b-col lg="6" class="mt-lg-0 mt-3">
						<b-row>
							<b-col>
								<h4 class="display-6 mb-3">
									Informações úteis
								</h4>
							</b-col>
						</b-row>
						<b-jumbotron bg-variant="white" class="p-3">
							<b-badge variant="secondary" class="p-2">Hello</b-badge>
						</b-jumbotron>
					</b-col>
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
	data: () => ({
		form: {
			password: null,
			confirmPassword: null,
		},
	}),
	computed: {
		...mapGetters('session', ['loading', 'user']),
	},
	methods: {
		...mapActions('session', ['actionUpdateUser']),

		async doUpdateUser() {
			await this.actionUpdateUser({
				id: this.user.id,
				name: this.user.name,
				email: this.user.email,
				password: this.form.password,
				confirmPassword: this.form.confirmPassword,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
#page-settings {
	height: 100vh;
	.brand {
		p {
			font-size: 1.5rem;
		}
	}
}
</style>
