 /*! Virtualizor (c) (Softaculous Ltd.) virtualizor.com/license */

//////////////////
// CORE FUNCTIONS
//////////////////

// Element referencer - We use $ because we love PHP
function $_(id){
	//DOM
	if(document.getElementById){
		return document.getElementById(id);
	//IE
	}else if(document.all){
		return document.all[id];
	//NS4
	}else if(document.layers){
		return document.layers[id];
	}
};

String.prototype.pad = function(l, s, t){
    return s || (s = " "), (l -= this.length) > 0 ? (s = new Array(Math.ceil(l / s.length)
        + 1).join(s)).substr(0, t = !t ? l : t == 1 ? 0 : Math.ceil(l / 2))
        + this + s.substr(0, l - t) : this;
};

// PHP equivalent empty()
function empty(mixed_var) {

  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === 'object') {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}

// Format the date
function nDate(timestamp, format){
	format = format || '';
	if(!timestamp){
		return '<i>Never</i>';
	}
	var d = new Date(timestamp * 1000);
	
	if(format == ''){
		var ret = d.toUTCString();
		return ret.replace(" GMT", "");
	}
	
	var ret = format;
	ret = ret.replace("Y", d.getUTCFullYear());
	ret = ret.replace("m", (d.getUTCMonth()+1).toString().pad(2, "0"));
	ret = ret.replace("d", d.getUTCDate().toString().pad(2, "0"));
	ret = ret.replace("H", d.getUTCHours().toString().pad(2, "0"));
	ret = ret.replace("i", d.getUTCMinutes().toString().pad(2, "0"));
	ret = ret.replace("s", d.getUTCSeconds().toString().pad(2, "0"));
	return ret;
};

// Make the first character of every word to upper case
function ucwords(str){
	return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
		return $1.toUpperCase();
	});
};

