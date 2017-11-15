$(function(){
	var start_time=new Date().Format("yyyy-MM-ddT00:00:00");  
	var end_time=new Date().Format("yyyy-MM-ddT23:59:59"); 
	$("#start_time").val(start_time);
	$("#end_time").val(end_time);
	$("#filter").click(function(){
		$(".content_panel").toggle();
		
	});
	// document.getElementById('queryform').addEventListener('submit', function (evt) {
	       
	//         console.log(this.start_time.value);
	//         console.log(this.end_time.value);
	//         console.log(this.jika.checked);
	//         console.log(this.camera.checked);
	//         //首先清除原有的所有要素
	//         $('#tab-query .first').empty();
	//         //jika
	//         if (this.jika.checked) {
	//         	//创建一级目录
	//         	var url="http://192.168.5.239/api/Data/GetCurrentCars?sdt={0}&edt={1}".format(this.start_time.value,this.end_time.value);
	//         	console.log(url);
	//         	$.ajax({
	//         	            type:"get",//post
	//         	            url:url,
	//         	            dataType:"json",
	//         	            success: function(data){
	//         	            	console.log(data);
	//         	            	QueryData(data,realTimeLayer,0);
	//         	            },
	//         	            error:function(){  
	//         	               console.log('fail');  
	//         	            }  
	//         	        });
	//         	//console.log("test");
	//         }
	        
			
	//     });
});