<template>
	<el-dialog title="用户详情" :visible.sync="dialogFormVisible">
	  <!--编辑界面-->
			<el-form :model="userInfo" label-width="120px" >
				<el-form-item label="用户账号">
					<el-input v-model="userInfo.userCode" readonly></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="userInfo.password" readonly></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input v-model="userInfo.rePassword" readonly></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="userInfo.userName" readonly></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="userInfo.phone" readonly></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱">
					<el-input v-model="userInfo.email" readonly></el-input>
				</el-form-item>
				<el-form-item label="用户状态">
				    <el-select v-model="userInfo.state" placeholder="请选择状态类型" readonly>
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="用户角色">
				    <el-select v-model="userInfo.roleName" readonly placeholder="请选择用户角色">
					    <el-option label="角色一" value="0"></el-option>
					    <el-option label="角色二" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="常用地址" >
					<el-input type="textarea" v-model="userInfo.address" readonly></el-input>
				</el-form-item>
			</el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		props: [
			'userInfo',
			'dialogFormVisible'
		],
		data() {
			return {
			}
		},
		methods: {
		},
		computed: {
		 ...mapGetters([
	   		 ])
	    },
		mounted() {
		},
		components: {
		}
	}
</script>

<style scoped>
.edit-user{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
