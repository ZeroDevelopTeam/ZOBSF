<template>
	<div class="bookType-container">
		<div class="bookType-top">
			<el-dropdown @command="handleAdd">
			 	<el-button type="primary"> 新增<i class="el-icon-caret-bottom el-icon--right"></i>
			 </el-button>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>同级分类</el-dropdown-item>
			    <el-dropdown-item>下级分类</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
			<el-button type="primary" :disabled="this.sels.length===0" @click="batchRemove">删除</el-button>
			<el-input
			  placeholder="请输入关键字"
			  icon="search"
			  v-model="searchVaule"
			  :on-icon-click="handleSearch">
			</el-input>
		</div>
		<TreeGrid :columns="columns" :treeStructure="true" :dataSource="dataSource" :rowOptions="handleSelectionChange"></TreeGrid>
	</div>
</template>

<script>
import TreeGrid from './TreeGrid'
export default {
	components: {
		TreeGrid
	},
	data() {
		return {
			searchVaule:null,//检索值
    		sels: [],//列表选中列
	        columns: [
          {
            label: '分类编号',
            prop: 'typeId'
          },
          {
            label: '分类名称',
            prop: 'typeName'
          },
          {
            label: '分类人',
            prop: 'createPerson'
          },
          {
            label: '分类描述',
            prop: 'typeDesc'
          },
          {
            label: '分类时间',
            prop: 'createDate'
          }
        ],
      dataSource: [
        {
          id: 1,
          parentId: 0,
          typeId: '01',
          typeName: '人文科学',
          createPerson: '习近平',
          typeDesc: '习近平创造了人文科学',
          createDate: '2016-05-12',
          children: [
            {
              id: 2,
              parentId: 1,
              typeId: '0101',
	          typeName: '地理科学',
	          createPerson: '李克强',
	          typeDesc: '李克强创造了地理科学',
	          createDate: '2016-05-13',
            }
          ]
        },
        {
          id: 3,
          parentId: 0,
          typeId: '02',
          typeName: '地理科学',
          createPerson: '李克强',
          typeDesc: '李克强创造了地理科学',
          createDate: '2016-05-13',
          children: [
            {
              id: 4,
              parentId: 3,
              typeId: '0201',
	          typeName: '地理科学',
	          createPerson: '李克强',
	          typeDesc: '李克强创造了地理科学',
	          createDate: '2016-05-13',
            },
            {
              id: 5,
              parentId: 3,
              typeId: '0202',
	          typeName: '地理科学',
	          createPerson: '李克强',
	          typeDesc: '李克强创造了地理科学',
	          createDate: '2016-05-13',
            },
            {
              id: 6,
              parentId: 3,
              typeId: '0203',
	          typeName: '地理科学',
	          createPerson: '李克强',
	          typeDesc: '李克强创造了地理科学',
	          createDate: '2016-05-13',
              children: [
                {
                  id: 7,
                  parentId: 6,
                  typeId: '020301',
		          typeName: '地理科学',
		          createPerson: '李克强',
		          typeDesc: '李克强创造了地理科学',
		          createDate: '2016-05-13',
                }
              ]
            }
          ]
        },
        {
          id: 18,
          parentId: 0,
          typeId: '03',
          typeName: '地理科学',
          createPerson: '李克强',
          typeDesc: '李克强创造了地理科学',
          createDate: '2016-05-13',
        }
      ]
		}
	},
	methods: {
		handleAdd() {
			alert("新增");
		},
		//关键字检索
		handleSearch(ev) {
			console.log(this.searchVaule);
		},
		//列表勾选的行
		handleSelectionChange(val) {
		    this.sels = val;
	    },
	    //批量删除
		batchRemove: function () {
//			var codes = this.sels.map(item => item.reclaimCode).toString();
			this.$confirm('确认删除选中记录吗？', '提示', {
				type: 'error'
			}).then(() => {
				alert("删除")
			})
		},
		//行中修改
		handleEdit(row) {
			
		},
		//行中删除
		handleDelete(index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$message({
						message: '删除成功',
						type: 'success'
					});
			});
		},
	}
}
</script>

<style scoped lang="scss">
.bookType-container{
	margin-top: 1em;
	width: 100%;
	.bookType-top{
		margin-bottom: 5px;
		float: left;
		width:100%;
		.el-input{
			width: 20%;
			display: inline-block;
			float: right;
		}
	}
}
</style>