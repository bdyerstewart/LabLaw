CKEDITOR.plugins.add('showtime',   //name of our plugin
{    
  init:function(a) {
  var b="getGuides";
//  var c=a.addCommand(b,new CKEDITOR.dialogCommand(b));
//  c.modes={wysiwyg:1,source:1}; //Enable our plugin in both modes
//  c.canUndo=true;

  //add new button to the editor
  a.ui.addButton("includeguidelines",
  {
   label:'Insert Federal Poverty Guidelines',
   command:b,
   icon:this.path+"images/money.gif"
  });
  CKEDITOR.dialog.add(b,this.path+"dialogs/guidelines.js") //path of our dialog file
 }
});