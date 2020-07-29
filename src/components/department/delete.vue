<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">删除部门</h3>

			<div class="box-tools pull-right">
				<button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
					<i class="fa fa-minus"></i></button>
				<button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
					<i class="fa fa-times"></i></button>
			</div>
		</div>
		<div class="box-body">
			<form action="delete.do" method="post">
				<div class="form-group">
					<label for="exampleInputEmail1">部门编号</label>
					<span>${dm.code}</span>

				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">部门名称</label>
					<span>${dm.name}</span>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/department/list" class="btn btn-default">取消</router-link>
				<input type="hidden" name="no" value="${dm.no}" />
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "DepartmentDelete",
		data() {
			return {};
		}
	}
</script>

<style>
</style>
