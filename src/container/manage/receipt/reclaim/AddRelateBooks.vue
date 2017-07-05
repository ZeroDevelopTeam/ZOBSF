<template>
	<div>
	<el-dialog title="回收图书列表" :visible="arbVisible" :before-close="closeDialog" :close-on-click-modal="false">
		<div class="arb-header">
			<el-button type="primary" @click.native="addRetrieveBook" v-if="retrieveType==1">新增</el-button>
			<el-button type="primary" :disabled="this.sels.length===0" @click.native="removeColumn">删除</el-button>
		</div>
		<el-table :data="tempTableData" style="width: 100%" @selection-change="rowSelect">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column prop="bookId" label="图书编号" width="90">
		    </el-table-column>
		    <el-table-column prop="bookName" label="图书名称" width="190"></el-table-column>
		    <el-table-column prop="bookNum" label="回收数量">
		    	<template scope="scope">
		    		<el-input-number v-model="scope.row.bookNum" :min="1"></el-input-number>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="price"label="回收价格">
		    	<template scope="scope">
		    		<el-input-number v-model="scope.row.price" :min="0" :step=0.1></el-input-number>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="storeHouse"label="仓库位置" show-overflow-tooltip>
		    	<span v-text="tempTableData.storeHouse"></span>
		    </el-table-column>
	    </el-table>
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="tempTableData.length"
	      style="float:right;">
	    </el-pagination>
	    <div slot="footer" class="arb-footer">
			<el-button type="primary" @click.native="closeDialog">取消</el-button>
			<el-button type="primary" @click.native="saveSubmit">保存</el-button>
		</div>
	</el-dialog> 
	<AddReclaimBook :isVisible="addReclBookVisible" @close="closeAReclB" @saveB="handleZDBook"></AddReclaimBook>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddReclaimBook from './AddReclaimBook'
export default{
	components:{
		AddReclaimBook
	},
	props: [
		'arbVisible',
		'retrieveType',
		'orderId',
		'arbs'
	],
	data() {
		return{
			sels: [],//列表选中列
			currentPage: 1,//当前页
			pageSize:10,//每页大小
			addReclBookVisible: false,
			tempTableData: [],
		}
	},
	computed: {
		...mapGetters([
			'getAddRetrieveBooks',
   		])
	},
	watch: {
		arbs() {
			this.tempTableData = this.arbs;
		}
	},
	methods: {
		//勾选复选框
		rowSelect(value) {
			this.sels = value;
		},
		addRetrieveBook() {
			this.addReclBookVisible = true;
		},
		//主动回收添加图书
		handleZDBook(value){
			this.tempTableData.push(value);
		},
		//保存列表
		saveSubmit() {
			this.$store.dispatch('create_retrieve_book',this.tempTableData);
			this.tempTableData = [];
			this.$emit("close");
		},
		//改变每页数量
		handleSizeChange(val) {
			
	    },
	    //切换页码
	    handleCurrentChange(val) {
	    	
		},
		//选择名称
		handleSelectName(obj) {
			let rowIndex = obj.$index;
			let rowData = obj.row;
			console.log(rowIndex,rowData.bookName)
		},
		//移除行
		removeColumn() {
			for(let i=0; i<this.sels.length; i++){
				for(let j=0; j<this.tempTableData.length; j++){
					if(this.sels[i].bookId == this.tempTableData[j].bookId){
						this.tempTableData.splice(j,1);
						break;
					}
				}
			}
		},
		//触发调用父组件关闭窗口方法
		closeDialog() {
			this.tempTableData = [];
			this.$emit("close");
		},
		//关闭子窗口
		closeAReclB(){
			this.addReclBookVisible = false;
		}
	}
}
</script>

<style scoped lang="scss">
	.el-dialog--small{
	    width: 72% !important;
	}
	.arb-header {
		margin-bottom: 0.5em;
	}
	.arb-footer{
		text-align: center;
	}
</style>