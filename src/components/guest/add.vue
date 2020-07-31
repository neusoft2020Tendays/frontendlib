<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">添加收费记录</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="row">
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">编号</label>
						<input type="text" class="form-control" v-model="cost.costId">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">数额</label>
						<input type="text" class="form-control" v-model="cost.costAmount">
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">时间</label>
						<input type="date" class="form-control" v-model="cost.time">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">老人编码</label>
						<input type="text" class="form-control" v-model="cost.elderlyid">
					</div>
				</div>
				<div>
					<button type="submit" class="btn btn-primary">提交</button>
					<router-link to="/cost/list" class="btn btn-default">取消</router-link>
				</div>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "CostAdd",
		data() {
			return {
				cost: {
					costId: "",
					costAmount: "",
					time: "",
					elderlyid: "",
				}
			};
		},
		methods: {
			add() {
				console.log(this.cost);
				this.axiosJSON.post("/cost/add", this.cost).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/cost/list"); // 编程方式跳转
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
