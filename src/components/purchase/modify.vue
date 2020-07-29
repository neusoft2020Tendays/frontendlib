<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改货物购买记录</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputEmail1">货物编号</label>
					<input type="text" class="form-control" v-model="$route.params.goodsid" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">姓名</label>
					<input type="date" class="form-control" v-model="$route.params.date" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">购买数量</label>
					<input type="number" class="form-control" v-model="purchase.puramount">
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/elderly/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "PurchaseModify",
		data() {
			return {
				purchase: {
					goodsid: "",
					date: "",
					puramount: ""
				}
			};
		},
		created() {
			let goodsid = this.$route.params.goodsid;
			let date = this.$route.params.date;
			this.getPurchase(goodsid, date);
		},
		methods: {
			getPurchase(goodsid, date) {
				this.axiosJSON.get("/purchase/get?id=" + goodsid + "&date=" + date).then(result => {
					this.purchase = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/purchase/modify", this.purchase).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/purchase/list");
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
