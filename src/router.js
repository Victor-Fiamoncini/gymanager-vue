import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Logon',
			component: () => import('./components/views/Logon'),
			meta: {
				title: 'Logon',
				requiresAuth: false,
			},
		},
		{
			path: '/cadastro',
			name: 'Register',
			component: () => import('./components/views/Register'),
			meta: {
				title: 'Cadastro',
				requiresAuth: false,
			},
		},
		{
			path: '/esqueceu-a-senha',
			name: 'ForgotPassword',
			component: () => import('./components/views/ForgotPassword'),
			meta: {
				title: 'Esqueceu a Senha',
				requiresAuth: false,
			},
		},
		{
			path: '/recuperar-a-senha',
			name: 'ResetPassword',
			component: () => import('./components/views/ResetPassword'),
			meta: {
				title: 'Recuperar Senha',
				requiresAuth: false,
			},
		},
		{
			path: '/home',
			name: 'Home',
			component: () => import('./components/views/Home'),
			meta: {
				title: 'Home',
				requiresAuth: true,
			},
		},
		{
			path: '/alunos',
			name: 'Students',
			component: () => import('./components/views/Students'),
			meta: {
				title: 'Alunos',
				requiresAuth: true,
			},
		},
		{
			path: '/configuracoes',
			name: 'Settings',
			component: () => import('./components/views/Settings'),
			meta: {
				title: 'Configurações',
				requiresAuth: true,
			},
		},
		{
			path: '/planos',
			name: 'Plans',
			component: () => import('./components/views/Plans'),
			meta: {
				title: 'Planos',
				requiresAuth: true,
			},
		},
		{
			path: '/matriculas',
			name: 'Registration',
			component: () => import('./components/views/Registration'),
			meta: {
				title: 'Matrículas',
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
