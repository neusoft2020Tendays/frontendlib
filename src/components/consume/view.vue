<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">查看消费账单</h3>
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
						<label class="col-md-2">时间</label>
						<span class="col-md-4">{{$route.params.date}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">消耗量</label>
						<span class="col-md-4">{{consume.amount}}</span>
					</div>
				</div>
				<router-link to="/consume/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ConsumeView",
		data() {
			return {
				consume: {
					id: "",
					date: "",
					amount:""
				},
			};
		},
		created() {
			let id = this.$route.params.id;
			let date = this.$route.params.date;
			console.log(id);
			console.log(date);
			this.getConsume(id, date);
		},
		methods: {
			getConsume(id, date) {
				this.axiosJSON.get("/consume/get", {
					params:{
						id:id,
						date:date
					}
				}).then(result => {
					console.log(result)
					this.consume = result.data.result;
				});
			}
		}
	}
</script>

<style>
</style>
