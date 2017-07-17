<template>
	<div class="recl-container">
		<div class="recl-top">
			<el-button type="primary" @click="handleAdd" v-if="purview.indexOf('1')>-1">新增</el-button>
			<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove" v-if="purview.indexOf('3')>-1">删除</el-button>
			<el-input
			  placeholder="请输入关键字"
			  icon="search"
			  v-model="searchVaule"
			  :on-icon-click="handleSearch"
			  v-if="purview.indexOf('4')>-1">
			</el-input>
		</div>
		<!--新增界面-->
		<el-dialog title="新增"  :visible.sync="addFormVisible" :close-on-click-modal="false" class="recl-addForm" @close="MyClose">
			<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
				<el-form-item label="回收人：" prop="retriever">
					<el-input v-model="addForm.retriever" auto-complete="off" class="recl-input"></el-input>
				</el-form-item>
				<el-form-item label="回收时间：" prop="retrieveDate">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="addForm.retrieveDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="回收类型：" prop="state">
				    <el-select v-model="addForm.state" placeholder="请选择回收类型" @change="selectChange">
					    <el-option label="退货回收" :value=0></el-option>
					    <el-option label="主动回收" :value=1></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="订单号：" prop="orderId" v-if="addForm.state==0">
					<el-input v-model="addForm.orderId" auto-complete="off" class="recl-input"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="recl-footer">
				<el-button type="primary" @click.native="ARB">添加回收图书</el-button>
				<el-button type="primary" @click.native="MyClose">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<CommTable  :tableConfig="tableConfig"></CommTable>
		<AddRelateBooks 
			:arbVisible='arbVisible' 
			@close="closeDialog" 
			:retrieveType="addForm.state" 
			:orderId="addForm.orderId"
			:arbs="arbs">
		</AddRelateBooks>
	</div>
</template>

