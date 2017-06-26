<template>
	<section class="cheap-book-main">
		<el-row class="hotBook">
			<el-col :span="19">
				<el-row class="tags">
					<el-col>
						<el-tabs v-model="hotBook" type="card" @tab-click="handleClick">
						    <el-tab-pane label="特价书籍" disabled name="index"></el-tab-pane>
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
						<img src="../../../image/hot1.png" />
					</el-col>
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
				</el-row>
				<el-row class="books" :gutter="20">
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
					<el-col :span="6" >
						<img src="../../../image/hot1.png" />
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="5" class="right_news">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 5px;">特价书籍</span>
				  </div>
				  <div v-for="o in 10" :key="o" class="text item">
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
		        search: '',
		        hotBook:'1',
		    }
		  },
		methods: {
		    handleClick(tab, event) {
		        console.log(tab, event);
		    }
  		},
  		mounted(){
  		},
  		components: {
		}
	}

</script>

<style  lang="scss">
</style>