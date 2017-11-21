# -*- coding utf-8 *-


import urllib
import urllib.request



def GetCurrentAlarms(url):
	user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
	headers = { 'User-Agent' : user_agent }
	try:
		request = urllib.request.Request(url,headers = headers)
		response = urllib.request.urlopen(request)
		content = response.read().decode('utf-8')
		print (content)
	except urllib.request.URLError as e:
		if hasattr(e,'code'):
			print (e.code)
		if hasattr(e,'reason'):
			print (e.reason)
			
def GetCameras(url):
	GetCurrentAlarms(url)
			
if __name__ == '__main__':
	json = '{"UserId":"1"}'
	url = "http://192.168.5.239:59095/api/Data/GetUserConfig?json=%s" % json
	GetCameras(url)	
	url = "http://192.168.5.239:59095/api/Data/GetCameras"
	GetCameras(url)	

#集卡卡口添加信息
	#json = '{"Id":"1","PortDateTime":"2017-11-17 16:44:00","CarType":1,"PortType":1,"EntryOrExitPortType":1,"PortNumber":"第一道口","CarNumber":"京N 22222","ContainerNumber":"1","Wight":40.00,"DoublePosition":"505212","Parking":"第一停车场","MobilePhone":"18910806542"}'
	#url = "http://192.168.5.239:59095/api/Data/SaveUserConfig?json=%s" % json
	#GetCameras(url)
	
#用户添加、修改配置信息
	#json = '{"UserId":"1","MinX":1,"MinY":1,"MaxX":3,"MaxY":20.0}'
	#url = "http://192.168.5.239:59095/api/Data/SaveUserConfig?json=%s" % json
	#GetCameras(url)	
	
#获取用户配置信息
	#json = '{"UserId":"1"}'
	#url = "http://192.168.5.239:59095/api/Data/GetUserConfig?json=%s" % json
	#GetCameras(url)	
	
#测试实时车辆信息
#url = "http://192.168.5.239:59095/api/Data/GetCarContrail?carNumber=''"
#GetCameras(url)	

#测试车辆信息
#url = "http://192.168.5.239/api/Data/GetCurrentCars"
#GetCameras(url)
	
#测试增加相机
#json = '{"CameraId":"74","DeviceType":1,"CameraType":1,"DeviceName":"test","Longitude":20.0,"Latitude":15.0}'
#url = "http://192.168.5.239/api/Data/AddCamera?cameraInfoJson=%s" % json
#GetCameras(url)
#测试获取相机
#url = "http://192.168.5.239/api/Data/GetCameras"
#GetCameras(url)

#测试单个相机删除
	#url = "http://192.168.5.239:59095/api/Data/Clear?cameraId=74"
	#GetCameras(url)	
#测试相机修改	
	#json = '{"CameraId":"77","DeviceType":1,"CameraType":1,"DeviceName":"test7","Longitude":20.0,"Latitude":15.0}'
	#url = "http://192.168.5.239:59095/api/Data/UpdateCamera?cameraInfoJson=%s" % json
	
#测试报警信息	
#url = "http://192.168.5.239/api/Data/GetCurrentAlarms"
#GetCurrentAlarms(url)
#url = "http://192.168.5.239/api/Data/GetCurrentAlarms/1"
#GetCurrentAlarms(url)
#url = "http://192.168.5.239/api/Data/GetCurrentAlarms?alarmType=1"
#GetCurrentAlarms(url)
#url = "http://192.168.5.239/api/Data/GetAlarms?sdt=2017-10-26&edt=2017-10-26"
#GetCurrentAlarms(url)
#url = "http://192.168.5.239/api/Data/GetAlarms?alarmType=1&sdt=2017-10-27&edt=2017-10-27"
#GetCurrentAlarms(url)
