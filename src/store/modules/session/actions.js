import router from '../../../router'
import * as token from '../../../utils/token'

import api from '../../../services/api'
import SessionTypes from './types'
import NotificationTypes from '../notification/types'

export async function actionRegister({ commit }, payload) {
	commit(SessionTypes.SET_LOADING)

	try {
		await api.post('/users', payload)

		router.push({ name: 'Logon' })

		commit(
			`notification/${NotificationTypes.SET_NOTIFICATION}`,
			{
				type: 'success',
				message: `Seja bem-vindo ${payload.name}, faça seu logon para continuar`,
			},
			{
				root: true,
			}
		)
	} catch (err) {
		commit(SessionTypes.SET_ERRORS, err.response.data)
	}

	commit(SessionTypes.REMOVE_LOADING)
}

export function actionCheckToken({ dispatch }) {
	if (!token.getToken()) {
		dispatch('actionUnsetSession')
	}

	dispatch('actionSetToken', token.getToken())
}

export function actionSetToken({ commit }, payload) {
	token.setToken(payload)

	commit(SessionTypes.SET_TOKEN, payload)
}

export function actionUnsetSession({ commit }) {
	token.removeToken()

	commit(SessionTypes.REMOVE_TOKEN)
	commit(SessionTypes.REMOVE_USER)
	commit(SessionTypes.REMOVE_LOADING)
}
