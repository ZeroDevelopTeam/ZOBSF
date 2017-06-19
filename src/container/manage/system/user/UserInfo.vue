<template>
	 <!--用户详情-->
		<el-dialog title="用户详情" :visible.sync="dialogFormVisible1" size="tiny">
	        <el-form label-width="50%" >
	            <el-form-item label="用户账号：">
					{{userInfo.userCode}}
				</el-form-item>
				<el-form-item label="用户名称：">
					{{userInfo.userName}}
				</el-form-item>
				<el-form-item label="手机号：">
					{{userInfo.phone}}
				</el-form-item>
				<el-form-item label="用户邮箱：">
					{{userInfo.email}}
				</el-form-item>
				<el-form-item label="用户状态：">
				    {{userInfo.state=='1'?'启用':'停用'}}
				</el-form-item>
				<el-form-item label="用户角色：">
				    {{userInfo.roles}}
				</el-form-item>
				<el-form-item label="常用地址：">
					{{userInfo.address}}
				</el-form-item>
	        </el-form>
	        <span slot="footer" class="dialog-footer">
	            <el-button type="primary" @click="hiddenInfo">确 定</el-button>
	        </span>
	    </el-dialog>
</template>

<script>
  	import { mapGetters } from 'vuex'
	export default {
		props: [
			'userInfo',
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

