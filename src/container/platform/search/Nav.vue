<template>
	<section class="nav-control">
		<el-row class="nav">
			<el-col :span="5">
				<div class="type" @mouseover="control = true" @mouseleave="control = false">图书分类</div>
			</el-col>
  			<el-col :span="13">
  				<div class="menu">
  					<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
					  <el-menu-item index="main"><b>首页</b></el-menu-item>
					  <el-menu-item index="hotBook"><b>热门书籍</b></el-menu-item>
					  <el-menu-item index="cheapBook"><b>特价书籍</b></el-menu-item>
					  <el-menu-item index="onlineRetrieve"><b>在线回收</b></el-menu-item>
					</el-menu>
  				</div>
  			</el-col>
  			<el-col :span="6">
  				<el-button type="danger">购物车(0)</el-button>
  				<el-button>我的订单</el-button>
  			</el-col>
		</el-row>
		<el-row class="picScroll" >
			<el-row class="zhezhao" v-show="control">
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
			</el-row>
			<Main/>
		</el-row>
	</section>
</template>

<script>
import Main from './Main';
	export default {
		data() {
		    return {
		    	control:false,
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
  			
  		},
  		components: {
			Main,
		}
	}

</script>

<style scoped lang="scss">
</style>