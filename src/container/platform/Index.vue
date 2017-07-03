<template>
	<div>
		<el-row class="header">
			<MyHeader/>
			<MyNav/>
		</el-row>
		<el-row class="content">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-row>
		<el-row class="footer">
			<MyFooter/>
		</el-row>
	</div>
</template>

<script>
import MyHeader from './Header';
import MyFooter from './Footer';
import MyNav from './Nav';
	export default {
		components: {
			MyFooter,
			MyHeader,
			MyNav,
		},
	}

</script>

<style lang="scss">
@import '~scss_vars';
</style>