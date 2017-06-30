<template>
	<section class="shopping-cat">
		<h1 ><strong class="title">{{$route.name}}</strong></h1>
		<el-table
		    ref="multipleTable"
		    :data="tableData"
		    tooltip-effect="dark"
		    style="width: 90%;margin-bottom: 30px;"
		    @selection-change="handleSelectionChange"
		    class="cart-goods">
		    <el-table-column
		      	type="selection"
		      	width="55">
		    </el-table-column>
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
		      	<template scope="scope">
			      	<el-input-number size="small" v-model="scope.row.num" :min="1" :max="10"></el-input-number>
		      	</template>
		      	
		    </el-table-column>
		    <el-table-column
		    	prop="totalPrice"
		      	label="总价"
		      	width="80">
		      	<template scope="scope">
		      		{{ scope.row.price*scope.row.num }}
		      	</template>
		    </el-table-column>
		    <el-table-column label="操作" width="80">
		      	<template scope="scope">
		        	<el-button
		          		size="small"
		          		type="danger"
		          		@click="handleDelete(scope.$index, scope.row)">删除</el-button>
		      	</template>
		    </el-table-column>
		</el-table>
		<el-row class="settlement">
			<el-col :span="5">
				<a @click="batchDel"  style="cursor:pointer;padding-left: 20px;"> 批量删除 </a>
			</el-col>
			<el-col :span="5">
				已选择<span style="color: red;">{{this.multipleSelection.length}}</span>件商品
			</el-col>
			<el-col :span="14">
				<span  style="float: right;margin-right: 30px;">
					总计（不含运费）：<span style="color: red;">${{sumPrice}}</span>
					<el-button style="margin-left: 20px;width: 100px;" size="small" type="danger" @click="handleSettlement">结算</el-button>
				</span>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
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
		        multipleSelection: []
		    }
		},
		methods: {
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    handleDelete(index,row){
		    	this.tableData.splice(this.tableData.indexOf(row), 1);
		    },
		    handleSettlement(){
		    	this.$router.push({ path: '/platform/shoppingOrder' });
		    },
		    batchDel(){
		    	for(var i=0;i< this.multipleSelection.length;i++){
		    		this.tableData.splice(this.tableData.indexOf(this.multipleSelection[i]), 1);
                }
		    },
  		},
  		computed:{
	        sumPrice(){
	            var sum = 0 ;
	            for(var i=0;i< this.multipleSelection.length;i++){
	                sum+=this.multipleSelection[i].price*this.multipleSelection[i].num;
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
.shopping-cat{
	width:90%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 30px;
    .title{
		font-size: 1.3em;
		padding:0 10px 0 30px;
		border-right: 3px solid #c7161c;
	}
	.cart-goods{
		margin-top: 30px;
		margin-left: 30px;
	}
	img{
		padding: 10px;
		float:left;
      	width:90px;
      	height:90px;
	}
	.settlement{
		background-color: #eef1f6;
		height: 40px;
		line-height: 40px;
	}
}
</style>