<template>
	<div class="login">
		<div class="login-head">
			<div class="login-head__content flex justify-content-spacebetween align-items-center">
				<div class="left">
					<img class="img" src="@/assets/logo.png">
					<div class="desc">
						<p class="title">蚂蚁淘商户管理后台</p>
						<p class="txt">专注客户线索运营</p>
					</div>
				</div>
				<div class="right"><span>欢迎登录</span></div>
			</div>
		</div>
		<div class="login-content">
			<img src="@/assets/logo.png" />
			<div class="login-wrap">
				<ul class="nav">
					<li :class="{current:tabIndex==0}" @click="tabChange(0)">账号登录</li>
					<!-- <li :class="{current:tabIndex==1}" @click="tabChange(1)">手机验证登录</li> -->
				</ul>
				<div class="userLogin" v-if="tabIndex==0">
					<div class="infoBox">
						<div class="infoInp">
							<input type="text" v-model="loginForm.account" placeholder="输入登陆账号">
						</div>
						<div class="infoInp">
							<input placeholder="输入密码" v-model="loginForm.password" type="password">
						</div>
						<div class="infoInp center">
							<input style="flex:1" placeholder="输入验证码" v-model="loginForm.verCode"  @keydown.enter="handleLogin">
							<div class="verCode" @click="getCode">
								<img :src="codeImage" alt="">
							</div>
						</div>
					</div>
					<!-- <div class="forget" >
						<span @click="goTo('findPasswords')">忘记密码？</span>
					</div> -->
					<div class="loginBtn" @click="handleLogin">
						提交登录
					</div>
				</div>
				<!-- <div class="phoneLogin" v-if="tabIndex==1">
					<div class="infoBox">
						<div class="infoInp">
							<input type="number" v-model="phoneForm.mobile" placeholder="输入已授权手机号" maxlength="11">
							<div class="getCode">
								<el-button v-if="!ifgetCode" size="medium" type="warning" @click='getPhoneCode'>获取验证码</el-button>
								<span v-else>{{seconds}}S</span>
							</div>
						</div>
						<div class="infoInp">
							<input placeholder="输入验证码"  v-model="phoneForm.code"  type="password">
						</div>
					</div>
					<div class="loginBtn" @click="phoneLogin">
						提交登录
					</div>
				</div> -->
			</div>
		</div>

		<!-- <canvas id="loginBackground"></canvas> -->
	</div>
