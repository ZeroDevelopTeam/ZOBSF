<template>
	<el-dialog title="新增回收图书" :visible="isVisible" :before-close="closeDialog" :close-on-click-modal="false">
		<el-card class="recl-addBook-card">
			<el-form :model="addReclBookForm" label-width="100px" :rules="formRules" ref="addReclBookForm">
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="图书编号：" prop="bookId">
							<el-input v-model="addReclBookForm.bookId" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="图书名称：" prop="bookName">
							<el-input v-model="addReclBookForm.bookName" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="作者：" prop="author">
							<el-input v-model="addReclBookForm.author" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="价格：" prop="price">
							<el-input v-model="addReclBookForm.price" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="折扣：" prop="discount">
							<el-input v-model="addReclBookForm.discount" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="出版社：" prop="press">
							<el-input v-model="addReclBookForm.press" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="出版时间：" prop="publishTime">
							<el-date-picker type="datetime" placeholder="选择日期" v-model="addReclBookForm.publishTime"></el-date-picker>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="版次：" prop="edition">
							<el-input v-model="addReclBookForm.edition" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="页数：" prop="pageNum">
							<el-input v-model="addReclBookForm.pageNum" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="字数：" prop="wordNum">
							<el-input v-model="addReclBookForm.wordNum" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="印刷时间：" prop="printTime">
							<el-date-picker type="datetime" placeholder="选择日期" v-model="addReclBookForm.printTime"></el-date-picker>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="开本：" prop="bookSize">
							<el-input v-model="addReclBookForm.bookSize" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="纸质：" prop="paper">
							<el-input v-model="addReclBookForm.paper" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="大图路径：" prop="image_l">
							<el-input v-model="addReclBookForm.image_l" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="小图路径：" prop="image_s">
							<el-input v-model="addReclBookForm.image_s" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="排序：" prop="orderBy">
							<el-input v-model="addReclBookForm.orderBy" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
					 	<el-form-item label="仓库位置：" prop="storeHouse">
							<el-input v-model="addReclBookForm.storeHouse" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="库存量：" prop="bookNum">
							<el-input v-model="addReclBookForm.bookNum" auto-complete="off"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
				<el-row>
					 <el-col :span="12">
						<el-form-item label="状态：">
							<el-select  placeholder="请选择状态" v-model="addReclBookForm.state">
						      <el-option label="下架" value=0></el-option>
						      <el-option label="上架" value=1></el-option>
						    </el-select>
						</el-form-item>
					 </el-col>
					 <el-col :span="12">
					 	<el-form-item label="图书简介：" prop="bookDesc">
							<el-input type="textarea" v-model="addReclBookForm.bookDesc"></el-input>
						</el-form-item>
					 </el-col>
				</el-row>
			</el-form>
			<div style="text-align: center;">
				<el-button type="primary" @click.native="closeDialog">返回</el-button>
				<el-button type="primary" @click.native="addSubmit">保存</el-button>
			</div>
		</el-card>
	</el-dialog> 
</template>

<script>
import util from '../../../../util/util'
export default {
	props: [
		'isVisible'
	],
	data() {
		return {
			addReclBookForm: {
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
				storeHouse: '',
				bookNum: '',
				state: '',
				bookDesc: ''
			},
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
					{type: 'number', required: true, message: '请选择状态', trigger: 'blur' }
				],
				storeHouse: [
					{ required: true, message: '请选输入仓库位置', trigger: 'blur' }
				]
			},
		}
	},
	methods: {
		addSubmit() {
			this.$refs.addReclBookForm.validate((valid) => {
				if (valid) {
					let para = Object.assign({}, this.addReclBookForm);
					para.publishTime = (!para.publishTime || para.publishTime == '') ? '' : util.formatDate.format(new Date(para.publishTime), 'yyyy-MM-dd hh:mm:ss');
					para.printTime = (!para.printTime || para.printTime == '') ? '' : util.formatDate.format(new Date(para.printTime), 'yyyy-MM-dd hh:mm:ss');
					this.$message({
						message: '保存成功！',
						type: 'success'
					});
					this.$emit("saveB",para)
					this.closeDialog();
				}
			});
		},
		//关闭窗口
		closeDialog() {
			this.$refs['addReclBookForm'].resetFields();
			this.$emit('close');
		}
	}
}
	
</script>
<style scoped lang="scss">
.recl-addBook-card {
	width:65%;
    margin: auto;
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
