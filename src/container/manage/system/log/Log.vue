<template>
	<section>
		<!--工具条-->
		<el-col :span="16" class="toolbar" style="padding-bottom: 0px;">
			<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
			    <el-tab-pane label="操作日志" name="columnsOperate"></el-tab-pane>
			    <el-tab-pane label="数据库日志" name="columnsDb"></el-tab-pane>
			    <el-tab-pane label="系统日志" name="columnsSys"></el-tab-pane>
			  </el-tabs>
		</el-col>
		<el-col :span="8" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" ref="search">
				<el-form-item>
					<el-input v-model="filters.keyWord" placeholder="关键字查询"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getLogs">查询</el-button>
					<el-button type="primary" @click="resetForm()">重置</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<CommTable  :tableConfig="tableConfig"></CommTable>
	</section>
	
</template>

<script>
	import CommTable from '../../../../components/CommTable';
  import { mapGetters } from 'vuex'
  const columnsOperate = [{
					key:1,
			        label:'操作日志编号',
			        prop:'logCode',
		        },
		        {
				  	key:2,
		          	label:'日志内容',
		          	prop:'content',
		        },
		        {
			 	 	key:3,
		          	label:'操作用户',
		          	prop:'userName',
		        },
		        {
			 	 	key:4,
		          	label:'操作时间',
		          	prop:'time',
		        },
		        {
				  	key:5,
		          	label:'日志级别',
		          	prop:'rank',
		        }];
		        const columnsDb = [{
					key:1,
			        label:'数据库日志编号',
			        prop:'logCode',
		        },
		        {
				  	key:2,
		          	label:'日志内容',
		          	prop:'content',
		        },
		        {
			 	 	key:3,
		          	label:'操作用户',
		          	prop:'userName',
		        },
		        {
			 	 	key:4,
		          	label:'操作时间',
		          	prop:'time',
		        },
		        {
				  	key:5,
		          	label:'日志级别',
		          	prop:'rank',
		        }];
		        const columnsSys = [{
					key:1,
			        label:'系统日志编号',
			        prop:'logCode',
		        },
		        {
				  	key:2,
		          	label:'日志内容',
		          	prop:'content',
		        },
		        {
			 	 	key:3,
		          	label:'操作用户',
		          	prop:'userName',
		        },
		        {
			 	 	key:4,
		          	label:'操作时间',
		          	prop:'time',
		        },
		        {
				  	key:5,
		          	label:'日志级别',
		          	prop:'rank',
		        }];
	export default {
		computed: {
		 ...mapGetters([
			'logList'
	   		 ])
	    },
		data() {
		       
		        //方法名
		        const dispatch = 'getLogList';
		        //查询参数
		        let params = {
		        	pageNum: 1,
					pageSize:10,
					keyWord: ''
		        }
			return {
				activeName2: 'columnsOperate',
				tableConfig:{
					dataList:[],
					columns:columnsOperate,
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
			handleClick(tab, event) {
				console.log(tab.name);
				if(tab.name=='columnsOperate'){
					console.log(columnsOperate);
					this.tableConfig.columns=columnsOperate;
				}else if(tab.name=='columnsDb'){
					console.log(columnsDb);
					this.tableConfig.columns=columnsDb;
				}else{
					console.log(columnsSys);
					this.tableConfig.columns=columnsSys;
				}
		     },
			//重置
			resetForm() {
		        this.$refs.search.resetFields();
		        this.filters.keyWord='';
		        this.getLogs();
		   },
			//获取日志列表
			getLogs() {
				let para = {
					pageNum: 1,
					pageSize:10,
					keyWord: this.filters.keyWord
				};
				this.listLoading = true;
				this.$store.dispatch('getLogList',para).then((res) => {  
					this.listLoading = false;
		        });  
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: row.id };
					this.$store.dispatch('removeLog',para).then((res) => {  
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getLogs();
						//NProgress.done();
			        });  
				}).catch(() => {

				});
			},
			handleSelectionChange(val) {
		        this.sels = val;
	      	},
		},
		watch:{
		  	logList(){
		  		this.$set(this.tableConfig, "dataList", this.logList);
		  	},
		  	filters:{
		  		 handler(val,oldval){  
                    this.$set(this.tableConfig.params, "keyWord", val.keyWord);
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
　　　　　　 },
			columns:{
		  		 handler(val,oldval){  
		  		 	console.log(val);
                    this.$set(this.tableConfig, "columns", val);
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
　　　　　　 },
		},
		mounted() {
			this.getLogs();
		},
		components: {
			CommTable,
		}
	}

</script>

<style scoped>
.toolbar{
	background: white;
}
</style>
