<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">部门管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">编号</th>
						<th scope="col">名称</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="department in departmentList" v-bind:key="department.deptid">
						<td>{{department.deptid }}</td>
						<td>{{department.name }}</td>
						<td>
							<router-link v-bind:to="'/department/modify/' + department.deptid" class="btn btn-default">修改</router-link>
							<a href="#" v-on:click="deleteDepartment(department.deptid)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/department/view/' + department.deptid" class="btn btn-default">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/department/add" class="btn btn-default">增加新部门</router-link>
	</div>
</template>

<script>
	export default {
		name: "DepartmentList",
		data() {
			return {
				departmentList: [],
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
				this.axiosJSON.get("/department/list/all/page", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					this.departmentList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteDepartment(deptid) {
				let checkResult = confirm("您确认要删除此部门吗？");
				if (checkResult) {
					this.axiosJSON.post("/department/delete", {
						deptid: deptid
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
