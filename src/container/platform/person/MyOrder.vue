<template>
	<section class="my-order">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="my-order-detail">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="全部订单" name="all">
			    	<el-card class="order-info" v-for="o in 5">
					    <div class="info-title">
					    	<strong>2017-06-27</strong>&nbsp;&nbsp;&nbsp;
					    	订单号: 11032278161636747
					    </div>
			    		<el-row>
			    			<el-col :span="3" style="border-right: 1px solid #d1dbe5;">
			    				<img src="../../../image/xiaowangzi.png"/>
			    			</el-col>
			    			<el-col :span="8" style="border-right: 1px solid #d1dbe5;">
			    				<p><h2>小王子(65周年纪念版)</h2></p>
								<p>圣埃克苏佩里(Saint-Exupery) (作者), 林秀清 (译者)</p>
								<p>数量：1</p>
								<p>单价：￥19</p>
			    			</el-col>
			    			<el-col :span="6" style="border-right: 1px solid #d1dbe5;">
			    				<p><h2>总金额：￥19</h2></p>
								<p>运费：￥0</p>
			    			</el-col>
			    			<el-col :span="7" style="border-right: 1px solid #d1dbe5;">
			    				<p><h2>交易成功</h2></p>
								<p><a href="">订单详情</a></p>
			    			</el-col>
			    		</el-row>
			    	</el-card>
			    </el-tab-pane>
			    <el-tab-pane label="待付款" name="waitPay">
			    </el-tab-pane>
			    <el-tab-pane label="待收货" name="waitGet">
			    </el-tab-pane>
			    <el-tab-pane label="待发货" name="waitDeliver">
			    </el-tab-pane>
			    <el-tab-pane label="待评价" name="waitComment">
			    </el-tab-pane>
			</el-tabs>
			<el-row class="page">
				<el-col :span="24">
					<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page="1"
				      :page-size="10"
				      layout="total,  prev, pager, next, jumper"
				      :total="12">
				    </el-pagination>
				</el-col>
			</el-row>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				activeName:'all',
			}
		},
		methods: {
			handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		    }
		},
		computed: {
	    },
		mounted() {
			const user = sessionStorage.getItem('user');
			this.$store.dispatch('getUser',{userCode:'001'}).then((res)=>{
				this.editForm = res;
			});
		},
		components: {
		}
	}

</script>

<style scoped lang="scss">
.my-order{
	.title{
		font-size: 1.3em;
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.my-order-detail{
		padding-top: 10px;
		width: 90%;
		margin: auto;
		.order-info{
			margin-bottom: 10px;
			padding: 10px;
			height: 120px;
			width: 97%;
			.info-title{
				padding-bottom:5px ;
				border-bottom: 1px solid #d1dbe5;
			}
			p{
				margin: 1px 0;
			}
			img{
				margin-top: 10px;
				width: 90px;
				height: 90px;
			}
		}
		.page{
	        text-align: center;
	        margin: 30px 0;
	    }
	}
}
</style>