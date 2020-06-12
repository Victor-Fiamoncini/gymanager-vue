import NotifictionTypes from './types'

export function actionStoreNotification({ commit }, payload) {
	commit(NotifictionTypes.SET_NOTIFICATION, payload)
}

export function actionRemoveNotification({ commit }, payload) {
	commit(NotifictionTypes.REMOVE_NOTIFICATION, payload)
}
