<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">收费管理</h3>
		</div>
		<div class="row">
			<div class="form-group col-md-1"></div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">数额从</label>
				<input type="number" class="form-control" v-model="minMoney" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-1">
				<label for="inputEmail4">数额至</label>
				<input type="number" class="form-control" v-model="maxMoney" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-2">
				<label for="inputEmail4">时间从</label>
				<input type="date" class="form-control" v-model="minDate" v-on:change="getListByCondition">
			</div>
			<div class="form-group col-md-2">
				<label for="inputEmail4">时间至</label>
				<input type="date" class="form-control" v-model="maxDate" v-on:change="getListByCondition">
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
						<th scope="col">账单编号</th>
						<th scope="col">姓名</th>
						<th scope="col">老人编码</th>
						<th scope="col">数额</th>
						<th scope="col">时间</th>
						<th scope="col">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="cost in costList" v-bind:key="cost.costid">
						<td>{{cost.costId}}</td>
						<td>{{cost.elderly.eldername }}</td>
						<td>{{cost.elderly.elderlyid }}</td>
						<td>{{cost.costAmount }}</td>
						<td>{{cost.time}}</td>
						<td>
							<router-link v-bind:to="'/cost/modify/' + cost.costId" class="btn btn-default">修改</router-link>
							<a href="#" v-on:click="deleteCost(cost.costId)" class="btn btn-danger">删除</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- /.box-body -->
		<router-link to="/cost/add" class="btn btn-default">添加收费记录</router-link>
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
				costList: [],
				page: 1,
				rows: 5,
				count: 0,
				pageCount: 0,
				startpage: 0,
				minMoney: 0,
				maxMoney: 0,
				minDate:null,
				maxDate:null,
				elderlyid:null,
				nameKey: "",
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
				this.axiosJSON.get("/cost/list/condition/page", {
					params:{
						rows: this.rows,
						page: this.page,
						minMoney: this.minMoney,
						maxMoney: this.maxMoney,
						minDate:this.minDate,
						maxDate:this.maxDate,
						elderlyid:this.elderlyid,
						nameKey: this.nameKey,
						}
				}).then(result => {
					console.log(result)
					this.costList = result.data.list;
					let ii=0;
					for(ii = 0;ii<this.costList.length;ii++){
						if(this.costList[ii].elderly==null){
							this.costList[ii].elderly={elderlyid:"null",eldername:"null"};
						}
					}
					if(this.costList.elderly)
					this.count = result.data.count;
					this.pageCount = result.data.pageCount;
				});
			},
			getListByCondition() {
				this.axiosJSON.get("/cost/list/condition/page", {
					params: {
						rows: this.rows,
						page: this.page,
						minMoney: this.minMoney,
						maxMoney: this.maxMoney,
						minDate:this.minDate,
						maxDate:this.maxDate,
						elderlyid:this.elderlyid,
						nameKey: this.nameKey
					}
				}).then(result => {
					if (result.data.status == "OK") {
						this.costList = result.data.list;
						this.count = result.data.count;
						this.pageCount = result.data.pageCount;
					}
				});
			},
			deleteCost(costid) {
				let checkResult = confirm("您确认要删除该条记录吗吗？");
				if (checkResult) {
					console.log("costid"+costid)
					this.axiosJSON.post("/cost/delete", {
						costId: costid
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
