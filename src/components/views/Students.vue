<template>
	<div id="students">
		<NotificationList />
		<Navbar />
		<b-container class="py-3">
			<b-card bg-variant="light">
				<b-card-body
					class="p-0 d-flex justify-content-between align-items-center"
				>
					<b-card-title class="m-0">Gerenciamento de Alunos</b-card-title>
					<b-button variant="primary" v-b-modal.new-student>
						<font-awesome-icon icon="plus" class="mr-1" />
						Cadastrar
					</b-button>
				</b-card-body>
			</b-card>
			<b-table
				class="mt-3 rounded"
				striped
				hover
				responsive
				head-variant="light"
				table-variant="light"
				:fields="fields"
				:items="students"
			>
				<template v-slot:cell(age)="data">
					{{ `${data.item.age} anos` }}
				</template>
				<template v-slot:cell(height)="data">
					{{ `${data.item.height} m` }}
				</template>
				<template v-slot:cell(weight)="data">
					{{ `${data.item.weight} kg` }}
				</template>
			</b-table>
		</b-container>
		<NewStudent />
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import NewStudent from '@/components/utils/NewStudent'
import NotificationList from '@/components/layout/NotificationList'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Home',
	data: () => ({
		fields: [
			{
				key: 'name',
				label: 'Nome',
				headerTitle: 'Nome',
				sortable: true,
			},
			{
				key: 'email',
				label: 'E-mail',
				headerTitle: 'E-mail',
				sortable: true,
			},
			{
				key: 'age',
				label: 'Idade',
				headerTitle: 'Idade',
				sortable: true,
			},
			{
				key: 'height',
				label: 'Altura',
				headerTitle: 'Altura',
				sortable: true,
			},
			{
				key: 'weight',
				label: 'Peso',
				headerTitle: 'Peso',
				sortable: true,
			},
		],
	}),
	components: {
		Navbar,
		NewStudent,
		NotificationList,
	},
	computed: {
		...mapGetters('student', ['students']),
	},
	methods: {
		...mapActions('student', ['actionFetchStudents']),
	},
	async created() {
		await this.actionFetchStudents()
	},
}
</script>
