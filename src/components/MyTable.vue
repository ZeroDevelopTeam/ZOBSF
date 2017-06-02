<template>
    <div class="myTable">
	  	<el-table
		    :data="dataList.list"
		    style="width: 100%;"
		    highlight-current-row
		    v-loading="listLoading"
		    @selection-change="config.rowOptions">
		    <el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" width="60">序号</el-table-column>
		    <template  v-for="column in config.columns">
		    	<el-table-column v-if="column.operations" :prop="column.prop" :label="column.label" :width="column.width" sortable>
		            <template scope="scope">
		              	<el-button v-for="operate in column.operations" :key="operate.key" size="small" type="danger" 
		                	@click="operate.func(scope.$index, scope.row,scope)">{{operate.label}}</el-button>
	            	</template>
		        </el-table-column>
		     	<el-table-column v-else :prop="column.prop" :label="column.label" :width="column.width" :formatter="column.formatter" sortable></el-table-column>
			</template>
	  	</el-table>
	  	<el-col :span="24" class="toolbar">
	  		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="1"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="dataList.total"
		      style="float:right;">
		    </el-pagination>
	  	</el-col>
	</div>
</template>

<script>
  	export default {
	    name: 'myTable',
	    props:[
		    'dataList',
		    'config',
	    ],
	    data() {
	        return {
	        	pageSize:10,
		        multipleSelection: [],
		        listLoading:false,
		    }
	    },
	
	    methods: {
	    	 handleSizeChange(val) {
	    	 	this.pageSize = val;
		        let para = Object.assign(this.config.paramas,{pageSize: val});
				this.listLoading = true;
		        this.$store.dispatch(this.config.dispatch,para).then((res) => {  
	        		this.listLoading = false;
		    	});
		    },
		    //切换页码
		    handleCurrentChange(val) {
				let para = Object.assign(this.config.paramas,{pageNum: val});
				this.listLoading = true;
		        this.$store.dispatch(this.config.dispatch,para).then((res) => {  
	        		this.listLoading = false;
		    	});
			},
			//全选
	      	handleSelectionChange(val) {
		        this.multipleSelection = val;
	      	},
	    }
  	}
</script>

<style scoped>

</style>
