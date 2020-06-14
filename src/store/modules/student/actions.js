import notify from '../../helpers/notify'
import api from '../../../services/api'
import StudentTypes from './types'

export async function actionStoreStudent({ commit, dispatch }, payload) {
	commit(StudentTypes.SET_LOADING)
	const { name, email, age, weight, height } = payload

	try {
		await api.post('/students', { name, email, age, weight, height })

		dispatch('actionFetchStudents')
		notify(commit, 'success', `Aluno(a) ${name} cadastrado com sucesso`)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export async function actionFetchStudents({ commit }) {
	commit(StudentTypes.SET_LOADING)
	try {
		const response = await api.get('/students')

		commit(StudentTypes.SET_STUDENTS, response.data)
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export async function actionUpdateStudent({ commit, dispatch }, payload) {
	commit(StudentTypes.SET_LOADING)
	const { id, name, email, age, weight, height } = payload

	try {
		await api.put(`/students/${id}`, {
			name,
			email,
			age,
			weight,
			height,
		})

		dispatch('actionFetchStudents')
		notify(commit, 'success', `Aluno(a) ${name} atualizado com sucesso`)

		commit(StudentTypes.REMOVE_STUDENT)
		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export async function actionDeleteStudent({ commit, dispatch }, payload) {
	commit(StudentTypes.SET_LOADING)
	const { id, name } = payload

	try {
		await api.delete(`/students/${id}`)

		dispatch('actionFetchStudents')
		notify(commit, 'success', `Aluno(a) ${name} deletado com sucesso`)

		commit(StudentTypes.REMOVE_STUDENT)
		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export function actionSetStudent({ commit }, payload) {
	commit(StudentTypes.SET_STUDENT, payload)
}
