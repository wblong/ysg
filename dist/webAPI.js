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
		 [
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":1,"Id":1,"CarNumber":"沪A 00001","CarType":1,"UserInfo":{"Id":1,"UserName":"石头","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":{"Id":1,"ContainerNumber":"J00001","ContainerType":1,"StoreDateTime":"2017-11-11T10:55:47.4663204+08:00","StoreDuration":7,"Source":1,"Wight":100.0,"Region":1,"RoadWay":2,"PositionX":5,"PositionY":5,"PlaceState":1,"IsPower":false},"Longitude":122.019,"Latitude":30.655},
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":0,"Id":1,"CarNumber":"沪A 00001","CarType":1,"UserInfo":{"Id":1,"UserName":"石头","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":{"Id":1,"ContainerNumber":"J00001","ContainerType":1,"StoreDateTime":"2017-11-11T10:55:47.4663204+08:00","StoreDuration":7,"Source":1,"Wight":100.0,"Region":1,"RoadWay":2,"PositionX":5,"PositionY":5,"PlaceState":1,"IsPower":false},"Longitude":122.019,"Latitude":30.654},
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":1,"Id":1,"CarNumber":"沪A 00003","CarType":1,"UserInfo":{"Id":1,"UserName":"大王","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":{"Id":1,"ContainerNumber":"J00001","ContainerType":1,"StoreDateTime":"2017-11-11T10:55:47.4663204+08:00","StoreDuration":7,"Source":1,"Wight":100.0,"Region":1,"RoadWay":2,"PositionX":5,"PositionY":5,"PlaceState":1,"IsPower":false},"Longitude":122.019,"Latitude":20.0},
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":0,"Id":1,"CarNumber":"沪A 00003","CarType":1,"UserInfo":{"Id":1,"UserName":"大王","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":null,"Longitude":122.019,"Latitude":20.0},
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":1,"Id":1,"CarNumber":"沪A 00005","CarType":1,"UserInfo":{"Id":1,"UserName":"小马","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":null,"Longitude":122.019,"Latitude":20.0},
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":1,"Id":1,"CarNumber":"沪A 00006","CarType":1,"UserInfo":{"Id":1,"UserName":"小周","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":{"Id":1,"ContainerNumber":"J00001","ContainerType":1,"StoreDateTime":"2017-11-11T10:55:47.4663204+08:00","StoreDuration":7,"Source":1,"Wight":100.0,"Region":1,"RoadWay":2,"PositionX":5,"PositionY":5,"PlaceState":1,"IsPower":false},"Longitude":122.019,"Latitude":20.0},
{"EstimateDateTime":"2017-11-10T08:55:47.4663204+08:00","PortDateTime":"2017-11-10T09:55:47.4663204+08:00","EntryOrExitPortType":1,"Id":1,"CarNumber":"沪A 00007","CarType":0,"UserInfo":{"Id":1,"UserName":"张三","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":{"Id":1,"ContainerNumber":"J00001","ContainerType":1,"StoreDateTime":"2017-11-11T10:55:47.4663204+08:00","StoreDuration":7,"Source":1,"Wight":100.0,"Region":1,"RoadWay":2,"PositionX":5,"PositionY":5,"PlaceState":1,"IsPower":false},"Longitude":122.019,"Latitude":20.0},
{"EstimateDateTime":"2017-11-10T09:55:47.4663204+08:00","PortDateTime":"2017-11-10T10:55:47.4663204+08:00","EntryOrExitPortType":0,"Id":1,"CarNumber":"沪A 00007","CarType":0,"UserInfo":{"Id":1,"UserName":"张三","Tel":"18146500331","Longitude":122.019,"Latitude":30.658},"ContainerInfo":{"Id":1,"ContainerNumber":"J00001","ContainerType":1,"StoreDateTime":"2017-11-11T10:55:47.4663204+08:00","StoreDuration":7,"Source":1,"Wight":100.0,"Region":1,"RoadWay":2,"PositionX":5,"PositionY":5,"PlaceState":1,"IsPower":false},"Longitude":122.019,"Latitude":20.0}]