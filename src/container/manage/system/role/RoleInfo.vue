<template>
	<!--角色详情 -->
	<el-dialog title="角色详情" :visible.sync="dialogFormVisible1"  size="tiny">
    	<!--角色详情-->
		<el-form  label-width="50%">
			<el-form-item label="角色编号：">
				{{roleInfo.roleId}}
			</el-form-item>
			<el-form-item label="角色名称：">
				{{roleInfo.roleName}}
			</el-form-item>
			<el-form-item label="角色权限：">
				{{roleInfo.purviews}}
			</el-form-item>
			<el-form-item label="角色状态：">
				{{roleInfo.state==1?'启用':'停用'}}
			</el-form-item>
			<el-form-item label="备注：">
				{{roleInfo.roleDesc}}
			</el-form-item>
			
		</el-form>
  		<div slot="footer" class="dialog-footer">
	    	<el-button type="primary" @click="hiddenInfo">确 定</el-button>
	  	</div>
	</el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		props: [
			'roleInfo',
			'dialogFormVisible'
		],
		data() {
			return {
				dialogFormVisible1:false,
			}
		},
		methods: {
			//隐藏子组件
			hiddenInfo() {
                this.$emit('hiddenInfo', false);
            }
		},
		computed: {
		 ...mapGetters([
	   		 ])
	    },
		mounted() {
		},
		components: {
		},
		watch:{
			dialogFormVisible(){
				return this.dialogFormVisible1 = this.dialogFormVisible;
			}
		}
	}
</script>

<style scoped>
.edit-user{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
