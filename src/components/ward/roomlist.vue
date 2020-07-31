<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">房间管理</h3>
		</div>
		<div class="row">
			<div class="form-group col-md-1"></div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">房间人数从</label>
				<input type="number" class="form-control" v-model="minNum" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">房间人数至</label>
				<input type="number" class="form-control" v-model="maxNum" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-2">
				<label for="inputPassword4">楼层</label>
				<select class="form-control" v-model="floor"  v-on:change="updateRoom(), getListByCondition()">
					<option value="所有楼层">所有楼层</option>
					<option v-for="floor in floorList" v-bind:key="floor" v-bind:value="floor">{{floor}}</option>
				</select>
			</div>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">房间</th>
						<th scope="col">床位1</th>
						<th scope="col">床位2</th>
						<th scope="col">床位3</th>
						<th scope="col">床位4</th>
						<th scope="col">床位5</th>
						<th scope="col">床位6</th>
						<th scope="col">人数</th>
					</tr>
				</thead>
				<!-- <tbody>
					<tr v-for="elderly in elderlyList" v-bind:key="elderly.elderlyid">
						<td>{{elderly.elderlyid}}</td>
						<td>{{elderly.eldername }}</td>
						<td>{{elderly.eldersex }}</td>
						<td>{{elderly.elderage }}</td>
						<td>{{elderly.floor }}</td>
						<td>{{elderly.room }}</td>
						<td>{{elderly.bed }}</td>
					</tr>
				</tbody> -->
				<tbody>
					<tr >
						<td>103</td>
						<td>e1036</td>
						<td></td>
						<td>e2068</td>
						<td></td>
						<td></td>
						<td></td>
						<td>2</td>
					</tr>
					<tr >
						<td>104</td>
						<td></td>
						<td></td>
						<td>e486</td>
						<td></td>
						<td>e1089</td>
						<td>e325</td>
						<td>3</td>
					</tr>
					<tr >
						<td>107</td>
						<td>e1058</td>
						<td></td>
						<td>e3157</td>
						<td>e2157</td>
						<td>e4123</td>
						<td></td>
						<td>4</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
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
			}
		}
	}
</script>

<style>
</style>
