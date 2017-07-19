<template>
	<div class="order-container">
		<div class="order-top">
			<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
			<el-input
				title="请输入关键字（订单编号，收货人，收货人电话，收货地址，送货人）"
			  	placeholder="请输入关键字（订单编号，收货人，收货人电话，收货地址，送货人）"
			  	icon="search"
			  	v-model="searchVaule"
			  	:on-icon-click="handleSearch">
			</el-input>
		</div>
		<CommTable  :tableConfig="tableConfig"></CommTable>
		<el-dialog title="完成订单" size="tiny"  :visible.sync="finishVisible" :close-on-click-modal="false" :before-close="closeFinishDialog">
			<el-form :model="finishForm" label-width="110px" :rules="finishFormRules" ref="finishForm">
				<el-form-item label="订单号：" prop="orderId">
					<span v-text="finishForm.orderId" auto-complete="off"></span>
				</el-form-item>
				<el-form-item label="收货时间：" prop="receiverDate">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="finishForm.receiverDate"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="finish-footer">
				<el-button type="primary" @click.native="closeFinishDialog">取消</el-button>
				<el-button type="primary" @click.native="actionSubmit">完成</el-button>
			</div>
		</el-dialog>
		<el-dialog title="分配订单" size="tiny"  :visible.sync="distributeVisible" :close-on-click-modal="false" :before-close="closeDistributeDialog">
			<el-form :model="distributeForm" label-width="110px" :rules="distributeFormRules" ref="distributeForm" >
				<el-form-item label="订单号：" prop="orderId">
					<span v-text="distributeForm.orderId" auto-complete="off"></span>
				</el-form-item>
				<el-form-item label="送件人：" prop="delivery">
					<el-input v-model="distributeForm.delivery" auto-complete="off" class="distribute-input"></el-input>
				</el-form-item>
				<el-form-item label="送件人电话：" prop="deliveryPhone">
					<el-input v-model="distributeForm.deliveryPhone" auto-complete="off" class="distribute-input"></el-input>
				</el-form-item>
				<el-form-item label="送货时间：" prop="deliveryDate">
					<el-date-picker type="datetime" placeholder="选择日期" v-model="distributeForm.deliveryDate"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="finish-footer">
				<el-button type="primary" @click.native="closeDistributeDialog">取消</el-button>
				<el-button type="primary" @click.native="actionSubmit">分配</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import CommTable from '../../../../components/CommTable'
