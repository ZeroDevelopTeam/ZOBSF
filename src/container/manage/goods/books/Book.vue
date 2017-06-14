<template>
	<el-row style="margin-top: 10px;">
		 <el-col :span="4">
		 	<el-tree
			  :data="data2"
			  :props="defaultProps"
			  node-key="id"
			  default-expand-all
			  :expand-on-click-node="false"
			  highlight-current="true"
			  @node-click="handleClick"
		  	>
		</el-tree>
		 </el-col>
		 <el-col :span="19" style="margin-left: 5px;">
		 	<div class="book-top">
				<el-button type="primary" @click="addSubmit">新增</el-button>
				<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
				<el-input
				  placeholder="请输入关键字"
				  icon="search"
				  v-model="searchVaule"
				  :on-icon-click="handleSearch">
				</el-input>
			</div>
			<CommTable  :tableConfig="tableConfig"></CommTable>
		 </el-col>
	</el-row>
</template>

<script>
import CommTable from '../../../../components/CommTable'
import { mapGetters } from 'vuex'
 export default {
 	components:{
 		CommTable
 	},
    data() {
    	const columns = [{
		        label:'图书编号',
		        prop:'bookId',
	        },
	        {
	          	label:'图书名称',
	          	prop:'bookName',
	        },
	        {
	          	label:'图书单价(元)',
	          	prop:'price',
	        },
	        {
	          	label:'图书折扣',
	          	prop:'discount',
	        },
	        {
	          	label:'入库时间',
	          	prop:'storeDate',
	        },
	        {
	          	label:'入库位置',
	          	prop:'storeHose',
	        },
	        {
	          	label:'库存量(册)',
	          	prop:'storeNum',
	        },
	        {
	          	label: "操作",
	          	width: 190,
		  		operations: [
			  		{
			          label: '修改',
			          butType: 'info',
			          func: this.handleEdit
		        	},
		        	{
			          label: this.labelFun,
			          butType: 'info',
			          func: this.handleAction
		        	},
		        	{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete
		        	}
		        ]
	        }];
	    /*模拟数据  */
	    let souData = [{
          bookId: '20160502',
          bookName: '葵花宝典',
          price: '￥ 20',
          discount: '5',
          storeDate: '1842-10-09',
          storeHose: '黑木崖',
          storeNum: '100'
        }]
	    //查询参数
        let params = {
        	pageNum: 1,
			pageSize:10,
			keyWord: ''
        }
      return {
      		tableConfig: {
		      	columns,
		      	dispatch: 'increment',
		      	params,
		      	dataList: [],
		      	rowOptions:this.handleSelectionChange,
    		},
    		searchVaule: '',//检索值
    		sels: [],//列表选中列
    		/*模拟数据*/
	        data2: [{
	          id: 1,
	          label: '一级 1',
		      children: [{
		        id: 4,
		        label: '二级 1-1',
		        children: [{
		          id: 9,
		          label: '三级 1-1-1'
		        }, {
		          id: 10,
		          label: '三级 1-1-2'
		        }]
		      }]
			    }, {
			      id: 2,
			      label: '一级 2',
			      children: [{
			        id: 5,
			        label: '二级 2-1'
			      }, {
			        id: 6,
			        label: '二级 2-2'
			      }]
			    }, {
			      id: 3,
			      label: '一级 3',
			      children: [{
			        id: 7,
			        label: '二级 3-1'
			      }, {
			        id: 8,
			        label: '二级 3-2'
			    }]
			}],
		    defaultProps: {
		      	children: 'children',
		      	label: 'label'
		    }
  		}
	},
	computed: {
	 	...mapGetters([
			'getByPage'
   		])
	},
	watch: {
		getByPage(){
		  	this.$set(this.tableConfig, "dataList", this.getByPage.list);
		  	this.$set(this.tableConfig, "params", this.params);
		},
	},
	methods: {
		//点击分类
		handleClick(data) {
			alert(data);
		},
		//新增
		addSubmit: function () {
			this.$router.push({ path: '/goods/book/addBook' });
		},
		//关键字检索
		handleSearch(ev) {
			console.log(this.searchVaule);
		},
		//行中修改
		handleEdit(row) {
			
		},
		//行中删除
		handleDelete(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$message({
						message: '删除成功',
						type: 'success'
					});
			});
		},
		//批量删除
		batchRemove: function () {
			var codes = this.sels.map(item => item.reclaimCode).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'warning'
			}).then(() => {
				alert(codes)
			})
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //状态不同显示不同操作
	    labelFun(index,row) {
	    	let str = '上架';
	    	if(row.state == 1){
	    		str = '分配';
	    	}else if(row.state == 3){
	    		str = '废止';
	    	}
	    	return str;
	    },
	    handleAction(index, row) {
	    	alert("上架");
	    },
	},
	mounted() {
		let para = {
			pageNum: 1,
			pageSize:10,
			keyWord: this.searchVaule
		};
		this.para = Object.assign{{},this.para, para}
		this.$store.dispatch('getByPage',para);
	},
};
</script>

<style scoped lang="scss">
.book-top{
	margin-bottom: 5px;
	float: left;
	width:100%;
	.el-input{
		width: 20%;
		display: inline-block;
		float: right;
	}
}
</style>