<template>
	<b-modal
		id="delete-plan"
		size="md"
		hide-footer
		:title="`Deletar plano ${plan.title}`"
		v-model="show"
	>
		<b-row>
			<b-col>
				<p>Você tem certeza que deseja deletar o plano {{ plan.title }}?</p>
			</b-col>
			<div class="modal-footer w-100 px-3 pb-0">
				<b-button
					class="mr-2"
					type="submit"
					variant="primary"
					@click="doDeletePlan"
				>
					<font-awesome-icon icon="trash-alt" class="mr-1" />
					Sim, deletar
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
	</b-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'DeletePlan',
	props: ['plan'],
	data: () => ({
		show: false,
	}),
	methods: {
		...mapActions('plan', ['actionDeletePlan', 'actionUnsetPlan']),

		doCloseModal() {
			this.show = false
			this.actionUnsetPlan()
		},
		async doDeletePlan() {
			if (await this.actionDeletePlan({ ...this.plan })) {
				this.doCloseModal()
			}
		},
	},
}
</script>
