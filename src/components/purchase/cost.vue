<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">老人账单记录</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">老人编号</label>
						<span class="col-md-4">{{$route.params.elderlyid}}</span>
					</div>
				</div>
				<div class="form-group">
					<div class="row" style="font-size: 20px;">
						<label class="col-md-2">姓名</label>
						<span class="col-md-4">{{department.name}}</span>
					</div>
				</div>
				<router-link to="/elderly/list" class="btn btn-default">返回</router-link>
			</form>
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
					elderage: "",
					floor: "",
					room: "",								
					bed: ""
				},
				bill: [],
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
				});
			},
			getCostByElderlyidWithPage(elderlyid) {
				this.axiosJSON.get("/cost/getCostElderlyidWithPage", {
					params: {
						page: this.page,
						rows: this.rows,
						elderlyid: this.elderly.elderlyid
					}
				}).then(result => {
					this.bill = result.data.result;
				})
			}
		}
	}
</script>

<style>
</style>
