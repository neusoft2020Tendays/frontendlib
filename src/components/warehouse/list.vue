<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">仓库管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">仓库编号</th>
						<th scope="col">管理员编号</th>
						<th scope="col">仓库地址</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="warehouse in warehouseList" v-bind:key="warehouse.warehouseid">
						<td>{{warehouse.warehouseid }}</td>
						<td>{{warehouse.empid}}</td>
						<td>{{warehouse.address}}</td>

						<td>
							<router-link v-bind:to="'/warehouse/modify/'+warehouse.warehouseid" class="btn btn-warning">修改</router-link>
							<a href="#" v-on:click="deleteWarehouse(warehouse.warehouseid)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/warehouse/view/'+warehouse.warehouseid" class="btn btn-primary">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/warehouse/add" class="btn btn-default">增加仓库明细</router-link>
	</div>
</template>

<script>
	export default {
		name: "WarehouseList",
		data() {
			return {
				warehouseList: [],
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
				this.axiosJSON.get("/warehouse/listAllPageWithWarehouse", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					console.log(result)
					this.warehouseList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteWarehouse(id) {
				let checkResult = confirm("您确认要删除此单吗？");
				if (checkResult) {
					this.axiosJSON.post("/warehouse/delete", {
						warehouseid: id,
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
