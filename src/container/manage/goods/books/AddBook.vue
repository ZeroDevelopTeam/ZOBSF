<template>
	<el-card class="addBook-card">
		<div slot="header" class="clearfix">
		    <strong style="line-height: 5px;">新增图书</strong>
		</div>
		<el-form :model="addBookForm" label-width="100px" :rules="formRules" ref="addBookForm">
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="图书编号：" prop="bookId">
						<el-input v-model="addBookForm.bookId" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="图书名称：" prop="bookName">
						<el-input v-model="addBookForm.bookName" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="作者：" prop="author">
						<el-input v-model="addBookForm.author" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="价格：" prop="price">
						<el-input v-model="addBookForm.price" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="折扣：" prop="discount">
						<el-input v-model="addBookForm.discount" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="出版社：" prop="press">
						<el-input v-model="addBookForm.press" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="出版时间：" prop="publishTime">
						<el-date-picker type="date" placeholder="选择日期" v-model="addBookForm.publishTime"></el-date-picker>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="版次：" prop="edition">
						<el-input v-model="addBookForm.edition" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="页数：" prop="pageNum">
						<el-input v-model="addBookForm.pageNum" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="字数：" prop="wordNum">
						<el-input v-model="addBookForm.wordNum" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="印刷时间：" prop="printTime">
						<el-date-picker type="date" placeholder="选择日期" v-model="addBookForm.printTime"></el-date-picker>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="开本：" prop="bookSize">
						<el-input v-model="addBookForm.bookSize" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="纸质：" prop="paper">
						<el-input v-model="addBookForm.paper" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="大图路径：" prop="image_l">
						<el-input v-model="addBookForm.image_l" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="小图路径：" prop="image_s">
						<el-input v-model="addBookForm.image_s" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="排序：" prop="orderBy">
						<el-input v-model="addBookForm.orderBy" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
				 	<el-form-item label="仓库位置：" prop="storeHose">
						<el-input v-model="addBookForm.storeHose" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="库存量：" prop="storeNum">
						<el-input v-model="addBookForm.storeNum" auto-complete="off"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
			<el-row>
				 <el-col :span="12">
					<el-form-item label="状态：">
						<el-select  placeholder="请选择状态" v-model="addBookForm.state">
					      <el-option label="下架" value=0></el-option>
					      <el-option label="上架" value=1></el-option>
					    </el-select>
					</el-form-item>
				 </el-col>
				 <el-col :span="12">
				 	<el-form-item label="图书简介：" prop="bookDesc">
						<el-input type="textarea" v-model="addBookForm.bookDesc"></el-input>
					</el-form-item>
				 </el-col>
			</el-row>
		</el-form>
		<div style="text-align: center;">
			<el-button type="primary" @click.native="reset">重置</el-button>
			<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
		</div>
	</el-card>
</template>

<script>
import util from '../../../../util/util'
export default {
	data() {
		return {
			addBookForm: {
				bookId: '',
				bookName: '',
				author: '',
				price: '',
				discount: '',
				press: '',
				publishTime: '',
				edition: '',
				pageNum: '',
				wordNum: '',
				printTime: '',
				bookSize: '',
				paper: '',
				image_l: '',
				image_s: '',
				orderBy: '',
				storeHose: '',
				storeNum: '',
				state: '',
				bookDesc: ''
			},
			addLoading: false,
			formRules: {
				bookId: [
					{ required: true, message: '必填项', trigger: 'blur' }
				],
				bookName: [
					{ required: true, message: '请输入图书名称', trigger: 'blur' }
				],
				price: [
					{ required: true, message: '请输入价格', trigger: 'blur' }
				],
				state: [
					{ type: 'number', required: true, message: '请选择状态', trigger: 'blur' }
				],
				storeHose: [
					{ required: true, message: '请选输入仓库位置', trigger: 'blur' }
				]
			},
		}
	},
	methods: {
		addSubmit() {
			this.$refs.addBookForm.validate((valid) => {
				if (valid) {
					this.addLoading = true;
					let typeId=this.$route.query.typeId;
					let para = Object.assign({}, {typeId: typeId}, this.addBookForm);
					para.publishTime = (!para.publishTime || para.publishTime == '') ? '' : util.formatDate.format(new Date(para.publishTime), 'yyyy-MM-dd');
					para.printTime = (!para.printTime || para.printTime == '') ? '' : util.formatDate.format(new Date(para.printTime), 'yyyy-MM-dd');
					this.$store.dispatch('addBook',para).then((res) => {
						this.addLoading = false;
						if(res.status==200){
							this.$message({
								message: res.msg,
								type: 'success'
							});
							this.$refs['addBookForm'].resetFields();
							this.$router.push({ path: '/goods/book' });
						}else{
							this.$message({
								message: res.msg,
								type: 'error'
							});
						}
				    });
				}
			});
		},
		//重置
		reset() {
			this.$refs.addBookForm.resetFields();
		}
	}
}
	
</script>
<style scoped lang="scss">
.addBook-card {
	width:65%;
    margin: 1em auto;
	.clearfix:before,
  	.clearfix:after {
        display: table;
        content: "";
  	}
	.clearfix:after {
	    clear: both
	}
	.el-row {
		margin-top: 10px;
	}
}
</style>
