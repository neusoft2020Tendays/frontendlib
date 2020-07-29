<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加货物消耗单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="form-group">
					<label for="exampleInputEmail1">员工编号</label>
					<input type="text" class="form-control" v-model="employee.id" required>
				</div>
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
		name: "EmployeeAdd",
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
		methods: {
			add() {
				this.axiosJSON.post("/employee/add", this.employee).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/employee/list");	// 编程方式跳转
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
