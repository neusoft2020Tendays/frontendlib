<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">老人详细信息</h3>
		</div>
		<div class="box-body">
			<form method="post">
				<div class="row">
					<div class="form-group col-md-6">
						<div style="font-size: 20px;">
							<label class="col-md-4">老人编号</label>
							<span class="col-md-8">{{$route.params.elderlyid}}</span>
						</div>
					</div>
					<div class="form-group col-md-6">
						<div style="font-size: 20px;">
							<label class="col-md-4">姓名</label>
							<span class="col-md-8">{{elderly.eldername}}</span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-6">
						<div style="font-size: 20px;">
							<label class="col-md-4">性别</label>
							<span class="col-md-8">{{elderly.eldersex}}</span>
						</div>
					</div>
					<div class="form-group col-md-6">
						<div style="font-size: 20px;">
							<label class="col-md-4">年龄</label>
							<span class="col-md-8">{{elderly.elderage}}</span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-4">
						<div style="font-size: 20px;">
							<label class="col-md-4">楼层</label>
							<span class="col-md-6">{{elderly.floor}}</span>
						</div>
					</div>
					<div class="form-group col-md-4">
						<div style="font-size: 20px;">
							<label class="col-md-4">房间</label>
							<span class="col-md-6">{{elderly.room}}</span>
						</div>
					</div>
					<div class="form-group col-md-4">
						<div style="font-size: 20px;">
							<label class="col-md-4">床位</label>
							<span class="col-md-6">{{elderly.bed}}</span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-group col-md-8">
						<div style="font-size: 20px;">
							<label class="col-md-2">照片</label>
						</div>
						<span v-show="elderly.photoFileName!=null" class="col-md-10">
							<img v-bind:src="photoUrl" style="width: 100%; height: auto;" />
							<!-- <img v-bind:src="restPhotoUrl" width="400" height="350" /> -->
						</span>
						<span v-show="elderly.photoFileName==null">
							无图片
						</span>
					</div>
				</div>
				<router-link to="/elderly/list" class="btn btn-default">返回</router-link>
			</form>
		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	//员工详细显示组件
	import MainConfig from "./../../config/index.js";
	export default {
		name: "ElderlyView",
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
				photoUrl: "",
				restPhotoUrl: "",
			};
		},
		created() {
			let elderlyid = this.$route.params.elderlyid;
			this.getElderly(elderlyid);
		},
		methods: {
			getElderly(elderlyid) {
				this.axiosJSON.get("/elderly/get?id=" + elderlyid).then(result => {
					if (result.data.status == "OK") {
						this.elderly = result.data.result;
						if (this.elderly.photoFileName != null) {
							this.photoUrl = MainConfig.photoRootUrl + this.elderly.photoFileName;
							// this.restPhotoUrl = MainConfig.photoRootUrl + "elderly/photo?id=" + this.elderlyid;
						}
					} else {
						alert(result.data.message);
					}
				});
			}
		}
	}
</script>

<style>
</style>