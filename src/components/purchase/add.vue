<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">添加货物购买记录</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="exampleInputEmail1">货物编号</label>
						<input type="text" class="form-control" v-model="purchase.goodsid" required>
					</div>
					<div class="form-group col-md-3">
						<label for="exampleInputPassword1">日期</label>
						<input type="date" class="form-control" v-model="purchase.date" required>
					</div>
					<div class="form-group col-md-3">
						<label for="exampleInputPassword1">购买数量</label>
						<input type="text" class="form-control" v-model="purchase.puramount">
					</div>
				</div>
				<div>
					<button type="submit" class="btn btn-primary">提交</button>
					<router-link to="/purchase/list" class="btn btn-default">取消</router-link>
				</div>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "PurchaseAdd",
		data() {
			return {
				purchase: {
					goodsid: "",
					date: "",
					puramount: ""
				}
			};
		},
		methods: {
			add() {
				this.axiosJSON.post("/purchase/add", this.purchase).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/purchase/list"); // 编程方式跳转
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
