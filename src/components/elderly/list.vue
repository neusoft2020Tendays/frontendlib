<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">老人管理</h3>
		</div>
		<div class="row">
			<div class="form-group col-md-1"></div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">年龄从</label>
				<input type="number" class="form-control" v-model="minAge" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">年龄至</label>
				<input type="number" class="form-control" v-model="maxAge" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-2">
				<label for="inputPassword4">楼层</label>
				<select class="form-control" v-model="floor" v-on:change="updateRoom(), getListByCondition()">
					<option value="所有楼层">所有楼层</option>
					<option v-for="floor in floorList" v-bind:key="floor" v-bind:value="floor">{{floor}}</option>
				</select>
			</div>
			<div class="form-group col-md-2">
				<label for="inputPassword4">房间</label>
				<select class="form-control" v-model="room" v-on:change="getListByCondition">
					<option value="所有房间">所有房间</option>
					<option v-for="room in roomList" v-bind:key="room" v-bind:value="room">{{room}}</option>
				</select>
			</div>
			<div class="form-group col-md-2">
				<label for="inputPassword4">姓名检索</label>
				<input type="text" class="form-control" v-model="nameKey" v-on:change="getListByCondition">
			</div>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">编号</th>
						<th scope="col">姓名</th>
						<th scope="col">性别</th>
						<th scope="col">年龄</th>
						<th scope="col">楼层</th>
						<th scope="col">房间号</th>
						<th scope="col">床位号</th>
						<th scope="col">照片</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="elderly in elderlyList" v-bind:key="elderly.elderlyid">
						<td>{{elderly.elderlyid}}</td>
						<td>{{elderly.eldername }}</td>
						<td>{{elderly.eldersex }}</td>
						<td>{{elderly.elderage }}</td>
						<td>{{elderly.floor }}</td>
						<td>{{elderly.room }}</td>
						<td>{{elderly.bed }}</td>
						<td>
							<router-link v-bind:to="'/elderly/modify/' + elderly.elderlyid" class="btn btn-default">修改</router-link>
							<a href="#" v-on:click="deleteElderly(elderly.elderlyid)" class="btn btn-danger">删除</a>
							<router-link v-bind:to="'/elderly/view/' + elderly.elderlyid" class="btn btn-default">详细信息</router-link>
							<router-link v-bind:to="'/elderly/cost/' + elderly.elderlyid" class="btn btn-default">账单</router-link>

						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/elderly/add" class="btn btn-default">添加老人</router-link>
		<nav aria-label="Page navigation" style="text-align: center;">
			<ul class="pagination">
				<li>
					<a href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li><a href="javascript:;" onclick="freshPage(0);getList();">{{startpage}}</a></li>
				<li><a href="javascript:;" onclick="freshPage(1);getList();">{{startpage + 1}}</a></li>
				<li><a href="javascript:;" onclick="freshPage(2);getList();">{{startpage + 2}}</a></li>
				<li><a href="javascript:;" onclick="freshPage(3);getList();">{{startpage + 3}}</a></li>
				<li><a href="javascript:;" onclick="freshPage(4);getList();">{{startpage + 4}}</a></li>
				<li>
					<a href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	export default {
		name: "ElderlyList",
		data() {
			return {
				elderlyList: [],
				floorList: [],
				roomList: [],
				page: 1,
				rows: 5,
				count: 0,
				pageCount: 0,
				startpage: 0,
				minAge: 0,
				maxAge: 0,
				nameKey: "",
				floor: "",
				room: ""
			};
		},
		created() { // 当前组件的生命周期方法
			this.getList();
			this.startpage = this.page < 3 ? 1 : this.page - 2;
			this.getFloorList();
		},
		mounted() {
			window.freshPage = this.freshPage;
			window.getList = this.getList;
		},
		methods: {
			freshPage(s) {
				this.page = this.startpage + s;
				this.startpage = this.page < 3 ? 1 : this.page - 2;
			},
			getList() {
				this.axiosJSON.get("/elderly/list/all/page", {
					params: {
						rows: this.rows,
						page: this.page
					}
				}).then(result => {
					this.elderlyList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			getFloorList() {
				this.axiosJSON.get("/ward/floor").then(result => {
					this.floorList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			updateRoom() {
				console.log("测试");
				this.axiosJSON.get("/ward/room", {
					params: {
						floor: this.floor
					}
				}).then(result => {
					this.roomList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			getListByCondition() {
				this.axiosJSON.get("/elderly/list/condition/page", {
					params: {
						rows: this.rows,
						page: this.page,
						minAge: this.minAge,
						maxAge: this.maxAge,
						floor: this.floor,
						room: this.room,
						nameKey: this.nameKey
					}
				}).then(result => {
					if (result.data.status == "OK") {
						this.elderlyList = result.data.list;
						this.count = result.data.count;
						this.pageCount = result.data.pageCount;
					}
				});
			},
			deleteElderly(elderlyid) {
				let checkResult = confirm("您确认要删除该老人吗？");
				if (checkResult) {
					this.axiosJSON.post("/elderly/delete", {
						elderlyid: elderlyid
					}).then(result => {
						alert(result.data.message);
						if (result.data.status == "OK") {
							this.getList();
						}
					});
				}
			}
		}
	}
</script>

<style>
</style>