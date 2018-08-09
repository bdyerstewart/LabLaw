function retmulti(selObj)
{
  var selectedArray = new Array();
  var retval = "";
  var i;
  var count = 0;
  for (i=0; i<selObj.options.length; i++) {
    if (selObj.options[i].selected) {
      selectedArray[count] = selObj.options[i].value;
      count++;
    }
  }
  retval = selectedArray;
  return retval	
}

// Here's the meat of the new CKEditor InsertGuidelines button
// We'll create a div and create a form on it to allow the user to choose:
//	One or more % of guideline columns
//  Income period to display - Annual, Monthly or weekly
// The form is created by creating a variable with the HTML as text and then using the InnerHTML property 
// Submitting this form drops a customized javascript call into the underlying text field we're editing through FCKEditor
//  with a PovertyGuidelines link to visually hold the space
function getGuides()
{
    var newDiv = document.createElement("div");
    newDiv.id = "newDiv"
    //newDiv.style.display = "block"
    document.body.appendChild(newDiv)
    document.getElementById("newDiv").style.display = "Block"

    var txt = '<div id="getpref" align="center" style="width:420px;background:#E2CA8C;position:absolute;top:0px;left:50px;">'
    txt = txt + '<form name="myform">'
    txt = txt + '<table width="100%" border="1" cellpadding="5" cellspacing="3">'
    txt = txt + '<tr width="100%" align="center">'
    txt = txt + '<td colspan="2" valign="middle">'
    txt = txt + '<h3>Please select information to configure Poverty Guideline Table</h3>'
    txt = txt + '</td>'
    txt = txt + '</tr>'
    txt = txt + '<tr>'
    txt = txt + '<td><h4>% of Federal Guidelines</h4>'
    txt = txt + "Multiple values can be selected<br>"
    txt = txt + "by holding the CTRL button as you click<br>"
    txt = txt + '</td>'
    txt = txt + '<td>'
    txt = txt + '<select name="percent" multiple>'
    txt = txt + '<option value="100">100%</option>'
    txt = txt + '<option value="125">125%</option>'
    txt = txt + '<option value="130">130%</option>'
    txt = txt + '<option value="133">133%</option>'
    txt = txt + '<option value="150">150%</option>'
    txt = txt + '<option value="165">165%</option>'
    txt = txt + '<option value="170">170%</option>'
    txt = txt + '<option value="185">185%</option>'
    txt = txt + '<option value="200">200%</option>'
    txt = txt + '<option value="250">250%</option>'
    txt = txt + '<option value="300">300%</option>'
    txt = txt + '<option value="350">350%</option>'
    txt = txt + '</select>'
    txt = txt + '</td>'
    txt = txt + '</tr>'
    txt = txt + '<tr>'
    txt = txt + '<td><h4>Income Period</h4>'
    txt = txt + '</td>'
    txt = txt + '<td>'
    txt = txt + '<select name="period">'
    txt = txt + '<option value="annual">Annual</option>'
    txt = txt + '<option value="monthly">Monthly</option>'
    txt = txt + '<option value="weekly">Weekly</option>'
    txt = txt + '</select>'
    txt = txt + '</td>'
    txt = txt + '</tr>'
    txt = txt + '<tr align="center">'
    txt = txt + '<td colspan="2" valign="middle">'

    txt = txt + '<input name="finish" type="button" value="OK" onClick="gtguidelines(retmulti(document.myform.percent),document.myform.period.value)"></input>'

    txt = txt + '</td>'
    txt = txt + '</tr>'
    txt = txt + '</table>'
    txt = txt + '</form>'
    txt = txt + '</div>'

    document.getElementById("newDiv").innerHTML = txt
}


function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
	o[a[i]]='';
  }
  return o;
}

// This function returns HTML to drop in the body of the FCKEditor 
function gtguidelines(percent,period,lnoheader)
{
document.getElementById("getpref").style.visibility = "hidden"
var ctext = '<script type="text/javascript" src="http://statesidelegal.org/documents/currentGuidelines.js"></script>' ;
ctext = ctext + '<script type="text/javascript" src="http://statesidelegal.org/includecontent.js"></script>' ;
ctext = ctext + '<div id="guidediv" align="center">' ;
ctext = ctext + '<a href="../povertyguidelines.htm">Poverty Guidelines</a>' ;
ctext = ctext + '<script type="text/javascript"> getguidelines([' + percent + '],"' + period + '")</script></div>' ;
alert(ctext);

//var oEditor = FCKeditorAPI.GetInstance('oFCK_1') ;
var myEditor = CKEDITOR.instances.editor1;

  //insert the time into the HTML source code
myEditor.insertHtml(t);

// 
function formatCurrency(Num) 
{
	Num = '' + parseInt(Num);
	var temp1 = '';
	var temp2 = '';
	var count = 0;
	for (var k = Num.length-1; k >= 0; k--) {
		var oneChar = Num.charAt(k);
		if (count == 3) {
			temp1 += ',';
			temp1 += oneChar;
			count = 1;
		continue;
		}
		else {
			temp1 += oneChar;
			count ++;
			}
	}
	for (var k = temp1.length-1; k >= 0; k--) {
		var oneChar = temp1.charAt(k);
		temp2 += oneChar;
	}
	temp2 = '$' + temp2;
	return temp2
}
