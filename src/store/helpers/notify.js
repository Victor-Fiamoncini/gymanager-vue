import NotificationTypes from '../modules/notification/types'

export default (commit, type, message) => {
	const module = 'notification'

	return commit(
		`${module}/${NotificationTypes.SET_NOTIFICATION}`,
		{ type, message },
		{ root: true }
	)
}
