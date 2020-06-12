import router from '../../../router'
import * as token from '../../../utils/token'

import api from '../../../services/api'
import Types from './types'

export async function actionRegister({ commit }, payload) {
	commit(Types.SET_LOADING)

	try {
		await api.post('/users', payload)

		await router.push({ name: 'Home' })
	} catch (err) {
		console.log(err.response.data.details)
	}

	commit(Types.REMOVE_LOADING)
}

export function actionCheckUid({ dispatch }) {
	if (!token.getToken()) {
		dispatch('actionUnsetSession')
	}

	dispatch('actionSetUid', token.getToken())
}

export function actionSetUid({ commit }, payload) {
	token.setToken(payload)

	commit(Types.SET_TOKEN, payload)
}

export async function actionUnsetSession({ commit }) {
	token.removeToken()

	commit(Types.REMOVE_TOKEN)
	commit(Types.REMOVE_USER)
	commit(Types.REMOVE_LOADING)

	router.replace({ name: 'Logon' })
}
