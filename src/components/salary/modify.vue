<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改货物明细表单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputEmail1">薪水编号</label>
					<input type="text" class="form-control" v-model="$route.params.id" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">员工编号</label>
					<input type="text" class="form-control" v-model="salary.empid" autofocus="true">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">薪金</label>
					<input type="text" class="form-control" v-model="salary.salAccount" autofocus="true">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">时间</label>
					<input type="datetime" class="form-control" v-model="salary.time" autofocus="true">
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
		name: "SalaryModify",
		data() {
			return {
				salary: {
					salaryId: "",
					empid: "",
					salAccount: "",
					time:""
				}
			};
		},
		created() {
			let id = this.$route.params.id;
			this.getSalary(id);
		},
		methods: {
			getSalary(id) {
				this.axiosJSON.get("/salary/get",{
					params:{
						salaryId:id,
					}
				}).then(result => {
					this.salary = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/salary/modify", this.salary).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/salary/list");
					} else {
						alert(result.data.message);
					}
				})
			}
		}
	}
</script>

<style>
</style>
