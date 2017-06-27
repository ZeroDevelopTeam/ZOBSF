<template>
	<section class="my-order">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="my-order-detail">
		<!--编辑界面-->
			<el-form :model="editForm" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户账号" prop="userCode" :label-width="formLabelWidth">
					<el-input v-model="editForm.userCode" readonly auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户名称" prop="userName" :label-width="formLabelWidth">
					<el-input v-model="editForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱" prop="email" :label-width="formLabelWidth">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="常用地址" prop="address" :label-width="formLabelWidth">
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="footer-button">
				<el-button type="primary" @click.native="editSubmit" >保存</el-button>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				formLabelWidth: '120px',
				showTexts:'',
				colors:'',
				editFormRules: {
					userName: [
						{ required: true, message: '请输入用户名', trigger: 'change' }
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'change' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号（例如：13101030301）' , trigger: 'blur,change' }
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'change' },
						{ type: 'email', message: '请输入正确的邮箱地址（例如：123456@163.com）', trigger: 'blur,change' }
					],
				},
				//新增界面数据
				editForm: {
					userCode:'',
					userName:'',
					phone: '',
					email: '',
					address: ''
				},
			}
		},
		methods: {
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.editForm);
							this.$store.dispatch('editUser',para).then((res) => {  
								if(res.status==200){
									this.$message({
										message: res.msg,
										type: 'success'
									});
								}else{
									this.$message({
										message: res.msg,
										type: 'error'
									});
								}
								this.$refs['editForm'].resetFields();
								this.$router.push({ path: '/bookStore/person/myInfo' });
					        });
						});
					}
				});
			},
			/**
			 * 密码强度校验
			 * param value 密码
			 */
			passwordStrong(value){
				//密码为八位及以上并且字母数字特殊字符三项都包括
		     	const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		   		//密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
		     	const mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		     	const enoughRegex = new RegExp("(?=.{6,}).*", "g");
		     	this.password_length = value.length;
		     	if(value && value.length>5 && value.length<17){
		     		if (strongRegex.test(value)) {
			        	this.showTexts='强';
			        	this.colors='green'
		     		} else if (mediumRegex.test(value)) {
			        	this.showTexts='中';
			        	this.colors='blue'
				     } else {
			        	this.showTexts='弱';
			        	this.colors='red'
				    }
				     
		     	}else{
		        	this.showTexts='';
		     	}
			},
		},
		computed: {
	    },
		mounted() {
			const user = sessionStorage.getItem('user');
			this.$store.dispatch('getUser',{userCode:'001'}).then((res)=>{
				this.editForm = res;
			});
		},
		components: {
		}
	}

</script>

<style scoped lang="scss">
.my-order{
	.title{
		font-size: 1.3em;
		padding-right:10px;
		border-right: 3px solid #c7161c;
	}
	.my-order-detail{
		padding-top: 50px;
		width: 60%;
		margin: auto;
	}
}
</style>