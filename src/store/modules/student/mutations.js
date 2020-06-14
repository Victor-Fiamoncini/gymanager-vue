import StudentTypes from './types'

export default {
	[StudentTypes.SET_STUDENT]: (state, payload) => {
		state.student = payload
	},
	[StudentTypes.SET_STUDENTS]: (state, payload) => {
		state.students = payload
	},
	[StudentTypes.SET_LOADING]: state => {
		state.loading = true
	},
	[StudentTypes.REMOVE_STUDENT]: state => {
		state.student = {}
	},
	[StudentTypes.REMOVE_STUDENTS]: state => {
		state.students = []
	},
	[StudentTypes.REMOVE_LOADING]: state => {
		state.loading = false
	},
}
