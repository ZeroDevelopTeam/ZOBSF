<template>
	<el-card class="my-home">
		<el-row :gutter="40">
			<el-col :span="5" >
				<MySider/>
			</el-col>
			<el-col :span="19">
				<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
import MySider from './Sider';
	export default {
		components: {
			MySider,
		}
	}

</script>

<style lang="scss">
.my-home{
	width: 90%;
	margin: 30px auto;
}
</style>