import { mapGetters } from 'vuex'
import util from '../../../../util/util'
export default {
	components: {
		CommTable
	},
	data() {
		const columns = [{
		        label: '订单编号',
		        prop: 'orderId',
		        handelLink: this.handelLink
	        },
	        {
	          	label: '订单地址',
	          	prop: 'address',
	          	width: 150
	        },
	        {
	          	label: '收件人',
	          	prop: 'receiver',
	        },
	        {
	          	label: '收件电话',
	          	prop: 'phone',
	          	width: 125
	        },{
	          	label: '下单时间',
	          	prop: 'orderDate',
	          	width: 110
	        },
	        {
	          	label: '送货人',
	          	prop: 'delivery',
	        },
	        {
	          	label: '送货时间',
	          	prop: 'deliveryDate',
	          	width: 110
	        },
	        {
	          	label: '状态',
	          	prop: 'state',
	          	formatter: this.stateFormatter,
	          	width: 80,
	        },
	        {
	          	label: "操作",
	          	width: 190,
		  		operations: [
			  		{
			          label: '修改',
			          butType: 'info',
			          func: this.handleEdit
		        	},{
			          label: this.labelFun,
			          butType: 'info',
			          func: this.handleAction,
			          isShow: this.butIsShow,
		        	},{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete,
			          isShow: this.annulButShow,
		        	}
		        ]
	        }];
	    //查询参数
        const params = {
        	pageNum: 1,
			pageSize:10,
			keyWord: ''
        }
        return {
      		tableConfig: {
		      	columns,
		      	params,
		      	dispatch: 'getOrderByPage',
		      	dataList: [],
		      	rowOptions:this.handleSelectionChange
    		},
    		searchVaule: '',//检索值
    		sels: [],//列表选中列
    		finishVisible: false,//完成订单操作
    		distributeVisible: false,//分配订单操作
    		isAction:'',//标记最后提交表单时是哪种操作
    		bState:'',//点击操作按钮改变的状态
    		//完成订单表单
    		finishForm: {
    			orderId:'',
    			receiverDate:''
    		},
    		finishFormRules: {
				receiverDate: [
					{ type:'date', required: true, message: '请输入时间', trigger: 'blur' }
				]
			},
			//配送订单表单
			distributeForm: {
				orderId:'',
				delivery:'',
				deliveryPhone:'',
				deliveryDate:''
			},
			distributeFormRules: {
				delivery:[
					{required: true, message: '请输入名称', trigger: 'blur' }
				],
				deliveryPhone:[
					{required: true, message: '请输入电话号码', trigger: 'blur' }
				],
				deliveryDate:[
					{type: 'date', required: true, message: '请输入时间', trigger: 'blur' }
				]
			}
        }
	},
	computed: {
		...mapGetters([
			'getOrderByPage'
		]),
	},
	watch: {
		getOrderByPage() {
            this.$set(this.tableConfig, "dataList", this.getOrderByPage);
		}
	},
	methods: {
		//初始化或者刷新表格
		getOrders() {
			let para = {
				pageNum: this.getOrderByPage.pageNum ? this.getOrderByPage.pageNum : 1,
				pageSize: this.getOrderByPage.pageSize ? this.getOrderByPage.pageSize : 10,
				keyWord: this.searchVaule
			};
			this.$store.dispatch('getOrderByPage',para);
		},
		//格式化状态
		stateFormatter(row, column) {
			let st = "";
			if(row.state == -1){
				st = '已废止';
			}else if(row.state == 0){
				st = '已完成';
			}else if(row.state == 1){
				st = '待配送';
			}else if(row.state == 2){
				st = '配送中';
			}else if(row.state == 3){
				st = '已取消';
			}else if(row.state == 4){
				st = '未付款';
			}
			return st;
		},
		//关键字检索
		handleSearch() {
			this.getOrders();
		},
		//行中修改
		handleEdit(index,row) {
			this.$router.push({ path: '/receipt/order/editOrder', query: { orderId: row.orderId }});
		},
		//行中删除
		handleDelete(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'error'
			}).then(() => {
				let para = { orderIds: row.orderId };
				this.$store.dispatch('deleteOrderByIds',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getOrders();
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
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'error'
			}).then(() => {
				let orderIds = this.sels.map(item => item.orderId).toString();
				let para = {orderIds:bookIds}
				this.$store.dispatch('deleteOrderByIds',para).then((res) => {
					if(res.status==200){
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getOrders();
					}else{
						this.$message({
							message: '删除失败！',
							type: 'error'
						});
					}
			    });  
			});
		},
		//是否在操作列中显示按钮(true-显示, false-不显示)
		butIsShow(index, row) {
			if(row.state==0 || row.state== -1 || row.state==4){
				return false;
			}else{
				return true;
			}
		},
		//删除按钮是否显示
		annulButShow(index,row) {
			if(row.state==-1 || row.state == 0 || row.state == 3){
				return true;
			}else{
				return false;
			}
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //转跳订单详情
	    handelLink(row) {
	    	this.$router.push({ path: '/receipt/order/orderDetail', query: { orderId: row.orderId }});
	    },
	    //根据不同状态进行相关操作
	    handleAction(index, row) {
	    	if(row.state==2){//完成按钮
	    		this.isAction = 'finish';
	    		this.finishForm = Object.assign({},this.finishForm,{orderId:row.orderId})
	    		this.bState = 0;
	    		this.finishVisible = true;
	    	}else if(row.state==3){//废止按钮
	    		this.$confirm('确认废止订单吗?', '提示', {
					type: 'info'
				}).then(() => {
					let para = { orderId: row.orderId, state:-1 };
					this.$store.dispatch('changeOrderState',para).then((res) => {
						if(res.status==200){
							this.$message({
								message: '废止成功！',
								type: 'success'
							});
							this.getOrders();
						}else{
							this.$message({
								message: '废止失败！',
								type: 'error'
							});
						}
				    });  
				});
	    	}else if(row.state==1){//分配按钮
	    		this.isAction = 'distribute';
	    		this.distributeForm = Object.assign({},this.distributeForm,{orderId:row.orderId})
	    		this.bState = 2;
	    		this.distributeVisible = true;
	    	}
	    },
	    //不同状态最后保存触发的方法
	    actionSubmit() {
	    	if(this.isAction=="finish"){
	    		this.$refs.finishForm.validate((valid) => {
					if (valid) {
						let para = Object.assign({}, this.finishForm, {state: this.bState});
						para.receiverDate = (!para.receiverDate || para.receiverDate == '') ? '' : util.formatDate.format(new Date(para.receiverDate), 'yyyy-MM-dd hh:mm:ss');
						this.$store.dispatch('changeOrderState',para).then((res) => {
	    					if(res.status==200){
								this.$message({
									message: '操作成功！',
									type: 'success'
								});
								this.closeFinishDialog();
								this.getOrders();
							}else{
								this.$message({
									message: '操作失败！',
									type: 'error'
								});
							}
	    				});
					}
				});
	    	}else if(this.isAction=="distribute"){
	    		this.$refs.distributeForm.validate((valid) => {
					if (valid) {
						let para = Object.assign({}, this.distributeForm, {state: this.bState});
						para.deliveryDate = (!para.deliveryDate || para.deliveryDate == '') ? '' : util.formatDate.format(new Date(para.deliveryDate), 'yyyy-MM-dd hh:mm:ss');
						this.$store.dispatch('changeOrderState',para).then((res) => {
	    					if(res.status==200){
								this.$message({
									message: '分配成功！',
									type: 'success'
								});
								this.closeDistributeDialog()
								this.getOrders();
							}else{
								this.$message({
									message: '分配失败！',
									type: 'error'
								});
							}
	    				});
					}
				});
	    	}
	    },
	    //状态不同显示不同操作
	    labelFun(index,row) {
	    	let str = '完成';
	    	if(row.state == 1){
	    		str = '分配';
	    	}else if(row.state == 2){
	    		str = '完成';
	    	}else if(row.state == 3){
	    		str = '废止';
	    	}
	    	return str;
	    },
	    //关闭完成窗口
	    closeFinishDialog(){
	    	this.finishVisible = false;
	    	this.$refs['finishForm'].resetFields();
	    },
	    //关闭分配窗口
	    closeDistributeDialog(){
	    	this.distributeVisible = false;
	    	this.$refs['distributeForm'].resetFields();
	    }
	},
	mounted() {
		//初始化表格
		this.getOrders();
	}
}

</script>

<style scoped lang="scss">
.order-container{
	margin-top: 10px;
	width: 100%;
	.order-top{
		margin-bottom: 5px;
		float: left;
		width:100%;
		.el-input{
			width: 20%;
			display: inline-block;
			float: right;
		}
	}
	.finish-footer{
		text-align: center;
	}
	.distribute-input{
		width: 46% !important;
	}
}
</style>