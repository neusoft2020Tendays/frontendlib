<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">添加床位</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="row">
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">楼层</label>
						<input type="text" class="form-control" v-model="ward.floor">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">房间</label>
						<input type="text" class="form-control" v-model="ward.room">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">床位</label>
						<input type="text" class="form-control" v-model="ward.bed">
					</div>
				</div>
				<div>
					<button type="submit" class="btn btn-primary">提交</button>
					<router-link to="/ward/list" class="btn btn-default">取消</router-link>
				</div>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "WardAdd",
		data() {
			return {
				ward: {
					floor: "",
					room: "",
					bed: "",
				}
			};
		},
		methods: {
			add() {
				console.log(this.ward);
				this.axiosJSON.post("/ward/add", this.ward).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/ward/list"); // 编程方式跳转
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
