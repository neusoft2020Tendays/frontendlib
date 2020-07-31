<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">查看货物明细</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">货物编号</label>
						<span class="col-md-4">{{$route.params.id}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">货物名称</label>
						<span class="col-md-4">{{goods.name}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">货物价格</label>
						<span class="col-md-4">{{goods.price}}</span>
					</div>
				</div>
				<router-link to="/goods/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "GoodsView",
		data() {
			return {
				goods: {
					id:"",
					name:"",
					price:""
				},
			};
		},
		created() {
			let id = this.$route.params.id;
			this.getGoods(id);
		},
		methods: {
			getGoods(id) {
				this.axiosJSON.get("/goods/get", {
					params:{
						id:id,
					}
				}).then(result => {
					this.goods = result.data.result;
				});
			}
		}
	}
</script>

<style>
</style>
