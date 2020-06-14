<template>
	<b-modal
		id="delete-student"
		size="md"
		hide-footer
		:title="`Deletar aluno(a) ${student.name}`"
		v-model="show"
	>
		<b-row>
			<b-col>
				<p>
					Você tem certeza que deseja deletar o aluno(a) {{ student.name }}?
				</p>
			</b-col>
			<div class="modal-footer w-100 px-3 pb-0">
				<b-button
					class="mr-2"
					type="submit"
					variant="primary"
					@click="doDeleteStudent"
				>
					<font-awesome-icon icon="trash-alt" class="mr-1" />
					Sim, excluír
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
	name: 'DeleteStudent',
	props: ['student'],
	data: () => ({
		show: false,
	}),
	methods: {
		...mapActions('student', ['actionDeleteStudent']),

		doCloseModal() {
			this.show = false
		},
		async doDeleteStudent() {
			if (await this.actionDeleteStudent({ ...this.student })) {
				this.doCloseModal()
			}
		},
	},
}
</script>
