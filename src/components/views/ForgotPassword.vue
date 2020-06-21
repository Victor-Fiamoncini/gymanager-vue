<template>
	<div id="page-forgotpassword" class="guest-page">
		<form @submit.prevent="doSendResetToken">
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
							type="email"
							trim
							required
							placeholder="Informe o e-mail da sua conta"
							v-model="form.email"
						/>
					</b-form-group>
					<b-button block type="submit" variant="primary">
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Enviando...
						</template>
						<template v-else>
							<font-awesome-icon icon="envelope" />
							Enviar solicitação
						</template>
					</b-button>
					<div class="d-flex justify-content-between">
						<router-link to="/" class="guest-link">
							Faça seu logon aqui
						</router-link>
						<router-link to="/cadastro" class="guest-link">
							Cadastre-se aqui
						</router-link>
					</div>
				</b-card-body>
			</b-card>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'ForgotPassword',
	data: () => ({
		form: {
			email: '',
		},
	}),
	computed: {
		...mapGetters('session', ['loading']),
	},
	methods: {
		...mapActions('session', ['actionSendResetToken']),

		async doSendResetToken() {
			await this.actionSendResetToken({ email: this.form.email })
		},
	},
}
</script>
