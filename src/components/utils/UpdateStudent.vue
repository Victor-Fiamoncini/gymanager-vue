<template>
	<b-modal
		id="update-student"
		size="lg"
		:title="`Atualizar aluno(a) ${student.name}`"
		hide-footer
		v-model="show"
		body-bg-variant="light"
	>
		<b-form @submit.prevent="doUpdateStudent">
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
							Atualizando...
						</template>
						<template v-else>
							Atualizar
						</template>
					</b-button>
					<b-button
						class="mr-0"
						variant="secondary"
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
	name: 'UpdateStudent',
	props: ['student'],
	data: () => ({
		show: false,
		form: {
			name: null,
			email: null,
			age: null,
			weight: null,
			height: null,
		},
	}),
	computed: {
		...mapGetters('student', ['loading']),
	},
	methods: {
		...mapActions('student', ['actionUpdateStudent']),

		doCloseModal() {
			this.show = false
		},
		async doUpdateStudent() {
			if (await this.actionUpdateStudent({ ...this.$props.student })) {
				this.form.name = null
				this.form.email = null
				this.form.age = null
				this.form.weight = null
				this.form.height = null
			}
		},
	},
	updated() {
		this.form.name = this.$props.student.name
		this.form.email = this.$props.student.email
		this.form.age = this.$props.student.age
		this.form.weight = this.$props.student.weight
		this.form.height = this.$props.student.height
	},
}
</script>
