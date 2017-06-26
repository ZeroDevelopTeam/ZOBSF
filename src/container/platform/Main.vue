<template>
	<section class="platform-home">
		<el-row class="hotBook">
			<el-col :xs="19" :sm="19" :md="19" :lg="19">
				<el-row class="tags">
					<el-col :span="24">
						<el-tabs v-model="activeName1" type="card" @tab-click="handleClick1">
						    <el-tab-pane label="新书上架" disabled name="index"></el-tab-pane>
						    <el-tab-pane label="文学" name="1"></el-tab-pane>
						    <el-tab-pane label="小说" name="2"></el-tab-pane>
						    <el-tab-pane label="教育" name="3"></el-tab-pane>
						    <el-tab-pane label="辅导书" name="4"></el-tab-pane>
						    <el-tab-pane label="文学" name="5"></el-tab-pane>
						    <el-tab-pane label="小说" name="6"></el-tab-pane>
						    <el-tab-pane label="教育" name="7"></el-tab-pane>
						    <el-tab-pane label="辅导书" name="8"></el-tab-pane>
						</el-tabs>
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
			</el-col>
			<el-col :xs="5" :sm="5" :md="5" :lg="5" class="right_news">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 5px;">新闻公告</span>
				  </div>
				  <div v-for="o in 7" :key="o" class="text item">
				    {{'列表内容 ' + o }}
				  </div>
				</el-card>
			</el-col>
		</el-row>
		<el-row class="newBook">
			<div class="book">
				<el-col :xs="20" :sm="20" :md="19" :lg="19">
					<el-row class="tags">
						<el-col>
							<el-tabs v-model="activeName2" type="card" @tab-click="handleClick2">
							    <el-tab-pane label="读者推荐" disabled name="index"></el-tab-pane>
							    <el-tab-pane label="文学" name="1"></el-tab-pane>
							    <el-tab-pane label="小说" name="2"></el-tab-pane>
							    <el-tab-pane label="教育" name="3"></el-tab-pane>
							    <el-tab-pane label="辅导书" name="4"></el-tab-pane>
							    <el-tab-pane label="文学" name="5"></el-tab-pane>
							    <el-tab-pane label="小说" name="6"></el-tab-pane>
							    <el-tab-pane label="教育" name="7"></el-tab-pane>
							    <el-tab-pane label="辅导书" name="8"></el-tab-pane>
							</el-tabs>
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
				</el-col>
				<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_nos">
					<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span style="line-height: 5px;">图书风云榜</span>
					  </div>
					  <div v-for="o in 7" :key="o" class="text item">
					    {{'列表内容 ' + o }}
					  </div>
					</el-card>
				</el-col>
			</div>
		</el-row>
		<el-row class="like">
			<el-col :xs="20" :sm="20" :md="19" :lg="19">
				<el-row class="like-box">
					<el-col  >
						<span class="like-title">猜您喜欢</span>
						<span class="like-next"><a href="">换一批</a></span>
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
			</el-col>
			<el-col :xs="4" :sm="4" :md="5" :lg="5" class="right_news">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 5px;">新闻公告</span>
				  </div>
				  <div v-for="o in 7" :key="o" class="text item">
				    {{'列表内容 ' + o }}
				  </div>
				</el-card>
			</el-col>
		</el-row>	
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	activeName1:'1',
		    	activeName2:'2',
		    }
		  },
		methods: {
		    handleClick1(tab, event) {
		        console.log(tab, event);
		    },
		    handleClick2(tab, event) {
		        console.log(tab, event);
		    }
  		},
  		mounted(){
  		},
  		components: {
		}
	}

</script>
