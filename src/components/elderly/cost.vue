<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">老人账单记录</h3>
		</div>
		<div class="box-body">
			<div class="row" style="font-size: 20px;">
				<label class="col-md-1">编号</label>
				<span class="col-md-1">{{$route.params.elderlyid}}</span>
				<label class="col-md-1">姓名</label>
				<span class="col-md-4">{{elderly.eldername}}</span>
			</div>
			<p></p>
			<table class="table table-bordered">
				<thead>
					<tr>
						<th scope="col">账单编号</th>
						<th scope="col">花费金额</th>
						<th scope="col">日期</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="bill in bills" v-bind:key="bill.time">
						<td>{{bill.costId}}</td>
						<td>{{bill.costAmount }}</td>
						<td>{{bill.time }}</td>
					</tr>
				</tbody>
			</table>

			<router-link to="/elderly/list" class="btn btn-default">返回</router-link>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ElderlyCost",
		data() {
			return {
				elderly: {
					elderlyid: "",
					eldername: "",
					eldersex: "",
					elderage: 0,
					floor: "",
					room: "",
					bed: ""
				},
				bills: [],
				page: 1,
				rows: 10,
				count: 0,
				pageCount: 0,
			};
		},
		created() {
			let elderlyid = this.$route.params.elderlyid;
			this.getElderly(elderlyid);
		},
		methods: {
			getElderly(elderlyid) {
				this.axiosJSON.get("/elderly/get?id=" + elderlyid).then(result => {
					this.elderly = result.data.result;
					this.getCostByElderlyidWithPage();
				});
			},
			getCostByElderlyidWithPage() {
				this.axiosJSON.get("/cost/list/all/page", {
					params: {
						page: this.page,
						rows: this.rows,
						id: this.elderly.elderlyid
					}
				}).then(result => {
					this.bills = result.data.list;
				});
			}
		}
	}
</script>

<style>
</style>