<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改仓库表单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputEmail1">仓库编号</label>
					<input type="text" class="form-control" v-model="$route.params.warehouseid" readonly="readonly">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">管理员编号</label>
					<input type="text" class="form-control" v-model="warehouse.empid" autofocus="true">
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">仓库地址</label>
					<input type="text" class="form-control" v-model="warehouse.address" autofocus="true">
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
		name: "WarehouseModify",
		data() {
			return {
				warehouse: {
					warehouseid: "",
					empid: "",
					address: ""
				}
			};
		},
		created() {
			let id = this.$route.params.warehouseid;
			this.getWarehouse(id);
		},
		methods: {
			getWarehouse(id) {
				this.axiosJSON.get("/warehouse/get",{
					params:{
						id:id,
					}
				}).then(result => {
					this.warehouse = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/warehouse/modify", this.warehouse).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/warehouse/list");
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
