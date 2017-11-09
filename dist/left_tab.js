// <div id="tab-query">
// 	<ul class="first">
// 	  <li> 
// 		   <a href="#">目录A</a>
// 		   <ul class="second">
// 				<li><a  href="##">二级目录A</a></li>
// 				<li><a  href="##">二级目录B</a></li>
// 		   </ul>
// 	  </li>
// 	  <li> 
// 		   <a href="#">目录B</a>
// 		   <ul class="second">
// 				<li><a  href="##">二级目录A</a>
// 					<div>
// 						<p>姓名：张三</p>
// 						<p>驾照：3333333</p>
// 						<p>手机:182333333</p>
// 		  			</div>			
// 				</li>
// 				<li><a  href="##">二级目录B</a>	
// 				</li>
// 		   </ul>
// 	  </li>
// 	</ul>
// </div>

  $(function(){
        
  	    $("#tab-query .first>li>a").click(function(){
  	    	//隐藏其他
  	    	 $("#tab-query .content").hide();
  	    	 $(this).parents().siblings().children(".second").hide();
  		     $(this).siblings(".second").toggle();
  		     
  		     
  		});
  	    $("#tab-query .second>li>a").click(function(){
  	    	 //隐藏其他的
  	         $(this).parents().siblings().children(".content").hide();
  	         $(this).siblings(".content").toggle();
  			
  		});
  		$("#tab-query").hover(function(){
  		    
  		    $("#tab-query .second").hide();
  		    },function(){
  		    $("#tab-query .content").hide();
  		  });
  });