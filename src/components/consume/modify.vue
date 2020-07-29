<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改货物消耗量</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputPassword1">消耗量</label>
					<input type="text" class="form-control" v-model="consume.amount" autofocus="true">
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/consume/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ConsumeModify",
		data() {
			return {
				consume: {
					id: "",
					date: "",
					amount: ""
				}
			};
		},
		created() {
			let id = this.$route.params.id;
			let date = this.$route.params.date;
			this.getConsume(id, date);
		},
		methods: {
			getConsume(id, date) {
				this.axiosJSON.get("/consume/get",{
					params:{
						id:id,
						date:date
					}
				}).then(result => {
					this.consume = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/consume/modify", this.consume).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/consume/list");
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
