import Vue from 'vue'
import VueRouter from 'vue-router'

import Logon from '../views/Logon'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.VUE_APP_BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Logon',
			component: Logon,
			meta: {
				title: 'Logon',
				requiresAuth: false,
			},
		},
	],
})

window.popStateDetected = false
window.addEventListener('popstate', () => (window.popStateDetected = true))

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - Gymanager`

	const hasToken = false

	if (window.popStateDetected) {
		return next(false)
	}

	if (to.matched.some(route => route.meta.requiresAuth)) {
		if (!hasToken) {
			return router.push({ name: 'Logon' })
		} else {
			return next()
		}
	} else {
		if (hasToken) {
			return router.push({ name: 'Home' })
		} else {
			next()
		}
	}
})

export default router
