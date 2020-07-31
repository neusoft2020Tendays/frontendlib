<template>
<!-- Default box -->
<div class="box">
<div class="box-header with-border">
  <h3 class="box-title">查看床位</h3>
</div>
<div class="box-body">
	<form  method="post" >
	  <div class="form-group">
		<label for="exampleInputEmail1">楼层</label>
		<span>{{ward.floor}}</span>
		
	  </div>
	  <div class="form-group">
		<label for="exampleInputPassword1">房间号</label>
		<span>{{ward.room}}</span>
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputEmail1">床位号</label>
	  		<span>{{ward.bed}}</span>
	  		
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputEmail1">老人编号</label>
	  		<span>{{ward.elderly.elderlyid}}</span>
	  		
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputEmail1">年龄</label>
	  		<span>{{ward.elderly.elderlyage}}</span>
	  		
	  </div>
	  <div class="form-group">
	  		<label for="exampleInputEmail1">性别</label>
	  		<span>{{ward.elderly.elderlysex}}</span>
	  		
	  </div>
	  <router-link to="/department/list" class="btn btn-default">返回</router-link>
	</form>

</div>
<!-- /.box-body -->
</div>
<!-- /.box -->
</template>

<script>
	//部门查看组件
	export default {
		name:"WardView",
		data(){
			return {
				ward:{}
			};
		},
		props:{
			floor:{required:true},
			room:{required:true},
			bed:{required:true}
		},
		created(){ //组件的创建生命周期函数
			this.getWard();
		},
		methods:{
			getWard(){
				this.axiosJSON.get("/ward/get",{
					params:{
						floor:this.floor,
						room:this.room,
						bed:this.bed
					}
				}).then(result=>{
					this.ward=result.data.result;
				});
			}
		}
	}
</script>

<style>
</style>