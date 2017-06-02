<template>
	<section>
		<!--工具条-->
		<el-col :span="16" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="batchRemove" :disabled="this.sels.length===0">删除</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="start" :disabled="this.sels.length===0">启用</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="stop" :disabled="this.sels.length===0">停用</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="8" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.keyWord" placeholder="关键字查询"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<MyTable :dataList="roleList" :config="config"></MyTable>
	</section>
	
</template>

<script>
	import MyTable from '../../../../components/MyTable';
  import { mapGetters } from 'vuex'
	export default {
		computed: {
		 ...mapGetters([
			'roleList'
	   		 ])
	    },
		data() {
		       const columns = [{
					key:1,
			        label:'角色编号',
			        prop:'roleCode',
		        },
		        {
				  	key:2,
		          	label:'角色名称',
		          	prop:'roleName',
		        },
		        {
			 	 	key:3,
		          	label:'备注',
		          	prop:'descript',
		        },
		        {
				  	key:4,
		          	label:'创建时间',
		          	prop:'time',
		        },
		        {
				  	key:5,
		          	label:'状态',
		          	prop:'state',
		          	formatter:this.formatState
		        },
		        {
				  	key:6,
		          	label:'操作',
				  	width:200,
				  	operations:[
					  	{
					  		func :this.handleEdit,
					  		label:'编辑'
					  	},
					  	{
					  		func :this.handleDel,
					  		label:'删除'
					  	}
				  	]
		        }];
		        //方法名
		        const dispatch = 'getRoleList';
		        //参数
		        const paramas ={
					pageNum: 1,
					pageSize:10,
					keyWord:'',
				}
			return {
				config:{
					columns:columns,
					dispatch:dispatch,
					paramas:paramas,
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
			//获取角色列表
			getRoles() {
				let para = {
					pageNum: 1,
					pageSize:10,
					keyWord: this.filters.keyWord
				};
				this.listLoading = true;
				this.$store.dispatch('getRoleList',para).then((res) => {  
					this.listLoading = false;
		        });  
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ids: row.id };
					this.$store.dispatch('removeUser',para).then((res) => {  
						this.listLoading = false;
						this.$message({
							message: '删除角色成功',
							type: 'success'
						});
						this.getUsers();
			        });  
				}).catch(() => {

				});
			},
			//显示新增界面
			handleAdd: function () {
				this.$router.push({ path: '/system/role/addRole' });
			},
			
			//显示编辑界面
			handleEdit: function (index, row,scope) {
				this.$router.push({ path: '/system/role/editRole', query: { id: row.id }});
			},
			
			handleSelectionChange(val) {
		        this.sels = val;
	      	},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ids: ids };
					this.$store.dispatch('removeRole',para).then((res) => {  
						this.listLoading = false;
						this.$message({
							message: '删除角色成功',
							type: 'success'
						});
						this.getUsers();
			        });  
				}).catch(() => {

				});
			},
			//启用角色
			start:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认启用选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids,state:1 };
					this.$store.dispatch('changeState',para).then((res) => {  
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '成功启用选中角色',
							type: 'success'
						});
						this.getRoles();
			        });  
				}).catch(() => {

				});
			},
			//停用角色
			stop:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认停用选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids,state:0 };
					this.$store.dispatch('changeState',para).then((res) => {  
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '成功停用选中角色',
							type: 'success'
						});
						this.getRoles();
			        });  
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getRoles();
		},
		components: {
			MyTable
		}
	}

</script>

<style scoped>

</style>
