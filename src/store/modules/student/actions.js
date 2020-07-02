import notify from '../../helpers/notify'
import api from '../../../services/api'
import StudentTypes from './types'

export async function actionStoreStudent({ commit }, payload) {
	commit(StudentTypes.SET_LOADING)
	const { name, email, age, weight, height } = payload

	try {
		const response = await api.post('/students', {
			name,
			email,
			age,
			weight,
			height,
		})

		notify(commit, 'success', `Aluno(a) ${name} cadastrado com sucesso`)

		commit(StudentTypes.PUSH_STUDENT, response.data)
		commit(StudentTypes.REMOVE_LOADING)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
		commit(StudentTypes.REMOVE_LOADING)
	}
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

export async function actionUpdateStudent({ commit }, payload) {
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

		notify(commit, 'success', `Aluno(a) ${name} atualizado com sucesso`)

		commit(StudentTypes.REMOVE_STUDENT)
		commit(StudentTypes.REMOVE_LOADING)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
		commit(StudentTypes.REMOVE_LOADING)
	}
}

export async function actionDeleteStudent({ commit }, payload) {
	commit(StudentTypes.SET_LOADING)
	const { id, name } = payload

	try {
		await api.delete(`/students/${id}`)

		notify(commit, 'success', `Aluno(a) ${name} deletado com sucesso`)

		commit(StudentTypes.FILTER_STUDENTS, id)
		commit(StudentTypes.REMOVE_STUDENT)
		commit(StudentTypes.REMOVE_LOADING)

		return true
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
		commit(StudentTypes.REMOVE_LOADING)
	}
}

export function actionSetStudent({ commit }, payload) {
	const student = { ...payload }

	commit(StudentTypes.SET_STUDENT, student)
}

export function actionUnsetStudent({ commit }) {
	commit(StudentTypes.REMOVE_STUDENT)
}
