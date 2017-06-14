<template>
	<el-row class="footer">
		<el-col :span="24">
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
	}
}
</style>