<template>
	<div id="page-resetpassword" class="guest-page">
		<form @submit.prevent="doResetPassword">
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
							placeholder="Chave para recuperação"
							v-model="form.resetToken"
						/>
					</b-form-group>
					<b-row>
						<b-col lg="6">
							<b-form-group>
								<b-form-input
									type="password"
									trim
									required
									placeholder="Nova senha"
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
									placeholder="Confirme a senha"
									v-model="form.confirmPassword"
								/>
							</b-form-group>
						</b-col>
					</b-row>
					<b-button block type="submit" variant="primary">
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Cadastrando...
						</template>
						<template v-else>
							<font-awesome-icon icon="sign-in-alt" />
							Cadastrar nova senha
						</template>
					</b-button>
					<b-row>
						<b-col lg="6">
							<router-link to="/" class="guest-link">
								Faça seu logon aqui
							</router-link>
						</b-col>
						<b-col lg="6" class="text-lg-right">
							<router-link to="/cadastro" class="guest-link">
								Cadastre-se aqui
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
	name: 'ResetPassword',
	data: () => ({
		form: {
			resetToken: '',
			password: '',
			confirmPassword: '',
		},
	}),
	computed: {
		...mapGetters('session', ['loading']),
	},
	methods: {
		...mapActions('session', ['actionResetPassword']),

		async doResetPassword() {
			await this.actionResetPassword(this.form)
		},
	},
}
</script>
