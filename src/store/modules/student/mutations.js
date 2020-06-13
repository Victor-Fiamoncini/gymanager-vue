import StudentTypes from './types'

export default {
	[StudentTypes.SET_STUDENTS]: (state, payload) => {
		state.students = payload
	},
	[StudentTypes.SET_LOADING]: state => {
		state.loading = true
	},
	[StudentTypes.REMOVE_STUDENTS]: state => {
		state.students = []
	},
	[StudentTypes.REMOVE_LOADING]: state => {
		state.loading = false
	},
}
