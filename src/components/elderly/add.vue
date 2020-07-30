<template>
	<div class="box">
		<div class="box-header with-border">
			<h3 class="box-title">添加老人</h3>
		</div>
		<div class="box-body">
			<form method="post" v-on:submit.prevent="submitAdd">
				<div class="row">
					<div class="form-group col-md-2">
						<label for="exampleInputEmail1">老人编号</label>
						<input type="text" class="form-control" v-model="elderly.elderlyid" required>
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">姓名</label>
						<input type="text" class="form-control" v-model="elderly.eldername" required>
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">性别</label>
						<input type="text" class="form-control" v-model="elderly.eldersex" required>
					</div>
					<div class="form-group col-md-1">
						<label for="exampleInputPassword1">年龄</label>
						<input type="number" class="form-control" v-model="elderly.elderage">
					</div>
					<div class="form-group col-md-2">
						<label for="exampleInputPassword1">楼层</label>
						<select v-model="elderly.floor" class="form-control" v-on:change="updateRoom()">
							<option v-for="floor in floorList" v-bind:value="floor" v-bind:key="floor">{{floor}}</option>
						</select>
					</div>
					<div class="form-group col-md-2">
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
				</div>
				<div class="row">
					<div class="form-group col-md-2">
						<label for="inputAddress2">员工照片</label>
						<input type="file" class="form-control" name="elderlyPhoto" v-on:change="changePhoto($event)">
					</div>
				</div>
				<div>
					<button type="submit" class="btn btn-primary">提交</button>
					<router-link to="/elderly/list" class="btn btn-default">取消</router-link>
				</div>
			</form>

		</div>
		<!-- /.box-body -->
	</div>
</template>

<script>
	export default {
		name: "ElderlyAdd",
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
			this.getFloorList();
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
				console.log(this.elderly.floor);
				console.log(this.elderly.room);
				
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
			add() {
				console.log(this.elderly);
				this.axiosJSON.post("/elderly/add", this.elderly).then(result => {
					if (result.data.status == "OK") {
						alert(result.data.message);
						this.$router.push("/elderly/list"); // 编程方式跳转
					} else {
						alert(result.data.message);
					}
				});
			},
			changePhoto(event) { //图片选择的处理
				this.elderlyPhoto = event.target.files[0];
			},
			submitAdd() { //增加员工提交处理
				let formData = new FormData();
				formData.append("elderlyid", this.elderly.elderlyid);
				formData.append("eldername", this.elderly.eldername);
				formData.append("eldersex", this.elderly.eldersex);
				formData.append("elderage", this.elderly.elderage);
				formData.append("floor", this.elderly.floor);
				formData.append("room", this.elderly.room);
				formData.append("bed", this.elderly.bed);
				formData.append("elderlyPhoto", this.elderlyPhoto);
				this.axiosUpload.post("/elderly/add", formData).then(result => {
					alert(result.data.message);
					if (result.data.status == "OK") {
						this.$router.push("/elderly/list");
					}
				});
			}
		}
	}
</script>

<style>
</style>