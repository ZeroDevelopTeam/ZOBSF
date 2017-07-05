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
					    <el-input v-model="editOrderForm.delivery" class="editOrder-delivery" auto-complete="off"></el-input>
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
						<el-select  placeholder="请选择状态" v-model="editOrderForm.state" class="editOrder-state">
					      <el-option label="已废止" value="-1"></el-option>
					      <el-option label="已完成" value="0"></el-option>
					      <el-option label="待配送" value="1"></el-option>
					      <el-option label="配送中" value="2"></el-option>
					      <el-option label="取消订单" value="3"></el-option>
					      <el-option label="未付款" value="4"></el-option>
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
import { mapGetters } from 'vuex'
import util from '../../../../util/util'
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
				orderId: '',
				receiver: '',
				phone: '',
				orderDate: '',
				delivery: '',
				deliveryDate: '',
				courierPhone: '',
				receiverDate: '',
				state: ''
			},
			addLoading: false,
		}
	},
	computed: {
		...mapGetters([
			'getOrderById'
		]),
	},
	methods: {
		//编辑
		editSubmit() {
			this.$refs.editOrderForm.validate((valid) => {
				if (valid) {
					this.addLoading = true;
					let para = Object.assign({},this.getOrderById, this.editOrderForm);
					para.updateDate = (!para.updateDate || para.updateDate == '') ? '' : util.formatDate.format(new Date(para.updateDate), 'yyyy-MM-dd');
					para.deliveryDate = (!para.deliveryDate || para.deliveryDate == '') ? '' : util.formatDate.format(new Date(para.deliveryDate), 'yyyy-MM-dd');
					para.receiverDate = (!para.receiverDate || para.receiverDate == '') ? '' : util.formatDate.format(new Date(para.receiverDate), 'yyyy-MM-dd');
					para.createDate = (!para.createDate || para.createDate == '') ? '' : util.formatDate.format(new Date(para.createDate), 'yyyy-MM-dd');
					this.$store.dispatch('editOrder',para).then((res) => {
						this.addLoading = false;
						if(res.status==200){
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editOrderForm'].resetFields();
							this.$router.push({ path: '/receipt/order' });
						}else{
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}
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
		},
		//数字的状态转换成文字
		state2Name(state) { 
			let st = "";
			if(state == -1){
				st = '已废止';
			}else if(state == 0){
				st = '已完成';
			}else if(state == 1){
				st = '待配送';
			}else if(state == 2){
				st = '配送中';
			}else if(state == 3){
				st = '已取消';
			}else if(state == 4){
				st = '未付款';
			}
			return st;
		},
	},
	mounted() {
		const orderId=this.$route.query.orderId;
		this.$store.dispatch('getOrderById',{orderId: orderId}).then((res)=>{
			if(res.state!=undefined){
				res.state = this.state2Name(res.state);
			}
			this.editOrderForm = Object.assign({}, this.editOrderForm, res);
		})
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
	.editOrder-delivery {
		width: 35% !important;
	}
	.editOrder-state {
		width: 35% !important;
	}
}
.el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
