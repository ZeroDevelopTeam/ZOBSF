<template>
	<div>
		<el-row class="header">
			<MyHeader/>
			<MyNav2/>
		</el-row>
		<el-row class="footer">
			<MyFooter/>
		</el-row>
	</div>
</template>

<script>
import MyHeader from './Header';
import MyFooter from './Footer';
import MyNav2 from './Nav2';
	export default {
		components: {
			MyFooter,
			MyHeader,
			MyNav2
		}
	}

</script>

<style lang="scss">
@import '~scss_vars';
</style>