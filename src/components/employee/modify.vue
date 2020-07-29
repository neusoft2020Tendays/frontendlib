<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改货物消耗量</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputPassword1">员工姓名</label>
					<input type="text" class="form-control" v-model="employee.name" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">员工部门编号</label>
					<input type="text" class="form-control" v-model="employee.department.deptid" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">员工性别</label>
					<input type="text" class="form-control" v-model="employee.sex" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">员工年龄</label>
					<input type="text" class="form-control" v-model="employee.age" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">是否离职</label>
					<input type="text" class="form-control" v-model="employee.fired" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">是否休假</label>
					<input type="text" class="form-control" v-model="employee.leave" required>
				</div>
				
				
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/employee/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "EmployeeModify",
		data() {
			return {
				employee: {
					id: "",
					name: "",
					sex:"",
					age:"",
					fired:"",
					leave:"",
					department:{
						deptid:"",
						name:""
					}
				}
			};
		},
		created() {
			let id = this.$route.params.id;
			this.getemployee(id);
		},
		methods: {
			getemployee(id, date) {
				this.axiosJSON.get("/employee/getWithDepartment?id="+id).then(result => {
					this.employee = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/employee/modify", this.employee).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/employee/list");
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
