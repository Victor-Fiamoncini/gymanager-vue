<template>
	<div id="page-logon" class="guest-page">
		<form @submit.prevent="doLogon">
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
					<b-button block type="submit" variant="primary" :disabled="loading">
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Entrando...
						</template>
						<template v-else>
							<font-awesome-icon icon="sign-in-alt" />
							Entrar
						</template>
					</b-button>
					<b-row>
						<b-col lg="6">
							<router-link to="/esqueceu-a-senha" class="guest-link">
								Recuperar senha
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
	name: 'Logon',
	data: () => ({
		form: {
			email: '',
			password: '',
		},
	}),
	computed: {
		...mapGetters('session', ['loading']),
	},
	methods: {
		...mapActions('session', ['actionLogon']),

		async doLogon() {
			await this.actionLogon(this.form)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

#page-logon {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	form {
		width: 100%;
		max-width: 520px;
		.brand-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 80px;
				margin: 0 0 12px;
			}
		}
		button {
			margin: 0 0 20px;
		}
	}
}
</style>
