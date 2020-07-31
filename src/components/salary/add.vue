<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加薪水明细表单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="form-group">
					<label for="exampleInputEmail1">薪水编号</label>
					<input type="text" class="form-control" v-model="salary.salaryId" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">员工编号</label>
					<input type="text" class="form-control" v-model="salary.empid" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">薪金</label>
					<input type="text" class="form-control" v-model="salary.salAccount" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">时间</label>
					<input type="datetime" class="form-control" v-model="salary.time" required>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/salary/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "SalaryAdd",
		data() {
			return {
				salary: {
					salaryId: "",
					empid: "",
					salAccount:"",
					time : ""
				}
			};
		},
		methods: {
			add() {
				this.axiosJSON.post("/salary/add", this.salary).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/salary/list");	// 编程方式跳转
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
