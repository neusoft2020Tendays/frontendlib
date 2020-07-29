<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">增加部门</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="add()">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="exampleInputEmail1">部门编号</label>
						<input type="text" class="form-control" v-model="department.deptid" required>
						<small id="emailHelp" class="form-text text-muted"></small>
					</div>
					<div class="form-group col-md-4">
						<label for="exampleInputPassword1">部门名称</label>
						<input type="text" class="form-control" v-model="department.name" required>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/department/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "DepartmentAdd",
		data() {
			return {
				department: {
					deptid: "",
					name: ""
				}
			};
		},
		methods: {
			add() {
				this.axiosJSON.post("/department/add", this.department).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/department/list"); // 编程方式跳转
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
