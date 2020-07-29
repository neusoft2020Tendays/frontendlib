<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改部门</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="modify()">
				<div class="form-group">
					<label for="exampleInputEmail1">部门编号</label>
					<input type="text" class="form-control" v-model="$route.params.deptid"  readonly="readonly">

				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">部门名称</label>
					<input type="text" class="form-control" v-model="department.name" autofocus="true">
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
		name: "DepartmentModify",
		data() {
			return {
				department: {
					deptid: "",
					name: ""
				}
			};
		},
		created() {
			let deptid = this.$route.params.deptid;
			this.getDepartment(deptid);
		},
		methods: {
			getDepartment(deptid) {
				this.axiosJSON.get("/department/get?id=" + deptid).then(result => {
					this.department = result.data.result;
				});
			},
			modify() {
				this.axiosJSON.post("/department/modify", this.department).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/department/list");
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
