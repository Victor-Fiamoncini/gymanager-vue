<template>
	<div id="register">
		<form @submit.prevent="doRegisterRequest">
			<b-card>
				<h1 class="brand-title">
					<img
						src="../assets/images/logo.png"
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
					<b-button
						block
						variant="primary"
						:disabled="loading"
						@click.prevent="doRegisterRequest"
					>
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Cadastrando...
						</template>
						<template v-else>
							<font-awesome-icon icon="sign-in-alt" />
							Cadastrar
						</template>
					</b-button>
					<router-link to="/" class="guest-link">
						Já possui conta? Faça seu logon aqui
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
		...mapActions('session', ['actionRegister']),
		async doRegisterRequest() {
			await this.actionRegister(this.form)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

#register {
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
