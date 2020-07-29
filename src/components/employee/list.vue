<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">员工管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">员工编号</th>
						<th scope="col">员工姓名</th>
						<th scope="col">员工性别</th>
						<th scope="col">员工年龄</th>
						<th scope="col">是否离职</th>
						<th scope="col">是否休假</th>
						<th scope="col">部门编号</th>
						<th scope="col">部门名称</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="employee in employeeList" v-bind:key="employee.id">
						<td>{{employee.id}}</td>
						<td>{{employee.name}}</td>
						<td>{{employee.sex}}</td>
						<td>{{employee.age}}</td>
						<td>{{employee.fired}}</td>
						<td>{{employee.leave}}</td>
						<td>{{employee.department.deptid}}</td>
						<td>{{employee.department.name}}</td>
						<td>
							<router-link v-bind:to="'/employee/modify/'+employee.id" class="btn btn-warning">修改</router-link>
							<a href="#" v-on:click="deleteemployee(employee.id)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/employee/view/'+employee.id" class="btn btn-primary">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/employee/add" class="btn btn-default">增加员工信息</router-link>
	</div>
</template>

<script>
	export default {
		name: "EmployeeList",
		data() {
			return {
				employeeList: [],
				page: 1,
				rows: 5,
				count: 0,
				pageCount: 0,

			};
		},
		created() { // 当前组件的生命周期方法
			this.getList();
		},
		methods: {
			getList() {
				this.axiosJSON.get("/employee/listPageWithDepartment", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					// console.log(result)
					this.employeeList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteemployee(id) {
				let checkResult = confirm("您确认要删除此员工信息吗？");
				if (checkResult) {
					this.axiosJSON.post("/employee/delete",{
						id:id
					}).then(result => {
						alert(result.data.message);
						if (result.data.status == "OK") {
							this.getList();
						}
					});
				}
			}
		}
	}
</script>

<style>
</style>
