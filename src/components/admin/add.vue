<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">新用户注册</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add">
				<div class="form-group">
					<label for="exampleInputEmail1">用户id</label>
					<input type="text" class="form-control" v-model="user.id" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">用户名</label>
					<input type="datetime" class="form-control" v-model="user.name" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">用户密码</label>
					<input type="password" class="form-control" v-model="user.password" required>
				</div>
				
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="login" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "AdminAdd",
		data() {
			return {
				user: {
					id: "",
					name: "",
					password:""
				}
			};
		},
		methods: {
			add() {
				// console.log(this.user);
				this.axiosJSON.post("/user/add", this.user).then(result => {
					if (result.data.stringResult == "Yes") {
						alert(result.data.message);
						this.$router.push("/admin/login");	// 编程方式跳转
					} else {
						alert(result.data.message);
					}
				});
			}
		}

	}
</script>

<style>
</style>
