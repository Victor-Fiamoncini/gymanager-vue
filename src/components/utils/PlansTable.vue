<template>
	<div id="plans-table">
		<b-table
			class="mt-3 rounded shadow"
			striped
			responsive
			outlined
			show-empty
			emptyText="Nenhum plano foi cadastrado no momento"
			table-variant="light"
			select-mode="single"
			:busy="loading"
			:fields="fields"
			:items="plans"
		>
			<template v-slot:cell(price)="data">
				{{ `R$ ${data.item.price}` }}
			</template>
			<template v-slot:cell(duration)="data">
				{{
					`${data.item.duration} ${data.item.duration === 1 ? 'mês' : 'meses'}`
				}}
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
					v-b-modal.update-plan
					@click="doSelectPlan(row)"
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
					v-b-modal.delete-plan
					@click="doSelectPlan(row)"
				>
					<font-awesome-icon icon="trash-alt" class="mr-1" />
					Deletar
				</b-button>
			</template>
		</b-table>
		<DeletePlan v-if="plan" id="delete-plan" :plan="plan" />
		<UpdatePlan v-if="plan" id="update-plan" :loading="loading" :plan="plan" />
	</div>
</template>

<script>
import DeletePlan from '@/components/utils/DeletePlan'
import UpdatePlan from '@/components/utils/UpdatePlan'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'PlansTable',
	components: {
		DeletePlan,
		UpdatePlan,
	},
	data: () => ({
		fields: [
			{
				key: 'title',
				label: 'Título',
				headerTitle: 'Título',
				sortable: true,
			},
			{
				key: 'price',
				label: 'Preço',
				headerTitle: 'Preço',
				sortable: true,
			},
			{
				key: 'duration',
				label: 'Duração',
				headerTitle: 'Duração',
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
		...mapGetters('plan', ['loading', 'plan', 'plans']),
	},
	methods: {
		...mapActions('plan', ['actionSetPlan']),

		doSelectPlan(plan) {
			this.actionSetPlan(plan.item)
		},
	},
}
</script>
