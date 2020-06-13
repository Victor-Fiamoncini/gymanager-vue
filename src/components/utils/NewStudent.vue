<template>
	<b-modal
		id="new-student"
		size="lg"
		title="Cadastrar novo aluno"
		hide-footer
		v-model="show"
	>
		<b-form @submit.prevent="doStoreStudent">
			<b-row>
				<b-form-group class="col-xl-6 col-lg-12" label="Nome" label-for="name">
					<b-form-input
						type="text"
						id="name"
						trim
						required
						v-model="form.name"
					/>
				</b-form-group>
				<b-form-group
					class="col-xl-6 col-lg-12"
					label="E-mail"
					label-for="email"
				>
					<b-form-input
						type="email"
						id="email"
						trim
						required
						v-model="form.email"
					/>
				</b-form-group>
				<b-form-group class="col-xl-4 col-lg-12" label="Idade" label-for="age">
					<b-form-input type="text" id="age" trim required v-model="form.age" />
				</b-form-group>
				<b-form-group
					class="col-xl-4 col-lg-12"
					label="Peso"
					label-for="weight"
				>
					<b-form-input
						type="text"
						id="weight"
						trim
						required
						v-model="form.weight"
					/>
				</b-form-group>
				<b-form-group
					class="col-xl-4 col-lg-12"
					label="Altura"
					label-for="height"
				>
					<b-form-input
						type="text"
						id="height"
						trim
						required
						v-model="form.height"
					/>
				</b-form-group>

				<div class="modal-footer w-100 px-3 pb-0">
					<b-button
						class="mr-2"
						type="submit"
						variant="primary"
						:disabled="loading"
					>
						<template v-if="loading">
							<font-awesome-icon icon="spinner" class="fa-spin" />
							Cadastrando...
						</template>
						<template v-else>
							Cadastrar aluno
						</template>
					</b-button>
					<b-button
						class="mr-0"
						variant="light"
						type="button"
						@click="doCloseModal"
					>
						Cancelar
					</b-button>
				</div>
			</b-row>
		</b-form>
	</b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'NewStudent',
	data: () => ({
		show: false,
		form: {
			name: 'Aluno',
			email: 'aluno@mail.com',
			age: 30,
			weight: 80.0,
			height: 1.92,
		},
	}),
	computed: {
		...mapGetters('student', ['loading']),
	},
	methods: {
		...mapActions('student', ['actionStoreStudent']),

		doCloseModal() {
			this.show = false
		},
		async doStoreStudent() {
			if (await this.actionStoreStudent(this.form)) {
				this.doCloseModal()
			}
		},
	},
}
</script>
