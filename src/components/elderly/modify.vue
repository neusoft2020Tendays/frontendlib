<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">修改老人</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="submitModify()">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="exampleInputEmail1">老人编号</label>
						<input type="text" class="form-control" v-model="$route.params.elderlyid" readonly="readonly">
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">姓名</label>
						<input type="text" class="form-control" v-model="elderly.eldername" autofocus="true">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">性别</label>
						<input type="text" class="form-control" v-model="elderly.eldersex">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">年龄</label>
						<input type="number" class="form-control" v-model="elderly.elderage">
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">楼层</label>
						<select v-model="elderly.floor" class="form-control" v-on:change="updateRoom()">
							<option v-for="floor in floorList" v-bind:value="floor" v-bind:key="floor">{{floor}}</option>
						</select>
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">房间</label>
						<select v-model="elderly.room" class="form-control" v-on:change="updateBed()">
							<option v-for="room in roomList" v-bind:value="room" v-bind:key="room">{{room}}</option>
						</select>
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">床位</label>
						<select v-model="elderly.bed" class="form-control">
							<option v-for="bed in bedList" v-bind:value="bed" v-bind:key="bed">{{bed}}</option>
						</select>
					</div>
					<div class="form-group col-md-3">
						<div class="form-group">
							<label for="inputAddress2">员工照片</label>
							<input type="file" class="form-control" name="elderlyPhoto" v-on:change="changePhoto($event)">
						</div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">提交</button>
				<router-link to="/elderly/list" class="btn btn-default">取消</router-link>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ElderlyModify",
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
				elderlyPhoto: Object,
				floorList: [],
				roomList: [],
				bedList: []
			};
		},
		created() {
			let elderlyid = this.$route.params.elderlyid;
			this.getElderly(elderlyid);
			this.getFloorList();
			
			console.log(this.elderly.floor);
			this.updateRoom();
			this.updateBed();
		},
		methods: {
			getFloorList() {
				this.axiosJSON.get("/ward/floor").then(result => {
					if (result.data.status == "OK") {
						this.floorList = result.data.list;
					}
				});
			},
			updateRoom() {
				this.axiosJSON.get("/ward/room", {
					params: {
						floor: this.elderly.floor
					}
				}).then(result => {
					if (result.data.status == "OK") {
						this.roomList = result.data.list;
					}
				});
			},
			updateBed() {
				this.axiosJSON.get("/ward/bed", {
					params: {
						floor: this.elderly.floor,
						room: this.elderly.room
					}
				}).then(result => {
					if (result.data.status == "OK") {
						this.bedList = result.data.list;
					}
				});
				console.log(this.bedList);
			},
			getElderly(elderlyid) {
				this.axiosJSON.get("/elderly/get?id=" + elderlyid).then(result => {
					this.elderly = result.data.result;
				});
				console.log(this.elderly);
			},
			changePhoto(event){ //图片选择的处理
				this.elderlyPhoto=event.target.files[0];			
			},
			submitModify() {
				let formData = new FormData();
				console.log(this.elderly);
				formData.append("elderlyid", this.elderly.elderlyid);
				formData.append("eldername", this.elderly.eldername);
				formData.append("eldersex", this.elderly.eldersex);
				formData.append("elderage", this.elderly.elderage);
				formData.append("floor", this.elderly.floor);
				formData.append("room", this.elderly.room);
				formData.append("bed", this.elderly.bed);

				formData.append("elderlyPhoto", this.elderlyPhoto);
				console.log(this.elderlyPhoto);
				this.axiosUpload.post("/elderly/modify", formData).then(result => {
					alert(result.data.message);
					if (result.data.status == "OK") {
						this.$router.push("/elderly/list");
					}
				})
			}
		}
	}
</script>

<style>
</style>
