  $.ajax({
            type:"get",//post
            url:url,
            dataType:"json",
            success: function(data){
               
            },
            error:function(){  
                 alert('fail');  
            }  
        });
		[{"AlarmId":1,"AlarmType":1,"AlarmDateTime":"2017-11-08T10:43:56.9206796+08:00","Message":"2号冷藏箱未通电,请检查!","Longitude":122.019,"Latitude":30.658},
		 {"AlarmId":1,"AlarmType":2,"AlarmDateTime":"2017-11-09T10:43:56.9206796+08:00","Message":"1号卡口集卡停留时间较长","Longitude":122.019,"Latitude":30.658},
		 {"AlarmId":1,"AlarmType":1,"AlarmDateTime":"2017-11-10T10:43:56.9206796+08:00","Message":"1号卡口集卡停留时间较长","Longitude":122.019,"Latitude":30.658}]
		 报警信息-AlarmId-{all}-Message