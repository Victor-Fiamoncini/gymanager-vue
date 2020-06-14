<template>
	<b-modal
		id="new-plan"
		size="lg"
		title="Cadastrar novo plano"
		hide-footer
		v-model="show"
		body-bg-variant="light"
	>
		<b-form @submit.prevent="doStorePlan">
			<b-row>
				<b-form-group
					class="col-xl-4 col-lg-12"
					label="Título"
					label-for="title"
				>
					<b-form-input
						type="text"
						id="title"
						trim
						required
						v-model="form.title"
					/>
				</b-form-group>
				<b-form-group
					class="col-xl-4 col-lg-12"
					label="Preço"
					label-for="price"
				>
					<b-form-input
						type="text"
						id="price"
						trim
						required
						v-model="form.price"
					/>
				</b-form-group>
				<b-form-group
					class="col-xl-4 col-lg-12"
					label="Duração (em meses)"
					label-for="duration"
				>
					<b-form-input
						type="text"
						id="duration"
						trim
						required
						v-model="form.duration"
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
							<font-awesome-icon icon="plus" class="mr-1" />
							Cadastrar
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
	name: 'NewPlan',
	data: () => ({
		show: false,
		form: {
			title: null,
			price: null,
			duration: null,
		},
	}),
	computed: {
		...mapGetters('plan', ['loading']),
	},
	methods: {
		...mapActions('plan', ['actionStorePlan']),

		doCloseModal() {
			this.show = false
		},
		async doStorePlan() {
			if (await this.actionStorePlan(this.form)) {
				this.doCloseModal()

				this.form.title = null
				this.form.price = null
				this.form.duration = null
			}
		},
	},
}
</script>