// Generates a random string of "n" characters
function randstr(n, special){
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
	special = special || 0;
	if(special){
		possible = possible + '&#$%@';
	}
	
    for(var i=0; i < n; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

// Return the dirname of the path
function dirname(path) {
  return path.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
}


/////////////////////////
// APPLICATION FUNCTIONS
/////////////////////////

var act = '';
var prevact = '';
var N;
var isLoading = 0; // Page is loading
var Disconnected = 0; // Error Loading and hence disconnected
var currentPath = ''; // The current path where you are
var reloadData = 1; // Reload the data i.e. the dashboard data
var task_timeout = ''; // This is just a blank timer

$(document).ready(function(){
	var q = windowHASH();
	loadpage(q); // Load the Dashboard by default
});

// Shows the loading text
function Loading(show){
	
	Disconnected = 0; // By default we assume we are connected
	
	// Error loading
	if(show < 0){
		
		isLoading = 0;
		Disconnected = 1;
		
		// Show we are disconnected
		$("#loading").html('{{disconnected}}');
		$_('loading').style.left = ((document.body.clientWidth - $("#loading").width()) / 2).toString() + "px";
		$("#loading").show();
		
		return;
		
	}
	
	// Set the loading text
	$("#loading").html('{{loading}}');
	
	// Put it in the center
	$_('loading').style.left = ((document.body.clientWidth - $("#loading").width()) / 2).toString() + "px";
	
	// Are we already showing this ?
	if(show > 0 && isLoading > 0){
		
		return;
	
	// We need to show the bar
	} else if (show > 0 && isLoading < 1){
		
		isLoading = 1;
		$("#loading").show();
		return;
	
	// We need to hide the bar
	} else if (show < 1 && isLoading > 0){
		
		isLoading = 0;
		$("#loading").hide();
		return;
	}
	
};

// Our special ajax function which also shows the loading text
function AJAX(url, success, failure){
	
	Loading(1); // Show the loading text
	
	$.getJSON(url, function(data, textStatus, jqXHR) {
		
		Loading(0); // Hide the loading text
		
		// Is there a success function ?
		if(typeof success === 'function'){
			success(data, textStatus, jqXHR);
		}
		
	}).fail(function (data, textStatus, jqXHR){
		
		Loading(-1); // Hide the loading text
		//alert(data +' -- '+ textStatus + ' -- '+jqXHR)
		
		// Is there a failure function ?
		if(typeof failure === 'function'){
			failure();
		}
		
	});
	
};

// Submits a FORM
function POST(obj, submitresponse){
	
	submitresponse = submitresponse || 'DOESNT_EXIST';
	
	Loading(1); // Show the loading text
	
	obj['type'] = "POST";
	obj['dataType'] = "json";
	obj['success'] = function(data, textStatus, jqXHR) {
	
		Loading(0); // Hide the loading text
				
		// Is there an submitresponse function
		var fn = (typeof submitresponse != 'function' ? window[submitresponse]: submitresponse);
		
		// If its there, then call it
		if(typeof fn === 'function'){
			if(fn(data) == -1){
				return;
			}
		}
		
		// Handles the responses
		handleResponseData(data, obj['extradata']);
		
	};
	
	obj['xhrFields'] = {
		withCredentials: true
	};
		
	obj['crossDomain'] = true;
	
	$.ajax(obj);
	
	return true;
	
};

// Parse the variables
function parseVars(id, obj){
		
	$("#"+id+" [var]").each(function(){
		if($(this).attr('var') != "undefined"){
			
			// Remove the $
			var varname = $(this).attr('var');
			varname = varname.substring(1);
			
			// A tag (this is not in the if else !)
			if($(this).is("a") && $(this).attr("nhref") != "undefined"){
				
				$(this).attr("href", replaceVars($(this).attr("nhref"), obj));
			
			}
			
			// Input Text type
			if($(this).is("input") && ($(this).attr("type") == "text" || $(this).attr("type") == "password" || $(this).attr("type") == "hidden")){
				
				$(this).val(obj[varname]);
			
			// Input Text Checkbox
			}else if($(this).is("input") && $(this).attr("type") == "checkbox"){
				
				if(obj[varname]){
					if(obj[varname] != "" && obj[varname] != "0"){
						$(this).prop("checked", true);
					}
				}else{
					$(this).prop("checked", false);
				}
			
			// Select
			}else if($(this).is("select")){
				
				$(this).find('option').each(function() {
					if($(this).val() == obj[varname]){
						$(this).prop("selected", true);
					}else{
						$(this).prop("selected", false);
					}
				});
			
			// Direct tags
			}else{
				$(this).html(obj[varname]);
			}
		}
	});
	
};

// Replace the variables
function replaceVars(txt, obj){
	
	// Do we have an element instead of text
	var isObject = (typeof txt == "object");
	var text = (isObject ? txt.html() : txt);
	
	for(x in obj){
		
		if(typeof obj[x] != "string" && typeof obj[x] != "number"){
			continue;
		}
		
		text = text.replace("$"+x, obj[x]);
	}
	
	// If it was an object we simply put in the html and return
	if(isObject){
		txt.html(text);
		return;
	}
	
	// Return the text
	return text;
	
};

// Call a URL and display results
function call(url){
	
	// Make the request to restore
	AJAX('[[API]]'+url, function(data) {
		
		// Handle the data
		handleResponseData(data)

	});

};

function handleResponseData(data){	

		// Are there any errors ?
		if(typeof(data["error"]) != 'undefined'){
			error(data["error"]);
		}
		
		// Are we to show a success message ?
		if(typeof(data["done"]) != 'undefined'){
			done(data["done"]);
		}
			
		// Are we to get redirected ?
		if(typeof(data["redirect"]) != 'undefined'){
			redirect(data["redirect"]);
		}
			
		// Are we to get redirected ?
		if(typeof(data["goto"]) != 'undefined'){
			loadpage(data["goto"]);
	}
	
	if(typeof(data["euisoconfirm"]) != 'undefined'){
		delisokey(data["euisoconfirm"],1);
	}
	
};

// Gets the HASH of the browser
function windowHASH(){
	var hash = window.location.hash;
	
	// Is there a HASH ?
	if(hash.substring(0,1) == '#'){
		hash = hash.substring(1);
		if(hash.substring(0,1) == '!'){
			hash = hash.substring(1);
		}
	}
	
	return hash;
};

// Add a function for hash change
$(window).on('hashchange', function() {
	var currentHash = windowHASH();
	if(act != findACT(currentHash)){
		loadpage(currentHash);
	}
});

// Finds the act
function findACT(query){
	var ACT = '';
	var patt = /act\=(\w*)(&*)(.*)/g;
	var result = patt.exec(query);
	if(result != null){
		ACT = result[1];
	}
	return ACT;
};

// The page jumper box
function pagejump(ele, len, urlto, call_func){
	
	var offset = $(ele).offset();
	offset.left -= 5;
	offset.top += ele.offsetHeight + 2;
	//alert(offset.top+" - "+offset.left);
	call_func = call_func || 'loadpage';
	
	// Is there an ONSHOW function
	var isit_fn = window[call_func];
	
	var pageJumpTimer;
	
	$(ele).mouseout(function() {		
		pageJumpTimer = setTimeout("$('#pagejump').hide();", 100);
	});
	
	$("#pagejump :text").val('');
	
	$("#pagejump form").submit(function(event) {
		event.stopImmediatePropagation();
		val = $("#pagejump :text").val();
		val = parseInt(val);
		if(val > 0){
			
			if(typeof isit_fn === 'function'){
				isit_fn(urlto+(val-1));
			}else{
				loadpage(urlto+(val-1));
			}
			
			$('#pagejump').hide();
		}
		return false;	
	});
	
	$("#pagejump").mouseout(function() {		
		pageJumpTimer = setTimeout("$('#pagejump').hide();", 100);
	});
	
	$("#pagejump").mouseover(function() {		
		clearTimeout(pageJumpTimer);
	});
	
	// Set the offset
	$_('pagejump').style.left=Math.ceil(offset.left)+"px";
	$_('pagejump').style.top=Math.ceil(offset.top)+"px";
	
	$("#pagejump").show();

};

// Builds the page links
function pageLinks(id, urlto, pages, call_func, pageParam){
	
	$("#"+id+" .pagination-top").hide();
	$("#"+id+" .pagination-bottom").hide();
	
	pageInfo = pages || (typeof(N["page"]) == "undefined" ? false : N["page"]);
	call_func = call_func || 'loadpage';
	pageParam = pageParam || 'page';
	
	// Is there a pagination ?
	if(!pageInfo){
		return;
	}
	
	// Make the URL
	var urlto = (urlto || windowHASH()).toString();
	var final = urlto.replace(/(&?)start\=(\d{1,4})/gi,"")+"&"+pageParam+"=";
	
	// Number of Pages
	var $pages = Math.ceil(pageInfo["maxNum"] / pageInfo["len"]);
	
	// Current Page
	var $pg = (pageInfo["start"]/pageInfo["len"]) + 1;
	
	var $_pages = new Object();
	
	if($pages > 1){
		
		// Show th Back Links if required
		if($pg != 1){
			$_pages['&lt;&lt;'] = 1;
			$_pages['&lt;'] = ($pg - 1);
		}
		
		for($i = ($pg - 4); $i < $pg; $i++){
			if($i >= 1){
				$_pages["i"+$i] = $i;
			}
		}
		
		$_pages["i"+$pg] = $pg;
				
		for($i = ($pg + 1); $i <= ($pg + 4); $i++){
			if($i <= $pages){
				$_pages["i"+$i] = $i;
			}
		}
		
		if($pg != $pages){
			$_pages['&gt;'] = ($pg + 1);
			$_pages['&gt;&gt;'] = $pages;
		}
		
	}
	
	// Make the table
	var str = '<table class="cbgbor" cellspacing="1" cellpadding="0" border="0" align="right">'+
'<tr>'+
'<td class="pagelinks"><a href="javascript:'+call_func+'(\''+final+1+'\')" onmouseover="pagejump(this, '+pageInfo["len"]+', \''+final+'\', \''+call_func+'\')" title="{{page_jump_title}}" >{{page_page}} '+$pg+' {{page_of}} '+$pages+'</a></td>';

	for(x in $_pages){
		var i = x.substring(0, 1) == "i" ? x.substring(1) : x;
		str += '<td class="' + (i == $pg ? 'activepage' : 'pagelinks' ) + '"><a href="javascript:'+call_func+'(\''+final+$_pages[x]+'\')">'+i+'</a></td>';
	};
	
	str += '</tr>'+
'</table>';
	
	$("#"+id+" .pagination-top").html(str);
	$("#"+id+" .pagination-top").show();
	
	$("#"+id+" .pagination-bottom").html(str);
	$("#"+id+" .pagination-bottom").show();
	
};

// Redirect completely
function redirect(to){	
	window.location = to;	
};

// Refresh
function refresh_page(){
	var q = windowHASH();
	loadpage(q);
};

// Gets the JSON Data from the server for the given page
function loadpage(query){

	// Store the old act
	prevact = act;
	// Find out the act
	act = findACT(query);

	if(act == ''){
		var svs = getParameterByName('svs', 1);
		if(svs != ''){
			act = 'vpsmanage';
			query = 'act=vpsmanage&'+query;
		}else{
			act = 'listvs';
			query = 'act=listvs&'+query;
		}
	}
	
	if(act != 'logout'){
		window.location.hash = query;
	}
	// Is there an ONLEAVE function ?
	var leavefn = window[prevact+'_onleave'];
	if(typeof leavefn === 'function'){
		leavefn();
	}
	// Are we to reload the data ?
	if(reloadData < 1){
		handleData();
		return;
	}
	// Is there an PRELOAD function ?
	var prefn = window[act+'_preload'];
	if(typeof prefn === 'function'){
		if(prefn() == -1){
			return;
		}
	}
	// Get the data
	AJAX('[[API]]'+query+'&random='+Math.random(), function(data) {
		
		// Set the loaded data
		N = data;
		
		// If its not a valid act then its DashBoard
		if(typeof(N["act"]) != 'undefined'){
			if(act != N["act"]){
				act = N["act"];
			}
		}
		
		// Set that we dont need to load data
		//reloadData = 0;
		
		// Handle the data
		handleData();
		
	});
	if(typeof(task_timeout) != 'undefined'){
		clearTimeout(task_timeout);
	}
};

// Handles the N data
function handleData(){
	
	// Are you logged in ?
	if(N["uid"] < 0){
		if(act != 'register'){
			act = 'login';
		}
		$("#welcome").hide();
	}else{
		$("#welcome").show();
		$("#luser").html(N["username"]);
	}
	
	// Set the time
	if(typeof(N["timezone"]) != 'undefined'){
		if(N["timezone"] != 0){
			$("#timezone").html(N["timezone"]);
		}
		$("#timenow").html(N["timenow"]);
	}
	
	$('#suspend_div').html("");

	// Are we to get redirected ?
	if(typeof(N["redirect"]) != 'undefined'){
		redirect(N["redirect"]);
	}
	
	if(!empty(N["suspended"])){
		$("#suspended").show();
		$("#mainwindow").hide();
		$("#suspended").html(N["suspended"]["reason"]);
		
		if(empty(N["disable_login_logo"])){
			$('#disable_loginlogo').show();
		}		
	}

	// Is there an ONLOAD function
	var fn = window[act+'_onload'];

	// If its there, then call it
	if(typeof fn === 'function'){
		if(fn() == -1){
			return;
		}
	}
	
	// Show the window
	showwindow(act);
	
	// Is there an ONSHOW function
	var fnshow = window[act+'_onshow'];
	
	// If its there, then call it
	if(typeof fnshow === 'function'){
		fnshow();
	}
	
	// Is there anything we have to hide (e.g left menu items, ...)
	Hidedata();
	
}

// Shows the div which has the class "windows" and hides the remaining divs
function showwindow(name){
	
	var orig = name;
	var className = 'khidki';
	var el_class = $("#"+name).attr('class');
	
	if(typeof el_class == "undefined"){
		return false;
	}
	
	if(el_class.match(/tabwindow/g)){
		name = $("#"+orig).closest(".khidki").attr('id');
	}
	
	// Is it of type "windows"
	if(el_class.match(/windows/g)){
		className = 'windows';
	
	// If its a "KHIDKI" then you will have to enable the "mainwindow"
	}else{
		$(".windows").each(function(){
			if($(this).attr('id') != 'mainwindow'){
				$(this).hide();
			}else{
				$(this).show();
			}
		});
	}
		
	$("."+className).each(function(){
		if($(this).attr('id') != name){
			$(this).hide();
		}else{
			$(this).show();
		}
	});
	
	$("#"+name+" img,#"+name+" input[type=image]").each(function(){
		//alert($(this).attr('nsrc')+" - "+$(this).attr('src'));
		if($(this).attr('nsrc') != "undefined"){
			$(this).attr('src', $(this).attr('nsrc'));
		}
	});
	
	// Is there a navigation ?
	var navlist = $("#"+name+" .navlist");
	var nav = $("#"+name+" .nav");
	if(typeof(nav.html()) != 'undefined' && typeof(navlist.html()) != 'undefined'){
		var curnav = new Array();
		var i = 0;
		curnav[i] = '<a href="javascript:loadpage(\'\')">{{navindex}}</a>';
		
		// Parse the navlist
		var _navlist = $.parseJSON(navlist.html());
		
		for(x in _navlist){
			i++;
			curnav[i] = '<a href="javascript:loadpage(\'act='+x+'\')">'+_navlist[x]+'</a>';
		}
		
		nav.html(curnav.join(' &nbsp;>&nbsp; '));
		nav.show();
	}
	
	// Tab Window reversal
	if(orig != name){
		
		// Hide the other tabwindows
		$("#"+name+" .tabwindow").each(function(){
			if($(this).attr('id') != orig){
				$(this).hide();
			}else{
				$(this).show();
			}
		});
		
		// Set the current active tab
		$("#"+name+" .ui-tabs-nav a").each(function(){
			if($(this).attr('id') != orig+'_tab'){
				$(this).parent().attr('class', 'ui-state-default ui-corner-top');
			}else{
				$(this).parent().attr('class', 'ui-state-default ui-corner-top ui-tabs-active ui-state-active');
			}
		});
		
		name = orig;
		
	}
	
	// Are there any errors ?
	if(typeof(N["error"]) != 'undefined'){
		error(N["error"]);
	}
	
	return true;
};

// Shows a POPUP window
function pWindow(pobj){
	
	// Are we to load content ?
	if("load" in pobj){
		
		// Get the data and call pWindow again
		AJAX(pobj.load+'&random='+Math.random(), function(data) {
			N = data;
		
			// Are you logged in ?
			if(N["uid"] < 0){
				loadpage('act=logout&api=json'); // Just call the logout page
				return false;
			}
		
			// Is there an ONLOAD function
			if("onload" in pobj){
				if(pobj.onload() == -1){
					return false;
				}
			}
			
			delete pobj["load"]; // Delete the KEY
			pWindow(pobj); // Show the window now
		});
		
		return;
		
	}
	
	var ret = $(pobj.ele).bPopup({
		modalClose: false,
		position: ["auto",100],
		onOpen: function(){ // On Open functions
			
			// Show the images
			$(pobj.ele+" img,"+pobj.ele+" input[type=image]").each(function(){
				//alert($(this).attr('nsrc')+" - "+$(this).attr('src'));
				if($(this).attr('nsrc') != "undefined"){
					$(this).attr('src', $(this).attr('nsrc'));
				}
			});
		
			// Is there an ONPOPUP function
			if("onpopup" in pobj){
				pobj.onpopup();
			}
			
		}
	});
	
	return ret;
};

// Closes a POPUP window
function pWindowClose(eleid){
	$(eleid).bPopup().close();
};

// Shows a success message
function done(success){
	
	var count = 0;
	var goto = "";
	for (k in success) count++;

	// If count is 0 then no success message was there
	if(count < 1) return;
	
	if(typeof(success["msg"]) != 'undefined'){
		alert(success["msg"]);
	}
	
	// Are we to get redirected ?
	if(typeof(success["goto"]) != 'undefined'){
		loadpage(success["goto"]);
	}
	
	/*// Show the Success Message
	for (k in success) {
		if(k == "goto"){
			goto = success[k];
			continue;
		}
		alert(success[k]);
	}*/
	
};

// Shows the error
function error(er){
	
	var count = 0;
	for (k in er) count++;

	// If count is 0 then no error was there
	if(count < 1) return;
	
	var err_str = "";
	// Show the errors
	var count = 1;
	for (k in er) {
		err_str += count++ +") " + er[k] + "\n";
	}
	
	
	alert(err_str);
};

// Is there an error ?
function isError(key){
	
	key = key || "";
			
	var c = 0;
	
	// Is the key there ? If not, then check the length of the error object
	if(key.length < 1){
		
		if(typeof(N["error"]) != "undefined"){
			
			// Is there any error ?
			for(x in N["error"]){
				c++;
			}
			
			// If count is greater than 0
			if(c > 0){
				return true; // Found an error
			}
		}
		
	}
	
	// Is error there ?
	if(typeof(N["error"]) == "undefined"){
		return false;
	
	// Is the length there ?
	}else{
		
		// Is there any error ?
		for(x in N["error"]){
			c++;
		}
		
		if(c < 1){
			return false; // Found an error
		}			
		
	}
	
	if(typeof(N["error"][key]) != "undefined"){
		return true;
	}
};

// Fatal Error
function fatal_error(newpage, key){
	error(N["error"]); // Show the errors
	loadpage(newpage); // Load the new page
	return -1; // Return -1 to stop further processing
};

// Submits a FORM
function submitit(el, submitresponse){
	
	var id;
	
	// Get the ID of the data
	if(typeof(el) == "string"){
		id = '#'+el;
	}else{
		id = '#'+el.id;
	}

	// NOTE : $(id).serialize() doesnt take the submit values. Hence use hidden fields to add the values

	var obj = {
		url: '[[API]]'+$(id).attr('action'),
		data: $(id).serialize()
	};
	
	// Post the data
	POST(obj, submitresponse);
	
	// We return false to avoid an ACTUAL SUBMIT
	return false;

};

// Creates the TABLE
function table(props, cols, data){
	
	var elid = props['id'];
	
	// Final Properties
	var fp = {"width" : '100%',
			"class" : 'table table-hover tablesorter', //shadow altrowstable gridtable 
			"border" : '0',
			"cellspacing" : '1',
			"cellpadding" : '8',
			"align" : 'center',
			"tid" : ''
		};
	
	for (x in props){
		fp[x] = props[x];
	}
	
	// Create the TABLE
	var table = '<table id="'+fp["tid"]+'" border="'+fp["border"]+'" cellspacing="'+fp["cellspacing"]+'" cellpadding="'+fp["cellpadding"]+'" class="'+fp["class"]+'" align="'+fp["align"]+'" width="'+fp["width"]+'"><thead><tr>';
	
	// Add the headers
	for(x in cols){
		table += '<th '+(cols[x]["width"] ? 'width="'+cols[x]["width"]+'"' : '')+' '+(cols[x]["class"] ? 'class="'+cols[x]["class"]+'"' : '')+'>'+cols[x]["l"]+'</th>';
	}
	
	table += '</tr></thead>';
	
	var $i = 0; // For color
	
	for(d in data){
		$i++;
		table += '<tr>';
		
		for(x in cols){
			table += '<td '+(cols[x]["centered"] ? 'align="center"' : '')+' '+(cols[x]["align"] ? 'align="'+cols[x]["align"]+'"' : '')+'>'+data[d][x]+'</td>';
		}
		
		table += '</tr>';
	}
	
	table += '</table>';

	$('#'+elid).html(table);
	
	
};

// This function makes the alt rows
function altrows(){
	$(".altrowstable tr").mouseover(function(){
		var old_class = $(this).attr("class");
		//alert(old_class);
		$(this).attr("class", "tr_bgcolor");
		
		$(this).mouseout(function(){
			$(this).attr("class", old_class);
		});
	});
};


//////////////////////
// GRAPHING FUNCTIONS
//////////////////////

// Draw a Resource Graph
function resource_graph(id, data){
	
    $.plot($("#"+id), data, 
	{
		series: {
			pie: { 
				innerRadius: 0.7,
				radius: 0.8,
				show: true,
				label: {
					show: true,
					radius: 0,
					formatter: function(label, series){
						if(label != "{{cr_used}}") return "";
						return '<div style="font-size:18px;text-align:center;padding:2px;color:black;">'+Math.round(series.percent)+'%</div><div style="font-size:10px;">'+label+'</div>';
					}
				}
			}
		},
		legend: {
			show: false,
			position: 'nw'
		}
	});
}

// Draw Live status graphs
function live_resource_graph(id, data, options, show_in, show_time){
	
	var plot = $.plot($("#"+id), data, options);
	

	
	if(!('tooltip' in options)){
		var previousPoint = null;
		$("#"+id).bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
	
			if (item) {
				
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;
					$("#tooltip").remove();
					var x = item.datapoint[0].toFixed(2);
					var y = item.datapoint[1].toFixed(2);
					var time = '';
						
					if(show_time){
						time = nDate(x, 'm/d H:i:s');
					}

					if(id == "ntw_plot" || id == "io_read_plot" || id == "io_write_plot"){
					
						var yval = parseInt(y);
						var show_ntw_in;
						
						if(yval <= 1024){
							show_ntw_in = 'B/s';
						}else if(yval > 1024 && yval <= (1024*1024)){
							yval = (yval/1024).toFixed(2);
							show_ntw_in = 'KB/s';
						}else if(yval > (1024*1024) && yval <= (1024*1024*1024)){
							yval = (yval/1024/1024).toFixed(2);
							show_ntw_in = 'MB/s';
						}else if(yval > (1024*1024*1024)){
							yval = (yval/1024/1024/1024).toFixed(2);
							show_ntw_in = 'GB/s';
						}
						
						showTooltip(item.pageX, item.pageY, item.series.label + " " + yval + " "+ show_ntw_in + "&nbsp; at &nbsp;" + time);
					}else{
						showTooltip(item.pageX, item.pageY, parseFloat(y) + " "+ show_in + time);
					}

				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
	}
};

function gd(year, month, day) {
    return new Date(year, month - 1, day).getTime();
};

/////////////////////////
// ALL ONLOAD FUNCTIONS
/////////////////////////

var vnc_vm = new Array();
// VPS List onload
function listvs_onload(){
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	if(N["vs"] == ''){
		$('#vslist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{lst_no_vs}}</div>');
		return;
	}
	$('#vslist').html('');
	$('#suspend_div').html("");
	
	var cols = new Object();
	cols["state"] = {"l" : '<center><img id="refresh_status" src="[[images]]refresh.png" onclick="loadpage(\'act=listvs\');"></center>', "width": '30px', "centered" : true};
	cols["vpsid"] = {"l" : '{{id}}', "width" : '50'};
	//cols["vps_name"] = {"l" : '{{name}}', "width" : '60'};
	cols["vtype"] = {"l" : '{{lst_lv_type}}', "width" : '50', "centered" : true};
	cols["osimg"] = {"l" : '{{lst_lv_os}}', "width" : '50', "centered" : true};
	cols["hostname"] = {"l" : '{{lst_lv_hname}}', "width" : '200'};
	cols["def_ip"] = {"l" : '{{ip}}', "width" : '100'};
	
	if(!empty(N['info']['flags']['show_server'])){
		cols["server"] = {"l" : '{{lst_lv_sname}}', "width" : '100'};
	}
	
	if(!empty(N['inhouse_billing'])){
		cols["region"] = {"l" : '{{lst_region}}', "width" : '100'};
		cols["_charges"] = {"l" : '{{lst_charges}}', "width" : '30', "centered" : true};
	}
	if(N['user_type'] == 2){
		cols['vps_action'] = {"l" : '{{action}}', "width" : '7%', "centered" : true};
	}
	
	cols["select_all"] = {"l" : '<input type="checkbox" name="select_all" id="select_all" class="select_all" onchange="checkbox_select_all(this);">', "width" : '1%', "centered" : true};
	cols["manage_vm"] = {"l" : '', "width" : '1%', "centered" : true};
	
	// Prepare the list
	for(x in N["vs"]){
		
		if(!empty(N["vs"][x]["vnc"])){
			vnc_vm.push(x);
		}
		
		$v = N["vs"][x];
		N["vs"][x]["state"] = '<span id="stat_'+ x +'" style="position:relative;" onmouseenter="showvpsmenu('+$v['vpsid']+');" onmouseleave="hidemenu();"><img class="vpslist" ' + ($v['status'] == 2 ? 'src="[[images]]suspended.png" title="{{lst_stat_suspended}}"' : ($v['status'] == 1 ? 'src="[[images]]online.png" title="{{lst_vps_id_stat_on}}"' : 'src="[[images]]offline.png" title="{{lst_vps_id_stat_off}}"'))+' style="cursor:pointer;" /></span>';
		N["vs"][x]["vtype"] = '<img src="[[images]]admin/'+ $v['virt'] +($v['hvm'] < 1 ? '' : 'hvm') + '_42.gif" />';
		var os_distro = $v['distro'];
		N["vs"][x]["osimg"] = '<img src="'+( os_distro.match(/^http/g) ? $v['distro'] : '[[images]]'+ $v['distro'] )+'" />';
		
		if(!empty(N['info']['flags']['show_server'])){
			N["vs"][x]["server"] = N["vs"][x]["server_name"];
		}
		
		for (var k in N["vs"][x]["ips"]) {
			N["vs"][x]["def_ip"] = N["vs"][x]["ips"][k];
			break;
		}
		
		N["vs"][x]['hostname'] = '<span id="tr_hostname'+$v['vpsid']+'">'+$v['hostname']+'</span>' + (!empty($v['nw_suspended']) ? '<img style="float:right;margin:5px;" title="{{lst_ntwsuspended}}" width="15" id="ntw_suspended'+id+'" src="[[images]]admin/disconnect.png" >': '');
		
		if(!empty(N['inhouse_billing'])){
			N["vs"][x]['_charges'] = N['billing_symbol']+(N["vs"][x]['charges'] || 0);
		}
		
		if(N['user_type'] == 2){
			
			var vpsmanageactbuts = '';
			var vpsmanageactbuttons = '';
			
			vpsmanageactbuts += '<span id="sus_'+ x +'">';
			if($v["status"] != 0){
				
				if($v['suspended'] == 1){
					vpsmanageactbuts += '&nbsp;<a title="{{lst_unsuspendvs}}" onclick="show_confirm(\'unsuspend\', '+ x +');" style="cursor:pointer"><img src="[[images]]admin/unsuspend.png" /></a>&nbsp;';
				}else{
					vpsmanageactbuts += '&nbsp;<a title="{{lst_suspendvs}}" onclick="show_confirm(\'suspend\', '+ x +');" style="cursor:pointer"><img src="[[images]]admin/suspend.png" /></a>&nbsp;';
				}
			}else{
				vpsmanageactbuts += '&nbsp;<a href="#"><img src="[[images]]blank_page.gif" /></a>&nbsp;';
			}
			
			vpsmanageactbuts += '</span><span id="net_sus_'+ x +'">';
			if($v["status"] != 0 && $v["suspended"] != 1){
				
				if(!empty($v["nw_suspended"])){
					vpsmanageactbuts += '&nbsp;<a title="{{lst_unsuspendvs_net}}" onclick="show_confirm(\'unsuspend_net\', '+ x +');" style="cursor:pointer"><img src="[[images]]admin/connect.png" /></a>&nbsp;';
				}else{
					vpsmanageactbuts += '&nbsp;<a title="{{lst_suspendvs_net}}" onclick="show_confirm(\'suspend_net\', '+ x +');" style="cursor:pointer"><img src="[[images]]admin/disconnect.png" /></a>&nbsp;';
				}
				
			}else{
				vpsmanageactbuts += '&nbsp;<a href="#"><img src="[[images]]blank_page.gif" /></a>&nbsp;';
			}
			
			vpsmanageactbuts += '</span>';
			
			vpsmanageactbuts += '&nbsp;<a title="{{lst_lv_delvs}}" id="'+ x +'" onclick="show_confirm(\'delvs\','+ x +');" style="cursor:pointer"><img width="16" height="16" src="[[images]]delete.png"/></a>&nbsp;';
			
			vpsmanageactbuttons = '<div class="vpsmanagemenu" id="vpsmanagemenu_'+x+'" onmouseenter="clearTimeout(managemenuhider);" onmouseleave="hidemanagevpsmenu()" style="display:none"><div class="vpsmanagemenubg">'+ vpsmanageactbuts +'</div></div>';
			
			vpsmanageactbut = '<span id="action_'+x+'" style="cursor:pointer;position:relative;" onmouseenter="showmanagevpsmenu('+ $v['vpsid'] +')" onmouseleave="hidemanagevpsmenu()">'+ vpsmanageactbuttons +'<img title="{{lst_manage_vps}}" src="[[images]]admin/manage.png" width="20" /></span>';
			N["vs"][x]["vps_action"] = vpsmanageactbut + '&nbsp;&nbsp;<a title="{{lst_lv_editvs}}" class="eu_nav" onclick="loadpage(\'vid='+ x +'&act=editvm\');" style="cursor:pointer"><img width="16" height="16" src="[[images]]edit.png"/></a>';
		}
		
		N["vs"][x]["select_all"] = '<input type="checkbox" class="ios" name="vps_list[]" value="'+N["vs"][x]['vpsid']+'"/>';
		N["vs"][x]["manage_vm"] = '<a href="javascript:loadpage(\'act=vpsmanage&svs='+x+'\');" title="{{manage}}"><img width="16" height="16" src="[[images]]arrow_right.png"/></a>';

	}

	// Form the TABLE
	table({'id' : 'vslist', 'tid' : 'vslist_list_table', "width" : '100%'}, cols, N["vs"]);
	
	var multselarr = {
		"0":"---",
		"start" : "{{lst_ms_start}}",
		"stop" : "{{lst_ms_stop}}",
		"restart" : "{{lst_ms_restart}}",
		"poweroff" : "{{lst_ms_poweroff}}",
		"suspend" : {"user" : "2", "string" : "{{lst_ms_suspend}}"},
		"unsuspend" : {"user" : "2", "string" : "{{lst_ms_unsuspend}}"},
		"suspend_net" : {"user" : "2", "string" : "{{lst_ms_suspend_net}}"},
		"unsuspend_net" : {"user" : "2", "string" : "{{lst_ms_unsuspend_net}}"},
		"delvs" : {"user" : "2", "string" : "{{lst_ms_delvs}}"}
	};
	
	var sel_opts = "";
	
	for(var i in multselarr){
		
		if(typeof multselarr[i] === "object"){
			
			// Options avilable for cloud only
			if(N['user_type'] == multselarr[i]['user']){
				if(/suspend/i.test(i)){
					sel_opts += '<option value='+i+'>'+multselarr[i]['string']+'</option>';
					continue;
				}
				sel_opts += '<option value='+i+'>'+multselarr[i]['string']+'</option>';
				continue;
			}
			
		}else{
			sel_opts += '<option value='+i+'>'+multselarr[i]+'</option>';
		}
	}
	
	var bottom_menu = '<div class="row bottom-menu"><div class="col-sm-6"></div><div class="col-sm-6"><label>{{lst_with_selected}}</label><select class="form-control" name="multi_options" id="multi_options" >'+sel_opts+'</select>&nbsp;<input type="button" value="{{go}}" onclick="show_confirm()" class="go_btn"/></div>';
	
	$("#vslist").append(bottom_menu);
	
	// Table Sorting
	col_count = 0;
	for(x in cols){
		col_count = col_count + 1;
	}
	
	$headers = {0: {sorter: false}, 2: {sorter: false}, 3: {sorter: false}};
	
	no_sorting_cols = 2;
	if(N['user_type'] == 2){
		no_sorting_cols = 3;
	}

	for(var i = (col_count - no_sorting_cols); i < col_count; i++){
		$headers[i] = {sorter: false};
	}
	
	var srt = 0;
	if(!empty(N['info']['flags']['enable_idsort'])){
		srt = 1;
	}
	
	$("#vslist_list_table").tablesorter({
		sortList: [[1,srt],[4,0],[5,0]],
		headers: $headers
	});
};

function hidemsg(){
	$("#infobar").hide();
	$("#info_content").html("");
	clearTimeout(hide_msg);
}

var hide_msg;

function show_msg(msg, msgtype){
	
	// Are we on the listvs page?
	// The custom alert message box to be displayed on ListVS page only
	if(act != 'listvs'){
		alert(msg);
		return;
	}
	
	if(!empty(hide_msg)){
		clearTimeout(hide_msg);
	}
	
	msg = msg.replace(/\n/g, "<br/>");
	msg = msg.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	
	if(msgtype == "error"){
		//msg = '<img src=\'[[images]]/resa.gif\' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + msg;
		$("#info_content").removeClass("alert-success");
		$("#info_content").addClass("error alert-danger");
	}else if(msgtype == "success"){
		//msg = '<img src=\'[[images]]/done.gif\' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + msg;
		$("#info_content").removeClass("alert-danger");
		$("#info_content").addClass("success alert-success");
	}else{
		alert(msg);
		return;
	}
	
	$("#info_content").append(msg + '<br />');
	$("#info_content").show();
	hide_msg = setTimeout('hidemsg();', 5000);
}

function vpsaction(todo, vpsid){
	
	var vpsids = new Array();
	
	// Do we have an Array of VPS IDs ?
	if(vpsid.constructor === Array){
		vpsids = vpsid;
	}else{
		vpsids[vpsid] = vpsid;
	}
	
	for(x in vpsids){
		
		var og_content = $('#stat_'+vpsids[x]).html();
		$('#stat_'+vpsids[x]).html("");
		$('#stat_'+vpsids[x]).html('<img class="vpslist" src="[[images]]progress_bar.gif">');
		
		AJAX('[[API]]act=listvs&'+todo+'='+ vpsids[x] +'&api=json', function(data) {
			$('#stat_'+vpsids[x]).html(og_content);
			
			if(todo in data){
				
				if(typeof(data[todo]["error"]) != 'undefined'){
					error(data[todo]["error"], data[todo]["vpsid"]);
					$('#stat_'+data[todo]["vpsid"]).html(og_content);
				}
				// Are we to show a success message ?
				if(typeof(data["done"]) != 'undefined'){
					done(data["done"]);
				}
			}
		});
	}
}

function show_confirm(todo, vpsid){
	
	var vpsids = new Array();
	
	vpsid = vpsid || 0;
	todo = todo || '';
	
	var conf = {suspend :{0:'{{lst_conf_suspend}}' , 1:'{{lst_conf_mul_suspend}}'}, unsuspend:{0:'{{lst_conf_unsuspend}}' , 1:'{{lst_conf_mul_unsuspend}}'}, suspend_net :{0:'{{lst_conf_suspend_net}}' , 1:'{{lst_conf_mul_suspend_net}}'}, unsuspend_net :{0:'{{lst_conf_unsuspend_net}}' , 1:'{{lst_conf_mul_unsuspend_net}}'}, delvs:{0:'{{lst_conf_delvs}}' , 1:'{{lst_conf_mul_delvs}}'}, start:{1:'{{lst_conf_mul_start}}'}, stop:{1:'{{lst_conf_mul_stop}}'}, poweroff:{1:'{{lst_conf_mul_poweroff}}'}, restart:{1:'{{lst_conf_mul_restart}}'}};
	
	// Is there any VPSID and action specified ?
	if(!empty(vpsid) && !empty(todo)){
		
		vpsids[0] = vpsid;
		
		var confirmed = confirm(conf[todo][0]);
		
		if(!confirmed){
			return false;
		}
	
	// Are we in multiselect mode ?
	}else{
		
		todo = $("#multi_options").val();
		
		for(var x = 0; x < $(":checked.ios").length; x++){
			vpsids[x] = parseInt($(":checked.ios")[x].value);
		}
		
		if(empty(todo)){
			error({error:"{{lst_no_option_sel}}"});
			return false;
		}
	
		if(vpsids.length < 1){
			error({error:"{{lst_no_vps_sel}}"});
			return false;
		}
		
		var confirmed = confirm(conf[todo][1]);
	
		if(!confirmed){
			return false;
		}
	}
	
	switch(todo){
		
		case "start" :
		case "stop" :
		case "restart" :
		case "poweroff" :
			for(x in vpsids){
				jqueryvpsboot(todo, "stat_"+vpsids[x], vpsids[x]);
			}
			break;
		case "suspend" :
		case "unsuspend" :
		case "suspend_net" :
		case "unsuspend_net" :
		case "delvs" :
			vpsaction(todo, vpsids)
			break;
		default:
			error({error:"{{lst_no_option_sel}}"});
			break;
	}
	return;
}

// Dashboard onload
function dashboard_onload(){

	if(isError()){
		error(N["error"]);
		return -1;
	}

	var cols = new Object();
	cols["state"] = {"l" : '{{lst_lv_state}}', "width": '30px', "centered" : true};
	cols["vpsid"] = {"l" : '{{lst_lv_id}}'};
	cols["vps_name"] = {"l" : '{{lst_lv_cid}}'};
	cols["vtype"] = {"l" : '{{lst_lv_type}}', "centered" : true};
	cols["osimg"] = {"l" : '{{lst_lv_os}}', "centered" : true};
	cols["hostname"] = {"l" : '{{lst_lv_hname}}'};
	cols["def_ip"] = {"l" : '{{lst_lv_ip}}'};
	cols["manage"] = {"l" : '{{lst_lv_manage}}', "centered" : true};
	
	// Prepare the list
	for(x in N["vs"]){
		$v = N["vs"][x];
		N["vs"][x]["state"] = ($v['status'] == 2 ? '<img class="vpslist" src="[[images]]suspended.png" />' : ($v['status'] == 1 ? '<img class="vpslist" src="[[images]]online.png" />' : '<img class="vpslist" src="[[images]]offline.png" />'));
		N["vs"][x]["vtype"] = '<img src="[[images]]admin/'+ $v['virt'] +($v['hvm'] < 1 ? '' : 'hvm') + '_42.gif" />';
		N["vs"][x]["osimg"] = '<img src="[[images]]'+ $v['distro'] +'_40.gif" />';

		for (var k in N["vs"][x]["ips"]) {
			N["vs"][x]["def_ip"] = N["vs"][x]["ips"][k];
			break;
		}

		N["vs"][x]["manage"] = '<a href="loadpage(\'act=vpsmanage&svs='+x+'\')"><img width="16" height="16" src="[[images]]arrow_right.png"/></a>';

	}

	// Form the TABLE
	table({'id' : 'vslist', 'tid' : 'vslist_list_table', "width" : '100%'}, cols, N["vs"]);

};

function register_onload(){

	if(!empty(N['captcha_sitekey'])){
		$('.g-recaptcha').attr('data-sitekey', N['captcha_sitekey']);
		jQuery.getScript('https://www.google.com/recaptcha/api.js');
		$('#gcaptcha').show();
	}
	
	$("#login-div").show();
	if(navigator.userAgent.search("Mobile") < 0){
		jQuery.getScript("[[theme]]/js2/loginanimation.js", function(data, status, jqxhr) {});
	}

	// Try to get the "sa" in HASH.
	var sa = getParameterByName('sa', 1);
	
	// If we did not get in HASH, try to search in URL. (If user comes from direct link i.e. incase reset password)
	if(empty(sa)){
		sa = getParameterByName('sa');
	}
	
	// Is it a call for resend activation code
	if(sa == 'resendact'){
		
		$_("resendactform").reset();
		showwindow('resendact');
		
		return -1;
	}
	
	// Is it a call for validate
	if(sa == 'validate'){
		
		// Are we done ?
		if('done' in N){
			parseVars("reg_val_done", N["done"]);
			$("#reg_val_done").show();
		}else{
			$("#reg_val_done").hide();
		}
	
		showwindow('validate');
		return -1;
	}
	
	// Its the register act
	$_("registerform").reset();

}

function register_onshow(){

	if(!empty(N['captcha_sitekey'])){
		grecaptcha.reset();
	}
	
}
	
function login_onload(){

	$("#login-div").show();
	if(navigator.userAgent.search("Mobile") < 0){
		jQuery.getScript("[[theme]]/js2/loginanimation.js", function(data, status, jqxhr) {});
	}

	$("body").css("overflow", "hidden");
	// Try to get the "sa" in HASH.
	var sa = getParameterByName('sa', 1);

	// If we did not get in HASH, try to search in URL. (If user comes from direct link i.e. incase reset password)
	if(empty(sa)){
		var sa = getParameterByName('sa');
	}

	// Is it a call for forgot password
	if(sa == 'fpass'){
		showwindow('fpass');
		return -1;
	}
	
	// twofact code will NOT BE HERE, as in virtualizor we make some changes in js
	// Is it a call for forgot password
	if(sa == 'resetpass'){

		var key = getParameterByName('key', 1);

		// If we did not get in HASH, try to search in URL. (If user comes from direct link i.e. incase reset password)
		if(empty(key)){
			var key = getParameterByName('key');
		}

		$('#resetpass_key').val(key);
		showwindow('resetpass');
		return -1;
	}

	// Do we have to show API credentials ?
	if(empty(N["disable_login_logo"])){
		$('#disable_loginlogo').show();
	}

	// Do we have to show API credentials ?
	if(empty(N["enable_registration"])){
		$('#login_register').hide();
	}else{
		$('#login_register').show();
	}

};

// Some variables for global management
var timer_server_loads;

function update_power_opts(vps_status){

	if(vps_status == 2 ){

		var startstopcaption_lang = '{{vm_vps_suspended}}';
		var startstopcell_data = '<img id="startimg" src="[[images]]sus_start.png" width="48">';

	}else if(vps_status == 1 ){

		var startstopcaption_lang = '{{vm_vps_stop}}';
		var startstopcell_data = '<a onclick="return jqueryvpsboot(\'stop\', this.id);" id="startstop" href="#"><img id="stopimg" src="[[images]]stop.png" width="48"></a>';

	}else{

		var startstopcaption_lang = '{{vps_start}}';
		var startstopcell_data = '<a onclick="return jqueryvpsboot(\'start\', this.id);" id="startstop" href="#"><img id="startimg" src="[[images]]start.png" width="48"></a>';

	}

	$('#startstopcell').html(startstopcell_data);

	if(vps_status == 2){

		$('#restartcell').html('<img id="restartimg" src="[[images]]sus_restart.png" width="48">');
		$('#poweroffcell').html('<img id="poweroffimg" src="[[images]]sus_poweroff.png" width="48">');

	}else{

		$('#restartcell').html('<a onclick="return jqueryvpsboot(\'restart\', this.id);" id="restart" href="#"><img id="restartimg" src="[[images]]restart.png" width="48"></a>');
		$('#poweroffcell').html('<a onclick="return jqueryvpsboot(\'poweroff\', this.id);" href="#" id="poweroffbut"><img id="poweroffimg" src="[[images]]poweroff.png" width="48"></a>');

	}

	$('#vps-desc-status').html(status_list[vps_status]);

}

// VPSManage onload wizard
function vpsmanage_onload(){

	if(isError()){
		error(N["error"]);
		return -1;
	}
	$('#suspend_div').html("");

	status_list = new Array('<div id="current_status_text" class="offline">{{vm_lm_status_offline}}</div>','<div id="current_status_text" class="online">{{vm_lm_status_online}}</div>', '<div id="current_status_text" class="suspended">{{vm_lm_status_suspended}}</div>');

	if(N['info']['os']['distro_logo'].indexOf('http') == 0){
		$('#vm_distro_logo').attr('src', N['info']['os']['distro_logo']);
	}else{
		$('#vm_distro_logo').attr('src', '[[images]]'+N['info']['os']['distro_logo']);
	}

	//alert(N['info']['os']['name'])
	$('#vm_distro_name').html(N['info']['os']['name']);
	// Now show the time

	$('#ss_vm_lv_sname').hide();
	$('#vps-desc-server_name, #vps-desc-server_name_td').hide();

	if('server_name' in N['info']){
		var ss_vm_lv_sname = '{{vm_lv_sname}}';
		$('#ss_vm_lv_sname').html(ss_vm_lv_sname).show();
		$('#vps-desc-server_name').html(N['info']['server_name']);
		$('#vps-desc-server_name, #vps-desc-server_name_td').show();
	}

	$('#vps-desc-hostname').html(N['info']['hostname']);
	$('#vps-desc-ip').html(N['info']['ip'][0]);
	$('#ip_lists_div').hide();
	$('#ip_count').hide();

	if(N['info']['ip_count'] > 1){
		$('#ip_count').html(N['info']['ip_count']).show();
		var ip_list = '';
		for(x in N['info']['ip']){
			ip_list += '<li>'+ N['info']['ip'][x] + '</li>';
		}
		$('#ip_lists').html(ip_list);
		$('#ip_lists_div').show();
	}

	// Update the power options box
	update_power_opts(N['info']['status']);

	if(!empty(N['info']['vps']['suspended'])){

		if(!empty(N['info']['vps']['suspend_reason']) && N['info']['vps']['suspend_reason'] == 'bw'){
			var sus_reason = '{{vm_suspend_reason_bw}}';
		}else{
			var sus_reason = '{{vm_vps_is_suspended}}';
		}

		$('#suspend_div').html('<div class="notice" style="width:100%"><img src="[[images]]notice.gif" /> &nbsp;'+ sus_reason + '</div>');

		// We will have to hide the other divs if the vps is suspended.
		$('#vpsmanage_div, #bw_div, #vps_stats_div, #bw_monthly_div').hide();
		/*$('#startimg').attr('src', '[[images]]sus_start.png');
		$('#poweroffimg').attr('src', '[[images]]sus_poweroff.png');
		$('#stopimg').attr('src', '[[images]]sus_stop.png');
		$('#restartimg').attr('src', '[[images]]sus_restart.png');*/
		return;
	}
	
	// Is the VPS in Rescue Mode ?
	if(!empty(N["info"]["vps"]["rescue"])){
		
		$('#suspend_div').html('<div class="notice" style="width:100%"><img src="[[images]]notice.gif" /> &nbsp;<b>{{resc_rescue_enabled}}</b></div>');
	}
	
	// Are we to disable control options ?
	if(!empty(N["info"]["disable_power_options"])){		
		
		$('#suspend_div').html('<div class="notice" style="width:100%"><img src="[[images]]notice.gif" /> &nbsp;'+ N["info"]["disable_power_options"] + '</div>');
		$('#vpsmanage_div, #bw_div, #vps_stats_div, #bw_monthly_div').hide();
		
		// Update the power options as they are in suspended state
		update_power_opts(2);
		
		// Override the status text as it will be set to suspended
		$('#vps-desc-status').html(status_list[N['info']['status']]);
		
		return;
	}
	
	//Update the network status if the vps is online
	if((N['info']['ntw_status'] != undefined) && (N['info']['status'] == 1)){
		//Please check the value for updating the reason of suspension
		if(N['info']['ntw_status'] == 2){
			$('#vps-desc-status').html('<div id="current_status_text" class="ntw_suspended">{{vm_lm_status_ntw_sus_bw}}</div>');
		}else{
			$('#vps-desc-status').html('<div id="current_status_text" class="ntw_suspended">{{vm_lm_status_ntw_sus_admin}}</div>');
		}
	}
	
	$('#vpsmanage_div, #bw_div, #vps_stats_div, #bw_monthly_div').show();

	$('#vpsconfig-cell').hide();

	if(!empty(N['info']['flags']['hvmsettings']) && empty(N['info']['flags']['disable_vps_config']) && empty(N['info']['vps']['admin_managed'])){
		$('#vpsconfig-cell').show();
	}

	// For Advanced option
	// rdns-cell will be here. As left menu is not there in WHMCS
	$('#vnc-cell, #vncpass-cell, #cp-cell, #rescue-mode-cell, #backup-cell, #backup2-cell, #ipv6_subnets-cell, #monitor-cell, #proc-cell, #services-cell, #alerts-cell, #console-cell, #recipe-mode-cell, #os-cell, #ssh-cell, #hostname-cell, #password-cell, #ips-cell, #self_shutdown-cell, #map, #managevdf-cell, #rdns-cell, #sshkeys-cell').hide();

	if(!empty(N['info']['vps']['vnc']) && N['info']['virt'] != 'openvz' && N['info']['virt'] != 'proxo' && empty(N['info']['vps']['admin_managed'])){
		$('#vnc-cell, #vncpass-cell').show();
	}
	
	
	// HAProxy VPS Domain Forwarding
	if(!empty(N['info']['flags']['haproxy']) && empty(N['info']['vps']['admin_managed'])){
		$('#managevdf-cell').show();
	}

	if(empty(N['info']['flags']['disable_icons_cp']) && empty(N['info']['vps']['admin_managed'])){
		$('#cp-cell').show();
	}

	if(N['info']['virt'] == 'openvz' && empty(N['info']['flags']['disable_backup_cp']) && empty(N['info']['vps']['admin_managed'])){
		$('#backup-cell').show();
	}

	if(!empty(N['info']['flags']['enable_console']) && empty(N['info']['vps']['admin_managed'])){
		$('#console-cell').show();
	}
	
	if(!empty(N['info']['flags']['enable_rdns']) && empty(N['info']['vps']['admin_managed'])){
		$('#rdns-cell').show();
	}
	
	// For information block
	if(empty(N['info']['flags']['disable_icons_monitor'])){
		$('#monitor-cell').show();
	}
	
	if(!empty(N['info']['flags']['rescue_mode']) && empty(N['info']['vps']['admin_managed'])){
		$('#rescue-mode-cell').show();
	}
	
	if(empty(N['info']['flags']['disable_recipes']) && empty(N['info']['vps']['admin_managed'])){
		$('#recipe-mode-cell').show();
	}
	
	if(empty(N['info']['flags']['disable_change_hostname']) && empty(N['info']['vps']['admin_managed'])){
		$('#hostname-cell').show();
	}
	
	if(empty(N['info']['flags']['disable_change_password']) && empty(N['info']['vps']['admin_managed'])){
		$('#password-cell').show();
	}
	
	if(empty(N['info']['flags']['disable_os_reinstall']) && empty(N['info']['vps']['admin_managed'])){
		$('#os-cell').show();
	}
	
	if(empty(N['info']['flags']['disable_ssh']) && empty(N['info']['vps']['admin_managed'])){
		$('#ssh-cell').show();
	}

	if(empty(N['info']['flags']['disable_enduser_sshkeys']) && empty(N['info']['vps']['admin_managed'])){
		$('#sshkeys-cell').show();
	}

	if(!empty(N['info']['flags']['ipv6_subnets']) && empty(N['info']['vps']['admin_managed'])){
		$('#ipv6_subnets-cell').show();
	}
	
	if(N['info']['virt'] == 'openvz' || N['info']['virt'] == 'vzo' || N['info']['virt'] == 'vzk' || !empty(N['info']['flags']['services_support'])){
		$('#proc-cell, #services-cell, #alerts-cell').show(); 
	}
	
	if(empty(N['info']['vps']['admin_managed'])){
		$('#ips-cell').show();
	}
	if(empty(N['info']['flags']['disable_self_shutdown']) && empty(N['info']['vps']['admin_managed'])){
		$('#self_shutdown-cell').show();
	}
	if(empty(N['info']['flags']['disable_server_location'])){
		$('#map').show();
	}
	
	if(empty(N['info']['flags']['disable_backup_cp']) && !empty(N['info']['flags']['bpid']) && empty(N['info']['vps']['admin_managed'])){
		$('#backup2-cell').show();
	}

	$(".pan-button, .icon-cell").tipTip({delay:100, defaultPosition:"top"});

	// Server load chart on the right
	function ServerLoadCharts() {
		
		/* Graph variables and functions starts from here */
		function makedata(data){
			
			var updateInterval = 1000;
			var now = new Date().getTime();
			
			var fdata = [];
			i = 0;
			for (x in data){
				fdata.push([now += updateInterval , data[x]]);
				i++;
			}
			return fdata;
		}
		
		/* Cpu graph options */
		var cpu_options = {
			series: {
				lines: {
					show: true,
					lineWidth: 0.1,
					fill: true
				}
			},
			xaxis: {
				show:true,
				color:"white",
				mode: "time",
				tickSize: [1, "second"],
				tickFormatter: function (v, axis) {
					var date = new Date(v);
			 
					if (date.getSeconds() % 5 == 0) {
						var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
						var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
						var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			 
						return hours + ":" + minutes + ":" + seconds;
					} else {
						return "";
					}
				},
				axisLabel: " ",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial',
				axisLabelPadding: 10
			},
			yaxis: {
				show:false
			},
			grid: {
				borderWidth: 0,
				borderColor: '#fff',
				hoverable: true,
			},
		};
		
		var totalPoints = 30;
		var cpudata = [];
		var finalcpudata = [];
		for (var i = 0; i < totalPoints; ++i) {
			cpudata.push(0.1);
		}
		
		cpu_dataset = [
			{ label: "", data: makedata(cpudata), color: "#3498DB" }
		];
		
		live_resource_graph("cpu_hist", cpu_dataset, cpu_options, "%", false);
		
		// Fill the pie chart
		var res = [
			{ label: "{{used}}",  data: 0.1},
			{ label: "{{free}}",  data: 100}
		];
		
		resource_graph("sl_cpu", res);
		
		// Update the CPU / Disk / Inodes graph
		function cpu_update(){
			
			clearTimeout(timer_server_loads);
			
			var svs = getParameterByName('svs', 1);
			
			$.getJSON('[[API]]act=vpsmanage&stats=1&svs=' + svs, function(data, textStatus, jqXHR) {
				
				// Are we still visible
				if(!$("#cpu_hist").is(":visible")){			
					return false;
				}
				
				var cpu = data['info']['cpu'];
				var disk = data['info']['disk'];
				
				// Update the Disk usage
				$('#disk_percent_bar').css('width', disk['percent'] +"%");
				$('#disk_percent_bar').attr('title', disk['percent'] + ' %{{cr_used}}');
				$('#disk_percent_val').html(disk['percent'] + '%');
				
				cpudata.shift();
				
				cpudata.push(parseFloat(cpu['percent']));
				
				cpu_dataset = [
					{ label: "", data: makedata(cpudata), color: "#3498DB" }
				];
				
				live_resource_graph("cpu_hist", cpu_dataset, cpu_options, "%", false);
				
				// Fill the pie chart
				var res = [
					{ label: "{{used}}",  data: cpu['percent']},
					{ label: "{{free}}",  data: cpu['percent_free']}
				];
				
				resource_graph("sl_cpu", res);
				
				// Update the network speed graph
				netspeed_update(data['info']['netspeed']);
				
				timer_server_loads = setTimeout(cpu_update, 10000);
				
			});
		}
		
		cpu_update();
		
	};
	
	// Updates the graph
	function netspeed_update(speed_data) {
			
		if(!$("#network_speed_holder1").is(":visible")){			
			return false;
		}
		
		// Slice the top
		total_speed = total_speed.slice(1);
		down_speed = down_speed.slice(1);
		up_speed = up_speed.slice(1);
		
		// Add the new data
		total_speed.push((speed_data["speed"]/1024/1024));
		down_speed.push((speed_data["download"]/1024/1024));
		up_speed.push((speed_data["upload"]/1024/1024));
		
		total_speed_data = makedata(total_speed);
		down_speed_data = makedata(down_speed);
		up_speed_data = makedata(up_speed);
		
		netspeed_graph = [
			{ label: "{{total_speed}}",  data: total_speed_data},
			{ label: "{{download}}",  data: down_speed_data},
			{ label: "{{upload}}",  data: up_speed_data}
		];
					
		var opts = netspeed_plot.getOptions();
		opts.yaxes[0].max = Math.max.apply(null, total_speed) + 5;
		netspeed_plot.setupGrid();
		
		netspeed_plot.setData(netspeed_graph);
		netspeed_plot.draw();
		
	};
	
	var svs = N['info']['vpsid'];
	
	// If it is not susupended and svs is there then only we will show the graphs
	if(!empty(svs)){
			
		adjust_div_heights();
		
		/* Network speed initialize starts */
		var total_speed = [];
		var down_speed = [];
		var up_speed = [];
		var totalPoints = 60;
		
		for (var i = 0; i < totalPoints; ++i) {
			total_speed.push(0);
			down_speed.push(0);
			up_speed.push(0);
		}
				
		var total_speed_data = makedata(total_speed);
		var down_speed_data = makedata(down_speed);
		var up_speed_data = makedata(up_speed);
		
		var netspeed_graph = [
			{ label: "{{total_speed}}",  data: total_speed_data},
			{ label: "{{download}}",  data: down_speed_data},
			{ label: "{{upload}}",  data: up_speed_data}
		];
	
		var netspeed_plot = $.plot("#network_speed_holder1", netspeed_graph, {
			series: {
				//points: { show: true },
				lines: { show: true, fill: true, steps: false, lineWidth:0.5 }
			},
			legend: {
				show: true,
				noColumns: 2,
				container: $("#nw_speed_chartLegend")
			},
			xaxis: {
				show: false,
				color: "white"
			},
			yaxis: {
				min:0,
				color: "white",
			},
			grid: {
				borderWidth: 0,
				borderColor: '#fff',
				hoverable: true,
			}
		});
		
		// The following prototype causes a lot of issue in the JS. Hence commented !		
		/*Array.prototype.max = function() {
			return Math.max.apply(null, this);
		};*/
	
		var previousPoint = null;
		$("#network_speed_holder1").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
	
			if (item) {
				
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;
					$("#tooltip").remove();
					var x = item.datapoint[0].toFixed(2),
						y = item.datapoint[1].toFixed(2);
						
					showTooltip(item.pageX, item.pageY,
								parseFloat(y) + " MB/s" + " (" + parseFloat(y*8) + " Mbit/s)");
				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
		/* Network speed initialized */
		
		ServerLoadCharts();
		show_bandwidth_window();
		
		/* Start yearly graph (Month wise)*/
		var d1 = [];
		var d2 = [];
		var band_data = N['info']['bandwidth']['yr_bandwidth'];
		
		for(x in band_data){
			
			//alert(data['info']['bandwidth']['yr_bandwidth'][x]['in'] + '--' + data['info']['bandwidth']['yr_bandwidth'][x]['out'] + ' -- '+ x)
			var indata = empty(band_data[x]['in']) ? 0 : parseFloat(band_data[x]['in']);
			var outdata = empty(band_data[x]['out']) ? 0 : parseFloat(band_data[x]['out']);
			
			d1.push([x, indata]);
			d2.push([x, outdata]);
		}
		
		var tick_labels = [
			[0, "{{jan}}"], [1, "{{feb}}"], [2, "{{mar}}"], [3, "{{apr}}"],
			[4, "{{may}}"], [5, "{{jun}}"], [6, "{{jul}}"], [7, "{{aug}}"],
			[8, "{{sep}}"], [9, "{{oct}}"], [10, "{{nov}}"], [11, "{{dec}}"]
		];
		
		/* Monthly graph options */	
		var monthly_options = {
			series:{
				stack: true,
				bars: {
					show: true,
					fill: true,
					barWidth: 0.6,
					lineWidth: 0.5
				}
			},			
			legend: {
				show: true,
				noColumns: 2,
				container: $("#bw_monthly_chartLegend")
			},
			xaxis:{
				color: "white",
				axisLabel: " ",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial',
				axisLabelPadding: 12, 
				ticks:tick_labels,
				tickSize : 0.5
			},
			yaxis:{
				min:0,
				labelWidth: -28,
				color: "white",
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial',
				tickFormatter: function (v) {
					if(v <= 1024)
						return Math.round(v) + " M";
					if(v > 1024 && v < (1024*1024))
						return Math.round(v /1024) + " G";
					if(v > (1024*1024))
						return Math.round(v / (1024*1024)) + " T"
				}
			},
			grid:{
				borderWidth: 0,
				borderColor: '#fff',
				hoverable: true,
			},
			tooltip: {
				show: true,
				content: function(label, xval, yval, flotItem){
					return "{{month}} : " + (Number(xval)+1) + ", {{bandwidth}} : " + unit_convert(yval);
				}
			}
		}
		
		var monthly_dataset = [
			{ label: "{{download}}", data: d1, color: "#0077FF" },
			{ label: "{{upload}}", data: d2, color: "#7D0096" }
		];
		
		live_resource_graph("bw_monthly_body", monthly_dataset, monthly_options, '', false);
		/* End of yearly graph (Month wise)*/
	}
	// If server_location is empty then show map
	if(empty(N['info']['flags']['disable_server_location'])){
		
		if(typeof olmap == 'undefined'){
			
			$.getScript("https://cdnjs.cloudflare.com/ajax/libs/ol3/4.1.1/ol.js", function(data, textStatus, jqxhr) {
				olmap = initialize_map_op(N['info']['flags']['map_address']['latitude'], N['info']['flags']['map_address']['longitude']);		
				setTimeout("olmap.updateSize()", 100);
			});
		} 
	}else{
		$('#map').hide();
	}
	//-------------------End of map --------------------------//
};

function vpsmanage_onshow(){

	if(!("disable_webuzo" in N)){
		$('#installapps').show();
	}
	
	// Check if call is for webuzo
	var param = getParameterByName('webuzo', 1);
	if(param){
		show_webuzo_window();
	}
};
function jqueryvpsboot(todo, id, vpsid){
	
	Loading(0); // Hide the loading text
	
	// If there is no vpsid passed we assume the function is called from managevps page
	vpsid = vpsid || N['info']['vpsid'];
	
	var id = id || 0;
	var currentStateImage = null;
	var og_content = $('#'+id).html();

	$('#'+id).html("");
	$('#'+id).html('<img src="[[images]]progress_bar.gif" valign="middle">');

	var url = '[[API]]svs='+vpsid+'&act='+todo+'&do=1';

	$.getJSON(url, function(data, textStatus, jqXHR) {

		$('#'+id).html(og_content);
		
		if(act == 'listvs'){
			hidemenu();
			if('status' in data){
				changevpsstatus(vpsid, data["status"], data["ntw_status"]);
			}
		}else{
			if('status' in data){
				update_power_opts(data['status']);
			}
		}

		// Are there any errors ?
		if(typeof(data["error"]) != 'undefined'){
			error(data["error"], vpsid);
		}
		
		// Are we to show a success message ?
		if(typeof(data["done"]) != 'undefined'){
			if('goto' in data["done"]){
				delete data["done"]['goto'];
			}
			
			// If it is start and done is there we will have to redraw the graphs
			if(todo == 'start'){
				//ServerLoadCharts();
				//BandwidthGraphs();
			}
			
			data["done"]["vpsid"] = vpsid;
			
			//reloadData = -1;
			done(data["done"]);
		}
			
		// Are we to get redirected ?
		if(typeof(data["redirect"]) != 'undefined'){
			redirect(data["redirect"]);
		}
			
		// Are we to get redirected ?
		if(typeof(data["goto"]) != 'undefined'){
			loadpage(data["goto"]);
		}
		
	}).fail(function (){
		
		// Is there a failure function ?
		if(typeof failure === 'function'){
			failure();
		}
		
	});
	
	return false;
};

function show_hostname(){

	// We must reset the form
	$_("hostnameform").reset();
	
	$('#current_hostname').html(N['info']['hostname']);
	$('#hostnameform').attr('action', 'act=hostname&svs='+N['vpsid']);
	pWindow({'ele' : '#show_hostname_form'});
	
};

function show_changepassform(){
	
	// We must reset the form
	$_("changepass-form").reset();
	
	$('#changepass-form').attr('action', 'act=changepassword&svs='+N['vpsid']);
	pWindow({'ele' : '#show_changepass_form'});
	
};

function show_ipform(){
	
	$_('ips-form').reset();
	
	// Show the user list
	var ip_list = '';
	for(x in N['info']['ip']){
		ip_list += '<option value="'+ N['info']['ip'][x] +'">'+ N['info']['ip'][x] + '</option>';
	}
	$("#vm_ips_select").html(ip_list);
	
	$('#ips-form').attr('action', 'act=ips&svs='+N['vpsid']);
	pWindow({'ele' : '#show_ip_form'});
};

function show_enable_accl(){
	
	if($("#hvm_enable_vga").prop('checked') == true){
		$("#hvm_enable_acceleration_tr").css("display", "");
	}else{
		$("#hvm_enable_acceleration_tr").css("display", "none");
		$("#hvm_enable_acceleration_tr").removeAttr('checked');
	}
}

function show_hvm_vnc_keymap(){
	
	if($("#hvm_vnc").prop('checked') == true){
		$("#hvm_vnc_keymap_tr").css("display", "");
	}else{
		$("#hvm_vnc_keymap_tr").prop("selected", null);
		$("#hvm_vnc_keymap_tr").css("display", "none");
	}
}

function show_hvmsetting_window(){
	
	$('#hvmsettingsform')[0].reset();	
	$('#tuntap_enable_tr, #ppp_enable_tr , #acpi_tr, #apic_tr, #vnc_tr, #hvm_vnc_keymap_tr, #hvm_vga_tr, #hvm_enable_acceleration_tr, #hvm_sec_iso_tr, #hvm_nic_type_tr, #boot_reorder_pos_tr, #hvm_isos_tr, #hvm_virtio_tr, #hvm_fuse_tr, #hvm_ipip_tr, #hvm_ipgre_tr, #hvm_nfs_tr, #hvm_quotaugidlimit_tr, #hvm_iolimit_tr, #hvm_iopslimit_tr, .eu_iso, #hvm_timezone_tr').hide();
	$('#hvmsettingsform').attr('action', 'act=hvmsettings&svs='+N['vpsid']);
	$('#tuntap_enable, #ppp_enable, #acpi_tr, #apic_tr, #vnc_tr').prop('checked', false);
	
	AJAX('[[API]]act=hvmsettings&svs='+N['vpsid'], function(data) {

		if(data['virt'] == 'openvz' || data['virt'] == 'vzo'){
			
			if(!empty(data['flags']['enable_tuntap_cp'])){
				$('#tuntap_enable_tr').show();
				(!empty(data['vps']['tuntap']) ? $('#tuntap_enable').prop('checked', true) : '');
			}
			
			if(!empty(data['flags']['enable_ppp_cp'])){
				$('#ppp_enable_tr').show();
				(!empty(data['vps']['ppp']) ? $('#ppp_enable').prop('checked', true) : '');
			}
		}
		
		if(data['virt'] == 'openvz'){
		
			if(!empty(data['flags']['enable_fuse_cp'])){
				$('#hvm_fuse_tr').show();
				(!empty(data['vps']['openvz_features']['fuse']) ? $('#hvm_fuse').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_ipip_cp'])){
				$('#hvm_ipip_tr').show();
				(!empty(data['vps']['openvz_features']['ipip']) ? $('#hvm_ipip').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_ipgre_cp'])){
				$('#hvm_ipgre_tr').show();
				(!empty(data['vps']['openvz_features']['ipgre']) ? $('#hvm_ipgre').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_nfs_cp'])){
				$('#hvm_nfs_tr').show();
				(!empty(data['vps']['openvz_features']['nfs']) ? $('#hvm_nfs').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_quotaugidlimit_cp'])){
				$('#hvm_quotaugidlimit_tr').show();
				$('#hvm_quotaugidlimit').val(data['vps']['openvz_features']['quotaugidlimit']);
			}

			if(!empty(data['flags']['enable_iolimit_cp'])){
				$('#hvm_iolimit_tr').show();
				$('#hvm_iolimit').val(data['vps']['openvz_features']['iolimit']);
			}

			if(!empty(data['flags']['enable_iopslimit_cp'])){
				$('#hvm_iopslimit_tr').show();
				$('#hvm_iopslimit').val(data['vps']['openvz_features']['iopslimit']);
			}
			
		}else{
			
			if(!empty(data['flags']['enable_enduser_vnc'])){
			
				$('#vnc_tr').show();
				
				if(!empty(data['vps']['vnc'])){
					$('#hvm_vnc').prop('checked', true); 
					$('#hvm_vnc_keymap_tr').show();
				}
	
				$('#hvm_vnc').change(show_hvm_vnc_keymap);
				
				var vnc_keymap_list = '';
				
				for(x in data['vnckeymaps']){
				
					vnc_keymap_list += '<option value="'+ data['vnckeymaps'][x] +'" '+ (data['vnckeymaps'][x] == data['vps']['vnc_keymap'] ? 'selected="selected"' : '') +' >' +data['vnckeymaps'][x] +'</option>';
				}
				
				$("#hvm_vnc_keymap").html(vnc_keymap_list).chosen({width: "100%"});
	
			}
				
			if(data['virt'] == 'kvm' || ((data['virt'] == 'xen' || data['virt'] == 'xcp') && data['vps']['hvm'] == 1)){
				
				$('#acpi_tr').show();
				$('#apic_tr').show();
				
				(data['vps']['acpi'] == 1 ? $('#acpi').prop('checked', true) : '');
				(data['vps']['apic'] == 1 ? $('#apic').prop('checked', true) : '');
				
				if(data['virt'] == 'kvm'){
					if(empty(data['flags']['disable_vga'])) {
						$('#hvm_vga_tr').show();
					
						if(!empty(data['vps']['kvm_vga'])){
							$('#hvm_enable_vga').attr('checked','checked');
							$('#hvm_enable_acceleration_tr').show();
							(!empty(data['vps']['acceleration']) ? $('#hvm_enable_acceleration').attr('checked','checked') : $('#hvm_enable_acceleration').removeAttr('checked'));
						}else{
							$('#hvm_enable_vga').removeAttr('checked');
							$('#hvm_enable_acceleration').removeAttr('checked');
						}
					
						$('#hvm_enable_vga').change(show_enable_accl);
					}
					
					if(!empty(data['flags']['eu_allow_virtio'])){
						
						$('#hvm_virtio_tr').show();
						
						if(!empty(data['vps']['virtio'])){
							$('#hvm_enable_virtio').attr('checked','checked');
						}else{
							$('#hvm_enable_virtio').removeAttr('checked');
						}
					}

		                        $('#hvm_timezone_tr').show();
		                        option_timezones = '';
		                        $.each(data['timezones'], function(region, list){
		                            option_timezones += '<optgroup label="'+region+'">'+"\n";
		                            $.each(list, function(key, value) {
		                                option_timezones += '<option value="'+ key +'" ' + (data['vps']['timezone'] == key ? 'selected="selected"' : '') + '>'+ value +'</option>';
		                            });
		                            option_timezones += '</optgroup>'+"\n";
		                        });
		                        $("#hvm_timezone").html(option_timezones).chosen({width: "100%"});
				}
			}

			if(data['flags']['iso_support']){
				
				if(!empty(data['flags']['enable_eu_iso'])){
					$('.eu_iso').show();
				}
				
				if('boot' in data){
					$('#boot_reorder_pos_tr').show();
					var order='';
					var boot_list = '';
					var i = 0;
					for(x in data['boot']){					
						if(x == 'c'){
							data['boot'][x] = '1) Hard Disk 2) CD Drive';
							order = 'cd';							
						}else if(x == 'd'){
							data['boot'][x] = '1) CD Drive 2) Hard Disk';
							order = 'dc';
						}
						boot_list += '<div><table><tr><td>';
						if(empty(i)){
							boot_list += '<input type="radio" name="boot" value="'+ order +'" id="boot_'+x+'" checked="checked"/>';
						}else{
							boot_list += '<input type="radio" name="boot" value="'+ order +'" id="boot_'+x+'" />';
						}
						boot_list += '</td><td width="12%"></td><td><label style="margin-top:9px;" for="boot_'+x+'">'+ data['boot'][x] +'</label></td></tr></table></div>';
						i++;
					}	
					$("#boot_reorder_pos").html(boot_list);
				}
			
				if('isos' in data){
					$('#hvm_isos_tr').show();
					var iso_list = '<option value="0">{{hvm_none}}</option>';
					var options_eu_iso = options_iso = '';
					for(x in data['isos']){
						if(!empty(data['isos'][x]['isuseriso'])){
							options_eu_iso += '<option value="'+ x +'" ' + (data['vps']['iso'] == x ? 'selected="selected"' : '') + '>'+ data['isos'][x]['filename'] +'</option>';
						}else{
							options_iso += '<option value="'+ x +'" ' + (data['vps']['iso'] == x ? 'selected="selected"' : '') + '>'+ data['isos'][x]['filename'] +'</option>';
						}
					}
					if(!empty(options_iso)){
						iso_list += '<optgroup label="{{hvm_admin_iso}}">' + options_iso + '</optgroup>';
					}
					if(!empty(options_eu_iso)){
						iso_list += '<optgroup label="{{hvm_user_iso}}">' + options_eu_iso + '</optgroup>';
					}
					
					$('#hvm_isos').html(iso_list).chosen({width: "100%"});
					
					if(data['virt'] == 'kvm' || data['virt'] == 'vzk'){
						options_eu_iso = options_iso = iso_list = '';
						iso_list = '<option value="0">{{hvm_none}}</option>';
						for(x in data['isos']){
							if(!empty(data['isos'][x]['isuseriso'])){
								options_eu_iso += '<option value="'+ x +'" ' + (data['vps']['sec_iso'] == x ? 'selected="selected"' : '') + '>'+ data['isos'][x]['filename'] +'</option>';
							}else{
								options_iso += '<option value="'+ x +'" ' + (data['vps']['sec_iso'] == x ? 'selected="selected"' : '') + '>'+ data['isos'][x]['filename'] +'</option>';
							}
						}
						if(!empty(options_iso)){
							iso_list += '<optgroup label="{{hvm_admin_iso}}">' + options_iso + '</optgroup>';
						}
						if(!empty(options_eu_iso)){
							iso_list += '<optgroup label="{{hvm_user_iso}}">' + options_eu_iso + '</optgroup>';
						}
						$('#hvm_sec_iso_tr').show();
						$('#hvm_sec_iso').html(iso_list).chosen({width: "100%"});
					}
				}
			}
			
			if(!empty(data['flags']['nic_support']) && !empty(data['flags']['enable_nic'])){
				var nic_type_list = '';
				for(x in data['nictypes']){
					nic_type_list += '<option value="'+ x +'" '+((x == data['vps']['nic_type'])?'selected':'')+' >'+data['nictypes'][x]+'</option>';
				}
				$("#hvm_nic_type").html(nic_type_list);
				$('#hvm_nic_type_tr').show();
			}
		}
	});
	
	pWindow({'ele' : '#show_hvmsetting_window'});
};

function hvm_sumbit_response(data){
	if(empty(data['error'])){
		loadpage('act=vpsmanage&svs='+N['info']['vps']['vpsid']);
	}
}

// Show the profile
function profile_onload(){
	
	// Parse the variables
	parseVars("profile", N["preferences"]);
	
};

function show_ssh_window(){
	
	$('#show_ssh').html('<center><applet code="com.jcraft.jcterm.JCTermApplet.class" archive="jcterm-0.0.10.jar?'+ Math.floor((Math.random() * 1000) + 1) +',jsch-0.1.46.jar?'+ Math.floor((Math.random() * 1000) + 1) +',jzlib-1.1.1.jar?'+ Math.floor((Math.random() * 1000) + 1) +'" codebase="[[theme]]/java/jcterm/" width="650" height="440"><param name="jcterm.font_size"  value="13"><!-- <param name="jcterm.fg_bg" value="#000000:#ffffff,#ffffff:#000000,#00ff00:#000000"> --> <!-- <param name="jcterm.config.repository" value="com.jcraft.jcterm.ConfigurationRepositoryFS"> --> <param name="jcterm.destinations" value="root@'+ N['info']['ip'][0] +'"> </applet> </center><br /><p align="center"><img src="[[images]]notice.gif" />&nbsp; {{vm_ssh_notice}}</p>');
	
	pWindow({'ele' : '#show_ssh_window'});
};

function show_sshkeys_window() {
	
	var badge = '<div class="col-sm-6">\
					<div class="os_badge media" style="margin-bottom:8px">\
						<div class="media-left"><img class="sshkey_img media-object" src="[[images]]sshkey2.png" height="56" width="56"></div>\
						<div class="media-body">\
							<h4 class="key_name media-heading"></h4>\
						</div>\
					</div>\
					<input type="hidden" name="ssh_keys[]" value="" disabled="true" />\
				</div>';
	
	$('#sshkeysform').attr('action', 'act=sshkeys&svs='+N['vpsid']);
	
	$('#sshkey_list').empty();
	
	$('#sshkeysform .green_but').hide();
				
	AJAX('[[API]]act=sshkeys&svs='+N['vpsid'], function(data) {
		
		if(empty(data['ssh_keys'])) {
			$('#sshkey_list').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{sshkey_no_keys_acct_whmcs}}<br><input type="button" value="{{sshkey_add}}" class="green_but" onclick="javascript:loadpage(\'act=addsshkey\'); pWindowClose(\'#show_sshkeys_window\');return false;" /></div>');
			return false;
		}
		
		$('#sshkeysform .green_but').show();
		
		$.each(data['ssh_keys'], function(k, v) {
			
			var $tmp = $(badge).clone();
			
			$tmp.data('keyid', v['keyid']);
			$tmp.find('.key_name').text(v['name']);
			
			$tmp.click(function() {
				$(this).find('.media').toggleClass('selected');
				
				var selected = $(this).find('.media').hasClass('selected');
				
				$(this).find('input').attr('disabled', !selected)
						.val(v['keyid']);
			});
			
			$('#sshkey_list').append($tmp);
			
		});
		
	});
	
	pWindow({'ele' : '#show_sshkeys_window'});
	
};

function show_vnc_window(){
	
	AJAX('[[API]]act=vnc&svs='+N['vpsid'], function(data) {
		//alert(data['info']['ip'] + ' -- '+ data['info']['port'])
		$('#vncip').html(data['info']['ip']);
		$('#vncport').html(data['info']['port']);
		var vnc_buttons = '';
		
		if('novnc' in data['info']){
			vnc_buttons += '<a href="javascript:void(0);" onclick="launchHTML5vnc(\''+N['vpsid']+'\')" class="green_but green_but_a">{{vnc_novnc_button}}</a>&nbsp;';
		}
		
		if('disable_java_vnc' in data['info']){
			vnc_buttons += '';
		}else{
		vnc_buttons += '<a href="javascript:void(0);" onclick="launchjvnc(\''+N['vpsid']+'\')" id="vnc_button" class="green_but green_but_a">{{vnc_launch_vnc}}</a>';
		}
		$('#vnc_buttons').html(vnc_buttons);
	});
	
	pWindow({'ele' : '#show_vnc_window'});
};

function launchjvnc(vpsid){
	window.open('[[url]]act=vnc&launch=1&jsnohf=1&svs='+vpsid,'vnc','width=300,height=150');
};

function launchHTML5vnc(vpsid){
	var thisURL = window.location.href;
	thisURL = thisURL.toString();
	thisURL = thisURL.replace('http:', 'https:');
	thisURL = thisURL.replace(':4084', ':4085');
	window.open('[[url]]act=vnc&novnc=1&jsnohf=1&svs='+vpsid, '_blank', 'height=400,width=720');
};

function show_vncpass_window(){
	
	if(N['info']['vps']['vnc'] == ''){
		alert('{{vnc_not_enabled}}');
		return false;
	}
	$('#vncpassform').attr('action', 'act=vncpass&jsnohf=1&svs='+N['vpsid']);
	pWindow({'ele' : '#show_vncpass_window'});
	
};

function show_osreinstall_window(){
	
	// Reset all data
	$('#osreinstallform').attr('action', 'act=ostemplate&jsnohf=1&svs='+N['vpsid']);
	$('#os_list').html('');
	$('#osreinstallform')[0].reset();
	
	// The template for OS select badge
	var os_badge = '<div class="col-sm-6"><div style="height:72px; overflow:visible; margin-bottom:8px;"><div class="os_badge media"><i class="fa fa-2x fa-caret-down" aria-hidden="true"></i><div class="media-left"><img class="distro_img media-object" src="" height="56" width="56"></div><div class="media-body"><h4 class="distro_name media-heading"></h4><span class="version"></span></div><div class="os_badge_list"></div></div></div></div>';

	AJAX('[[API]]act=ostemplate&svs='+N['vpsid'], function(data) {

		var vpsvirt = data['virt'];
		var oslist = data['oslist'][vpsvirt];
		var distros = data['distros'];
		var format_primary = data['info']['flags']['os_format_primary'];
		var show_oses = 0;
		
		$("#os_format_primary").hide();
		
		if(!empty(format_primary)){
			$("#os_format_primary").show();
		}

		for(os in oslist){
			if(oslist[os] != 0){
				show_oses = 1;
				break;
			}
		}

		if(show_oses == 0){
			$("#osreinstallform").hide();
			$("#no_os").css("display", "");
		}

		for(x in oslist) {
			var distro_name = '';
			var distro_img = '';

			if(!(x in distros) || distros[x] == ''){
				distro_name = '{{os_other}}';
				distro_img = '[[images]]others_60.png';
			}else{
				$v = distros[x];
				distro_name = $v['name'];
				distro_img = ($v['logo'] != '' ? $v['logo'] : '[[images]]' + $v['distro'] + '_60.png');
			}

			if(oslist[x] != ''){
				var $os_select = $(os_badge).clone();
				
				$os_select.find('.distro_img').attr('src', distro_img);
				$os_select.find('.distro_name').text(distro_name);
				
				var os_ids = Object.keys(oslist[x]);
				
				// Show dropdown only if distro has more than 1 template
				if(os_ids.length > 1) {
					for(os in oslist[x]) {
						$os_select.find('.os_badge_list').append('<a href="#" data-os="'+os+'" onclick="return false;">'+oslist[x][os]['name']+'</a>');
						$os_select.find('.version').text('{{os_select_version}}');
					}
				} else {
					var os_id = os_ids[0];
					
					$os_select.find('.version').text(oslist[x][os_id]['name']);
					$os_select.find('.os_badge').attr('data-os', os_id);
					$os_select.find('.os_badge_list, i.fa-caret-down').remove();
				}
				
				$('#os_list').append($os_select);
			}
		}
		
		$('.os_badge').click(function() {
			$('#os_list .os_badge').removeClass('expanded').removeClass('selected');
			
			var os_id = $(this).data('os');
			
			if(os_id) {
				$(this).addClass('selected');
				$('#newos').val(os_id);
			} else {
				$(this).addClass('expanded');
			}
		});
		
		$('.os_badge .os_badge_list a').click(function() {
			$('#os_list .os_badge').removeClass('expanded').removeClass('selected');
			
			var os_id = $(this).data('os');
			var version = $(this).text();
			
			// Make it bold
			$(this).css('font-weight', 'bold');
			$(this).siblings().css('font-weight', 'normal');
			
			$(this).closest('.os_badge').addClass('selected').find('.version').text(version);
			$('#newos').val(os_id);
			
			return false;
		});

		pWindow({'ele' : '#show_osreinstall_window'});

	});
	
	var events = $._data($('#osreinstallform')[0], 'events');
	
	if(empty(events)){
		
		$('#osreinstallform').submit(function(){
			if(!confirm('{{os_rebuild_data_lost_warn}}')){
				return false;
			}
			
			showspinner();
			
			return submitit('osreinstallform', 'osreinstallresp');
		});
	}
};

function osreinstallresp(data){
	//Hide the progress bar
	$("#show_osreinstall_window .scrollbar-virt").show();
	$("#prog_spin").hide();
	
	if(!empty(data["done"])){
		pWindowClose('#show_osreinstall_window');
	}
	
};

function showspinner(){
	$('#show_osreinstall_window .scrollbar-virt').hide();
	$('#prog_spin').show();
};

function show_cpinstall_window(){
	$('#installcp').attr('action', 'act=controlpanel&jsnohf=1&svs=' + N['vpsid'])
	pWindow({'ele' : '#show_cpinstall_window'});
};

function show_backup_window(){
	
	$("#restore_submit, #del_backup_submit").hide();
	$('#backupform').attr('action', 'act=backup&jsnohf=1&svs=' + N['vpsid'])
	AJAX('[[API]]act=backup&svs=' + N['vpsid'], function(data) {
		
		if('backups_list' in data && data['backups_list'] == 1){
			$("#restore_submit, #del_backup_submit").show();
		}
		
		$("#cbackup_submit, #restore_submit, #del_backup_submit").unbind( "click");
		
		$("#cbackup_submit").click(function(){
			if(confirm("{{bkup_conf_cbackup}}")){
				$('#cbackup').val(1);
				$('#restore').val('');
				$('#del_backup').val('');
				return submitit('backupform', 'closebackup_pwindow');
			}
			return false;
		});
		
		$("#restore_submit").click(function(){
			if(confirm("{{bkup_conf_restore}}")){
				$('#restore').val(1);
				$('#cbackup').val('');
				$('#del_backup').val('');
				return submitit('backupform', 'closebackup_pwindow');
			}
			return false;
		});
		
		$("#del_backup_submit").click(function(){
			if(confirm("{{bkup_conf_del_backup}}")){
				$('#del_backup').val(1);
				$('#restore').val('');
				$('#cbackup').val('');
				return submitit('backupform', 'closebackup_pwindow');
			}
			return false;
		});
		
		return false;
	});
	
	pWindow({'ele' : '#show_backup_window'});
}

function closebackup_pwindow(){
	pWindowClose('#show_backup_window');
};

function show_backup2_window(){
	
	// Reset all data first
	set_backups_table([]);
	$('#bkup2_server').text('');
	$('#bkup2_bserid').find('option').not('[value=0]').remove();
	$('#bkup2_settings_form').attr('action', 'act=backup2&svs=' + N['vpsid']);
	$('#bkup2_settings_form')[0].reset();
	
	// Set selected tab to first by default
	$('#bkup2_tabs a:first').tab('show');
	$('#bkup2_tabs').hide();
	
	// Set the VPSID text
	$('#bkup2_vpsid').text(N['vpsid']);
	
	$('#bkup2_now, #bkup2_bkup_used, #bkup2_restore_used, #bkup2_current_cycle').hide();
	
	// Get backup window data
	AJAX('[[API]]act=backup2&svs=' + N['vpsid'], function(data) {
		
		if(!empty(data["error"])){
			error(data["error"]);
			pWindowClose('#show_backup2_window');
			return;
		}
		
		var backup_limit_txt = data['backup_limit'] == -1 ? '{{bkup2_unlimited}}' : data['backup_limit'];
		var restore_limit_txt = data['restore_limit'] == -1 ? '{{bkup2_unlimited}}' : data['restore_limit'];
		
		// Show remaining backup and restore counts
		$("#bkup2_bkup_used span").text(data['backup_used']+' / '+backup_limit_txt);
		$("#bkup2_restore_used span").text(data['restore_used']+' / '+restore_limit_txt);
		$("#bkup2_current_cycle span").text(data['service_period']['start']+' {{to}} '+data['service_period']['end']);
		
		if(data["backup_limit"] != 0) {
			$('#bkup2_now, #bkup2_bkup_used, #bkup2_current_cycle').show();
		}
		
		if(data["restore_limit"] != 0) {
			$('#bkup2_restore_used, #bkup2_current_cycle').show();
		}
		
		var restore = (data["restore_limit"] != 0);

		// Populate backups list
		set_backups_table(data['backups_list'], restore);
		
		if(!empty(data['backup_servers'])) {
			$('#bkup2_tabs').show();
			
			// Get selected backup server
			var selected_server = null;
			$.each(data['backup_servers'], function(i, v) {
				if(v['selected'] == true) {
					selected_server = v;
				}
			});
			
			// Show server name selected in settings
			if(selected_server) {
				$('#bkup2_server').text('({{bkup2_server}}: ' + selected_server['name'] + ')');
			}
			
			// Populate backup settings
			var el = $('#bkup2_bserid');
			
			$.each(data['backup_servers'], function(i, v) {
				el.append($("<option />").val(v['bserid']).text(v['name']));
			});
			
			if(selected_server) {
				el.val(selected_server['bserid']);
			}
		}
	});

	pWindow({'ele' : '#show_backup2_window'});
};

function set_backups_table(backups_list, restore) {
	var table = null;
	
	if($.fn.DataTable.isDataTable('#backup_table')) {
		table = $('#backup_table').DataTable();
	} else {
		table = $('#backup_table').DataTable({
			columns: [
				{ className: 'dt-left' },
				{ className: 'dt-center', width: '50px', orderable: false }
			],
			order: [[ 0, 'desc' ]]
		});
	}
	
	table.clear().draw();
	
	var table_data = [];

	for(var i=0; i<backups_list.length; i++) {
		var year = backups_list[i].substr(0, 4);
		var mon = backups_list[i].substr(4, 2);
		var day = backups_list[i].substr(6, 2);
		
		var action_restore = (restore ? '<a href="#" title="{{bkup2_restore}}" onclick="restore(' + year + mon + day + '); return false;"><img src="[[images]]admin/restore.png" width="20" /></a>&nbsp;&nbsp;' : '');
		
		table_data.push([year + "-" + mon + "-" + day, action_restore + '<a href="#" title="{{delete}}" onclick="backup_delete(' + year + mon + day + '); return false;"><img src="[[images]]delete.png" width="20" /></a>']);
	}
	
	table.rows.add(table_data).draw();
}

function restore(date){
	
	var res_conf = confirm('{{bkup2_conf_restore}}');
	
	if(!res_conf){
		return false;
	}
	
	$('#backupform2').attr('action', 'act=backup2&svs=' + N['vpsid']);
	$('#cbackup_bkup2').val('');
	$('#restore_bkup2').val(1);
	$('#delete_bkup2').val('');
	$('#date_bkup2').val(date);
	
	submitit('backupform2');
};

function backup_now(){
	
	var back_conf = confirm('{{bkup_conf_cbackup}}');
	
	if(!back_conf){
		return false;
	}
	
	$('#backupform2').attr('action', 'act=backup2&svs=' + N['vpsid']);
	$('#cbackup_bkup2').val(1);
	$('#restore_bkup2').val('');
	$('#delete_bkup2').val('');
	$('#date_bkup2').val('');
	
	submitit('backupform2');
};

function backup_delete(date){
	var del_conf = confirm('{{bkup2_conf_delete}}');
	
	if(!del_conf){
		return false;
	}
	
	$('#backupform2').attr('action', 'act=backup2&svs=' + N['vpsid']);
	$('#cbackup_bkup2').val('');
	$('#restore_bkup2').val('');
	$('#delete_bkup2').val(1);
	$('#date_bkup2').val(date);
	
	submitit('backupform2', 'backup_delete_response');
};

function backup_delete_response(data) {
	if(!empty(data["done"])){		
		var restore = (data["restore_limit"] != 0);
		
		set_backups_table(data['backups_list'], restore);
	}
}

function bkup2_settings_response(data) {
	var restore = (data["restore_limit"] != 0);
	
	set_backups_table(data['backups_list'], restore);
	
	$('#bkup2_server').text('');
	
	if(!empty(data['backup_servers'])) {
		var selected_server = null;
		$.each(data['backup_servers'], function(i, v) {
			if(v['selected'] == true) {
				selected_server = v;
			}
		});
		
		if(selected_server) {
			$('#bkup2_server').text('({{bkup2_server}}: ' + selected_server['name'] + ')');
		}
	}
}

function closerescue_pwindow(){
	pWindowClose('#show_rescue_window');
};

function show_rescue_window(){
	
	AJAX('[[API]]act=rescue&svs='+N['vpsid'], function(data) {
		
		$('#cant_rescue_div').hide();
		
		if(!empty(data['cant_rescue'])){
			$('#cant_rescue_div').show();
		}
		
		if(data['rescue_enabled'] == true){
			// Show thw disable form
			$('#disableform').attr('action', 'act=rescue&svs='+N['vpsid']);
			$('#enbale_rescue_div').css('display', 'none');
			$('#disable_rescue_div').css('display', '');
		}else{
			// show the enable form
			$('#enableform').attr('action', 'act=rescue&svs='+N['vpsid']);
			$('#enbale_rescue_div').css('display', '');
			$('#disable_rescue_div').css('display', 'none');
		}
		/*for(x in data){
			alert(data[x])
		}*/
	});
	pWindow({'ele' : '#show_rescue_window'});
};

function show_listrecipes_window(startURL){
	
	startURL = startURL || 'act=listrecipes';
	
	var regex = new RegExp("[\\?&]page=([^&#]*)");
	var results = regex.exec(startURL);
	var pageNum = 0;
	if(results != null){
		pageNum = decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	$('#recipeform').attr('action', 'act=listrecipes&svs='+N['vpsid']+'&page='+pageNum);
	
	AJAX('[[API]]act=listrecipes&svs='+N['vpsid']+'&page='+pageNum, function(data) {

		pageLinks("recipe_links", 'act=listrecipes&svs='+N['vpsid'], data['page'], 'show_listrecipes_window');

		var recipe_table = '';
		recipe_table += '<table cellpadding="0" cellspacing="0" border="0" class="table table-hover tablesorter" id="recipestable" width="100%"><thead><tr><th>{{id}}</th><th width="15%">{{logo}}</th><th>{{name}}</th><th>{{manage}}</th><th>{{ingredients}}</th></tr></thead>';
		
		// Prepare the list
		for(x in data['recipes']){
			
			$v = data['recipes'][x];
			
			recipe_table += '<tr><td align="left" width="5%">' + $v['rid'] + '</td><td align="center" width="10%"><img width="24" src="'+(!empty($v['logo']) ? $v['logo'] : '[[images]]recipes.png' )+'" /></td><td align="left" id="name'+$v['rid']+'">' + $v['name'] + '</td><td align="center" width="20%"><a href="javascript:void(0);" onclick="execute_recipe('+N['vpsid']+', '+$v['rid']+');" class="alink">{{execute}}</a></td><td align="center" width="10%"><img src="[[images]]admin/information.gif" width="18" alt="{{ingredients}}" style="cursor:pointer;" onclick="show_recipe(\''+$v['rid']+'\')"/><div id="desc'+$v['rid']+'" style="display:none;" >'+ ($v['desc'] != null ?  $v['desc'] : '{{no_desc}}')+ '</div><div style="display:none;" id="code'+$v['rid']+'">'+$v['code']+'</div></td></tr>';
			
		}
		
		recipe_table += '</table></form>';
		
		// We have to do this as we want to show the desc in same line
		var tmp_str = $("#recipe_links .pagination-top").html();
		$("#recipe_links .pagination-top").html('<span style="text-align:left;">{{rec_short_desc}}</span>' + tmp_str);
		
		$('#recipes_list').html(recipe_table);
	});
	
	pWindow({'ele' : '#show_listrecipes_window'});
	
};

function show_recipe(id){
	
	$("#rec_desc").html($("#desc"+id).html());
	$("#rec_code").html("<pre>"+$("#code"+id).html()+"</pre>");
	
	pWindow({'ele' : '#show_recipecode_window'});
};

function execute_recipe(vpsid, rid){	

	if(!confirm("{{conf_execute}}")){
		return false;
	}
	
	var tmp_action = $('#recipeform').attr('action');
	$('#recipeform').attr('action', tmp_action+'&rid='+rid);
	$("#exec_rid").val(rid);
	submitit('recipeform');
};

function show_managesubnets_window(){
	
	AJAX('[[API]]act=managesubnets&svs='+N['vpsid'], function(data) {
		
		var subnet_table = '';
		subnet_table += '<table cellpadding="0" cellspacing="0" border="0" class="table table-hover tablesorter" id="managesubnets" width="100%"><thead><tr><th width="70%">{{mng_ipv6_subnet}}</th><th>{{mng_edit_subnet}}</th></tr></thead>';
		
		// Prepare the list
		for(x in data['ips']){
			
			$v = data['ips'][x];
			
			subnet_table += '<tr><td align="center">' + $v['ip'] + '/' + $v['ipr_netmask'] + '</td><td align="center" id="data-subnet" data-subnet="' + $v['ip'] + '/' + $v['ipr_netmask'] + '" class="manage_subnet" onclick="show_add_ipv6_to_subnet(this);"><img width="16" height="16" src="[[images]]edit.png" style="cursor:pointer;"/></td></tr>';
			
		}
		
		subnet_table += '</table><input type="hidden" name="subnet" value="" id="subnet_id" />';
		
		$('#managesubnets_div').html(subnet_table);
		
		$("#managesubnets").dataTable();
	});
	
	pWindow({'ele' : '#show_managesubnets_window'});
};

//------------------------------MANAGE VDF------------------------------

function show_managevdf_window(){
	
	//$('#managevdfform').attr('action', 'act=managevdf&svs=' + N['vpsid']);
	//$('#managevdf_div').html('');
	
	$("#vdf_infobox").css("display", "none");
	
	vdf_url = '[[API]]act=managevdf&svs=' + N['vpsid'];
	vdf_edit_ico = "fa fa-2x fa-edit";
	vdf_save_ico = "fa fa-2x fa-save";
	vdf_delete_ico = "fa fa-2x fa-remove";
	vdf_revert_ico = "fa fa-2x fa-undo";

	AJAX(vdf_url, function(data) {
		$supported_protocols = data['supported_protocols'];
		$haproxydata = data['haproxydata'];
		$vpses = data['vpses'];
		$arr_haproxy_src_ips = data['arr_haproxy_src_ips'];
		
		$('#vdf_infobox_rp').html(data["server_haconfigs"][N['info']['vps']['serid']]['haproxy_reservedports']);
		$('#vdf_infobox_rph').html(data["server_haconfigs"][N['info']['vps']['serid']]['haproxy_reservedports_http']);
		$('#vdf_infobox_ap').html(data["server_haconfigs"][N['info']['vps']['serid']]['haproxy_allowedports']);
		
		//List current VDF entries
		listvpsforwardertbl();
		
		// Hide add VDF form if was visible previously and show add vdf form button
		$("#addvdf_form_div").hide();
		$("#showaddvdfformbtn").show();
		vdf_vpsuuid = N['info']['vps']['uuid'];
		vdf_serid = N['info']['vps']['serid'];
		
		
		
	});

	pWindow({'ele' : '#show_managevdf_window'});

};
//---------------------------MANAGE VDF ENDS----------------------------

function show_add_ipv6_to_subnet(id){
	
	$('#subnet_id').val($(id).attr('data-subnet'));
	$('#managesubnetsform').attr('action', 'act=managesubnets&svs='+N['vpsid']);
	
	return submitit('managesubnetsform', 'managesubnetsform_response');
};

function managesubnetsform_response(data){
	
	var addipv6_html = '';
	$('#managesubnetsform').attr('action', 'act=managesubnets&svs='+N['vpsid']);
		
	addipv6_html += '<table cellpadding="0" cellspacing="0" border="0" class="table table-hover tablesorter" id="additional_ipv6Lists"><thead><tr><th>{{mng_ipv6_address}}</th><th>{{mng_ipv6_delete}}</th></tr></thead>';
	
	var ipr_ips = data['ipr_ips'];
	
	if(('ipv6' in ipr_ips) && !empty(ipr_ips['ipv6'])){
		for(x in ipr_ips['ipv6']){
			addipv6_html += '<tr><td align="center">' + ipr_ips['ipv6'][x] + '</td><td align="center"><span  class="delete_ipv6"><img width="16" height="16" src="[[images]]delete.png"/></span></td></tr>';
		}
	}
	
	addipv6_html += '</table><table style="width:100%"><tr><td>{{mng_add_ipv6}}<td><div class="add_ipv6_row">';
	
	var ipv6_parts_arr = ipr_ips['ipv6_addr'].split(':');
	
	var ipv6_input_boxes = new Array();
	
	// loop till value which are disabled to edit
	for(var i = 0; i < (8 - ipr_ips['ipv6_subnet_mask_value']); i++){
		ipv6_input_boxes[i] = '<input type="text" name="ipv6_parts[]" value="' + ipv6_parts_arr[i] + '" disabled="disabled" size="5" maxlength="4"></input>';		
	}
	
	// display rest of the input boxes
	for(i = i; i < 8; i++){
		ipv6_input_boxes[i] = '<input type="text" name="ipv6_parts[]" value="" size="5" maxlength="4"></input>';
	}
	
	addipv6_html += ipv6_input_boxes.join('&nbsp;:&nbsp;');
			
	addipv6_html += '</td></tr><tr><td colspan="0"><br/></td></tr><tr><td colspan="0"><div class="ui-dialog-buttonset"><center><button class="green_but add_ipv6_row_button" onclick="submitit(\'managesubnetsform\');return false;" >{{mng_add_ip_button}}</button> &nbsp; <button type="button" class="green_but ipv6_back_button" onclick="show_managesubnets_window();">{{mng_back_button}}</button></center></div></td></tr></table><input type="hidden" name="ipv6_addr" value="" id="ipv6_addr_id" /><input type="hidden" name="ipv6_subnet_mask" value="" id="ipv6_subnet_mask_id" /><div id="new_ipv6_id"></div>';
	
	$('#managesubnets_div').html(addipv6_html);
	
	var tableData = $("#additional_ipv6Lists").dataTable();
	
	$(".add_ipv6_row_button").click(function(){
		insertIP(tableData, ipr_ips);		
	});
	
	$("#additional_ipv6Lists").on("click", "tr span.delete_ipv6", function () {
		var r = confirm("{{mng_delete_confirm}}");
		if (r == true) {
			var iPos = tableData.fnGetPosition(this.parentNode);
			tableData.fnDeleteRow(iPos[0]);//delete row	
			insertIP(tableData, ipr_ips);
		}
	});
	
};

function insertIP(tableData, ipr_ips){
	
	ipv6 = new Array();
	
	$("input[name^=ipv6_parts]").each(function(i, el){
		
		if(el.value){
			ipv6.push(el.value);
		}else{
			ipv6.push("O");
		}
	});
	
	ipv6 = ipv6.join(':');
	
	if(ipv6.indexOf('O') < 0){
		tableData.fnAddData([ipv6, '<span class="delete_ipv6"><img width="16" height="16" src="[[images]]delete.png"/></span>']);
	}
	
	var new_ipv6 = '';
	
	$(tableData.fnGetNodes()).each(function(i, el){
		new_ipv6 += '<input type="hidden" name="new_ipv6[]" value="'+ $(this).find("td").html() +'">';
	});
	
	if(!new_ipv6.length){
		new_ipv6 = 1;
	}
	
	$('#ipv6_subnet_mask_id').val(ipr_ips['ipv6_subnet_mask']);
	$('#ipv6_addr_id').val(ipr_ips['ipv6_addr']);
	$('#new_ipv6_id').html(new_ipv6);
	
	return submitit('managesubnetsform', 'managesubnetsform_response');
};

function show_console_window(action){
	
	$('#console_div').html('');
	
	if(action != "undefined"){
		action = '&'+action+'=1';
	}
	
	AJAX('[[API]]act=console'+action+'&svs=' + N['vpsid'], function(data) {
		
		var console = data['console'];
		
		if(empty(console['time_left'])){
			var cs_html = '<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{cs_none}}</div><br /><br /><center><a href="javascript:void(0);" class="abut" id="cs_create" onclick="create_cosole_session('+ N['vpsid'] +')">{{cs_create}}</a></center><br /><br /><br />';
		}else{
			var cs_html = '<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{cs_details}}</div><br /><table align="center" cellpadding="10" cellspacing="0" border="0"><tr><td>{{cs_expires}}</td><td>:&nbsp;&nbsp;</td><td class="val" id="console_time"></td></tr><tr><td>{{cs_ip}}</td><td>:&nbsp;&nbsp;</td><td class="val">' + data['server_publicip'] + '</td></tr><tr><td>{{cs_port}}</td><td>:&nbsp;&nbsp;</td><td>' + console['port'] + '</td></tr><tr><td>{{cs_username}}</td><td>:&nbsp;&nbsp;</td><td>' + console['username'] + '</td></tr><tr><td>{{cs_password}}</td><td>:&nbsp;&nbsp;</td><td>' + console['password'] + '</td></tr></table><br /><br /><center><a href="javascript:void(0);" class="abut" id="cs_destroy" onclick="destroy_cosole_session();">{{cs_destroy}}</a><br /><br /><br /><a onclick="$(\'#cs_applet\').show();" class="abut">{{cs_java_console}}</a></center><br /><br /><br /><center style="display:none" id="cs_applet">	<applet code="com.jcraft.jcterm.JCTermApplet.class"       archive="jcterm-0.0.10.jar?' + randstr(3) + ',jsch-0.1.46.jar?' + randstr(3) + ',jzlib-1.1.1.jar?' + randstr(3) + '"	codebase="[[theme]]/java/jcterm/"			width="650" height="480"><param name="jcterm.font_size"  value="13"><!-- <param name="jcterm.fg_bg" value="#000000:#ffffff,#ffffff:#000000,#00ff00:#000000"> --><!--<param name="jcterm.config.repository" value="com.jcraft.jcterm.ConfigurationRepositoryFS"> --><param name="jcterm.destinations" value="' + console['username'] + '@' + data['server_publicip'] + ':' + console['port'] + '"></applet></center><br /><br />';
			
			var fiveMinutes = console['time_left'];
			
			updateTime(fiveMinutes);
	
		}
		
		$('#console_div').html(cs_html);
		
		pWindow({'ele' : '#show_console_window'});
		
	});
};

function create_cosole_session(vpsid){
	show_console_window('create');
};

function destroy_cosole_session(vpsid){
	$("#console_time").text('');
	show_console_window('destroy');
};

function updateTime(fiveMinutes) {
	
	var display = $("#console_time"), mins, seconds;
	
	mins = parseInt(fiveMinutes / 60)
	seconds = parseInt(fiveMinutes % 60);
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	display.text(mins + ":" + seconds);
	fiveMinutes--;
	
	if (fiveMinutes >= 0) {
		setTimeout(function(){updateTime(fiveMinutes);}, 1000);
	}
};

function show_monitor_window(open_window, mon){

	// Retain the state of radio button
	var search_state = undefined;
	$("#note_box").css("display", "none");

	AJAX('[[API]]act=monitor&svs=' + N['vpsid'] + '&show=' + mon, function(data) {

		var cpudata = data['cpu'];
		var diskdata = data['disk'];
		var ramdata = data['ram'];
		var iodata = data['io'];

		$('#cpu_show_graph, #ram_show_graph, #diskgraphcell, #inodesgraphcell').css('display', '');

		var ajaxTimer = null;

		var cpu = [
			{ label: "{{used}}",  data: cpudata['cpu']['percent']},
			{ label: "{{free}}",  data: cpudata['cpu']['percent_free']}
		];

		resource_graph("cpuchart", cpu);

		var ram = [
			{ label: "{{used}}",  data: ramdata['percent']},
			{ label: "{{free}}",  data: ramdata['percent_free']}
		];

		resource_graph("ramchart", ram);
		//startusage();

		var disk = [
			{ label: "{{used}}",  data: diskdata['disk']['used_gb']},
			{ label: "{{free}}",  data: diskdata['disk']['free_gb']}
		];

		resource_graph("diskchart_holder", disk);


		var inodes = [
			{ label: "{{used}}",  data: diskdata['inodes']['used']},
			{ label: "{{free}}",  data: diskdata['inodes']['free']}
		];

		resource_graph("inodeschart_holder", inodes);

		// File the CPU info
		$('#cpulimit').html(cpudata['cpu']['limit']);
		$('#cppercent').html(cpudata['cpu']['percent']);
		$('#cpuman_img').attr('src', '[[images]]' + cpudata['cpu']['manu'] + '.gif');
		
		// Fill the RAM information
		var swap_lang = '{{ram_burstable}}';
		var swap_val = ramdata['burst'];
		$('#ramlimit').html(ramdata['limit'] + ' MB');
		if('swap' in ramdata){
			swap_lang = '{{ram_swap}}';
			swap_val = ramdata['swap'];
		}
		$('#swap_lang').html(swap_lang);
		$('#swap_val').html(swap_val + ' MB');
		$('#ramused').html(ramdata['used'] + ' MB');
		$('#raminpercent').html(ramdata['percent'] + '%');
		
		// Fill the DISK/INODE information
		$('#disk_limit').html(diskdata['disk']['limit_gb'] + ' GB');
		$('#disk_used').html(diskdata['disk']['used_gb'] + ' GB');
		$('#disk_percent').html(diskdata['disk']['percent'] + ' %');
		
		$('#inod_limit').html(diskdata['inodes']['limit']);
		$('#inod_used').html(diskdata['inodes']['used']);
		$('#inod_percent').html(diskdata['inodes']['percent'] + ' %');

		var monthly_data = (!empty(data.monthly_data) ? data.monthly_data : 0);
		var month = (!empty(data.month) ? data.month : 0);

		//For showing up the average download and upload speed
		var avg_download = 0;
		var avg_upload = 0;
		var avg_io_read = 0;
		var avg_io_write = 0;
		var count = 0;
		var cpu_data = new Array();
		var inode_data = new Array();
		var ram_data = new Array();
		var disk_data = new Array();
		var ntw_in_data = new Array();
		var ntw_out_data = new Array();
		var ntw_total_data = new Array();
		var io_read_data = new Array();
		var io_write_data = new Array();

		if(monthly_data){

			$.each(monthly_data, function(key, val){

				//Array is in format [vpsid, time, status, disk, inode, ram, cpu, net_in, net_out]
				cpu_data.push([val[1], val[6]]);

				inode_data.push([val[1], val[4]]);

				ram_data.push([val[1], val[5]]);

				disk_data.push([val[1], val[3]]);

				ntw_in_data.push([val[1], val[7]]);

				ntw_out_data.push([val[1], val[8]]);

				ntw_total_data.push([val[1], (parseInt(val[7])+parseInt(val[8]))]);

				io_read_data.push([val[1], val[9]]);

				io_write_data.push([val[1], val[10]]);

				// Display the average speed of available data
				avg_download += parseInt(val[7]);
				avg_upload += parseInt(val[8]);
				avg_io_read += parseInt(val[9]);
				avg_io_write += parseInt(val[10])
				count++;
			});

			// As data is differently interpreted on mozilla and chrome so initial sorting is done
			cpu_data.sort(function(a, b){
				return a[0]-b[0];
			});

			var cpu_graph = [
				{ label: "{{mon_cpu_usage}}",  data: cpu_data}
			];

			var inode_graph = [
				{ label: "{{mon_inode_usage}}",  data: inode_data, color: "#80b3ff"}
			];

			var ram_graph = [
				{ label: "{{mon_ram_usage}}",  data: ram_data, color: "#ccff33"}
			];

			var disk_graph = [
				{ label: "{{mon_disk_usage}}",  data: disk_data, color: "#ff6600"}
			];

			var io_read_graph = [
				{ label: "{{mon_io_read_spd}}",  data: io_read_data, color: "#0077FF"},
			];

			var io_write_graph = [
				{ label: "{{mon_io_write_spd}}",  data: io_write_data, color: "#FF6600"},
			];
			var ntw_graph = [
				{ label: "{{mon_down_speed}}",  data: ntw_in_data, color: "#0077FF"},
				{ label: "{{mon_up_speed}}",  data: ntw_out_data , color: "#0000A0"},
				{ label: "{{mon_total_speed}}",  data: ntw_total_data }
			];

			// Calculating the average Downloading Speed per month
			avg_download = (avg_download/count/1024/1024).toFixed(5);
			$("#avg_download").html(avg_download + " Mb/s");

			// Calculating the average Uploading Speed per month
			avg_upload = (avg_upload/count/1024/1024).toFixed(5);
			$("#avg_upload").html(avg_upload + " Mb/s");

			// Calculating the average I/O read per month
			avg_io_read = (avg_io_read/count/1024/1024).toFixed(5);
			$("#io_read").html(avg_io_read + " Mb/s");

			// Calculating the average I/O write per month
			avg_io_write = (avg_io_write/count/1024/1024).toFixed(5);
			$("#io_write").html(avg_io_write + " Mb/s");

			selection_zooming("cpu_plot", cpu_graph);
			live_resource_graph("cpu_plot", cpu_graph, flot_options("cpu_plot"), "% at ",true);

			selection_zooming("ram_plot", ram_graph);
			live_resource_graph("ram_plot", ram_graph, flot_options("ram_plot"), "MB at ",true);
			
			selection_zooming("disk_plot", disk_graph);
			live_resource_graph("disk_plot", disk_graph, flot_options("disk_plot"), "MB at ",true);

			selection_zooming("inode_plot", inode_graph);
			live_resource_graph("inode_plot", inode_graph, flot_options("inode_plot"), "Blocks at ",true);
			
			selection_zooming("ntw_plot", ntw_graph);
			live_resource_graph("ntw_plot", ntw_graph, flot_options("ntw_plot"), "Mb/s at ",true);
			
			selection_zooming("io_read_plot", io_read_graph);
			live_resource_graph("io_read_plot", io_read_graph, flot_options("io_read_plot"), "Mb/s at ",true);
			
			selection_zooming("io_write_plot", io_write_graph);
			live_resource_graph("io_write_plot", io_write_graph, flot_options("io_write_plot"), "Mb/s at ",true);

			var current_year = month.current_month.substring(0,4);
			var current_month = parseInt(month.current_month.substring(4));
			var monthNames = [ "{{jan}}", "{{feb}}", "{{mar}}", "{{apr}}", "{{may}}", "{{jun}}", "{{jul}}", "{{aug}}", "{{sep}}", "{{oct}}", "{{nov}}", "{{dec}}" ];

			$('#month_holder2').html(monthNames[current_month - 1] +" "+ current_year);
			$('#next_month').html('<input id="next_stats" type="submit" class="form-control btn-primary" style="width:150px;height:30px;" onclick="show_monitor_window(0,'+ month.next_month +')" value="{{band_next}}" />');
			$('#prev_month').html('<input id="next_stats" type="submit" class="form-control btn-primary" style="width:150px;height:30px;" onclick="show_monitor_window(0,'+ month.prev_month +')" value="{{band_prev}}" />');

		}else{
			$("#note_box").css("display", "block");
		}
	});
	
	if(open_window == 0){
		pWindow({'ele' : '#show_monitor_window'});
	}

};

//lets check for selection and zooming
function selection_zooming (id, data){

	$("#"+id).bind("plotselected", function (event, ranges) {
		if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {ranges.xaxis.to = ranges.xaxis.from + 0.00001;}
		if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {ranges.yaxis.to = ranges.yaxis.from + 0.00001;}
		options = flot_options(id);
		plot = $.plot("#"+id, data,
			$.extend(true, {}, options, {
				xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
				yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
			})
		);
		
		//Lets append zoom out button if its not present
		if($("#zoomOut_"+id) != undefined){
			$("#zoomOut_"+id).remove();
		}
		
		$("<input type='button' style='position:absolute;right:15px;top:15px;opacity:0.5;' id='zoomOut_'"+ id +" value='Zoom Out'>").appendTo($("#"+id)).click(function(e){
			e.preventDefault();
			options = flot_options(id);
			$.plot("#"+id, data, options);
			$("#zoomOut_"+id).remove();
		});	
	});
};

//Call for the options
function flot_options(optionOf){
	var options = {
			grid: {
				borderWidth:0,
				labelMargin:0,
				axisMargin:0,
				minBorderMargin:0
			},
			legend: {
				show: true,
				noColumns: 3,
			},
			series: {
				lines: {
					show: true,
					lineWidth: 0.07,
					fill: true
				}
			},
			xaxis: {
				show:true,
				mode: "time",
				tickFormatter: function (v, axis) {
					return nDate(v,"m/d");
				},
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: "Verdana, Arial",
				axisLabelPadding: 10,
			},
			yaxis: {
				show:true,
				min: 0,
				max: null,
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: "Verdana, Arial",
			},
			selection: {
				mode: "x"
			},	
			grid: {
				borderWidth: 1,
				borderColor: "#FFF",
				hoverable: true,
			}
		};
		
		if(optionOf == "cpu_plot"){
		
			//Appending options for cpu
			options.yaxis.tickFormatter = function (v) {
				if(v <= 1024)
					return Math.round(v) + " %";
			};
			options.legend.container = $("#legend_cpu");
		
		}else if(optionOf == "ram_plot"){
			
			//Appending options for ram
			options.yaxis.tickFormatter = function (v) {
				if(v <= 1024)
					return Math.round(v) + " MB";
				if(v > 1024 && v < (1024*1024))
					return Math.round(v /1024) + " GB";
				if(v > (1024*1024))
					return Math.round(v / (1024*1024)) + " TB"
			};
			options.legend.container = $("#legend_ram");
			
		}else if(optionOf == "disk_plot"){
		
			//Appending options for Disk
			options.yaxis.tickFormatter = function (v) {
				if(v <= 1024)
					return Math.round(v) + " MB";
				if(v > 1024 && v < (1024*1024))
					return Math.round(v /1024) + " GB";
				if(v > (1024*1024))
					return Math.round(v / (1024*1024)) + " TB"
			};
			options.legend.container = $("#legend_disk");
		
		}else if(optionOf == "inode_plot"){
		
			//Appending option for INodes
			options.yaxis.tickFormatter = "";
			options.legend.container = $("#legend_inode");
		
		}else if(optionOf == "io_read_plot" || optionOf == "io_write_plot"){
		
			//Appending option for INodes
			options.yaxis.tickFormatter = function (v) {
				if(v <= 1024)
					return Math.round(v) + " Bytes/s";
				if(v > 1024 && v < (1024*1024))
					return Math.round(v /1024) + " KB/s";
				if(v > (1024*1024) && v < (1024*1024*1024))
					return Math.round(v / (1024*1024)) + " MB/s"
				if(v > (1024*1024*1024))
					return Math.round(v / (1024*1024*1024)) + " GB/s"
			};
			options.legend.container = (optionOf == "io_read_plot" ? $("#legend_io_read") : $("#legend_io_write"));
		
		}else if(optionOf == "ntw_plot"){
		
			//Appending  option for Network
			options.yaxis.tickFormatter = function (v) {
				if(v <= 1024)
					return Math.round(v) + " B/s";
				if(v > 1024 && v <= (1024*1024))
					return Math.round(v / 1024) + " KB/s";
				if(v > (1024*1024) && v <= (1024*1024*1024))
					return Math.round(v / (1024*1024)) + " MB/s";
				if(v > (1024*1024*1024))
					return Math.round(v / (1024*1024*1024)) + " GB/s";
			};
			options.legend.container = $("#legend_ntw");
			
		}
		
		return options;
};

function change_monitor_tabs(id){
	$('#cpuinfo_win, #raminfo_win, #diskinfo_win, #ioinfo_win, #ntwinfo_win' ).hide();
	$('#'+id+'_win').show();
};

function startusage(){
	ajaxTimer = setInterval("show_monitor_window(1, 0 , 0, 0)", 5000);
};

function drawrampie(ram){
	pie("ramchart", [270, 200, 80, 100, 65], ram[0], ram[1], "#3399CC", "#FF0000", "MB");
};


function show_bandwidth_window(mon){
	var all_data = '';
	
	AJAX('[[API]]act=bandwidth&svs=' + N['vpsid'] + '&show=' + mon, function(data) {
		
		all_data = data;

		var month = data['month']
		var prev_month = month['prev'];
		var next_month = month['next'];
		
		$('#month_holder1').html(month['mth_txt']);
		
		var today = new Date();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		if(mm.toString().length == 1){
			mm = '0' + mm;
		}
		
		$('#prev').html('<a id="prev" href="javascript:void(0);" class="green_but green_but_a green_but_small" onclick="show_bandwidth_window('+ month['prev'] +')">{{band_prev}}</a>');
		
		if(month['next'] > (yyyy+""+mm)){
			$('#next').hide();
		}else{
			$('#next').html('<a id="next" href="javascript:void(0);" class="green_but green_but_a green_but_small" onclick="show_bandwidth_window('+ month['next'] +')">{{band_next}}</a>');
			$('#next').show();
		}
		
		var band_limit = data['bandwidth']['limit_gb'] + ' GB';
		var free_gb = data['bandwidth']['free_gb'];
		var used_gb = data['bandwidth']['used_gb'];
		
		if(data['bandwidth']['limit_gb'] == 0){
			band_limit = '{{cr_unlimited}}';
			free_gb = 1000000;
			used_gb = 1;
		}
		
		$('#bw_limit').html(band_limit);
		$('#bw_used').html(data['bandwidth']['used_gb'] + ' GB');
		$('#bw_percent').html(data['bandwidth']['percent'] + ' %');
		
		drawbwpie();
		
		function drawbwpie(){
			
			var res = [
				{ label: "{{used}}",  data: used_gb},
				{ label: "{{free}}",  data: free_gb}
			];
			
			resource_graph("bwpiechart_holder1", res);
		};
		
		var d1 = makedata(all_data['bandwidth']['usage'], 1);
		var indata = makedata(all_data['bandwidth']['in'], 1);
		var outdata = makedata(all_data['bandwidth']['out'], 1);
		
		
		var bandwidth_graph = [
			{ label: "{{usage}}",  data: d1},
			{ label: "{{in}}",  data: indata},
			{ label: "{{out}}",  data: outdata}
		];
		
		$.plot($("#bwband_holder1"), bandwidth_graph, {
			series: {
				points: { show: false },
				lines: { show: true, fill: true, steps: false, lineWidth: 0.5 }
			},
			legend: {
				show: true,
				noColumns: 3,
				container: $("#chartLegend")
			},
			xaxis:{
				mode: 'time',
				timeformat: '%d',
				color:'white',
				axisLabelUseCanvas: true,
			},
			yaxis:{
				min:0,
				color:'white',
				tickFormatter: function (v) {
					if(v <= 1024)
						return Math.round(v) + " M";
					if(v > 1024 && v < (1024*1024))
						return Math.round(v /1024) + " G";
					if(v > (1024*1024))
						return Math.round(v / (1024*1024)) + " T"
				}
			},
			grid: {
				borderWidth: 0,
				borderColor: '#fff',
				hoverable: true,
			}
		});
		
		var previousPoint = null;
		$("#bwband_holder1").bind("plothover", function (event, pos, item) {
			$("#x").text(pos.x.toFixed(2));
			$("#y").text(pos.y.toFixed(2));
	
			if (item) {
				
				if (previousPoint != item.dataIndex) {
					previousPoint = item.dataIndex;
					$("#tooltip").remove();
					var tmp_date = new Date(item.series.data[item.dataIndex][0]);
					var x = tmp_date.getDate()+'-'+(tmp_date.getMonth() + 1)+'-'+tmp_date.getFullYear(),
						y = item.datapoint[1].toFixed(2);
						
					showTooltip(item.pageX, item.pageY,
								"{{total}} : " + parseInt(y) + " MB <br>{{day}} : " + x);
				}
			} else {
				$("#tooltip").remove();
				previousPoint = null;
			}
		});
	});
	
	//pWindow({'ele' : '#show_bandwidth_window'});
};

function show_processes_window(shw_win){

	$('#processes').attr('action', 'act=processes&svs='+ N['vpsid']);
	
	// Show the popup
	if(shw_win == 1){
		var aPopup = pWindow({'ele' : '#show_processes_window'});
	}
	
	AJAX('[[API]]act=processes&svs=' + N['vpsid'], function(data) {
		
		// Prepare the list
		var tdata = '<thead><tr>';
		//alert(typeof(data["processes_head"]));
		
		var abc;
		for(abc in data["processes_head"]){
			var proc_h;
			proc_h = data["processes_head"][abc];
			if(typeof(proc_h) != 'string'){ // For some reason there is a function coming in data["processes_head"]
				continue;
			}
			tdata += '<th>'+ proc_h +'</th>';
		}
		
		tdata += '<th>{{proc_select}}</th></tr></thead>';
		
		for(x in data["processes"]){
			
			if(typeof(data["processes"][x]['PID']) != "undefined"){
				tdata += '<tr>';
				for(y in data["processes"][x]){
					tdata += '<td>'+ data["processes"][x][y] +'</td>';
				}
				tdata += '<td class="center"><input type="checkbox" name="sel_proc[]" value="'+ data["processes"][x]['PID'] +'"></td>';
				tdata += '</tr>';
			}
		}
		
		$('#proctable').html(tdata);
		$("#proctable").dataTable();
		
		// To reposition
		aPopup.reposition(200);
		
	});
};

function response_processes(){
	show_processes_window(0);
};

function show_services_window(shw_win){

	$('#servicesform').attr('action', 'act=services&svs=' + N['vpsid']);
	$('#services_div').html('');
	AJAX('[[API]]act=services&svs=' + N['vpsid'], function(data) {
		
		var cols = new Object();
		cols["heading"] = {"l" : '{{ser_heading}}', "width": '30px', "left" : true};
		cols["status"] = {"l" : '{{ser_status}}', "width": '30px', "centered" : true};
		cols["autostart"] = {"l" : '{{ser_autostart}}', "width": '30px', "centered" : true};
		cols["select_all"] = {"l" : '<input type="checkbox" onclick="check(document.getElementsByName(\'sel_serv[]\'), this)">', "width": '30px', "centered" : true};
		
		var services = data['services'];
		var autostart = data['autostart'];
		var running = data['running'];
		var tmp = new Object();
		// Prepare the list
		for(x in services){
			
			$v = services[x];
			tmp[x] = new Object();
			
			tmp[x]["heading"] = $v;
			
			for(y in running){
				if(running[y] == $v){
					tmp[x]["status"] = '&nbsp;&nbsp;{{ser_statrun}}';
					break;
				}else{
					tmp[x]["status"] = '&nbsp;&nbsp;{{ser_statoff}}';
				}
			}
			
			for(z in autostart){
				if(autostart[z] == $v){
					tmp[x]["autostart"] = '&nbsp;&nbsp;{{ser_staton}}';
					break;
				}else{
					tmp[x]["autostart"] = '&nbsp;&nbsp;{{ser_statoff}}';
				}
			}
			
			tmp[x]["select_all"] = '<input type="checkbox" name="sel_serv[]" value="'+ $v +'">';
		}
		// Form the TABLE	
		table({'id' : 'services_div', 'tid' : 'servicestable', "width" : '90%'}, cols, tmp);
		
		// Prepare the list
		$("#servicestable").dataTable();
	});
	
	if(shw_win == 1){
		pWindow({'ele' : '#show_services_window'});
	}
	var action = '';
	$('#start_x,  #restart_x, #stop_x').val('');
	
	$("#sstart").click(function(){
		$('#start_x').val(1);
		return submitit('servicesform', 'response_services');
	});
	
	$("#sstop").click(function(){
		$('#stop_x').val(1);
		return submitit('servicesform', 'response_services');
	});
	
	$("#srestart").click(function(){
		$('#restart_x').val(1);
		return submitit('servicesform', 'response_services');
	});
	
};

function response_services(){
	show_services_window(0);
};

function show_statuslogs_window(){
	
	AJAX('[[API]]act=statuslogs&svs=' + N['vpsid'], function(data) {
		
		var cols = new Object();
		cols["time"] = {"l" : '{{sts_time}}', "width": '30px', "centered" : true};
		cols["status"] = {"l" : '{{sts_sts}}', "width": '30px', "centered" : true};
		
		// Prepare the list
		for(x in data["var"]){
			$v = data["var"][x];
			
			if($v['status'] == 1){
				var sts_status = '<img src="[[images]]run.gif" />&nbsp; {{sts_running}}';
			}else{
				var sts_status = '<img src="[[images]]rstop.gif" />&nbsp; {{sts_stopped}}';
			}
			data["var"][x]["time"] = $v['datified_time'];
			data["var"][x]["status"] = sts_status;	
		}
		// Form the TABLE	
		table({'id' : 'statustable_div', 'tid' : 'statustable', "width" : '80%'}, cols, data["var"]);

		$("#statustable").dataTable({
				"order": [[ 0, "desc" ]]
			}
		);

	});
	
	pWindow({'ele' : '#show_statuslogs_window'});
};

function show_logs_window(){

	AJAX('[[API]]act=logs&svs=' + N['vpsid'], function(data) {
		
		var cols = new Object();
		cols["time"] = {"l" : '{{log_date}}', "width": '150px', "centered" : true};
		cols["action_text"] = {"l" : '{{log_task}}', "width": '60px'};
		cols["status"] = {"l" : '{{log_status}}', "width": '35px', "centered" : true};
		cols["ip"] = {"l" : '{{log_ip}}', "width": '35px', "centered" : true};
		
		// Prepare the list
		for(x in data["logs"]){
			$v = data["logs"][x];
			if($v['status'] == 1){
				var sts_status = '<font color="#00FF00">{{log_success}}</font>';
			}else{
				var sts_status = '<font color="#FF0000">{{log_fail}}</font>';
			}
			data["logs"][x]["time"] = nDate($v['time']);
			data["logs"][x]["status"] = sts_status;
		}
		// Form the TABLE	
		table({'id' : 'logs_div', 'tid' : 'logstable', "width" : '85%'}, cols, data["logs"]);

		$("#logstable").dataTable({
				"order": [[ 0, "desc" ]]
			}
		);

	});
	pWindow({'ele' : '#show_logs_window'});
};

function show_self_shutdown_window(startURL){

	startURL = startURL || 'act=self_shutdown';
	var regex = new RegExp("[\\?&]page=([^&#]*)");
	var results = regex.exec(startURL);
	var pageNum = 0;

	if(results != null){
		pageNum = decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	$('#shutdown_form').attr('action', 'act=self_shutdown&svs='+N['vpsid']+'&page='+pageNum);

	$('#shutdown_hrs').val();
	$('#shutdown_min').val();
	$('#shutdown_date').val();
	$('#shutdown_action').val();

	AJAX('[[API]]act=self_shutdown&svs=' + N['vpsid']+'&page='+pageNum, function(result){
		response_shutdown(result);
	});

	if($('#shutdown_min option').length <= 0){
		appendOption("#shutdown_min", 60);
		appendOption("#shutdown_hrs", 24);
	}

	pWindow({'ele' : '#show_self_shutdown_window'});
};

function submit_self_shutdown_form(element){

	var data = new Object();
	var id = $(element).attr("id").split("_");
	
	data['shutdown_min'] = $('#shutdown_min').val();
	data['shutdown_hrs'] = $('#shutdown_hrs').val();
	data['shutdown_date'] = $('#shutdown_date').val();
	data['selfshutdown'] = 1;
	data['shutdown_action'] = $('#shutdown_action').val();

	if (isDate(data['shutdown_date'], "mm/dd/yyyy") && (id[0] == "submitTimer")){

		if(!confirm('{{sd_confirm_submit}}')){
			return false;
		}

		submitit('shutdown_form', 'response_shutdown');

	} else if (id[0] == "deleteTimer"){

		if(!confirm("{{sd_confirm_delete}}")){
			return false;
		}

		$("#delete_timer").val(id[1]);
		submitit('shutdown_form', 'response_shutdown');

	} else {
		alert('{{sd_date_alert}}');
	}

	return false;
};

function edit_self_shutdown(element){

	data_edit = window.self_shutdown;
	id = $(element).attr('id').split("_");

	$('#shutdown_hrs').val(Number(data_edit[id[1]].hours));
	$('#shutdown_min').val(Number(data_edit[id[1]].minutes));
	$('#shutdown_date').val(data_edit[id[1]].date);
	$('#shutdown_action').val(data_edit[id[1]].action);
	$('#edit_timer').val(id[1]);
	$('#submitTimer').val("{{edit}}");
};

function response_shutdown(data){
	
	if(data['self_shutdown'] != null){
		data['page'] = data['self_shutdown']['page'];
		data['self_shutdown'] = data['self_shutdown']['self_shutdown'];
		pageLinks("shutdown_links", 'act=self_shutdown&svs='+N['vpsid'], data['page'], 'show_self_shutdown_window');

		var table_cols = new Object();
		var table_data = new Object();

		// Reset the timers before displaying the table
		$('#edit_timer').removeAttr("value");
		$('#delete_timer').removeAttr("value");
		$('#submitTimer').val("{{save}}");
		$('#shutdown_hrs').val("");
		$('#shutdown_min').val("");
		$('#shutdown_date').val("");
		$('#shutdown_action').val("");

		var actions = new Array('{{sd_action_start}}', '{{sd_action_stop}}', '{{sd_action_restart}}', '{{sd_action_poweroff}}');

		table_cols["id"] = {"l" : '{{id}}', "width": '30px', "centered" : true};
		table_cols["date"] = {"l" : '{{date}}', "width": '30px', "centered" : true};
		table_cols["hours"] = {"l" : '{{hour}}', "width": '20px', "centered" : true};
		table_cols["minutes"] = {"l" : '{{minute}}', "width": '20px', "centered" : true};
		table_cols["show_action"] = {"l" : '{{sd_action_title}}', "width": '30px', "centered" : true};
		table_cols["show_status"] = {"l" : '{{state}}', "width": '30px', "centered" : true};

		//data = JSON.parse(data);
		window.self_shutdown = data["self_shutdown"];
		data['self_shutdown'] = sortProperties(data['self_shutdown']);

		// Did we get something ?
		if(data["self_shutdown"] != null){

			$.each(data["self_shutdown"], function(key, value){

				table_data[key] = data["self_shutdown"][key];

				table_data[key]["show_action"] = '<span id=action_' + data["self_shutdown"][key].action + '>' + actions[data["self_shutdown"][key].action] + '</span>';

				// If the value is there and it is not yet marked as shutdown
				if(value != undefined && value["status"] == null){
					table_data[key]["show_status"] = '<img alt="{{delete}}" title="{{delete}}" src="[[images]]delete.png" id="deleteTimer_'+ data["self_shutdown"][key].id +'" onclick="submit_self_shutdown_form(this);"> &nbsp;&nbsp; <img  alt="{{edit}}" title="{{edit}}" src="[[images]]edit.png"  id="editTimer_'+ data["self_shutdown"][key].id +'" onclick="edit_self_shutdown(this);">';
				}else{
					table_data[key]["show_status"] = '<img alt="{{done}}" title="{{done}}" src="[[images]]done.gif" >';
				}
			});
		}

		table({'id' : 'shutdown_details_div', 'tid' : 'shutdown_details', 'width' : '95%'}, table_cols, table_data);
	}
};

function show_system_alerts_window(){

	AJAX('[[API]]act=system_alerts&svs=' + N['vpsid'], function(data) {
		
		var cols = new Object();
		cols["time"] = {"l" : '{{time}}', "centered" : true};
		cols["cpu"] = {"l" : '{{cpu}}', "centered" : true};
		cols["ram"] = {"l" : '{{ram}}', "centered" : true};
		cols["disk"] = {"l" : '{{disk}}', "centered" : true};
		
		// Prepare the list
		for(x in data["alerts"]){
			$v = data["alerts"][x];
			data["alerts"][x]["time"] = nDate($v['time'], '');
			data["alerts"][x]["cpu"] = '<font class="'+ ($v['cpu'] > 75 ? 'sysred' : ($v['cpu'] > 50 ? 'sysyellow' : 'sysgreen'))+'">'+$v['cpu']+'</font>';
			data["alerts"][x]["ram"] = '<font class="'+ ($v['ram'] > 75 ? 'sysred' : ($v['ram'] > 50 ? 'sysyellow' : 'sysgreen'))+'">'+$v['ram']+'</font>';
			data["alerts"][x]["disk"] = '<font class="'+ ($v['disk'] > 75 ? 'sysred' : ($v['disk'] > 50 ? 'sysyellow' : 'sysgreen'))+'">'+$v['disk']+'</font>';
		}
		// Form the TABLE	
		table({'id' : 'system_alerts_div', 'tid' : 'system_alertstable', "width" : '80%'}, cols, data["alerts"]);
		
		$("#system_alertstable").dataTable();
		
	});
	pWindow({'ele' : '#show_system_alerts_window'});
};

// Show the usersettings
function usersettings_onload(){
	
	// Show the languages
	var txt = [];
	for(x in N["languages"]){
		txt.push('<option value="'+ x +'">'+ ucfirst(N["languages"][x]) +'</option>');
	}
	
	$("#usersettings_language").html(txt.join(''));
	
	// Show the skins
	var txt = [];
	for(x in N["skins"]){
		txt.push('<option value="'+ x +'">'+ ucfirst(N["skins"][x]) +'</option>');
	}
	
	$("#usersettings_skins").html(txt.join(''));
	
	// Show the timezones
	var order = [];
	for(x in N["timezones"]){
		order.push(parseFloat(x));
	}
	
	order.sort(function(a,b){return a-b});
	
	var txt = [];
	for(x in order){
		if(!isNaN(order[x])){
			txt.push('<option value="'+ N["timezones"][order[x]] +'">'+ N["timezone_names"][[order[x]]] +'</option>');
		}
	}
	
	$("#usersettings_timezone").html(txt.join(''));
	
	// Should we show the logo URL option ?
	if(N["user_type"] == 2){
		$("#us_logo").show();
	}else{
		$("#us_logo").hide();
	}
	
	// We save 0% bandwidth threshold as -1 and hence we need to convert it back
	if(N['preferences']['vps_bandwidth_threshold'] == -1) {
		N['preferences']['vps_bandwidth_threshold'] = 0;
	}
	
	// Parse the variables
	parseVars("usersettings", N["preferences"]);
};

// Show the usersettings (THIS IS ONLY IN MODULE)
function usersettings_onshow(show_pwindow){
	
	
	AJAX('[[API]]act=usersettings', function(data) {
		
		// Show the languages
		var txt = [];
		for(x in data["languages"]){
			txt.push('<option value="'+ x +'">'+ ucfirst(data["languages"][x]) +'</option>');
		}
		
		$("#vps_usersettings_language").html(txt.join(''));
		
		// Show the skins
		var txt = [];
		for(x in data["skins"]){
			txt.push('<option value="'+ x +'">'+ ucfirst(data["skins"][x]) +'</option>');
		}
		
		$("#vps_usersettings_skins").html(txt.join(''));
		
		// Show the timezones
		var order = [];
		for(x in data["timezones"]){
			order.push(parseFloat(x));
		}
		
		order.sort(function(a,b){return a-b});
		
		var txt = [];
		for(x in order){
			if(!isNaN(order[x])){
				txt.push('<option value="'+ data["timezones"][order[x]] +'">'+ data["timezone_names"][[order[x]]] +'</option>');
			}
		}
		
		$("#vps_usersettings_timezone").html(txt.join(''));
		
		// Should we show the logo URL option ?
		if(data["user_type"] == 2){
			$("#us_logo").show();
		}else{
			$("#us_logo").hide();
		}
		
		// Parse the variables
		parseVars("vps_usersettings", data["preferences"]);
		
		if(show_pwindow == 1){
			// Show the window
			pWindow({'ele' : '#vps_usersettings'});
		}
	});
};

function usersettings_response(data){
	usersettings_onshow(0);
};

// API Key wizard
function apikey_onload(){
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	
	if(N['apikeys'] == ""){
		$('#apikeyslist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{apik_no_key}}</div>');
		return;
	}
	
	var cols = new Object();
	cols["apikey"] = {"l" : '{{apik_h_apikey}}', "width": '30px', "centered" : true};
	cols["apipass"] = {"l" : '{{apik_h_apipass}}'};
	cols["delete"] = {"l" : '{{apik_h_del}}', "width" : '10', "centered" : true};
	
	// Prepare the list
	for(x in N["apikeys"]){
		$v = N["apikeys"][x];
		N["apikeys"][x]["delete"] = '<a href="javascript:delapikey('+x+')" class="areload"><img class="vpslist" src="[[images]]delete.png" /></a>';

	}
	
	// Form the TABLE	
	table({'id' : 'apikeyslist', 'tid' : 'apikey_list_table', "width" : '80%'}, cols, N["apikeys"]);

};

// Add an API KEY
function addapikey(){
	call('[[API]]'+'act=apikey&do=add');
};

// Deletes an API KEY
function delapikey(key){
	call('[[API]]'+'act=apikey&del='+key);
};

function delisokey(data){
	data = data || 0;
	var ids = [];
	
	// Go Button pressed
	if(data == 0){
	
		$('.isorow').each(function(){
			if($(this).is(':checked')){
				ids.push($(this).val());
			}
		});
	
	// Direct X button
	}else{	
		ids.push(data);	
	}
	
	if(ids.length <= 0){
		return;
	}
	
	var fids = new Object();
	fids['act']='euiso';
	fids['del'] = ids.join(",");
	
	var url = '[[API]]'+$.param(fids);
	if(confirm("{{euiso_iso_del_confirm}}") == true){
		call(url);
	}

};

// List Users Wizard
function users_onload(){	
	
	// First Clear the Div
	$('#userslist').html("");
	
	$('#no_users').hide();
	
	// Are there any users ?
	if(!("user_list" in N) || N['user_list'] == ''){
		$('#no_users').show();
		return;
	}
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	
	var cols = new Object();
	cols["email"] = {"l" : '{{adu_user_email}}'};
	cols["edituser"] = {"l" : '{{edit}}', "width" : '10', "centered" : true};
	cols["deluser"] = {"l" : '{{delete}}', "width" : '10', "centered" : true};
	
	// Prepare the list
	for(x in N["user_list"]){
		$v = N["user_list"][x];
		N["user_list"][x]["edituser"] = '<a href="javascript:loadpage(\'act=edituser&uid='+x+'\')"><img class="vpslist" src="[[images]]admin/edit.png" /></a>';
		N["user_list"][x]["deluser"] = '<a href="javascript:delusers('+x+', \''+N["user_list"][x]['email']+'\')" class="areload"><img src="[[images]]admin/delete.png" /></a>';

	}
	
	// Form the TABLE	
	table({'id' : 'userslist', 'tid' : 'users_list_table', "width" : '80%'}, cols, N["user_list"]);
};

// Add User onshow
function adduser_onshow(){
	$('#adu_user_email').val("");
	$('#adu_user_password').val("");
};

// Delete the user
function delusers(id, email){
	var cnf = confirm('{{usr_del_conf}} "'+email+'" ?');
	if(cnf){
		call('act=users&delete='+id);
	}else{
		loadpage('act=users');
	}
};

// Edit User Wizard
function edituser_onload(){
	
	// Set the action correctly
	$("#edituserform").attr("action", "act=edituser&uid="+N["edit_user"]['uid']);
	
	// Parse the variables to load the default ones 
	parseVars("edituser", N["edit_user"]);
	
};

//twofactauth_onload() will not be HERE in module file
// rDNS Wizard
function rdns_onload(){
	
	// Clean the div of rdnslist
	$('#rdnslist').html("");
	
	// Show the languages
	var txt = [];
	for(x in N["allowed_ip"]){
		$v = N["allowed_ip"][x];
		if($v['ipv6'] != '' && $v['ipr_netmask'] != ''){
			txt.push('<optgroup label="'+ x +'">');
				for(y in $v['ipr_ips']){
					$vv = $v['ipr_ips'][y];
					txt.push('<option value="'+ $vv +'" >'+ $vv +' ('+$v['hostname']+')</option>');
				}
				txt.push('</optgroup>');
		}else{
			txt.push('<option value="'+ x +'" >'+ x +' ('+$v['hostname']+')</option>');
		}
	}
	
	$("#rdns_ip").html(txt.join(''));
	
	var cols = new Object();
	cols["id"] = {"l" : '{{id}}', "width": '30px', "centered" : true};
	cols["ip"] = {"l" : '{{ip}}'};
	cols["name"] = {"l" : '{{name}}'};
	cols["content"] = {"l" : '{{domain}}', "centered" : true};
	cols["delete"] = {"l" : '', "centered" : true};
	
	// Prepare the list
	for(x in N["rdns_records"]){
		$v = N["rdns_records"][x];
		N["rdns_records"][x]["delete"] = '<a href="javascript:delrdns('+x+')" ><img src="[[images]]delete.png" /></a>';

	}
	
	// Form the TABLE	
	table({'id' : 'rdnslist', 'tid' : 'rdnslist_table', "width" : '100%'}, cols, N["rdns_records"]);
};

// VPS rDNS Wizard
function vpsrdns_show(show_pwindow){
	
	var rdns_svs = getParameterByName("svs", 1);
	
	// Clean the div of rdnslist
	$('#vpsrdnslist').html("");
	
	AJAX('[[API]]act=rdns', function(data) {
	
		var txt = [];
		
		for(x in data['allowed_ip']){
			
			$v = data['allowed_ip'][x];
			
			if($v['ipv6'] != '' && $v['ipr_netmask'] != ''){
				txt.push('<optgroup label="'+ x +'">');
					for(y in $v['ipr_ips']){
						$vv = $v['ipr_ips'][y];
						txt.push('<option value="'+ $vv +'" >'+ $vv +' ('+$v['hostname']+')</option>');
					}
					txt.push('</optgroup>');
			}else{
				txt.push('<option value="'+ x +'" >'+ x +' ('+$v['hostname']+')</option>');
			}
		}

		$("#vpsrdns_ip").html(txt.join(''));

		var cols = new Object();
		cols["id"] = {"l" : '{{id}}', "width": '30px', "centered" : true};
		cols["ip"] = {"l" : '{{ip}}'};
		cols["name"] = {"l" : '{{name}}'};
		cols["content"] = {"l" : '{{domain}}', "centered" : true};
		cols["delete"] = {"l" : '', "centered" : true};
		
		// Prepare the list
		for(x in data["rdns_records"]){
			$v = data["rdns_records"][x];
			data["rdns_records"][x]["delete"] = '<a href="javascript:vpsdelrdns('+x+')" ><img src="[[images]]delete.png" /></a>';
		}
		
		if(!empty(data["rdns_records"])){
			// Form the TABLE	
			table({'id' : 'vpsrdnslist', 'tid' : 'vpsrdnslist_table', "width" : '100%'}, cols, data["rdns_records"]);
		}
		
		// Adjust RDNS list window scroll on WHMCS panel only
		$('#vpsrdnslist').css({'width': ''+(window.innerWidth < 350 ? 600 : window.innerWidth*0.6)+'px', 'overflow': 'scroll'});	
		
		if(show_pwindow == 1){
			// Show the window
			pWindow({'ele' : '#vpsrdns_show'});
		}
	});
};

function vpsrdns_show_response(data){
	vpsrdns_show(0);
};

// Delete vpsrDNS
function vpsdelrdns(id){
	call('[[API]]'+'act=rdns&delete='+id);
	vpsrdns_show(0);
};

// Delete rDNS
function delrdns(id){
	call('[[API]]'+'act=rdns&delete='+id);
};

// rDNS Wizard
function rdns_onshow(){
	// Blank out the domain field
	$('#rdns_domain').html("");
};

// PDNS Wizard
function pdns_onload(){
	// Blank out the domain field
	$('#pdnslist').html("");
	
	var cols = new Object();
	cols["id"] = {"l" : '{{id}}', "width": '30px', "centered" : true};
	cols["name"] = {"l" : '{{domain}}'};
	cols["manage"] = {"l" : '{{manage}}', "width": '30px', "centered" : true};
	cols["delete"] = {"l" : '', "width": '30px', "centered" : true};
	
	// Prepare the list
	for(x in N["domains"]){
		$v = N["domains"][x];
		N["domains"][x]["manage"] = '<a href="javascript:loadpage(\'act=managezone&domainid='+x+'\')" ><img src="[[images]]admin/process.gif" /></a>';
		N["domains"][x]["delete"] = '<a href="javascript:delpdns('+x+')" ><img src="[[images]]delete.png" /></a>';
	}
	
	// Form the TABLE	
	table({'id' : 'pdnslist', 'tid' : 'pdnslist_table', "width" : '100%'}, cols, N["domains"]);
	
};

function delpdns(id){
	call('[[API]]act=pdns&del='+id);
};

function pdns_onshow(){
	$('#zone_name').html("");
};

function updatezonedetails(){
	var zone = $("#zone_name").val();
	$("#primary_nameserver").val('ns1.' + zone);
	$("#hostmaster_email").val('admin@' + zone);
};

// Manage Zone Wizard
function managezone_onload(){
	
	// Blank out the domain field
	$('#managezonelist').html("");
	
	$('#domain_name').html(N['domains'][N['domainid']]['name']);
	
	// Show the languages
	var txt = [];
	for(x in N["manage_type"]){
		txt.push('<option value="'+ N["manage_type"][x] +'">'+ N["manage_type"][x] +'</option>');
	}
	
	$("#type").html(txt.join(''));
	
	var cols = new Object();
	cols["name"] = {"l" : '{{mz_host}}'};
	cols["type"] = {"l" : '{{mz_type}}'};
	cols["content"] = {"l" : '{{mz_points_to}} / {{mz_txt_value}}'};
	cols["prio"] = {"l" : '{{mz_priority}}', "left" : true};
	cols["ttl"] = {"l" : '{{mz_ttl}}', "centered" : true};
	cols["manage"] = {"l" : '', "width": '30px', "centered" : true};
	cols["delete"] = {"l" : '', "width": '30px', "centered" : true};
	
	// Prepare the list
	for(x in N["records"]){
		$v = N["records"][x];
		N["records"][x]["manage"] = '<a href="javascript:editpdns_zone('+x+')" ><img src="[[images]]admin/edit.png" /></a>';
		N["records"][x]["delete"] = '<a href="javascript:delpdns_zone('+N['domainid']+', '+x+')" ><img src="[[images]]delete.png" /></a>';
	}
	
	// Form the TABLE	
	table({'id' : 'managezonelist', 'tid' : 'managezonelist_table', "width" : '100%'}, cols, N["records"]);
	
};

// Set have something
function managezone_onshow(){
	var tmp1 = windowHASH().split('&');
	var tmp = tmp1[1].split('=');
	if(tmp[0] == 'domainid'){
		$('#domainid').val(tmp[1]);
		$('#editdomainid').val(tmp[1]);
	}
};

// Show the Add record Form
function show_addrecord_form(){
	
	// We must reset the form
	$_("addrecordsform").reset();
	
	// Show the window
	pWindow({'ele' : '#show_addrecord_form'});
};

// Show the Edit record Form
function editpdns_zone(zone_id){
	
	// Set the id which is being edited
	$('#id').val(zone_id);
	var zone_name = get_zone_name(N['records'][zone_id]['name']);
	
	// Now filll the data
	$('#editdomain_name').html(N['domains'][N['domainid']]['name']);
	$('#editname').val(zone_name);
	$('#edittype').val(N['records'][zone_id]['type']);
	$('#edittype_val').html(N['records'][zone_id]['type']);
	$('#editcontent').val(N['records'][zone_id]['content']);
	$('#editprio').val(N['records'][zone_id]['prio']);
	$('#editttl').val(N['records'][zone_id]['ttl']);
	
	// Show the window
	pWindow({'ele' : '#show_editrecord_form'});
};

function delpdns_zone(domain_id, zone_id){
	call('[[API]]act=managezone&domainid='+domain_id+'&delete='+zone_id);
};


// Create wizard (Launch Instance)
function create_onload(){
	
	if(N['resources']['num_vs'] < 1 && !empty(N['res_limit']['num_vs'])){
		$('#createlist').html("");
		$('#createlist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{li_num_vs_over}}</div>');
		return;
	}
	
	$('.adv_border').hide();
	
	$('#tr_ipv4').hide();
	$('#tr_ipv6_subnet').hide();
	$('#tr_ipv6').hide();
	
	// Is it inhouse billing ?
	if(!empty(N['inhouse_billing'])){
		
		// Load the CSS
		$('#bill_css').attr('href', $('#bill_css').attr('nhref'));
		
		// Enable inhouse billing create vps inputs
		$('#ihb_div *').prop('disabled', false);
		
		// Disable old create create
		$('.old_create *').prop('disabled', true);
		$('.old_create').hide();
		$('.create_common').hide();
	
	// Cloud User old style
	}else{
		
		// Disable inhouse billing
		$('#ihb_div *').prop('disabled', true);
		$('#ihb_div').hide();
		
	}
	
	//$('#advoptions_toggle').hide();
	var unlimited_lang = '{{li_unlimited}}';
	
	// Show the user list
	var txt = [];
	txt.push('<option value="0">{{li_add_user}}</option>');
	for(x in N['users']){
		txt.push('<option value="'+ x +'" '+(x == N['uid'] ? 'selected="selected"' : '')+'>'+ N["users"][x]['email'] +'</option>');
	}
	$("#li_uid").html(txt.join(''));
	
	// Load the regions (server groups)
	var txt = [];
	txt.push('<option value="-1">{{li_select}}</option>');
	for(x in N['servergroups']){
		txt.push('<option value="'+ x +'" id="sgid_'+ x +'">'+ N["servergroups"][x]['sg_reseller_name'] +'</option>');
	}
	$("#sgid").html(txt.join(''));
	
	// Load the virtualizations
	var txt = [];
	for(x in N['virts']){
		txt.push('<option value="'+ [x] +'" id="virt_'+ [x] +'">'+ N['virt_lang'][x] +'</option>');
	}
	$("#virt").html(txt.join(''));
	
	// Load the ostemplates
	var txt = [];
	txt.push('<option value="0">{{li_none}}</option>');	
	if('ostemplates' in N){
		for(x in N['ostemplates']){
			txt.push('<option value="'+ x +'" ostype="'+ N['ostemplates'][x]['type'] +'">'+ N['ostemplates'][x]['name'] +'</option>');
		}
	}
	$("#osid").html(txt.join(''));
	
	// Load isos
	var txt = [];
	txt.push('<option value="0">{{li_none}}</option>');
	if('isos' in N){
		for(x in N['isos']){
			txt.push('<option value="'+ x +'">'+ N['isos'][x]['name'] +'</option>');
		}
	}
	
	$("#iso").html(txt.join(''));
	
	if('num_ipv4' in N['resources']){
		$('#num_ipv4').html(N['resources']['num_ipv4']);
		$('#tr_ipv4').show();
	}
	
	if('num_ipv6_subnet' in N['resources']){
		$('#num_ipv6_subnet').html(N['resources']['num_ipv6_subnet']);
		$('#tr_ipv6_subnet').show();
	}
	
	if('num_ipv6' in N['resources']){
		$('#num_ipv6').html(N['resources']['num_ipv6']);
		$('#tr_ipv6').show();
	}
	
	$('#res_space').html(N['resources']['space'] + ' GB');
	$('#res_ram').html(N['resources']['ram'] + ' MB');
	$('#res_burst').html(N['resources']['burst'] + ' MB');
	$('#res_swap').html(N['resources']['burst'] + ' MB');
	
	var bandwith_lang = (N['res_limit']['bandwidth'] == 0) ? unlimited_lang : N['resources']['bandwidth'] + ' GB';
	$('#res_bandwidth').html(bandwith_lang);
	
	var avail_cores = (N['res_limit']['num_cores'] == 0) ? unlimited_lang : N['resources']['num_cores'];
	$('#recom_core').html(N['resources']['cores']);
	$('#max_cores').html(N['resources']['cores']);
	$('#avail_cores').html(avail_cores);
	
	
	// For advance options
	if(N['resources']['network_speed'] > 0){

		$('.adv_border').show();
		$('#li_network_speed_div').show();
		kbit_to_mbit = 0.0078125;
		
		// Load speeds
		var last = 0;
		var order = [];	
		var network_speed_values = Array(128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280, 1920, 2560, 3849, 5120, 6400, 7680, 8960, 10240, 11520, 12800, 128000, 1280000);
		var network_speed_values_mbit = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 10000);
		var kbit_to_mbit = 0.0078125;
		
		for(x in network_speed_values){
			order.push(parseFloat(network_speed_values[x]));
		}
		
		order.sort(function(a,b){return a-b});
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');		
		
		if(empty(N['resources']['network_speed'])){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +' mbit)</option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < N['resources']['network_speed'] && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +'mbit)</option>');
				}
			}
			
			if(N['resources']['network_speed'] < last){
				txt.push('<option value="'+ N['resources']['network_speed'] +'">'+ N['resources']['network_speed'] +' kb/s ('+ (N['resources']['network_speed'] * kbit_to_mbit) + ' mbit)</option>');
			} 
		}
		
		$("#network_speed2").html(txt.join(''));
		
		// Load the upload speed
		var last = 0;
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');		
		if(N['resources']['upload_speed'] === -1){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +' mbit)</option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < N['resources']['upload_speed'] && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +'mbit)</option>');
				}
			}
			
			if(N['resources']['upload_speed'] < last){
				txt.push('<option value="'+ N['resources']['upload_speed'] +'">'+ N['resources']['upload_speed'] +' kb/s ('+ (N['resources']['upload_speed'] * kbit_to_mbit) + ' mbit)</option>');
			}
		}
		$("#upload_speed2").html(txt.join(''));
		
	}
};

function create_onshow(){
	
	$("#createform")[0].reset();
	
	is_only_one();
	
	if(empty(N['disable_webuzo'])){
		$('#webuzo_show_tr').show();
		show_webuzo_box('webuzo');
	}
	
	if(!empty(N['inhouse_billing'])){
		return;
	}
	
	checkvnc();
	li_adduser();
	fill_ostemplates();
	
	//  VNC pass lenght differs with virt type
	$_('vncpass1').value = randstr(!empty(N['vncpasslen']) ? N['vncpasslen'] : 10);
	
	show_cpu_topology('#create');
	change_cpu_topology('#create');
	
};

// Edit Instance wizard (Edit Instance)
function editvm_onload(){
	
	var unlimited_lang = '{{ei_unlimited}}';
	$('#ei_tr_ips').hide();
	$('#ei_tr_ipv6_subnet').hide();
	$('#ei_tr_ipv6').hide();
	$('#ei_advoptions_toggle').hide();
	$('#ei_vid').val(N['vps']['vpsid']);
	$('#ei_virt').val(N['vps']['virt']);
	
	// Show the user list
	var txt = [];
	
	for(x in N['users']){
		txt.push('<option value="'+ x +'" '+(N['vps']['uid'] == x ? 'selected="selected"' : '')+'>'+ N["users"][x]['email'] +'</option>');
	}
	$("#ei_uid").html(txt.join(''));
	
	// Load the regions (server groups)
	var txt = [];
	for(x in N['servergroups']){
		txt.push('<option value="'+ x +'" id="sgid_'+ x +'">'+ N["servergroups"][x]['sg_reseller_name'] +'</option>');
	}
	$("#ei_sgid").html(txt.join(''));
	$('#ei_os_name').html(N['vps']['os_name']);
	
	// Load isos
	var txt = [];
	txt.push('<option value="0">{{li_none}}</option>');
	if('isos' in N){
		for(x in N['isos']){
			txt.push('<option value="'+ x +'" '+(x == N['vps']['iso'] ? "selected=selected" : "")+' >'+ N['isos'][x]['name'] +'</option>');
		}
	}
	
	$("#ei_iso").html(txt.join(''));
	$('#ei_hostname').val(N['vps']['hostname']);
	
	$('#ei_ips').val(count(N['vps']['ips']));
	$('#ei_num_ipv4').html(N['resources']['num_ipv4']);
	$('#ei_tr_ips').show();
	
	$('#ei_ipv6_subnet').val(count(N['vps']['ips6_subnet']));
	$('#ei_num_ipv6_subnet').html(N['resources']['num_ipv6_subnet']);
	$('#ei_tr_ipv6_subnet').show();
	
	
	$('#ei_ipv6').val(count(N['vps']['ips6']));
	$('#ei_num_ipv6').html(N['resources']['num_ipv6']);
	$('#ei_tr_ipv6').show();
	
	$('#ei_space').val(N['vps']['space']);
	$('#ei_res_space').html(N['resources']['space'] + ' GB');
	
	$('#ei_ram').val(N['vps']['ram']);
	$('#ei_res_ram').html(N['resources']['ram'] + ' MB');
	
	$('#ei_burst').val(N['vps']['burst']);
	$('#ei_res_burst').html(N['resources']['burst'] + ' MB');
	
	$('#ei_swap').val(N['vps']['swap']);
	$('#ei_res_swap').html(N['resources']['burst'] + ' MB');
	
	if(!empty(N['vps']['vnc'])){
		$('#ei_vnc').attr("checked", true);
	}
	var bandwidth_lang = (N['res_limit']['bandwidth'] == 0 ? unlimited_lang : N['resources']['bandwidth']  + ' GB');
	
	$('#ei_bandwidth').val(N['vps']['bandwidth']);
	$('#ei_res_bandwidth').html(bandwidth_lang);
	
	var avail_cores = (N['res_limit']['num_cores'] == 0 ? unlimited_lang : N['resources']['num_cores']);
	$('#ei_avail_cores').html(avail_cores);
	$('#ei_cores').val(N['vps']['cores']);
	
	$('#ei_recom_core').html(N['resources']['cores']);
	$('#ei_max_cores').html(N['resources']['cores']);
	
	
	// For advance options
	if(N['resources']['network_speed'] > 0){
		
		if(N['vps']['network_speed'] > 0){
			$('#ei_network_speed').val(N['vps']['network_speed']);
		}
		
		$('.adv_border').show();
		$('#ei_network_speed_div').show();
		kbit_to_mbit = 0.0078125;
		
		// Load speeds
		var last = 0;
		var order = [];
		var network_speed_values = Array(128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280, 1920, 2560, 3849, 5120, 6400, 7680, 8960, 10240, 11520, 12800, 128000, 1280000);
		var network_speed_values_mbit = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 10000);
		var kbit_to_mbit = 0.0078125;
		
		for(x in network_speed_values){
			order.push(parseFloat(network_speed_values[x]));
		}
		
		order.sort(function(a,b){return a-b});
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');		
		if(N['resources']['network_speed'] === 0){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +' mbit)</option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < N['resources']['network_speed'] && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +'mbit)</option>');
				}
			}
			
			if(N['resources']['network_speed'] < last){
				txt.push('<option value="'+ N['resources']['network_speed'] +'">'+ N['resources']['network_speed'] +' kb/s ('+ (N['resources']['network_speed'] * kbit_to_mbit) + ' mbit)</option>');
			} 
		}
		
		$("#ei_network_speed2").html(txt.join(''));
		
		// Load the upload speed
		var last = 0;
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');		
		if(N['resources']['upload_speed'] === -1){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +' mbit)</option>');
			}
		}else{
			if(N['vps']['upload_speed'] > 0){
				$('#ei_upload_speed').val(N['vps']['upload_speed']);
			}
			for(x in order){
				last = order[x];
				if(order[x] < N['resources']['upload_speed'] && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'  kb/s ('+ network_speed_values_mbit[x] +'mbit)</option>');
				}
			}
			
			if(N['resources']['upload_speed'] < last){
				txt.push('<option value="'+ N['resources']['upload_speed'] +'">'+ N['resources']['upload_speed'] +' kb/s ('+ (N['resources']['upload_speed'] * kbit_to_mbit) + ' mbit)</option>');
			}
		}
		$("#ei_upload_speed2").html(txt.join(''));

	}
	
	$('#ei_topology_sockets').val(N['vps']['topology_sockets']);
	$('#ei_topology_cores').val(N['vps']['topology_cores']);
	$('#ei_topology_threads').val(N['vps']['topology_threads']);
	
	if(empty(N['vps']['topology_sockets'])) {
		$('#ei_enable_cpu_topology').removeAttr('checked');
	} else {
		$('#ei_enable_cpu_topology').prop('checked', true);
	}
	
	if(!empty(N['inhouse_billing'])){
		
		// Show the existing and possible plans		
		var sel_plans = '';
		for(y in N['pricing']){
			var x = N['pricing'][y]['plid'];
			var a = N['pricing'][y];
			sel_plans = sel_plans+'<option value="'+x+'" '+(N['vps']['plid'] == x ? 'selected' : '')+'>'+N['plans'][x]['plan_name']+' ('+N['billing_symbol']+a['h_rate']+'/{{hour}} | '+N['billing_symbol']+a['m_rate']+'/{{month}})</option>';
		}
		
		$('#ei_plid').html(sel_plans);
		$('#ei_tr_plid').show();
		
		$('.no-bill').hide();
		$('.bill-disable').attr('disabled', 'disabled');
		for(x in N['resource_pricing']){
			
			if(x != 'bandwidth'){
				$('#ei_'+x).removeAttr('disabled');
			}
			
			var def_val = ('in_plan' in N && x in N['in_plan']) ? '{{ei_in_plan}} : <b>'+N['in_plan'][x]+' '+N['resource_units'][x]+'</b> | ' : ''
			$('#ei_tr_'+x+' .bill-rates').html(' ('+def_val+'{{ei_add_pricing}} : <b>'+N['billing_symbol']+N['resource_pricing'][x]['h_rate']+'</b>/'+N['resource_units'][x]+(x == 'bandwidth' ? '' : '/{{hour}} {{or}} <b>'+N['billing_symbol']+N['resource_pricing'][x]['m_rate']+'</b>/'+N['resource_units'][x]+'/{{month}})'));
		}
	}
	
};


