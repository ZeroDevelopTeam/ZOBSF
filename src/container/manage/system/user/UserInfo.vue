<template>
	<el-dialog title="用户详情" :visible.sync="dialogFormVisible">
	  <!--编辑界面-->
			<el-form :model="editForm" label-width="120px" >
				<el-form-item label="用户账号">
					<el-input v-model="editForm.userCode" readonly auto-complete="off"></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="editForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input v-model="editForm.rePassword"></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="editForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="用户状态">
				    <el-select v-model="editForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="用户角色">
				    <el-select v-model="editForm.roleName" placeholder="请选择用户角色">
					    <el-option label="角色一" value="0"></el-option>
					    <el-option label="角色二" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="常用地址" >
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		methods: {
			//获取用户信息
			getUserInfo(id){
				this.$store.dispatch('getUser',{id:id}).then((res) => {  
					console.log(res);
	        	});
			},
		},
		computed: {
		 ...mapGetters([
			'userInfo'
	   		 ])
	    },
		mounted() {
			const id=this.$route.query.id;
			this.getUserInfo(id);
		},
		components: {
		}
	}
</script>

<style scoped>
.footer-button{
	text-align: center;
}
.edit-user{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
