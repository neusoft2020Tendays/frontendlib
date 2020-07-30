<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改老人</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="exampleInputEmail1">老人编号</label>
						<input type="text" class="form-control" v-model="$route.params.elderlyid" readonly="readonly">
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">姓名</label>
						<input type="text" class="form-control" v-model="elderly.eldername" autofocus="true">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">性别</label>
						<input type="text" class="form-control" v-model="elderly.eldersex">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">年龄</label>
						<input type="number" class="form-control" v-model="elderly.elderage">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">楼层</label>
						<input type="text" class="form-control" v-model="elderly.floor">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">房间</label>
						<input type="text" class="form-control" v-model="elderly.room">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">床位</label>
						<input type="text" class="form-control" v-model="elderly.bed">
					</div>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/elderly/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ElderlyModify",
		data() {
			return {
				elderly: {
					elderlyid: "",
					eldername: "",
					eldersex: "",
					elderage: "",
					floor: "",
					room: "",
					bed: ""
				}
			};
		},
		created() {
			let elderlyid = this.$route.params.elderlyid;
			this.getElderly(elderlyid);
		},
		methods: {
			getElderly(elderlyid) {
				this.axiosJSON.get("/elderly/get?id=" + elderlyid).then(result => {
					this.elderly = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/elderly/modify", this.elderly).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/elderly/list");
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