function editvm_onshow(){
	
	is_only_one('ei_');
	checkvnc('ei_');
	fill_ostemplates('ei_');
	$('#ei_rootpass').val("");
	
	if(empty(N['vps']['vnc'])){
		//  VNC pass lenght differs with virt type
		$_('ei_vncpass').value = randstr(!empty(N['vncpasslen']) ? N['vncpasslen'] : 10);
	}

	if($("#ei_virt").val() == 'kvm' && N['resources']['cloud_allow_virtio'] == 1){
		if(!empty(N['vps']['virtio'])){
			$("#ei_virtio_check").prop('checked', true);
		}else{
			$("#ei_virtio_check").prop('checked', false);
		}

		$("#ei_virtio").show();
	}else{
		$("#ei_virtio").hide();
	}
	
	var virt = N['vps']['virt'];
	
	if(!empty(N['vps']['hvm'])) {
		virt += 'hvm';
	}
	
	show_cpu_topology('#editvm', virt);
	change_cpu_topology('#editvm');
};

// Cloud Resource onload
function cloudres_onload(){
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	
	$('#lim_num_vs').html(res_lim(N['res_limit']['num_vs']));
	$('#used_num_vs').html(res_used(N['res_limit']['num_vs'] - N['resources']['num_vs']));
	$('#ava_num_vs').html(res_ava(N['resources']['num_vs'], N['res_limit']['num_vs']));
	
	$('#lim_num_users').html(res_lim(N['res_limit']['num_users']));
	$('#used_num_users').html(res_used(N['res_limit']['num_users'] - N['resources']['num_users']));
	$('#ava_num_users').html(res_ava(N['resources']['num_users'], N['res_limit']['num_users']));
	
	$('#lim_space').html(res_lim(N['res_limit']['space']));
	$('#used_space').html(res_used(N['res_limit']['space'] - N['resources']['space']));
	$('#ava_space').html(res_ava(N['resources']['space'], N['res_limit']['space']));
	
	$('#lim_ram').html(res_lim(N['res_limit']['ram']));
	$('#used_ram').html(res_used(N['res_limit']['ram'] - N['resources']['ram']));
	$('#ava_ram').html(res_ava(N['resources']['ram'], N['res_limit']['ram']));
	
	$('#lim_bandwidth').html(res_lim(N['res_limit']['bandwidth']));
	$('#used_bandwidth').html(res_used(N['res_limit']['bandwidth'] - N['resources']['bandwidth']));
	$('#ava_bandwidth').html(res_ava(N['resources']['bandwidth'], N['res_limit']['bandwidth']));
	
	$('#cr_num_ipv4').html(N['res_limit']['num_ipv4']);
	$('#used_num_ipv4').html(res_used(N['res_limit']['num_ipv4'] - N['resources']['num_ipv4']));
	$('#res_num_ipv4').html(N['resources']['num_ipv4']);

	$('#cr_num_ipv6_subnet').html(N['res_limit']['num_ipv6_subnet']);
	$('#used_num_ipv6_subnet').html(res_used(N['res_limit']['num_ipv6_subnet'] - N['resources']['num_ipv6_subnet']));
	$('#res_num_ipv6_subnet').html(N['resources']['num_ipv6_subnet']);
	
	$('#cr_num_ipv6').html(N['res_limit']['num_ipv6']);
	$('#used_ipv6').html(res_used(N['res_limit']['num_ipv6'] - N['resources']['num_ipv6']));
	$('#cr_res_ipv6').html(N['resources']['num_ipv6']);
	
	$('#lim_num_cores').html(res_lim(N['res_limit']['num_cores']));
	$('#usage_num_cores').html(N['usage']['num_cores']);
	$('#ava_num_cores').html(res_ava(N['resources']['num_cores'], N['res_limit']['num_cores']));
	
	$('#lim_cores').html(res_lim(N['res_limit']['cores']));
};

