<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">薪水管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">薪水编号</th>
						<th scope="col">员工编号</th>
						<th scope="col">薪金</th>
						<th scope="col">时间</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="salary in salaryList" v-bind:key="salary.salaryId">
						<td>{{salary.salaryId }}</td>
						<td>{{salary.empid}}</td>
						<td>{{salary.salAccount}}</td>
						<td>{{salary.time}}</td>

						<td>
							<router-link v-bind:to="'/salary/modify/'+salary.salaryId" class="btn btn-warning">修改</router-link>
							<a href="#" v-on:click="deleteSalary(salary.salaryId)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/salary/view/'+salary.salaryId" class="btn btn-primary">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/salary/add" class="btn btn-default">增加薪水明细</router-link>
	</div>
</template>

<script>
	export default {
		name: "SalaryList",
		data() {
			return {
				salaryList: [],
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
				this.axiosJSON.get("/salary/listAllPageWithSalary", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					console.log(result)
					this.salaryList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteSalary(id) {
				let checkResult = confirm("您确认要删除此单吗？");
				if (checkResult) {
					this.axiosJSON.post("/salary/delete", {
						salaryId: id,
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
