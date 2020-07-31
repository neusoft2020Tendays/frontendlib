<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加仓库表单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="form-group">
					<label for="exampleInputEmail1">仓库编号</label>
					<input type="text" class="form-control" v-model="warehouse.warehouseid" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">管理员编号</label>
					<input type="text" class="form-control" v-model="warehouse.empid" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">仓库地址</label>
					<input type="text" class="form-control" v-model="warehouse.address" required>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/warehouse/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "WarehouseAdd",
		data() {
			return {
				warehouse: {
					warehouseid: "",
					empid: "",
					address:""
				}
			};
		},
		methods: {
			add() {
				this.axiosJSON.post("/warehouse/add", this.warehouse).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/warehouse/list");	// 编程方式跳转
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
