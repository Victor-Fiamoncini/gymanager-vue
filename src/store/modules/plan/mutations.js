import PlanTypes from './types'

export default {
	[PlanTypes.SET_PLAN]: (state, payload) => {
		state.plan = payload
	},
	[PlanTypes.SET_PLANS]: (state, payload) => {
		state.plans = payload
	},
	[PlanTypes.SET_LOADING]: state => {
		state.loading = true
	},
	[PlanTypes.REMOVE_PLAN]: state => {
		state.plan = {}
	},
	[PlanTypes.REMOVE_PLANS]: state => {
		state.plans = []
	},
	[PlanTypes.REMOVE_LOADING]: state => {
		state.loading = false
	},
	[PlanTypes.FILTER_PLANS]: (state, payload) => {
		state.plans = state.plans.filter(plan => plan.id !== payload)
	},
	[PlanTypes.PUSH_PLAN]: (state, payload) => {
		state.plans = [...state.plans, payload]
	},
}
