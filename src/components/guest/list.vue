<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">接待管理</h3>
		</div>
		<div class="row">
			<div class="form-group col-md-1"></div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">人数从</label>
				<input type="number" class="form-control" v-model="minNum" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">人数至</label>
				<input type="number" class="form-control" v-model="maxNum" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-2">
				<label for="inputPassword4">姓名检索</label>
				<input type="text" class="form-control" v-model="nameKey" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-2">
				<label for="inputPassword4">老人编码检索</label>
				<input type="text" class="form-control" v-model="elderlyid" v-on:change="getListByCondition">
			</div>
		</div>
		<div class="box-body">
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">访问编号</th>
						<th scope="col">姓名</th>
						<th scope="col">老人编码</th>
						<th scope="col">来访人数</th>
						<th scope="col">备注</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="guest in guestList" v-bind:key="guest.guestid">
						<td>{{guest.guestId}}</td>
						<td>{{guest.elderly.eldername }}</td>
						<td>{{guest.elderly.elderlyid }}</td>
						<td>{{guest.num }}</td>
						<td>{{guest.identity }}</td>
						<td>
							<router-link v-bind:to="'/guest/modify/' + guest.guestId" class="btn btn-default">修改</router-link>
							<a href="#" v-on:click="deleteGuest(guest.guestId)" class="btn btn-danger">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/guest/add" class="btn btn-default">添加收费记录</router-link>
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
				guestList: [],
				page: 1,
				rows: 5,
				count: 0,
				pageCount: 0,
				startpage: 0,
				minNum: 0,
				maxNum: 0,
				elderlyid:null,
				nameKey: "",
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
				this.axiosJSON.get("/guest/list/condition/page", {
					params:{
						rows: this.rows,
						page: this.page,
						minNum: this.minNum,
						maxNum: this.maxNum,
						elderlyid:this.elderlyid,
						nameKey: this.nameKey,
						}
				}).then(result => {
					console.log(result)
					this.guestList = result.data.list;
					let ii=0;
					for(ii = 0;ii<this.guestList.length;ii++){
						if(this.guestList[ii].elderly==null){
							this.guestList[ii].elderly={elderlyid:"null",eldername:"null"};
						}
					}
					if(this.guestList.elderly)
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			getListByCondition() {
				this.axiosJSON.get("/guest/list/condition/page", {
					params: {
						rows: this.rows,
						page: this.page,
						minNum: this.minNum,
						maxNum: this.maxNum,
						elderlyid:this.elderlyid,
						nameKey: this.nameKey
					}
				}).then(result => {
					if (result.data.status == "OK") {
						this.guestList = result.data.list;
						this.count = result.data.count;
						this.pageCount = result.data.pageCount;
					}
				});
			},
			deleteGuest(guestid) {
				let checkResult = confirm("您确认要删除该条记录吗吗？");
				if (checkResult) {
					console.log("guestid"+guestid)
					this.axiosJSON.post("/guest/delete", {
						guestId: guestid
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
