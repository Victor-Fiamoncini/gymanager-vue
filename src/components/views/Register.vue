<template>
	<div id="page-register" class="guest-page">
		<form @submit.prevent="doRegister">
			<b-card class="shadow border border-secondary" bg-variant="light">
				<h1 class="brand-title">
					<img
						src="@/assets/images/logo.png"
						alt="Gymananger Logo"
						title="Gymanager"
					/>
					Gymanager
				</h1>
				<b-card-body>
					<b-form-group>
						<b-form-input
							type="text"
							trim
							required
							placeholder="Nome"
							v-model="form.name"
						/>
					</b-form-group>
					<b-form-group>
						<b-form-input
							type="email"
							trim
							required
							placeholder="E-mail"
							v-model="form.email"
						/>
					</b-form-group>
					<b-form-group>
						<b-form-input
							type="password"
							trim
							required
							placeholder="Senha"
							v-model="form.password"
						/>
					</b-form-group>
					<b-button block variant="primary" type="submit" :disabled="loading">
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Cadastrando...
						</template>
						<template v-else>
							<font-awesome-icon icon="sign-in-alt" />
							Cadastrar
						</template>
					</b-button>
					<b-row>
						<b-col>
							<router-link to="/" class="guest-link">
								Faça seu logon aqui
							</router-link>
						</b-col>
					</b-row>
				</b-card-body>
			</b-card>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Register',
	data: () => ({
		form: {
			name: null,
			email: null,
			password: null,
		},
	}),
	computed: {
		...mapGetters('session', ['loading']),
	},
	methods: {
		...mapActions('session', ['actionRegister']),

		async doRegister() {
			await this.actionRegister(this.form)
		},
	},
}
</script>
