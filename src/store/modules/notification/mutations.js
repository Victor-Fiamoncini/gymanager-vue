import { v4 } from 'uuid'
import NotificationTypes from './types'

export default {
	[NotificationTypes.SET_NOTIFICATION]: (state, payload) => {
		const newNotification = {
			id: v4(),
			...payload,
		}

		state.notifications = [...state.notifications, newNotification]
	},
	[NotificationTypes.REMOVE_NOTIFICATION]: (state, payload) => {
		state.notifications = state.notifications.filter(
			notification => notification.id !== payload.id
		)
	},
}
