<template>
	<b-alert
		class="shadow"
		fade
		dismissible
		:show="countdown"
		:variant="notification.type"
		@dismissed="countdown = 0"
		@dismiss-count-down="doChangeCountdown"
	>
		<p>{{ notification.message }}</p>
		<b-progress
			class="shadow"
			height="5px"
			striped
			animated
			:variant="notification.type"
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
