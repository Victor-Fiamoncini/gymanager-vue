<template>
	<b-modal
		id="update-plan"
		size="lg"
		:title="`Atualizar plano ${plan.title}`"
		hide-footer
		v-model="show"
		body-bg-variant="light"
	>
		<b-form @submit.prevent="doUpdatePlan">
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
						v-model="plan.title"
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
						v-model="plan.price"
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
						v-model="plan.duration"
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
	name: 'UpdatePlan',
	props: ['loading', 'plan'],
	data: () => ({
		show: false,
	}),
	methods: {
		...mapActions('plan', ['actionUpdatePlan', 'actionUnsetPlan']),

		doCloseModal() {
			this.show = false
			this.actionUnsetPlan()
		},
		async doUpdatePlan() {
			const updated = await this.actionUpdatePlan({
				...this.$props.plan,
				id: this.$props.plan.id,
			})

			if (updated) {
				this.doCloseModal()
			}
		},
	},
}
</script>
