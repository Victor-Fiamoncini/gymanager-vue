<template>
	<div id="students-table">
		<b-table
			class="mt-3 rounded"
			striped
			hover
			responsive
			outlined
			selectable
			emptyText="Nenhum aluno foi cadastrado no momento"
			emptyFilteredText="Nenhum aluno foi encontrado para essa pesquisa"
			show-empty
			table-variant="light"
			select-mode="single"
			:per-page="perPage"
			:filter="filter"
			:busy="loading"
			:fields="fields"
			:items="students"
			:current-page="currentPage"
			@row-selected="doShowStudentOptions"
			@filtered="onFiltered"
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
			<template v-slot:cell(actions)="row">
				<b-button
					size="sm"
					@click="info(row.item, row.index, $event.target)"
					class="mr-1"
				>
					Info modal
				</b-button>
				<b-button size="sm" @click="row.toggleDetails">
					{{ row.detailsShowing ? 'Hide' : 'Show' }} Details
				</b-button>
			</template>
		</b-table>
		<b-pagination
			v-if="totalRows > perPage"
			class="bg-light p-3"
			align="center"
			v-model="currentPage"
			prev-text="Anterior"
			next-text="Próximo"
			:total-rows="totalRows"
			:per-page="perPage"
		/>
		<UpdateStudent />
	</div>
</template>

<script>
import UpdateStudent from '@/components/utils/UpdateStudent'

export default {
	name: 'StudentsTable',
	props: ['filter', 'loading', 'students'],
	components: {
		UpdateStudent,
	},
	data: function() {
		return {
			currentPage: 1,
			perPage: 10,
			totalRows: this.$props.students.length,
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
		}
	},
	methods: {
		doShowStudentOptions(student) {
			console.log(student)
		},
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
	},
	mounted() {
		this.totalRows = this.$props.students.length
	},
}
</script>
