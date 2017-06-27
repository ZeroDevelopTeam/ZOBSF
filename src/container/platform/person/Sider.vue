<template>
	<el-row class="my-sider">
		 <el-menu default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect">
	        <el-menu-item index="myInfo">个人信息</el-menu-item>
	        <el-menu-item index="myPsw">修改密码</el-menu-item>
	        <el-menu-item index="myOrder">我的订单</el-menu-item>
	        <el-menu-item index="myRetrieve">我的回收单</el-menu-item>
	        <el-menu-item index="myAdvice">咨询反馈</el-menu-item>
		</el-menu>
	</el-row>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			handleSelect(key, keyPath){
				this.$router.push({ path: '/bookStore/person/' + key });
			}
		},
		components: {
		}
	}

</script>

<style lang="scss">
.my-sider{
}
</style>