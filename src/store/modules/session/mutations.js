import SessionTypes from './types'

export default {
	[SessionTypes.SET_TOKEN]: (state, payload) => {
		state.token = payload
	},
	[SessionTypes.SET_USER]: (state, payload) => {
		state.user = payload
	},
	[SessionTypes.SET_LOADING]: state => {
		state.loading = true
	},
	[SessionTypes.SET_ERRORS]: (state, payload) => {
		state.errors = [payload]
	},
	[SessionTypes.REMOVE_TOKEN]: state => {
		state.token = ''
	},
	[SessionTypes.REMOVE_USER]: state => {
		state.user = {}
	},
	[SessionTypes.REMOVE_LOADING]: state => {
		state.loading = false
	},
	[SessionTypes.REMOVE_ERRORS]: state => {
		state.errors = []
	},
}
