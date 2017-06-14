<template>
	<section class="edit-role">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">编辑角色</span>
		  </div>
		  <div>
		<!--编辑界面-->
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="角色编号" prop="roleId">
					<el-input v-model="editForm.roleId" readonly auto-complete="off"></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="editForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色状态" prop="state">
				    <el-select v-model="editForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="备注" prop="roleDesc">
					<el-input type="textarea" v-model="editForm.roleDesc"></el-input>
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
	import util from '../../../../util/util'
  	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				editFormRules: {
					roleId: [
						{ required: true, message: '请输入角色编号', trigger: 'blur' }
					],
					roleName: [
						{ required: true, message: '请输入角色名称', trigger: 'blur' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
				},
			}
		},
		methods: {
			//获取角色信息
			getRoleInfo(id){
				this.$store.dispatch('getRole',{id:id}).then((res) => {  
					console.log(res);
	        	});
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.editForm);
							this.$store.dispatch('editRole',para).then((res) => {  
								if(res.status==200){
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
								this.$router.push({ path: '/system/role' });
					        });
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
			'roleInfo'
	   		 ]),
	   		 //将角色信息复制给editForm，避免v-model直接修改roleInfo
		 	editForm () {
		        return this.roleInfo;
		    }
	    },
		mounted() {
			const id=this.$route.query.id;
			this.getRoleInfo(id);
		},
		components: {
		}
	}
</script>

<style scoped>

.edit-role{
	padding-top: 50px;
	width:600px;
    margin: auto;
    .footer-button{
		text-align: center;
	}
	.clearfix{
		text-align: center;
	}
}

</style>
