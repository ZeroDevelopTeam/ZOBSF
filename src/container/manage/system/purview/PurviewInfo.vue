<template>
	<el-dialog title="权限详情" :visible.sync="dialogFormVisible1" size="tiny">
	  	<!--编辑界面-->
		<el-form  label-width="50%" >
			<el-form-item label="权限编号：">
				{{purviewInfo.purviewId}}
			</el-form-item>
			<el-form-item label="权限名称：">
				{{purviewInfo.purviewName}}
			</el-form-item>
			<el-form-item label="规则：">
				{{purviewInfo.purviewRule}}
			</el-form-item>
			<el-form-item label="备注：" >
				{{purviewInfo.purviewDesc}}
			</el-form-item>
		</el-form>
	    <div slot="footer" class="dialog-footer">
	    	<el-button type="primary"  @click="hiddenInfo">返 回</el-button>
	    </div>
	</el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		props: [
			'purviewInfo',
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
.edit-auth{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
