1、切换到当前目录    cd */ysg-gis/

2、安装配置Python环境并创建简单web服务器 python -m SimpleHTTPServer

3、localhost:8000 

4、http://localhost:8000/index.html?minx=13583005.181519033&miny=3588127.4846051694&maxx=13583126.550945992&maxy=3588248.748467401

5、地图数据平移参数：x:111311.58 y:-7.626

6、geojson数据产生http://geojson.io/#map=15/30.6544/122.0258

7、	集卡 		1
	相机		2
	AGV			3
	桥吊		4
	轨道吊		5
	龙门吊		6
	轨迹路线	7
	报警信息	8
	实时		9
	

8、  "mouseover",        //鼠标位于对象或区域上
     "mouseout",         //鼠标移出
     "mousedown",        //鼠标按下
     "mouseup",          //鼠标抬起
     "mousemove",        //鼠标移动
     "click",            //鼠标单击    
     "dblclick",         //鼠标双击
     "rightclick",       //鼠标右击
     "dblrightclick",    //鼠标右键双击
     "resize",           //调整大小
     "focus",            //获得焦点
     "blur" ,			 //失去焦点
	 
9、菜单按钮：top:0.5em; size:1em;right:0.5em;0.5+2+0.5=3em +2.5em=5.5em

10、1,122.01489443, 30.65650568,1;2,122.01403612, 30.65722556,1;3,122.01296324, 30.65857303,1;4,1,122.01437944, 30.65789007,5;5,122.01978678, 30.65848074,1

11、地图样式
	polygon：
		<?xml version="1.0" encoding="ISO-8859-1"?>
		<StyledLayerDescriptor version="1.0.0"
		  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
		  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
		  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

		  <NamedLayer>
			<Name>ysg_bj1</Name>
			<UserStyle>
			  <Title>A red polygon style</Title>
			  <FeatureTypeStyle>
				<Rule>
				  <Title>red polygon</Title>
				  <PolygonSymbolizer>
					<Fill>
					  <CssParameter name="fill">#EFCDFA</CssParameter>
					  <CssParameter name="fill-opacity">1</CssParameter>
					</Fill>
					<Stroke>
					  <CssParameter name="stroke">#6E6E6E</CssParameter>
					  <CssParameter name="stroke-width">0.4</CssParameter>
					  <CssParameter name="stroke-opacity">1</CssParameter>
					</Stroke>
				  </PolygonSymbolizer>

				</Rule>

			  </FeatureTypeStyle>
			</UserStyle>
		  </NamedLayer>
		</StyledLayerDescriptor>
	
	集装箱：
		<?xml version="1.0" encoding="ISO-8859-1"?>
		<StyledLayerDescriptor version="1.0.0"
		  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
		  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
		  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

		  <NamedLayer>
			<Name>ysg_jzx</Name>
			<UserStyle>
			  <Title>A cyan polygon style</Title>
			  <FeatureTypeStyle>
				<Rule>
				  <Title>cyan polygon</Title>
				  <MinScaleDenominator>10.0</MinScaleDenominator>  
					  <MaxScaleDenominator>6000.0</MaxScaleDenominator> 
				  <PolygonSymbolizer>
					<Fill>
					  <CssParameter name="fill">#F7F2D2
					  </CssParameter>
					  <CssParameter name="fill-opacity">1</CssParameter>
					</Fill>
					<Stroke>
					  <CssParameter name="stroke">#6E6E6E</CssParameter>
					  <CssParameter name="stroke-width">0.4</CssParameter>
					  <CssParameter name="fill-opacity">1</CssParameter>
					</Stroke>
				  </PolygonSymbolizer>

				</Rule>

			  </FeatureTypeStyle>
			</UserStyle>
		  </NamedLayer>
		 </StyledLayerDescriptor>
	设备点：
		<?xml version="1.0" encoding="ISO-8859-1"?>
		<StyledLayerDescriptor version="1.0.0"
		  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
		  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
		  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

		  <NamedLayer>
			<Name>ysg_shebei</Name>
			<UserStyle>
			  <Title>orange square point style</Title>
			  <FeatureTypeStyle>
				<Rule>
				  <Title>orange point</Title>
				  <MinScaleDenominator>60.0</MinScaleDenominator>  
					  <MaxScaleDenominator>20000.0</MaxScaleDenominator> 
				  <PointSymbolizer>
					<Graphic>
					  <Mark>
						<WellKnownName>square</WellKnownName>
						<Fill>
						  <CssParameter name="fill">#009E89</CssParameter>
						</Fill>
					  </Mark>
					  <Size>6</Size>
					</Graphic>
				  </PointSymbolizer>
				</Rule>

			  </FeatureTypeStyle>
			</UserStyle>
		  </NamedLayer>
		</StyledLayerDescriptor>
12、投影到UTM下的WGS84.123度带，也就是北半球的51N 
13、WGS_1984_Web_Mercator_Auxiliary_Sphere 
    Projection:	Mercator_Auxiliary_Sphere
14、http://blog.csdn.net/yangzhai/article/details/58586723 加载栅格地图
15、https://www.cnblogs.com/guaziren/p/3277548.html
16、插件地址：http://ares.boundlessgeo.com/geoserver/2.11.x/ext-latest/
17、https://www.cnblogs.com/escage/p/6513690.html
18、http://blog.csdn.net/gisshixisheng/article/details/78148576
