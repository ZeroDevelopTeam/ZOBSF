<template>
	<section class="order-edit">
		<el-card>
		  <div slot="header" class="clearfix">
		    <strong style="line-height: 20px;">修改订单</strong>
		  </div>
		  	<div>
		  		<el-card class="editOrder-one">
			  		<div style="margin-bottom: 30px;"><strong>订单信息</strong></div>
			  		<div>
			  			<div  class="editOrder-div">
			  				<div>订单号：<span v-text="editOrderForm.orderId"></span></div>
			  				<div>收件人：<span v-text="editOrderForm.receiver"></span></div>
			  			</div>
			  			<div  class="editOrder-div">
			  				<div>收件电话：<span v-text="editOrderForm.phone"></span></div>
			  				<div>下单时间：<span v-text="editOrderForm.orderDate"></span></div>
			  			</div>
			  		</div>
				 </el-card>
			</div>
		<!--编辑界面-->
			<el-form :model="editOrderForm" label-width="100px" :rules="editFormRules" ref="editOrderForm">
				<el-card style="padding-left: 1em;">
					<div class="editOrder-tab"><strong>送货信息</strong></div>
					<el-form-item label="送件人：">
						<el-select  placeholder="请选择送件人" v-model="editOrderForm.delivery">
					      <el-option label="员工1" value="0"></el-option>
					      <el-option label="员工2" value="0"></el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="送件人电话：">
						<span v-text="editOrderForm.courierPhone"></span>
					</el-form-item>
					<el-form-item label="配送时间：">
						<el-date-picker type="date" placeholder="选择日期" v-model="editOrderForm.deliveryDate"></el-date-picker>
					</el-form-item>
				</el-card>
				<el-card style="padding-left: 1em;">
					<div class="editOrder-tab"><strong>收货信息</strong></div>
					<el-form-item label="收货时间：">
						<el-date-picker type="date" placeholder="选择日期" v-model="editOrderForm.receiverDate"></el-date-picker>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select  placeholder="请选择状态" v-model="editOrderForm.state">
					      <el-option label="待分配" value="0"></el-option>
					      <el-option label="待收件" value="1"></el-option>
					    </el-select>
					</el-form-item>
				</el-card>
			</el-form>
			<div class="editOrder-botton">
				<el-button type="primary" @click.native="relateBooks">订单相关图书信息</el-button>
				<el-button type="primary"  @click.native="back()">返回</el-button>
				<el-button type="primary"  @click.native="editSubmit" >提交</el-button>
			</div>
		</el-card>
	</section>
	
</template>

<script>
export default {
	data() {
		return {
			editFormRules: {
				delivery: [
					{ required: true, message: '请选择送件人', trigger: 'blur' }
				],
				deliveryDate: [
					{ required: true, message: '请输入送货时间', trigger: 'blur' }
				],
				receiverDate: [
					{ required: true, message: '请输入收货时间', trigger: 'blur' }
				],
				state: [
					{ required: true, message: '请选择状态', trigger: 'blur' }
				]
			},
			editOrderForm: {
				orderId: 'AAAAAAAA',
				receiver: 'BBBBB',
				phone: 'CCCCCC',
				orderDate: 'DDDDD',
				delivery: '',
				deliveryDate: '',
				courierPhone: '',
				receiverDate: '',
				state: ''
			}
		}
	},
	methods: {
		//编辑
		editSubmit() {
			this.$refs.editOrederForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editOrederForm);
//						para.time = (!para.time || para.time == '') ? '' : util.formatDate.format(new Date(para.time), 'yyyy-MM-dd');
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						this.$refs['editOrederForm'].resetFields();
						this.$router.push({ path: '/recept/order' });
					});
				}
			});
		},
		//返回
		back(){
			this.$refs.editOrderForm.resetFields();
			this.$router.go(-1);
		},
		//浏览订单相关图书
		relateBooks() {
			const orderId=this.$route.query.orderId;
			this.$router.push({ path: '/receipt/order/relateBooks', query: { orderId: orderId }});
		}
	},
	mounted() {
		const orderId=this.$route.query.orderId;
	}
}
</script>

<style scoped lang="scss">
.editOrder-botton{
	margin-top: 1em;
	text-align: center;
}
.order-edit{
	padding-top: 50px;
	width:65%;
    margin: auto;
    .clearfix:before,
  	.clearfix:after {
        display: table;
        content: "";
  	}
	.clearfix:after {
	    clear: both
	}
	.editOrder-one{
		font-size: 14px;
    	color: #48576a;
    	padding-left: 2em;
    	.el-row{
    		margin-top: 2em;
    	}
    	.editOrder-div div{
    		float: left;
    		width: 50%;
    		margin-bottom: 2em;
    	}
	}
	.editOrder-tab{
		margin-bottom: 2em;
    	margin-left: 1em;
	}
}
.el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
