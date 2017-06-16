<template>
	<section class="home">
		<Header/>
		<section class="container">
			<el-row class="hotBook">
				<el-col :span="19">
					<el-row class="title">
						<el-col  >
							<h2>猜您喜欢</h2>
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
				</el-col>
				<el-col :span="5" class="right_news">
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
				<el-col :span="19">
					<el-row class="title">
						<el-col :span="24" >
							<h2>图书风云榜</h2>
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
				</el-col>
				<el-col :span="5" class="right_nos">
					<el-card class="box-card">
					  <div slot="header" class="clearfix">
					    <span style="line-height: 5px;">未知广告</span>
					  </div>
					  <div v-for="o in 7" :key="o" class="text item">
					    {{'列表内容 ' + o }}
					  </div>
					</el-card>
				</el-col>
			</div>
			</el-row>
			<el-row class="hotBook">
				<el-col :span="19">
					<el-row class="title">
						<el-col  >
							<h2>占个位置</h2>
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
				</el-col>
				<el-col :span="5" class="right_news">
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
		</el-row>
		<Footer/>
		</section>
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
  		mounted(){
  		},
  		components: {
			Header,
			Footer
		}
	}

</script>

<style scoped lang="scss">
.container{
	margin: auto;

	.hotBook , .discountBook{
		width:80%;
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
		.book{
			margin: auto;
			width: 80%;
		}
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
	.right_nos{
		margin-top: 35px;
		.text {
		    font-size: 14px;
		  }
		
		  .item {
		    padding: 8px 0;
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
	.right_news{
		margin-top: 15px;
		.text {
		    font-size: 14px;
		  }
		
		  .item {
		    padding: 8px 0;
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
	.footer{
		background-color: #eee;
		text-align: center;
	}
}
</style>