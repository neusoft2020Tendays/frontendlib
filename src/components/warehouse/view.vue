<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">查看仓库明细</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">仓库编号</label>
						<span class="col-md-4">{{$route.params.warehouseid}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">管理员编号</label>
						<span class="col-md-4">{{warehouse.empid}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">仓库地址</label>
						<span class="col-md-4">{{warehouse.address}}</span>
					</div>
				</div>
				<router-link to="/warehouse/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "WarehouseView",
		data() {
			return {
				warehouse: {
					warehouseid:"",
					empid:"",
					address:""
				},
			};
		},
		created() {
			let id = this.$route.params.warehouseid;
			this.getWarehouse(id);
		},
		methods: {
			getWarehouse(id) {
				this.axiosJSON.get("/warehouse/get", {
					params:{
						id:id,
					}
				}).then(result => {
					this.warehouse = result.data.result;
				});
			}
		}
	}
</script>

<style>
</style>
