<?php
error_reporting(E_WARNING^E_ERROR);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<head>
	
		<title>IndoBlockly</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="Damar" content="IndoBlockly" />
<link rel="stylesheet" type="text/css" href="layout/menu-dropdown1/pro_drop_1.css" />
<script src="layout/menu-dropdown1/stuHover.js" type="text/javascript"></script>
		
<!--js-css blocklynya-->	
<link rel="stylesheet" href="../code/layout/css-body/css-id.css" type="text/css" />
<script type="text/javascript" src="../code/blockly-jsframe/BlobBuilder.min.js"></script>
<script type="text/javascript" src="../code/blockly-jsframe/FileSaver.min.js"></script>
						<?php
						
						
						if ($_GET['hal'] == 'en') {
						?>		<!--ini dikirim dengan 'en' untuk english-->
								<script type="text/javascript" src="../code/blockly-jsframe/js-index-dkluarkan.js"></script>
						<?php
						}
						else {
						?><!--default dengan indonesia-->		  
								<script type="text/javascript" src="../code/blockly-jsframe/js-index-dkluarkan-indo.js"></script>
						<?php
						}
						?> 
<!--dialogwork-->
	<link rel="stylesheet" type="text/css" href="codebase/dhtmlxwindows.css">
	<link rel="stylesheet" type="text/css" href="codebase/skins/dhtmlxwindows_dhx_skyblue.css">
	<script src="codebase/dhtmlxcommon.js"></script>
	<script src="codebase/dhtmlxwindows.js"></script>
	<script src="codebase/dhtmlxcontainer.js"></script>
	
<script language="javascript">
function popup()
{
    popupWindow = window.showModalDialog('http://blockly.developers.or.id/blog','Library','width=350,height=400,left=500,top=100');
    popupWindow.focus();
}
</script>	
	</head>
	<body onload="doOnLoad();">
<header>
<div id="atas">
<ul id="nav">
	<li class="top"><a id="products" class="top_link"><span class="down"><u>F</u>ile</span></a>
		<ul class="sub">
			<li><a class="fly"><img src="../code/layout/icon/puzle.gif" width="12" height="12" />&nbsp;Blockly</a>
					<ul>
						<li><a href="../code/index.php" onclick="winblockly.show();">IndoBlockly</a></li>
						<li><a href="../maze/" onclick="discard()">Maze</a></li>
					</ul>
			</li>
			<li><a href="#" onclick="discard(); winblockly.show();"><img src="../code/layout/icon/page_white.png" width="12" height="12"/>&nbsp;New</a></li>
			<li><a href="#" onclick="save()"><img src="../code/layout/icon/save1.gif" width="12" height="12" />&nbsp;Save</a></li>
			<li><a href="#" onclick="discard()"><img src="../code/layout/icon/clear.png" width="12" height="12" />&nbsp;Clear All</a></li>
			<li><a href="../../"><img src="../code/layout/icon/close.png" width="12" height="12" />&nbsp;Close</a></li>
			<li><a href="about:home"><img src="../code/layout/icon/246.png" width="12" height="12" />&nbsp;Exit</a></li>
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
			<li><a class="fly">Dialog Tool</a>
					<ul>		
						<li><a href="#" value="Hide #2 Header" onclick="hideHeader();">Hide Header</a></li>
						<li><a href="#" value="Show #2 Header" onclick="showHeader();">Show Header</a></li>
					</ul>
			</li>		
		</ul>
	</li>
	<li class="top"><a id="products" class="top_link"><span class="down"><u>B</u>uild</span></a>
		<ul class="sub">
			<li><a href="#" onClick="window.location.reload(true);"><img src="../code/layout/icon/compile.png" width="12" height="12" />&nbsp;Compile</a></li>
			<li><a href="#" onclick="runJS()"><img src="../code/layout/icon/run.gif" width="12" height="12" />&nbsp;Run</a></li>
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
	<li class="top"><a id="privacy" class="top_link" onclick="popup()"><span><u>L</u>ibrary</span></a></li>
</ul>
</div>

