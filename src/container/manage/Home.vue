<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<!--<el-dropdown-item>我的消息</el-dropdown-item>-->
						<!--<el-dropdown-item>设置</el-dropdown-item>-->
						<el-dropdown-item @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>
						<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<!--<strong class="title">{{$route.name}}</strong>-->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
			
			<!-- 修改密码 -->
			<el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
			  <el-form :model="pswForm" :rules="pswRule" ref="pswForm">
			    <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPsw">
			      <el-input type="password" v-model="pswForm.oldPsw" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPsw">
			      <el-input type="password" v-model="pswForm.newPsw" auto-complete="off">
			      	<template slot="append" v-if="showTexts">
						<font :color="colors">{{showTexts}}</font>
					</template>
			      </el-input>
			    </el-form-item>
			    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="reNewPsw">
			      <el-input type="password" v-model="pswForm.reNewPsw" auto-complete="off"></el-input>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="changePsw">确 定</el-button>
			  </div>
			</el-dialog>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			//密码校验
			 const validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		        	this.passwordStrong(value);
		          if (this.pswForm.reNewPsw !== '') {
		            this.$refs.pswForm.validateField('reNewPsw');
		          }
		          callback();
		        }
		      };
		      //确认密码校验
		      const validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.pswForm.newPsw) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
			return {
				sysName:'信用数据开放平台',
				collapsed:false,
				sysUserName: '',//当前用户名
				dialogFormVisible: false,
				formLabelWidth: '120px',
				showTexts:'',
				colors:'',
				pswForm: {
					oldPsw: '',
					newPsw: '',
					reNewPsw: '',
				},
				pswRule: {
			        oldPsw: [
			            { required: true, message: '请输入旧密码', trigger: 'change' },
			            { min: 6, max: 16, message: '请输入6 到 16位旧密码'}
			        ],
			        newPsw: [
			            { required: true, validator: validatePass, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位新密码'}
			        ],
			        reNewPsw: [
			            { required: true, validator: validatePass2, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位确认密码'}
			        ]
		        },
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//修改密码
			changePsw(){
				const _this = this;
		        this.$refs.pswForm.validate((valid) => {
					if (valid) {
			        	let user = sessionStorage.getItem('user');
						if (user) {
							user = JSON.parse(user);
						}
			            const para = {userCode:user.userCode , oldUserPsw:_this.pswForm.oldPsw,userPsw:_this.pswForm.newPsw};
			            this.$store.dispatch('changeUserPsw',para).then((data) => {  
				            if (data.status == 200) {
				                this.$message({
				                  message: data.msg,
				                  type: 'success'
				                });
				            } else {
				              	this.$message({
				                  message: data.msg,
				                  type: 'error'
				                });
				            }
					    });  
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
		        });
			},
			/**
			 * 密码强度校验
			 * param value 密码
			 */
			passwordStrong(value){
				//密码为八位及以上并且字母数字特殊字符三项都包括
		     	const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		   		//密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
		     	const mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		     	const enoughRegex = new RegExp("(?=.{6,}).*", "g");
		     	this.password_length = value.length;
		     	if(value && value.length>5 && value.length<17){
		     		if (strongRegex.test(value)) {
			        	this.showTexts='强';
			        	this.colors='green'
		     		} else if (mediumRegex.test(value)) {
			        	this.showTexts='中';
			        	this.colors='blue'
				     } else {
			        	this.showTexts='弱';
			        	this.colors='red'
				    }
				     
		     	}else{
		        	this.showTexts='';
		     	}
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			let user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.userName || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
</style>
