<template>
	<section class="shopping-container">
		<el-row class="shop-info">
			<el-col :span="5">
				<img src="../../../image/xiaowangzi.png"/>
			</el-col>
			<el-col :span="14">
				<span><h2>小王子(65周年纪念版)</h2></span>
				<span>圣埃克苏佩里(Saint-Exupery) (作者), 林秀清 (译者)</span>
				<span>
					<el-rate
					  v-model="rate"
					  disabled
					  text-color="#ff9900">
					  100条评论
					</el-rate>
				</span>
				<span class="price">
					<p>价格 ：</p>
					<p><font color="red" style="font-weight: bold;;font-size: 22px;">￥19.00</font>&nbsp;&nbsp;&nbsp;(8折)&nbsp;&nbsp;定价￥22.00</p>
				</span>
				<span>
					配送至：
					<el-select v-model="value" placeholder="请选择"  style="width:150px">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
					&nbsp;&nbsp;满39元免运费
				</span>
				<span>
					数量：&nbsp;&nbsp;
					<el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
					&nbsp;&nbsp;库存10000件
				</span>
				<span>
					<el-button type="danger" >加入购物车</el-button>
					<el-button type="warning">立即购买</el-button>
				</span>
			</el-col>
			<el-col :span="5">
				<img src="../../../image/xiaowangzi.png"/>
			</el-col>
		</el-row>
		<div class="line"></div>
		<!-- 详情页 -->
		<el-row class="goods-box">
			<el-col :span="4" class="goods-advice">
				<h2>同类商品推荐</h2>
			</el-col>
			<el-col :span="20" class="buy">
				<div class="buy-title">购买过该商品的人还买了</div>
			</el-col>
		</el-row>
		<el-row class="goods-box">
			<el-col :span="4" class="goods-advice">
				<el-card :key="o" v-for="o in 6">
					<div align="center">
						<a href=""><img src="../../../image/book1.png" ></a>
					</div>
			      <div>
			        <span class="price-font">￥18</span>
			        <span><a href="">小王子{{o}}（作者诞辰115周年双语珍藏版）</a></span>
			        <span>(法)圣埃克苏佩里著;罗成译.</span>
			      </div>
			    </el-card>
			</el-col>
			<el-col :span="20" class="buy">
				<el-row>
					<div>
						<el-card v-for="o in 5" :key="o" class="buy-last">
							<a href=""><img src="../../../image/book1.png" ></a>
					      <div class="buy-intro">
					        <div class="price-font">￥18</div>
					        <div><a href="">小王子{{o}}（作者诞辰115周年双语珍藏版）</a></div>
					        <div>(法)圣埃克苏佩里著;罗成译.</div>
					      </div>
					    </el-card>
					</div>
				</el-row>
				<el-row class="goods-info">
					<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
					    <el-tab-pane label="商品详情" name="info">
					    	<div>
					    		<p><h3>基本信息</h3></p>
								<p>出版社: 天津人民出版社; 第1版 (2013年1月1日)</p>
								<p>外文书名: Le Petit Prince</p>
								<p>精装: 118页</p>
								<p>读者对象: 7-10岁</p>
								<p>语种： 简体中文</p>
								<p>开本: 32</p>
								<p>ISBN: 7201077643, 9787201077642</p>
								<p>条形码: 9787201077642</p>
								<p>商品尺寸: 21 x 14.5 x 1 cm</p>
								<p>商品重量: 399 g</p>
								<p>品牌: 杭州果麦</p>
								<p>ASIN: B00ANFMU8W
								<p>用户评分: 平均4.7 星  浏览全部评论 (1,868 条商品评论)</p>
								<p>亚马逊热销商品排名: 图书商品里排第155名 (查看图书商品销售排行榜)</p>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="商品评论" name="comment">
					    	<div>
					    		<el-rate
								  v-model="rate"
								  disabled
								  text-color="#ff9900"
								  show-text>
								  100条评论
								</el-rate>
					    	</div>
					    </el-tab-pane>
					</el-tabs>
				</el-row>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	activeName:'info',
		    	num: 1,
		    	rate:'5',
		    	options: [{
			          value: 'hunan',
			          label: '湖南省'
			        }, {
			          value: 'guangdong',
			          label: '广东省'
			        }, {
			          value: 'beijing',
			          label: '北京市'
			        }, {
			          value: 'shanghai',
			          label: '上海市'
			        }],
		        value: ''
		    }
		},
		methods: {
			//计数器
			handleChange(value) {
		        console.log(value);
		   },
			handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      }
  		},
  		mounted(){
  		},
  		components: {
		}
	}

</script>

<style scoped lang="scss">
.shopping-container{
    width:90%;
    margin: auto;
    margin-top: 20px;
    .shop-info{
        margin-bottom:30px;
        img{
            margin-top: 40px;
            width: 90%;
            height: 90%;
        }
        .price{
            width: 70%;
            padding: 10px;
            font-size: 15px;
            background-color: #ebebeb;
        }
        span{
            display: block;
            margin: 20px 0 0 30px;
            
        }
    }
    .line{
        border-bottom: 2px solid #bfcbd9;
    }
    .goods-box{
        .goods-advice{
            padding:0px;
            img{
                width: 95%;
                height: 95%;
            }
            span{
                font-size: 10px;
                display: block;
                margin-bottom: 2px;
            }
            .price-font{
                color: red;
            }
        }
        .buy{
            .buy-title{
                font-size: 16px;
                text-align: center;
                margin-top: 20px;
            }
            .buy-title:before,.buy-title:after{
                margin-left: 20px;
                margin-right: 20px;
                color: #EBEBEB;
                content: "——————————————";
            }
            .buy-last{
                font-size: 10px;
                float: left;
                width: 17%;
                margin-left: 20px;
                img{
                    width: 90%;
                    height: 90%;
                }
                .buy-intro{
                    width: 100%;
                    display: block;
                    white-space:nowrap; 
                    overflow:hidden;
                    text-overflow:ellipsis;
                }
                
            }
        }
        .goods-info{
            width: 95%;
            margin: 20px auto;
        }
    }
}
.price-font{
    color: red;
}
</style>