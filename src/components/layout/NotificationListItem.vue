<template>
	<b-alert
		fade
		dismissible
		:show="countdown"
		:variant="notification.type"
		@dismissed="countdown = 0"
		@dismiss-count-down="doChangeCountdown"
	>
		<p>{{ notification.message }}</p>
		<b-progress
			height="4px"
			variant="white"
			:max="seconds"
			:value="countdown"
		></b-progress>
	</b-alert>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'NotificationListItem',
	props: ['notification'],
	data: () => ({
		seconds: 5,
		countdown: 5,
	}),
	methods: {
		...mapActions('notification', ['actionRemoveNotification']),

		doChangeCountdown(countdown) {
			this.countdown = countdown

			if (this.countdown === 0)
				this.actionRemoveNotification(this.$props.notification)
		},
	},
}
</script>
