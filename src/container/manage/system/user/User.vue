<template>
	<section>
		<!--工具条-->
		<el-col :span="16" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" >
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="8" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" ref="search">
				<el-form-item>
					<el-input v-model="filters.keyWord" placeholder="关键字查询"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUsers">查询</el-button>
					<el-button type="primary" @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<CommTable  :tableConfig="tableConfig"></CommTable>
		<!--<UserInfo :dialogFormVisible="dialogFormVisible" :userInfo="userInfo"></UserInfo>-->
		
		<!--用户详情-->
		<el-dialog title="用户详情" :visible.sync="dialogFormVisible">
	        <el-form style="width:600px;margin: auto;"
	                 label-width="320px"
	                 :model="userInfo">
	            <el-form-item label="用户账号：" prop='userCode'>
					{{userInfo.userCode}}
				</el-form-item>
				<el-form-item label="用户名称：" prop='userName'>
					{{userInfo.userName}}
				</el-form-item>
				<el-form-item label="手机号：" prop='phone'>
					{{userInfo.phone}}
				</el-form-item>
				<el-form-item label="用户邮箱：" prop='email'>
					{{userInfo.email}}
				</el-form-item>
				<el-form-item label="用户状态：" prop='state'>
				    {{userInfo.state=='1'?'启用':'停用'}}
				</el-form-item>
				<el-form-item label="用户角色：" prop='roleName'>
				    {{userInfo.roleName}}
				</el-form-item>
				<el-form-item label="常用地址：" prop='address'>
					{{userInfo.address}}
				</el-form-item>
	        </el-form>
	        <span slot="footer" class="dialog-footer">
	            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	        </span>
	    </el-dialog>
	</section>
	
</template>

<script>
	import CommTable from '../../../../components/CommTable';
	import UserInfo from './UserInfo';
  	import { mapGetters } from 'vuex'
	export default {
		computed: {
		 ...mapGetters([
			'userList'
	   		 ])
	    },
		data() {
		       const columns = [{
					key:1,
			        label:'用户账号',
			        prop:'userCode',
			        handelLink:this.clickLick,
		        },
		        {
				  	key:2,
		          	label:'用户名',
		          	prop:'userName',
		        },
		        {
			 	 	key:3,
		          	label:'手机号',
		          	prop:'phone',
		          	width:120
		        },
		        {
			 	 	key:4,
		          	label:'邮箱',
		          	prop:'email',
		          	width:150
		        },
		        {
				  	key:5,
		          	label:'创建时间',
		          	prop:'createDate',
		          	width:180
		        },
		        {
				  	key:6,
		          	label:'角色名',
		          	prop:'roleName',
		        },
		        {
				  	key:7,
		          	label:'状态',
		          	prop:'state',
		          	formatter:this.formatState
		        },
		        {
				  	key:8,
		          	label:'操作',
		          	width:200,
				  	operations:[
					  	{
					  		func :this.handleEdit,
					  		label:'编辑',
					  		type:'info'
					  	},
					  	{
					  		func :this.handleDel,
					  		label:'删除',
					  		type:'info'
					  	},
					  	{
					  		func :this.changeState,
					  		flag:'state',
					  		type:'danger'
					  	}
				  	]
		        }];
		        //方法名
		        const dispatch = 'getUserList';
		        //查询参数
		        let params = {
		        	pageNum: 1,
					pageSize:10,
					keyWord: ''
		        }
			return {
				userInfo:'',
				dialogFormVisible:false,
				tableConfig:{
					dataList:[],
					columns,
					params,
					dispatch:dispatch,
					rowOptions:this.handleSelectionChange,
				},
				
				filters: {
					keyWord: ''
				},
				sels: [],//列表选中列
			}
		},
		methods: {
			//状态显示转换
			formatState: function (row, column) {
				return row.state == 1 ? '启用' : row.state == 0 ? '停用' : '未知';
			},
			//点击链接显示详情
			clickLick(row){
				this.dialogFormVisible=true;
				this.userInfo=row;
			},
			//重置
			resetForm() {
		        this.$refs.search.resetFields();
		        this.filters.keyWord='';
		        this.getUsers();
		   },
			//获取用户列表
			getUsers() {
				let para = {
					pageNum: 1,
					pageSize:10,
					keyWord: this.filters.keyWord
				};
				this.listLoading = true;
				this.$store.dispatch('getUserList',para).then((res) => {  
					this.listLoading = false;
		        });  
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { userCode: row.userCode };
					this.$store.dispatch('removeUser',para).then((res) => {  
						this.listLoading = false;
						if(res.status==200){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getUsers();
						}else{
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}
			        });  
				}).catch(() => {

				});
			},
			//显示新增界面
			handleAdd: function () {
				this.$router.push({ path: '/system/user/addUser' });
			},
			
			//显示编辑界面
			handleEdit: function (index, row,scope) {
				this.$router.push({ path: '/system/user/editUser', query: { id: row.userCode }});
			},
			
			handleSelectionChange(val) {
		        this.sels = val;
	      	},
			//批量删除
			batchRemove: function () {
				const states = this.sels.map(item => item.state);
				if(states.indexOf(1)>-1){
					this.$message({
						message: '启用状态的用户不能删除！',
						type: 'error'
					});
				}else{
					var userCodes = this.sels.map(item => item.userCode).toString();
					this.$confirm('确认删除选中记录吗？', '提示', {
						type: 'warning'
					}).then(() => {
						this.listLoading = true;
						let para = { str_userCode: userCodes };
						this.$store.dispatch('removeUsers',para).then((res) => {  
							this.listLoading = false;
							if(res.status==200){
								this.$message({
									message: res.msg,
									type: 'success'
								});
								this.getUsers();
							}else{
								this.$message({
									message: res.msg,
									type: 'error'
								});
							}
				        });  
					}).catch(() => {
	
					});	
				}
			},
			//修改用户状态
			changeState:function(index, row,scope){
				let para ='';
				if(row.state==1){//目前是启用状态,改为停用
					para = { userCodes: row.userCode,state:0 };
				}else{
					para = { userCodes: row.userCode,state:1 };
				}
				console.log(para);
				console.log(row.state);
				this.$confirm(row.state==1?'确认停用选中记录吗？':'确认启用选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					this.$store.dispatch('changeUserState',para).then((res) => {
						this.listLoading = false;
						if(res.status==200){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getUsers();
						}else{
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}
			        });  
				}).catch(() => {

				});
			},
		},
		watch:{
		  	userList(){
		  		this.$set(this.tableConfig, "dataList", this.userList);
		  	},
		  	filters:{
		  		 handler(val,oldval){  
                    this.$set(this.tableConfig.params, "keyWord", val.keyWord);
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
　　　　　　	},
		},
		mounted() {
			this.getUsers();
		},
		components: {
			CommTable,
			UserInfo
		}
	}

</script>

<style scoped>
.toolbar{
	background: white;
}
</style>
