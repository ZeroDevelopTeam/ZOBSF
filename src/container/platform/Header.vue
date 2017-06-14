<template>
	<div class="header">
		<el-row class="head">
			<el-col :span="18" ><span><i class="el-icon-share"></i> &nbsp;<a href="">在线客服</a></span></el-col>
  			<el-col :span="6">
  				<span><a href="">欢迎登入</a>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
  				<span><a href="">免费注册</a></span>
  			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
		    return {
		    }
		  },
		methods: {
  		}
	}

</script>

<style scoped lang="scss">
.header{
	height: 40px;
	line-height: 40px;
    font-size: 16px;
    background-color: #eee;
    margin-bottom: 50px;
    .head{
		margin-left: 180px;
	}
}
	
</style>