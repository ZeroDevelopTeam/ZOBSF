<template>
	<el-row class="footer">
		<el-col :span="24">
			<p class="lianjie">
				<a href="">网站协议</a><span>|</span><a href="">咨询反馈</a><span>|</span><a href="">联系我们</a><span>|</span><a href="">关于我们</a>
			</p>
			<p>
				Copyright © 2016 易公司（eGongSi.cn） All Rights Reserved. 
			</p>
			<p>
				京ICP备15060737号
			</p>
		</el-col>
	</el-row>
</template>

<script>
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
  		}
	}

</script>

<style scoped lang="scss">
.home{
	margin: auto;
	position: relative;
	.footer{
		background-color: #eee;
		text-align: center;
		.lianjie span{
			margin-right: 25px;
			margin-left:25px;
		}
	}
}
</style>