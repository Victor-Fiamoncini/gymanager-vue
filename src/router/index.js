import Vue from 'vue'
import VueRouter from 'vue-router'

import Logon from '../views/Logon'
import Register from '../views/Register'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
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
		{
			path: '/cadastro',
			name: 'Register',
			component: Register,
			meta: {
				title: 'Cadastro',
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
			return router.push({ name: 'Dashboard' })
		} else {
			next()
		}
	}
})

export default router
