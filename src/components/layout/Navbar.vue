<template>
	<b-navbar id="navbar" toggleable="md" type="light" variant="light">
		<b-container>
			<b-navbar-brand>
				<img
					src="@/assets/images/logo.png"
					alt="Gymananger Logo"
					title="Gymanager"
				/>
				Gymanager
			</b-navbar-brand>
			<b-navbar-toggle target="navbar-collapse" />
			<b-collapse id="navbar-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item to="/home" exact exact-active-class="active">
						<font-awesome-icon icon="home" />
						Home
					</b-nav-item>
					<b-nav-item to="/alunos" exact exact-active-class="active">
						<font-awesome-icon icon="dumbbell" />
						Alunos
					</b-nav-item>
					<b-nav-item to="/planos" exact exact-active-class="active">
						<font-awesome-icon icon="file-signature" />
						Planos
					</b-nav-item>
					<b-nav-item to="/matriculas" exact exact-active-class="active">
						<font-awesome-icon icon="address-card" />
						Matrículas
					</b-nav-item>
					<b-nav-item to="/configuracoes" exact exact-active-class="active">
						<font-awesome-icon icon="cogs" />
						Configurações
					</b-nav-item>
					<b-nav-item @click="doLogout">
						<font-awesome-icon icon="sign-out-alt" />
						Logout
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-container>
	</b-navbar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'Navbar',
	methods: {
		...mapActions('session', ['actionUnsetSession']),

		doLogout() {
			this.actionUnsetSession()

			this.$router.push({ name: 'Logon' })
		},
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

#navbar {
	.navbar-brand {
		display: flex;
		align-items: center;
		img {
			margin: 0 12px 0 0;
			width: 46px;
		}
	}
	.nav-link {
		color: $primary;
		&.active {
			font-weight: bold;
			color: $secondary !important;
		}
	}
}
</style>
