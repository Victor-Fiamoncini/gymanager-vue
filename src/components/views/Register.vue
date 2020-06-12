<template>
	<div id="register">
		<form @submit.prevent="doRegisterRequest">
			<b-card class="shadow">
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
							aria-describedby="input-live-help name-feedback"
							v-model="form.name.text"
							:state="form.name.valid"
						/>
						<b-form-invalid-feedback id="name-feedback">
							{{ doGetInputValidationMessage('name') }}
						</b-form-invalid-feedback>
					</b-form-group>
					<b-form-group>
						<b-form-input
							type="email"
							trim
							required
							placeholder="E-mail"
							aria-describedby="input-live-help email-feedback"
							v-model="form.email.text"
							:state="form.email.valid"
						/>
						<b-form-invalid-feedback id="email-feedback">
							{{ doGetInputValidationMessage('email') }}
						</b-form-invalid-feedback>
					</b-form-group>
					<b-form-group>
						<b-form-input
							type="password"
							trim
							required
							placeholder="Senha"
							aria-describedby="input-live-help password-feedback"
							v-model="form.password.text"
							:state="form.password.valid"
						/>
						<b-form-invalid-feedback id="password-feedback">
							{{ doGetInputValidationMessage('password') }}
						</b-form-invalid-feedback>
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
	name: 'Register',
	data: () => ({
		form: {
			name: {
				text: '',
				valid: null,
			},
			email: {
				text: '',
				valid: null,
			},
			password: {
				text: '',
				valid: null,
			},
		},
	}),
	computed: {
		...mapGetters('session', ['errors', 'loading']),
	},
	methods: {
		...mapActions('session', ['actionRegister']),

		doFilterError(field) {
			return this.errors.filter(err => err.details[0].context.key === field)
		},
		doInputValidation(field) {
			if (this.doFilterError(field).length > 0) {
				this.form[field].valid = false
			} else {
				this.form[field].valid = null
			}
		},
		doGetInputValidationMessage(field) {
			if (this.errors) {
				return this.errors.map(({ details }) => {
					return details[0].context.key === field && details[0].context.label
				})[0]
			}
		},
		async doRegisterRequest() {
			await this.actionRegister({
				name: this.form.name.text,
				email: this.form.email.text,
				password: this.form.password.text,
			})

			Object.keys(this.form).forEach(field => this.doInputValidation(field))
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
