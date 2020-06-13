import api from '../../../services/api'

import StudentTypes from './types'
import NotificationTypes from '../notification/types'

export async function actionStoreStudent({ commit, dispatch }, payload) {
	commit(StudentTypes.SET_LOADING)
	try {
		await api.post('/students', payload)

		dispatch('actionFetchStudents')
		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'primary',
				message: `O aluno(a) ${payload.name} foi cadastrado com sucesso`,
			},
			{
				root: true,
			}
		)

		return true
	} catch (err) {
		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'danger',
				message: err.response.data.details[0].context.label,
			},
			{
				root: true,
			}
		)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export async function actionFetchStudents({ commit }) {
	commit(StudentTypes.SET_LOADING)
	try {
		const response = await api.get('/students')

		commit(StudentTypes.SET_STUDENTS, response.data)
	} catch (err) {
		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'danger',
				message: err.response.data.details[0].context.label,
			},
			{
				root: true,
			}
		)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export async function actionUpdateStudent({ commit }, payload) {
	commit(StudentTypes.SET_LOADING)
	try {
		console.log(payload)

		// const response = await api.get('/students')

		// commit(StudentTypes.SET_STUDENTS, response.data)

		return true
	} catch (err) {
		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'danger',
				message: err.response.data.details[0].context.label,
			},
			{
				root: true,
			}
		)
	}
	commit(StudentTypes.REMOVE_LOADING)
}

export async function actionDeleteStudent({ commit, dispatch }, payload) {
	commit(StudentTypes.SET_LOADING)
	try {
		await api.delete(`/students/${payload.id}`)

		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'primary',
				message: `Aluno(a) ${payload.name} deletado com sucesso`,
			},
			{
				root: true,
			}
		)

		dispatch('actionFetchStudents')

		return true
	} catch (err) {
		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'danger',
				message: err.response.data.details[0].context.label,
			},
			{
				root: true,
			}
		)
	}
	commit(StudentTypes.REMOVE_LOADING)
}
