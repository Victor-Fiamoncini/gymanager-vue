<template>
	<div id="students-table">
		<b-table
			class="mt-3 rounded"
			striped
			responsive
			outlined
			show-empty
			emptyText="Nenhum aluno foi cadastrado no momento"
			emptyFilteredText="Nenhum aluno foi encontrado para essa pesquisa"
			table-variant="light"
			select-mode="single"
			:per-page="perPage"
			:filter="filter"
			:busy="loading"
			:fields="fields"
			:items="students"
			:current-page="currentPage"
			@filtered="doWhenFiltered"
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
			<template v-slot:table-busy>
				<div class="text-center text-primary my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong class="ml-2">Carregando...</strong>
				</div>
			</template>
			<template v-slot:cell(update)="row">
				<b-button
					block
					variant="warning"
					size="sm"
					v-b-modal.update-student
					@click="doSelectStudent(row)"
				>
					<font-awesome-icon icon="edit" class="mr-1" />
					Atualizar
				</b-button>
			</template>
			<template v-slot:cell(delete)="row">
				<b-button
					block
					variant="danger"
					size="sm"
					v-b-modal.delete-student
					@click="doSelectStudent(row)"
				>
					<font-awesome-icon icon="trash-alt" class="mr-1" />
					Deletar
				</b-button>
			</template>
		</b-table>
		<b-pagination
			v-if="totalRows > perPage && !filter"
			class="bg-light p-3"
			align="center"
			v-model="currentPage"
			prev-text="Anterior"
			next-text="Próximo"
			:total-rows="totalRows"
			:per-page="perPage"
		/>
		<DeleteStudent v-if="student" id="delete-student" :student="student" />
		<UpdateStudent
			v-if="student"
			id="update-student"
			:loading="loading"
			:student="student"
		/>
	</div>
</template>

<script>
import DeleteStudent from '@/components/utils/DeleteStudent'
import UpdateStudent from '@/components/utils/UpdateStudent'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'StudentsTable',
	props: ['filter'],
	components: {
		DeleteStudent,
		UpdateStudent,
	},
	data: () => ({
		currentPage: 1,
		perPage: 10,
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
			{
				key: 'update',
				label: 'Atualizar',
			},
			{
				key: 'delete',
				label: 'Deletar',
			},
		],
	}),
	computed: {
		...mapGetters('student', ['loading', 'student', 'students']),

		totalRows: {
			get() {
				return this.students.length || this.perPage
			},
			set(value) {
				this.val = value
			},
		},
	},
	methods: {
		...mapActions('student', ['actionSetStudent']),

		doSelectStudent(student) {
			this.actionSetStudent(student.item)
		},
		doWhenFiltered(filteredItems) {
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
	},
	mounted() {
		this.totalRows = this.students.length
	},
}
</script>
