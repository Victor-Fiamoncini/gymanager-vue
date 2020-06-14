import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Logon from './components/views/Logon'
import Register from './components/views/Register'
import Students from './components/views/Students'
import Settings from './components/views/Settings'

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
		{
			path: '/alunos',
			name: 'Students',
			component: Students,
			meta: {
				title: 'Alunos',
				requiresAuth: true,
			},
		},
		{
			path: '/configuracoes',
			name: 'Settings',
			component: Settings,
			meta: {
				title: 'Configurações',
				requiresAuth: true,
			},
		},
	],
})

window.popStateDetected = false
window.addEventListener('popstate', () => (window.popStateDetected = true))

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - Gymanager`

	store.dispatch('session/actionCheckToken')
	const hasToken = store.getters['session/token']

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
			return router.push({ name: 'Students' })
		} else {
			next()
		}
	}
})

export default router
