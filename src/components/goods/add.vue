<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加货物明细表单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="form-group">
					<label for="exampleInputEmail1">货物编号</label>
					<input type="text" class="form-control" v-model="goods.id" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">货物名称</label>
					<input type="text" class="form-control" v-model="goods.name" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">价格</label>
					<input type="text" class="form-control" v-model="goods.price" required>
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
		name: "GoodsAdd",
		data() {
			return {
				goods: {
					id: "",
					name: "",
					price:""
				}
			};
		},
		methods: {
			add() {
				this.axiosJSON.post("/goods/add", this.goods).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/goods/list");	// 编程方式跳转
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
