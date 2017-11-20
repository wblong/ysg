function LMYC() { var number = 8; var lbmc; for (i = 1; i <= number; i++) { lbmc = document.getElementById('LM' + i); lbmc.style.display = 'none'; } }
function ShowFLT(i,object) {
    var lbmc = document.getElementById('LM' + i);
    if (lbmc.style.display == 'none')
    {
        LMYC();
        lbmc.style.display = '';
    }
    else
    {
        lbmc.style.display = '';
    }
    if(i==1)
    {
        imgSrc = "../images/photo_16.png";
        
        CalibrationType = object.children[1].innerHTML;
        //判断表格是否存在
        var photoInfo = document.getElementById("photoInfo");
        if (photoInfo.innerHTML == "")
        {
            InterviewPhotoOm();
        }
       
    }
    else
    {
        CalibrationType = object.children[1].innerHTML;
        //获取列表信息
        InterviewBusinessService(CalibrationType);
    }

}
function InterviewBusinessService(CalibrationType)
{
   
    $.ajax({
        type: 'POST',
        url: '/ashx/BSCalibrationInfo.ashx?Method=BSCalibrationFun',
        dataType: 'json',
        data:"Type="+CalibrationType,
        cache: false,
        success: function (msg) {
           // CreatePhotoTable(msg);
        },
        error: function (err) {
            alert(err); 
        }


    });
}



//function $(d) { return document.getElementById(d); }