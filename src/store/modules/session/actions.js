import router from '../../../router'
import * as token from '../../helpers/token'
import notify from '../../helpers/notify'
import api from '../../../services/api'
import SessionTypes from './types'

export async function actionRegister({ commit, dispatch }, payload) {
	commit(SessionTypes.SET_LOADING)
	try {
		await api.post('/users', payload)

		router.push({ name: 'Logon' })

		notify(
			commit,
			'success',
			`Seja bem-vindo(a) ${payload.name}, faça seu logon para continuar`
		)
	} catch (err) {
		dispatch('actionUnsetSession')
		commit(SessionTypes.SET_ERRORS, err.response.data)
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export async function actionLogon({ commit, dispatch }, payload) {
	commit(SessionTypes.SET_LOADING)
	try {
		const response = await api.post('/sessions', payload)

		dispatch('actionSetToken', response.data.token)
		commit(SessionTypes.SET_USER, response.data.user)

		router.push({ name: 'Students' })
	} catch (err) {
		dispatch('actionUnsetSession')
		commit(SessionTypes.SET_ERRORS, err.response.data)
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export async function actionUpdateUser({ commit }, payload) {
	commit(SessionTypes.SET_LOADING)
	const { id, name, email, password, confirmPassword } = payload

	try {
		await api.put(`/users/${id}`, { name, email, password, confirmPassword })

		notify(commit, 'success', 'Seus dados foram atualizados com sucesso')
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export function actionCheckToken({ dispatch }) {
	if (!token.getToken()) {
		dispatch('actionUnsetSession')
	}

	dispatch('actionSetToken', token.getToken())
	dispatch('actionLoadSession')
}

export function actionSetToken({ commit }, payload) {
	token.setToken(payload)

	commit(SessionTypes.SET_TOKEN, payload)
}

export async function actionLoadSession({ commit, dispatch }) {
	try {
		const response = await api.get('/sessions')

		commit(SessionTypes.SET_USER, response.data)
	} catch (err) {
		dispatch('actionUnsetSession')
	}
}

export function actionUnsetSession({ commit }) {
	token.removeToken()

	commit(SessionTypes.REMOVE_TOKEN)
	commit(SessionTypes.REMOVE_USER)
	commit(SessionTypes.REMOVE_LOADING)
	commit(SessionTypes.REMOVE_ERRORS)
}
