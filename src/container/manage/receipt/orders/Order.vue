<template>
	<div class="order-container">
		<div class="order-top">
			<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
			<el-input
			  placeholder="请输入关键字"
			  icon="search"
			  v-model="searchVaule"
			  :on-icon-click="handleSearch">
			</el-input>
		</div>
		<CommTable  :tableConfig="tableConfig"></CommTable>
		<el-popover
		  ref="stateAction"
		  placement="top"
		  width="160"
		  v-model="popoverVisible">
		  <p>这是一段内容这是一段内容确定删除吗？</p>
		  <div style="text-align: right; margin: 0">
		    <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
		    <el-button type="primary" size="mini" @click="popoverVisible = false">确定</el-button>
		  </div>
		</el-popover>
	</div>
</template>

<script>
import CommTable from '../../../../components/CommTable'
import { mapGetters } from 'vuex'
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
			          popover: 'stateAction'
		        	},{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete
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
    		popoverVisible: false,//按钮上的提示
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
				st = '待分配';
			}else if(row.state == 2){
				st = '待配送';
			}else if(row.state == 3){
				st = '已取消';
			}else if(row.state == 4){
				st = '配送中';
			}
			return st;
		},
		//关键字检索
		handleSearch() {
			this.getOrders();
		},
		//行中修改
		handleEdit(row) {
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
			if(row.state==0 || row.state== -1 || row.state==2){
				return false;
			}else{
				return true;
			}
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //转跳订单详情
	    handelLink(row) {
	    	this.$router.push({ path: '/receipt/order/editOrder', query: { orderId: row.orderId }});
	    },
	    //根据不同状态进行相关操作
	    handleAction(index, row) {
	    	alert("分配");
	    },
	    //状态不同显示不同操作
	    labelFun(index,row) {
	    	let str = '完成';
	    	if(row.state == 1){
	    		str = '分配';
	    	}else if(row.state == 4){
	    		str = '完成';
	    	}else if(row.state == 3){
	    		str = '废止';
	    	}
	    	return str;
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
}
</style>