function ctasks_onload(url){

	var th = '';
	var pre = '';
	var tmpsvs = getParameterByName("svs", 1);
	var svs_url = '&random='+Math.random();

	if(!empty(tmpsvs)){
		svs_url = '&svs=' + N['vpsid'];
	}

	url = '[[API]]act=ctasks' + svs_url;

	if(N['user_type'] == 2){
		th = '<th>{{server}}</th>';
		pre = 'c';
	}

	var regex = new RegExp("[\\?&]page=([^&#]*)");
	var results = regex.exec(url);
	var pageNum = 0;
	if(results != null){
		pageNum = decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	AJAX(url+'&page='+pageNum, function(data) {

		pageLinks(pre+'tasks_links', url, data['page'], 'ctasks_onload');

		// Form the TABLE
		var table = '<table id="'+pre+'tasks_table" border="0" cellspacing="1" cellpadding="8" class="table table-hover tablesorter tasks_table" align="center" width="100%"><thead><tr><th>{{actid}}</th><th>{{vpsid}}</th>'+th+'<th>{{user}}</th><th>{{tasks_started}}</th><th>{{tasks_updated}}</th><th>{{tasks_ended}}</th><th>{{action}}</th><th>{{status}}</th><th>{{tasks_progress}}</th></thead><tbody>';

		// Prepare the list
		for(x in data["tasks"]){
			$v = data["tasks"][x];

			table += '<tr id="'+pre+'tasks_'+$v['actid']+'"><td>'+$v['actid']+'</td><td>'+$v["vpsid"]+'</td>';
			if(N['user_type'] == 2){
				$v["server_name"] = (typeof $v["serid"] != 'undefined' ? $v["server_name"]+' ('+$v["serid"]+')' : 'Unslaved Server');
				table += '<td>'+$v["server_name"]+'</td>';
			}

			table += '<td>'+$v['email']+'</td><td id="start'+pre+'date_'+$v["actid"]+'">'+$v["started"]+'</td><td id="update'+pre+'date_'+$v["actid"]+'">'+$v["updated"]+'</td><td id="end'+pre+'date_'+$v["actid"]+'">'+$v["ended"]+'</td><td>'+$v['action']+'</td><td id="'+pre+'status_'+$v['actid']+'">'+$v['status_txt']+'</td><td id="'+pre+'progress_'+$v['actid']+'"><center><div style="text-align:center;" id="'+pre+'pbar'+$v['actid']+'">'+$v["progress"]+'</center><div style="border-radius:2px;background-color: #ddd;"><div style="width:'+$v["progress"]+';float:left;height:8px;background-image: url([[images]]/p_bar.gif); -moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;"id="'+pre+'progressbar'+$v['actid']+'"></div></div></td></tr>';

		}

		table += '</tbody></table>';
		if((N['user_type'] == 2 || act == 'ctasks') && empty(tmpsvs)){
			$('#ctaskslist').html(table);
		}else{
			$('#vpstasks_div').html(table);
			pWindow({'ele' : '#ctask_onload'});
		}
    
        update_tasks(url, pre);
	});

		
};

function set_backup_servers_table(backup_servers) {
	if(!$.isArray(backup_servers) || backup_servers.length == 0) {
		$('#bslist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{bs_no_servers}}</div>');
		$('#backupservers .bottom-menu').hide();
		return;
	}
	
	$('#bslist').html('');
	$('#backupservers .bottom-menu').show();
	
	var cols = new Object();
	cols["bserid"] = {'l' : '{{id}}', 'width' : '30'};
	cols["name"] = {'l' : '{{bs_name}}', 'width' : '120'};
	cols["type"] = {'l' : '{{bs_type}}', 'width' : '30', 'centered' : true};
	cols["hostname"] = {'l' : '{{bs_hostname}}', 'width' : '120'};
	cols["username"] = {'l' : '{{bs_username}}', 'width' : '120'};
	cols["port"] = {'l' : '{{bs_port}}', "width" : '50', 'centered' : true};
	cols["dir"] = {'l' : '{{bs_dir}}', "width" : '50', 'centered' : true};
	cols["manage"] = {'l' : '{{manage}}', "width" : '20', 'centered' : true};
	cols["select_all"] = {'l' : '<input type="checkbox" name="select_all" id="select_all" class="select_all" onchange="checkbox_select_all(this);">', "width" : '1%', 'centered' : true};
	
	var data = [];
	
	for(var i=0; i<backup_servers.length; i++) {
		data[i] = new Array();
		data[i]['bserid'] = backup_servers[i]['bserid'];
		data[i]['name'] = backup_servers[i]['name'];
		data[i]['type'] = backup_servers[i]['type'];
		data[i]['hostname'] = backup_servers[i]['hostname'];
		data[i]['username'] = backup_servers[i]['username'];
		data[i]['port'] = backup_servers[i]['port'];
		data[i]['dir'] = backup_servers[i]['dir'];
		data[i]['manage'] = '<a href="#" title="{{edit}}" onclick="loadpage(\'act=editbackupserver&bserid=' + backup_servers[i]['bserid'] + '\'); return false;"><img src="[[images]]edit.png" alt="{{edit}}" /></a>&nbsp;&nbsp;&nbsp;<a href="#" title="{{delete}}" onclick="delete_backup_server(' + data[i]['bserid'] + '); return false;"><img src="[[images]]delete.png" alt="{{delete}}" /></a>';
		data[i]['select_all'] = '<input type="checkbox" class="ios" name="bs[]" value="' + backup_servers[i]['bserid'] + '" />';
	}
	
	table({'id' : 'bslist', 'tid' : 'bslist_list_table', 'width' : '100%'}, cols, data);
}

function backupservers_onload() {
	// Redirect if backup servers not enabled
	if(!empty(N['disable_backup_cp'])) {
		loadpage('act=listvs');
		return;
	}
	
	set_backup_servers_table(N['backup_servers']);
};

function addbackupserver_onload() {
	// Redirect if backup servers not enabled
	if(!empty(N['disable_backup_cp'])) {
		loadpage('act=listvs');
		return;
	}
	
	$('#addbackupserverform')[0].reset();
}

function editbackupserver_onload() {
	// Redirect if backup servers not enabled
	if(!empty(N['disable_backup_cp'])) {
		loadpage('act=listvs');
		return;
	}
	
	// Check if allowed to edit
	if(empty(N['backup_server'])) {
		loadpage('act=backupservers');
		return;
	}
	
	$('#editbackupserverform')[0].reset();
	
	$('#editbackupserver #bs_bserid').val(N['backup_server']['bserid']);
	$('#editbackupserver #bs_name').val(N['backup_server']['name']);
	$('#editbackupserver #bs_hostname').val(N['backup_server']['hostname']);
	$('#editbackupserver #bs_type').val(N['backup_server']['type']);
	$('#editbackupserver #bs_username').val(N['backup_server']['username']);
	$('#editbackupserver #bs_port').val(N['backup_server']['port']);
	$('#editbackupserver #bs_dir').val(N['backup_server']['dir']);
}

function bs_go_click() {
	var action = $("#bs_multi_options").val();
	
	if(action == 0){
		alert("{{lst_no_option_sel}}");
		return false;
	} else if(action == 1) {
		delete_backup_server();
	}
}

function delete_backup_server(bserid) {

	if(!confirm('{{bs_conf_delete}}')) {
		return;
	}
	
	var bserids = new Array();
	
	if(bserid) {
		bserids.push(bserid);
	} else {
		$('#backupservers .ios:checked').each(function() {
			var val = $(this).val();
			bserids.push(val);
		});
	}
	
	$('#bs_delete').val(bserids.join(','));
	
	submitit('deletebackupserverform', 'deletebackupserverform_response');
}

function deletebackupserverform_response(data) {
	if(!empty(data['done'])) {
		set_backup_servers_table(data['backup_servers']);
	}
}

function set_ssh_keys_table(ssh_keys) {
	if(empty(ssh_keys) || ssh_keys.length == 0) {
		$('#sshkeylist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{sshkey_no_keys}}</div>');
		$('#sshkeys .bottom-menu').hide();
		return;
	}
	
	$('#sshkeylist').html('');
	$('#sshkeys .bottom-menu').show();
	
	var cols = new Object();
	cols["keyid"] = {'l' : '{{id}}', 'width' : '10%'};
	cols["uuid"] = {'l' : '{{sshkey_uuid}}', 'width' : '20%', 'centered' : true};
	cols["name"] = {'l' : '{{sshkey_name}}'};
	cols["manage"] = {'l' : '{{manage}}', "width" : '5%', 'centered' : true};
	cols["select_all"] = {'l' : '<input type="checkbox" name="select_all" id="select_all" class="select_all" onchange="checkbox_select_all(this);">', "width" : '1%', 'centered' : true};
	
	var data = [];
	
	for(var i=0; i<ssh_keys.length; i++) {
		data[i] = new Array();
		data[i]['keyid'] = ssh_keys[i]['keyid'];
		data[i]['uuid'] = ssh_keys[i]['uuid'];
		data[i]['name'] = ssh_keys[i]['name'];
		data[i]['manage'] = '<a href="#" title="{{edit}}" onclick="loadpage(\'act=editsshkey&keyid=' + ssh_keys[i]['keyid'] + '\'); return false;"><img src="[[images]]edit.png" alt="{{edit}}" /></a>&nbsp;&nbsp;&nbsp;<a href="#" title="{{delete}}" onclick="delete_ssh_key(' + ssh_keys[i]['keyid'] + '); return false;"><img src="[[images]]delete.png" alt="{{delete}}" /></a>';
		data[i]['select_all'] = '<input type="checkbox" class="ios" name="sshkeys[]" value="' + ssh_keys[i]['keyid'] + '" />';
	}
	
	table({'id' : 'sshkeylist', 'tid' : 'sshkey_list_table', 'width' : '100%'}, cols, data);
}

function sshkeys_onload() {
	set_ssh_keys_table(N['ssh_keys']);
}

function addsshkey_onload() {
	$('#addsshkeyform')[0].reset();
}

function editsshkey_onload() {
	// Check if allowed to edit
	if(empty(N['ssh_key'])) {
		loadpage('act=sshkeys');
		return;
	}
	
	$('#editsshkeyform')[0].reset();
	
	$('#editsshkeyform #sshkey_keyid').val(N['ssh_key']['keyid']);
	$('#editsshkey_name').val(N['ssh_key']['name']);
	$('#editsshkey_value').val(N['ssh_key']['value']);
}

function sshkey_go_click() {
	var action = $("#sshkey_multi_options").val();
	
	if(action == 0){
		alert("{{lst_no_option_sel}}");
		return false;
	} else if(action == 1) {
		delete_ssh_key();
	}
}

function delete_ssh_key(keyid) {
	if(!confirm('{{sshkey_conf_delete}}')) {
		return;
	}
	
	var keyids = new Array();
	
	if(keyid) {
		keyids.push(keyid);
	} else {
		$('#sshkeys .ios:checked').each(function() {
			var val = $(this).val();
			keyids.push(val);
		});
	}
	
	$('#sshkey_delete').val(keyids.join(','));
	
	submitit('deletesshkeyform', 'deletesshkeyform_response');
}

function deletesshkeyform_response(data) {
	if(!empty(data['done'])) {
		set_ssh_keys_table(data['ssh_keys']);
	}
}

var euiso;
function euiso_onload() {
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	
	// Are we to get redirected ?
	if(typeof(N['done']) != 'undefined' && typeof(N['done']["redirect"]) != 'undefined'){
		redirect(N['done']["redirect"]);
		return;
	}
	
	if(empty(N['isos'])){
		$('#euisolist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{euiso_no_iso}}</div>');
		return;
	}
	
	if($('#iso_list_table').length>0){
		$('#iso_list_table tr td').eq(2).css({'color':'red'});
	}

	var cols = new Object();
	cols["uuid"] = {"l" : '{{uuid}}', "width": '60px', "centered" : false};
	cols["distro"] = {"l" : '{{euiso_iso_distro}}', "width": '30px', "centered" : true};
	cols["iso"] = {"l" : '{{euiso_iso_name}}',"centered":true};
	cols["size"] = {"l" : '{{euiso_iso_rsize}}',"centered":true};
	cols["downloaded"] = {"l" : '{{euiso_iso_size}}',"centered":true};
	cols["download_time"] = {"l" : '{{euiso_dwnld_time}}',"centered":true};
	cols["active"] = {"l" : '{{euiso_iso_status}}', "width" : '10', "centered" : true};
	cols["delete"] = {"l" : '{{euiso_iso_del}}', "width" : '10', "centered" : true};
	cols["select_all"] = {"l" : '<input type="checkbox" name="select_all" id="select_all" class="select_all" onclick="checkbox_select_all(this);" >', "width" : '1%', "centered" : true};
	
	var is_downloading = 0;
	
	// Prepare the list
	for(x in N["isos"]){
		$v = N["isos"][x];
		active = $v['active'];
		$v['active'] = Math.round(($v['downloaded']/$v['size'])*100) + ' %';
		$v['size'] = Math.round($v['size'] / 1024 / 1024) + ' MB';
		$v['downloaded'] = Math.round($v['downloaded'] / 1024 / 1024) + ' MB';
		$v['download_time'] = $v['download_time'];
		$v["delete"] = '<a href="javascript:delisokey(\''+x+'\')" class="areload" data-iso=\''+x+'\'><img class="isolist" src="[[images]]delete.png" /></a>';
		$v["select_all"] = '<input type="checkbox" class="ios isorow" name="iso_id[]" value="'+[x]+'" "/>';
		
		if(empty(active)){
			is_downloading = 1;
		}
	}

	// Form the TABLE
	table({'id' : 'euisolist', 'tid' : 'iso_list_table', "width" : '80%'}, cols, N["isos"]);
	
	var sel_opts = "<option value='1'>Delete</option>";
	
	var bottom_menu = '<div class="row bottom-menu"><div class="col-sm-6"></div><div class="col-sm-6"><label>{{lst_with_selected}}</label><select class="form-control" name="multi_options" id="iso_options" >'+sel_opts+'</select>&nbsp;<input type="button" value="{{go}}" onclick="delisokey()" class="go_btn"/></div></div><br />';
	
	bottom_menu += '<div class="row col-sm-offset-6 col-sm-6" style="padding-right: 4.8%">';
	
	if("euiso_auto_del" in N){
		bottom_menu += '<div class="alert alert-warning">'+N['euiso_auto_del']+'</div>';
	}
	
	bottom_menu += '</div>';
	
	$("#euisolist").append(bottom_menu);
	
	// Are there any ISO that are downloading ?
	if(!empty(is_downloading)){
		euiso = setTimeout('loadpage("act=euiso")', 30000);
		is_downloading = 0;
	}
	
};

function euiso_onleave() {
	clearTimeout(euiso);
};

function addiso_onload(){
	
	// Are we to get redirected ?
	if(typeof(N['done']) != 'undefined' && typeof(N['done']["redirect"]) != 'undefined'){
		redirect(N['done']["redirect"]);
		return;
	}
	$_("addisoform").reset();
};

// Billing onlaod
function billing_onload(){
	
	// No invoices ?
	if(empty(N["invoices"])){
		
		$('#billinglist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{bill_no_invoice}}</div>');
	
	// Some invoices
	}else{

		var cols = new Object();
		cols["invoid"] = {"l" : '{{bill_invoid}}', "width": '60px', "centered" : true};
		cols["invodate"] = {"l" : '{{bill_invodate}}', "width": '10%', "centered" : true};
		cols["duedate"] = {"l" : '{{bill_duedate}}', "width": '10%', "centered":true};
		cols["item"] = {"l" : '{{bill_item}}'};
		cols["_net"] = {"l" : '{{bill_net}}', "width": '10%'};
		cols["status_txt"] = {"l" : '{{bill_status}}', "width": '15%', "centered":true};
		cols["view"] = {"l" : '', "width" : '10', "centered" : true};
		cols["select_all"] = {"l" : '<input type="checkbox" name="select_all" id="select_all" class="select_all" onclick="checkbox_select_all(this);" >', "width" : '1%', "centered" : true};
		
		// Prepare the list
		for(x in N["invoices"]){
			$v = N["invoices"][x];
			$v['invodate'] = datetime($v['invodate']);
			$v['duedate'] = datetime($v['duedate']);
			$v['_net'] = N['billing_symbol']+$v['net'];
			$v["view"] = '<a target="_blank" href="[[giver]]act=invoices&invoid='+x+'"><i class="fa fa-2x fa-file" /></a>';
			$v["select_all"] = '<input type="checkbox" class="ios" name="invoid[]" value="'+[x]+'" />';
		}

		// Form the TABLE
		table({'id' : 'billinglist', 'tid' : 'invoices_table', "width" : '90%'}, cols, N["invoices"]);
		
		pageLinks("invoices", 'act=billing', N['page']);
	
	}
	
	// No Transactions ?
	if(empty(N["transactions"])){
		
		$('#transactionslist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{bill_no_trans}}</div>');
	
	// Some Transactions
	}else{

		var cols = new Object();
		cols["trid"] = {"l" : '{{bill_trid}}', "width": '60px', "centered" : true};
		cols["date"] = {"l" : '{{bill_trdate}}', "width": '25%', "centered" : true};
		cols["gateway"] = {"l" : '{{bill_gateway}}', "width": '25%', "centered": true};
		cols["amt"] = {"l" : '{{bill_net}}', "width": '25%', "centered": true};
		cols["bal"] = {"l" : '{{bill_bal}}', "centered": true};
		
		// Prepare the list
		for(x in N["transactions"]){
			$v = N["transactions"][x];
			$v['date'] = datetime($v['date']);
			if(!empty($v['invoid'])){
				$v['gateway'] = '<a target="_blank" href="[[giver]]act=invoices&invoid='+$v['invoid']+'">{{bill_invoice}} : '+$v['invoid']+'</a>';
			}
		}

		// Form the TABLE
		table({'id' : 'transactionslist', 'tid' : 'transactions_table', "width" : '90%'}, cols, N["transactions"]);
		
		pageLinks("transactions", 'act=billing', N['trpage'], false, 'trpage');
	
	}
	
	// No Usage ?
	if(empty(N["usage"])){
		
		$('#usagelist').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{bill_no_usage}}</div>');
	
	// Some Usage Items
	}else{

		var cols = new Object();
		cols["usid"] = {"l" : '{{bill_usid}}', "width": '60px', "centered" : true};
		cols["vps"] = {"l" : '{{bill_vps}}', "width": '200'};
		cols["region"] = {"l" : '{{bill_region}}', "width": '150', "centered": true};
		cols["resource"] = {"l" : '{{bill_type}}', "width": '75', "centered": true};
		cols["starttime"] = {"l" : '{{bill_starttime}}', "centered": true};
		cols["updatetime"] = {"l" : '{{bill_updatetime}}', "centered": true};
		cols["charge"] = {"l" : '{{bill_charge}}', "width": '50', "centered": true};
		
		// Prepare the list
		for(x in N["usage"]){
			$v = N["usage"][x];
			if(!empty($v['vpsid'])){
				$v['vps'] = $v['vps_uuid']+' (ID: '+$v['vpsid']+')';
				if(!empty($v['data'])){
					$v['vps'] = $v['vps_uuid']+' ('+$v['data']['hostname']+')';
				}
			}else{
				$v['vps'] = $v['vps_uuid']+' <span style="color:red;">({{bill_terminated}})</span>';
				if(!empty($v['data'])){
					$v['vps'] = $v['vps_uuid']+' <span style="color:red;"> ('+$v['data']['hostname']+') </span>';
				}
			}


			$v['starttime'] = nDate($v['starttime']);
			$v['updatetime'] = nDate($v['updatetime']);
			$v['charge'] = N['billing_symbol']+$v['h_used'];
		}

		// Form the TABLE
		table({'id' : 'usagelist', 'tid' : 'usage_table', "width" : '90%'}, cols, N["usage"]);
		
		pageLinks("usage", 'act=billing', N['uspage'], false, 'uspage');
	
	}

	// No Gateways ?
	if(empty(N["gateways"])){
		
		$('#make_payment').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{bill_no_payment_gateway}}</div>');
	
	// Payment Gateways
	}else{
		var options = '<option value="" selected="selected">None</option>';
		for(x in N["gateways"]){
			options += '<option value="'+x+'">'+N["gateways"][x]+'</option>';
		}
		$('#gateway').html(options);

		$("#gateway").chosen({width:"61%"});

	}
	
	$('#balance').html(N['billing_symbol']+N['balance']);
	$('#charges').html(N['billing_symbol']+N['charges']);
	$('#cur_usage').html(N['billing_symbol']+N['cur_usage']);
	$('#cur_invoices').html(N['billing_symbol']+N['cur_invoices']);
	$('#billing_symbol').html(N['billing_symbol']);
	$('.pay_fields').prop("disabled", true);
};


