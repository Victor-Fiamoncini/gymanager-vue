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
	} catch (err) {
		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'secondary',
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
				type: 'secondary',
				message: err.response.data.details[0].context.label,
			},
			{
				root: true,
			}
		)
	}

	commit(StudentTypes.REMOVE_LOADING)
}
