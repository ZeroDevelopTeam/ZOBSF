<template>
	<section class="platform-nav">
		<el-row class="nav">
			<el-col :xs="5" :sm="5" :md="5" :lg="5">
				<div class="type">图书分类</div>
			</el-col>
  			<el-col :xs="13" :sm="13" :md="13" :lg="13">
  				<div class="menu">
  					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="main"><b>首页</b></el-menu-item>
					  <el-menu-item index="hotBook"><b>热门书籍</b></el-menu-item>
					  <el-menu-item index="cheapBook"><b>特价书籍</b></el-menu-item>
					  <el-menu-item index="onlineRetrieve"><b>在线回收</b></el-menu-item>
					</el-menu>
  				</div>
  			</el-col>
  			<el-col :xs="6" :sm="6" :md="6" :lg="6">
  				<el-button type="danger">购物车(0)</el-button>
  				<el-button>我的订单</el-button>
  			</el-col>
		</el-row>
		<el-row class="picScroll">
			<el-row class="zhezhao">
				<el-col :xs="5" :sm="5" :md="5" :lg="5" class="nav-left">
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
				<el-col :xs="14" :sm="14" :md="14" :lg="14" :class="flag" ref="middle">
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
				<el-col :xs="5" :sm="5" :md="5" :lg="5" class="nav-right">
					<a href=""><img src="../../image/newBook.png"/></a>
					<a href=""><img src="../../image/newBook.png"/></a>
					<a href=""><img src="../../image/newBook.png"/></a>
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
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	activeIndex:this.$route.path.substring(1,this.$route.path.length),
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
			handleIconClick(){
				
			},
			handleSelect(key, keyPath) {
		        this.$router.push({ path: '/platform/'+key });
		    }
  		},
  		mounted () {
  			console.log();
	  　　}
		
	}

</script>
