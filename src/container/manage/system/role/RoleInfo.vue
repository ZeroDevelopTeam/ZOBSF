<template>
	<!--角色详情 -->
	<el-dialog title="角色详情" :visible.sync="dialogFormVisible1"  size="tiny" class="role-info">
    	<!--角色详情-->
		<el-form  label-width="50%">
			<el-form-item label="角色编号：">
				<div class="content-info">{{roleInfo.roleId}}</div>
			</el-form-item>
			<el-form-item label="角色名称：">
				<div class="content-info">{{roleInfo.roleName}}</div>
			</el-form-item>
			<el-form-item label="角色权限：">
				<div class="content-info">{{roleInfo.purviews}}</div>
			</el-form-item>
			<el-form-item label="角色状态：">
				<div class="content-info">{{roleInfo.state==1?'启用':'停用'}}</div>
			</el-form-item>
			<el-form-item label="备注：">
				<div class="content-info">{{roleInfo.roleDesc}}</div>
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

<style scoped lang="scss">
.role-info{
	.content-info{
		border-bottom: 1px solid;
	    width: 70%;
	    text-align: center;
        height: 30px;
	}
}
</style>
