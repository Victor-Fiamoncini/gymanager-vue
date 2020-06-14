<template>
	<div id="page-plans">
		<Navbar />
		<b-container class="py-3">
			<b-card bg-variant="light" class="shadow">
				<b-card-body class="p-0 row">
					<b-col>
						<b-button variant="primary" v-b-modal.new-plan>
							<font-awesome-icon icon="plus" class="mr-1" />
							Cadastrar
						</b-button>
					</b-col>
				</b-card-body>
			</b-card>
			<PlansTable />
		</b-container>
		<NewPlan />
	</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import NewPlan from '@/components/utils/NewPlan'
import PlansTable from '@/components/utils/PlansTable'
import { mapActions } from 'vuex'

export default {
	name: 'Plans',
	data: () => ({
		filter: null,
	}),
	components: {
		Navbar,
		NewPlan,
		PlansTable,
	},
	methods: {
		...mapActions('plan', ['actionFetchPlans']),
	},
	async created() {
		await this.actionFetchPlans()
	},
}
</script>
