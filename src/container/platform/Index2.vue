<template>
	<div>
		<el-row class="header">
			<Header/>
		</el-row>
		<el-row class="content">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-row>
		<el-row class="footer">
			<Footer/>
		</el-row>
	</div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
	export default {
		components: {
			Footer,
			Header,
		}
	}

</script>

<style lang="scss">
@import '~scss_vars';
</style>