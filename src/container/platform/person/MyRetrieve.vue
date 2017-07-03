<template>
	<section class="my-retrieve">
		<h2 ><strong class="title">{{$route.name}}</strong></h2>
		<div class="my-retrieve-detail">
	    	<el-card class="retrieve-info" v-for="o in 5" :key="o">
	    		<table width="100%">
	    			<tr>
	    				<th colspan="4"><strong>2017-06-27</strong>&nbsp;&nbsp;&nbsp;回收单号: 11032278161636747</th>	
	    			</tr>
	    			<tr>
	    				<td width="20%"><img src="../../../image/xiaowangzi.png"/></td>
	    				<td width="45%">
	    					<p><h2>小王子(65周年纪念版)</h2></p>
							<p>圣埃克苏佩里(Saint-Exupery) (作者), 林秀清 (译者)</p>
							<p>数量：1</p>
							<p>单价：￥19</p>
	    				</td>
	    				<td width="20%">
	    					<p><h2>总金额：￥19</h2></p>
							<p>运费：￥0</p>
	    				</td>
	    				<td width="15%">
	    					<p><a href="">未确认收货/交易成功</a></p>
							<p><a href="">订单详情</a></p>
							<p><a href="">未评价/已评价</a></p>
							<p><a href="">删除订单</a></p>
	    				</td>
	    			</tr>	
    			</table>
	    	</el-card>
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
.my-retrieve{
	.title{
		font-size: 1.3em;
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.my-retrieve-detail{
		padding-top: 10px;
		width: 90%;
		margin: auto;
		.retrieve-info{
			margin-bottom: 10px;
			padding: 10px;
			height: 150px;
			width: 95%;
			table{
				border: 1px solid #d1dbe5;
			}
			table th{
				height: 30px;
				line-height: 30px;
				text-align: left;
				border-bottom: 1px solid #d1dbe5;
			}
			table td:first-child{
				white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
				border-left: 0;
				padding: 0 10px;
				
			}
			table td{
				white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
				border-left: 1px solid #d1dbe5;
				padding: 0 15px;
				p{
					padding-bottom: 4px;
				}
				p a{
					color: #000000;
				}
				p a:hover{
					color: #c7161c;
				}
				
			}
			.info-title{
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