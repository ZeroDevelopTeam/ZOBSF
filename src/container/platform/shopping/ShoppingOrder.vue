<template>
	<section class="shopping-order">
		<h1 ><strong class="title">{{$route.name}}</strong></h1>
		<el-steps class="regist-step" :space="300" :align-center="alignCenter" :center="center" :active="active" finish-status="success">
		  	<el-step title="我的购物车"></el-step>
		 	<el-step title="我的订单"></el-step>
		 	<el-step title="完成订单"></el-step>
		</el-steps>
		
		<el-row >
			<h2>收货人信息</h2>
			<el-card class="box-card" style="width: 40%;float: left;">
			  	<div class="text item">
			    	<p>收货人姓名：{{addForm.name}}</p>
			    	<p>收货人电话：{{addForm.tel}}</p>
			    	<p>收货人地址：{{addForm.address}}</p>
			  	</div>
			</el-card>
			<el-button style="float: left;margin:80px 0 0 20px;width: 100px;" size="small" type="danger" @click="dialogFormVisible=true">新增收货人信息</el-button>
		</el-row>
		<el-row>
			<h2>送货清单</h2>
			<el-table
			    :data="tableData"
			    tooltip-effect="dark"
			    style="width: 90%;margin-bottom: 30px;">
			    <el-table-column
			      	label="书籍信息"
			      	show-overflow-tooltip>
			      	<template scope="scope">
				      	<img src="../../../image/xiaowangzi.png"/>
				      	<p><h2>{{ scope.row.bookName }}</h2></p>
						<p>{{ scope.row.bookDesc }}</p>
			      	</template>
			    </el-table-column>
			    <el-table-column
			      	prop="price"
			      	label="单价"
			      	width="80">
			    </el-table-column>
			    <el-table-column
			      	prop="num"
			      	label="数量"
			      	width="180">
			    </el-table-column>
			    <el-table-column
			    	prop="totalPrice"
			      	label="总价"
			      	width="80">
			      	<template scope="scope">
			      		{{ scope.row.price*scope.row.num }}
			      	</template>
			    </el-table-column>
			</el-table>
		</el-row>
		
		<!-- 统计 -->
		<el-row class="statistics">
			<el-col :span="24">
				<span style="float: right;margin-left: 30px;">本网站目前支付方式仅支持<strong color="red">货到付款</strong></span>
				<span  style="float: right;margin-right: 30px;">
					<p>
						<span>商品数量：1</span>
						<span>商品金额：19.00</span>
						<span>运费：5.00</span>
					</p>
					<p>
						合计：<span style="color: red;">${{sumPrice}}</span>
					</p>
				</span>
			</el-col>
		</el-row>
		
		<hr/>
		
		<el-row class="settlement">
			<span class="settlement-total">
				<p>商品金额：19.00</p>
				<p>运费：5.00</p>
				<div style="width: 200px;border-bottom: 1px solid #8391A5;"></div>
				<p>应付金额：<strong color="red">24.00</strong></p>
			</span>
		</el-row>
		
		<el-row class="settlement-result">
			<span>
				<p>寄送至：{{addForm.address}} &nbsp;&nbsp;&nbsp;{{addForm.name}}&nbsp;&nbsp;{{addForm.tel}}</p>
				<el-button style="margin-left: 20px;width: 100px;" size="small" type="danger" @click="addOrder">提交订单</el-button>
			</span>
		</el-row>
		
		<!--新增收货人信息-->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
		  	<el-form :model="addForm" :rules="addFormRules" ref="addForm">
		    	<el-form-item label="收货人姓名" :label-width="formLabelWidth">
		      		<el-input v-model="addForm.name" auto-complete="off"></el-input>
	    		</el-form-item>
	    		<el-form-item label="收货人电话" :label-width="formLabelWidth">
		      		<el-input v-model="addForm.tel" auto-complete="off"></el-input>
	    		</el-form-item>
	    		<el-form-item label="收货人地址" :label-width="formLabelWidth">
		      		<el-input v-model="addForm.address" auto-complete="off"></el-input>
	    		</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="addInfo">确 定</el-button>
		  	</div>
		</el-dialog>
		
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	formLabelWidth: '120px',
		    	dialogFormVisible:false,
		    	alignCenter:true,
		    	center:true,
		    	active:1,
		    	addForm:{
		    		name:'',
		    		tel:'',
		    		address:''
		    	},
		    	addFormRules: {
					name: [
						{ required: true, message: '请输入收货人姓名', trigger: 'change' }
					],
					tel: [
						{ required: true, message: '请输入收货人电话', trigger: 'change' }
					],
					address: [
						{ required: true, message: '请输入收货人地址', trigger: 'change' },
					]
				},
				tableData: [{
		          bookName: '小王子(65周年纪念版)',
		          bookDesc: '圣埃克苏佩里(Saint-Exupery) (作者), 林秀清 (译者)',
		          price: 19,
		          num:2,
		        }, {
		          bookName: '飘《随风而逝》',
		          bookDesc: '玛格丽特·米切尔',
		          price: 19,
		          num:1,
		        }],
		    }
		},
		methods: {
			//增加收货人信息
			addInfo(){
				this.dialogFormVisible = false;
			},
			//提交订单 
			addOrder(){
				this.$message("提交订单");
			}
  		},
  		computed:{
	        sumPrice(){
	            var sum = 0 ;
	            for(var i=0;i< this.tableData.length;i++){
	                sum+=this.tableData[i].price*this.tableData[i].num;
                }
	            return sum;
            }
        },
  		mounted(){
  		},
  		components: {
		}
	}

</script>

<style scoped lang="scss">
.shopping-order{
	width:90%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
    .title{
		font-size: 1.3em;
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	img{
		padding: 10px;
		float:left;
	  	width:90px;
	  	height:90px;
	}
	h2 {
		padding-bottom: 10px;
		border-bottom: 2px solid #c7161c;
	}
	.statistics{
		
	}
	.settlement{
	}
	.settlement-result{
		background-color: #eef1f6;
		height: 50px;
		line-height: 50px;
	}
}
</style>