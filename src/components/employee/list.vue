<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">员工管理</h3>
		</div>

		<div class="box-body">
			<!-- 姓名 -->
			<div class="form-group col-md-2">
				<label for="exampleInputEmail1">姓名</label>
				<input type="text" class="form-control" v-model="name">
			</div>
			<!-- 年龄小 -->
			<div class="form-group col-md-2">
				<label for="exampleInputEmail1">年龄从</label>
				<input type="text" class="form-control" v-model="lowage">
			</div>
			<!-- 年龄大 -->
			<div class="form-group col-md-2">
				<label for="exampleInputEmail1">年龄至</label>
				<input type="text" class="form-control" v-model="highage">
			</div>
			<!-- 部门 -->
			<div class="form-group col-md-2">
				<label for="exampleInputEmail1">部门</label>
				<select class="form-control" v-model="deptid">
					<option value="所有部门">所有部门</option>
					<option v-for="deptid in deptidList" v-bind:key="deptid" v-bind:value="deptid">{{deptid}}</option>
				</select>
			</div>
			<!-- 性别 -->
			<div class="form-group col-md-2">
				<span>性别</span>
				<input type="checkbox" v-model="sex" id="男" value="男" />
				<label for="男">男</label>
				<input type="checkbox" v-model="sex" id="女" value="女">
				<label for="女">女</label>
			</div>
			<!-- 离职 -->
			<div class="form-group col-md-2">
				<label for="exampleInputEmail1">已离职</label>
				<input type="checkbox" v-model="fired" value="是" id="cb1">
			</div>
			<!-- 休假 -->
			<div class="form-group col-md-2">
				<label for="exampleInputEmail1">已休假</label>
				<input type="checkbox" v-model="leave" value="是" id="cb1">
			</div>
			<div class="form-group col-md-2">
				<button type="submit" class="btn btn-primary" v-on:click="make(), getList()">提交</button>
			</div>


			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">员工编号</th>
						<th scope="col">员工姓名</th>
						<th scope="col">员工性别</th>
						<th scope="col">员工年龄</th>
						<th scope="col">是否离职</th>
						<th scope="col">是否休假</th>
						<th scope="col">部门编号</th>
						<th scope="col">部门名称</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="employee in employeeList" v-bind:key="employee.id">
						<td>{{employee.id}}</td>
						<td>{{employee.name}}</td>
						<td>{{employee.sex}}</td>
						<td>{{employee.age}}</td>
						<td>{{employee.fired}}</td>
						<td>{{employee.leave}}</td>
						<td>{{employee.department.deptid}}</td>
						<td>{{employee.department.name}}</td>
						<td>
							<router-link v-bind:to="'/employee/modify/'+employee.id" class="btn btn-warning">修改</router-link>
							<a href="#" v-on:click="deleteemployee(employee.id)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/employee/view/'+employee.id" class="btn btn-primary">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="pageInfoShow" style="float:left">
				<span>当前页数:{{page}},总页数:{{pageCount}}</span>
			</div>
			<div class="page" style="float:right">
				<td>
					<div v-on:click="firstPage" class="btn btn-default">首页</div>
					<div v-on:click="prePage" class="btn btn-primary">上一页</div>
					<div v-on:click="nextPage" class="btn btn-primary">下一页</div>
					<div v-on:click="lastPage" class="btn btn-default">尾页</div>
				</td>
			</div>
		</div>
		<!-- /.box-body -->
		<router-link to="/employee/add" class="btn btn-default">增加员工信息</router-link>
	</div>
</template>

<script>
	export default {
		name: "EmployeeList",
		data() {
			return {
				name: "",
				sex: [],
				lowage: "",
				highage: "",
				fired: "",
				leave: "",
				deptid: "",
				employeeList: [],
				deptidList: [],
				page: 1,
				rows: 5,
				count: 0,
				pageCount: 0,
				flag: true
			};
		},
		created() { // 当前组件的生命周期方法
			this.getList();
			this.getAllDept();
		},
		methods: {
			make(){
				console.log(-1);
				this.flag = false;
			},
			getList() {
				// console.log(0);
				if(!this.flag){
					console.log(1);
					this.rows = 5;
					this.page = 1;
				}
				this.flag = true;
				// console.log(2);
				let cursex = "";
				let curFired = "否";
				let curLeave = "否";
				if(this.sex.length == 1){
					cursex = this.sex[0];
				}
				if(this.sex.length == 2){
					cursex = "";
				}
				if(this.fired){
					curFired = "是";
				}
				if(this.leave){
					curLeave = "是";
				}
				this.axiosJSON.get("/employee/listPageByConditionWithDepartment", {
					params: {
						rows: this.rows,
						page: this.page,
						lowAge: this.lowage,
						highAge: this.highage,
						sex: cursex,
						nameKey: this.name,
						leave: curLeave,
						fired: curFired,
						deptid: this.deptid
					}
				}).then(result => {
					// console.log(result)
					this.employeeList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			getAllDept() {
				this.axiosJSON.get("/department/get/all/deptid").then(result => {
					// console.log(result)
					this.deptidList = result.data.list;
				});
			},
			deleteemployee(id) {
				let checkResult = confirm("您确认要删除此员工信息吗？");
				if (checkResult) {
					this.axiosJSON.post("/employee/delete", {
						id: id
					}).then(result => {
						alert(result.data.message);
						if (result.data.status == "OK") {
							this.getList();
						}
					});
				}
			},
			firstPage() {
				this.page = 1;
				this.getList();
			},
			prePage() {
				let cur = this.page - 1;
				if (cur < 1) {
					alert("当前已是首页");
				} else {
					this.page = cur;
					this.getList();
				}
			},
			nextPage() {
				let cur = this.page + 1;
				if (cur > this.pageCount) {
					alert("当前已是最后一页");
				} else {
					this.page = cur;
					this.getList();
				}
			},
			lastPage() {
				this.page = this.pageCount;
				this.getList();
			}
		}
	}
</script>

<style>
</style>
