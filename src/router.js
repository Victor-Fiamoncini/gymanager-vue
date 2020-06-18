import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import * as views from './components/views'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Logon',
			component: views.Logon,
			meta: {
				title: 'Logon',
				requiresAuth: false,
			},
		},
		{
			path: '/cadastro',
			name: 'Register',
			component: views.Register,
			meta: {
				title: 'Cadastro',
				requiresAuth: false,
			},
		},
		{
			path: '/home',
			name: 'Home',
			component: views.Home,
			meta: {
				title: 'Home',
				requiresAuth: true,
			},
		},
		{
			path: '/alunos',
			name: 'Students',
			component: views.Students,
			meta: {
				title: 'Alunos',
				requiresAuth: true,
			},
		},
		{
			path: '/configuracoes',
			name: 'Settings',
			component: views.Settings,
			meta: {
				title: 'Configurações',
				requiresAuth: true,
			},
		},
		{
			path: '/planos',
			name: 'Plans',
			component: views.Plans,
			meta: {
				title: 'Planos',
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
			return router.push({ name: 'Home' })
		} else {
			return next()
		}
	}
})

export default router
