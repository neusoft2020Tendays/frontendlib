<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">床位管理</h3>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">楼层</th>
						<th scope="col">房间号</th>
						<th scope="col">床位号</th>
						<th scope="col">老人编号</th>
						<th scope="col">操作</th>						
					</tr>
				</thead>
				<tbody>
					<tr v-for="ward in wardList" v-bind:key="ward.floor">
						<td>{{ward.floor}}</td>
						<td>{{ward.room}}</td>
						<td>{{ward.bed}}</td>
						<td>{{ward.elderly.elderlyid}}</td>
						<td>
							<router-link v-bind:to="'/ward/modify/'+ward.no" class="btn btn-default">修改</router-link>
							<a href="#" v-on:click="deleteWard(ward.floor,ward.room,ward.bed)"  class="btn btn-danger">删除</a> 
							<router-link v-bind:to="{name:'wardview', params: {floor:ward.floor,room:ward.room,bed:ward.bed}}" class="btn btn-default">查看</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/ward/add" class="btn btn-default">添加床位</router-link>
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
		name: "WardList",
		data() {
			return {
				wardList:[],
				page: 1,
				rows: 5,
				count: 0,
				pageCount: 0,
				startpage: 0.,
				floor:"1F",
			};
		},
		created() { // 当前组件的生命周期方法
			this.getList();
			this.startpage = this.page < 3 ? 1 : this.page - 2;
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
				this.axiosJSON.get("/ward/list/all", {
					params: {
						floor:this.floor
					}
				}).then(result => {
					console.log(result)
					this.wardList = result.data.list;
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			deleteWard(floor,room,bed) {
				let checkResult = confirm("您确认要删除该床位吗？");
				if (checkResult) {
					this.axiosJSON.post("/ward/delete", {
						floor: floor,
						room: room,
						bed: bed
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