////////////////////////////
// Miscellaneous FUNCTIONS
////////////////////////////

// Match the passwords
function pass_match(pass1, pass2, msg_div){
	var newpass = $("#"+pass1).val();
	var conf = $("#"+pass2).val();
	if(newpass != conf){
		$("#"+msg_div).text("{{pass_match}}");
		$("#"+msg_div).css("color", "red");
	}else{
		$("#"+msg_div).text("");
	}
}
// Sort Object
function sortProperties(obj){
	// convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push(obj[key]); // each item is an array in format [key, value]
	// sort items by value
	sortable.sort(function(a, b){
		return  a.status - b.status;
	});
	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ] */
};
function isDate(date, format){
	if(date == undefined){
		return false;
	}
	var match_format = format.split(/\/|-/);
	var matchResult = date.split(/\/|-/);
	if(matchResult == null){
		return false;
	}
	var monthResult = 0;
	var dayResult = 0;
	var yearResult = 0;
	match_format.forEach(function(name, index){
		if(name == "mm"){
			monthResult = matchResult[index];
		}else if(name == "dd"){
			dayResult = matchResult[index];
		}else if(name == "yyyy"){
			yearResult = matchResult[index];
		}
	});
	// Months containing 31 days
	numDays = [4,6,9,11];
	if(monthResult < 1 || monthResult > 12){
		return false;
	}else if(dayResult < 1 || dayResult > 31){
		return false;
	}else if((numDays.indexOf(monthResult) != -1) && dayResult == 31){
		return false;
	}else if(monthResult == 2){
		var isleap = (yearResult % 4 == 0 && (yearResult % 100 != 0 || yearResult % 400 == 0));
		if (dayResult> 29 || ((dayResult == 29) && !isleap))
			return false;
	}
	return true;
};
// for generating the option based on Nos and element
function appendOption(ele, nos){
	var html = '';
	for(var i=0;i<nos;i++){
		html += '<option value='+i+'>'+i+'</option>';
	};
	$(ele).append(html);
};
function unit_convert(v){
	
	if(v <= 1024)
		return Math.round(v) + " M";
	if(v > 1024 && v < (1024*1024))
		return Math.round(v /1024) + " G";
	if(v > (1024*1024))
		return Math.round(v / (1024*1024)) + " T"
};

