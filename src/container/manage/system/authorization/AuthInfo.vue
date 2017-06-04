<template>
	<el-dialog title="权限详情" :visible.sync="dialogFormVisible">
	  <!--编辑界面-->
			<el-form :model="authInfo" label-width="80px" >
				<el-form-item label="权限编号">
					<el-input v-model="authInfo.authCode" readonly auto-complete="off"></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="权限名称">
					<el-input v-model="authInfo.authName"></el-input>
				</el-form-item>
				<el-form-item label="规则">
					<el-input v-model="authInfo.rule"></el-input>
				</el-form-item>
				<el-form-item label="备注" >
					<el-input type="textarea" v-model="authInfo.descript"></el-input>
				</el-form-item>
			</el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary"  @click="dialogFormVisible = false">返 回</el-button>
	  </div>
	</el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		props: [
			'authInfo',
			'dialogFormVisible'
		],
		data() {
			return {
			}
		},
		methods: {
		},
		computed: {
		 ...mapGetters([
		 	'showInfo'
	   		 ])
	    },
		mounted() {
		},
		components: {
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
