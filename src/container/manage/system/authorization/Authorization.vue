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
			<el-form :inline="true" :model="filters" ref="search">
				<el-form-item>
					<el-input v-model="filters.keyWord" placeholder="关键字查询"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAuths">查询</el-button>
					<el-button type="primary" @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<CommTable  :tableConfig="tableConfig"></CommTable>
		<!--权限详情 -->
		<AuthInfo :dialogFormVisible="dialogFormVisible" :authInfo="authInfo"></AuthInfo>
	</section>
	
</template>

<script>
	import CommTable from '../../../../components/CommTable';
	import AuthInfo from './AuthInfo';
  	import { mapGetters } from 'vuex'
	export default {
		computed: {
		 ...mapGetters([
			'authList'
	   		 ])
	    },
		data() {
		       const columns = [{
					key:1,
			        label:'权限编号',
			        prop:'authCode',
			        handelLink:this.clickLick,
		        },
		        {
				  	key:2,
		          	label:'权限名称',
		          	prop:'authName',
		        },
		        {
			 	 	key:3,
		          	label:'规则',
		          	prop:'rule',
		        },
		        {
				  	key:4,
		          	label:'创建时间',
		          	prop:'createTime',
		        },
		        {
				  	key:5,
		          	label:'备注',
		          	prop:'descripte',
		        },
		        {
				  	key:6,
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
		        //查询参数
		        let params = {
		        	pageNum: 1,
					pageSize:10,
					keyWord: ''
		        };
		        const dispatch='getAuthList';
		        const tableData={
					list:[{
		            authCode: '01',
		            authName: '权限1',
		            rule: '规则1',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:1
		          }, {
		            authCode: '02',
		            authName: '权限2',
		            rule: '规则2',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:1
		          }, {
		            authCode: '03',
		            authName: '权限3',
		            rule: '规则3',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:1
		          }, {
		            authCode: '04',
		            authName: '权限4',
		            rule: '规则4',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:0
		          }, {
		            authCode: '05',
		            authName: '权限5',
		            rule: '规则5',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:0
		          },{
		            authCode: '06',
		            authName: '权限6',
		            rule: '规则6',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:1
		          }, {
		            authCode: '07',
		            authName: '权限7',
		            rule: '规则7',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:1
		          }, {
		            authCode: '08',
		            authName: '权限8',
		            rule: '规则8',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:1
		          }, {
		            authCode: '09',
		            authName: '权限9',
		            rule: '规则9',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:0
		          }, {
		            authCode: '10',
		            authName: '权限10',
		            rule: '规则10',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:0
		          }, {
		            authCode: '11',
		            authName: '权限11',
		            rule: '规则11',
		            createTime:'2016-05-02',
		            descripte:'无',
		            state:0
		          }],
		          pageSize:10,
		          pageNum:1,
		          total:11
				};
			return {
				authInfo:'',
				tableConfig:{
					//dataList:[],
					dataList:tableData,
					columns,
					params,
					dispatch:dispatch,
					rowOptions:this.handleSelectionChange,
					tableData,
				},
				filters: {
					keyWord: ''
				},
				sels: [],//列表选中列
				dialogFormVisible:false,
			}
		},
		methods: {
			//点击链接显示详情
			clickLick(row){
				this.dialogFormVisible=true;
				this.authInfo=row;
			},
			//状态显示转换
			formatState: function (row, column) {
				return row.state == 1 ? '启用' : row.state == 0 ? '停用' : '未知';
			},
			//重置
			resetForm() {
		        this.$refs.search.resetFields();
		        this.filters.keyWord='';
		        this.getauths();
		    },
			//获取权限列表
			getAuths() {
				let para = {
					pageNum: 1,
					pageSize:10,
					keyWord: this.filters.keyWord
				};
				this.listLoading = true;
				this.$store.dispatch('getAuthList',para).then((res) => {  
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
					this.$store.dispatch('removeauth',para).then((res) => {  
						this.listLoading = false;
						this.$message({
							message: '删除权限成功',
							type: 'success'
						});
						this.getAuths();
			        });  
				}).catch(() => {

				});
			},
			//显示新增界面
			handleAdd: function () {
				this.$router.push({ path: '/system/authorization/addAuth' });
			},
			
			//显示编辑界面
			handleEdit: function (index, row,scope) {
				this.$router.push({ path: '/system/authorization/editAuth', query: { id: row.id }});
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
					this.$store.dispatch('removeauth',para).then((res) => {  
						this.listLoading = false;
						if(res.status==1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getAuths();
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
			//启用权限
			start:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认启用选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids,state:1 };
					this.$store.dispatch('changeauthState',para).then((res) => {  
						this.listLoading = false;
						if(res.status==1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getAuths();
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
			//停用权限
			stop:function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认停用选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids,state:0 };
					this.$store.dispatch('changeAuthState',para).then((res) => {  
						this.listLoading = false;
						if(res.status==1){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.getAuths();
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
		watch:{
		  	authList(){
		  		this.$set(this.tableConfig, "dataList", this.authList);
		  	},
		  	filters:{
		  		 handler(val,oldval){  
                    this.$set(this.tableConfig.params, "keyWord", val.keyWord);
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
　　　　　　 },
		},
		mounted() {
			this.getAuths();
		},
		components: {
			CommTable,
			AuthInfo
		}
	}

</script>

<style scoped>
.toolbar{
	background: white;
}
</style>
