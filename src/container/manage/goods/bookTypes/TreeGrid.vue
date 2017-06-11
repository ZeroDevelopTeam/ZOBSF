<template>
	<div>
		<el-table
	    :data="data"
	    style="width: 100%"
		highlight-current-row 
		@selection-change="rowOptions"
	    :row-style="showTr">
	    <el-table-column type="selection" width="55"></el-table-column>
	    <el-table-column v-for="(column, index) in columns" :key="column.prop"
	      :label="column.label">
	      <template scope="scope">
	        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space"></span>
	        <button class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
	          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
	          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
	        </button>
	        <span v-else-if="index===0" class="ms-tree-space"></span>
	        {{scope.row[column.prop]}}
	      </template>
	    </el-table-column>
	    <el-table-column label="操作" v-if="treeType === 'normal'" >
	      <template scope="scope">
	        <el-button
	          size="small"
	          type="info"
	          @click="handleEdit()">
	            	修改
	        </el-button>
	        <el-button
	          size="small"
	          type="danger"
	          @click="handleDelete()">
	          		删除
	        </el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <!--修改界面-->
		<el-dialog :title="dialogTitle" v-model="formVisible" :close-on-click-modal="false" class="bookType-dialog">
			<el-form :model="bookTypeForm" label-width="100px" :rules="bookTypeFormRules" ref="bookTypeForm" class="bookType-form">
				<el-form-item label="分类编号:" prop="typeId">
					<el-input disabled="true" v-model="bookTypeForm.typeId" auto-complete="off" class="bookType-input"></el-input>
					<span class="bookType-note">(自动生成)</span>
				</el-form-item>
				<el-form-item label="分类名称:" prop="typeName">
					<el-input v-model="bookTypeForm.typeName" auto-complete="off" class="bookType-input"></el-input>
				</el-form-item>
				<el-form-item label="分类描述:">
					<el-input type="textarea" v-model="bookTypeForm.typeDesc" class="bookType-desc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="formVisible = false">取消</el-button>
				<el-button type="primary" @click.native="onSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	  <el-col :span="24" class="toolbar">
	  		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="params.pageNum"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="params.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="dataList.total"
		      style="float:right;">
		    </el-pagination>
	  </el-col>
	</div>
</template>
<script>
import Utils from '../../../../util/dataTranslate.js'
//  import Vue from 'vue'
  export default {
    name: 'TreeGrid',
    props: {
    	rowOptions: {
    		type: Function,
    	},
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
// 这是相应的字段展示
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function () {
          return ''
        }
      },
// 这个是是否展示操作列
      treeType: {
        type: String,
        default: function () {
          return 'normal'
        }
      },
// 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data () {
      return {
      	params: '',
      	dataList: '',
      	dialogTitle: '修改',
		formVisible: false,
		addLoading: false,
		//弹窗属性
		bookTypeForm: {
			typeId: '',
			typeName: '',
			typeDesc: '',
		},
		bookTypeFormRules: {
			typeId: [
				{ required: true, message: '必填项', trigger: 'blur' }
			],
			typeName: [
				{ required: true, message: '请输入名称', trigger: 'blur' }
			]
		},
      }
    },
    computed: {
    // 格式化数据源
      data: function () {
        let me = this
        if (me.treeStructure) {
          let data = Utils.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
          console.log(data)
          return data
        }
        return me.dataSource
      }
    },
    methods: {
    // 显示行
      showTr: function (row, index) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
        row._show = show
        return show ? '' : 'display:none;'
      },
    // 展开下级
      toggle: function (trIndex) {
        let me = this
        let record = me.data[trIndex]
        record._expanded = !record._expanded
      },
    // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
    // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      handleDelete () {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //新增
		onSubmit: function () {
			this.$refs.bookTypeForm.validate((valid) => {
				if (valid) {
					this.addLoading = true;
					let para = Object.assign({}, this.bookTypeForm);
					//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
					this.addLoading = false;
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.$refs['addForm'].resetFields();
					this.addFormVisible = false;
				}
			});
		},
      handleEdit() {
      	this.formVisible = true;
      },
      //改变每页数量
		handleSizeChange(val) {
		 	this.params.pageSize = val;
	        let para = {
	        	keyWord:this.params.keyWord,
	        	pageSize: val,
	        	pageNum: this.params.pageNum
	        };
			this.listLoading = true;
	        this.$store.dispatch(this.tableConfig.dispatch,para).then((res) => {  
	    		this.listLoading = false;
	    	});
	    },
	    //切换页码
	    handleCurrentChange(val) {
	    	this.params.pageNum = val;
	    	let para = {
	        	keyWord:this.params.keyWord,
	        	pageSize:this.params.pageSize,
	        	pageNum: val
	        };
			this.listLoading = true;
	        this.$store.dispatch(this.tableConfig.dispatch,para).then((res) => {  
	    		this.listLoading = false;
	    	});
		},
    }
  }
</script>
<style scoped lang="scss">
  .ms-tree-space{position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;}
  .ms-tree-space::before{content: ""}
  table td{
    line-height: 26px;
  }
  
  .bookType-form{
		.bookType-note{
			color: #4db3ff;
			margin-left: 1em;
		}
		.bookType-input{
			width: 40% !important;
		}
		.bookType-desc{
			width:70% !important;
		}
	}
	.dialog-footer{
		text-align: center;
	}
</style>
