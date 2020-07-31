<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改收费记录</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="exampleInputEmail1">编号</label>
						<input type="text" class="form-control" v-model="$route.params.costid" readonly="readonly">
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">姓名</label>
						<input type="text" class="form-control" v-model="cost.elderly.eldername" readonly="readonly">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">老人编码</label>
						<input type="text" class="form-control" v-model="cost.elderly.elderlyid" readonly="readonly">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">数额</label>
						<input type="number" class="form-control" v-model="cost.costAmount">
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">时间</label>
						<input type="date" class="form-control" v-model="cost.time">
					</div>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/cost/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "CostModify",
		data() {
			return {
				cost: {
					costId: "",
					elderly:null,
					costAmount:0,
					time:null
				}
			};
		},
		created() {
			let costid = this.$route.params.costid;
			this.getCost(costid);
		},
		methods: {
			getCost(costid) {
				this.axiosJSON.get("/cost/get?id=" + costid).then(result => {
					console.log(result)
					this.cost = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/cost/modify", this.cost).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/cost/list");
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
