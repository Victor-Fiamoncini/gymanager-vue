<template>
	<div id="page-students">
		<Navbar />
		<b-container class="py-3">
			<b-card bg-variant="light" class="shadow">
				<b-card-body class="p-0 row">
					<b-col>
						<b-button variant="primary" v-b-modal.new-student>
							<font-awesome-icon icon="plus" class="mr-1" />
							Cadastrar
						</b-button>
					</b-col>
					<b-col md="4">
						<b-form-group class="m-0" label-for="searchByName">
							<b-input-group size="md">
								<b-form-input
									id="searchByName"
									type="text"
									placeholder="Buscar por nome"
									v-model="filter"
								/>
								<b-input-group-append>
									<b-button
										variant="secondary"
										:disabled="!filter"
										@click="filter = ''"
									>
										Apagar
									</b-button>
								</b-input-group-append>
							</b-input-group>
						</b-form-group>
					</b-col>
				</b-card-body>
			</b-card>
			<StudentsTable :filter="filter" />
		</b-container>
		<NewStudent />
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import NewStudent from '@/components/utils/NewStudent'
import StudentsTable from '@/components/utils/StudentsTable'
import { mapActions } from 'vuex'

export default {
	name: 'Students',
	data: () => ({
		filter: null,
	}),
	components: {
		Navbar,
		NewStudent,
		StudentsTable,
	},
	methods: {
		...mapActions('student', ['actionFetchStudents']),
	},
	async created() {
		await this.actionFetchStudents()
	},
}
</script>
