<template>
	<div id="page-logon">
		<form @submit.prevent="doLogonRequest">
			<b-card class="shadow" bg-variant="light">
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
					<b-button
						block
						variant="primary"
						:disabled="loading"
						@click.prevent="doLogonRequest"
					>
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Entrando...
						</template>
						<template v-else>
							<font-awesome-icon icon="sign-in-alt" />
							Entrar
						</template>
					</b-button>
					<router-link to="/cadastro" class="guest-link">
						Ainda não possui uma conta? Cadastre-se aqui
					</router-link>
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

		async doLogonRequest() {
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
