<template>
	<el-dialog title="角色详情" :visible.sync="dialogFormVisible">
	    <!--编辑界面-->
		<el-form :model="roleInfo" label-width="80px">
			<el-form-item label="角色编号">
				<el-input v-model="roleInfo.roleCode" readonly ></el-input>
			</el-form-item>
			<el-form-item label="角色名称">
				<el-input v-model="roleInfo.roleName" readonly></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="roleInfo.descripte" readonly></el-input>
			</el-form-item>
			<el-form-item label="角色状态">
			    <el-select v-model="roleInfo.state" placeholder="请选择状态类型">
				    <el-option label="启用" value="0"></el-option>
				    <el-option label="停用" value="1"></el-option>
			    </el-select>
			</el-form-item>
		</el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
