<html>
<head>
<meta charset="utf-8">
<title>IndoBlockly - Maze</title>
<meta name="Damar" content="IndoBlockly - Maze" />
<!--css blocklynya-->	
<link rel="stylesheet" href="../code/layout/css-body/css-id.css" type="text/css" />  
  
<!--js open,clear,load-->
<script type="text/javascript" src="js-index-dkluarkan.js"></script>
  
<!--panggil lib jquery-->
<script type="text/javascript" src="jquery-1.6.2.js"></script>
  
 <!--script jquery UI-->        
        <link rel="stylesheet" href="themes/base/jquery.ui.all.css">
        <script src="ui/jquery.ui.core.js"></script>       
	<script src="ui/jquery.ui.widget.js"></script>
	<script src="ui/jquery.ui.mouse.js"></script>
	<script src="ui/jquery.ui.button.js"></script>
	<script src="ui/jquery.ui.draggable.js"></script>
	<script src="ui/jquery.ui.position.js"></script>
	<script src="ui/jquery.ui.dialog.js"></script>
  
<!--script utama maze SALING BERDEPENDENSI!!! URUTAN HARUS maze.js-initjalan.js-custom_map.js -->
  <script type="text/javascript" src="maze.js"></script>
  <script type="text/javascript" src="initjalan.js"></script>  
  <script type="text/javascript" src="custom_map.js"></script>

  <script type="text/javascript">
      $(document).ready(function(){
          
          $("#csm").hide();
          custom_peta.inittabelmap();
          
        $("#maze_action").css("left","50px" );
        $("#maze_action").css("top","90px" );
        $("#blockly_engine").css("left","0px");
        $("#blockly_engine").css("top","90px");
         $("#toolbox").css("left","50px");
        $("#toolbox").css("bottom","50px");
        $("#toolbox").css("z-index","900");
        
         $("#maze_action").draggable({
             opacity:0.53,
             drag:function(event,ui){
                 
                 $("#blockly_engine").css("z-index", "499");
                 $("#maze_action").css("z-index", "500");
                 
             }
            
         });
          
          $("#blockly_engine").draggable({
              opacity:0.53,
              drag:function(event,ui){
                   
                  $("#maze_action").css("z-index", "499");
                 $("#blockly_engine").css("z-index", "500");
                
             }
          });
          
           $("#toolbox").draggable({
             opacity:0.53   
            });
          
            
          
      });
      
      function tampilCustomPeta(){
          custom_peta.reset();
          $(function() {
              $( "#csm" ).dialog({
                  width:500,
                  height:500,
                  draggable:true,
                  modal: true,
                  resizable:false,
                  closeText: 'hide'
                  
              });
          });
      }   
  </script>   
  <style>
    h1 {
      font-weight: normal;
      font-size: 140%;
     
    }
    
    h5{
        color:white;
		font-weight: bold;
        font-size: 100%;
        margin: 2px 0px 2px 15px;
    }
    #finish {
      position: absolute;
    }
    #pegman {
      position: absolute;
      background-image: url(pegman.png);
      
    }
    
   #blockly_engine{
		width: 900px;
		height: 450px;
		float:left;
        background: url(../code/layout/gambar/batik-bg.jpg);
        border: 2px solid #96C2F1;

    }
    #toolbox{
        border: 1px solid #96C2F1;
        padding:20px 5px 5px 5px;
        
/*        background: url(../code/layout/gambar/batik3.jpg);*/
    }
    
    #maze_action{
	width: 400px;
	height: 450px;
	float:left;
        border: 1px solid yellow;
        background: url(../code/layout/gambar/batik1.jpg);
    }
    
  </style>
  
<!--dropdown menu1-->
<link rel="stylesheet" type="text/css" href="../code/layout/menu-dropdown1/pro_drop_1.css" />
<script src="../code/layout/menu-dropdown1/stuHover.js" type="text/javascript"></script>

