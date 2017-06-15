<template>
	<section>
		<div class="header">
		<el-row class="logo">
				<el-col :span="5" ><img src="../../image/logo.png"/></el-col>
	  			<el-col :span="19">
	  				<div class="search">
		  				<el-input
							placeholder="请选择书籍"
							icon="search"
							v-model="search.search"
							:on-icon-click="handleIconClick">
							<template slot="prepend">
								<el-select v-model="search.value"  style="width: 110px;">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
							</template>
							<template slot="append">
								<el-button type="danger" icon="search">搜索</el-button>
							</template>
						</el-input>
					</div>
	  			</el-col>
			</el-row>
			
			<el-row class="nav">
				<el-col :span="5">
					<div class="type">图书分类</div>
				</el-col>
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
				<el-row class="zhezhao">
					<el-col :span="5" class="nav-left">
						<ul>
							<li>
								<a href="" v-on:mouseenter="flag = 'nav-middle-show'" v-on:mouseleave="flag = 'nav-middle'">中国文学</a>
							</li>
							<li>
								<a href="" v-on:mouseenter="flag = 'nav-middle-show'" v-on:mouseleave="flag = 'nav-middle'">外国文学</a>
							</li>
							<li>
								<a href="" v-on:mouseenter="flag = 'nav-middle-show'" v-on:mouseleave="flag = 'nav-middle'">历史文献</a>
							</li>
						</ul>
					</el-col>
					<el-col :span="15" :class="flag" ref="middle">
						<ul>
							<li>
								<a href="">中国文学</a>
							</li>
							<li>
								<a href="">外国文学</a>
							</li>
							<li>
								<a href="">历史文献</a>
							</li>
						</ul>
					</el-col>
					<el-col :span="4" class="nav-right">
						<el-row>
							<a href=""><img src="../../image/newBook.png"/></a>
						</el-row>
						<el-row>
							<a href=""><img src="../../image/newBook.png"/></a>
						</el-row>
						<el-row>
							<a href=""><img src="../../image/newBook.png"/></a>
						</el-row>
					</el-col>
				</el-row>
	  			<el-col :span="24">
	  				<el-row class="pic">
	  					<el-col :span="24">
						    <el-carousel height="450px">
						      <el-carousel-item >
								<img src="../../image/3.jpg"/>
						      </el-carousel-item>
						      <el-carousel-item >
								<img src="../../image/2.jpg"/>
						      </el-carousel-item>
						      <el-carousel-item >
								<img src="../../image/1.jpg"/>
						      </el-carousel-item>
						    </el-carousel>
	  					</el-col>
	  				</el-row>
	  			</el-col>
			</el-row>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	flag:'nav-middle',
		    	options: [{
		          value: '001',
		          label: '全部分类'
		          
		        }, {
		          value: '002',
		          label: '中国文学'
		        }, {
		          value: '003',
		          label: '外国文学'
		        },
		    	{
		          value: '003',
		          label: '历史文献'
		        }],
		        search:{
		        	search:'',
		        	value: '001'
		        }
		    }
		  },
		methods: {
  		},
  		mounted () {
	   　　 console.log(this.$refs.middle)
	  　　}
		
	}

</script>

<style scoped lang="scss">
.header{
	margin: 15px auto;
	position: relative;
	.logo{
		width: 80%;
		margin:auto ;
		height:96px;
		.search{
			margin-top: 15px;
			padding-left:70px;
			width:70%;
			.el-input__inner{
				width: 110px;
			}
		}
		img{
			margin-left: 30px;
		}
	}
	.nav{
		width: 80%;
		margin: auto;
		border-bottom: 3px solid #c7161c;
		line-height: 40px;
		.type{
			background-color: #c7161c;
			height: 40px;
			text-align:center;
			color: white;
		    font-size: 15px;
		    letter-spacing:3px;
		}
		.menu{
			.el-menu{
				background-color: white;
				padding-left:50px;
				height: 40px;
			}
			.el-menu-item{
				height: 40px;
				line-height: 40px;
			}
			.el-menu--horizontal>.el-menu-item:hover, .el-menu--horizontal>.el-submenu.is-active .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
			    border-bottom: 3px solid #c7161c;
			    color: #c7161c;
			    background-color: white;
			}
		}
		.nav-type{
			width: 30px;
		}
	}	
	.picScroll{
		width: 100%;
		height: 450px;
		margin-bottom: 50px;
		.zhezhao{
			margin-left: 10% !important;
			width: 80% !important;
			height: 450px !important;
			position: absolute;
			z-index: 999;
			.nav-left{
				filter:alpha(Opacity=90);-moz-opacity:0.9;opacity: 0.9;
				background-color: #000000 !important;
				height: 450px !important;
				ul{
					text-align: center;
					letter-spacing:3px;
					padding-left: 0 !important;
				}
				ul li{
					
					list-style: none;
					padding:20px 0 ;
					padding-top: 20px;
					border-bottom: dashed 1px white;
					-webkit-transition: background 0.8s linear;/*Safari or Chrome*/
					-moz-transition: background 0.8s linear;/*Firefox*/
					-ms-transition: background 0.8s linear;/*IE9*/
					-o-transition: background 0.8s linear;/*Opera*/
					transition: background 0.8s linear;/*默认w3c*/
					
				}
				ul li:hover{
					color: black;
					background-color: white;
				}
				
				ul li a{
					color: white;
					font-size: 15px;
					text-decoration: none;
				}
				ul li a:hover{
					
					color: black;
					font-size: 15px;
					text-decoration: none;
				}
			}
			.nav-middle{
				background: white;
				filter:alpha(Opacity=0);-moz-opacity:0;opacity: 0;
			}
			.nav-middle-show{
				height: 450px !important;
				background: white;
				filter:alpha(Opacity=90);-moz-opacity:0.9;opacity: 0.9;
			}
			.nav-right{
				height: 450px !important;
				img{
					height: 150px;
				}
				img:hover{
					-webkit-transform:translateX(2px);/*Safari or Chrome*/
					-moz-transform:  translateX(2px);/*Firefox*/
					-ms-transform:  translate(2px);/*IE9*/
					-o-transform:  translateX(2px);/*Opera*/
					transform:  translateX(2px);/*默认w3c*/
				}
			}
			
		}
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
}

</style>