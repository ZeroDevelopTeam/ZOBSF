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
			</el-form>
		</el-col>
		<el-col :span="8" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" ref="search">
				<el-form-item>
					<el-input v-model="filters.keyWord" placeholder="关键字查询"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getRoles">查询</el-button>
					<el-button type="primary" @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<CommTable  :tableConfig="tableConfig"></CommTable>
		<!--<RoleInfo :dialogFormVisible="dialogFormVisible" :roleInfo="roleInfo"></RoleInfo>-->
		
		<!--角色详情 -->
		<el-dialog title="角色详情" :visible.sync="dialogFormVisible">
	    <!--角色详情-->
			<el-form :model="roleInfo" label-width="80px">
				<el-form-item label="角色编号">
					{{roleInfo.roleId}}
				</el-form-item>
				<el-form-item label="角色名称">
					{{roleInfo.roleName}}
				</el-form-item>
				<el-form-item label="备注">
					{{roleInfo.roleDesc}}
				</el-form-item>
				<el-form-item label="角色状态">
					{{roleInfo.state==1?'启用':'停用'}}
				</el-form-item>
			</el-form>
	  		<div slot="footer" class="dialog-footer">
		    	<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  	</div>
		</el-dialog>
	</section>
	
</template>

<script>
	import CommTable from '../../../../components/CommTable';
	import RoleInfo from './RoleInfo';
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
			        prop:'roleId',
			        handelLink:this.clickLick,
		        },
		        {
				  	key:2,
		          	label:'角色名称',
		          	prop:'roleName',
		          	handelLink:this.clickLick,
		        },
		        {
			 	 	key:3,
		          	label:'备注',
		          	prop:'roleDesc',
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
					  	},
					  	{
					  		func :this.changeState,
					  		flag:'state',
					  		type:'danger'
					  	}
				  	]
		        }];
		        //查询参数
		        let params = {
		        	pageNum: 1,
					pageSize:10,
					keyWord: ''
		        };
		        const dispatch='getRoleList';
			return {
				roleInfo:'',
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
				dialogFormVisible:false,
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
				this.roleInfo=row;
			},
			//重置
			resetForm() {
		        this.$refs.search.resetFields();
		        this.filters.keyWord='';
		        this.getRoles();
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
					let para = { roleId: row.roleId };
					this.$store.dispatch('removeRole',para).then((res) => {  
						this.listLoading = false;
						this.$message({
							message: '删除角色成功',
							type: 'success'
						});
						this.getRoles();
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
				this.$router.push({ path: '/system/role/editRole', query: { id: row.roleId }});
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
			        });  
				}).catch(() => {

				});
			},
			//修改用户状态
			changeState:function(index, row,scope){
				let para ='';
				if(row.state==1){//目前是启用状态,改为停用
					para = { roleId: row.roleId,state:0 };
				}else{
					para = { roleId: row.roleId,state:1 };
				}
				console.log(para);
				console.log(row.state);
				this.$confirm(row.state==1?'确认停用选中记录吗？':'确认启用选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					this.$store.dispatch('changeRoleState',para).then((res) => {
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
		  	roleList(){
		  		this.$set(this.tableConfig, "dataList", this.roleList);
		  	},
		  	filters:{
		  		 handler(val,oldval){  
                    this.$set(this.tableConfig.params, "keyWord", val.keyWord);
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
　　　　　　 },
		},
		mounted() {
			this.getRoles();
		},
		components: {
			CommTable,
			RoleInfo
		}
	}

</script>

<style scoped>
.toolbar{
	background: white;
}
</style>