<script language="javascript">
function popup()
{
    popupWindow = window.showModalDialog('http://blockly.developers.or.id/blog','Library','width=350,height=400,left=500,top=100');
    popupWindow.focus();
}
</script>	
</head>
<body>
<header>
<div id="atas">
<ul id="nav">
	<li class="top"><a id="products" class="top_link"><span class="down"><u>F</u>ile</span></a>
		<ul class="sub">
			<li><a class="fly"><img src="../code/layout/icon/puzle.gif" width="12" height="12" />&nbsp;Blockly</a>
					<ul>
						<li><a href="../code/index.php">IndoBlockly</a></li>
						<li><a href="../maze/" onclick="discard()">Maze</a></li>
					</ul>
			</li>
			<li><a onclick="discard()"><img src="../code/layout/icon/page_white.png" width="12" height="12"/>&nbsp;New</a></li>
			<li><a href="#" class="disable" onclick="save()"><img src="../code/layout/icon/disable-save.gif" width="12" height="12" />&nbsp;Save</a></li>
			<li><a href="#" onclick="discard()"><img src="../code/layout/icon/clear.png" width="12" height="12" />&nbsp;Clear All</a></li>
			<li><a href=".."><img src="../code/layout/icon/close.png" width="12" height="12" />&nbsp;Close</a></li>
			<li><a href="../"><img src="../code/layout/icon/246.png" width="12" height="12" />&nbsp;Exit</a></li>
		</ul>
	</li>
	<li class="top"><a id="services" class="top_link"><span class="down"><u>S</u>etting</span></a>
		<ul class="sub">
			<li><a class="fly">Language</a>
					<ul>
						<!---ini bawah untuk translite jika di pencet,maka akan dkirim dg $_get dan nilai.nya 'id'-->
						<li><a href="index.php">Indonesia</a></li>
						<li><a href="index.php?hal=en">English</a></li>
					</ul>
			</li>		
			<li><a class="fly disable">Dialog Tool</a>
			</li>		
		</ul>
	</li>
	<li class="top"><a id="products" class="top_link"><span class="down"><u>B</u>uild</span></a>
		<ul class="sub">
			<li><a href="#" onClick="window.location.reload(true);"><img src="../code/layout/icon/compile.png" width="12" height="12" />&nbsp;Compile</a></li>
			<li><a href="#" onclick="Maze.runButtonClick();"><img src="../code/layout/icon/run.gif" width="12" height="12" />&nbsp;Run</a></li>
		</ul>
	</li>	
	<li class="top"><a id="contacts" class="top_link"><span class="down"><u>C</u>ontacts</span></a>
		<ul class="sub">
			<li><a href="https://www.facebook.com/indoblockly" target="new_blank">Facebook</a></li>
			<li><a href="https://twitter.com/IndoBlockly" target="new_blank">Twitter</a></li>
			<li><a href="http://blockly.developers.or.id/" target="new_blank">Website</a></li>
		</ul>
	</li>
	<li class="top"><a id="shop" class="top_link"><span class="down"><u>H</u>elp</span></a>
		<ul class="sub">
			<li><a href="https://groups.google.com/forum/?fromgroups#!forum/indoblockly" target="new_blank">Forum</a></li>
			<li><a href="http://blockly.developers.or.id/about-us" target="new_blank">About Us</a></li>
			<li><a href="http://blockly.developers.or.id/" target="new_blank">Update</a></li>
		</ul>
	</li>
	<li class="top"><a id="privacy" class="top_link" onclick="popup();"><span><u>L</u>ibrary</span></a></li>
</ul>
</div>

