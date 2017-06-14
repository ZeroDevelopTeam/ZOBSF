<template>
	<section class="home">
		<Header/>
		<section class="container">
			<el-row class="logo">
				<el-col :span="5" ><img src="../../image/logo.png"/></el-col>
	  			<el-col :span="19">
	  				<div class="search">
		  				<el-input
							placeholder="请选择书籍"
							icon="search"
							v-model="search"
							:on-icon-click="handleIconClick">
						</el-input>
					</div>
	  			</el-col>
			</el-row>
			<el-row class="nav">
				<el-col :span="5"><div class="type">图书分类</div></el-col>
	  			<el-col :span="13">
	  				<div class="menu">
	  					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						  <el-menu-item index="1"><b>热门书籍</b></el-menu-item>
						  <el-menu-item index="1"><b>特价书籍</b></el-menu-item>
						  <el-menu-item index="1"><b>在线回收</b></el-menu-item>
						</el-menu>
	  				</div>
	  			</el-col>
	  			<el-col :span="6">
	  				<el-button type="danger">购物车(0)</el-button>
	  				<el-button>我的订单</el-button>
	  			</el-col>
			</el-row>
			<el-row class="picScroll">
				<el-col :span="5">
					<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				      <el-submenu index="1">
				        <template slot="title">分类一</template>
				          <el-menu-item index="1-1">选项1</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				        <el-submenu index="1-4">
				          <template slot="title">选项4</template>
				          <el-menu-item index="1-4-1">选项1</el-menu-item>
				        </el-submenu>
				      </el-submenu>
				      <el-menu-item index="2">分类二</el-menu-item>
				      <el-menu-item index="3">分类三</el-menu-item>
				    </el-menu>
				</el-col>
	  			<el-col :span="14">
	  				<el-row class="pic">
	  					<el-col :span="24">
						    <el-carousel height="350px">
						      <el-carousel-item >
								<img src="../../image/1.png"/>
						      </el-carousel-item>
						      <el-carousel-item >
								<img src="../../image/2.png"/>
						      </el-carousel-item>
						      <el-carousel-item >
								<img src="../../image/3.png"/>
						      </el-carousel-item>
						    </el-carousel>
	  					</el-col>
	  				</el-row>
	  			</el-col>
	  			<el-col :span="5" class="right_news">
	  				<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span style="line-height: 36px;">新闻公告</span>
					  </div>
					  <div v-for="o in 5" :key="o" class="text item">
					    {{'列表内容 ' + o }}
					  </div>
					</el-card>
	  			</el-col>
			</el-row>
			<el-row>
				<el-col :span="19">
					<el-row class="hotBook">
						<el-row class="title">
							<el-col :span="24" >
								<h2>畅销书籍</h2>
								<span></span>
							</el-col>
						</el-row>
						<el-row class="books" :gutter="20">
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
						</el-row>
					</el-row>
					<el-row class="newBook">
						<el-row class="title">
							<el-col :span="24" >
								<h2>最新书籍</h2>
								<span></span>
							</el-col>
						</el-row>
						<el-row class="books" :gutter="20">
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
						</el-row>
					</el-row>
					<el-row class="discountBook">
						<el-row class="title">
							<el-col :span="24" >
								<h2>折扣书籍</h2>
								<span></span>
							</el-col>
						</el-row>
						<el-row class="books" :gutter="20">
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
							<el-col :span="6" >
								<img src="../../image/hot1.png" />
							</el-col>
						</el-row>
					</el-row>
				</el-col>
				<el-col :span="5" class="right_top">
					<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span style="line-height: 36px;">图书风云榜</span>
					  </div>
					  <div v-for="o in 10" :key="o" class="text item">
					    {{'列表内容 ' + o }}
					  </div>
					</el-card>
					<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span style="line-height: 36px;">猜您喜欢</span>
					  </div>
					  <div v-for="o in 10" :key="o" class="text item">
					    {{'列表内容 ' + o }}
					  </div>
					</el-card>
				</el-col>
			</el-row>
		</section>
		<Footer/>
	</section>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
	export default {
		data() {
		    return {
		        search: '',
		        pics:[
		        	'../../image/1.png',
			        '../../image/2.png',
			        '../../image/3.png',
			        '../../image/4.png',
			        '../../image/5.png'
			        ]
		    }
		  },
		methods: {
		    handleIconClick(ev) {
		        console.log(ev);
		    }
  		},
  		components: {
			Header,
			Footer
		}
	}

</script>

<style scoped lang="scss">
.container{
	width:80%;
	margin: auto;
	position: relative;
	.head{
		height: 40px;
		line-height: 40px;
	    font-size: 16px;
	    background-color: #eee;
	}
	.logo{
		margin-left: 25px;
		height:110px;
		.search{
			margin: 15px 0 0 75px;
			width:70%;
		}
	}
	.nav{
		border-bottom: 5px solid #c7161c;
		height: 65px;
		line-height: 65px;
		.type{
			background-color: #c7161c;
			text-align:center;
			color: white;
		    font-size: 18px;
		    letter-spacing:5px;
		}
		.menu{
			.el-menu{
				background-color: white;
				padding-left:50px;
			}
			.el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
			    border-bottom: 5px solid white;
			    color: #c7161c;
			    background-color: white;
			}
		}
	}
	.picScroll{
		height: 350px;
		margin-bottom: 50px;
		.pic{
			img{
				width: 100%;
				height: 100%;
			}
		}
		.types img{
			height:200px;
		}
	}
	.hotBook , .discountBook{
		margin: auto;
		text-align: center;
		letter-spacing:2px;
		margin-bottom: 50px;
		.title span{
		    display: inline-block;
		    width: 400px;
		    border-top: 1px dashed #c7161c;
		    border-bottom: 1px solid #c7161c;
		    height: 12px;
		    margin-left: auto;
		    margin-right: auto;
		    margin-bottom: 30px;
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
	.newBook{
		margin: auto;
		text-align: center;
		letter-spacing:2px;
		margin-bottom: 50px;
		background-color: #f1f1f1;
		.title span{
		    display: inline-block;
		    width: 400px;
		    border-top: 1px dashed #c7161c;
		    border-bottom: 1px solid #c7161c;
		    height: 12px;
		    margin-left: auto;
		    margin-right: auto;
		    margin-bottom: 30px;
		}
		img{
			width: 100%;
			height: 100%;
			margin-bottom: 50px;
		}
	}
	.right_top{
		.text {
		    font-size: 14px;
		  }
		
		  .item {
		    padding: 18px 0;
		  }
		
		  .clearfix:before,
		  .clearfix:after {
		      display: table;
		      content: "";
		  }
		  .clearfix:after {
		      clear: both
		  }
		  .box-card {
		    width: 85%;
		    margin-left: 40px;
		    margin-bottom: 30px;
	    }

	}
	.right_news,.right_news{
		.text {
		    font-size: 14px;
		  }
		
		  .item {
		    padding: 15px 0;
		  }
		
		  .clearfix:before,
		  .clearfix:after {
		      display: table;
		      content: "";
		  }
		  .clearfix:after {
		      clear: both
		  }
		  .box-card {
	    }

	}
	.footer{
		background-color: #eee;
		text-align: center;
	}
}
</style>