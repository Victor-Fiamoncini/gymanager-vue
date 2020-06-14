import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faSignOutAlt,
	faHome,
	faList,
	faWallet,
	faSignInAlt,
	faSpinner,
	faPaperclip,
	faTrashAlt,
	faDumbbell,
	faAddressCard,
	faFileSignature,
	faPlus,
	faEdit,
	faCogs,
} from '@fortawesome/free-solid-svg-icons'

library.add(
	faSignOutAlt,
	faHome,
	faList,
	faWallet,
	faSignInAlt,
	faSpinner,
	faPaperclip,
	faTrashAlt,
	faDumbbell,
	faAddressCard,
	faFileSignature,
	faPlus,
	faEdit,
	faCogs
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