// Password strentgh related functions
function passwordStrength(password1) {
	
	var shortPass = 1, badPass = 2, goodPass = 3, strongPass = 4, mismatch = 5, symbolSize = 0, natLog, score = 0;
	var pass_strength = Array();
	//password < 4
	if ( password1.length < 4 ){
		score = 9;
		pass_strength = [shortPass, parseInt(score)];
		return pass_strength;
	}

	var strength = 0;
	
	if (password1.length > 7) strength += 1.5;
			
	//If password contains both lower and uppercase characters, increase strength value.
	if (password1.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1.5;	
	
	//If it has numbers and characters, increase strength value.
	if (password1.match(/([a-zA-Z])/) && password1.match(/([0-9])/))  strength += 1.5;	
	
	//If it has one special character, increase strength value.
	if (password1.match(/([!,%,&,@,#,$,^,*,?,_,~])/) && password1.match(/([a-zA-Z])/))  strength += 1.5;
	
	//if it has two special characters, increase strength value.
	if (password1.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/) && password1.match(/([a-zA-Z])/)) strength += 1.5;
	
	//If value is less than 2
	if( strength < 2 ){
		pass_strength = [badPass, parseInt((strength/5)*100)];	
		return pass_strength;	
	}
	
	if (strength == 2 ){
		pass_strength = [goodPass, parseInt((strength/5)*100)];	
		return pass_strength;	
	}else{
		pass_strength = [strongPass, parseInt((strength/5)*100)];
		return pass_strength;	
	}
}

function check_pass_strength(id) {
	
	var pass = $("#"+id).val();
	var strength = Array();
	
	$("."+id+"_pass-strength").removeClass("short bad good strong");
	
	if (!pass) {
		display_pass_strength("strength_indicator", 0, id);
		return;
	}
	
	try{
		
		strength = passwordStrength(pass);
		
		if(strength[1] > 100) strength[1] = 100;

		switch(strength[0]){
				case 1:
				score = "bad";// For short password
				display_pass_strength(score, strength[1], id);
				break;
			case 2:
				score = "bad"; // For bad password
				display_pass_strength(score, strength[1], id);
				break;
			case 3:
				score = "good";// For good password
				display_pass_strength(score, strength[1], id);
				break;
			case 4:
				score = "strong";// For Strong password
				display_pass_strength(score, strength[1], id);
				break;
		}
	}catch(e){}
};

function display_pass_strength(score, per, id){
	
	var lang;
	
	if(typeof per == "undefined") per = 0;
	
	if(score == "bad") lang = "{{bad}}";
	if(score == "good") lang = "{{good}}";
	if(score == "strong") lang = "{{strong}}";
	if(score == "short") lang = "'{{short}}";
	if(score == "strength_indicator") lang = "{{strength_indicator}}";
	
	$("."+id+"_pass-strength").addClass(score).html(lang + "(" + per + "/100)");
};

function setpwd(size){
	var pwd = rand_pass(size);
	$("#os_newpass").val(pwd);
	$("#conf_pass").val(pwd);
};
function copy_password(){
	var conf = prompt("{{new_pass}}", $("#os_newpass").val());
};
// Random password String with Special characters
function rand_pass(length){
	var $string="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
	var $randpass = "";
	for ($i = 0; $i < length; $i++){
		$randpass += $string.charAt(Math.floor(Math.random() * $string.length));
	}
	return $randpass;
};
function getParameterByName(name, inHash) {
	
	inHash = inHash || 0;
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(inHash ? "?"+windowHASH() : location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

$(document).ready(function(){
	
	$("span.ip_count").hover(function(){
		var ul_ip_lists = $(this).next().find("ul.ip_lists");
		var H = ul_ip_lists.height() + 14; // 14 is total padding
		if(H < 200){
			ul_ip_lists.css({ "overflow-y" : "hidden", "box-shadow" : "none"}).fadeIn(200);
		}else{
			ul_ip_lists.fadeIn();
		}
	},function(){});
	
	$("ul.ip_lists").hover(function(){},function(){
		$("ul.ip_lists").fadeOut("fast");
	});
	
	$('.cpinstall').click(function(){
		
		clicked_input = $(this).children().attr("name");
		$('#cp_ins').val(clicked_input);
		var cnf_cpinstall = confirm('{{cpan_confirm}}');
		if(cnf_cpinstall){
			return submitit('installcp');
		}
		return false;
	});
	
});

//Checks the entire range of checkboxes
function check(field, checker){
	if(checker.checked == true){
		for(i = 0; i < field.length; i++){
			field[i].checked = true;
		}
	}else{
		for(i = 0; i < field.length; i++){
			field[i].checked = false;
		}
	}
};

function res_lim(v){
	return (v < 1 ? '{{cr_unlimited}}' : v);
};

function res_ava(v, u){
	return (((v < 1) && (u < 1)) ? '{{cr_unlimited}}' : v);
};

function res_used(v){
	return (v);
};

function get_zone_name(str){
	var name = str.replace("."+$('#domain_name').html(), "");
	return name;
};

// Get the count of an object
function count(obj){
	var count = 0;
	var i;
	for (i in obj) {
		if (obj.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
}

var managemenuhider;

function showmanagevpsmenu(vpsid){
	
	if(managemenuhider){
		clearTimeout(managemenuhider);
		hidemanagemenu();
	}
	
	$("#vpsmanagemenu_" + vpsid).css("display", "block");

}

function hidemanagevpsmenu(){
	managemenuhider = setTimeout("hidemanagemenu()", 200);
}

function hidemanagemenu(){
	$(".vpsmanagemenu").css("display", "none");
}

function showvpsmenu(vpsid){
	
	if(menuhider){
		clearTimeout(menuhider);
		hidevpsmenu();
	}
	
	var vpsmenustr = '<div id="vpsmenu_'+vpsid+'" class="vpsmenu" onmouseenter="clearTimeout(menuhider);" onmouseleave="hidemenu();"> \
				<div class="vpsmenubg"><a href="javascript:void(0)"><img src="[[images]]admin/start.gif" title="{{svm_sub_but}}" onclick="jqueryvpsboot(\'start\', \'stat_'+vpsid+'\', '+vpsid+');"/></a> \
				<a href="javascript:void(0)"><img src="[[images]]admin/stop.gif" title="{{stvm_sub_but}}" onclick="jqueryvpsboot(\'stop\', \'stat_'+vpsid+'\', '+vpsid+')"/></a> \
				<a href="javascript:void(0)"><img src="[[images]]admin/restart.gif" title="{{re_sub_but}}"  onclick="jqueryvpsboot(\'restart\', \'stat_'+vpsid+'\', '+vpsid+')"/></a>&nbsp; \
				<a href="javascript:void(0)"><img src="[[images]]admin/poweroff.gif" title="{{po_sub_but}}" onclick="jqueryvpsboot(\'poweroff\', \'stat_'+vpsid+'\', '+vpsid+')"/></a>';
	vpsmenustr += (!empty(N['info']['flags']['novnc']) ? '<a id="novncURL_'+vpsid+'" class="vncButton" href="[[url]]act=vnc&novnc=1&jsnohf=1&svs='+ vpsid +'" target="_blank"><img style="padding-left:4px" src="[[images]]admin/listvs_vnc.gif" title="{{lst_vpmenu_novnc}}"/></a>' : (empty(N['info']['flags']['disable_java_vnc']) ? '<a href="javascript:void(0);" id="java_vnc_'+vpsid+'" class="vncButton" onclick="launchjvnc('+vpsid+')"><img style="padding-left:4px;" src="[[images]]admin/listvs_vnc.gif" title="{{lst_vpmenu_javavnc}}"/></a>' : ''))+'</div></div>';
	
	$("#stat_"+vpsid).append(vpsmenustr);
	
	if(vnc_vm.indexOf(vpsid.toString()) > -1){
		$("#novncURL_"+vpsid+", #java_vnc_"+vpsid).show();
	}else{
		$("#novncURL_"+vpsid+", #java_vnc_"+vpsid).hide();
	}
	
	$("#vpsmenu_"+vpsid).css("display","block");
};

var menuhider;
function hidemenu(){
	menuhider = setTimeout("hidevpsmenu()", 500);
};

function hidevpsmenu(){
	$(".vpsmenu").css("display", "none");
};

function changevpsstatus(vpsid, status, net_status){
	
	if(status == 0){
		
		$("#stat_" + vpsid).html('<img class="vpslist" title="{{lst_vps_id_stat_off}}" src="[[images]]offline.png" style="cursor:pointer" />');

		$("#sus_" + vpsid).html('&nbsp;<a href="#"><img src="[[images]]blank_page.gif" /></a>&nbsp;');
		
		$("#net_sus_" + vpsid).html('&nbsp;<a href="#"><img src="[[images]]blank_page.gif" /></a>&nbsp;');

	}else if(status == 1){
		
		$("#stat_" + vpsid).html('<img class="vpslist" title="{{lst_vps_id_stat_on}}" src="[[images]]online.png" style="cursor:pointer" />');

		$("#sus_" + vpsid).html('&nbsp;<a title="{{lst_lv_suspendvs}}" onclick="vpsaction(\'suspend\', '+vpsid+');" style="cursor:pointer"><img src="[[images]]admin/suspend.png" /></a>&nbsp;');
		
		$("#net_sus_" + vpsid).html((net_status == 0 ? '&nbsp;<a title="{{lst_suspendvs_net}}" onclick="vpsaction(\'network_suspend\', '+vpsid+');" style="cursor:pointer"><img src="[[images]]admin/disconnect.png" /></a>&nbsp;' : '&nbsp;<a title="{{lst_unsuspendvs_net}}" onclick="vpsaction(\'network_unsuspend\', '+ vpsid +');" style="cursor:pointer"><img src="[[images]]admin/connect.png" /></a>&nbsp;'));

	}else if(status == 2){
		
		$("#stat_" + vpsid).html('<img class="vpslist" title="{{lst_vps_state_suspended}}" src="[[images]]suspended.png" style="cursor:pointer" />');

		$("#sus_" + vpsid).html('&nbsp;<a title="{{lst_lv_unsuspendvs}}" onclick="vpsaction(\'unsuspend\', '+vpsid+');" style="cursor:pointer"><img src="[[images]]admin/unsuspend.png" /></a>&nbsp;');
		
		$("#net_sus_" + vpsid).html('&nbsp;<a href="#"><img src="[[images]]blank_page.gif" /></a>&nbsp;');
	}
};

function checkbox_select_all(el){
	
	var checked = $(el).is(':checked');
	
	$('.ios').each(function(){
		$(this).prop("checked", checked);
	});
}

function toggle_advoptions(ele, ele2){
	//alert("#"+ele);
	ele2 = ele2 || 0;
	if ($("#"+ele).is(":hidden")){
		$("#"+ele).slideDown("slow");
		if (ele2 != 0){
			$("#"+ele2).text(" - ")
		}
	}else{
		$("#"+ele).slideUp("slow");
		if(ele2 != 0){
			$("#"+ele2).text(" + ")
		}
	}
};

function plus_onmouseover(ele){
	$("#"+ele.id+"_plus").attr("src", "[[images]]admin/plus_hover.gif");
};

function plus_onmouseout(ele){
	$("#"+ele.id+"_plus").attr("src", "[[images]]admin/plus.gif");
};

function li_adduser(){
	var uid = parseInt($_("li_uid").value);
	if(uid < 1){
		$("#li_user_details").show();
	}else{
		$("#li_user_details").hide();
	}
};

// Called once the region is selected. Lists all plans available within the selected region
function ihb_list_plans(sgid){
	
	// Make sure the divs are visible
	$('#ihb_div').show();
	$('#ihb_no_pl').hide();
	$("#ihb_plans .ihb_plans_container").hide();
	
	$('#ihb_sel_plan').html(N["servergroups"][sgid]['sg_reseller_name']);
	
	// Make the list of plans
	var html = '';
	var pricing;
	var tempi = 0;
		
	// Is there an ALL regions plan
	if(!empty(N['pricing'][-1])){		
		pricing = jQuery.extend(true, {}, N['pricing'][-1]);	
	}
	
	// Override rates for the selected plans
	if(!empty(N['pricing'][sgid])){
		for(y in N['pricing'][sgid]){
			pricing[y] = N['pricing'][sgid][y];
		}
	}
	
	// Is there any plan
	if(empty(pricing)){
		$('#ihb_no_pl').show();
	}else{
		for(y in pricing){
			var x = pricing[y]['plid'];
			var bandwidth = (N["plans"][x]["bandwidth"] == 0 ? '{{li_unlimited}} ': N["plans"][x]["bandwidth"]+'GB');
			var download_speed = (N["plans"][x]["network_speed"] == 0 ? '{{li_unlimited}}' : N["plans"][x]["network_speed"] + ' KBps');
			var upload_speed = (N["plans"][x]["upload_speed"] == -1 ? download_speed : (N["plans"][x]["upload_speed"] == 0 ? '{{li_unlimited}}' : N["plans"][x]["upload_speed"]+' KBps'));
			
			html += '<div class="col-md-3 col-sm-6">';
			html += '<div class="col-sm-12 ihb_regpl" onclick="ihb_select_plan(this)" id="ihb_pl_'+sgid+'_'+x+'">';
			html += '<div class="ihb_regpl_name"><span class="fa fa-cloud">&nbsp;</span>'+N["plans"][x]['plan_name']+'</div>';
			html += '<div class="ihb_regpl_pricing">';
			html += '<span class="ihb_pl_mprice">'+N['billing_symbol']+parseFloat(pricing[y]['m_rate']).toFixed(2)+'</span> / {{li_month}}<br />';
			html += '<span class="ihb_pl_hprice">'+N['billing_symbol']+parseFloat(pricing[y]['h_rate']).toFixed(2)+'</span> / {{li_hour}}';
			html += '</div>';
			html += '<div class="ihb_regpl_dat">';
			html += '<div><span class="ihb_rpd_val">'+N["plans"][x]["cores"]+'</span> CPU</div>';
			html += '<div><span class="ihb_rpd_val">'+N["plans"][x]["ram"]+' MB</span>  Memory</div>';
			html += '<div><span class="ihb_rpd_val">'+N["plans"][x]["space"]+' GB</span> Disk</div>';
			html += '<div><span class="ihb_rpd_val">'+bandwidth+'</span> Bandwidth</div>';
			html += '<div><span class="ihb_rpd_val">'+download_speed+'</span> Download Speed</div>';
			html += '<div><span class="ihb_rpd_val">'+upload_speed+'</span> Upload Speed</div>';
			html += '</div>';
			html += '</div>';
			html += '</div>';
			
			if(tempi % 4 == 3){
				html += '<div class="col-sm-12"></div>';
			}
			tempi++;
		}
		
		// If no valid plans found for selected region
		if(html == ''){
			$('#ihb_no_pl').show();
		}else{
			$(".ihb_plans_container").eq(0).html(html);
			$(".ihb_plans_container").show();
		}
		
		
	}
	
	// Show and scroll
	$("#ihb_plans").show();
	$("#ihb_plans")[0].scrollIntoView({behavior: "smooth"});
	
}

// Is called when the user selects a plan
function ihb_select_plan(plan){
	
	// Remove selected plan class from previous plan
	$(".ihb_regpl").removeClass('ihb_slctd_pl');
	
	// Add selected plan class to this plan
	$(plan).addClass('ihb_slctd_pl');
	
	// Get the Plan ID
	var plid = $(plan).attr('id').split('_')[3];
	$('#plid').val(plid);

	$('#virt').val(N["plans"][plid]["virt"]);
	fill_ostemplates();
	
	$(".create_common").show();	
	$(".create_common")[0].scrollIntoView({behavior: "smooth"});
	
}

// Parse the form
function fill_virts(prefix){
	prefix = prefix || '';
	var sgid = parseInt($("#"+prefix+"sgid").val());
	
	var allowed_virts = new Object();
	
	// Show the virts
	if(sgid < 0){
		return false;
	}
		
	var virts = N["servergroups"][sgid]["virts"];
		
	for(V in virts){
		try{
			if(N["resources"]["allowed_virts"][virts[V]]){
				allowed_virts[virts[V]] = virts[V];
			}
		}catch(e){}
	}
	
	$("#"+prefix+"virt option").each(function(){
		try{
			if(allowed_virts[$(this).val()] == $(this).val()){
				$(this).show();
				$(this).removeAttr("disabled");
				
				// Select HVM VIRT by default if Admin has set to use it by default
				if(N['set_def_hvm'] == 1 && $(this).val().toLowerCase().search('hvm') != -1){
					$(this).prop("selected", true);
				}
				
				return;
			}
		}catch(e){}
		$(this).remove();
		$(this).attr("disabled", "disabled");
	});
	
	// Also try to fill OS Templates now
	fill_ostemplates();
	
	// Also list region plans and their pricing
	if(!empty(N['inhouse_billing'])){
		ihb_list_plans(sgid);
	}
	
};

// Fills the virts
function fill_ostemplates(prefix){
	prefix = prefix || '';
	
	var virt = $("#"+prefix+"virt").val();
	
	var osTemplates = "";
	
	osTemplates += '<option value="0">{{li_none}}</option>';
	
	// Now show the allowed templates
	for(x in N["ostemplates"]){
		if(virt != N["ostemplates"][x]["Nvirt"]){
			continue;
		}		
		osTemplates += '<option value="'+x+'">'+N["ostemplates"][x]["name"]+'</option>';
	}
	
	$("#"+prefix+"osid").html(osTemplates);
	
	// Show stuff or not
	if(virt == "openvz" || virt == "lxc" || virt == "vzo"){
		$("#"+prefix+"vncrow").hide();
		$("#"+prefix+"tr_iso").hide();
	}else{
		$("#"+prefix+"vncrow").show();
		$("#"+prefix+"tr_iso").show();
	}
	
	if(virt == "vzo"){
		$("#"+prefix+"vncrow").show();
	}
	
	if(virt == "openvz" || virt == "proxo" || virt == "vzo"){
		$("#"+prefix+"tr_burst").show();
		$("#"+prefix+"tr_swap").hide();		
	}else if(virt == "lxc" || virt == "proxl" || virt == "kvm" || virt == "vzk"){
		$("#"+prefix+"tr_burst").hide();
		$("#"+prefix+"tr_swap").show();
	}
	
	if(virt == "kvm" && N['resources']['cloud_allow_virtio'] == 1){
		$(".adv_border").show();
		$("#"+prefix+"tr_virtio").show();
	}else{
		$("#"+prefix+"tr_virtio").hide();
	}
	
	
	if((virt == "kvm"|| virt == "xen" || virt == "vzk") && !empty(N['enable_nic'])){		
		var nic_type_list = '';
		
		for(x in N['nic_type'][virt]){
			curnic = '';
			if(!empty(prefix)){
				if(x === N['vps']['nic_type']){
					var curnic = "selected=selected";
				}
			}else if(x === 'e1000'){
				var curnic = "selected=selected";
			}
			
			nic_type_list += '<option value="'+ x +'" '+curnic+'>'+N['nic_type'][virt][x]+'</option>';
		}
		
		$(".adv_border").show();
		$("#"+prefix+"nic").html(nic_type_list);
		$("#"+prefix+"tr_nic").show();
	}

	//re_height();
	
};

function checkvnc(prefix){

	var prefix = prefix || '';
	
	if(!$_(prefix+"vnc")){
		return false;
	}

	if($_(prefix+"vnc").checked){
		$("#"+prefix+"vncpassrow").slideDown(300);
	}else{
		$("#"+prefix+"vncpassrow").slideUp(300);
	}
	
	//re_height();
};

function is_only_one(prefix){
	
	prefix = prefix || '';
	
	var i = 0;
	var sgid = 0;
	for(x in N["servergroups"]){
		sgid = x;
		i++;
	}
	
	// There is ONLY one region
	if(i == 1){
		$("#"+prefix+"sgid_"+sgid).prop("selected", true);
		fill_virts();
		$("#"+prefix+"tr_regions").hide();
	}
	
	// If only one virt is allowed
	var virts_total = 0;
	$("#"+prefix+"virt option").each(function(){
		if($(this).attr("disabled")) return;
		virts_total++;
	});
	
	if(virts_total == 1){
		$("#"+prefix+"virt option").each(function(){
			if($(this).attr("disabled")) return;
			$(this).prop("selected", true);
		});
		$("#"+prefix+"tr_virts").hide();
	}
	
	//alert($("#virt").val());
	
};

// Makes data for graphs
function makedata(data, date){
	var fdata = [];
	i = 1;
	
	date = date || '';
	// For date we need to modify the data
	if(!empty(date)){
		for (x in data){
			var year = x.substring(0, 4);
			var month = x.substring(4, 6);
			var day = x.substring(6, 8);
			var date = new Date(year+'-'+month+'-'+day);
			fdata.push([date, data[x]]);
			i++;
		}
	}else{
		for (x in data){
			fdata.push([i, data[x]]);
			i++;
		}
	}
	
	return fdata;
};

// Show tooltip for graphs
function showTooltip(x, y, contents) {
	$('<div id="tooltip">' + contents + '</div>').css( {
		position: "absolute",
		display: "none",
		top: y + 20,
		left: x - 20,
		border: "1px solid #CCCCCC",
		padding: "2px",
		"background-color": "#EFEFEF",
		"z-index" : 10000,
		opacity: 0.80
	}).appendTo("body").fadeIn(200);
};

function Hidedata(){
	
	var default_hidden_t2 = ["lmcreate", "lmcloudres", "lmusers"];
	
	// Are you Admin ?
	if("orig_uid" in N){
		$('#orig_uid').show();
	}
	
	if('support_link' in N){
		$('#lmsupport').attr('href', N['support_link']);
		$('#lmsupport').show();
	}
	
	// Does this user have access to rDNS ?
	if("rdns" in N){
		$('#lmrdns').show();
	}
	
	// 2fa is not for Module
	
	
	// Does this user have access to pdns ?
	if("pdns" in N){
		$('#lmpdns').show();
	}
	
	// Do we have to show API credentials ?
	if(empty(N["disable_apicredential"])){
		$('#lmapikey').show();
	}
	
	// Do we have to show API credentials ?
	if(N["uid"] > 0){
		$('#disable_loginlogo').show();
	}
	
	// Id user type is 2 than show else dont show
	for(x in default_hidden_t2){
		if(N['user_type'] == 2){
			$('#'+default_hidden_t2[x]).show();
		}else{
			$('#'+default_hidden_t2[x]).hide();
		}
	}

	// Is this user a billing user ?
	if(!empty(N['inhouse_billing'])){
		$('#lmbilling').show();
		$('#lmcloudres').hide();
	}
	
	if(("enable_eu_iso" in N)){
		$('#lmeuiso').show();
	}
	
	if(("disable_webuzo" in N)){
		$('#lmapps').hide();
	}
	
	// Are we suppose to show the iso option for HVM?
	if(!empty(N["info"]) && ("iso_support" in N["info"]["flags"]) && (N["info"]["flags"]["iso_support"] <= 0)){
		$('#lmeuiso').hide();
	}

	// Does this user have access to backup servers ?
	/* if(!("disable_backup_cp" in N)){
		$('#lmbackupservers').show();
	} */
	
	if(!("disable_enduser_sshkeys" in N)){
		$('#lmsshkeys').show();
	}
}

function ucfirst(str){
	str += '';
	var f = str.charAt(0).toUpperCase();
	return f + str.substr(1);
}


// Encrypt the Login password
function login_pass(field, doreset){
	field = field || "password";
	doreset = doreset || 0;
	
	var md5 = $().crypt({method:"md5",source:$("#_"+field).val()});
	if(!md5) {
		md5 = '';
	}
	$("#"+field).val(md5);
	
	// Reset the field ?
	if(doreset){
		$("#_"+field).val("");
	}
};

// Get the selected files and folders to be restored
function getSelectedRestore(){
	
	var arr = new Array();
	
	$("#srfile_list_table input:checked").each(function(){
		var tmp = $(this).attr('name').substr(3);
		arr.push(tmp);
	});
	
	return arr;
	
};

// Show the Server restore window to restore on the server
function ShowServerRestore(){
	
	// Selected files and folders
	var fnf = getSelectedRestore();
	
	// Check if anything is selected or not
	if(fnf.length < 1){
		alert("{{res_nothing_sel}}");
		return;
	}
	
	pWindow({'ele' : '#res_serpath_popup'});
};

// Show the Device restore window to restore on the server
function ShowDeviceRestore(){
	
	// Selected files and folders
	var fnf = getSelectedRestore();
	
	// Check if anything is selected or not
	if(fnf.length < 1){
		alert("{{res_nothing_sel}}");
		return;
	}
	
	pWindow({'ele' : '#res_devpath_popup'});
};

// Starts the server restore process
function doRestore(device){
	
	device = device || 0;
	
	// Selected files and folders
	var fnf = getSelectedRestore();
	
	// Check if anything is selected or not
	if(fnf.length < 1){
		alert("{{res_nothing_sel}}");
		return;
	}
	
	// Get the data of this snapshot
	var tmp = $("#shres_data").val();
	tmp = tmp.split("-");
	
	// Path where we have to restore
	var respath = encodeURIComponent((device > 0 ? $("#res_devpath").val() : $("#res_serpath").val()));
	
	var url = '[[API]]act=dashboard&snapid='+tmp[0]+'&parentid='+tmp[1]+'&restore='+fnf.join(",")+'&'+(device > 0 ? 'devicepath' : 'serverpath')+'='+respath+'&random='+Math.random();
	
	//alert(url);return;
	
	// Make the request to restore
	$.getJSON(url, function(rdata) {
		if(typeof(rdata["error"]) != 'undefined'){
			error(rdata["error"]);
		}
		
		// Are we to show a success message ?
		if(typeof(rdata["done"]) != 'undefined'){
			done(rdata["done"]);
		}
	});
};

// Parse the File Type
function Ftype(ftype){
	t_0 = '{{file_type_0}}';
	t_1 = '{{file_type_1}}';
	t_2 = '{{file_type_2}}';
	t_3 = '{{file_type_3}}';
	t_4 = '{{file_type_4}}';
	t_5 = '{{file_type_5}}';
	t_6 = '{{file_type_6}}';
	t_7 = '{{file_type_7}}';
	return eval('t_'+ftype);
};

// Return the Size
function Fsize(size){
	
	// GB
	if(size > 1073741824){
		return Math.round(size / 1073741824)+' G';
	}
	
	// MB
	if(size > 1048576){
		return Math.round(size / 1048576)+' M';
	}
	
	// KB
	if(size > 1024){
		return Math.round(size / 1024)+' K';
	}
	
	// Bytes
	return size+' B';
};

// Clean the action to make it more presentable
function cleanAction(txt){
	txt = txt.replace('_', ' ');
	return ucwords(txt);
};


// Time in VPS Manage
$(document).ready(function() {
// Create two variable with the names of the months and days in an array
var monthNames = [ "{{january}}", "{{february}}", "{{march}}", "{{april}}", "{{may_long}}", "{{june}}", "{{july}}", "{{august}}", "{{september}}", "{{october}}", "{{november}}", "{{december}}" ]; 
var dayNames= ["{{sunday}}","{{monday}}","{{tuesday}}","{{wednesday}}","{{thursday}}","{{friday}}","{{saturday}}"]

// Create a newDate() object
var newDate = new Date();
// Extract the current date from Date object
newDate.setDate(newDate.getDate());
// Output the day, date, month and year    
$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

setInterval( function() {
	// Create a newDate() object and extract the seconds of the current time on the visitor's
	var seconds = new Date().getSeconds();
	// Add a leading zero to seconds value
	$("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
	},1000);
	
setInterval( function() {
	// Create a newDate() object and extract the minutes of the current time on the visitor's
	var minutes = new Date().getMinutes();
	// Add a leading zero to the minutes value
	$("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    },1000);
	
setInterval( function() {
	// Create a newDate() object and extract the hours of the current time on the visitor's
	var hours = new Date().getHours();
	// Add a leading zero to the hours value
	$("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
	
}); // Function for showing the live time

function panel_maximize(panel){    

	if(panel.hasClass("panel-maxed-done")){
		panel.removeClass("panel-maxed-done").unwrap();
		panel.find(".panel-body").css("height","");
		$('#cpu_hist').css("width", "350px");
		$('#bw_monthly_body').css("width", "338px");
		// Add the maximize button back
		panel.find(".panel-maximize .fa").removeClass("fa-compress").addClass("fa-expand");
	}else{
		var head = panel.find(".panel-head");
		var hplus = 30;
		if(head.length > 0){
			hplus += head.height()+35;
		}
		panel.find(".panel-body").height($(window).height() - hplus);
	
		// Add the minimize button
		panel.addClass("panel-maxed-done").wrap('<div class="panel-maxed"></div>');
		panel.find(".panel-maximize .fa").removeClass("fa-expand").addClass("fa-compress");
		$('#cpu_hist').css("width", "100%");
		$('#bw_monthly_body').css("width", "100%");
	}
	
	$(window).resize();
	
};

// Monthwise Bandwidth Graph
function MonthlyBandwidthGraph(){
	
	var svs = getParameterByName('svs', 1);
	
	$.getJSON('[[API]]act=vpsmanage&svs=' + svs, function(data, textStatus, jqXHR){
	});
};


$(document).ready(function(){
	 
	$(".panel-maximize").on("click",function(){
		panel_maximize($(this).parents(".panel"));
		return false;
	});
	
	$(".tiptip").tipTip({delay:100, defaultPosition:"top"});
	
	$(".scrollbar-virt").scrollbar();
});

function adjust_div_heights(){
	
	return false; // Billing Module change
	
	if($('#vps_stats_div').height() < 10 || $('#bw_div').height() < 10){
		setTimeout('adjust_div_heights();', 1000);
	}
	
	$('#vpsmanage_div').height($('#vps_stats_div').height());
	$('#bw_monthly_div').height($('#bw_div').height());
};

function update_tasks(url, pre){
    // If any of these window are not there we will not set the timer and just return
    if($("#ctaskslist").is(':hidden') && $('#vpstasks_div').is(':hidden')){
        return false;
    }
    $.getJSON(url, function(data){
        for(x in data["tasks"]){
            $v = data["tasks"][x];
            var cur_status = $v['status_txt'];
            var cur_progress = $v['progress'];
            $('#start'+pre+'date_'+$v["actid"]).html($v["started"]);
            $('#update'+pre+'date_'+$v["actid"]).html($v["updated"]);
            $('#end'+pre+'date_'+$v["actid"]).html($v["ended"]);
            $('#'+pre+'status_'+$v["actid"]).html(cur_status);
            $('#'+pre+'pbar'+$v["actid"]).text(cur_progress);
            if($v['status'] == -1 || $v['progress'] == 'Task Completed'){
                $('#'+pre+'progressbar'+$v["actid"]).hide();
            }else{
                //$('#'+pre+'progressbar'+$v["actid"]).show();
                $('#'+pre+'progressbar'+$v["actid"]).width(cur_progress);
            }
        }
    });
    task_timeout = setTimeout(function(){update_tasks(url, pre);}, 10000);
}

function extractfilename(url){
	var tmp = url.replace(/^.*[\/\\\\]/g, '');
	$_("iso_name").value = tmp;
};

////////////////////////////
// Theme FUNCTIONS
////////////////////////////

function nslide(ele){
	$(ele).toggle("clip");
};

function initialize_map_op(latitude, longitude){
	
	longitude = parseFloat(longitude);
	latitude = parseFloat(latitude);
	
	//alert("Lat"+latitude+" Long" +longitude);
	var olmap = new ol.Map({
			target: 'map',  // The DOM element that will contains the map
			renderer: 'canvas', // Force the renderer to be used
			layers: [
				// Add a new Tile layer getting tiles from OpenStreetMap source
				new ol.layer.Tile({
					source: new ol.source.OSM()
				})
			],
			// Create a view centered on the specified location and zoom level
			view: new ol.View({
				center: ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'),
				zoom: 12
			})
		});
		
		// For marker
		var pos = ol.proj.fromLonLat([longitude, latitude]);

		var marker = new ol.Overlay({
			position: pos,
			positioning: 'center-center',
			element: $('<img src="[[images]]locate.png">')[0],
			stopEvent: false
		});
		
		olmap.addOverlay(marker);
	
	return olmap;
	
}

function show_cpu_topology(khidki, virt) {
	
	// For launch instance
	if(empty(virt)) {
		virt = $(khidki).find('#virt').val();
	}
	
	if(empty(N['cpu_topology'][virt])) {
		$(khidki).find(".cpu_topology").hide();
	} else {
		$(khidki).find(".cpu_topology").show();
		
		if(empty(N['cpu_threads'][virt])) {
			$(khidki).find(".cpu_threads").hide();
		} else {
			$(khidki).find(".cpu_threads").show();
		}
	}
	
}

function change_cpu_topology(khidki){
	
	if($(khidki).find('.enable_cpu_topology').is(':checked')){
		$(khidki).find(".tr_cpu_topology").show();
	}else{
		$(khidki).find(".tr_cpu_topology").hide();
		$(khidki).find(".topology_sockets").val(0);
		$(khidki).find(".topology_cores").val(0);
		$(khidki).find(".topology_threads").val(0);
	}
	
}


// From YYYYMMDDhhmm to YYYY/MM/DD hh:mm
function datetime(datetime){
	var n = datetime.toString();
	var year = parseInt(n.substr(0, 4));
	var month = parseInt(n.substr(4, 2));
	var day = parseInt(n.substr(6, 2));
	
	var ret = day+'/'+month+'/'+year;
	
	if(n.length > 8){
		var hour = parseInt(n.substr(8, 2));
		var min = parseInt(n.substr(10, 2));
		ret = ret+' '+hour+':'+min;
	}
	
	return ret;
};

////////////////////////////
// Webuzo FUNCTIONS
////////////////////////////
function webuzo_box_handle(){	
	
	if($('#collapse1').css('display') == "none" || $('#collapse1').attr('aria-expanded') == "false"){
		$('#collapse1').show();
		$('[id^="webuzoos_"]').prop("disabled", false);
		$('[id^="webuzoos_"]').removeProp("disabled");
	}else if($('#collapse1').css('display') == "block" || $('#collapse1').attr('aria-expanded') == "true"){
		$('[id^="webuzoos_"]').prop("disabled", true);
		$('#collapse1').hide();
	}
	
};

function webuzo_apps(stack){
	stack = stack || 0;
	
	if($("#stack1").data("demo") === "1"){
		$("#webuzo_stack_tr").hide();
		return;
	}
	$("#webuzo_stack_tr").slideDown("slow");	
	if(stack === 'lamp'){
		$("#webuzo_webserver_tr").show();
	}else{
		$("#webuzo_webserver_tr").hide();
	}
	
};

function script_req(sid){
	
	if(sid == 0 || $("#stack1").data("demo") > 0){
		return;
	}
	
	$("#stack1, #stack2, #stack3").prop("checked", false);
	
	processing_symb(1);
	
	AJAX('[[API]]act=webuzo&scriptid='+sid+'&svs='+N['vpsid'], function(data) {
		processing_symb();
		if("error" in data){
			error(data["error"]);
			$("#webuzo_settings").hide();
			$(".webuzo_unsupport").show();
			return;
		}
		
		if("isfree" in data){
			$("#stack2_tr, #stack3_tr").hide();
			$("#stack1").prop("checked", true).data("demo", "1");
		}else{
			$("#stack2_tr, #stack3_tr").show();
			$("#stack1").data("demo", "0");
		}
		
		if("support_err" in data){
			$("#webuzo_settings").hide();
			$(".webuzo_unsupport").show();
		}else{
			$("#webuzo_settings").show();
			$(".webuzo_unsupport").hide();
		}
		
		if("webuzo_apps" in data){
			for(x in data['webuzo_apps']){
				var id = 'webuzo_'+x;
				var str = '';
				var val = data['webuzo_apps'][x];
				for(k in val){
					str += '<div class="col-sm-4"><table><tr><td><input type="radio" name="'+x+'" id="serverver_'+k+'" value="'+val[k]['softname']+'" /></td><td width="12%"></td><td><label class="_label" for="serverver_'+k+'">'+val[k]['fullname']+'</label></td></tr></table></div>';
				}
				processing_symb();
				$("#"+id).html(str);
				$("#webuzo_webserver_tr").show();
			}
		}
	});
};

function show_webuzo_window(){
	
	$('#webuzosettingsform').attr('action', 'act=webuzo&jsnohf=1&svs='+N['vpsid']);
	$('#webuzosettingsform')[0].reset();
	processing_symb();
	$("#webuzo_stack_tr").hide();
	
	AJAX('[[API]]act=webuzo&svs='+N['vpsid'], function(data){
		if("error" in data){
			error(data["error"]);
			pWindowClose("#show_webuzo_window");
			return;
		}
		
		if("isfree" in data){			
			$("#stack2_tr, #stack3_tr").hide();
			$("#stack1").prop("checked", true).data("demo", "1");
		}else{
			$("#stack2_tr, #stack3_tr").show();
			$("#webuzo_stack_tr").slideDown("slow");
			$("#stack1").data("demo", "0");
		}
		
		var options = '<option value="0">{{li_none}}</option>';
		
		if("iscripts" in data){
			for(x in data['iscripts']){
				options += '<optgroup label="'+x+'">';
				var val = data['iscripts'][x];
				for(k in val){
					options += '<option value="'+k+'">'+val[k]['name']+'</option>';
				}
				options += '</optgroup>';
			}
		}
		
		$("#webuzo_scriptlist").html(options).trigger("chosen:updated");
		
		if("webuzo_apps" in data){
			for(x in data['webuzo_apps']){
				var id = 'webuzo_'+x;
				var str = '';
				var val = data['webuzo_apps'][x];
				for(k in val){
					str += '<div class="col-sm-4"><table><tr><td><input type="radio" name="'+x+'" id="serverver_'+k+'" value="'+val[k]['softname']+'" /></td><td width="12%"></td><td><label class="_label" for="serverver_'+k+'">'+val[k]['fullname']+'</label></td></tr></table></div>';
				}				
				$("#"+id).html(str);
			}
		}
		
		if("info" in data && !empty(data["info"]["dns_nameserver"])){
			$.each(data["info"]["dns_nameserver"], function(k,v){	
				$("#webuzo_ns"+(k+1)).val(v);
			});
		}
		
		var webuzo_templates = "";
		$.each(data["info"]["webuzo_templates"], function(k,v){	
			webuzo_templates += '<div class="col-sm-12"><input for="input radio" type="radio" name="webuzo_os" id="webuzoos_'+k+'" value="'+k+'" /><label for="webuzoos_'+k+'">&nbsp;'+v['name']+'</label></div>';
		});
		$("#webuzo_templates").html(webuzo_templates);
		
	});
	
	var events = $._data($('#webuzosettingsform')[0], 'events');
	
	if(empty(events)){
		
		$('#webuzosettingsform').submit(function(){
			if(!confirm('{{webuzo_install_data_lost_warn}}')){
				return false;
			}
			
			showspinner();
			
			return submitit('webuzosettingsform', 'webuzo_sumbit_response');
		});
	}
	
	pWindow({'ele' : '#show_webuzo_window'});
	$("#webuzo_scriptlist").chosen({width:"86%"});
};

function webuzo_sumbit_response(data){	
	if("webuzo_enabled" in data && data['webuzo_enabled'] == true){
		pWindowClose("#show_webuzo_window");
	}
};

// VPS with webuzo distro List
function apps_onload(){
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	if(empty(N['vs'])){
		$('#vslst').html('<div class="notice"><img src="[[images]]notice.gif" /> &nbsp; {{apps_no_vs}}</div>');
		return;
	}
	
	$('#vslst').html('');
	$('#suspend_div').html("");
	
	var cols = new Object();	
	cols['vpsid'] = {"l" : '{{id}}', "width" : '50'};
	cols['vps_name'] = {"l" : '{{name}}', "width" : '60'};
	cols['vtype'] = {"l" : '{{lst_lv_type}}', "width" : '70', "centered" : true};
	cols['osimg'] = {"l" : '{{lst_lv_os}}', "width" : '60', "centered" : true};
	cols['hostname'] = {"l" : '{{lst_lv_hname}}', "width" : '120'};

	if(!empty(N['info']['flags']['show_server'])){
		cols["server"] = {"l" : '{{lst_lv_sname}}', "width" : '100'};
	}

	cols['def_ip'] = {"l" : '{{ip}}', "width" : '50'};
	cols['manage_vm'] = {"l" : '', "width" : '1%', "centered" : true};
	
	// Prepare the list
	for(x in N['vs']){
		
		if(!empty(N['vs'][x]['vnc'])){
			vnc_vm.push(x);
		}
		
		$v = N['vs'][x];
		N['vs'][x]['vtype'] = '<img src="[[images]]admin/'+ $v['virt'] +($v['hvm'] < 1 ? '' : 'hvm') + '_42.gif" />';
		var os_distro = $v['distro'];
		N['vs'][x]['osimg'] = '<img src="'+( os_distro.match(/^http/g) ? $v['distro'] : '[[images]]'+ $v['distro'] )+'" />';

		if(!empty(N['info']['flags']['show_server'])){
			N['vs'][x]['server'] = N["vs"][x]["server_name"];
		}

		for (var k in N['vs'][x]['ips']) {
			N['vs'][x]['def_ip'] = N['vs'][x]['ips'][k];
			break;
		}
		
		N["vs"][x]['hostname'] = '<span id="tr_hostname'+$v['vpsid']+'">'+$v['hostname']+'</span>' + (!empty($v['nw_suspended']) ? '<img style="float:right;margin:5px;" title="{{lst_ntwsuspended}}" width="15" id="ntw_suspended'+id+'" src="[[images]]admin/disconnect.png" >': '');
		
		N["vs"][x]["manage_vm"] = '&nbsp;<a href="javascript:loadpage(\'act=vpsmanage&webuzo=1&svs='+x+'\');" title="{{manage}}"><img width="16" height="16" src="[[images]]arrow_right.png"/></a>&nbsp;';
	}
	
	// Form the TABLE
	table({'id' : 'vslst', 'tid' : 'vslst_list_table', "width" : '100%'}, cols, N["vs"]);
	var srt = 0;
	if(!empty(N['info']['flags']['enable_idsort'])){
		srt = 1;
	}

	$("#vslst_list_table").tablesorter({	
		sortList: [[1,srt]],
		headers: {			
			2: {sorter: false},
			3: {sorter: false},
			4: {sorter: false},
			5: {sorter: false},
			6: {sorter: false},			
        }
	});
};

function show_webuzo_box(param){
	
	if(param === 'webuzo' && !("disable_webuzo" in N)){
		virt = $('#virt').val();
		AJAX('[[API]]act=create&virt='+virt, function(data){
			if("error" in data){
				error(data["error"]);
				return;
			}

			if("isfree" in data){			
				$("#webuzo_box_stack2_tr, #webuzo_box_stack3_tr").hide();
				$("#webuzo_box_stack1").prop("checked", true).data("demo", "1");
			}else{
				$("#webuzo_box_stack2_tr, #webuzo_box_stack3_tr").show();
				$("#webuzo_box_stack_tr").slideDown("slow");
				$("#webuzo_box_stack1").data("demo", "0");
			}
			
			var options = '<option value="0">{{li_none}}</option>';
			
			if("iscripts" in data){
				for(x in data['iscripts']){
					options += '<optgroup label="'+x+'">';
					var val = data['iscripts'][x];
					for(k in val){
						options += '<option value="'+k+'">'+val[k]['name']+'</option>';
					}
					options += '</optgroup>';
				}
			}
			
			$("#webuzo_box_scriptlist").html(options).trigger("chosen:updated");
			
			if("webuzo_apps" in data){
				for(x in data['webuzo_apps']){
					var id = 'webuzo_box_'+x;
					var str = '';
					var val = data['webuzo_apps'][x];
					for(k in val){
						str += '<div class="col-sm-4"><table><tr><td><input type="radio" name="'+x+'" id="serverver_'+k+'" value="'+val[k]['softname']+'" /></td><td width="12%"></td><td><label class="_label" for="serverver_'+k+'">'+val[k]['fullname']+'</label></td></tr></table></div>';
					}				
					$("#"+id).html(str);
				}
			}
			
			var webuzo_templates = "";
			$.each(data["webuzo_templates"], function(k,v){	
				webuzo_templates += '<div class="col-sm-12"><input for="input radio" type="radio" name="webuzo_os" id="webuzoos_'+k+'" value="'+k+'" /><label for="webuzoos_'+k+'">&nbsp;'+v['name']+'</label></div>';
			});
			$("#webuzo_box_templates").html(webuzo_templates);
			
		});
		
		$("#webuzo_box_scriptlist").chosen({width:"100%"});
		$('#webuzo_box').show();
		$('#webuzo_box_adv_border').show();
	}
		
	else{
		$('#webuzo_box').hide();
	}
}

function webuzo_box_apps(stack){
	stack = stack || 0;
	
	if($("#webuzo_box_stack1").data("demo") === "1"){
		$("#webuzo_box_stack_tr").hide();
		return;
	}
	$("#webuzo_box_stack_tr").slideDown("slow");
	if(stack === 'lamp'){
		$("#webuzo_box_webserver_tr").show();
	}else{
		$("#webuzo_box_webserver_tr").hide();
	}
}


function webuzo_box_script_req(sid){
	
	if(sid == 0 || $("#webuzo_box_stack1").data("demo") > 0){
		return;
	}
	
	$("#webuzo_box_stack1, #webuzo_box_stack2, #webuzo_box_stack3").prop("checked", false);
	
	processing_symb(1);
	
	AJAX('[[API]]act=create&scriptreqid='+sid, function(data) {
		processing_symb();
		if("error" in data){
			error(data["error"]);
			$(".webuzo_box_unsupport").show();
			return;
		}
		
		if("isfree" in data){
			$("#webuzo_box_stack2_tr, #webuzo_box_stack3_tr").hide();
			$("#webuzo_box_stack1").prop("checked", true).data("demo", "1");
		}else{
			$("#webuzo_box_stack2_tr, #webuzo_box_stack3_tr").show();
			$("#webuzo_box_stack1").data("demo", "0");
		}
		
		if("support_err" in data){
			$(".webuzo_box_unsupport").show();
		}else{
			$(".webuzo_box_unsupport").hide();
		}
		
		if("webuzo_apps" in data){
			for(x in data['webuzo_apps']){
				var id = 'webuzo_box_'+x;
				var str = '';
				var val = data['webuzo_apps'][x];
				for(k in val){
					str += '<div class="col-sm-4"><table><tr><td><input type="radio" name="'+x+'" id="serverver_'+k+'" value="'+val[k]['softname']+'" /></td><td width="12%"></td><td><label class="_label" for="serverver_'+k+'">'+val[k]['fullname']+'</label></td></tr></table></div>';
				}
				processing_symb();
				$("#"+id).html(str);
				$("#webuzo_webserver_tr").show();
			}
		}
	});
};

function gateway_req(val){
	
	// Is there a requirement function ?
	var requirementfn = window[val+'_requirement'];
	if(typeof requirementfn === 'function'){
		requirementfn(val);
	}
}

function process_payment(){
	
	var gateway = $('#gateway').val();
	
	// Is there an PROCESS function ?
	var processfn = window[gateway+'_process'];
	if(typeof processfn === 'function'){
		processfn();
	}
}
