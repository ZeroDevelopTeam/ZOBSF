<template>
	<div class="recl-container">
		<div class="recl-top">
			<el-button type="primary" @click="handleAdd">新增</el-button>
			<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
			<el-input
			  placeholder="请输入关键字"
			  icon="search"
			  v-model="searchVaule"
			  :on-icon-click="handleSearch">
			</el-input>
		</div>
		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" class="recl-addForm">
			<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
				<el-form-item label="回收单编号：" prop="retrieveId">
					<el-input disabled="true" v-model="addForm.retrieveId" auto-complete="off" class="recl-input"></el-input>
					<span class="rel-note">(自动生成)</span>
				</el-form-item>
				<el-form-item label="回收人：" prop="retriever">
					<el-input v-model="addForm.retriever" auto-complete="off" class="recl-input"></el-input>
				</el-form-item>
				<el-form-item label="回收时间：">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.retrieveDate"></el-date-picker>
				</el-form-item>
				<el-form-item label="回收类型：" prop="retrieveType">
				    <el-select v-model="addForm.retrieveType" placeholder="请选择回收类型">
					    <el-option label="手动回收" value="0"></el-option>
					    <el-option label="自动回收" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="订单号：" prop="orderId">
					<el-input v-model="addForm.orderId" auto-complete="off" class="recl-input"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<CommTable  :tableConfig="tableConfig"></CommTable>
	</div>
</template>

<script>
import CommTable from '../../../../components/CommTable'
export default {
	components: {
		CommTable
	},
	data() {
	 	const columns = [{
		        label:'回收单编号',
		        prop:'retrieveId',
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
	          	prop:'retrieveType',
	        },
	        {
	          	label: "操作",
		  		operations: [
			  		{
			          label: '修改',
			          butType: 'info',
			          func: this.handleEdit
		        	},{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete
		        	}
		        ]
	        }];
	    let souData = [{
          retrieveId: '20160502',
          retriever: '王小虎',
          retrieveDate: '2017-03-12',
          retrieveType: '手动回收'
        }, {
          retrieveId: '20160502',
          retriever: '王小虎',
          retrieveDate: '2017-03-12',
          retrieveType: '手动回收'
        }, {
          retrieveId: '20160502',
          retriever: '王小虎',
          retrieveDate: '2017-03-12',
          retrieveType: '手动回收'
        }, {
          retrieveId: '20160502',
          retriever: '王小虎',
          retrieveDate: '2017-03-12',
          retrieveType: '手动回收'
        }]
	    //查询参数
        let params = {
        	pageNum: 1,
			pageSize:10,
			keyWord: ''
        }
		return{
      		tableConfig: {
		      	columns,
		      	params,
		      	actionType: 'increment',
		      	dataList:souData,
		      	total:0,
		      	rowOptions:this.handleSelectionChange,
    		},
    		searchVaule:null,//检索值
    		sels: [],//列表选中列
    		addFormVisible: false,//新增界面是否显示
    		addLoading: false,
    		//新增界面数据
			addForm: {
				retrieveId: '',
				rretriever: '',
				retrieveDate: '',
				retrieveType: '',
				orderId: ''
			},
			addFormRules: {
				retrieveId: [
					{ required: true, message: '必填项', trigger: 'blur' }
				],
				retriever: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				],
				retrieveDate: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				],
				retrieveType: [
					{ required: true, message: '请选择类型', trigger: 'blur' }
				],
				orderId: [
					{ required: true, message: '必填项', trigger: 'blur' }
				]
			},
		}
	},
	methods: {
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.addLoading = true;
					let para = Object.assign({}, this.addForm);
					//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
					this.addLoading = false;
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.$refs['addForm'].resetFields();
					this.addFormVisible = false;
				}
			});
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
				type: 'error'
			}).then(() => {
				this.$message({
						message: '删除成功',
						type: 'success'
					});
			});
		},
		//批量删除
		batchRemove: function () {
			var codes = this.sels.map(item => item.retrieveId).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'error'
			}).then(() => {
				alert(codes)
			})
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //显示新增界面
	    handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
	}
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
}
</style>