<div id="atas2">
<div style="margin: 1px 0px 1px 10px">
						<?php
						//error_reporting (0);
						if ($_GET['hal'] == 'en') {
						?>		<!--ini dikirim dengan 'en' untuk english-->
	<button class="launch" onclick="discard()" title="Create New"><img src="../code/layout/icon/page_white.png" width="16" height="17"/></button>
	<button class="launch" id="fakeload" title="Open File"><img src="../code/layout/icon/open-file.png" width="16" height="17" /></button><input type="file" id="load" style="display: none;"/>	         
    <button class="launch" onclick="save()" title="Save"><img src="../code/layout/icon/save1.gif" width="16" height="17" /></button>
    <button class="launch" onClick="window.location.reload(true);" title="Reload"><img src="../code/layout/icon/reload.png" width="16" height="17" /></button>	 			  
      <button class="launch" id="runButton" onclick="runJS();" title="Run Program"><img src="../code/layout/icon/run.gif" width="16" height="17"/></button>
      <button class="launch" id="resetButton" onclick="Maze.resetButtonClick();" style="display: none" title="Stop"><img src="../code/layout/icon/Stop red.png" width="16" height="17"/></button>
      <button class="launch" onclick="window.location.reload(true); popup();" style="text-decoration: none;" title="View Source Code"><img src="../code/layout/icon/viewsource.png" width="16" height="17"/></button>
      <button class="disable" onclick="tampilCustomPeta();" style="text-decoration: none;" title="Create Map"><img src="../code/layout/icon/disable-map.png" width="16" height="17"/></button>
						<?php
						}
						else {
						?><!--default dengan indonesia-->		  
	<button class="launch" onclick="discard()" title="Buat Baru"><img src="../code/layout/icon/page_white.png" width="16" height="17"/></button>
	<button class="launch" id="fakeload" title="Buka File"><img src="../code/layout/icon/open-file.png" width="16" height="17" /></button><input type="file" id="load" style="display: none;"/>	         
    <button class="launch" onclick="save()" title="Simpan"><img src="../code/layout/icon/save1.gif" width="16" height="17" /></button>
    <button class="launch" onClick="window.location.reload(true);" title="Muat Ulang"><img src="../code/layout/icon/reload.png" width="16" height="17" /></button>	 			  
      <button class="launch" id="runButton" onclick="runJS();" title="Jalankan Program"><img src="../code/layout/icon/run.gif" width="16" height="17"/></button>
      <button class="launch" id="resetButton" onclick="Maze.resetButtonClick();" style="display: none" title="Berhenti"><img src="../code/layout/icon/Stop red.png" width="16" height="17"/></button>
      <button class="disable" onclick="" style="text-decoration: none;" title="Lihat Kode"><img src="../code/layout/icon/disable-viewsource.png" width="16" height="17"/></button>
      <button class="disable" onclick="tampilCustomPeta();" style="text-decoration: none;" title="Buat Map"><img src="../code/layout/icon/disable-map.png" width="16" height="17"/></button>			
						<?php
						}
						?>  
</div>
</div>
</header>	
	
<div id="blocklyframe" style="font-family: Tahoma; font-size: 15px; height:100%; overflow: auto;">
<div style="margin: 0px 2px 0px 0px;">
  <table height="100%" width="100%">
    <tr>
      <td>
        <table>
          <tr id="tabRow" height="1em">
            <td id="tab_blocks" class="tabon" onclick="tabClick(this.id)" width="29%">Blockly</td>
            <td class="tabmin">&nbsp;</td>
            <td id="tab_javascript" class="taboff" onclick="tabClick(this.id)">JavaScript</td>
            <td class="tabmin">&nbsp;</td>
            <td id="tab_dart" class="taboff" onclick="tabClick(this.id)">C</td>
            <td class="tabmin">&nbsp;</td>
            <td id="tab_python" class="taboff" onclick="tabClick(this.id)">Pascal</td>
            <td class="tabmin">&nbsp;</td>
            <td id="tab_xml" class="taboff" onclick="tabClick(this.id)">XML</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td height="600px">
						<?php
						// aku pake $_get ,jika kondisi nya dikasi nilai (*diatas button) hal == 'id' maka ini bawah
						//error_reporting (0);
						if ($_GET['hal'] == 'en') {
						?>		<!--ini dikirim dengan 'en' untuk english-->
								<iframe id="content_blocks" src="../code/blockly-jsframe/frame.php"></iframe>
						<?php
						}else{?><!--default dengan indonesia-->		  
								<iframe id="content_blocks" src="../code/blockly-jsframe/frame-id.php"></iframe>
						<?php
						}
						?>							
								<textarea hidden id="content_javascript" class="bgsource" onclick="selectjs()"></textarea>
								<textarea hidden id="content_dart" class="bgsource" onclick="selectdart()"></textarea>
								<textarea hidden id="content_python" class="bgsource" onclick="selectpython()"></textarea>
								<div id="content_xml">
								  <textarea id="textarea_xml" onclick="selectxml()"></textarea>
								</div>
      </td>
    </tr>
  </table>
</div>
<span style="margin: 0px 0px 0px 5px; color:#96C2F1;">Indonesian Visual Block Programming</span>
</div>
<div id="winblockly" style="position: relative; top:60px; height: 700px; border: #cecece 0px solid; margin: 3px;"></div>
<script>
	var dhxWins, w1, w2;
	function doOnLoad() {
		dhxWins = new dhtmlXWindows();
		dhxWins.enableAutoViewport(false);
		dhxWins.attachViewportTo("winblockly");
		//dhxWins.setImagePath("codebase/imgs/");
		w2 = dhxWins.createWindow("w2", 220, 25, 900, 500);
		w2.setText("");//judul dialog IndoBlockly
		w2.button("close").hide();
		w2.attachObject("blocklyframe");
		var sb = w2.attachStatusBar();
		sb.setText("");//status block bawah Indonesian Visual Block Programming
	}
	function showHeader() {
		w2.showHeader();
	}
	function hideHeader() {
		w2.hideHeader();
	}
	
</script>
			
		
	</body>
</html>