<script>
import CommTable from '../../../../components/CommTable'
import AddRelateBooks from './AddRelateBooks'
import { mapGetters } from 'vuex'
import util from '../../../../util/util'
export default {
	components: {
		CommTable,
		AddRelateBooks
	},
	data() {
	 	const columns = [
	 		{
	 			label: '回收单编号',
	 			prop: 'retrieveId'
	 		},
	        {
	          	label:'回收人',
	          	prop:'retriever',
	        },
	        {
	          	label:'回收时间',
	          	prop:'retrieveDate',
	        },
	        {
	          	label:'回收类型',
	          	prop:'state',
	          	formatter: this.stateFormatter,
	        },
	        {
	          	label: "操作",
		  		operations: [
			  		{
			          label: '修改',
			          butType: 'info',
			          func: this.handleEdit,
			          isShow:this.butIsShow,
		        	},{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete,
			          isShow:this.butIsShow,
		        	}
		        ]
	        }];
	    //查询参数
        let params = {
        	pageNum: 1,
			pageSize:10,
			keyWord: ''
        }
		return{
			purview:'',
      		tableConfig: {
		      	columns,
		      	params,
		      	dispatch: 'getRetrievesByPage',
		      	dataList: [],
		      	rowOptions:this.handleSelectionChange,
    		},
    		AorE: 0, //0-新增，1-修改
    		searchVaule:'',//检索值
    		sels: [],//列表选中列
    		addFormVisible: false,//新增界面是否显示
    		addLoading: false,
    		arbVisible: false,
    		arbs: [],
    		//新增界面数据
			addForm: {
				retriever: '',
				retrieveDate: '',
				state: '',
				orderId: ''
			},
			addFormRules: {
				retriever: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				],
				retrieveDate: [
					{type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
				],
				state: [
					{ type: 'number', required: true, message: '请选择类型', trigger: 'blur' }
				],
				orderId: [
					{ required: true, message: '必填项', trigger: 'blur' }
				]
			},
		}
	},
	computed: {
		...mapGetters([
			'getAddRetrieveBooks',
			'getRetrievesByPage',
			'getRetrieveById'
   		])
	},
	watch: {
		getRetrievesByPage() {
            this.$set(this.tableConfig, "dataList", this.getRetrievesByPage);
		}
	},
	methods: {
		//是否在操作列中显示删除(true-显示, false-不显示)
		butIsShow(index, row,label) {
			if(label == '修改' && this.purview.indexOf('2')>-1){
				return true;
			}else if(label == '删除' && this.purview.indexOf('3')>-1){
				return true;
			}else{
				return false;
			}
		},
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.addLoading = true;
					let tempPara = Object.assign({}, this.addForm);
					tempPara.retrieveDate = (!tempPara.retrieveDate || tempPara.retrieveDate == '') ? '' : util.formatDate.format(new Date(tempPara.retrieveDate), 'yyyy-MM-dd hh:mm:ss');
					let para = Object.assign(tempPara,{books:this.getAddRetrieveBooks});
					let dispStr = "";
					if(this.AorE==0){//新增
						dispStr = 'addRetrieve';
					}else{
						dispStr = 'editRetrieve';
					}
					this.$store.dispatch(dispStr,para).then((res)=> {
						this.addLoading = false;
						if(res.status==200){
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['addForm'].resetFields();
							this.addFormVisible = false;
							this.handleSearch();
						}else{
							this.$message({
								message: '提交失败',
								type: 'error'
							});
						}
					})
				}
			});
		},
		//添加(修改)回收图书
		ARB(){
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					if(this.addForm.state==0){//退货回收
						if(this.AorE==0){//新增
							let para = {
								pageNum: 1,
								pageSize: 10,
								orderId: this.addForm.orderId
							}
							this.$store.dispatch('getRetrieveBooksByOrderId',para).then((res)=> {
								if(res.list.length!=0 && this.getAddRetrieveBooks.length==0){
									this.arbs = res.list;
								}else{
									this.arbs = [].concat(this.getAddRetrieveBooks);
								}
							});
						}else{//修改
							this.arbs = [].concat(this.getRetrieveById.books);
							this.$store.dispatch('create_retrieve_book',this.getRetrieveById.books);
						}
						this.arbVisible=true;
					}else{//主动回收
						if(this.AorE==0){//新增
							this.arbs = [].concat(this.getAddRetrieveBooks);
						}else{//修改
							this.arbs = [].concat(this.getRetrieveById.books);
							this.$store.dispatch('create_retrieve_book',this.getRetrieveById.books);
						}
						this.arbVisible=true;
					}
					
				}
			});
		},
		//格式化状态
		stateFormatter(row, column) {
			let st = "";
			if(row.state == 0){
				st = '退货回收';
			}else if(row.state == 1){
				st = '主动回收';
			}
			return st;
		},
		//回收类型下拉框变化触发
		selectChange() {
			this.$store.dispatch('clear_retrieve_book');
			this.$store.dispatch('clearRetrieveBookObj');
		},
		//关键字检索
		handleSearch() {
			let para = {
				pageNum: this.getRetrievesByPage.pageNum ? this.getRetrievesByPage.pageNum : 1,
				pageSize: this.getRetrievesByPage.pageSize ? this.getRetrievesByPage.pageSize :10,
				keyWord: this.searchVaule
			};
		this.$store.dispatch('getRetrievesByPage', para);
		},
		//行中修改
		handleEdit(index,row) {
			let para = {retrieveId: row.retrieveId};
			this.$store.dispatch('getRetrieveById', para).then((res)=> {
				res.retrieveDate = (!res.retrieveDate || res.retrieveDate == '') ? '' : util.formatDate.parse(res.retrieveDate, 'yyyy-MM-dd hh:mm:ss');
				this.addForm = Object.assign({},this.addForm, res);
				this.addFormVisible = true;
			});
			this.AorE = 1;
		},
		//行中删除
		handleDelete(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'error'
			}).then(() => {
				let para = { retrieveIds: row.retrieveId };
				this.$store.dispatch('deleteRetrieve',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.handleSearch();
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
		batchRemove: function () {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'error'
			}).then(() => {
				let retrieveIds = this.sels.map(item => item.retrieveId).toString();
				let para = {retrieveIds:retrieveIds}
				this.$store.dispatch('deleteRetrieve',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.handleSearch();
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
			    });  
			});
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //显示新增界面
	    handleAdd() {
	    	this.AorE = 0;
	    	/*if(this.$refs['addForm']){
	    		this.$refs['addForm'].resetFields();
	    	}*/
	    	this.addForm = Object.assign({},{
				retriever: '',
				retrieveDate: '',
				state: '',
				orderId: ''
			})
	    	this.addFormVisible = true;
		},
		//关闭对话框前重置表单
		MyClose() {
			//清空数据
			this.$store.dispatch('clear_retrieve_book');
			this.$store.dispatch('clearRetrieveBookObj');
			this.addFormVisible = false
			this.$refs['addForm'].resetFields();
		},
		closeDialog() {
			this.arbVisible = false;
		}
	},
	mounted() {
		let user = JSON.parse(sessionStorage.getItem('user'));
		if(user.purview[4]){
			let purview = user.purview[4].toString();
			this.purview = purview;
			
			if(user.purview[4].indexOf('4')>-1){
				this.handleSearch();
			}else{
				this.$message({
		          	message: '您没有查询权限，无法查看数据，请联系管理员！',
		          	type: 'warning'
		        });
			}
		}
	},
}

</script>

<style scoped lang="scss">
.recl-container{
	margin-top: 10px;
	width: 100%;
	.recl-top{
		margin-bottom: 5px;
		float: left;
		width:100%;
		.el-input{
			width: 20%;
			display: inline-block;
			float: right;
		}
	}
	.recl-addForm{
		.rel-note{
			color: #4db3ff;
			margin-left: 1em;
		}
		.recl-input{
		width: 46% !important;
		}
	}
	.recl-footer {
		text-align: center;
	}
}
</style>