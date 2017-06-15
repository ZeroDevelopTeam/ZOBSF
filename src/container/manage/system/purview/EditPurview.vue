<template>
	<section class="edit-auth">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">编辑权限</span>
		  </div>
		  <div>
		<!--编辑界面-->
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="权限编号">
					<el-input v-model="editForm.authCode" readonly auto-complete="off"></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="权限名称">
					<el-input v-model="editForm.authName"></el-input>
				</el-form-item>
				<el-form-item label="规则">
					<el-input v-model="editForm.rule"></el-input>
				</el-form-item>
				<el-form-item label="备注" >
					<el-input type="textarea" v-model="editForm.descript"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="footer-button">
				<el-button @click.native="back()">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" >提交</el-button>
			</div>
			</div>
		</el-card>
	</section>
	
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				editFormRules: {
					authCode: [
						{ required: true, message: '请输入权限编号', trigger: 'blur' }
					],
					authName: [
						{ required: true, message: '请输入权限名称', trigger: 'blur' }
					],
					rule: [
						{ required: true, message: '请输入规则', trigger: 'blur' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
				},
				editForm: {
					authCode:'',
					authName:'',
					rule: '',
					roleName:'',
					descripte: ''
				}
			}
		},
		methods: {
			//获取权限信息
			getAuthInfo(id){
				this.$store.dispatch('getAuth',{id:id}).then((res) => {  
					console.log(res);
	        	});
			},
			//编辑
			/*editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							this.$store.dispatch('editAuth',para).then((res) => {  
								if(res.status==1){
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.getRoles();
								}else{
									this.$message({
										message: res.msg,
										type: 'error'
									});
								}
								this.$refs['editForm'].resetFields();
								this.$router.push({ path: '/system/authorization' });
					        });
						});
					}
				});
			},*/
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
								this.$message({
									message: '修改权限成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.$router.push({ path: '/system/authorization' });
					        });
					}
				});
			},
			//返回
			back(){
				this.$refs.editForm.resetFields();
				this.$router.go(-1);
			},
		},
		computed: {
		 ...mapGetters([
			'authInfo'
	   		 ]),
		 	editForm () {
		        return this.authInfo;
		    }
	    },
		mounted() {
			const id=this.$route.query.id;
			//this.getAuthInfo(id);
		},
		components: {
		}
	}
</script>

<style scoped>
.footer-button{
	text-align: center;
}
.edit-auth{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
