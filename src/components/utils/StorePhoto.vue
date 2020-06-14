<template>
	<Dropzone
		id="dropzone"
		ref="user-photo-dropzone"
		:options="options"
		:useCustomSlot="true"
		:destroy-dropzone="true"
		:include-styling="true"
		@vdropzone-complete="doWhenUploadCompleted"
	>
		<font-awesome-icon
			size="5x"
			icon="cloud-upload-alt"
			class="text-secondary"
		/>
	</Dropzone>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
	name: 'StorePhoto',
	components: {
		Dropzone,
	},
	data: () => ({
		options: {
			url: 'https://httpbin.org/post',
			acceptedFiles: '.jpg, .jpeg, .png',
			addRemoveLinks: true,
			maxFiles: 1,
			maxFilesize: 3,
			maxThumbnailFilesize: 3,
		},
	}),
	mounted() {
		this.$refs['user-photo-dropzone'].dropzone
	},
	methods: {
		doWhenUploadCompleted(file) {
			this.$emit('doEmitFile', file)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

#dropzone {
	height: 240px !important;
	border: 0;
	border-radius: 0.4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		box-shadow: 0 0 0 0.2rem rgba(120, 194, 173, 0.25);
	}
	.dropzone-message {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.125rem !important;
		font-weight: 600;
	}
	.dz-preview {
		.dz-details {
			background-color: transparent !important;
			.dz-size,
			.dz-filename {
				display: none !important;
			}
		}
		.dz-remove {
			margin: 0 !important;
			border: none !important;
			background: $primary !important;
		}
	}
}
</style>
