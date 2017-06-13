<template>
	 <el-dialog title="用户详情" :visible.sync="dialogFormVisible">
        <el-form style="width:600px;margin: auto;"
                 label-width="320px"
                 :model="userInfo">
            <el-form-item label="用户账号：" prop='userCode'>
				{{userInfo.userCode}}
			</el-form-item>
			<el-form-item label="用户名称：" prop='userName'>
				{{userInfo.userName}}
			</el-form-item>
			<el-form-item label="手机号：" prop='phone'>
				{{userInfo.phone}}
			</el-form-item>
			<el-form-item label="用户邮箱：" prop='email'>
				{{userInfo.email}}
			</el-form-item>
			<el-form-item label="用户状态：" prop='state'>
			    {{userInfo.state=='1'?'启用':'停用'}}
			</el-form-item>
			<el-form-item label="用户角色：" prop='roleName'>
			    {{userInfo.roleName}}
			</el-form-item>
			<el-form-item label="常用地址：" prop='address'>
				{{userInfo.address}}
			</el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
			}
		},
		methods: {
		},
		computed: {
		 ...mapGetters([
	   		 ])
	    },
		mounted() {
		},
		components: {
		}
	}
</script>

