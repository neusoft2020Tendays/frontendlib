<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改货物明细表单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputEmail1">货物编号</label>
					<input type="text" class="form-control" v-model="$route.params.id" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">货物名</label>
					<input type="text" class="form-control" v-model="goods.name" autofocus="true">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">价格</label>
					<input type="text" class="form-control" v-model="goods.price" autofocus="true">
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/goods/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "GoodsModify",
		data() {
			return {
				goods: {
					id: "",
					name: "",
					price: ""
				}
			};
		},
		created() {
			let id = this.$route.params.id;
			this.getGoods(id);
		},
		methods: {
			getGoods(id) {
				this.axiosJSON.get("/goods/get",{
					params:{
						id:id,
					}
				}).then(result => {
					this.goods = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/goods/modify", this.goods).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/goods/list");
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
