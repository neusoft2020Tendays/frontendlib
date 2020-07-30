<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">货物消费管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">货物编号</th>
						<th scope="col">货物名称</th>
						<th scope="col">货物价格</th>
						<th scope="col">消耗时间</th>
						<th scope="col">消耗量</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="consume in consumeList" v-bind:key="consume.id+consume.date">
						<td>{{consume.id }}</td>
						<td>{{consume.goods.name }}</td>
						<td>{{consume.goods.price }}</td>
						<td>{{consume.date }}</td>
						<td>{{consume.amount }}</td>
						<td>
							<router-link v-bind:to="'/consume/modify/'+consume.id+'/'+consume.date" class="btn btn-warning">修改</router-link>
							<a href="#" v-on:click="deleteConsume(consume.id, consume.date)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/consume/view/'+consume.id+'/'+consume.date" class="btn btn-primary">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/consume/add" class="btn btn-default">增加货物消耗单</router-link>
	</div>
</template>

<script>
	export default {
		name: "ConsumeList",
		data() {
			return {
				consumeList: [],
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
				this.axiosJSON.get("/consume/listPageWithGoods", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					console.log(result)
					this.consumeList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteConsume(id, date) {
				let checkResult = confirm("您确认要删除此单吗？");
				if (checkResult) {
					this.axiosJSON.post("/consume/delete", {
						id: id,
						date: date,
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
