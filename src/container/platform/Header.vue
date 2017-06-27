<template>
	<header class="platform-header">
		<el-row>
			<el-col :xs="4" :sm="4" :md="5" :lg="5" class="logo"></el-col>
  			<el-col :xs="14" :sm="14" :md="14" :lg="14">
  				<div class="search">
	  				<el-input
						placeholder="请选择书籍"
						icon="search"
						v-model="search.search"
						:on-icon-click="searchBook">
						<template slot="prepend">
							<el-select v-model="search.value" style="width: 110px;">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</template>
						<template slot="append">
							<el-button  icon="search" @click="searchBook">搜索</el-button>
						</template>
					</el-input>
				</div>
  			</el-col>
  			<el-col :xs="6" :sm="6" :md="5" :lg="5" class="login">
  				<span><a href="">登入</a></span>
  				<span>|</span>
  				<span><a href="">注册</a></span>
  			</el-col>
		</el-row>
	</header>
</template>

<script>
	export default {
		data() {
		    return {
		    	activeIndex:'homePlatform',
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
		    searchBook(){
		   		this.$router.push({ path: '/bookStore/search'});
		    }
  		},
  		mounted () {
  			
  		}
		
	}

</script>

