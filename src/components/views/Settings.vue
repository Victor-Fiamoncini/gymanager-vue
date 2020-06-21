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
									<h4 class="display-6 mb-3">Atualizar login</h4>
								</b-col>
							</b-row>
							<b-form-group>
								<b-form-input
									type="text"
									trim
									required
									placeholder="Nome"
									v-model="user.name"
								/>
							</b-form-group>
							<b-form-group>
								<b-form-input
									type="email"
									trim
									required
									placeholder="E-mail"
									v-model="user.email"
								/>
							</b-form-group>
							<b-form-group>
								<b-form-input
									type="password"
									trim
									required
									placeholder="Senha atual"
									v-model="form.currentPassword"
								/>
							</b-form-group>
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
							<b-row>
								<b-col>
									<b-button variant="primary" type="submit" :disabled="loading">
										<template v-if="loading">
											<font-awesome-icon icon="spinner" class="fa-spin" />
											Atualizando...
										</template>
										<template v-else>
											<font-awesome-icon icon="sign-in-alt" class="mr-1" />
											Atualizar dados
										</template>
									</b-button>
								</b-col>
							</b-row>
						</form>
					</b-col>
					<b-col lg="6">
						<form
							@submit.prevent="doUpdateUserPhoto"
							enctype="multipart/form-data"
						>
							<b-col>
								<h4 class="display-6">Atualizar foto</h4>
							</b-col>
							<b-col class="mt-3">
								<b-form-file
									v-model="photo"
									accept=".jpg, .png"
									placeholder="Arraste ou insira sua foto aqui"
									drop-placeholder="Arraste e solte sua foto aqui"
								/>
							</b-col>
							<b-col class="mt-3">
								<b-button variant="primary" type="submit">
									<font-awesome-icon icon="camera" class="mr-1" />
									Atualizar foto
								</b-button>
							</b-col>
						</form>
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
			currentPassword: null,
			password: null,
			confirmPassword: null,
		},
		photo: null,
	}),
	computed: {
		...mapGetters('session', ['loading', 'user']),
	},
	methods: {
		...mapActions('session', ['actionUpdateUser', 'actionUpdateUserPhoto']),

		async doUpdateUser() {
			await this.actionUpdateUser({
				name: this.user.name,
				email: this.user.email,
				currentPassword: this.form.currentPassword,
				password: this.form.password,
				confirmPassword: this.form.confirmPassword,
			})
		},
		async doUpdateUserPhoto() {
			await this.actionUpdateUserPhoto(this.photo)
			this.photo = ''
		},
	},
}
</script>

<style lang="scss" scoped>
#page-settings {
	height: 100vh;
}
</style>
