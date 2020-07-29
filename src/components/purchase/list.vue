<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">货物购买信息管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">货物编号</th>
						<th scope="col">日期</th>
						<th scope="col">购买数量</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="purchase in purchaseList" v-bind:key="purchase.date">
						<td>{{purchase.goodsid}}</td>
						<td>{{purchase.date }}</td>
						<td>{{purchase.puramount }}</td>
						<td>
							<router-link v-bind:to="'/purchase/modify/' + purchase.goodsid + '/' + purchase.date" class="btn btn-default">修改</router-link>
							<a href="#" v-on:click="deletePurchase(purchase.goodsid, purchase.date)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/purchase/view/' + purchase.goodsid + '/' + purchase.date" class="btn btn-default">账单记录</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/purchase/add" class="btn btn-default">添加记录</router-link>
	</div>
</template>

<script>
	export default {
		name: "PurchaseList",
		data() {
			return {
				purchaseList: [],
				page: 1,
				rows: 10,
				count: 0,
				pageCount: 0,

			};
		},
		created() { // 当前组件的生命周期方法
			this.getList();
		},
		methods: {
			getList() {
				this.axiosJSON.get("/purchase/list/all/page", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					this.purchaseList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deletePurchase(goodsid, date) {
				let checkResult = confirm("您确认要删除该记录吗？");
				if (checkResult) {
					this.axiosJSON.post("/purchase/delete", {
						goodsid: goodsid,
						date: date
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
