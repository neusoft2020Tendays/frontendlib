<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">查看部门</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">部门编号</label>
						<span class="col-md-4">{{$route.params.deptid}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">部门名称</label>
						<span class="col-md-4">{{department.name}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">部门人数</label>
						<span class="col-md-4">{{num}}</span>
					</div>
				</div>
				<router-link to="/department/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "DepartmentView",
		data() {
			return {
				department: {
					deptid: "",
					name: ""
				},
				num: 0
			};
		},
		created() {
			let deptid = this.$route.params.deptid;
			this.getDepartment(deptid);
			this.countNumByDepartment(deptid);
		},
		methods: {
			getDepartment(deptid) {
				this.axiosJSON.get("/department/get?id=" + deptid).then(result => {
					this.department = result.data.result;
				});
			},
			countNumByDepartment(deptid) {
				console.log(deptid);
				this.axiosJSON.get("/employee/getCountByDepartment?deptid=" + deptid).then(result => {
					this.num = result.data.intResult;
				});
				console.log(this.num);
			}
		}
	}
</script>

<style>
</style>
