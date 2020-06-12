export const setToken = token => {
	if (token) {
		localStorage.setItem('auth_token', token)
	}
}

export const getToken = () => localStorage.getItem('auth_token')

export const removeToken = () => localStorage.removeItem('auth_token')
