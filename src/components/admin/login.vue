<template>
	<div class="login-box">
		<div class="login-logo">
			<a href="../../index2.html"><b>十天疗养院</b></a>
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">请输入登录信息</p>

			<form method="post" v-on:submit.prevent="userLogin">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" required v-model="userid" placeholder="账号">
					<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" required v-model="password" placeholder="密码">
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="row">
					<!-- /.col -->
					<div class="col-xs-12">
						<button type="submit" class="btn btn-primary btn-block btn-flat">登录</button>
					</div>
					<!-- /.col -->
				</div>
			</form>
			<!-- /.social-auth-links -->
			
			
			<div class="box-body">
				<div class="form-group col-md-6">
					<a href="#" class="btn btn-primary">忘记密码</a><br>
				</div>
				<div class="form-group col-md-6">
					<router-link to='add' class="btn btn-primary">注册新用户</router-link>
				</div>
			</div>

		</div>
		<!-- /.login-box-body -->
	</div>

</template>

<script>
	export default {
		name: "AdminLogin",
		data() {
			return {
				userid:"",
				password:"",
			};
		},
		created() {
			this.$store.dispatch("logoutUser")
		},
		methods:{
			userLogin(){
				this.axiosJSON.get("/user/validate", {
					params:{
						id:this.userid,
						password:this.password
					},
					
				}).then(result=>{
					// console.log(result);
					if(result.data.stringResult=="Yes"){
						// console.log("1")
						// 存储用户登陆对象
						this.$store.dispatch("loginUser",result.data.result)
						// console.log("2")
						this.$router.push("/");
						// localStorage.setItem("","");
						console.log(this.$store.getters.loginuser);
					}else{
						this.userid = "";
						this.password = "";
						alert(result.data.message);
					}
				});
			},
		}
	}
</script>

<style>
</style>
