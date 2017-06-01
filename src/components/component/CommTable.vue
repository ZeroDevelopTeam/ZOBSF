<template>
	<div class="block">
		<el-table :data="sourceData" style="width: 100%">
			<template v-for="item in columns">
				<el-table-column v-if="item.operations" 
					:key="item.prop" 
					:prop="item.prop" 
					:label="item.label" 
					:width="item.width"
					:formatter='item.formatter'
					:align="item.align">
					<template scope="scope">
						<el-button 
							size="small" 
							v-for="tag in item.operations" 
							:key="tag.label"
							type="info"
							@click="tag.func(scope.row)"
						>
							{{tag.label}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column v-else 
					:prop="item.prop" 
					:label="item.label" 
					:width="item.width" 
					:key="item.prop" 
					:formatter='item.formatter'
					:align="item.align">
        		</el-table-column>
			</template>
		</el-table>
		<el-pagination 
			@size-change="handleSizeChange" 
			@current-change="handleCurrentChange" 
			:current-page="currentPage" 
			:page-sizes="[2,100, 200, 300, 400]" 
			:page-size="pageSize" 
			layout="total, sizes, prev, pager, next, jumper" 
			:total="totalCount">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		props: [
			'tableConfig',
		],
		data() {
			return {
				sourceData: [],
				columns:[],
				currentPage: 1,
				pageSize: 2,
				totalCount:0,
			}
		},
		watch:{
			//监听props的变化
			tableConfig:{
				handler(){
					this.sourceData = this.tableConfig.tableData;
					this.totalCount = this.tableConfig.total;
					this.columns =  this.tableConfig.columns;
				},
				deep: true
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(row.address);
			},
			//改变每页数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.$store.dispatch(
					this.tableConfig.actionType,
					Object.assign({},
						this.tableConfig.paramData,
						{
							pageNum: this.currentPage ,
							pageSize:val 
						}
					)
				);
			},
			//改变页码
			handleCurrentChange(val) {
				this.currentPage = val;
				this.$store.dispatch(
					this.tableConfig.actionType,
					Object.assign({},
						this.tableConfig.paramData,
						{
							pageNum: val ,
							pageSize:this.pageSize
						}
					)
				);
			}
		}
	}
</script>