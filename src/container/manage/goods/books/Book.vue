<template>
	<div class="book-container" id="book-container">
		<div id="book-left">
		 	<el-tree
			  :data="bookTypeTree"
			  :props="defaultProps"
			  node-key="typeId"
			  default-expand-all
			  :expand-on-click-node="false"
			  :highlight-current= true
			  @node-click="handleClick"
		  	>
			</el-tree>
		</div>
		<div id="book-middle"></div>
		<div id="book-right">
		 	<div class="book-top">
				<el-button type="primary" @click="addSubmit">新增</el-button>
				<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
				<el-input
				  placeholder="请输入关键字"
				  icon="search"
				  v-model="searchVaule"
				  :on-icon-click="handleSearch"
				  @keyup.enter.native="handleSearch"
				  >
				</el-input>
			</div>
			<CommTable  :tableConfig="tableConfig"></CommTable>
		</div>
	</div>
</template>

<script>
import CommTable from '../../../../components/CommTable'
import DivideUtil from '../../../../util/divideUtil'
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
	    //查询参数
        let params = {
        	pageNum: 1,
			pageSize:10,
			keyWord: ''
        }
      return {
      		tableConfig: {
		      	columns,
		      	dispatch: 'getByPage',
		      	params,
		      	dataList: [],
		      	rowOptions:this.handleSelectionChange,
    		},
    		searchVaule: '',//检索值
    		sels: [],//列表选中列
    		typeId:'',//分类id
		    defaultProps: {
		      	children: 'children',
		      	label: 'typeName'
		    }
  		}
	},
	computed: {
	 	...mapGetters([
			'getByPage',
			'bookTypeTree'
   		])
	},
	watch: {
		getByPage() {
            this.$set(this.tableConfig, "dataList", this.getByPage);
		}
	},
	methods: {
		//初始化或者刷新表格
		getBooks() {
			let para = {
				pageNum: this.getByPage.pageNum ? this.getByPage.pageNum : 1,
				pageSize: this.getByPage.pageSize ? this.getByPage.pageSize : 10,
				keyWord: this.searchVaule
			};
			this.$store.dispatch('getByPage',para);
		},
		//点击分类
		handleClick(data) {
			let para = {
				pageNum:  1,
				pageSize: 10,
				typeId: data.typeId
			};
			this.$store.dispatch('getBooksByBookTypeId', para);
			this.typeId = data.typeId;
		},
		//新增
		addSubmit() {
			this.$router.push({ path: '/goods/book/addBook' ,query: { typeId: this.typeId }});
		},
		//关键字检索
		handleSearch(ev) {
			let para = {
				pageNum: this.getByPage.pageNum ? this.getByPage.pageNum : 1,
				pageSize: this.getByPage.pageSize ? this.getByPage.pageSize : 10,
				keyWord: this.searchVaule,
				typeId: this.typeId
			};
			this.$store.dispatch('getByPage',para);
		},
		//行中修改
		handleEdit(index, row) {
			this.$router.push({ path: '/goods/book/editBook' ,query: { bookId: row.bookId }});
		},
		//行中删除
		handleDelete(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'error'
			}).then(() => {
				let para = { bookId: row.bookId };
				this.$store.dispatch('removeBook',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getBooks();
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
			    });  
			});
		},
		//批量删除
		batchRemove() {
			let bookIds = this.sels.map(item => item.bookId).toString();
			let para = {bookId:bookIds}
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'error'
			}).then(() => {
				this.$store.dispatch('removeBook',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getBooks();
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
			    });
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
				pageSize:  10,
				keyWord: ''
			};
		this.$store.dispatch('getBookTypeTree',para);
		this.getBooks();
		//分栏拖拽
		DivideUtil.divideFun("book-container", "book-left", "book-middle", "book-right");
	},
};
</script>

<style scoped lang="scss">
.book-container {
	margin-top: 10px;
	position: relative;
	height: 50em;
	/*overflow: hidden;*/
	#book-left, #book-right, #book-middle { 
		height:100%; 
		position:absolute;
	}
	#book-left {
		width:300px;
	}
	#book-middle {
		width:9px;
		left:300px;
	}
	#book-middle:hover{ cursor:col-resize;}
	#book-right {
		right:0; 
		left:309px; 
		width:auto;
	}
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
}
</style>