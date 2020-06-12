import Types from './types'

export default {
	[Types.SET_TOKEN]: (state, payload) => {
		state.token = payload
	},
	[Types.SET_USER]: (state, payload) => {
		state.user = payload
	},
	[Types.SET_LOADING]: state => {
		state.loading = true
	},
	[Types.REMOVE_TOKEN]: state => {
		state.token = ''
	},
	[Types.REMOVE_USER]: state => {
		state.user = {}
	},
	[Types.REMOVE_LOADING]: state => {
		state.loading = false
	},
}
