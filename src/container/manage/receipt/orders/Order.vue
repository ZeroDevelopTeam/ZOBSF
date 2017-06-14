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
			          func: this.handleAction
		        	},{
			          label: '删除',
			          butType: 'danger',
			          func: this.handleDelete
		        	}
		        ]
	        }];
	    let souData =[{
	    	orderId: '20170868',
	    	address: '喜马拉雅山脚下十一号',
	    	receiver: '爱因斯坦',
	    	phone: '13845668685',
	    	orderDate: '2016-01-05',
	    	delivery: '刘翔',
	    	deliveryDate: '2016-10-06', 
	    	state: '待配送'
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
		      	params,
		      	actionType: 'increment',
		      	dataList: souData,
		      	total:0,
		      	rowOptions:this.handleSelectionChange
    		},
    		searchVaule:null,//检索值
    		sels: [],//列表选中列
        }
	},
	methods: {
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
		batchRemove() {
			var orderIds = this.sels.map(item => item.orderId).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'error'
			}).then(() => {
				alert(orderIds)
			})
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //转跳订单详情
	    handelLink() {
	    	this.$router.push({ path: '/receipt/order/editOrder' });
	    },
	    handleAction(index, row) {
	    	alert("分配");
	    },
	    //状态不同显示不同操作
	    labelFun(index,row) {
	    	let str = '完成';
	    	if(row.state == 1){
	    		str = '分配';
	    	}else if(row.state == 3){
	    		str = '废止';
	    	}
	    	return str;
	    }
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