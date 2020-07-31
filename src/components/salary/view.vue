<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">查看薪水明细</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">薪水编号</label>
						<span class="col-md-4">{{$route.params.salaryId}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">员工编号</label>
						<span class="col-md-4">{{salary.empid}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">薪金</label>
						<span class="col-md-4">{{salary.salAccount}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">时间</label>
						<span class="col-md-4">{{salary.time}}</span>
					</div>
				</div>
				<router-link to="/salary/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "SalaryView",
		data() {
			return {
				salary: {
					salaryId:"",
					empid:"",
					salAccount:"",
					time: "",
				},
			};
		},
		created() {
			let id = this.$route.params.salaryId;
			this.getSalary(id);
		},
		methods: {
			getSalary(id) {
				this.axiosJSON.get("/salary/get", {
					params:{
						salaryId:id,
					}
				}).then(result => {
					this.salary = result.data.result;
				});
			}
		}
	}
</script>

<style>
</style>
