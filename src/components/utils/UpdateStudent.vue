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
						v-model="student.name"
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
						v-model="student.email"
					/>
				</b-form-group>
				<b-form-group class="col-xl-4 col-lg-12" label="Idade" label-for="age">
					<b-form-input
						type="text"
						id="age"
						trim
						required
						v-model="student.age"
					/>
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
						v-model="student.weight"
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
						v-model="student.height"
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
							<font-awesome-icon icon="edit" class="mr-1" />
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
import { mapActions } from 'vuex'

export default {
	name: 'UpdateStudent',
	props: ['loading', 'student'],
	data: () => ({
		show: false,
	}),
	methods: {
		...mapActions('student', ['actionUpdateStudent', 'actionUnsetStudent']),

		doCloseModal() {
			this.show = false
			this.actionUnsetStudent()
		},
		async doUpdateStudent() {
			const updated = await this.actionUpdateStudent({
				...this.$props.student,
				id: this.$props.student.id,
			})

			if (updated) {
				this.doCloseModal()
			}
		},
	},
}
</script>
