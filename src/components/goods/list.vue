<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">货物管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">货物编号</th>
						<th scope="col">货物名称</th>
						<th scope="col">货物价格</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="goods in goodsList" v-bind:key="goods.id">
						<td>{{goods.id }}</td>
						<td>{{goods.name}}</td>
						<td>{{goods.price}}</td>

						<td>
							<router-link v-bind:to="'/goods/modify/'+goods.id" class="btn btn-warning">修改</router-link>
							<a href="#" v-on:click="deleteGoods(goods.id)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/goods/view/'+goods.id" class="btn btn-primary">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/goods/add" class="btn btn-default">增加货物明细</router-link>
	</div>
</template>

<script>
	export default {
		name: "GoodsList",
		data() {
			return {
				goodsList: [],
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
				this.axiosJSON.get("/goods/listAllPageWithGoods", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					console.log(result)
					this.goodsList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteGoods(id) {
				let checkResult = confirm("您确认要删除此单吗？");
				if (checkResult) {
					this.axiosJSON.post("/goods/delete", {
						id: id,
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