<div id="atas2">
<div style="margin: 2px 0px 0px 10px">
						<?php
						error_reporting (0);
						if ($_GET['hal'] == 'en') {
						?>		<!--ini dikirim dengan 'en' untuk english-->
<button class="launch" onclick="discard()" title="Create New"><img src="../code/layout/icon/page_white.png" width="16" height="17"/></button>
<button class="disable" id="fakeload" title="Open File"><img src="../code/layout/icon/disable-open.png" width="16" height="17" /></button><input type="file" id="load" style="display: none;"/>	         
<button class="disable" onclick="save()" title="Save"><img src="../code/layout/icon/disable-save.gif" width="16" height="17" /></button>
<button class="launch" onClick="window.location.reload(true);" title="Reload"><img src="../code/layout/icon/reload.png" width="16" height="17" /></button>	 			  
  <button class="launch" id="runButton" onclick="Maze.runButtonClick();" title="Run Program"><img src="../code/layout/icon/run.gif" width="16" height="17"/></button>
  <button class="launch" id="resetButton" onclick="Maze.resetButtonClick();" style="display: none" title="Stop Program"><img src="../code/layout/icon/Stop red.png" width="16" height="17"/></button>
  <button class="launch" onclick="Maze.showCode();" style="text-decoration: none;" title="View Source Code"><img src="../code/layout/icon/viewsource.png" width="16" height="17"/></button>
  <button class="launch" onclick="tampilCustomPeta();" style="text-decoration: none;" title="Create Map"><img src="../code/layout/icon/996985368574614663.png" width="16" height="17"/></button>						
    						<?php
						}
						else {
						?><!--default dengan indonesia-->		  
<button class="launch" onclick="discard()" title="Buat Baru"><img src="../code/layout/icon/page_white.png" width="16" height="17"/></button>
<button class="disable" id="fakeload" title="Buka File"><img src="../code/layout/icon/disable-open.png" width="16" height="17" /></button><input type="file" id="load" style="display: none;"/>	         
<button class="disable" onclick="save()" title="Simpan"><img src="../code/layout/icon/disable-save.gif" width="16" height="17" /></button>
<button class="launch" onClick="window.location.reload(true);" title="Muat Ulang"><img src="../code/layout/icon/reload.png" width="16" height="17" /></button>	 			  
  <button class="launch" id="runButton" onclick="Maze.runButtonClick();" title="Jalankan Program"><img src="../code/layout/icon/run.gif" width="16" height="17"/></button>
  <button class="launch" id="resetButton" onclick="Maze.resetButtonClick();" style="display: none" title="Hentikan Program"><img src="../code/layout/icon/Stop red.png" width="16" height="17"/></button>
  <button class="launch" onclick="Maze.showCode();" style="text-decoration: none;" title="Lihat Kode"><img src="../code/layout/icon/viewsource.png" width="16" height="17"/></button>
  <button class="launch" onclick="tampilCustomPeta();" style="text-decoration: none;" title="Buat Peta"><img src="../code/layout/icon/996985368574614663.png" width="16" height="17"/></button>						
  <?php
  }
  ?>
</div>
</div>
</header>

<div style="clear:both">

        <div id="blockly_engine">    
            <h5 class="handler2">IndoBlockly</h5>    
						<?php
						// aku pake $_get ,jika kondisi nya dikasi nilai (*diatas button) hal == 'id' maka ini bawah
						error_reporting (0);
						if ($_GET['hal'] == 'en') {
						?>		<!--ini dikirim dengan 'en' untuk english-->
								<iframe id="content_blocks" src="frame.php" style="max-height: 400px"></iframe>
						<?php
						}
						else {
						?><!--default dengan indonesia-->		  
								<iframe id="content_blocks" src="id-frame.php" style="max-height: 400px"></iframe>
						<?php
						}
						?>			
            
        </div>  
        
        <div id="maze_action">    
            <h5 class="handler1">MazeMap</h5>
            <div id="maze_main" style="">
                <img src="map_polos.png" height=400 width=400 id="map" style="padding-right: 10">
                <img src="marker.png" height=34 width=20 id="finish">
                <img src="1x1.gif" height=52 width=49 id="pegman">
            </div>
                
            <!--        <div id="buttonDiv">
                      <button id="runButton" onclick="Maze.runButtonClick();">Run Program</button>
                      <button id="resetButton" onclick="Maze.resetButtonClick();" style="display: none">&nbsp; Reset &nbsp;</button>
                    </div>
                    <a href="#" onclick="tampilCustomPeta();" style="text-decoration: none;">Bikin Peta</a>-->
        </div>
      

        
        <!--<div id="toolbox" style="position:absolute">
            <div>
            </div>
        </div>
		-->
    <div id="csm" title="">
        <div id="custommap">
        </div>
       <div style="position:absolute;top:350px;left:55px;">
        <button class="launch" onclick="custom_peta.reset();">Reset</button>
        <button class="launch" id="loadmap" onclick="custom_peta.pilih_start();">Pilih Start</button>
        <button class="launch" id="loadmap" onclick="custom_peta.pilih_finish();">Pilih Finish</button>
        <button class="launch" id="loadmap" onclick="custom_peta.load_map();">Proses</button>
       </div>
    </div>
        
   
</div>
</body>
</html>
