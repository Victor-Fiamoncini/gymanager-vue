import notify from '../../helpers/notify'
import api from '../../../services/api'
import PlanTypes from './types'

export async function actionStorePlan({ commit }, payload) {
	commit(PlanTypes.SET_LOADING)
	const { title, price, duration } = payload

	try {
		const response = await api.post('/plans', {
			title,
			price,
			duration,
		})

		notify(commit, 'success', `Plano ${title} cadastrado com sucesso`)

		commit(PlanTypes.PUSH_PLAN, response.data)
		commit(PlanTypes.REMOVE_LOADING)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
		commit(PlanTypes.REMOVE_LOADING)
	}
}

export async function actionFetchPlans({ commit }) {
	commit(PlanTypes.SET_LOADING)
	try {
		const response = await api.get('/plans')

		commit(PlanTypes.SET_PLANS, response.data)
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(PlanTypes.REMOVE_LOADING)
}

export async function actionUpdatePlan({ commit }, payload) {
	commit(PlanTypes.SET_LOADING)
	const { id, title, price, duration } = payload

	try {
		await api.put(`/plans/${id}`, {
			title,
			price,
			duration,
		})

		notify(commit, 'success', `Plano ${title} atualizado com sucesso`)

		commit(PlanTypes.REMOVE_PLAN)
		commit(PlanTypes.REMOVE_LOADING)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
		commit(PlanTypes.REMOVE_LOADING)
	}
}

export async function actionDeletePlan({ commit }, payload) {
	commit(PlanTypes.SET_LOADING)
	const { id, title } = payload

	try {
		await api.delete(`/plans/${id}`)

		notify(commit, 'success', `Plano ${title} deletado com sucesso`)

		commit(PlanTypes.FILTER_PLANS, id)
		commit(PlanTypes.REMOVE_PLAN)
		commit(PlanTypes.REMOVE_LOADING)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
		commit(PlanTypes.REMOVE_LOADING)
	}
}

export function actionSetPlan({ commit }, payload) {
	const plan = { ...payload }

	commit(PlanTypes.SET_PLAN, plan)
}

export function actionUnsetPlan({ commit }) {
	commit(PlanTypes.REMOVE_PLAN)
}
