<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加货物消耗单</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="form-group">
					<label for="exampleInputEmail1">货物编号</label>
					<input type="text" class="form-control" v-model="consume.id" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">时间</label>
					<input type="text" class="form-control" v-model="consume.date" required>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">消耗量</label>
					<input type="text" class="form-control" v-model="consume.amount" required>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/Consume/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ConsumeAdd",
		data() {
			return {
				consume: {
					id: "",
					date: "",
					amount:""
				}
			};
		},
		methods: {
			add() {
				this.axiosJSON.post("/consume/add", this.consume).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/consume/list");	// 编程方式跳转
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
