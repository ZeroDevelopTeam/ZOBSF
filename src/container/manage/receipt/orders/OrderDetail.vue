<template>
	<section class="order-edit">
		<el-card>
		  <div slot="header" class="clearfix">
		    <strong style="line-height: 20px;">订单详情</strong>
		  </div>
		  	<div>
		  		<el-card class="orderDetail-one">
			  		<div style="margin-bottom: 30px;"><strong>订单信息</strong></div>
			  		<div>
			  			<div  class="orderDetail-div">
			  				<div>订单号：<span v-text="getOrderById.orderId"></span></div>
			  				<div>收件人：<span v-text="getOrderById.receiver"></span></div>
			  			</div>
			  			<div  class="orderDetail-div">
			  				<div>收件电话：<span v-text="getOrderById.phone"></span></div>
			  				<div>下单时间：<span v-text="getOrderById.orderDate"></span></div>
			  			</div>
			  		</div>
				 </el-card>
			</div>
			<el-form label-width="100px"  ref="orderDetailForm">
				<el-card style="padding-left: 1em;">
					<div class="orderDetail-tab"><strong>送货信息</strong></div>
					<el-form-item label="送件人：">
						<span v-text="getOrderById.delivery"></span>
					</el-form-item>
					<el-form-item label="送件人电话：">
						<span v-text="getOrderById.courierPhone"></span>
					</el-form-item>
					<el-form-item label="配送时间：">
						<span v-text="getOrderById.deliveryDate"></span>
					</el-form-item>
				</el-card>
				<el-card style="padding-left: 1em;">
					<div class="orderDetail-tab"><strong>收货信息</strong></div>
					<el-form-item label="收货时间：">
						<span v-text="getOrderById.receiverDate"></span>
					</el-form-item>
					<el-form-item label="状态：">
						<span v-text="state2Name()"></span>
					</el-form-item>
				</el-card>
			</el-form>
			<div class="orderDetail-botton">
				<el-button type="primary" @click.native="relateBooks">订单相关图书信息</el-button>
				<el-button type="primary"  @click.native="back()">返回</el-button>
			</div>
		</el-card>
	</section>
	
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {}
	},
	computed: {
		...mapGetters([
			'getOrderById'
		]),
	},
	methods: {
		//返回
		back(){
			this.$router.go(-1);
		},
		//浏览订单相关图书
		relateBooks() {
			let orderId=this.$route.query.orderId;
			this.$router.push({ path: '/receipt/order/relateBooks', query: { orderId: orderId }});
		},
		//数字的状态转换成文字
		state2Name() {
			let stateNum = this.getOrderById.state;
			let st = "";
			if(stateNum == -1){
				st = '已废止';
			}else if(stateNum == 0){
				st = '已完成';
			}else if(stateNum == 1){
				st = '待分配';
			}else if(stateNum == 2){
				st = '待配送';
			}else if(stateNum == 3){
				st = '已取消';
			}else if(stateNum == 4){
				st = '配送中';
			}
			return st;
		}
	},
	mounted() {
		let orderId=this.$route.query.orderId;
		this.$store.dispatch('getOrderById',{orderId: orderId})
	}
}
</script>

<style scoped lang="scss">
.orderDetail-botton{
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
	.orderDetail-one{
		font-size: 14px;
    	color: #48576a;
    	padding-left: 2em;
    	.el-row{
    		margin-top: 2em;
    	}
    	.orderDetail-div div{
    		float: left;
    		width: 50%;
    		margin-bottom: 2em;
    	}
	}
	.orderDetail-tab{
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
