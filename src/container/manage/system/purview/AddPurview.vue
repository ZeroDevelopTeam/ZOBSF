<template>
	<section class="add-auth">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">新增用户</span>
		  </div>
		  <div class="text item">
		    <!--新增界面-->
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="权限编号" prop="purviewId">
					<el-input v-model="addForm.purviewId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限名称" prop="purviewName">
					<el-input v-model="addForm.purviewName"></el-input>
				</el-form-item>
				<el-form-item label="规则" prop="purviewRule">
					<el-input v-model="addForm.purviewRule"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" prop="state">
				    <el-select v-model="addForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="备注" >
					<el-input type="textarea" v-model="addForm.purviewDesc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="footer-button">
				<el-button @click.native="back">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		  </div>
		</el-card>
	</section>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		computed: {
		 ...mapGetters([
		 	
   			])
	    },
		data() {
			return {
				addLoading:false,
				addFormRules: {
					purviewId: [
						{ required: true, message: '请输入权限编号', trigger: 'blur' }
					],
					purviewName: [
						{ required: true, message: '请输入权限名称', trigger: 'blur' }
					],
					purviewRule: [
						{ required: true, message: '请输入规则', trigger: 'blur' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
				},
				//新增界面数据
				addForm: {
					purviewId:'',
					purviewName:'',
					purviewRule: '',
					purviewDesc: ''
				}
			}
		},
		methods: {
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							this.$store.dispatch('addAuth',para).then((res) => {  
								this.addLoading = false;
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
								this.$refs['addForm'].resetFields();
								this.$router.push({ path: '/system/auth' });
					        });  
						});
					}
				});
			},
			//返回
			back(){
				this.$refs.addForm.resetFields();
				this.$router.go(-1);
			},
			mounted() {
			},
			components: {
			}
		}
	}
</script>

<style scoped>
.footer-button{
	text-align: center;
}
.add-auth{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
