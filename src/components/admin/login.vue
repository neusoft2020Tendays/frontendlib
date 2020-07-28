<template>
	<div class="login-box">
		<div class="login-logo">
			<a href="../../index2.html"><b>十天疗养院</b></a>
		</div>
		<!-- /.login-logo -->
		<div class="login-box-body">
			<p class="login-box-msg">请输入登录信息</p>

			<form action="login.mvc" method="post">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" required name="userid" placeholder="账号">
					<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" required name="password" placeholder="密码">
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
			<a href="#">忘记密码</a><br>
			<a href="register.html" class="text-center">注册新用户</a>

		</div>
		<!-- /.login-box-body -->
	</div>

</template>

<script>
	export default {
		name: "AdminLogin",
		data() {
			return {};
		}
	}
</script>

<style>
</style>
