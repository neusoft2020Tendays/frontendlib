<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">查看特定员工信息</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">员工编号</label>
						<span class="col-md-4">{{$route.params.id}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">员工姓名</label>
						<span class="col-md-4">{{employee.name}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">员工性别</label>
						<span class="col-md-4">{{employee.sex}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">员工年龄</label>
						<span class="col-md-4">{{employee.age}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">是否离职</label>
						<span class="col-md-4">{{employee.fired}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">是否休假</label>
						<span class="col-md-4">{{employee.leave}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">部门编号</label>
						<span class="col-md-4">{{employee.department.deptid}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">部门名称</label>
						<span class="col-md-4">{{employee.department.name}}</span>
					</div>
				</div>

				<router-link to="/employee/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "EmployeeView",
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
				},
			};
		},
		created() {
			let id = this.$route.params.id;
			this.getemployee(id);
		},
		methods: {
			getemployee(id) {
				this.axiosJSON.get("/employee/getWithDepartment?id="+id).then(result => {
					// console.log(result)
					this.employee = result.data.result;
				});
			}
		}
	}
</script>

<style>
</style>
