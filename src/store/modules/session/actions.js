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
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export async function actionLogon({ commit, dispatch }, payload) {
	commit(SessionTypes.SET_LOADING)
	try {
		const response = await api.post('/sessions', payload)

		dispatch('actionSetToken', response.data.token)
		commit(SessionTypes.SET_USER, response.data.user)

		router.push({ name: 'Home' })
	} catch (err) {
		dispatch('actionUnsetSession')
		notify(commit, 'danger', 'Credenciais inválidas')
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export async function actionUpdateUser({ commit }, payload) {
	commit(SessionTypes.SET_LOADING)
	const { name, email, currentPassword, password, confirmPassword } = payload

	try {
		await api.put('/users', {
			name,
			email,
			currentPassword,
			password,
			confirmPassword,
		})

		notify(commit, 'success', 'Seus dados foram atualizados com sucesso')
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export async function actionUpdateUserPhoto({ commit }, payload) {
	if (payload !== null && payload.size > 3000000) {
		notify(commit, 'danger', 'A imagem anexada é muito grande (máximo 3mb)')
		return false
	}

	try {
		const data = new FormData()
		data.append('photo', payload)

		await api.put('/users/photo', data)

		notify(commit, 'success', 'Foto atualizada com sucesso')
	} catch (err) {
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
}

export async function actionSendResetToken({ commit }, payload) {
	commit(SessionTypes.SET_LOADING)
	try {
		const response = await api.post('/forgot', payload)

		notify(commit, 'success', response.data.message)
	} catch (err) {
		commit(SessionTypes.REMOVE_LOADING)
		notify(commit, 'danger', err.response.data.details[0].context.label)
	}
	commit(SessionTypes.REMOVE_LOADING)
}

export async function actionResetPassword({ commit }, payload) {
	commit(SessionTypes.SET_LOADING)
	try {
		const response = await api.put('/reset', payload)

		notify(commit, 'success', response.data.message)
		router.push({ name: 'Logon' })
	} catch (err) {
		commit(SessionTypes.REMOVE_LOADING)
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
}
