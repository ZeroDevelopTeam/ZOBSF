<template>
	<section class="search-container">
		<el-col :span="5">
			<el-row class="filter-book" >
				<h2>图书筛选条件</h2>
				<table border="0" >
					<tr>
						<td>价格：</td>
						<td>
							<el-input v-model="lowest" style="width:50px"></el-input>
							~
							<el-input v-model="highest"  style="width:50px"></el-input>
						</td>
					</tr>
					<tr>
						<td>配送至：</td>
						<td>
							<el-select v-model="value" placeholder="请选择"  style="width:150px">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</td>
					</tr>
					<tr>
						<td>作者：</td>
						<td>
							<el-input v-model="lowest" style="width:150px"></el-input>
						</td>
					</tr>
					<tr>
						<td>出版社：</td>
						<td>
							<el-input v-model="lowest" style="width:150px"></el-input>
						</td>
					</tr>
					<tr>
						<td>出版时间：</td>
						<td>
							<el-input v-model="lowest" style="width:150px"></el-input>
						</td>
					</tr>
				</table>
			</el-row>
		</el-col>
		<el-col :span="19" class="result">
			<el-row  class="result-count">
				<el-col :span="19">
					显示： 1-12条， 共12条 "小王子"
				</el-col>
				<el-col :span="5">
					排序
				</el-col>
			</el-row>
			<el-row  class="result-book" :key="p" v-for="p in 3">
				<el-col :span="8" :key="o" v-for="o in 3">
					<a href="/bookStore/shopping"><img src="../../../image/xiaowangzi.png"/></a>
					<span>书名：小王子{{o}}</span>
					<span>作者：圣埃克苏佩里(Saint-Exupery) (作者), 林秀清 (译者)</span>
					<span>简介:《小王子》用孩子式的眼光，透视出成人的空虚、盲目和愚妄，用浅显天真的语言写出人类的孤独寂寞、没有根基随风流浪的命运，用温馨、真挚的情感表达出对真善美的讴歌。《小王子》每一行文字都充满诗意的忧郁、淡淡的哀愁，彰显出语言的魅力、思想的高度。伴随一代又一代孩子的成长，引发一代又一代成人的感悟。一个永远也不会长大的小王子，为我们演绎了一个最温馨、最真挚、最感人的故事。每一行文字都充满着诗意的忧郁、淡淡的哀愁，并且彰显出思想的高度、生活和生命的哲理</span>
					<span>价格：<font color="#C7161C">￥19</font></span>
					<span><el-button type="danger" size="small">加入购物车</el-button><el-button type="warning" size="small">收藏</el-button></span>
				</el-col>
			</el-row>
			<el-row class="page">
				<el-col :span="24">
					<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page="1"
				      :page-size="10"
				      layout="total,  prev, pager, next, jumper"
				      :total="12">
				    </el-pagination>
				</el-col>
			</el-row>
		</el-col>
	</section>
</template>

<script>
	export default {
		data() {
		    return {
		    	highest:'',
		    	lowest:'',
		    	 options: [{
			          value: 'hunan',
			          label: '湖南省'
			        }, {
			          value: 'guangdong',
			          label: '广东省'
			        }, {
			          value: 'beijing',
			          label: '北京市'
			        }, {
			          value: 'shanghai',
			          label: '上海市'
			        }],
		        value: ''
		    }
		},
		methods: {
			 handleCurrentChange(val) {
		        console.log(`当前页: ${val}`);
		      }
  		},
  		mounted(){
  		},
  		components: {
		}
	}

</script>

<style scoped lang="scss">
/*搜索*/
.search-container{
    width:90%;
    margin: auto;
    margin-top: 20px;
    .filter-book{
        margin-left: 10px;
        table{
            width:90%;
            border-collapse:   separate;
            border-spacing:  0 20px; 
        }
        h2{
            margin-bottom: 10px;
        }
    }
    .result{
        border-left: 1px solid #bfcbd9;
    }
    .result-count{
        margin-left: 30px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 30px;
    }
    .result-book{
        margin:0 0 30px 30px;
        border-bottom: 1px dashed #bfcbd9;
        span{
            margin-top: 15px;
            display:block;
            white-space:nowrap; 
            overflow:hidden;
            text-overflow:ellipsis;
        }
        img{
            margin-right: 10px;
            width:130px;
            height:165px;
            float: left;
            margin-bottom: 30px;
        }
    }
    .page{
        text-align: center;
        margin-bottom: 30px;
    }
}
</style>