</template>
<script>
	import {login,kaptcha} from '@/api/user'
	// import {validMobile} from '@/utils/index'

	export default {
		data() {
			const validateUsername = (rule, value, callback) => {
				if (value.length < 5) {
					callback(new Error('用户名不能小于5位！'))
				} else {
					callback()
				}
			}

			const validatePassword = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('密码不能小于6位！'))
				} else {
					callback()
				}
			}

			return {
				loaded: true,
				tabIndex:0,
				ifgetCode:false,
				codeImage:'/api/user/kaptcha',
				seconds:60,
				info: '',
				loginForm: {
					account: '',
					password: '',
					verCode:''
				},
				phoneForm:{
					mobile:'',
					code:'',
				},
				loginRules: {
					account: [{
						required: true,
						trigger: 'blur',
						validator: validateUsername
					}],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePassword
					}],
					verCode: [{
						required: true,
						trigger: 'blur',
					}],
				},
				btnLoading: false
			}
		},
		created() {
			
// 			try {
// 				// const isLogin = await checkLogin()
// 				this.$loading.show()
// 				// if(!isLogin){
// 				try {
// // 					const host = location.host
// // 					const info = await loginInfo({
// // 						domain: host
// // 					})
// // 					this.info = info
// 					this.loaded = true
// 				} catch (error) {

// 				}
// 				// }else{
// 				//     this.$router.replace({name: 'index'})
// 				// }
// 				this.$loading.hide()

// 			} catch (error) {
// 				console.error(error)
// 			}
// 			this.enter()
			
		},
		mounted() {
			// this.initCanvas('#loginBackground')
		},
		methods: {
			 getCode(){

				 let random = '0.'+Math.floor(Math.random()*10000000000)
				 this.codeImage = process.env.VUE_APP_BASE_URL+'user/kaptcha?' +random
				// let res = await kaptcha();
				// console.log(res)
				// this.codeImage = 
			},
			goTo(palce){
				// console.log(palce)
				this.$router.push({
					name:palce
					})
			},
			// async getPhoneCode(){
			// 	let mobile = this.phoneForm.mobile;
			// 	// console.log(mobile,validMobile(mobile))
			// 	if(validMobile(mobile)){
			// 		this.$loading.show()
			// 		try{
			// 			await sendMobileCode({mobile})
			// 			this.$loading.hide()
			// 			this.ifgetCode = true;
			// 			let timer = setInterval(()=>{
			// 				this.seconds--;
			// 				if(this.seconds<=0){
			// 					this.seconds = 60;
			// 					this.ifgetCode = false;
			// 					clearInterval(timer)
			// 				}
			// 			},1000)
			// 			this.$message.success('获取验证码成功')
			// 		}catch(e){
			// 			this.$loading.hide()
			// 			//TODO handle the exception
			// 		}
			// 	}else{
			// 		this.$message.warning('请输入正确的手机号码')
			// 	}
				
			// },
			// async phoneLogin(){
			// 	const send = this.phoneForm;
			// 	// console.log(validMobile(send.mobile))
			// 	if(validMobile(send.mobile)){
			// 		if(send.code){
			// 			this.$loading.show()
			// 			try{
			// 				let res = await loginMobile(send);
			// 				// 动态路由菜单
			// 				const menus = await getUserResource()
			// 				this.phoneForm.mobile = '';
			// 				this.phoneForm.code = ''
			// 				const list = addRouter(menus)
			// 				this.$router.addRoutes(list)
			// 				// this.$router不是响应式的，所以手动将路由元注入路由对象
			// 				this.$router.options.routes.push(list)
			// 				// console.log(this.$router)
							
			// 				// 保存用户信息
			// 				const userInfo = await getUserInfo()
			// 				this.$store.dispatch('saveUserInfo', userInfo).then(_ => {
			// 					// this.btnLoading = false
			// 					this.$loading.hide()
							
			// 					const {
			// 						query
			// 					} = this.$route
							
			// 					// 已完善过商户信息
			// 					if (userInfo.status === 1) {
			// 						// 返回上一页
			// 						if (query.redirect) {
			// 							this.$router.push({
			// 								path: query.redirect || '/index'
			// 							})
			// 						} else {
			// 							this.$router.push({
			// 								name: 'index'
			// 							})
			// 						}
			// 					} else {
			// 						this.$router.push({
			// 							name: 'account'
			// 						})
			// 					}
			// 				})
			// 				// console.log(res);
			// 			}catch(e){
			// 				this.$loading.hide()
			// 				//TODO handle the exception
			// 			}
			// 		}else{
			// 			this.$message.warning('请输入正确的手机验证码')
			// 		}
			// 	}else{
			// 		this.$message.warning('请输入正确的手机号码')
			// 	}
				
				
			// },
			// initCanvas: canvasRenter,
			tabChange(index) {
				this.tabIndex = index;
			},
			async handleLogin() {
				
				// this.$refs.loginForm.validate(async valid => {
				//                 if (!valid) {
				//                     console.log('error submit!!')
				//                     return false
				//                 }

				// this.btnLoading = true
				if(this.loginForm.account&&this.loginForm.password&&this.loginForm.verCode){
					const {
						account,
						password,verCode
					} = this.loginForm

					
					this.$loading.show()
					
					try {
						const info = await login({
							// sellerId: id, //'539441456432011506', //id
							account,
							password,
							verCode
						})
						this.loginForm.account = '';this.loginForm.password = '';
						this.loginForm.verCode = '';
						console.log(info)
						this.$store.commit('setToken',info)

						console.log(this.$store)
						this.$message.success('登录成功')
						this.$loading.hide()
						this.goTo('home');

						// 动态路由菜单
						// const menus = await getUserResource()
						// const list = addRouter(menus)
						// this.$router.addRoutes(list)
						// this.$router不是响应式的，所以手动将路由元注入路由对象
						// this.$router.options.routes.push(list)
						// console.log(this.$router)
					
						// 保存用户信息
						// const userInfo = await getUserInfo()
						// this.$store.dispatch('saveUserInfo', userInfo).then(_ => {
						// 	// this.btnLoading = false
						// 	this.$loading.hide()
					
						// 	const {
						// 		query
						// 	} = this.$route
					
							// 已完善过商户信息
							// if (userInfo.status === 1) {
							// 	// 返回上一页
							// 	if (query.redirect) {
							// 		this.$router.push({
							// 			path: query.redirect || '/index'
							// 		})
							// 	} else {
							// 		this.$router.push({
							// 			name: 'index'
							// 		})
							// 	}
							// } else {
							// 	this.$router.push({
							// 		name: 'account'
							// 	})
							// }
						// })
					
					} catch (error) {
						console.log(error)
						this.getCode()
						// this.btnLoading = false
						this.$loading.hide()
					}
					
				}else{
					this.$message.warning('请输入账号密码和验证码')
				}
				

				// })
			}
		},
	}
</script>

<style lang="scss" scoped="scoped">
	#loginBackground {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.login {
		position: relative;
		width: 100%;
		min-height: 100%;
		// background-color: #021833;
		background-color: #fff;
		// overflow: hidden;

		.login-head {
			padding: 30px 200px;

			&__content {
				.left {

					.img,
					.desc {
						display: inline-block;
						vertical-align: middle;
					}

					.img {
						width: 40px;
						height: 40px;
					}

					.desc {
						margin-left: 10px;

						.title {
							font-weight: 700;
							color: 000;
							font-size: 16px;
						}
					}
				}
			}
		}

		.login-content {
			position: relative;

			.login-wrap {
				position: absolute;
				top: 10%;
				right: 10%;
				width: 300px;
				background: transparent;
				border-radius: 15px;
				z-index: 10;
				border: 1px solid #fff;
				padding: 20px 15px;

				.nav {
					display: flex;
					justify-content: center;

					li {
						color: #999999;
						margin: 0 5px;
						padding: 5px;
						cursor: pointer;
					}

					.current {
						color: #00cccc !important;
						border-bottom: #00cccc 2px solid;
					}
				}

				.loginBtn {
					width: 150px;
					margin: 0 auto;
					background: #00cccc;
					color: #fff;
					text-align: center;
					line-height: 30px;
					border-radius: 10px;
					margin-top: 20px;
					cursor: pointer;
				}

				.infoBox {
					.infoInp {
						margin-top: 10px;
						position: relative;

						input {
							width: 100%;
							height: 35px;
							border-radius: 15px;
							outline: none;
							border: none;
							padding: 0 10px;
						}

						.getCode {
							position: absolute;
							height: 35px;
							width: 100px;
							right: 0;
							top: 0;
							overflow: hidden;
							border-radius: 15px;
							line-height: 35px;
							text-align: center;
							background: #ffcc00;
							// 						background: 
						}
					}
				}

				.userLogin {
					width: 260px;
					margin: 0 auto;

					.forget {
						
						padding: 10px 0 0 10px;
						color: #fff;
						font-size: 12px;
						span{
							cursor: pointer;
						}
					}
				}

				.phoneLogin {
					width: 260px;
					margin: 0 auto;
				}

			}
		}


	}
</style>
