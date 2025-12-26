/*! Rad_cloud (c) (Softaculous Ltd.) rad_cloud.com/license */
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

const chartsList = [];
var gridBorderColor = gridBorder();
var login_logo = '[[login_logo]]';
var mob_logo ='[[mob_logo]]';
var main_logo ='[[logo]]';

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
	if(empty(timestamp)){
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
var current_firewall_plan = 0; // current firewall plan
var charts_rendered = {}; // It stores all the chart currently rendered
// virt_lang will have the API language as in variable like acts and all
// [[virt_vlang]]

$(document).ready(function(){
	var q = windowHASH();
	loadpage(q); // Load the Dashboard by default
	common_func_calls();
});

// Shows the loading text
function Loading(show){

	Disconnected = 0; // By default we assume we are connected

	// Error loading
	if(show < 0){

		isLoading = 0;
		Disconnected = 1;

		// Show we are disconnected
		$("#loading").html('<div class="banner-red">{{disconnected}}</div>');
		$_('loading').style.left = ((document.body.clientWidth - $("#loading").width()) / 2).toString() + "px";
		$("#loading").show();

		return;

	}

	// Set the loading text
	$("#loading").html('<div class="progress-bar-value p-[2px] bg-[#0075ff]"></div>');

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
			if($(this).is("input") && ($(this).attr("type") == "text" || $(this).attr("type") == "number" || $(this).attr("type") == "password" || $(this).attr("type") == "hidden")){

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

// Custom Modal Function.
var modalConfirm = function(callback, msg){
	
	$("#confirm-modal .modal-body").html(msg);
	toggleModal('confirm-modal');

	$("#ok").off().on("click", function(){
		callback(true);
		toggleModal('confirm-modal');
	});
	
	$("#cancel").off().on("click", function(){
		callback(false);
		toggleModal('confirm-modal');
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
	$("#pagejump form").submit(function() {
		val = $("#pagejump :text").val();
		val = parseInt(val);
		if(val > 0 && val <= len){

			if(typeof isit_fn === 'function'){
				isit_fn(urlto+(val));
			}else{
				loadpage(urlto+(val));
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
	$_('pagejump').style.left=Math.ceil(offset.left + 5)+"px";
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
	// pageInfo["maxNum"] = 100;
	// pageInfo["len"] = 20;
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
	var str = '<div class="flex justify-between md:items-center md:flex-row flex-col gap-3 px-3 py-3 m-2>'+
		'<p class="text-[#535A7A] dark:text-[#999FAE] text-sm whitespace-nowrap">{{page_page}} '+$pg+' {{page_of}} '+$pages+'</p><div class="flex items-center gap-2">';

	for(x in $_pages){
		var i = x.substring(0, 1) == "i" ? x.substring(1) : x;
		str += '<button class="' + (i == $pg ? 'pagination_page_selected' : 'pagination_page' ) + '" onclick="'+call_func+'(\''+final+$_pages[x]+'\')">'+i+'</button>';
	};

	str += '</div>'+
'</div>';

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
	
	// Left menu remove selection
	$('.left-sidebar-menu li').removeClass('active-menu');
	
	// As per act show selected 
	$('#lm'+act).addClass('active-menu').siblings('.active-menu').removeClass('active-menu');

	// Hide the status of the vm for other pages. It will be shown on vps manage page
	$(".vm_status").hide();
	$('.floating-button').hide();

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

		let profile_warning = document.getElementById('profile-warning');

		var preference_keys = Object.keys(N['preferences']);
		let is_all_values = check_all_values(preference_keys);

		if(is_all_values[0] > 0 && !empty(N['force_preference']) && N['act'] !== 'register'){
			N["act"] = 'profile';
			$("#profile-warning").show();
				}else{
			$("#profile-warning").hide();
		}	

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

	var tab = getParameterByName('tab', 1);

	// if url has tab then redirect to correct tab
	if(!empty(tab)){
		$('a[href="#'+tab+'"]').tab('show');
	}
	
	virt_pop();

};


// Check that all values are includes or not and return length and which fields are not filled
function check_all_values(array){
	let tmp_profile_fields = [];
	let profile_fields = ['fname','lname','company','address','country','state','city','zip','phone','sys_admin_email'];

	for(let i=0; i<profile_fields.length;i++){
		if(!array.includes(profile_fields[i])){
			tmp_profile_fields.push(profile_fields[i]);
		}
	}

	return [tmp_profile_fields.length, tmp_profile_fields];
}

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
	
	if(!empty(N["disable_login_logo"])){
		$('.disable_loginlogo').html('<img src="[[images]]disable_logo.png" width="600"/>');
		$('.disable_loginlogo').show();
		$('.disable_loginlogo_mainlogo').hide();
	}

	if(!empty(main_logo)){
		$('.main-logo').html('<img src="[[logo]]"/>');
	}
	$('.main-logo').show();
	

	if(!empty(mob_logo)){
		$('#mob_logo').html('<img src="[[mob_logo]]" width="80"/>')
	}

	if(!empty(N["suspended"])){
		$("#suspended").show();
		$("#mainwindow").hide();
		$("#suspended").html(N["suspended"]["reason"]);
		
	}else{
		$("#suspended").html("");
		$("#suspended").hide();
	}

	// Is there an ONLOAD function
	var fn = window[act+'_onload'];
	
	// If its there, then call it
	if(typeof fn === 'function'){
		if(fn() == -1){
			return;
		}
	}
	
	// to update count of the resources in the left menu.
	counts();
	
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

	header_fix();

	// Handle footer
	if('copyright' in N){
		$("#copyright").html(N['copyright']);
	}

}

//Function / js code which needs to be called for all the pages
function common_func_calls(){

	const sidebar = document.getElementById('sidebar');
	const arrowBtn = document.getElementById('arrowBtn');
	const arrowSVG = document.getElementById('arrowSVG');

	arrowBtn.addEventListener('click', () => {
		sidebar.classList.toggle('-mr-[178px]');
		arrowSVG.classList.toggle('rotate-180');
	});
	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
	
	checktheme();

	// For dropdown menu for user profiles and other settings
	const profileAvatarBtn = document.getElementById("profileAvatar");
	const profileDropdown = document.getElementById("profileDropdown");

	profileAvatarBtn.addEventListener("click", () => {
		profileDropdown.classList.toggle("active");
	});
	document.addEventListener("click", (event) => {
		if (!profileDropdown.contains(event.target) && !profileAvatarBtn.contains(event.target)) {
			profileDropdown.classList.remove("active");
		}
	});

	// To handle mobile view burger button
	const toggleButton = document.getElementById("toggleButton");
	const closeSidebarButton = document.getElementById("closeSidebar");
	const sideBar = document.getElementById("sideBar");

	toggleButton.addEventListener("click", function () {
		sideBar.classList.add("translate-x-0");
		sideBar.classList.remove("-translate-x-full");
	});

	closeSidebarButton.addEventListener("click", function () {
		sideBar.classList.remove("translate-x-0");
		sideBar.classList.add("-translate-x-full");
	});

	// initialize components based on data attribute selectors
	initFlowbite();
};

function checktheme(page){
	
	var page = page || '';
	//console.log(page);
	// icons
	const sunIcon = document.querySelector("."+page+"rad_cloud-light");
	const moonIcon = document.querySelector("."+page+"rad_cloud-dark");

	// theme vars
	const userTheme = localStorage.getItem("theme");
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

	// icon toggle
	const iconToggle = () => {
		moonIcon.classList.toggle("hidden");
		sunIcon.classList.toggle("hidden");
	}

	// initial theme check
	const themeCheck = () => {
		if (userTheme === "dark" || (!userTheme && systemTheme)) {
			document.documentElement.classList.add("dark");
			moonIcon.classList.add("hidden");
			return;
		}
		sunIcon.classList.add("hidden");
	}
	themeCheck();
	
	// manual theme switch
	const themeSwitch = () => {
		if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			iconToggle();
			return;
		}
		document.documentElement.classList.add("dark");
		localStorage.setItem("theme", "dark");
		iconToggle();
	}

	// call theme switch on clicking button
	sunIcon.addEventListener("click", () => {
		themeSwitch();
	});

	moonIcon.addEventListener("click", () => {
		themeSwitch();
	});
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


// Shows a success message
function done(success){

	var count = 0;
	var goto = "";
	for (k in success) count++;

	// If count is 0 then no success message was there
	if(count < 1) return;

	if(typeof(success["msg"]) != 'undefined'){
		success_alert(success["msg"]);
	}

	// Are we to get redirected ?
	if(typeof(success["goto"]) != 'undefined'){

		// This acts has the tabs.
		var acts = ['users', 'euiso', 'sshkeys', 'firewallplan', 'recipes'];

		acts.forEach(function(i){
			
			if(success["goto"].search(i) > 0){
				// we will redirect to the list tab
				if(i == 'firewallplan'){
					showtab("list_firewall", "firewall_settings");
				}else{
					showtab(i+"-list", i+"-tab-content");
				}
			}
		});

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
		err_str += count++ +") " + er[k] + "<br>";
	}

	error_alert(err_str);
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
function drawTable(props, cols, data){

	var elid = props['id'];

	// Final Properties
	var fp = {"width" : '100%',
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
	var table = '<table class="table" id="'+fp["tid"]+'" border="'+fp["border"]+'" cellspacing="'+fp["cellspacing"]+'" cellpadding="'+fp["cellpadding"]+'" class="'+fp["class"]+'" align="'+fp["align"]+'" width="'+fp["width"]+'"><thead class="bg-[#F8FAFD] dark:bg-[#15172B] border-y border-y-[#ECEFF3] dark:border-y-gray-800"><tr class="text-[#615E83] dark:text-[#B7B9C3] !text-sm uppercase text-start">';

	// Add the headers
	for(x in cols){
		table += '<th '+(cols[x]["width"] ? 'width="'+cols[x]["width"]+'"' : '')+' class="'+(cols[x]["class"] ? cols[x]["class"] : '!px-4 !py-3 font-medium cursor-pointer whitespace-nowrap')+'"><div class="text-start flex items-center gap-2 uppercase"><span>'+cols[x]["l"]+'</span></div></th>';
	}

	table += '</tr></thead>';

	var $i = 0; // For color

	for(d in data){
		$i++;
		table += '<tr class="text-sm text-[#666D80] dark:text-[#989CAE] dark:hover:bg-[#00C88F14] hover:bg-[#00C88F14] transition-all duration-300 border-b border-b-[#ECEFF3] dark:border-b-gray-800">';

		for(x in cols){
			table += '<td '+(cols[x]["centered"] ? 'align="center"' : '')+' '+(cols[x]["align"] ? 'align="'+cols[x]["align"]+'"' : '')+(!(x == 'select_all') ?' class="!px-4 !py-5 whitespace-nowrap"' : '')+'>'+data[d][x]+'</td>';
		}

		table += '</tr>';
	}

	table += '</table>';

	$('#'+elid).html(table);


};


//////////////////////
// GRAPHING FUNCTIONS
//////////////////////

// Draw a Resource Graph
function resource_graph(id, data){

	var fill_colors = data['fill_colors'] || ["#077bff91"];
	var colors = data['colors'] || ["#0779FF"];
	var chart_options = {
		series: data['series'],
		labels: data['labels'],
		title: data['title'],
		chart: {
			height: 150,
			type: 'radialBar',
		},
		stroke: {
			lineCap: "round",
		},
		colors: ["#0075ff"],
		plotOptions: {
			radialBar: {
				hollow: {
					size: "65%"
				},
				track: {
					background: '#d9eaff',
				},
				dataLabels: {
					name: {
						color: "#9A9DA8",
						offsetY: 15,
						fontSize: "12px",
						fontFamily: "inter",
						fontWeight: 300,
					},
					value: {
						color: "#9A9DA8",
						offsetY: -20,
						fontWeight: 500,
						fontSize: "12px",
						fontFamily: "inter",
					}
				},
			},
		},
	};

	if(charts_rendered[id] != undefined){

		charts_rendered[id].destroy();
		delete charts_rendered[id];
	}

	var draw_chart = new ApexCharts(document.querySelector("#"+id), chart_options);
	draw_chart.render();
	charts_rendered[id] = draw_chart;
}


/*for updated_graph_data_and_options = {
  series: [{
	data: [{
	  x: "02-02-2002",
	  y: 44
	}, {
	  x: "12-02-2002",
	  y: 51
	}]
  }],
  xaxis: {
	position: 'top'
  }
}*/

// Draw Live status graphs
function live_resource_graph(draw_chart = {}, id, inital_chart_options, updated_graph_data = {}, updated_graph_data_and_options ={}){
	
	if(empty(draw_chart)){
		
		if(charts_rendered[id] != undefined){

			charts_rendered[id].destroy();
			delete charts_rendered[id];
		}

		draw_chart = new ApexCharts(document.querySelector("#"+id), inital_chart_options);
		draw_chart.render();
		charts_rendered[id] = draw_chart;

	}else if(!empty(draw_chart) && !empty(updated_graph_data)){
		
		draw_chart.updateSeries(updated_graph_data);

	}else if(!empty(draw_chart) && !empty(updated_graph_data_and_options)){

		draw_chart.updateOptions(updated_graph_data_and_options);
	}

	return draw_chart;
};

function gd(year, month, day) {
	return new Date(year, month - 1, day).getTime();
};

/////////////////////////
// ALL ONLOAD FUNCTIONS
/////////////////////////

var vnc_vm = new Array();

function setup_pending_onload(){
	
	var is_hvm = (!empty(N['info']['hvm']) ? 'hvm' : '');
	
	var virt = N['virt'] + is_hvm;
	$("#ps_virt").val(virt);
	$("#ps_setup_pending").val(getParameterByName('setup_pending', 1));
	$("#ps_svs").val(getParameterByName('svs', 1));
	fill_ostemplates('ps_');
	handle_ssh_settings('ps_');
}

function listvs_onload(){

	if(isError()){
		error(N["error"]);
		return -1;
	}
	
	var is_cloud = false;
	var vs_no_res_cloud = '';

	if('user_type' in N){

		if(N['user_type'] == 2){
			is_cloud = true;
			vs_no_res_cloud = ` ! <a href="#act=create">
									<u>Create a new VPS now</u>
									</a>`
		}
	}

	if(N["vs"] == ''){
		$('#vslist').html(`<div class="notice">{{vs_no_res}}${vs_no_res_cloud}</div>`);
		$('#pagelinks_vslist .pagination-top, #vslist-bottom-go-options, #pagelinks_vslist .pagination-bottom').hide();
		return;
	}
	$('#vslist').html('');
	$('#suspend_div').html("");

	pageNum = getParameterByName('page', 1);

	if('servergroups' in N){

		var server_groups = N['servergroups'];

		server_groups_html = '';

		for(let sgid in server_groups){
			server_groups_html += "<option value='"+server_groups[sgid]['sgid']+"'>"+server_groups[sgid]['sg_reseller_name']+"</option>"; 
		}

		$('#group-option').html(server_groups_html);

	}

	$('.userc').hide();

	if(is_cloud){
		$('.userc').show();
	}

	var cols = new Object();
	cols["vpsid"] = {"l" : '{{id}}', "width" : '5%'};
	cols["hostname"] = {"l" : '{{lst_lv_hname}}', "width" : '150'};
	cols["information"] = {"l" : '{{info}}', "width" : '150'};
	cols["user"] = {"l" : '{{user}}', "width" : '150'};
	cols["state"] = {"l" : '{{lst_lv_state}}<i id="refresh_status" class="fas fa-sync-alt p-1.5 mx-1 rounded-full bg-white shadow" aria-hidden="true" onclick="loadpage(\'act=listvs\');"></i>', "width": '3%', "centered": true};
	if(!empty(N['info']['flags']['show_server'])){
		cols["server"] = {"l" : '{{lst_lv_sname}}', "width" : "150"};
	}

	if(!empty(N['inhouse_billing'])){		
		$("#search-greoup-div").removeClass("hidden");
	}else{
		$("#search-greoup-div").addClass("hidden");
	}

	cols['vps_action'] = {"l" : '{{action}}', "width" : '10%'};
	
	
	//cols["manage_vm"] = {"l" : '', "width" : '1%'};

	cols["select_all"] = {"l" : `<div class="custom-control custom-checkbox">
									<input type="checkbox" name="select_all" id="vps_select_all" class="select_all virt-checkbox" onchange="checkbox_select_all(this);">
										<label class="custom-control-label" for="vps_select_all">
										</label>
								</div>`, 
								"width" : '1%', 
								"class" : 'select-all-checkbox'};
	
	// Prepare the list
	for(x in N["vs"]){
		
		if(!empty(N["vs"][x]["vnc"])){
			vnc_vm.push(x);
		}
		
		$v = N["vs"][x];

		N["vs"][x]["state"] = '<span data-popover-target="stat_'+ x +'" data-popover-placement="right">'+($v['status'] == 2 ? '<span class="!p-2 badge-gray cursor-pointer shadow">{{lst_stat_suspended}}</span>' : ($v['status'] == 1 ? '<span class="!p-2 badge-green cursor-pointer shadow">{{lst_vps_id_stat_on}}</span>' : '<span class="!p-2 badge-red cursor-pointer shadow">{{lst_vps_id_stat_off}}</span>') )+'</span>';


		var tmp_vpsmenustr = '';

		if(N['vs'][x]['status'] == 0){
			tmp_vpsmenustr += '<a href="javascript:void(0)"><i class="fa fa-play power-on" title="{{svm_sub_but}}" aria-hidden="true" onclick="jqueryvpsboot(\'start\', \'stat_'+x+'\', '+x+');"></i></a>';
		}else{
			tmp_vpsmenustr += '<a href="javascript:void(0)"><i class="fa fa-stop stop" aria-hidden="true" title="{{stvm_sub_but}}" onclick="jqueryvpsboot(\'stop\', \'stat_'+x+'\', '+x+')"></i></a> \
			<a href="javascript:void(0)"><i class="fas fa-sync-alt refresh" aria-hidden="true" title="{{re_sub_but}}" onclick="jqueryvpsboot(\'restart\', \'stat_'+x+'\', '+x+')"></i></a>';

			if(empty(N['disable_enduser_vps_poweroff'])){
				tmp_vpsmenustr += '<a href="javascript:void(0)"><i class="fa fa-power-off power-off" title="{{po_sub_but}}" onclick="jqueryvpsboot(\'poweroff\', \'stat_'+x+'\', '+x+')" aria-hidden="true"></i></a>';
			}
		}

		if(vnc_vm.indexOf(x.toString()) > -1){
			tmp_vpsmenustr += (!empty(N['info']['flags']['novnc']) ? '<a id="novncURL_'+x+'" class="vncButton" href="[[url]]act=vnc&novnc=1&jsnohf=1&svs='+ x +'" target="_blank"><i class="fas fa-tv text-blue-600" title="{{lst_vpmenu_novnc}}"></i></a>' : (empty(N['info']['flags']['disable_java_vnc']) ? '<a href="javascript:void(0);" id="java_vnc_'+x+'" class="vncButton" onclick="launchjvnc('+x+')"><img style="padding-left:4px;" src="[[images]]vnc.png" title="{{lst_vpmenu_javavnc}}"/></a>' : ''));
		}

		N["vs"][x]["state"] += '<div data-popover id="stat_'+x+'" role="tooltip" class="absolute z-40 opacity-0 invisible eu_menu_popover"><div class="flex gap-4 items-center vpsmanage_icons px-2 py-2">'+tmp_vpsmenustr+'</div><div data-popper-arrow></div></div>';

		var os_distro = $v['distro'];
		N["vs"][x]["osimg"] = os_distro.match(/^http/g) ? $v['distro'] : $v['distro'];

		if(!empty(N['info']['flags']['show_server'])){
			N["vs"][x]["server"] = '<div class="flex flex-col gap-1"><h4 class="listvs_vals">'+N["vs"][x]["server_name"]+'</h4><p class="listvs_vals_header">'+N["vs"][x]["region"]+'</p></div>';
		}

		var ip_count = 0;
		var ips = '';

		if('ips' in N["vs"][x]){
			$.each(N["vs"][x]["ips"], function(index, value){
				if(ip_count != 0){
					ips += '<div>'+value+'</div>';
				}
				ip_count++;
			});
		}

		var charges = '';

		for (var k in N["vs"][x]["ips"]){
			ips = N["vs"][x]["ips"][k];
			if(ip_count > 1){
				ips += `<span class="bg-[#f0f1f3] dark:bg-[#181b2d] px-1.5 py-1 rounded-md" tooltip="`+ips+`">+`+(ip_count - 1)+`</span>`;
				break;
			}
		}
		$tmp_hostname = $v['hostname'];
		N["vs"][x]['hostname'] = `
		<div class="flex items-center gap-2">
			<div class="w-10">
				<img tooltip="`+$v['os_name']+`" src="`+N["vs"][x]["osimg"]+`" alt="`+$v['os_name']+`" />
			</div>
			<div class="flex flex-col">`;
				if(!empty(N["vs"][x]['setup_pending'])){
					N["vs"][x]['hostname'] += `<h4 class="text-[#ca8a04] dark:text-[#a16207] font-medium">{{ps_setup_pending}}</h4>`;
				}else{
					N["vs"][x]['hostname'] += `<h4 class="text-[#2F3554] dark:text-[#D9DBE4] font-medium">`+$tmp_hostname+`</h4>`;
				}

				N["vs"][x]['hostname'] += `
				<p class="listvs_vals_header flex items-center gap-2">`+ips+`</p>
				<p>`+(!empty($v['nw_suspended']) ? 
				`<span class="fa-stack" title="{{lst_ntwsuspended}}">
					<i class="fas fa-wifi text-blue-600 fa-stack-1x "></i>
					<i class="fas fa-slash danger fa-stack-1x"></i>
				</span>`: ``) + (!empty($v['rescue']) ? 
				`<i class="fas fa-life-ring text-orange-400 fa-1x" title="{{resc_rescue_enabled}}"></i>` : ``)+ (!empty($v['locked']) ? `<i class="fas fa-lock fa-1x " `+(!empty($v['locked']['reason']) ? `tooltip="`+$v['locked']['reason'] : '')+`"></i>` : '')+`
			</div>
		</div>`;
		
		N["vs"][x]['information'] = `
		<div class="flex flex-row items-center divide-x divide-[#ECEFF3] dark:divide-gray-700">
			<div class="flex flex-col gap-1 pr-2">
				<div class="flex flex-row gap-1 items-center">
					<p class="listvs_vals_header">
						<svg class="h-6" fill="#005BFF" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-44.99 -44.99 389.90 389.90" xml:space="preserve" stroke="#005BFF" stroke-width="0.0029992"><g id="" stroke-width="0"></g><g id="" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.59984"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M293.4,65.2H6.52C2.914,65.2,0,68.114,0,71.72v117.36c0,3.606,2.914,6.52,6.52,6.52h6.52v32.6 c0,3.606,2.914,6.52,6.52,6.52h260.8c3.606,0,6.52-2.914,6.52-6.52v-32.6h6.52c3.606,0,6.52-2.914,6.52-6.52V71.72 C299.92,68.114,297.006,65.2,293.4,65.2z M273.84,221.68h-19.56H228.2h-26.08h-26.08h-26.08h-26.08H97.8H71.72H45.64H26.08V195.6 h19.56h26.08H97.8h26.08h26.08h26.08h26.08h26.08h26.08h19.56V221.68z M286.88,182.56h-6.52H19.56h-6.52V78.24h273.84V182.56z"></path> <path d="M32.6,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H32.6c-3.606,0-6.52,2.914-6.52,6.52 V163C26.08,166.606,28.994,169.52,32.6,169.52z M39.12,104.32H65.2v52.16H39.12V104.32z"></path> <path d="M97.8,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H97.8c-3.606,0-6.52,2.914-6.52,6.52 V163C91.28,166.606,94.194,169.52,97.8,169.52z M104.32,104.32h26.08v52.16h-26.08V104.32z"></path> <path d="M163,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H163c-3.606,0-6.52,2.914-6.52,6.52 V163C156.48,166.606,159.394,169.52,163,169.52z M169.52,104.32h26.08v52.16h-26.08V104.32z"></path> <path d="M228.2,169.52h39.12c3.606,0,6.52-2.914,6.52-6.52V97.8c0-3.606-2.914-6.52-6.52-6.52H228.2 c-3.606,0-6.52,2.914-6.52,6.52V163C221.68,166.606,224.594,169.52,228.2,169.52z M234.72,104.32h26.08v52.16h-26.08V104.32z"></path> <path d="M52.16,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C49.246,221.68,52.16,218.766,52.16,215.16z"></path> <path d="M78.24,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C75.326,221.68,78.24,218.766,78.24,215.16z"></path> <path d="M104.32,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C101.406,221.68,104.32,218.766,104.32,215.16z"></path> <path d="M130.4,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C127.486,221.68,130.4,218.766,130.4,215.16z"></path> <path d="M156.48,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52s-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 S156.48,218.766,156.48,215.16z"></path> <path d="M182.56,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C179.646,221.68,182.56,218.766,182.56,215.16z"></path> <path d="M208.64,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C205.726,221.68,208.64,218.766,208.64,215.16z"></path> <path d="M234.72,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C231.806,221.68,234.72,218.766,234.72,215.16z"></path> <path d="M260.8,215.16v-13.04c0-3.606-2.914-6.52-6.52-6.52c-3.606,0-6.52,2.914-6.52,6.52v13.04c0,3.606,2.914,6.52,6.52,6.52 C257.886,221.68,260.8,218.766,260.8,215.16z"></path> </g> </g> </g> </g></svg>
					</p>
					<h4 class="listvs_vals">`+N["vs"][x]['ram']+` {{mb}}</h4>
				</div>
				<div class="flex flex-row gap-1 items-center">
					<p class="listvs_vals_header">
						<svg viewBox="0 0 1024 1024" class="h-6" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id=""><path d="M648.4 677.5H352.6c-8.3 0-15.1-6.8-15.1-15.1v-295c0-5.5-4.5-10-10-10s-10 4.5-10 10v295c0 19.4 15.7 35.1 35.1 35.1h295.8c5.5 0 10-4.5 10-10s-4.4-10-10-10z" fill="#06F3FF"></path><path d="M865 386.5c11 0 20-9 20-20s-9-20-20-20h-69.7v-56.8c0-38.6-31.4-70-70-70h-27.8v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H611v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-46.5v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3H438v-67.3c0-11-9-20-20-20s-20 9-20 20v67.3h-85.8c-38.6 0-70 31.4-70 70v56.8h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V433h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v46.5h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7V606h-69.7c-11 0-20 9-20 20s9 20 20 20h69.7v56.8c0 38.6 31.4 70 70 70H343v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5H516v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h46.5v72.5c0 11 9 20 20 20s20-9 20-20v-72.5h82.8c38.6 0 70-31.4 70-70V646H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865c11 0 20-9 20-20s-9-20-20-20h-69.7V473H865c11 0 20-9 20-20s-9-20-20-20h-69.7v-46.5H865zM755.3 702.7c0 16.5-13.5 30-30 30H312.2c-16.5 0-30-13.5-30-30v-413c0-16.5 13.5-30 30-30h413.1c16.5 0 30 13.5 30 30v413z" fill="#005BFF"></path></g></svg>
					</p>
					<h4 class="listvs_vals">`+N["vs"][x]['cores']+` {{core}}</h4>
				</div>
			</div>
			<div class="flex flex-col gap-1 px-2">
				<div class="flex flex-row gap-1 items-center">
					<p class="listvs_vals_header">
						<svg class="h-6" viewBox="-2.4 -2.4 20.80 20.80" xmlns="http://www.w3.org/2000/svg" fill="#005BFF" class="bi bi-hdd-fill"><g id="" stroke-width="0"></g><g id="" stroke-linecap="round" stroke-linejoin="round"></g><g id=""> <path d="M0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-1zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2 0a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM.91 7.204A2.993 2.993 0 0 1 2 7h12c.384 0 .752.072 1.09.204l-1.867-3.422A1.5 1.5 0 0 0 11.906 3H4.094a1.5 1.5 0 0 0-1.317.782L.91 7.204z"></path> </g></svg>
					</p>
					<h4 class="listvs_vals">`+N["vs"][x]['space']+` {{gb}}</h4>
				</div>
				<div class="flex flex-row gap-1 items-center">
					<p class="listvs_vals_header">
						<svg class="h-6" viewBox="-2.4 -2.4 20.80 20.80" xmlns="http://www.w3.org/2000/svg" fill="" stroke=""><g id="" stroke-width="0"></g><g id="" stroke-linecap="round" stroke-linejoin="round"></g><g id=""> <g fill="#005BFF"> <path d="m 12 1 c 0.265625 0 0.519531 0.105469 0.707031 0.292969 l 3 3 c 0.390625 0.390625 0.390625 1.023437 0 1.414062 l -3 3 c -0.390625 0.390625 -1.023437 0.390625 -1.414062 0 s -0.390625 -1.023437 0 -1.414062 l 1.292969 -1.292969 h -7.585938 c -0.550781 0 -1 -0.449219 -1 -1 s 0.449219 -1 1 -1 h 7.585938 l -1.292969 -1.292969 c -0.390625 -0.390625 -0.390625 -1.023437 0 -1.414062 c 0.1875 -0.1875 0.441406 -0.292969 0.707031 -0.292969 z m 0 0" fill-opacity="0.34902"></path> <path d="m 4 15 c -0.265625 0 -0.519531 -0.105469 -0.707031 -0.292969 l -3 -3 c -0.3906252 -0.390625 -0.3906252 -1.023437 0 -1.414062 l 3 -3 c 0.390625 -0.390625 1.023437 -0.390625 1.414062 0 s 0.390625 1.023437 0 1.414062 l -1.292969 1.292969 h 7.585938 c 0.550781 0 1 0.449219 1 1 s -0.449219 1 -1 1 h -7.585938 l 1.292969 1.292969 c 0.390625 0.390625 0.390625 1.023437 0 1.414062 c -0.1875 0.1875 -0.441406 0.292969 -0.707031 0.292969 z m 0 0"></path> </g> </g></svg>
					</p>
					<h4 class="listvs_vals">`+(N["vs"][x]['bandwidth'] == 0 ? '<i class="fas fa-infinity"></i>' : N["vs"][x]['bandwidth'])+`</h4>
				</div
			</div>
		</div>`;

		if(!empty(N['inhouse_billing'])){
			charges = N['billing_symbol']+(N["vs"][x]['charges'] || 0);
		}

		N["vs"][x]['user'] = '<div class="flex flex-col gap-1"><h4 class="listvs_vals">'+N["vs"][x]['email']+'</h4><p class="listvs_vals_header">'+charges+'</p></div>';

		var vpsmanageactbuts = '';
		var vpsmanageactbuttons = '';
		
		if(N['user_type'] == 2){
			
			vpsmanageactbuts += '<div id="sus_'+ x +'" class="flex gap-2">';
			if($v["status"] != 0){
				
				if($v['suspended'] == 1){
					vpsmanageactbuts += '<a title="{{lst_unsuspendvs}}" onclick="show_confirm(\'unsuspend\', '+ x +');"><i class="fa fa-play unsuspend" aria-hidden="true"></i></a>';
				}else{
					vpsmanageactbuts += '<a title="{{lst_suspendvs}}" onclick="show_confirm(\'suspend\', '+ x +');"><i class="fa fa-pause suspend" aria-hidden="true"></i></a>';
				}
			}
			
			vpsmanageactbuts += '</div><div id="net_sus_'+ x +'">';
			if($v["status"] != 0 && $v["suspended"] != 1){
				
				if(!empty($v["nw_suspended"])){
					vpsmanageactbuts += '<a title="{{lst_unsuspendvs_net}}" onclick="show_confirm(\'unsuspend_net\', '+ x +');"><i class="fas fa-wifi text-blue-600"></i></a>';
				}else{
					vpsmanageactbuts += '<a title="{{lst_suspendvs_net}}" onclick="show_confirm(\'suspend_net\', '+ x +');"><span class="fa-stack"><i class="fas fa-wifi text-blue-600 fa-stack-1x"></i><i class="fa fa-solid fa-stack-1x fa-slash danger"></i></span></a>';
				}
				
			}
			
			vpsmanageactbuts += '</div>';

			vpsmanageactbuts += '<a title="{{lst_lv_delvs}}" id="'+ x +'" onclick="show_confirm(\'delvs\','+ x +');"><i class="far fa-trash-alt danger cursor-pointer"></i></a>';

			// NEW POPOVER 
			vpsmanageactbuttons = `
				<span data-popover-target="popaction_`+x+`" data-popover-placement="left">
					<svg class="h-[1.4rem] pr-1.5 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><g id="" stroke-width="0"></g><g id="" stroke-linecap="round" stroke-linejoin="round"></g><g id=""> <path d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z" fill="#005BFF"></path> <path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="#005BFF"></path> <path d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z" fill="#005BFF"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" fill="#005BFF"></path> </g></svg>
				</span>
				<div data-popover id="popaction_`+x+`" role="tooltip" class="absolute z-40 opacity-0 invisible eu_menu_popover">
					<div class="flex gap-4 items-center vpsmanage_icons px-2 py-2">`+vpsmanageactbuts+`</div>
					<div data-popper-arrow></div>
				</div>`;

			vpsmanageactbuttons += `
				<span>
					<a class="cursor-pointer" title="{{lst_lv_editvs}}" onclick="loadpage(\'vid=`+ x +`&act=editvm\');">
						<svg class="h-[1.4rem] inline pr-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><g id="" stroke-width="0"></g><g id="" stroke-linecap="round" stroke-linejoin="round"></g><g id=""> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5337 3.3916C20.2236 3.08142 19.9559 2.81378 19.7193 2.60738C19.4702 2.39007 19.2019 2.1918 18.876 2.05679C18.1409 1.75231 17.3149 1.75231 16.5799 2.05679C16.2539 2.1918 15.9856 2.39007 15.7365 2.60738C15.4999 2.81378 15.2323 3.08141 14.9221 3.39159L8.93751 9.37615C8.52251 9.79078 8.20882 10.1042 7.97173 10.477C7.77111 10.7924 7.61569 11.1344 7.51002 11.4929C7.38514 11.9167 7.35534 12.3591 7.31592 12.9444L7.1842 14.8876C7.17485 15.0247 7.16396 15.1845 7.16666 15.3246C7.16974 15.4838 7.18962 15.7203 7.30999 15.9677C7.45687 16.2697 7.70083 16.5137 8.00282 16.6606C8.25029 16.7809 8.48679 16.8008 8.64598 16.8039C8.78602 16.8066 8.94585 16.7957 9.08298 16.7863L11.0261 16.6546C11.6114 16.6152 12.0539 16.5854 12.4776 16.4605C12.8362 16.3549 13.1782 16.1994 13.4936 15.9988C13.8664 15.7617 14.1798 15.448 14.5944 15.033L20.579 9.04845C20.8891 8.73829 21.1568 8.47067 21.3632 8.23405C21.5805 7.98491 21.7788 7.71662 21.9138 7.39069C22.2182 6.65561 22.2182 5.82968 21.9138 5.09459C21.7788 4.76867 21.5805 4.50038 21.3632 4.25124C21.1568 4.01464 20.8892 3.74704 20.579 3.43691L20.5337 3.3916ZM18.1106 3.90455C18.1522 3.92179 18.2324 3.96437 18.4046 4.11458C18.5836 4.27072 18.803 4.48928 19.1421 4.82843C19.4813 5.16758 19.6998 5.3869 19.856 5.56591C20.0062 5.73813 20.0488 5.81835 20.066 5.85996C20.1675 6.10499 20.1675 6.3803 20.066 6.62533C20.0488 6.66694 20.0062 6.74716 19.856 6.91938C19.7482 7.04288 19.6108 7.18558 19.4245 7.37359L16.597 4.54602C16.785 4.35976 16.9277 4.22231 17.0512 4.11458C17.2234 3.96437 17.3036 3.92179 17.3452 3.90455C17.5903 3.80306 17.8656 3.80306 18.1106 3.90455ZM15.1823 5.9598L18.0107 8.78823L13.2465 13.5525C12.7366 14.0624 12.5842 14.207 12.4202 14.3112C12.2625 14.4116 12.0915 14.4893 11.9122 14.5421C11.7258 14.597 11.5167 14.6168 10.7973 14.6655L9.19649 14.7741L9.30502 13.1732C9.3538 12.4538 9.37351 12.2447 9.42845 12.0583C9.48128 11.879 9.55899 11.708 9.6593 11.5503C9.76359 11.3863 9.90816 11.234 10.418 10.7241L15.1823 5.9598Z" fill="#005BFF"></path> <path d="M11.0055 2C9.61949 1.99999 8.51721 1.99999 7.62839 2.0738C6.71811 2.14939 5.94253 2.30755 5.23415 2.67552C4.1383 3.24478 3.24477 4.1383 2.67552 5.23416C2.30755 5.94253 2.14939 6.71811 2.0738 7.6284C1.99999 8.51721 1.99999 9.61949 2 11.0055V12.9945C1.99999 14.3805 1.99999 15.4828 2.0738 16.3716C2.14939 17.2819 2.30755 18.0575 2.67552 18.7659C3.24477 19.8617 4.1383 20.7552 5.23415 21.3245C5.94253 21.6925 6.71811 21.8506 7.62839 21.9262C8.5172 22 9.61946 22 11.0054 22H13.0438C14.4068 22 15.4909 22 16.3654 21.9286C17.261 21.8554 18.0247 21.7023 18.7239 21.346C19.8529 20.7708 20.7708 19.8529 21.346 18.7239C21.7023 18.0247 21.8554 17.261 21.9286 16.3654C22 15.4909 22 14.4069 22 13.0439V13C22 12.4477 21.5523 12 21 12C20.4477 12 20 12.4477 20 13C20 14.4166 19.9992 15.419 19.9352 16.2026C19.8721 16.9745 19.7527 17.4457 19.564 17.816C19.1805 18.5686 18.5686 19.1805 17.816 19.564C17.4457 19.7527 16.9745 19.8721 16.2026 19.9352C15.419 19.9992 14.4166 20 13 20H11.05C9.60949 20 8.59025 19.9992 7.79391 19.9331C7.00955 19.8679 6.53142 19.7446 6.1561 19.5497C5.42553 19.1702 4.82985 18.5745 4.45035 17.8439C4.25538 17.4686 4.13208 16.9905 4.06694 16.2061C4.0008 15.4097 4 14.3905 4 12.95V11.05C4 9.60949 4.0008 8.59026 4.06694 7.79392C4.13208 7.00955 4.25538 6.53142 4.45035 6.15611C4.82985 5.42553 5.42553 4.82985 6.1561 4.45035C6.53142 4.25539 7.00955 4.13208 7.79391 4.06694C8.59025 4.00081 9.60949 4 11.05 4H12C12.5523 4 13 3.55229 13 3C13 2.44772 12.5523 2 12 2L11.0055 2Z" fill="#005BFF"></path> </g></svg>
					</a>
				</span>`;
		}

		N["vs"][x]["vps_action"] = vpsmanageactbuttons + `
			<span>
				<a class="cursor-pointer" title="{{manage}}" onclick="loadpage(\'act=vpsmanage&svs=`+x+`\');return false;">
					<svg class="h-[1.4rem] inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="#005BFF"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.00002C9.79085 8.00002 7.99999 9.79088 7.99999 12C7.99999 14.2092 9.79085 16 12 16C14.2091 16 16 14.2092 16 12C16 9.79088 14.2091 8.00002 12 8.00002ZM9.99999 12C9.99999 10.8955 10.8954 10 12 10C13.1046 10 14 10.8955 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 9.99999 13.1046 9.99999 12Z" fill="#005BFF"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7673 1.01709C10.9925 0.999829 11.2454 0.99993 11.4516 1.00001L12.5484 1.00001C12.7546 0.99993 13.0075 0.999829 13.2327 1.01709C13.4989 1.03749 13.8678 1.08936 14.2634 1.26937C14.7635 1.49689 15.1915 1.85736 15.5007 2.31147C15.7454 2.67075 15.8592 3.0255 15.9246 3.2843C15.9799 3.50334 16.0228 3.75249 16.0577 3.9557L16.1993 4.77635L16.2021 4.77788C16.2369 4.79712 16.2715 4.81659 16.306 4.8363L16.3086 4.83774L17.2455 4.49865C17.4356 4.42978 17.6693 4.34509 17.8835 4.28543C18.1371 4.2148 18.4954 4.13889 18.9216 4.17026C19.4614 4.20998 19.9803 4.39497 20.4235 4.70563C20.7734 4.95095 21.0029 5.23636 21.1546 5.4515C21.2829 5.63326 21.4103 5.84671 21.514 6.02029L22.0158 6.86003C22.1256 7.04345 22.2594 7.26713 22.3627 7.47527C22.4843 7.7203 22.6328 8.07474 22.6777 8.52067C22.7341 9.08222 22.6311 9.64831 22.3803 10.1539C22.1811 10.5554 21.9171 10.8347 21.7169 11.0212C21.5469 11.1795 21.3428 11.3417 21.1755 11.4746L20.5 12L21.1755 12.5254C21.3428 12.6584 21.5469 12.8205 21.7169 12.9789C21.9171 13.1653 22.1811 13.4446 22.3802 13.8461C22.631 14.3517 22.7341 14.9178 22.6776 15.4794C22.6328 15.9253 22.4842 16.2797 22.3626 16.5248C22.2593 16.7329 22.1255 16.9566 22.0158 17.14L21.5138 17.9799C21.4102 18.1535 21.2828 18.3668 21.1546 18.5485C21.0028 18.7637 20.7734 19.0491 20.4234 19.2944C19.9803 19.6051 19.4613 19.7901 18.9216 19.8298C18.4954 19.8612 18.1371 19.7852 17.8835 19.7146C17.6692 19.6549 17.4355 19.5703 17.2454 19.5014L16.3085 19.1623L16.306 19.1638C16.2715 19.1835 16.2369 19.2029 16.2021 19.2222L16.1993 19.2237L16.0577 20.0443C16.0228 20.2475 15.9799 20.4967 15.9246 20.7157C15.8592 20.9745 15.7454 21.3293 15.5007 21.6886C15.1915 22.1427 14.7635 22.5032 14.2634 22.7307C13.8678 22.9107 13.4989 22.9626 13.2327 22.983C13.0074 23.0002 12.7546 23.0001 12.5484 23H11.4516C11.2454 23.0001 10.9925 23.0002 10.7673 22.983C10.5011 22.9626 10.1322 22.9107 9.73655 22.7307C9.23648 22.5032 8.80849 22.1427 8.49926 21.6886C8.25461 21.3293 8.14077 20.9745 8.07542 20.7157C8.02011 20.4967 7.97723 20.2475 7.94225 20.0443L7.80068 19.2237L7.79791 19.2222C7.7631 19.2029 7.72845 19.1835 7.69396 19.1637L7.69142 19.1623L6.75458 19.5014C6.5645 19.5702 6.33078 19.6549 6.11651 19.7146C5.86288 19.7852 5.50463 19.8611 5.07841 19.8298C4.53866 19.7901 4.01971 19.6051 3.57654 19.2944C3.2266 19.0491 2.99714 18.7637 2.84539 18.5485C2.71718 18.3668 2.58974 18.1534 2.4861 17.9798L1.98418 17.14C1.87447 16.9566 1.74067 16.7329 1.63737 16.5248C1.51575 16.2797 1.36719 15.9253 1.32235 15.4794C1.26588 14.9178 1.36897 14.3517 1.61976 13.8461C1.81892 13.4446 2.08289 13.1653 2.28308 12.9789C2.45312 12.8205 2.65717 12.6584 2.82449 12.5254L3.47844 12.0054V11.9947L2.82445 11.4746C2.65712 11.3417 2.45308 11.1795 2.28304 11.0212C2.08285 10.8347 1.81888 10.5554 1.61972 10.1539C1.36893 9.64832 1.26584 9.08224 1.3223 8.52069C1.36714 8.07476 1.51571 7.72032 1.63732 7.47528C1.74062 7.26715 1.87443 7.04347 1.98414 6.86005L2.48605 6.02026C2.58969 5.84669 2.71714 5.63326 2.84534 5.45151C2.9971 5.23637 3.22655 4.95096 3.5765 4.70565C4.01966 4.39498 4.53862 4.20999 5.07837 4.17027C5.50458 4.1389 5.86284 4.21481 6.11646 4.28544C6.33072 4.34511 6.56444 4.4298 6.75451 4.49867L7.69141 4.83775L7.69394 4.8363C7.72844 4.8166 7.7631 4.79712 7.79791 4.77788L7.80068 4.77635L7.94225 3.95571C7.97723 3.7525 8.02011 3.50334 8.07542 3.2843C8.14077 3.0255 8.25461 2.67075 8.49926 2.31147C8.80849 1.85736 9.23648 1.49689 9.73655 1.26937C10.1322 1.08936 10.5011 1.03749 10.7673 1.01709ZM14.0938 4.3363C14.011 3.85634 13.9696 3.61637 13.8476 3.43717C13.7445 3.2858 13.6019 3.16564 13.4352 3.0898C13.2378 3.00002 12.9943 3.00002 12.5073 3.00002H11.4927C11.0057 3.00002 10.7621 3.00002 10.5648 3.0898C10.3981 3.16564 10.2555 3.2858 10.1524 3.43717C10.0304 3.61637 9.98895 3.85634 9.90615 4.3363L9.75012 5.24064C9.69445 5.56333 9.66662 5.72467 9.60765 5.84869C9.54975 5.97047 9.50241 6.03703 9.40636 6.13166C9.30853 6.22804 9.12753 6.3281 8.76554 6.52822C8.73884 6.54298 8.71227 6.55791 8.68582 6.57302C8.33956 6.77078 8.16643 6.86966 8.03785 6.90314C7.91158 6.93602 7.83293 6.94279 7.70289 6.93196C7.57049 6.92094 7.42216 6.86726 7.12551 6.7599L6.11194 6.39308C5.66271 6.2305 5.43809 6.14921 5.22515 6.16488C5.04524 6.17811 4.87225 6.23978 4.72453 6.34333C4.5497 6.46589 4.42715 6.67094 4.18206 7.08103L3.72269 7.84965C3.46394 8.2826 3.33456 8.49907 3.31227 8.72078C3.29345 8.90796 3.32781 9.09665 3.41141 9.26519C3.51042 9.4648 3.7078 9.62177 4.10256 9.9357L4.82745 10.5122C5.07927 10.7124 5.20518 10.8126 5.28411 10.9199C5.36944 11.036 5.40583 11.1114 5.44354 11.2504C5.47844 11.379 5.47844 11.586 5.47844 12C5.47844 12.414 5.47844 12.621 5.44354 12.7497C5.40582 12.8887 5.36944 12.9641 5.28413 13.0801C5.20518 13.1875 5.07927 13.2876 4.82743 13.4879L4.10261 14.0643C3.70785 14.3783 3.51047 14.5352 3.41145 14.7349C3.32785 14.9034 3.29349 15.0921 3.31231 15.2793C3.33461 15.501 3.46398 15.7174 3.72273 16.1504L4.1821 16.919C4.4272 17.3291 4.54974 17.5342 4.72457 17.6567C4.8723 17.7603 5.04528 17.8219 5.2252 17.8352C5.43813 17.8508 5.66275 17.7695 6.11199 17.607L7.12553 17.2402C7.42216 17.1328 7.5705 17.0791 7.7029 17.0681C7.83294 17.0573 7.91159 17.064 8.03786 17.0969C8.16644 17.1304 8.33956 17.2293 8.68582 17.427C8.71228 17.4421 8.73885 17.4571 8.76554 17.4718C9.12753 17.6719 9.30853 17.772 9.40635 17.8684C9.50241 17.963 9.54975 18.0296 9.60765 18.1514C9.66662 18.2754 9.69445 18.4367 9.75012 18.7594L9.90615 19.6637C9.98895 20.1437 10.0304 20.3837 10.1524 20.5629C10.2555 20.7142 10.3981 20.8344 10.5648 20.9102C10.7621 21 11.0057 21 11.4927 21H12.5073C12.9943 21 13.2378 21 13.4352 20.9102C13.6019 20.8344 13.7445 20.7142 13.8476 20.5629C13.9696 20.3837 14.011 20.1437 14.0938 19.6637L14.2499 18.7594C14.3055 18.4367 14.3334 18.2754 14.3923 18.1514C14.4502 18.0296 14.4976 17.963 14.5936 17.8684C14.6915 17.772 14.8725 17.6719 15.2344 17.4718C15.2611 17.4571 15.2877 17.4421 15.3141 17.427C15.6604 17.2293 15.8335 17.1304 15.9621 17.0969C16.0884 17.064 16.167 17.0573 16.2971 17.0681C16.4295 17.0791 16.5778 17.1328 16.8744 17.2402L17.888 17.607C18.3372 17.7696 18.5619 17.8509 18.7748 17.8352C18.9547 17.8219 19.1277 17.7603 19.2754 17.6567C19.4502 17.5342 19.5728 17.3291 19.8179 16.919L20.2773 16.1504C20.536 15.7175 20.6654 15.501 20.6877 15.2793C20.7065 15.0921 20.6721 14.9034 20.5885 14.7349C20.4895 14.5353 20.2921 14.3783 19.8974 14.0643L19.1726 13.4879C18.9207 13.2876 18.7948 13.1875 18.7159 13.0801C18.6306 12.9641 18.5942 12.8887 18.5564 12.7497C18.5215 12.6211 18.5215 12.414 18.5215 12C18.5215 11.586 18.5215 11.379 18.5564 11.2504C18.5942 11.1114 18.6306 11.036 18.7159 10.9199C18.7948 10.8126 18.9207 10.7124 19.1725 10.5122L19.8974 9.9357C20.2922 9.62176 20.4896 9.46479 20.5886 9.26517C20.6722 9.09664 20.7065 8.90795 20.6877 8.72076C20.6654 8.49906 20.5361 8.28259 20.2773 7.84964L19.8179 7.08102C19.5728 6.67093 19.4503 6.46588 19.2755 6.34332C19.1277 6.23977 18.9548 6.1781 18.7748 6.16486C18.5619 6.14919 18.3373 6.23048 17.888 6.39307L16.8745 6.75989C16.5778 6.86725 16.4295 6.92093 16.2971 6.93195C16.167 6.94278 16.0884 6.93601 15.9621 6.90313C15.8335 6.86965 15.6604 6.77077 15.3142 6.57302C15.2877 6.55791 15.2611 6.54298 15.2345 6.52822C14.8725 6.3281 14.6915 6.22804 14.5936 6.13166C14.4976 6.03703 14.4502 5.97047 14.3923 5.84869C14.3334 5.72467 14.3055 5.56332 14.2499 5.24064L14.0938 4.3363Z" fill="#005BFF"></path> </g></svg>
				</a>
			</span>`;

		// Check if any setup is pending from user?
		if(!empty(N["vs"][x]['setup_pending'])){
			N["vs"][x]["vps_action"] = `
			<span>
				<a class="cursor-pointer" title="{{ps_setup_pending}}" onclick="loadpage(\'act=setup_pending&svs=`+x+`&setup_pending=`+N["vs"][x]['setup_pending']+`\');return false;">
					<i class="fas fa-history"></i>
				</a>
			</span>`;
		}

		N["vs"][x]["select_all"] = '<input type="checkbox" class="ios virt-checkbox" name="vps_list[]" id="vps-checkbox'+N["vs"][x]['vpsid']+'" value="'+N["vs"][x]['vpsid']+'">';
		
	}
	
	pageLinks("pagelinks_vslist", 'act=listvs', N['page']);

	// Form the TABLE
	drawTable({'id' : 'vslist', 'tid' : 'vslist_list_table'}, cols, N["vs"]);
	
	showtooltip();
	
	virt_pop();
	
	var multselarr = {
		"0":"{{lst_with_selected}}",
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

	var bottom_menu = `<div class="bottom-go-options"><div class="input-group">
		<select class="custom-select" name="multi_options" id="multi_options" >
			${sel_opts}
		</select>
		<span class="input-group-append go-option">
			<a class="btn justify-content-end align-items-center d-flex" type="button"><input type="button" value="{{go}}" onclick="show_confirm()" class="go_btn" /></a>
		</span>
	</div></div><div class="clearfix"></div>`;

	$("#vslist-bottom-go-options").html(bottom_menu);
	
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
	var sort_list = [[1,srt],[4,0]];
	if(!empty(N['disable_virttype'])){
		$headers = {0: {sorter: false}, 2: {sorter: false}};
	}

	if(!empty(N['info']['flags']['show_server'])){
		var sort_list = [[1,srt],[4,0],[5,0]];
	}

	for(var i = (col_count - no_sorting_cols); i < col_count; i++){
		$headers[i] = {sorter: false};
	}
	
	var srt = 0;
	if(!empty(N['info']['flags']['enable_idsort'])){
		srt = 1;
	}
	
	// $("#vslist_list_table").tablesorter({
	// 	sortList: sort_list,
	// 	headers: $headers
	// });

	// Server Group Filter Multiple Select
	$("#group-option").on("change", function() {
		var sgroupValues = [];
		sgroupValues.push($("#group-option").val());
		$("#vsgid").val(sgroupValues.toString());
		if($("#vsgid").val() == ""){
			$("#vsgid").val(-1);
		}
	});
};

function search_listvs(){

	var str = $("#listvs_search").serialize();


	pageNum = getParameterByName('page', 1);

	loadpage('[[API]]act=listvs&svs='+N['vpsid']+'&'+str+'&page='+pageNum);
};

function show_virt_name(virt){

	let full_name = "";
	let full_name_tt = "";
	switch (virt) {
		case 'kvm':
			full_name = "KVM";
			full_name_tt = "KVM";
			break;
		case 'proxk':
			full_name = "KVM-PX";
			full_name_tt = "Proxmox KVM";
			break;
		case 'openvz':
			full_name = "OPENVZ";
			full_name_tt = "Openvz";
			break;
		case 'proxl':
			full_name = "LXC-PX";
			full_name_tt = "Proxmox LXC";
			break;
		case 'vzk':
			full_name = "KVM-VZ";
			full_name_tt = "Virtuozzo KVM";
			break;
		case 'vzo':
			full_name = "OPENVZ-7";
			full_name_tt = "Virtuozzo Openvz";
			break;
		case 'xcp':
			full_name = "XCP";
			full_name_tt = "XCP";
			break;
		case 'xcphvm':
			full_name = "XCP-HVM";
			full_name_tt = "Xcp Hvm";
			break;
		case 'xen':
			full_name = "XEN";
			full_name_tt = "XEN";
			break;
		case 'xenhvm':
			full_name = "XEN-HVM";
			full_name_tt = "XEN-HVM";
			break;
		case	'lxc':
			full_name = "LXC";
			full_name_tt = "lxc";
		}
		let ret = '<span class="blue_btn" tooltip="'+full_name_tt+'" >'+full_name+'</span>';
		return ret;
}

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
		$("#info_content").removeClass("alert-success");
		$("#info_content").addClass("error alert-danger");
	}else if(msgtype == "success"){
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
		$('#stat_'+vpsids[x]).html('<div class="loader"></div>');
		
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

		modalConfirm(function(confirm){
			if(!confirm){
				return false;
			}else{

				vpsids[0] = vpsid;

				actionSwitch(todo, vpsids);
				
			}
		}, conf[todo][0]);
	
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

		modalConfirm(function(confirm){
			if(!confirm){
				return false;
			}else{
				actionSwitch(todo,vpsids);
			}
		},conf[todo][1]);
		
	}

}

function actionSwitch(todo, vpsids) {

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
		N["vs"][x]["state"] = '<i class="fa fa-circle '+($v['status'] == 2 ? 'text-gray-600" ' : ($v['status'] == 1 ? 'text-green-600"' : ' text-red-600"')+'></i>');
		N["vs"][x]["vtype"] = $v['virt'] + $v['hvm'] < 1 ? '' : 'hvm';
		N["vs"][x]["osimg"] = '<img src="[[images]]'+ $v['distro'] +'_40.gif" />';

		for (var k in N["vs"][x]["ips"]) {
			N["vs"][x]["def_ip"] = N["vs"][x]["ips"][k];
			break;
		}

		N["vs"][x]["manage"] = '<a href="loadpage(\'act=vpsmanage&svs='+x+'\')"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>';

	}

	// Form the TABLE
	drawTable({'id' : 'vslist', 'tid' : 'vslist_list_table', "width" : '100%'}, cols, N["vs"]);

};

function register_onload(){


	var country_codes = {"91":"IN","1":"US","44":"GB","86":"CN","61":"CC","61":"AU","355":"AL","213":"DZ","1684":"AS","376":"AD","244":"AO","1264":"AI","1268":"AG","54":"AR","374":"AM","297":"AW","43":"AT","1242":"BS","973":"BH","880":"BD","1246":"BB","375":"BY","32":"BE","501":"BZ","229":"BJ","1441":"BM","975":"BT","591":"BO","387":"BA","267":"BW","55":"BR","246":"IO","1284":"VG","673":"BN","359":"BG","226":"BF","257":"BI","855":"KH","237":"CM","238":"CV","599":"CW","1345":"KY","236":"CF","235":"TD","56":"CL","57":"CO","269":"KM","243":"CD","242":"CG","682":"CK","506":"CR","225":"CI","385":"HR","53":"CU","357":"CY","420":"CZ","45":"DK","253":"DJ","1767":"DM","593":"EC","20":"EG","503":"SV","240":"GQ","291":"ER","372":"EE","251":"ET","500":"FK","298":"FO","679":"FJ","358":"AX","33":"FR","594":"GF","689":"PF","241":"GA","220":"GM","995":"GE","49":"DE","233":"GH","350":"GI","30":"GR","299":"GL","1473":"GD","590":"MF","1671":"GU","502":"GT","224":"GN","245":"GW","592":"GY","509":"HT","504":"HN","852":"HK","36":"HU","354":"IS","62":"ID","98":"IR","964":"IQ","353":"IE","972":"IL","39":"VA","1876":"JM","81":"JP","962":"JO","7":"RU","254":"KE","686":"KI","383":"XK","965":"KW","996":"KG","856":"LA","371":"LV","961":"LB","266":"LS","231":"LR","218":"LY","423":"LI","370":"LT","352":"LU","853":"MO","389":"MK","261":"MG","265":"MW","60":"MY","960":"MV","223":"ML","356":"MT","692":"MH","596":"MQ","222":"MR","230":"MU","262":"RE","52":"MX","691":"FM","373":"MD","377":"MC","976":"MN","382":"ME","1664":"MS","258":"MZ","95":"MM","264":"NA","674":"NR","977":"NP","31":"NL","687":"NC","64":"NZ","505":"NI","227":"NE","234":"NG","683":"NU","672":"NF","850":"KP","47":"SJ","968":"OM","92":"PK","680":"PW","970":"PS","507":"PA","675":"PG","595":"PY","51":"PE","63":"PH","48":"PL","351":"PT","974":"QA","40":"RO","250":"RW","290":"SH","1869":"KN","1758":"LC","508":"PM","1784":"VC","685":"WS","378":"SM","239":"ST","966":"SA","221":"SN","381":"RS","248":"SC","232":"SL","65":"SG","1721":"SX","421":"SK","386":"SI","677":"SB","252":"SO","27":"ZA","82":"KR","211":"SS","34":"ES","94":"LK","249":"SD","597":"SR","268":"SZ","46":"SE","41":"CH","963":"SY","886":"TW","992":"TJ","255":"TZ","66":"TH","670":"TL","228":"TG","690":"TK","676":"TO","1868":"TT","216":"TN","90":"TR","993":"TM","1649":"TC","688":"TV","1340":"VI","256":"UG","380":"UA","971":"AE","598":"UY","998":"UZ","678":"VU","58":"VE","84":"VN","681":"WF","967":"YE","260":"ZM","263":"ZW"};

	var options = '';

	$('#contact').val('');

	for (var key in country_codes) {
		if (country_codes.hasOwnProperty(key)) {
			var val = country_codes[key];

			options += '<option value="'+key+'" '+(!empty(N['default_country_code']) && N['default_country_code'] == val ? "selected=selected" : "")+'>'+val+' +'+key+'</otion>';

			$('#country_code').html(options);
		}
	}

	checktheme('register_');

	$('#registerform').show();
	$('#otp_form').hide();
	$('#contact_form').hide();
	$("body").css("overflow", "hidden");
	if(!empty(N['sms_api_field'])){
		$("#contact_div").show();
	}
	
	if(!empty(N['captcha_sitekey'])){
		$('.g-recaptcha').attr('data-sitekey', N['captcha_sitekey']);
		jQuery.getScript('https://www.google.com/recaptcha/api.js');
		$('#gcaptcha').show();
	}
	
	if(!empty(N['terms_conditions'])){
		$("#terms_condition_link").attr("href", N['terms_conditions']);
		$("#terms_conditions_div").show();
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

	if(sa == 'contact'){
		$('#registerform').hide();
		$('#otp_form').hide();
		$('#contact_form').show();
	}

	if(sa == 'otp'){
		$('#registerform').hide();
		$('#contact_form').hide();
		$('#otp_form').show();
		timer(30);
	}

	$('#submit_contact').unbind().click(function(){
		
		var submit_contact = 1;
		var contact = $("#contact").val();
		var u = getParameterByName('u', 1);
		var country_code = $('#country_code').val();

		var key = {"submit_contact":submit_contact, "contact" : contact, "country_code" : country_code, "u" : u};
		Loading(1);
		$.ajax({
			url: "[[API]]act=register",
			method : 'post',
			data : key,
			dataType : 'json',
			success: function(result){
				Loading(0);
				if('error' in result){					
					error(result['error']);
					return false;
				}
				
				done(result['done']);

			}
		});
	});


	
	$('#submit_sms_otp').unbind().click(function(){
		
		var submit_sms_otp = 1;
		var sms_otp = $("#sms_otp").val();
		var key_url = getParameterByName('key_url', 1);

		var key = {"submit_sms_otp" : submit_sms_otp, "sms_otp" : sms_otp, "key_url" : key_url};
		Loading(1);
		$.ajax({
			url: "[[API]]act=register",
			method : 'post',
			data : key,
			dataType : 'json',
			success: function(result){
				Loading(0);
				if('error' in result){					
					error(result['error']);
					return false;
				}
				
				done(result['done']);

			}
		});
	});
	
	$('#reg_resend_link').unbind().click(function(){
		var key_url = getParameterByName('key_url', 1);
		Loading(1);
		$.ajax({
			url: "[[API]]act=register&resendsms=1&key_url="+key_url,
			method : 'post',
			dataType : 'json',
			success: function(res_result){
				Loading(0);
				if('error' in res_result){
					error(res_result['error']);
					return false;
				}

				done(res_result['done']);
			}
		});
	});
	
	// Its the register act
	$_("registerform").reset();

	$("#country_code").select2({width:"auto"});

	// Disable the link
	timer(30);
}

let timerOn = true;

function timer(remaining) {

	$("#reg_resend_link").hide();

	var m = Math.floor(remaining / 60);
	var s = remaining % 60;

	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	document.getElementById('reg_resend_link_timer').innerHTML = '{{reg_resend_otp_in}} '+m + ':' + s;
	remaining -= 1;

	if(remaining >= 0 && timerOn) {
		setTimeout(function() {
			timer(remaining);
		}, 1000);
		return;
	}

	if(!timerOn) {
		// Do validate stuff here
		return;
	}

	// Activate the link
	$("#reg_resend_link").show();
	$("#reg_resend_link_timer").hide();

}

function register_onshow(){

	if(!empty(N['captcha_sitekey'])){
		grecaptcha.reset();
	}
	
}


function show_password(ele, ele_to_show){
	
	if($('.'+ele).hasClass('fa-eye')){
		$("#"+ele_to_show).attr('type', 'text');
		$('.'+ele).removeClass('fa-eye').addClass("fa-eye-slash");
	}else{
		$('.'+ele).removeClass('fa-eye-slash').addClass("fa-eye");
		$("#"+ele_to_show).attr('type', 'password');
	}
};

function login_onload(){

	$("body").css("overflow", "hidden");

	checktheme('login_');

	// Try to get the "sa" in HASH.
	var sa = getParameterByName('sa', 1);

	// If we did not get in HASH, try to search in URL. (If user comes from direct link i.e. incase reset password)
	if(empty(sa)){
		var sa = getParameterByName('sa');
	}

	// Is it a call for forgot password
	if(sa == 'fpass'){
		showwindow('fpass');
		checktheme('fpass_');
		return -1;
	}
	
	// Is it a call for one time password
	if(sa == 'twofact'){
	
		var key = getParameterByName('ltoken', 1);

		checktheme('twofa_');

		// If we did not get in HASH, try to search in URL. (If user comes from direct link i.e. incase reset password)
		if(empty(key)){
			var key = getParameterByName('ltoken');
		}

		$('#twofact_key').val(key);
		
		if(!empty(N["disable_login_logo"])){
			$('.disable_loginlogo').html('<img src="[[images]]disable_logo.png" width="600"/>');
			$('.disable_loginlogo').show();
			$('.disable_loginlogo_mainlogo').hide();
		}else{
			if(!empty(login_logo)){
				$('.main-logo').html('<img src="[[login_logo]]" width="180"/>');
			}
			$('.main-logo').show();
		}
		
		showwindow('twofact');
		return -1;
	}

	// Is it a call for forgot password
	if(sa == 'resetpass'){

		var key = getParameterByName('key', 1);

		checktheme('resetpass_');

		// If we did not get in HASH, try to search in URL. (If user comes from direct link i.e. incase reset password)
		if(empty(key)){
			var key = getParameterByName('key');
		}

		$('#resetpass_key').val(key);
		showwindow('resetpass');
		return -1;
	}

	// Do we have to show API credentials ?
	if(!empty(N["disable_login_logo"])){
		$('.disable_loginlogo').html('<img src="[[images]]disable_logo.png" width="600"/>');
		$('.disable_loginlogo').show();
		$('.disable_loginlogo_mainlogo').hide();
	}else{
		if(!empty(login_logo)){
			$('.main-logo').html('<img src="[[login_logo]]" width="180"/>');
		}
		$('.main-logo').show();
	}

	// Do we have to show Regiter button ?
	if(empty(N["enable_registration"])){
		$('#login_register').hide();
	}else{
		$('#login_register').show();
		checktheme('register_');
	}

	if(!empty(N['hide_forgot_password'])){
		$('#forgot_password').hide();
	}else{
		$('#forgot_password').show();
	}
};

// Some variables for global management
var timer_server_loads;

function update_power_opts(vps_status){
	$('.vm_status').hide();
	$('.vm_status_mob').hide();
	// Suspended
	if(vps_status == 2 ){
		$('#startcell').show();
		$('#restartcell').show();
		$('.vm_status_suspended').show();
		
	// Started
	}else if(vps_status == 1 ){
		$('#stopcell').show();
		$('#poweroffcell').show();
		$('#vnc').show();
		$('#startcell').hide();
		$('.vm_status_online').show();
	// Stopped
	}else{
		$('#startcell').show();
		$('#stopcell').hide();
		$('#poweroffcell').hide();
		$('#restartcell').hide();
		$('#vnc').hide();
		$('.vm_status_offline').show();
	}

}

function capitalize_Words(str){
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function settings_tab() {

	var flag = true;

	$(".left-side-tabs .nav-link").each(function(){

		var href = $(this).attr('href');

		$(this).removeClass("active");
		$(href).removeClass("show active");

		if($(this).css('display') != 'none'){
			
			if(flag){
				$(this).addClass("active");
				$(href).addClass("show active");
				var onclick = $(this).attr('onclick');
				
				if(onclick){
					$(this).trigger("click");
				}
			}

			flag = false;

		}
	});
}

// VPSManage onload wizard
function vpsmanage_onload(){
	
	if(!empty(N["error"])){
		error(N["error"]);
		return -1;
	}

	if(!empty(N['info']['vps']['data'])){
		// Check if the setup is pending and user is trying to manage the VM
		if(!empty(N['info']['vps']['data']['setup_pending'])){
			$('.setup_pending_notice').removeClass('hidden');
			$('.setup_pending_link').html('<a href="javascript:void(0);" onclick="loadpage(\'act=setup_pending&setup_pending='+N['info']['vps']['data']['setup_pending']+'&svs='+N['info']['vps']['vpsid']+'\');">{{ps_click_to_complete_setup}}</a>');
		}else{
			$('.setup_pending_notice').addClass('hidden');
		}
	}
	
	// For Advanced option
	$('#vnc, #vncdetail, #vncpass-cell-tab, #lb, #controlpanel, #rescue-mode-cell, #backups-cell, #backups-inc, #manage_subnet, #system_stat, #proc-cell, #services, #alerts-cell, #console, #recipe-mode-cell, #reinstall, #ssh, #ssh-cell, #hostname, #vps-hostname, #changepass, #ips, #self_shutdown-cell, #managevdf-cell, #sshkeys-cell, #fw, #changefirewallplanform').hide();
	$("#select_lb_form").html('');

	$('.floating-button').show();
	$('#os-cell').show();
	$('#installapps').hide();
	$("#pills-tab .nav-link, #pills-tab .dropdown-item").each(function(){

		var href = $(this).attr("href");
		$(href).removeClass("show active");
		$(this).removeClass('active');
	
	});

	if('2fa_type' in N['info']){

		if(!empty(N['info']['2fa_type'])){
			$('#tfa_status').html(N['info']['2fa_type']);
		}else{
			$('#tfa_status').html('{{ser_statoff}}');
		}
	}else{
		$('#tfa_status').html('off');
	}

	if('last_login' in N['info']){
		$('#info_lastlogin').html(N['info']['last_login']);
	}

	var param = getParameterByName('webuzo', 1);

	if(param){
		$("#installapps").addClass('active');
		$("#installapps-tab").addClass('show active');

	}else{
		$("#overview-tab").addClass('active');
		$("#overview").addClass("show active");
	}

	$('#deleteserver').hide();

	if(N['user_type'] == 2){
		$('#deleteserver').show();
	}

	$("#deleteserver").on("click",function(){
		show_confirm('delvs',N['info']['vpsid']);
	});

	var city = '';
	var countryCode = '';
	var state = '';
	
	if((typeof N['info']['flags']['map_address'] != undefined) && 'map_address' in N['info']['flags']){
		
		city = 'city' in N['info']['flags']['map_address'] && N['info']['flags']['map_address']['city'].search(/[^a-zA-Z]+/) ? N['info']['flags']['map_address']['city'] : '';
		countryCode = 'country_code' in N['info']['flags']['map_address'] && N['info']['flags']['map_address']['country_code'].search(/[^a-zA-Z]+/) ? N['info']['flags']['map_address']['country_code'].toLowerCase() : '';
		state = 'state' in N['info']['flags']['map_address'] && N['info']['flags']['map_address']['state'].search(/[^a-zA-Z]+/)	? N['info']['flags']['map_address']['state'] : '';

		$.ajax({
			url:"[[images]]flags/"+countryCode+".png",
			success: function(){
				$("#flag_src").attr('src', '[[images]]flags/'+countryCode+'.png');
			},
			error: function(){
				$("#flag_src").attr('src', '[[images]]flags/no-flag.png');
			}			
		 });
		 
		$(".server-location").attr("tooltip", `<span class="d-block city">${capitalize_Words(city)}</span><span class="state">${capitalize_Words(state)}</span>`);
	}

	if(!city && !state){
		$(".server-location").attr("tooltip", countryCode.toUpperCase());
	}

	if(!city && !state && !countryCode){
		$(".server-location").attr("tooltip", '{{vm_no_location}}');
	}
	
	$('#current_hostname').html(N['info']['hostname']);

	if(isError()){
		error(N["error"]);
		return -1;
	}

	$('#suspend_div').html("");
	$('.vm_status').hide();

	if(N['info']['os']['distro_logo'].indexOf('http') == 0){
		$('#vm_distro_logo').attr('src', N['info']['os']['distro_logo']);
	}else{
		$('#vm_distro_logo').attr('src', '[[images]]'+N['info']['os']['distro_logo']);
	}

	var os_name = !empty(N['info']['os']['name']) ? N['info']['os']['name'] : '{{os_other}}';
	$('#vm_distro_logo').attr('title', os_name);

	$('#vps-desc-server_name_box').hide();

	if('server_name' in N['info']){
		$('#vps-desc-server_name').html(N['info']['server_name']);
		$('#vps-desc-server_name_box').show();
	}

	if(!empty(N['info']['flags']['vm_pass'])){
		$('#vps-desc-vm_pass').show();
		$('#vps-desc-vm_pass_show').show();
		$('.pass_common').show();
		$('#vps-vm_pass').html(N['info']['flags']['vm_pass']);
		$('#vm_username').html(N['info']['flags']['vm_username']);
	}else{
		$('#vps-desc-vm_pass').hide();
		$('#vps-desc-vm_pass_show').hide();
		$('.pass_common').hide();
	}

	$('#vps-desc-hostname').html(`${N['info']['hostname']}`);

	$('#vps-desc-ip').html(N['info']['ip'][0]);
	$('#ip_count').hide().removeClass('tooltip');

	if(N['info']['ip_count'] > 1){
		$('#ip_count').html('+'+(N['info']['ip_count'] - 1)).show();
		var ip_list = '';
		for(x in N['info']['ip']){
			if(x == 0) continue;
			ip_list += '<div>'+ N['info']['ip'][x] + '</div>';
		}

		$('#ip_count').attr('tooltip', ip_list);
	}

	// Update the power options box
	update_power_opts(N['info']['status']);

	if(!empty(N['disable_enduser_vps_poweroff'])){
		$("#poweroffcell").hide();
	}
	
	if(empty(N['info']['flags']['disable_server_location'])){
		$('#location_details').show();
	}

	if(!empty(N['info']['vps']['suspended'])){

		var sus_reason = '{{vm_vps_is_suspended}}';
		if(!empty(N['info']['vps']['suspend_reason'])){
			sus_reason += ' ('+N['info']['vps']['suspend_reason']+')';
		}

		$('#suspend_div').html(sus_reason).show();

		// We will have to hide the other divs if the vps is suspended.
		$('.dashboard-tab, .manage-btns, .statistics').hide();

		dashboard_info_box();
		
		return;
	}

	// Is network of VPS is suspended because of the bandwidth overused?
	if(!empty(N['info']['nw_suspended']) && N['info']['nw_suspended']['reason'] == 'bw'){

		var sus_reason = '{{vm_suspend_reason_bw}}';
		if(!empty(N['info']['unsupend_time_msg'])){
			sus_reason += '<br>'+N['info']['unsupend_time_msg'];
		}
		$('#suspend_div').html(sus_reason);
	}
	
	// Is the VPS in Rescue Mode ?
	if(!empty(N["info"]["vps"]["rescue"])){
		
		$('#suspend_div').html('{{resc_rescue_enabled}}');
	}

	//Update the network status if the vps is online
	if((N['info']['ntw_status'] != undefined) && (N['info']['status'] == 1)){
		//Please check the value for updating the reason of suspension
		$('.vm_status_online').hide();
		$('.vm_status_ntw_suspended').show();
		
	}
	
	if(!empty(N['info']['flags']['show_vps_active_time'])){
		$("#current_status_text").after("<span id='vps_up_time'><i class='fas fa-clock ml-1'></i></span>");
		//$('#vps_up_time').tooltip({ title:''+N['info']['show_vps_active_time']});
	}

	if(!empty(N['info']['flags']['power_only_option']) && !empty(N['info']['vps']['admin_managed'])){
		$('.dashboard-tab').hide();
		$('#vncdetail, #vncpass-cell, #vnc, #ssh, #scaling-cell, #lb, #fw, #changefirewallplanform').hide();
		$("#select_lb_form").html('');
		dashboard_info_box();
		return false;
	}

	$('.dashboard-tab, .statistics, .manage-btns').show();

	dashboard_info_box();

	$('#vpsconfig-cell').hide();

	if(!empty(N['info']['vps']['admin_managed'])){
		$('#settings-tab, #installapps, #scaling-cell').hide();
	}

	if(!empty(N['info']['flags']['hvmsettings']) && empty(N['info']['flags']['disable_vps_config']) && empty(N['info']['vps']['admin_managed'])){
		$('#vpsconfig-cell').show();
	}
	
	// For Advanced option
	$('#vnc, #vncdetail, #vncpass-cell-tab, #lb, #controlpanel, #rescue-mode-cell, #backups-cell, #backups-inc, #manage_subnet, #system_stat, #proc-cell, #services, #alerts-cell, #recipe-mode-cell, #reinstall, #ssh, #ssh-cell, #hostname, #vps-hostname, #changepass, #ips, #self_shutdown-cell, #managevdf-cell, #sshkeys-cell, #scaling-cell, .disable_eu_sshkeys, #fw, #changefirewallplanform').hide();
	$("#select_lb_form").html('');

	var show_install_id = '';
	if(!empty(N['info']['vps']['vnc']) && N['info']['virt'] != 'openvz' && N['info']['virt'] != 'proxo' && empty(N['info']['vps']['admin_managed'])){
		$('#vncdetail, #vncpass-cell-tab, #vnc').show();
	}

	if(N['check_licensepro'] && "load_balancer" in N && !empty(N['load_balancer'])){
		let lb_options = `
		<div class="row mx-auto w-100 my-3">
			<div class="col-sm-12">
				<label>{{select_lb}}</label><br>
				<select name="select_lb" class="virt-select mt-2">
				<option value="0">{{li_none}}</option>
				`;
				$.each(N['load_balancer'], function(k, v){
					lb_options += `<option value="`+k+`">`+v['vpsid']+` - `+v['hostname']+`</option>`;
				})
				lb_options += `
				</select>
			</div>
		</div>
		<div class="row mx-auto w-100 my-3">
			<div class="col-sm-12 text-left">
				<input type="button" value="{{save}}" onclick="lb_assign('select_lb_form')" class="btn btn-primary"/>
			</div>
		</div>`;
		$("#select_lb_form").html(lb_options);
		$("#lb").show();
		showtooltip();
	}

	if(empty(N['info']['flags']['disable_enduser_firewall']) && empty(N['info']['vps']['admin_managed'])){
		$("#fw, #changefirewallplanform").show();
	}else{
		$("#firewall-cell").addClass("!hidden");
	}

	if(empty(N['info']['flags']['enable_rdns']) || !empty(N['info']['vps']['admin_managed'])){
		$('#rdns-cell').addClass("!hidden");
	}

	if(!empty(N['info']['flags']['disable_change_vnc_password'])){
		$("#vncpass-cell-tab").hide();
	}

	// Account information tab
	if(empty(N['info']['flags']['disable_account_information'])){
		$('#account-card').removeClass("!hidden");
	}else{
		$('#account-card').addClass("!hidden");
	}
	
	// HAProxy VPS Domain Forwarding
	if (!empty(N['info']['flags']['haproxy']) && empty(N['info']['vps']['admin_managed']) && empty(N['info']['flags']['disable_domain_forward'])) {
		$('#managevdf-cell').show();
	}

	if(N['info']['virt'] == 'openvz' && empty(N['info']['flags']['disable_backup_cp']) && empty(N['info']['vps']['admin_managed'])){
		$('#backup-cell').show();
	}

	if(!empty(N['info']['flags']['enable_console']) && empty(N['info']['vps']['admin_managed'])){
		$('#console').show();
	}

	// For information block
	if(empty(N['info']['flags']['disable_icons_monitor'])){
		$('#system_stat').show();
	}

	if(!empty(N['info']['flags']['rescue_mode']) && empty(N['info']['vps']['admin_managed'])){
		$('#rescue-mode-cell').show();
	}

	if(empty(N['info']['flags']['disable_recipes']) && empty(N['info']['vps']['admin_managed'])){
		$('#recipe-mode-cell').show();
	}

	if(empty(N['info']['flags']['disable_change_hostname']) && empty(N['info']['vps']['admin_managed'])){
		$('#hostname, #vps-hostname').show();
	}

	if(empty(N['info']['flags']['disable_change_password']) && empty(N['info']['vps']['admin_managed'])){
		$('#changepass').show();
	}

	if (empty(N['info']['flags']['disable_os_reinstall']) && empty(N['info']['vps']['admin_managed'])) {
		$('#reinstall').show();
		if (empty(show_install_id)) {
			show_install_id = 'reinstall-tab';
		}
	}

	if (empty(N['info']['flags']['disable_icons_cp']) && empty(N['info']['vps']['admin_managed'])) {
		$('#controlpanel').show();
		if (empty(show_install_id)) {
			show_install_id = 'control-panel-tab';
		}
	}

	if (!empty(N['info']['flags']['disable_os_reinstall']) && !empty(N['info']['flags']['disable_icons_cp']) && empty(N['info']['vps']['admin_managed'])) {
		show_listrecipes_window()
		if (empty(show_install_id)) {
			show_install_id = 'recipe-mode-cell-tab';
		}
	}

	if (!empty(N['info']['flags']['disable_os_reinstall']) && empty(N['info']['vps']['admin_managed'])) {
		show_cpinstall_window();
	}

	$('#controlpanel').click(function() {
		show_cpinstall_window();
	})

	$('#recipe-mode-cell').click(function() {
		show_listrecipes_window()
	})

	 $('#install_apps').click(function() {
		show_webuzo_window();
	})
	 
	 if (!empty(show_install_id) && empty(N["info"]["disable_power_options"])) {
		$("#" + show_install_id).trigger('click');
	 }

	if((!empty(N['info']['flags']['disable_os_reinstall']) && !empty(N['info']['flags']['disable_icons_cp']) && !empty(N['info']['flags']['disable_recipes'])) || !empty(N['info']['vps']['admin_managed'])){
		$('#os-cell').hide();
	}

	if(empty(N['info']['flags']['disable_ssh']) && empty(N['info']['vps']['admin_managed'])){
		$('#ssh-cell, #ssh').show();
	}

	if(empty(N['info']['flags']['disable_enduser_sshkeys']) && empty(N['info']['vps']['admin_managed'])){
		$('#sshkeys-cell').show();
		$('.disable_eu_sshkeys').show();
	}

	if(!empty(N['info']['flags']['ipv6_subnets']) && empty(N['info']['vps']['admin_managed'])){
		$('#manage_subnet').show();
	}

	if(N['info']['virt'] == 'openvz' || N['info']['virt'] == 'vzo' || N['info']['virt'] == 'vzk' || !empty(N['info']['flags']['services_support'])){
		$('#proc-cell, #services, #alerts-cell').show();
	}
	
	if(!empty(N['info']['vertical_scaling']) && !empty(N['info']['vertical_scaling'][N['info']['virt']]) && empty(N['info']['vps']['admin_managed'])){

		$('#scaling-cell').show();
		if(!empty(N['info']['ver_scaling']['ver_ram_inc_by'])){
			$('#vs_ver_ram_inc_default').parent().show()
			$('#vs_ver_ram_inc_default').html(N['info']['ver_scaling']['ver_ram_inc_by']+" GB");
		}else{
			$('#vs_ver_ram_inc_default').parent().show()
		}

		if(!empty(N['info']['ver_scaling']['ver_cpu_inc_by'])){
			$('#vs_ver_cpu_inc_default').parent().show()
			$('#vs_ver_cpu_inc_default').html(N['info']['ver_scaling']['ver_cpu_inc_by']+" cores");
		}else{
			$('#vs_ver_cpu_inc_default').parent().show()
		}

		if(!empty(N['info']['ver_data']) && N['info']['ver_data']['ver_ram_inc_by']){
			$("#vs_ver_ram_inc_by").val(N['info']['ver_data']['ver_ram_inc_by']);
		}
	
		if(!empty(N['info']['ver_data']) && N['info']['ver_data']['ver_cpu_inc_by']){
			$("#vs_ver_cpu_inc_by").val(N['info']['ver_data']['ver_cpu_inc_by']);
		}
	}

	if(empty(N['info']['vps']['admin_managed']) && N['info']['ip_count'] > 1){
		$('#ips').show();
	}

	if(empty(N['info']['flags']['disable_self_shutdown']) && empty(N['info']['vps']['admin_managed'])){
		$('#self_shutdown-cell').show();
	}

	var hidesidebar = true;
	$('#sidebar_options button').each(function() {
		if ($(this).css('display') !== 'none') {
			hidesidebar = false;
			return false;
		}
	});
    
	if (hidesidebar) {
		$('#sidebar').addClass('hidden');
	} else {
        $('#sidebar').removeClass('hidden');
    }
	
	if(empty(N['info']['flags']['disable_backup_cp']) && !empty(N['info']['flags']['bpid']) && empty(N['info']['vps']['admin_managed'])){
		$('#backups-cell').show();
	}

	if(!empty(N['info']['flags']['has_backuply'])){
		$('#backups-inc').show();
	}

	let nextTab = 'vps-logs-tab';
	if(!empty(N['info']['flags']['disable_logs'])){
		$('#vps-logs-tab').hide();
		$('#vps-logs-tab').parent('.nav-item').hide();
		nextTab = 'status-logs-tab';
	}

	if(!empty(N['info']['hide_eu_tasks'])){

		let onClickFunction = $('#'+nextTab).attr('onclick');
		let showHref = $('#'+nextTab).attr('href');
		
		$('#tasks-tab').closest('li').remove();
		$('#tasks-and-logs').attr('onclick', onClickFunction);
		$('#'+nextTab).addClass('active');
		$('#'+nextTab).attr('aria-selected','true');
		$('#tasks').removeClass('show active');
		$(showHref).addClass('show active');

	}
	
	if(!empty(N['info']['flags']['disable_change_primary_ip'])){
		$('#ips').hide();
	}

	// Server load chart on the right
	function ServerLoadCharts() {

		var totalPoints = 30;
		var cpudata = [];
		var total_speed = [];
		var down_speed = [];
		var up_speed = [];
		var totalPoints = 30;
		
		// CPU intialization
		for (var i = 0; i < totalPoints; ++i) {
			cpudata.push(0);
		}

		// Network Limit Initializtion
		for (var i = 0; i < totalPoints; ++i) {
			total_speed.push(0);
			down_speed.push(0);
			up_speed.push(0);
		}

		var total_speed_data = makedata(total_speed);
		var down_speed_data = makedata(down_speed);
		var up_speed_data = makedata(up_speed);

		var netspeed_graph = [
			{ name: "{{total_speed}}",	data: total_speed_data},
			{ name: "{{download}}",	data: down_speed_data},
			{ name: "{{upload}}",	data: up_speed_data}
		];

		// CPU graph options 
		var cpu_options = {
			series: [{
				name: '{{cpu}}',
				data: makedata(cpudata)
			}],
			chart: {
				type: "area",
				height: '250',
				toolbar: false,
				offsetX: -10,
			},
			title: {
				text: '{{cpu}}',
				align: 'left',
				style: {
					fontSize:  '14px',
					fontWeight:  '600',
					fontFamily:  'inter',
					color:  '#1F262D'
				  }
			},
			subtitle:{
				text: '0%',
				align: 'right',
				offsetX: -15,
				style: {
					fontSize:  '12px',
					fontWeight:  'medium',
					fontFamily:  'inter',
					color:  '#1F262D'
				  },
				floating: true,
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				borderColor: gridBorderColor,
			},
			stroke: {
				curve: 'smooth',
				width: 1,
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0,
					stops: [30, 99, 100]
				},
				colors: ["#93AAFD", ],
			},
			colors: ["#2D5BFF", ],
			xaxis: {
				labels:{
					show: false,
				},
				axisTicks: {
					show: false,
				}
			},
			yaxis: {
				decimalsInFloat: 2,
				labels: {
					formatter: function(val){
						return val.toFixed(2) + " %";
					}
				}

			},
			legend: {
				position: 'top',
				horizontalAlign: 'left'
			},
		};

		//Network graph options
		var networkInfoChartOptions = {
			series: netspeed_graph,
			chart: {
				type: "area",
				height: '250',
				toolbar: false,
				offsetX: -10,
			},
			title: {
				text: '{{band_network_speed}}',
				align: 'left',
				style: {
					fontSize:  '14px',
					fontWeight:  '600',
					fontFamily:  'inter',
					color:  '#1F262D'
				  }
			},
			subtitle:{
				text: '0MB/s',
				align: 'right',
				offsetX: -15,
				style: {
					fontSize:  '12px',
					fontWeight:  'medium',
					fontFamily:  'inter',
					color:  '#1F262D'
				  },
				floating: true,
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				borderColor: gridBorderColor,
			},
			stroke: {
				curve: 'smooth',
				width: 1,
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0,
					stops: [30, 99, 100]
				},
				colors: ["#93AAFD", "#00C88F70", "#fe9800b1"],
			},
			colors: ["#2D5BFF", "#00C88F", "#FE9900"],
			xaxis: {
				axisTicks: {
					show: false,
				},
				labels: {
					show: false,
				}
			},
			yaxis: {
				decimalsInFloat: 2,
				labels: {
					formatter: function(val){

						if(val > 1024 && parseInt(val/1024) < 1024){
							return parseFloat(val / 1024).toFixed(1) + " KB/s";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " MB/s";
						}else{
							return val + " B/S";
						}
					},
				},
			},
			legend: {
				position: 'bottom',
				horizontalAlign: 'center',
				floating: true,
			},
		};

		show_monitor_window();
		show_bandwidth_window();

		let cpu_graph_object = network_graph_object =  {};

		cpu_graph_object = live_resource_graph("", "cpu_hist", cpu_options);

		network_graph_object = live_resource_graph("", "network_speed_holder1", networkInfoChartOptions);

		// Update the CPU / Disk / Inodes graph
		function overview_graph_update(){

			clearTimeout(timer_server_loads);

			var svs = getParameterByName('svs', 1);

			$.getJSON('[[API]]act=vpsmanage&stats=1&svs=' + svs, function(data, textStatus, jqXHR) {

				// Are we still visible
				// if(!$("#cpu_hist").is(":visible")){
				// 	return false;
				// }

				var cpu = data['info']['cpu'];
				var disk = data['info']['disk'];
				var bandwidth = data['info']['bandwidth'];
				var speed_data = data['info']['netspeed'];
				let current_download_speed = (!empty(speed_data["download"]) ? speed_data["download"]/1024/1024 : 0);
				current_download_speed = current_download_speed.toFixed(2);
				
				// Slice the top
				cpudata = cpudata.slice(1);
				total_speed = total_speed.slice(1);
				down_speed = down_speed.slice(1);
				up_speed = up_speed.slice(1);

				// Add the new data
				cpudata.push(parseFloat(cpu['percent']).toFixed(2));
				total_speed.push((speed_data["speed"]));
				down_speed.push((speed_data["download"]));
				up_speed.push((speed_data["upload"]));
				
				total_speed_data = makedata(total_speed);
				down_speed_data = makedata(down_speed);
				up_speed_data = makedata(up_speed);

				current_cpu_data = [{
					data : makedata(cpudata)
				}];

				update_cpu_option_and_data = {
					series: current_cpu_data,
					subtitle: {
						text: parseFloat(cpu['percent'])+" %",
					}
				};

				netspeed_graph_data = [
					{ data: total_speed_data},
					{ data: down_speed_data},
					{ data: up_speed_data}
				];

				update_network_option_and_data = {
					series: netspeed_graph_data,
					subtitle: {
						text: current_download_speed + " MB/s"
					}
				};

				// Update the Disk usage
				$('#disk_percent_bar').css('background', (disk['percent'] <= 40 ? '#06d79c' : disk['percent'] < 80 ? 'orange' :	disk['percent'] >= 80 ? 'red' : '#ff0000'));
				$('#disk_percent_bar').attr('data-progress', disk['percent']);
				$('#disk_percent_bar').html(`${disk['percent']} %`);
				$('#disk_percent_val').html(`${disk['used_gb']} / ${disk['limit_gb']} {{li_band_gb}}`);

				document.querySelectorAll('#disk_percent_bar').forEach(function(fill){
					reloadProgressBar(fill);
				});
				
				if(empty(bandwidth['limit_gb'])){
					bandwidth['limit_gb'] = '<i class=\'fas fa-infinity\'></i>';
				}
				// Update the Bandwidth Usage
				$('#bandwidth_percent_bar').css('background', (bandwidth['percent'] <= 40 ? '#06d79c' : bandwidth['percent'] < 80 ? 'orange' :	bandwidth['percent'] >= 80 ? 'red' : '#ff0000'));
				$('#bandwidth_percent_bar').attr('data-progress', bandwidth['percent']);
				$('#bandwidth_percent_bar').html(`${bandwidth['percent']} %`);
				$('#bandwidth_percent_val').html(`${bandwidth['used_gb']} / ${bandwidth['limit_gb']} {{li_band_gb}}`);

				// Bandwidth Info bars (IN, OUT, TOTAL)
				var bw_total_bar = bw_in_percent = bw_out_percent = 0;

				bw_total_bar = bandwidth['total_in'] + bandwidth['total_out'];
				if(bandwidth['total_out'] > 0){
					bw_out_percent = parseFloat(((bandwidth['total_out']*100)/bw_total_bar)).toFixed(2);
				}

				if(bandwidth['total_in'] > 0){
					bw_in_percent = parseFloat(((bandwidth['total_in']*100)/bw_total_bar)).toFixed(2);
				}
				
				$('#bw_out_bar').attr('data-progress', bw_out_percent);
				$('#bw_in_bar').attr('data-progress', bw_in_percent);
				$('#bw_out_bar').html(bw_out_percent+ '%');
				$('#bw_in_bar').html(bw_in_percent+ '%');

				document.querySelectorAll('#bandwidth_percent_bar, #bw_out_bar, #bw_in_bar').forEach(function(fill){
					reloadProgressBar(fill);
				});

				// Update CPU and Network Speed graph
				cpu_graph_object = live_resource_graph(cpu_graph_object, "",{},{},update_cpu_option_and_data);

				network_graph_object = live_resource_graph(network_graph_object, "",{}, {}, update_network_option_and_data);

				$('#cpu_hist > .apexcharts-canvas, #network_speed_holder1 > .apexcharts-canvas').after(`
				<span class="flex absolute items-center justify-center h-3 w-3 top-8 right-4">
				<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 dark:bg-orange-400 opacity-75"></span>
				<span class="rounded-full h-2 w-2 bg-green-500 dark:bg-orange-500"></span>
			</span>`);

				timer_server_loads = setTimeout(overview_graph_update, 10000);

			});
		};
		
		overview_graph_update();
		
	};

	var svs = N['info']['vpsid'];

	// If it is not susupended and svs is there then only we will show the graphs
	if(!empty(svs)){

		/* Network speed initialize starts */
		 ServerLoadCharts();
	}

	// If server_location is empty then show flag, country and state
	if(!empty(N['info']['flags']['disable_server_location'])){

		$('#location_details').hide();
		$('.vps-info-box').removeClass('col-lg-3');
		$('.vps-info-box').addClass('col-lg-4');
	}
	// Need to add but commented for now
	//cdrom_bootorder();
	// Are we to disable control options ?
	if(!empty(N["info"]["disable_power_options"])){

		$('#suspend_div').html('<div class="notice">'+ N["info"]["disable_power_options"] +(empty(N["info"]["manual_locked"]) ? '&nbsp;<i class="fas fa-info-circle" tooltip="{{automated_lock_notice}}"></i>' : '') + '</div>');
		$('.dashboard-tab, .statistics, .manage-btns').hide();
		
		showtooltip();

		dashboard_info_box();
		
		// Update the power options as they are in suspended state
		update_power_opts(2);

		return;		
	}

};

function ver_submitresponse(res){
	if(!empty(res['ver_done'])){
		success_alert(res['ver_done']);
	}
}

function vpsmanage_onshow(){

	var no_webuzo = ['vzo','proxo','lxc','proxl'];
	if(!("disable_webuzo" in N) && empty(N['info']['vps']['admin_managed']) && !no_webuzo.includes(N['info']['vps']['virt'])){
		$('#install_apps').removeClass("!hidden");
	}else{
		$('#install_apps').addClass("!hidden");
	}

	$('#lmapps').show();
	// Check if call is for webuzo
	var param = getParameterByName('webuzo', 1);
	if(param){
		show_webuzo_window();
	}
  $('.floating-button').show();
};

function jqueryvpsboot(todo, id, vpsid){

	Loading(1); // Hide the loading text
	
	// If there is no vpsid passed we assume the function is called from managevps page
	vpsid = vpsid || N['info']['vpsid'];
	
	var id = id || 0;
	var currentStateImage = null;
	var og_content = $('#'+id).html();

	$('#'+id).html("");
	$('#'+id).html('<i class="fas fa-spinner fa-spin text-blue-500"></i>');

	var url = '[[API]]svs='+vpsid+'&act='+todo+'&do=1';

	$.getJSON(url, function(data, textStatus, jqXHR) {

		$('#'+id).html(og_content);
		
		if(act == 'listvs'){
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

		refresh_page();

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

};

function show_ver_scaleform(){
	$('#ver-scalform').attr('action', 'act=vpsmanage&svs='+N['vpsid']);
}

function show_changepassform(){

	let vm_os_name = $('#vm_distro_logo').attr('title');
	// We must reset the form
	$_("changepass-form").reset();
	$('#changepass-form').attr('action', 'act=changepassword&svs='+N['vpsid']);
	$("#win_user_row").remove();
	let elem = '<div id="win_user_row"> \
					<input type="text" id="vm_admin_name_pass" name="vm_admin_name" placeholder="{{vm_admin_name}}" autocomplete="on" class="text-sm border border-[#ECEFF3] dark:border-[#23283F] bg-white dark:bg-[#15172B] rounded-lg p-3 w-full outline-none"/> \
				</div> \
				</div>';
	$('#changepass-form').prepend(elem);
	if(!empty(vm_os_name.match(/windows/gi))){
		$("#vm_admin_name_pass").val('Administrator');
	}else{
		$("#vm_admin_name_pass").val('root');
	}
	showtooltip();
};

function show_ipform(){

	$_('ips-form').reset();

	// Show the user list
	var ip_list = '';
	for(x in N['info']['ip']){

		if(N['info']['ip'][x].includes('/')){
			continue;
		}

		ip_list += '<option value="'+ N['info']['ip'][x] +'">'+ N['info']['ip'][x] + '</option>';
	}
	$("#vm_ips_select").html(ip_list);
	$("#vm_ips_select").select2({width:"100%"});
	$('#ips-form').attr('action', 'act=ips&svs='+N['vpsid']);
};

function show_enable_accl(){
	
	if($("#hvm_enable_vga").prop('checked') == true){
		$("#hvm_enable_acceleration_tr").css("display", "");
		$('#hvm_enable_acceleration_tr').addClass('animate');
	}else{
		$("#hvm_enable_acceleration_tr").css("display", "none");
		$("#hvm_enable_acceleration_tr").removeAttr('checked');
	}
}

function show_hvm_vnc_keymap(){
	
	if($("#hvm_vnc").prop('checked') == true){
		$("#hvm_vnc_keymap_tr").css("display", "");
		$("#hvm_vnc_keymap_tr").addClass('animate');
	}else{
		$("#hvm_vnc_keymap_tr").prop("selected", null);
		$("#hvm_vnc_keymap_tr").css("display", "none");
	}
}

function show_hvmsetting_window(){
	
	$('#hvmsettingsform')[0].reset();	
	//$("#hvmsettings_submit").hide();
	$('#tuntap_enable_tr, #ppp_enable_tr , #acpi_tr, #apic_tr, #vnc_tr, #hvm_vnc_keymap_tr, #hvm_vga_tr, #hvm_enable_acceleration_tr, #hvm_sec_iso_tr, #hvm_nic_type_tr, #boot_reorder_pos_tr, #hvm_isos_tr, #hvm_virtio_tr, #hvm_fuse_tr, #hvm_ipip_tr, #hvm_ipgre_tr, #hvm_nfs_tr, #hvm_quotaugidlimit_tr, #hvm_iolimit_tr, #hvm_iopslimit_tr, .eu_iso, #hvm_timezone_tr, #container_settings').addClass('!hidden');
	$('#hvmsettingsform').attr('action', 'act=hvmsettings&svs='+N['vpsid']);
	$('#tuntap_enable, #ppp_enable, #acpi_tr, #apic_tr, #vnc_tr').prop('checked', false);

	AJAX('[[API]]act=hvmsettings&svs='+N['vpsid'], function(data) {

		data['vps']['timezone'] = (!empty(data['vps']['timezone']) ? data['vps']['timezone'] : data['preferences']['default_enduser_timezone']);

		$('#hvm_timezone_tr').removeClass('!hidden');
		option_timezones = '<option value="0">{{no_timezone}}</option>';
		$.each(data['timezones'], function(region, list){
			option_timezones += '<optgroup label="'+region+'">'+"\n";
			$.each(list, function(key, value) {
				option_timezones += '<option value="'+ key +'" ' + (data['vps']['timezone'] == key ? 'selected' : '') + '>'+ value +'</option>';
			});
			option_timezones += '</optgroup>'+"\n";
			
		});
		$("#hvm_timezone").html(option_timezones);
		$('#hvm_timezone').select2({
			selectOnClose: true
		});
		
		if(data['virt'] == 'openvz' || data['virt'] == 'vzo'){
			$('#container_settings').removeClass('!hidden');
			if(!empty(data['flags']['enable_tuntap_cp'])){
				$('#tuntap_enable_tr').removeClass('!hidden');
				(!empty(data['vps']['tuntap']) ? $('#tuntap_enable').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_ppp_cp'])){
				$('#ppp_enable_tr').removeClass('!hidden');
				(!empty(data['vps']['ppp']) ? $('#ppp_enable').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_fuse_cp'])){
				$('#hvm_fuse_tr').removeClass('!hidden');
				(!empty(data['vps']['openvz_features']['fuse']) ? $('#hvm_fuse').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_ipip_cp'])){
				$('#hvm_ipip_tr').removeClass('!hidden');
				(!empty(data['vps']['openvz_features']['ipip']) ? $('#hvm_ipip').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_ipgre_cp'])){
				$('#hvm_ipgre_tr').removeClass('!hidden');
				(!empty(data['vps']['openvz_features']['ipgre']) ? $('#hvm_ipgre').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_nfs_cp'])){
				$('#hvm_nfs_tr').removeClass('!hidden');
				(!empty(data['vps']['openvz_features']['nfs']) ? $('#hvm_nfs').prop('checked', true) : '');
			}

			if(!empty(data['flags']['enable_quotaugidlimit_cp'])){
				$('#hvm_quotaugidlimit_tr').removeClass('!hidden');
				$('#hvm_quotaugidlimit').val(data['vps']['openvz_features']['quotaugidlimit']);
			}

			if(!empty(data['flags']['enable_iolimit_cp'])){
				$('#hvm_iolimit_tr').removeClass('!hidden');
				$('#hvm_iolimit').val(data['vps']['openvz_features']['iolimit']);
			}

			if(!empty(data['flags']['enable_iopslimit_cp'])){
				$('#hvm_iopslimit_tr').removeClass('!hidden');
				$('#hvm_iopslimit').val(data['vps']['openvz_features']['iopslimit']);
			}

		}else{
			
			if(!empty(data['flags']['enable_enduser_vnc'])){
			
				$('#vnc_tr').removeClass('!hidden');
				
				if(!empty(data['vps']['vnc'])){
					$('#hvm_vnc').prop('checked', true); 
					$('#hvm_vnc_keymap_tr').removeClass('!hidden');
				}
	
				$('#hvm_vnc').change(show_hvm_vnc_keymap);
				
				var vnc_keymap_list = '';
				
				for(x in data['vnckeymaps']){
				
					vnc_keymap_list += '<option value="'+ data['vnckeymaps'][x] +'" '+ (data['vnckeymaps'][x] == data['vps']['vnc_keymap'] ? 'selected="selected"' : '') +' >' +data['vnckeymaps'][x] +'</option>';
				}
				$("#hvm_vnc_keymap").html(vnc_keymap_list);
	
			}
				
			if(data['virt'] == 'kvm' || ((data['virt'] == 'xen' || data['virt'] == 'xcp') && data['vps']['hvm'] == 1)){
				
				$('#acpi_tr').removeClass('!hidden');
				$('#apic_tr').removeClass('!hidden');
				
				(data['vps']['acpi'] == 1 ? $('#acpi').prop('checked', true) : '');
				(data['vps']['apic'] == 1 ? $('#apic').prop('checked', true) : '');
				
				if(data['virt'] == 'kvm'){
					if(empty(data['flags']['disable_vga'])) {
						$('#hvm_vga_tr').removeClass('!hidden');
						
						if(!empty(data['vps']['kvm_vga'])){
							$('#hvm_enable_vga').attr('checked','checked');
							$('#hvm_enable_acceleration_tr').removeClass('!hidden');
							(!empty(data['vps']['acceleration']) ? $('#hvm_enable_acceleration').attr('checked','checked') : $('#hvm_enable_acceleration').removeAttr('checked'));
						}else{
							$('#hvm_enable_vga').removeAttr('checked');
							$('#hvm_enable_acceleration').removeAttr('checked');
						}
						
						$('#hvm_enable_vga').change(show_enable_accl);
					}
					
					if(!empty(data['flags']['eu_allow_virtio'])){
						
						$('#hvm_virtio_tr').removeClass('!hidden');
						
						if(!empty(data['vps']['virtio'])){
							$('#hvm_enable_virtio').attr('checked','checked');
						}else{
							$('#hvm_enable_virtio').removeAttr('checked');
						}
					}
				}
			}

			if(data['flags']['iso_support']){
				
				if(!empty(data['flags']['enable_eu_iso'])){
					$('.eu_iso').removeClass('!hidden');
				}
				
				if('boot' in data){						
					$('#boot_reorder_pos_tr').removeClass('!hidden');
					var order = '';
					var boot_list_old = '<select name="boot" class="bg mr-2 w-40">';
					var boot_list_new = '<div class="flex items-center"><select name="boot" id="boot" class="bg mr-2 w-40" size="4">';
					var i = 0;
					let new_boot = 0;
			
					for(x in data['boot']){		
						
						if(x.match(/boot_order/gi)){
							let hidden_value = '';
							for(element in data['boot'][x]){
								belement = data['boot'][x][element];
								boot_list_new += '<option value="'+belement+'" id="boot_'+belement+'">'+belement.toUpperCase()+'</option>';	
								hidden_value += belement + ',';
							}
							
							new_boot = 1;
							document.getElementById("boot_ord_val").value = hidden_value;

						}else{

							if(x == 'c'){
								data['boot'][x] = '1) Hard Disk 2) CD Drive';
								order = 'cd';							
							}else if(x == 'd'){
								data['boot'][x] = '1) CD Drive 2) Hard Disk';
								order = 'dc';
							}
							
							if(empty(i)){
								boot_list_old += '<option value="'+order+'" id="boot_'+x+'" selected="selected">'+data['boot'][x]+'</option>';	
							}else{
								boot_list_old += '<option value="'+order+'" id="boot_'+x+'">'+data['boot'][x]+'</option>';
							}

						}

						i++;
					}

					if(new_boot){
						boot_list_new += '</select>\
									<div class="inset-y-0 right-0 flex items-center flex-col gap-2">\
										<button type="button" id="up" onclick="change_bootorder(this)" class="btn p-2">\
											<i class="fas fa-arrow-up"></i>\
										</button>\
										<button type="button" id="down" onclick="change_bootorder(this)" class="btn p-2">\
											<i class="fas fa-arrow-down"></i>\
										</button>\
									</div>'
						
						$("#boot_reorder_pos").html(boot_list_new);
					}else{
						boot_list_old += '</select>';
						$("#boot_reorder_pos").html(boot_list_old);
					}
				}
				
				if('isos' in data){
					
					$('#hvm_isos_tr').removeClass('!hidden');
					var iso_list = '<option value="0">{{hvm_none}}</option>';
					var options_eu_iso = options_iso = '';
					for(x in data['isos']){
						if(!(data['isos'][x]['size'])) continue;
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
					
					$('#hvm_isos').html(iso_list);
					
					if(data['flags']['sec_iso_support']){
						options_eu_iso = options_iso = iso_list = '';
						iso_list = '<option value="0">{{hvm_none}}</option>';
						for(x in data['isos']){
							if(!(data['isos'][x]['size'])) continue;
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
						$('#hvm_sec_iso_tr').removeClass('!hidden');
						$('#hvm_sec_iso').html(iso_list);
					}

					$("#hvm_isos, #hvm_sec_iso").select2({
						width: '78%'
					});
				}
			}
			if(data['virt'] == 'proxk'){
				var ostype = '';
				var rtc = '';
				
				if(!empty(data['flags']['os_type'])){					
 					$.each(data['flags']['os_type'], function(k , v){
						ostype += '<option value="'+ k +'" '+((k == data['vps']['data']['os_type']) ? 'selected' : '')+' >'+v +'</option>'; 
					});
					$("#os_type").html(ostype);
					$('#os_type_tr').removeClass('!hidden'); 
				}
				rtc += '<option value="0" '+((data['vps']['data']['rtc'] == '0') ? 'selected' : '')+' > Disable </option>';
				rtc += '<option value="1" '+((data['vps']['data']['rtc'] == '1') ? 'selected' : '')+' > Enable </option>';

				$("#rtc").html(rtc);
				$('#rtc_tr').removeClass('!hidden');
			}
			
			if(!empty(data['flags']['nic_support']) && !empty(data['flags']['enable_nic'])){
				var nic_type_list = '';
				for(x in data['nictypes']){
					nic_type_list += '<option value="'+ x +'" '+((x == data['vps']['nic_type'])?'selected':'')+' >'+data['nictypes'][x]+'</option>';
				}
				$("#hvm_nic_type").html(nic_type_list);
				$('#hvm_nic_type_tr').removeClass('!hidden');
			}
		}
	});
	
};

function hvm_sumbit_response(data){
	if(empty(data['error'])){
		loadpage('act=vpsmanage&svs='+N['info']['vps']['vpsid']);
	}
}

// Show the profile
function profile_onload(){
	
	if(!empty(N['hide_acc_password'])){
		$('#account-password-tab').hide();
	}else{
		$('#account-password-tab').show();
	}

	populateCountries("country");
	populateStates("country", "state");
	
	if(!empty(N["preferences"]["country"])){
		if($("#country option[value='"+N["preferences"]["country"]+"']").length > 0){
			$("#country").val(N["preferences"]["country"]).trigger('change');
		}else{
			var select = $("#country").html();
			select = select+'<option value="'+N["preferences"]["country"]+'">'+N["preferences"]["country"]+'</option>';
			$("#country").html(select);
			$("#country").val(N["preferences"]["country"]).trigger('change');
		}
	}
	
	if(!empty(N["preferences"]["state"])){
		populateStates("country", "state");
		if($("#state option[value='"+N["preferences"]["state"]+"']").length == 0){
			var select = $("#state").html();
			select = select+'<option value="'+N["preferences"]["state"]+'">'+N["preferences"]["state"]+'</option>';
			$("#state").html(select);
			$("#state").val(N["preferences"]["state"]).trigger('change');
		}
	}
	
	// Parse the variables
	parseVars("profile", N["preferences"]);
	
};

function show_states(id){
	
	//alert($("#country").val())
	if(id == "select" && $("#country").val() == -1){
		alert("{{err_select_country}}")
		return;
	}
	populateStates("country", "state");
};

function show_ssh_window(window){

	var id = '#show_ssh';

	if(window == 1){
		$("#show_ssh_window").modal("show");
		id = '#show_ssh_modal';
	}

	$(id).html('<center><applet code="com.jcraft.jcterm.JCTermApplet.class" archive="jcterm-0.0.10.jar?'+ Math.floor((Math.random() * 1000) + 1) +',jsch-0.1.46.jar?'+ Math.floor((Math.random() * 1000) + 1) +',jzlib-1.1.1.jar?'+ Math.floor((Math.random() * 1000) + 1) +'" codebase="[[theme]]/java/jcterm/" width="650" height="440"><param name="jcterm.font_size"	value="13"><!-- <param name="jcterm.fg_bg" value="#000000:#ffffff,#ffffff:#000000,#00ff00:#000000"> --> <!-- <param name="jcterm.config.repository" value="com.jcraft.jcterm.ConfigurationRepositoryFS"> --> <param name="jcterm.destinations" value="root@'+ N['info']['ip'][0] +'"> </applet> </center><br /><p class="notice">{{vm_ssh_notice}}</p>');

};

function show_sshkeys_window() {
	var badge = `<div class="w-full M-2">
					<div class="bg-dark-gray p-2 os_badge use_sshkey media flex">
						<div class="mr-4">
						<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="h-8 inline" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" viewBox="0 0 2457 1890" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"> <defs> <style type="text/css"> <![CDATA[ .str0 {stroke:#0075FF;stroke-width:124.03;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256} .str3 {stroke:#0075FF;stroke-width:135.84;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256} .str1 {stroke:#0075FF;stroke-width:129.94;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256} .str2 {stroke:#0075FF;stroke-width:76.78;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:22.9256} .fil0 {fill:none} ]]> </style> </defs> <g id="Layer_x0020_1"> <metadata id="CorelCorpID_0Corel-Layer"/> <line class="fil0 str0" x1="2354.79" y1="1561.45" x2="2108.76" y2= "1561.45" /> <line class="fil0 str0" x1="2273.54" y1="1740.18" x2="2108.76" y2= "1740.18" /> <path class="fil0 str0" d="M2108.76 1020.89c0,241.77 0,412.2 0,532.07 0,245.6 0,279.03 0,279.03"/> <path class="fil0 str1" d="M2108.76 445.38c158.92,0 287.75,128.83 287.75,287.76 0,158.92 -128.83,287.75 -287.75,287.75 -158.93,0 -287.76,-128.83 -287.76,-287.75 0,-158.93 128.83,-287.76 287.76,-287.76z"/> <line class="fil0 str2" x1="599.29" y1="1223.67" x2="1109.53" y2= "1223.67" /> <line class="fil0 str2" x1="383.76" y1="1088.83" x2="986.6" y2= "732.41" /> <line class="fil0 str2" x1="383.76" y1="367.18" x2="986.6" y2= "723.61" /> <path class="fil0 str3" d="M1828.56 1562.28l-1703.5 0c-36.15,0 -65.74,-29.58 -65.74,-65.73l0 -1371.69c0,-36.15 29.58,-65.73 65.74,-65.73l2153.72 0c36.15,0 65.74,29.58 65.74,65.73l0 125.77"/> </g> </svg>
						</div>
						<span class="key_name"></span>
					</div>
					<input type="hidden" name="ssh_keys[]" value="" disabled="true" />
				</div>`;
	
	$('#sshkeysform').attr('action', 'act=sshkeys&svs='+N['vpsid']);
	
	$('#sshkey_list').empty();
	
	$('#sshkeysform .blue_btn').hide();
				
	AJAX('[[API]]act=sshkeys&svs='+N['vpsid'], function(data) {

		if(empty(data['ssh_keys'])) {
			$('#sshkey_list').removeClass('row');
			$('#sshkey_list').html('<div class="notice col-span-3 w-full">{{sshkey_no_keys_acct}}</div>');
			return false;
		}
		
		$('#sshkeysform .blue_btn').show();
		
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

		set_ssh_keys_table(data['ssh_keys']);
		
	});
	
};

function show_vnc_window(window){
	
	if(empty(N['info']['vps']['vnc'])){
		error_alert("{{vnc_not_enabled}}");
		return false;
	}

	vncip = '#vncip';
	vncport = '#vncport';
	vnc_button_id = '#vnc_buttons';

	if(window == 1){
		toggleModal('show_vnc_window');
		vncip = '#modal_vncip';
		vncport = '#modal_vncport';
		vnc_button_id = '#modal_vnc_buttons';
	}
	
	if(!empty(N['info']['flags']['disable_change_vnc_password'])){
		$('#vncpassform').html('');
	} else{
		$('#vncpassform').attr('action', 'act=vncpass&jsnohf=1&svs='+N['vpsid']);
	}
	
	AJAX('[[API]]act=vnc&svs='+N['vpsid'], function(data) {
		
		if(empty(N['info']['flags']['hide_enduser_vnc_info'])){
			$('.modal-vnc-info, .vnc-info').show();
			$(vncip).html(data['info']['ip']);
			$(vncport).html(data['info']['port']);
		}
		
		var vnc_buttons = '';

		if('novnc' in data['info']){
			vnc_buttons += '<div class="align-bottom"><a href="javascript:void(0);" onclick="launchHTML5vnc(\''+N['vpsid']+'\')" class="blue_btn">{{vnc_novnc_button}}</a></div>';
		}
		
		$(vnc_button_id).html(vnc_buttons);
	});
	
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

function show_select_lb_window(){
	$("#select_lb_form").removeAttr('data-vpsid');
	$("#select_lb_form").attr('data-vpsid', N['vpsid'])
}

function show_osreinstall_window(){
	
	// Reset all data
	$('#show_osreinstall_window').hide();
	$('#osreinstallform').attr('action', 'act=ostemplate&jsnohf=1&svs='+N['vpsid']);
	$('#os_list').html('');
	$('#osreinstallform')[0].reset();
	$("#os_reins").hide();
	$("#os_reins").html('');

	// The template for OS select badge
	var os_badge = `
	<div class="relative flex flex-col items-center gap-2 p-3 border border-[#ECEFF3] dark:border-[#23283F] rounded-lg cursor-pointer lg:w-40 md:w-40 w-full dark:bg-[#16192E] active:border-[#0075FFB5] create_os">
		<div class="absolute top-1 right-1 bg-[#EBF4FF] p-1.5 rounded-full hidden">
			<svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
				<path d="M8 1L3.1875 6L1 3.72727" stroke="#0075FF" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
		<img src="" class="distro_img"/>
		<div class="w-full flex flex-col items-center">
			<h3 class="text-[#1F212D] dark:text-[#989CAE] font-semibold mb-2 distro_name"></h3>
			<select class="text-[#989CAE] dark:text-[#666D80] text-sm border border-[#ECEFF3] dark:border-[#23283F] bg-white dark:bg-[#15172B] rounded-lg p-2 w-full outline-none version">
				<option value="-1">{{os_select_version}}</option>
			</select>
			<div class="os_badge_list dropdown-menu w-100"></div>
		</div>
	</div>
	`;

	AJAX('[[API]]act=ostemplate&svs='+N['vpsid'], function(data) {

		var vpsvirt = data['virt'];
		var oslist = data['oslist'][vpsvirt];
		var distros = data['distros'];
		var format_primary = data['info']['flags']['os_format_primary'];
		var show_oses = 0;
		var os_reins = data['info']['flags']['os_reins'];
		
		if(!empty(os_reins)){
			$("#os_reins").show();
			$("#os_reins").html(os_reins);
		}
		
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

		$('#os_list').html("");

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
				for(os in oslist[x]) {
					$os_select.find('.version').append('<option value="'+os+'">'+oslist[x][os]['name']+'</option>');
				}
				$('#os_list').append($os_select);
			}
		}

		os_badges('os_list', 'newos');
		
		$("#rebuild_custom_ssh_div").hide();
		var opt = '<option value="0">{{proc_select}}</option>\
					<option value="-1">{{add_ssh_key}}</option>';
		if(!empty(data['info']['ssh_keys'])){
			$.each(data['info']['ssh_keys'], function(k, v){
				opt+='<option value="'+k+'">'+v['name']+'</option>';
			})
		}
		
		$("#rebuild_sshkey_dropdown").html(opt);

		$("#rebuild_sshkey_dropdown").on('change', function(){
			$("#rebuild_custom_ssh_div").hide();
			if($(this).val() == -1){
				$("#rebuild_custom_ssh_div").show();
			}
		})

	});
	
	var events = $._data($('#osreinstallform')[0], 'events');
	
	if(empty(events)){
		
		$('#osreinstallform').submit(function(){

			modalConfirm(function(confirm){
				if(confirm){
					showspinner();
			
					return submitit('osreinstallform', 'osreinstallresp');
				}else{
					return false;
				}
			},'{{os_rebuild_data_lost_warn}}');

			return false;
			
		});
	}
};

function osreinstallresp(data){
	//Hide the progress bar
	$("#show_osreinstall_window .scrollbar-virt").show();
};

function showspinner(){
	$('#show_osreinstall_window .scrollbar-virt').hide();
};

function show_cpinstall_window(){

	$panels_avail = N['available'];

	$panels = ['cpanel', 'webuzo', 'plesk', 'interworx', 'webmin', 'ispconfig', 'cwp', 'vesta'];

	$('#installcp').attr('action', 'act=controlpanel&jsnohf=1&svs=' + N['vpsid']);
	
	if(count($panels_avail) == 0){
		$('.cp_notice').show();

		if(N['info']['nojson']){
			$('.cp_notice').text('{{cpan_no_file}}');
		}
		return true;
	}
	
	$.each($panels_avail, function(i, v) {
		$('#'+v).show();
	});
	
};

function basename(str){
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
   return base;
}

function backuply_delete_bkup(bkid){

	modalConfirm(function(confirm){

		if(!confirm){
			return false;
		}

		Loading(1);
		$.ajax({
			type: "POST",
			url: "[[API]]act=backup2&svs=" + N['vpsid'] + "&api=json&backuply_delete=1",
			dataType : "json",
			data: { "bkid" : bkid },
			success:function(res){
				Loading(0);
				handleResponseData(res);
				show_backup2_window();
			}
		});

	}, '{{bkup2_conf_delete}}');	
}

function backuply_restore_bkup(bkid){

	modalConfirm(function(confirm){
		
		if(!confirm){
			return false;
		}

		Loading(1);

		$.ajax({
			type: "POST",
			url: "[[API]]act=backup2&svs=" + N['vpsid'] + "&api=json&backuply_restore=1",
			dataType : "json",
			data: { "bkid" : bkid },
			success:function(res){
				Loading(0);
				handleResponseData(res);
				setTimeout(refresh_page, 10000);
			}
		});

	}, '{{bkup2_conf_restore}}');
	
}

function backuply_backup(){

	var data = new Object();
	data['take_full_backup'] = ($("#take_full_backup").prop('checked') == true ? 1 : 0);
	Loading(1);
	$.ajax({
		type: "POST",
		url: "[[API]]act=backup2&svs=" + N['vpsid'] + "&api=json&backuply_backup=1",
		dataType : "json",
		data: data,
		success:function(res){
			Loading(0);
			handleResponseData(res);
		}
	});

}

function timeConverter(UNIX_timestamp){
	var a = new Date(UNIX_timestamp * 1000);
	return a.toUTCString();
}

function backuply_set_backup(data){
	
	var table = `<table class="table w-full" id="backuply_table_list">
			<thead>
				<tr>
					<th style="width:220px;" data-orderable="false"></th>
					<th>{{bkid}}</th>
					<th>{{files}}</th>
					<th width="3%">{{type}}</th>
					<th>{{size}}</th>
					<th>{{backup_time}}</th>
					<th>{{api_actions}}</th>
				</tr>
			</thead>
			<tbody>`;

	if(!empty(data)){
		$.each(data, (date, files) => {
			var size = parseFloat((files['size']/1024/1024));
			var childrens_count = 1;
			if(!empty(files['children'])){
				childrens_count = Object.keys(files['children']).length + childrens_count;
			}
	
			var formattedTime = timeConverter(date)
			var formated_htime = files['htime'].split('-')
			formated_htime = formated_htime[0].replace(/_/g, '/')+' '+formated_htime[1].replace(/_/g, ':');
			var del_opt = '';
			if(empty(N['eu_hide_bkp_del'])){
				del_opt = `<a href="javascript:void(0);" title={{delete}} onclick="backuply_delete_bkup(`+files['bkid']+`)"><i class="fas fa-trash danger"></i></a>`;
			}
			table += `<tr data-node-id="`+date+`" data-node-pid="`+date+`">
						<td>`+formattedTime+`<span class="badge-blue ml-2">`+childrens_count+`</span></td>
						<td>`+files['bkid']+`</td>
						<td>`+basename(files['filepath'])+`</td>
						<td class="text-center"><span class="badge-blue">full</span></td>
						<td>`+size.toFixed(2)+` MB</td>
						<td>`+formated_htime+`</td>
						<td class="text-center">
							<div class="flex gap-3">
								<a href="javascript:void(0);" title={{restore}} onclick="backuply_restore_bkup(`+files['bkid']+`)"><i class="fas fa-history text-blue-600"></i></a>`+del_opt+`
							</div>
						</td>
					</tr>`;
			if(!empty(files['children'])){
				$.each(files['children'], (k, file) => {
					var size = parseFloat((file['size']/1024/1024));
					var formated_htime = file['htime'].split('-')
					formated_htime = formated_htime[0].replace(/_/g, '/')+' '+formated_htime[1].replace(/_/g, ':');
					var del_opt = '';
					if(empty(N['eu_hide_bkp_del'])){
						del_opt = `<a href="javascript:void(0);" title={{delete}} onclick="backuply_delete_bkup(`+file['bkid']+`)"><i class="fas fa-trash danger"></i></a>`;
					}
					table += `<tr data-node-pid="`+date+`">
								<td>`+formattedTime+`<span class="badge-blue ml-2">`+childrens_count+`</span></td>
								<td>`+file['bkid']+`</td>
								<td class="pl-4">`+basename(file['filepath'])+`</td>
								<td class="text-center"><span class="badge-blue">`+file['type']+`</span></td>
								<td>`+size.toFixed(2)+` MB</td>
								<td>`+formated_htime+`</td>
								<td class="text-center">
									<div class="flex gap-3">
										<a href="javascript:void(0);" title={{restore}} onclick="backuply_restore_bkup('`+file['bkid']+`')"><i class="fas fa-history text-blue-600"></i></a>
										`+del_opt+`
									</div>
								</td>
							</tr>`;
				})
			}
		})

	}
	
	table += `</tbody></table>`;
	$("#backuply_table_div").html(table)
	
	var groupColumn = 0;
	var table_obj = $("#backuply_table_list").DataTable({
		"columnDefs": [
			{ "visible": false, "targets": groupColumn },
			{ "orderable": false, "targets": -1 }
		],
		"order": [[ groupColumn, "desc" ]],
		"displayLength": 25,
		"drawCallback": function ( settings ) {
			let api = this.api();
			var rows = api.rows( {page:"current"} ).nodes();
			var last=null;

			api.column(groupColumn, {page:"current"} ).data().each( function ( group, i ) {
				
				if ( last !== group && !empty(group)) {
					
					$(rows).eq( i ).before(
						"<tr class=\"group\" data-node-id=\""+$(rows).eq( i ).attr('data-node-id')+"\"><td colspan=\"6\" class=\"bg-light\">"+group+"</td></tr>"
					);

					if($(rows).eq( i ).prev().attr('data-node-id') == $(rows).eq( i ).attr('data-node-id')){
						$(rows).eq( i ).removeAttr('data-node-id')
					}
					
					last = group;
				}
				
			});
		}
	});

	$('#backuply_table_list').simpleTreeTable({
		store: 'session',
		storeKey: 'backuply_table_list'
	});

}

function show_backup2_window(){
	
	// Reset all data first
	set_backups_table([]);
	backuply_set_backup([]);
	$('#bkup2_server').text('');
	$('#bkup2_bserid').find('option').not('[value=0]').remove();
	$('#bkup2_settings_form').attr('action', 'act=backup2&svs=' + N['vpsid']);
	$('#bkup2_settings_form')[0].reset();
	$(".bckup_divider").hide();
	
	// Set the VPSID text
	$('#bkup2_vpsid, #backuply_vpsid').text(N['vpsid']);
	
	$('#bkup2_now, #bkup2_bkup_used, #bkup2_restore_used, #bkup2_current_cycle, #backuply_bkup_used, #backuply_current_cycle, #backuply_restore_used, #backuply_bkup2_now, #backuply_backup_cont').hide();
	
	// Get backup window data
	AJAX('[[API]]act=backup2&svs=' + N['vpsid'], function(data) {
		
		if(!empty(data["error"])){
			error(data["error"]);
			$("#show_backup2_window").modal("hide");
			return;
		}

		var backup_limit_txt = data['backup_limit'] == -1 ? '<i class=\'fas fa-infinity\'></i>' : data['backup_limit'];
		var restore_limit_txt = data['restore_limit'] == -1 ? '<i class=\'fas fa-infinity\'></i>' : data['restore_limit'];
		
		// Show remaining backup and restore counts
		$("#bkup2_bkup_used span").html(data['backup_used']+' / '+backup_limit_txt);
		$("#bkup2_restore_used span").html(data['restore_used']+' / '+restore_limit_txt);
		$("#backuply_bkup_used span").html(data['backuply_backup_used']+' / '+backup_limit_txt);
		$("#backuply_restore_used span").html(data['backuply_restore_used']+' / '+restore_limit_txt);
		$("#bkup2_current_cycle span, #backuply_current_cycle span").html(data['service_period']['start']+' {{to}} '+data['service_period']['end']);
		
		if(data["backup_limit"] != 0) {
			$('#bkup2_now, #bkup2_bkup_used, #bkup2_current_cycle, #backuply_bkup_used, #backuply_current_cycle, #backuply_bkup2_now, #backuply_backup_cont').show();
		}

		$("#take_full_backup_div").addClass('d-none');
		$("#take_full_backup_div").removeClass('d-flex');
		if(!empty(data['show_full'])){
			$("#take_full_backup_div").addClass('d-flex');
			$("#take_full_backup_div").removeClass('d-none');
		}
		
		if(data["restore_limit"] != 0) {
			$('#bkup2_restore_used, #bkup2_current_cycle, #backuply_restore_used, #backuply_current_cycle, #backuply_bkup2_now, #backuply_backup_cont').show();
		}
		
		var restore = (data["restore_limit"] != 0);

		// Populate backups list
		set_backups_table(data['backup_file_list'], restore);

		backuply_set_backup(data['backuply_file_list']);
		
		if(!empty(data['backup_servers'])) {
			
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
};

function set_backups_table(backups_list, restore) {
	var table = null;
	
	if($.fn.DataTable.isDataTable('#backup_table')) {
		table = $('#backup_table').DataTable();
	} else {
		table = $('#backup_table').DataTable({
			columns: [
				{ className: 'dt-left' },
				{ className: 'dt-center', width: '50px' },
				{ className: 'dt-left' },
				{ className: 'dt-left' },
				{ className: 'dt-left', orderable: false },
			],
			order: [[ 0, 'desc' ]]
		});
	}
	
	table.clear().draw();

	var table_data = [];
	
	$.each(backups_list, function(date, backups){
		$.each(backups, function(bkid, backup){

			date = backup['date'];
			backup_file = backup['filename'];

			var size = parseFloat((backup['size']/1024/1024));
			var _date = date.substr(0, 4)+'/'+date.substr(4, 2)+'/'+date.substr(6, 2)
			var matches = backup_file.match(/(\d+_\d+_\d+\-\d+_\d+_\d+)/is);

			if(!empty(matches)){
				_date = matches[1];	
				var tmp_date = _date.split('-');
				_date = tmp_date[0].replaceAll('_', '/');
				_date = _date +' '+tmp_date[1].replaceAll('_', ':');
			}

			var del_opt = '';
			if(empty(N['eu_hide_bkp_del'])){
				del_opt = `<a href="javascript:void(0);" title={{delete}}} onclick="backup_delete(`+backup['bkid']+`)"><i class="fas fa-trash danger"></i></a>`;
			}

			var action_restore = '<span class="flex gap-3">'+(restore ? '<a href="javascript:void(0)" title="{{{Restore}}}" onclick="restore('+bkid+'); return false;"><i class="fas fa-history text-blue-600 mr-2"></i>' : '');

			table_data.push(['<span>'+bkid+'</span>', '<span title="'+backup_file+'">'+backup_file+'</span>', '<span>'+size.toFixed(2)+' MB</span>', '<span>'+_date+'</span>', action_restore + del_opt +'</span>']);
		})
	})
	
	table.rows.add(table_data).draw();
}

function restore(bkid){

	modalConfirm(function(confirm){
		if(!confirm){
			return false;
		}
	
		$.ajax({
			type: "POST",
			url: "[[API]]act=backup2&svs=" + N['vpsid'] + "&api=json",
			dataType : "json",
			data: { 
				"bkid" : bkid,
				"restore" : 1
			},
			success:function(res){
				Loading(0);
				handleResponseData(res);
				setTimeout(refresh_page, 10000);
			}
		});
		
	},'{{bkup2_conf_restore}}');

};

function backup_now(){

	modalConfirm(function(confirm){
		if(!confirm){
			return false;
		}else{
			$('#backupform2').attr('action', 'act=backup2&svs=' + N['vpsid']);
			$('#cbackup_bkup2').val(1);
			$('#restore_bkup2').val('');
			$('#delete_bkup2').val('');
			$('#date_bkup2').val('');
			$('#file_bkup2').val('');
			submitit('backupform2');
			setTimeout(function(){
				refresh_page('vpsmanage');
			}, 2000);
			
		}
	},'{{bkup2_conf_cbackup}}');

};

function backup_delete(bkid){

	modalConfirm(function(confirm){
		
		if(!confirm){
			return false;
		}

		$.ajax({
			type: "POST",
			url: "[[API]]act=backup2&svs=" + N['vpsid'] + "&api=json",
			dataType : "json",
			data: {
				"bkid" : bkid, 
				"delete" : 1 
			},
			success:function(res){
				Loading(0);
				handleResponseData(res);
				show_backup2_window();
			}
		});
		
	},'{{bkup2_conf_delete}}');
};

function backup_delete_response(data) {
	if(!empty(data["done"])){		
		var restore = (data["restore_limit"] != 0);
		
		set_backups_table(data['backup_file_list'], restore);
	}
}

function bkup2_settings_response(data) {
	var restore = (data["restore_limit"] != 0);
	
	set_backups_table(data['backup_file_list'], restore);
	
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
			$('#enableform')[0].reset();
			$('#enbale_rescue_div').css('display', '');
			$('#disable_rescue_div').css('display', 'none');
		}
		/*for(x in data){
			alert(data[x])
		}*/
	});

};

function selectRecipes(){
	var seq = $("#rec-order").val();
	var tmp = seq.split(",");
	
	$("#recipestable tr").removeClass("table-success");
	tmp.forEach(rid => {
		$("#rec"+rid).addClass("table-success");
	});
}

function addRecipe(rid){
	if(!($("#rec"+rid).hasClass("table-success"))){
		$("#rec"+rid).addClass("table-success");
		if(!($("#rec-order").val())){
			$("#rec-order").val(rid);
		}else{
			$("#rec-order").val(function() {
				return this.value + ',' +rid;
		});
		}
	}
	
}

function removeRecipe(rid){
	if($("#rec"+rid).hasClass("table-success")){
		var seq = $("#rec-order").val();
		var tmp = seq.split(",");
		tmp.splice(tmp.indexOf(rid),1);
		$("#rec-order").val(tmp.join(","));
		$("#rec"+rid).removeClass("table-success");
		$("#rec"+rid).addClass("table-danger");
		setTimeout(function () {
			$("#rec"+rid).removeClass("table-danger");
		}, 100);
	}
	
}

function show_listrecipes_window(startURL){

	startURL = startURL || 'act=listrecipes';
	
	var regex = new RegExp("[\\?&]page=([^&#]*)");
	var results = regex.exec(startURL);
	var pageNum = 0;
	if(results != null){
		pageNum = decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	$("#no_recipes").hide();

	$('#recipeform').attr('action', 'act=listrecipes&svs='+N['vpsid']+'&page='+pageNum);

	AJAX('[[API]]act=listrecipes&svs='+N['vpsid']+'&page='+pageNum, function(data) {

		if(empty(data['recipes'])){
			$("#no_recipes").show();
			return false;
		}
		
		if(data['error'] != undefined){
			error(data['error']);
			return false;
		}
		
		pageLinks("recipe_links", 'act=listrecipes&svs='+N['vpsid'], data['page'], 'show_listrecipes_window');

		var recipe_table = '';
		recipe_table += '<div class="relative overflow-x-auto shadow-md sm:rounded-lg my-3"><table class="table" id="recipestable"><thead><tr><th>{{id}}</th><th width="15%">{{logo}}</th><th>{{name}}</th><th>{{action}}</th><th>{{ingredients}}</th></tr></thead><tbody>';
		
		$('#recipe_select').select2({
			placeholder: '',
			allowClear: true
		 });

		 $("#recipe_select").on("select2:select", function (evt) {
			var element = evt.params.data.element;
			var $element = $(element);
			
			$element.detach();
			$(this).append($element);
			$(this).trigger("change");
		 });

		// Prepare the list
		for(x in data['recipes']){

			$v = data['recipes'][x];
			var seq = $("#rec-order").val();
			var tmp = seq.split(",");
			var addClass = tmp.includes($v['rid'])? ' class="table-success" ':''; 

			recipe_table += '<tr id="rec'+$v['rid']+'"'+addClass+'><th width="5%">' + $v['rid'] + '</td><td width="10%"><img width="24" src="'+(!empty($v['logo']) ? $v['logo'] : '[[images]]recipes.png' )+'" /></td><td id="name'+$v['rid']+'">' + $v['name'] + '</td><td width="10%"><a id="add_r'+$v['rid']+'" name="add_recipe" onclick="addRecipe(\''+$v['rid']+'\');"><i class="fas fa-plus-circle fa-1x cursor-pointer"></i></a><a id="rm_r'+$v['rid']+'" name="remove_recipe" onclick="removeRecipe(\''+$v['rid']+'\');"><i class="far fa-trash-alt fa-1x delete ml-2 cursor-pointer"></i></a></td><td width="10%"><i class="fas fa-1x fa-info-circle info cursor-pointer" aria-hidden="true" title="{{ingredients}}" onclick="show_recipe(\''+$v['rid']+'\')"></i><div id="desc'+$v['rid']+'" style="display:none;" >'+ ($v['desc'] != null ?	$v['desc'] : '{{no_desc}}')+ '</div><div style="display:none;" id="code'+$v['rid']+'">'+$v['code']+'</div></td></tr>';
			$('#recipe_select').append(new Option($v['name'],$v['rid']));

		}
	
		recipe_table += '</tbody></table></div></form>';
		
		$('#recipeform').show();
		$('#recipes_list').html(recipe_table);
	});

	var events = $._data($('#recipeform')[0], 'events');
	
	if(empty(events)){
		
		$('#recipeform').submit(function(){

			execute_recipe('recipeform');
			return false;
			
		});
	}
};

function show_recipe(id){

	$("#rec_desc").html($("#desc"+id).html());
	$("#rec_code").html("<pre>"+$("#code"+id).html()+"</pre>");

	toggleModal('show_recipecode_window');

};

function execute_recipe(el){
	var eval = $('#rec-order').val();
	var tmp = eval.split(",");
	var duplicate = 0;
	var uniqueRids = [];
	
	if(eval.trim() == ""){
		customAlert("{{recipe_seq_empty_err}}",1);
		return false;
	}
	
	$.each(tmp, function(i, el){
	if($.inArray(el, uniqueRids) === -1){ 
		uniqueRids.push(el);
	}else{
		duplicate = 1;
	}});

	if(duplicate == 0){
		modalConfirm(function(confirm){
			if(!confirm){
				return false;
			}else{
					$("#recipestable tr").removeClass("table-success");
					var val = $('#rec-order').val();
					$("#exec_rid").val(val);
					$('#rec-order').val('');
					
					var vv_rid_sel = $("#"+ el + " #rid");
					$(vv_rid_sel).html("");
					$.each(val.split(","), function(vi, vv){
						vv = vv.trim();
						$(vv_rid_sel).append("<option value=\""+vv+"\" selected=\"selected\" >" + vv + "</option>");
					});
					
					return submitit(el);
			}
		},"{{conf_execute}}<br>{{recipe_to_exec_msg}}: "+eval);
	}
	else{
		customAlert("{{recipe_duplicate_err}}",1);
	}
	
};

function show_managesubnets_window(){

	AJAX('[[API]]act=managesubnets&svs='+N['vpsid'], function(data) {

		var subnet_table = '';
		subnet_table += '<table class="table border dataTable no-footer" id="managesubnets"><thead class="thead-light"><tr><th>{{mng_ipv6_subnet}}</th><th>{{mng_edit_subnet}}</th></tr></thead>';

		// Prepare the list
		for(x in data['ips']){

			$v = data['ips'][x];

			subnet_table += '<tr><td>' + $v['ip'] + '/' + $v['ipr_netmask'] + '</td><td id="data-subnet" data-subnet="' + $v['ip'] + '/' + $v['ipr_netmask'] + '" class="manage_subnet" onclick="show_add_ipv6_to_subnet(this);"><i class="far fa-edit edit fa-1x"></i></td></tr>';

		}

		subnet_table += '</table><input type="hidden" name="subnet" value="" id="subnet_id" />';

		$('#managesubnets_div').html(subnet_table);

		$("#managesubnets").dataTable();
	});
};

//------------------------------MANAGE VDF------------------------------

function show_managevdf_window(){
	
	//$('#managevdfform').attr('action', 'act=managevdf&svs=' + N['vpsid']);
	//$('#managevdf_div').html('');
	
	vdf_url = '[[API]]act=managevdf&svs=' + N['vpsid'];
	vdf_edit_ico = "far fa-edit edit fa-1x edit";
	vdf_save_ico = "fa fa-1x fa-save";
	vdf_delete_ico = "far fa-trash-alt fa-1x delete";
	vdf_revert_ico = "fa fa-1x fa-undo";

	AJAX(vdf_url, function(data) {
		$supported_protocols = data['supported_protocols'];
		$haproxydata = data['haproxydata'];
		$vpses = data['vpses'];
		$arr_haproxy_src_ips = data['arr_haproxy_src_ips'];
		
		$('#vdf_infobox_rp').html(data["server_haconfigs"][N['info']['vps']['serid']]['haproxy_reservedports'] || 'NA');
		$('#vdf_infobox_rph').html(data["server_haconfigs"][N['info']['vps']['serid']]['haproxy_reservedports_http'] || 'NA');
		$('#vdf_infobox_ap').html(data["server_haconfigs"][N['info']['vps']['serid']]['haproxy_allowedports'] || 'NA');
		
		//List current VDF entries
		listvpsforwardertbl();
		
		// Hide add VDF form if was visible previously and show add vdf form button
		$("#showaddvdfformbtn").show();
		vdf_vpsuuid = N['info']['vps']['uuid'];
		vdf_serid = N['info']['vps']['serid'];
		
	});

	toggleModal('show_managevdf_window_modal');

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

	addipv6_html += '<table class="table border dataTable no-footer" id="additional_ipv6Lists"><thead><tr><th>{{mng_ipv6_address}}</th><th>{{mng_ipv6_delete}}</th></tr></thead>';

	var ipr_ips = data['ipr_ips'];
	
	if(('ipv6' in ipr_ips) && !empty(ipr_ips['ipv6'])){
		
		for(x in ipr_ips['ipv6']){
			addipv6_html += '<tr><td>' + ipr_ips['ipv6'][x] + '</td><td><span class="delete_ipv6"><i class="fa fa-trash-alt delete-icon" aria-hidden="true"></i></span></td></tr>';
		}
	}

	addipv6_html += '</table><div class="bg"><div class="form-label">{{mng_add_ipv6}}</div><div class="add_ipv6_row">';

	var ipv6_parts_arr = ipr_ips['ipv6_addr'].split(':');

	var ipv6_input_boxes = new Array();

	// loop till value which are disabled to edit
	for(var i = 0; i < (8 - ipr_ips['ipv6_subnet_mask_value']); i++){
		ipv6_input_boxes[i] = '<input class="bg" type="text" name="ipv6_parts[]" value="' + ipv6_parts_arr[i] + '" disabled="disabled" size="1" maxlength="4"></input>';
	}

	// display rest of the input boxes
	for(i = i; i < 8; i++){
		ipv6_input_boxes[i] = '<input class="bg" type="text" name="ipv6_parts[]" value="" size="1" maxlength="4"></input>';
	}

	addipv6_html += ipv6_input_boxes.join('&nbsp;:&nbsp;');

	addipv6_html += '<div class="ui-dialog-buttonset my-3"><button class="blue_btn add_ipv6_row_button" onclick="submitit(\'managesubnetsform\');return false;" >{{mng_add_ip_button}}</button> &nbsp; <button type="button" class="blue_btn ipv6_back_button" onclick="show_managesubnets_window();">{{mng_back_button}}</button></center></div><input type="hidden" name="ipv6_addr" value="" id="ipv6_addr_id" /><input type="hidden" name="ipv6_subnet_mask" value="" id="ipv6_subnet_mask_id" /><div id="new_ipv6_id"></div>';

	$('#managesubnets_div').html(addipv6_html);

	var tableData = $("#additional_ipv6Lists").DataTable();

	$(".add_ipv6_row_button").click(function(){
		insertIP(tableData, ipr_ips);
	});

	$("#additional_ipv6Lists").on("click", "tr span.delete_ipv6", function (){
		var iPos = tableData.row($(this).parents('tr')).index();
		modalConfirm(function(confirm){
			if(confirm){
				tableData.row(iPos).remove().draw();//delete row
				insertIP(tableData, ipr_ips);
			} else {
				return false;
			}
		},"{{mng_delete_confirm}}");

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
		tableData.row.add([ipv6, '<span class="delete_ipv6"><i class="fa fa-trash-alt delete-icon" aria-hidden="true"></i></span>']).draw();
	}

	var new_ipv6 = '';

	$(tableData.rows().nodes()).each(function(i, el){
		new_ipv6 += '<input type="hidden" name="new_ipv6[]" value="'+ $(this).find("td").html() +'">';
	});

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
			var cs_html = '<div class="notice">{{cs_none}}</div><div class="text-center my-4"><a href="javascript:void(0);" class="blue_btn" id="cs_create" onclick="create_console_session('+ N['vpsid'] +')">{{cs_create}}</a></div>';
		}else{
			var cs_html = '<div class="banner-blue my-4">{{cs_details}}</div><div class="row mb-5"><div class="col-md-8"><div class="mb-2"><div class="m-2"><label class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">{{cs_expires}} : </label><span class="font-semibold" id="console_time"></span></div><div class="m-2"><label class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">{{cs_ip}} : </label><span class="font-semibold">' + data['server_publicip'] + '</span></div><div class="m-2"><label class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">{{cs_port}} : </label><span class="font-semibold">' + console['port'] + '</span></div><div class="m-2"><label class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">{{cs_username}} : </label><span class="font-semibold">' + console['username'] + '</span></div><div class="m-2"><label class="text-gray-500 dark:text-gray-400 dark:hover:text-gray-300">{{cs_password}} : </label><span class="font-semibold">' + console['password'] + '</span></div></div></div></div><div class="row mb-5"><a href="javascript:void(0);" class="blue_btn" id="cs_destroy" onclick="destroy_cosole_session();">{{cs_destroy}}</a></div>';
			
			var fiveMinutes = console['time_left'];

			updateTime(fiveMinutes);
		}
		$('#console_div').html(cs_html);
	});
};

function create_console_session(vpsid){
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

function show_monitor_window(open_window, mon, custDates){

	// Retain the state of radio button
	var search_state = undefined;
	var mon = mon || '';
	$("#note_box").css("display", "none");

	let monitor_api_call = '[[API]]act=monitor&svs=' + N['vpsid'] + '&show=' + mon;

	if(!empty(custDates)){
		monitor_api_call = '[[API]]act=monitor&svs=' + N['vpsid'] + '&show=' + mon + '&customDates='+custDates;
	}
	// AJAX('[[API]]act=monitor&svs=' + N['vpsid'] + '&show=' + mon, function(data) {

	AJAX(monitor_api_call, function(data) {

		var cpudata = data['cpu'];
		var diskdata = data['disk'];
		var ramdata = data['ram'];

		$('#cpu_show_graph, #diskgraphcell, #inodesgraphcell').css('display', 'block');

		var ajaxTimer = null;

		var cpu = {
			series: [cpudata['cpu']['percent']],
			labels: ["{{used}}"],
			title: {
				text: 'CPU Utilization',
				align: 'bottom',
				floating: true,
				offsetY: -5,
				style: {
					fontSize:  '14px',
					fontWeight:  400,
					fontFamily:  'inter',
				}
			},
		};
		
		resource_graph("cpuUtilizationChart", cpu);

		var ram = {
			series: [ramdata['percent']],
			labels: ["{{used}}"],
			title: {
				text: 'Ram Utilization',
				align: 'bottom',
				floating: true,
				offsetY: -5,
				style: {
					fontSize:  '14px',
					fontWeight:  400,
					fontFamily:  'inter',
				}
			},
		};

		if(!empty(ramdata['percent'])){
			$('#ram_show_graph, #legend_ram, #ram_plot, #ramused').show();
			$('#ramused').prev().show();
			resource_graph("ramUtilizationChart", ram);
			$('#ramused').html(ramdata['used'] + ' MB');
			$('#raminpercent').html(ramdata['percent'] + '%');
			//startusage();
		}

		var disk = {
			series: [ diskdata['disk']['percent'] ],
			labels: ["{{used}}"],
			title: {
				text: 'Disk Utilization',
				align: 'bottom',
				floating: true,
				offsetY: -5,
				style: {
					fontSize:  '14px',
					fontWeight:  400,
					fontFamily:  'inter',
				}
			},
		};

		resource_graph("diskUtilizationChart", disk);

		var inodes = {
			series: [ diskdata['inodes']['percent'] ],
			labels: ["{{used}}"],
			title: {
				text: 'Inodes Utilization',
				align: 'bottom',
				floating: true,
				offsetY: -5,
				style: {
					fontSize:  '14px',
					fontWeight:  400,
					fontFamily:  'inter',
				}
			},
		};

		resource_graph("inodesUtilizationChart", inodes);

		// File the CPU info
		$('#cpulimit').html(cpudata['cpu']['limit'] + ' MHz');
		$('#cppercent').html(cpudata['cpu']['percent'] + ' %');
		let amd_svg = `
		<svg viewBox="0 0 800 200" class="h-6 inline fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano">
			<path d="M187.888 178.122H143.52l-13.573-32.738H56.003l-12.366 32.738H0L66.667 12.776h47.761zM91.155 52.286L66.912 116.53h50.913zm257.901-39.51h35.88v165.346h-41.219V74.842l-44.608 51.877h-6.301l-44.605-51.877V178.12h-41.219V12.776h35.88l53.092 61.336zm140.319 0c60.364 0 91.391 37.573 91.391 82.909 0 47.517-30.058 82.437-96 82.437h-68.369V12.776zm-31.762 135.041h26.906c41.457 0 53.823-28.129 53.823-52.377 0-28.368-15.276-52.363-54.308-52.363h-26.422v104.74zm205.156-95.836L610.797 0H800v189.21l-51.972-51.975V51.981zm-.061 10.416L609.2 115.903v74.899h74.889l53.505-53.506h-74.886z"/>
		</svg>`;

		let intel_svg = `
		<svg version="1.1" class="h-6 inline fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		viewBox="0 0 395.4 155.9" style="enable-background:new 0 0 395.4 155.9;" xml:space="preserve">
   
			<rect x="4.7" y="5.2" class="fill-[#0068B5] dark:fill-[#0075FF]" width="28.1" height="28.1"/>
			<g>
				<path d="M32.1,151.6V50.4H5.5v101.2H32.1z M208.9,152.6v-24.8c-3.9,0-7.2-0.2-9.6-0.6c-2.8-0.4-4.9-1.4-6.3-2.8
					c-1.4-1.4-2.3-3.4-2.8-6c-0.4-2.5-0.6-5.8-0.6-9.8V73.2h19.3V50.4h-19.3V10.9h-26.7v97.9c0,8.3,0.7,15.3,2.1,20.9
					c1.4,5.5,3.8,10,7.1,13.4s7.7,5.8,13,7.3c5.4,1.5,12.2,2.2,20.3,2.2L208.9,152.6L208.9,152.6z M361.7,151.6V3.1H335v148.5H361.7z
						M137.2,60.3c-7.4-8-17.8-12-31-12c-6.4,0-12.2,1.3-17.5,3.9C83.5,54.8,79,58.4,75.5,63L74,64.9v-1.7V50.4H47.7v101.2h26.5V97.7
					v3.7c0-0.6,0-1.2,0-1.8c0.3-9.5,2.6-16.5,7-21c4.7-4.8,10.4-7.2,16.9-7.2c7.7,0,13.6,2.4,17.5,7c3.8,4.6,5.8,11.1,5.8,19.4l0,0V98
					l0,0l0,0v53.5h26.9V94.1C148.4,79.7,144.6,68.3,137.2,60.3z M321.2,100.8c0-7.3-1.3-14.1-3.8-20.5c-2.6-6.3-6.2-11.9-10.7-16.7
					c-4.6-4.8-10.1-8.5-16.5-11.2s-13.5-4-21.2-4c-7.3,0-14.2,1.4-20.6,4.1c-6.4,2.8-12,6.5-16.7,11.2s-8.5,10.3-11.2,16.7
					c-2.8,6.4-4.1,13.3-4.1,20.6c0,7.3,1.3,14.2,3.9,20.6c2.6,6.4,6.3,12,10.9,16.7c4.6,4.7,10.3,8.5,16.9,11.2
					c6.6,2.8,13.9,4.2,21.7,4.2c22.6,0,36.6-10.3,45-19.9l-19.2-14.6c-4,4.8-13.6,11.3-25.6,11.3c-7.5,0-13.7-1.7-18.4-5.2
					c-4.7-3.4-7.9-8.2-9.6-14.1l-0.3-0.9h79.5L321.2,100.8L321.2,100.8z M241.9,91.5c0-7.4,8.5-20.3,26.8-20.4
					c18.3,0,26.9,12.9,26.9,20.3L241.9,91.5z"/>
				<path d="M392.1,138.4c-0.5-1.2-1.2-2.2-2.1-3.1c-0.9-0.9-1.9-1.6-3.1-2.1s-2.5-0.8-3.8-0.8c-1.4,0-2.6,0.3-3.8,0.8
					c-1.2,0.5-2.2,1.2-3.1,2.1c-0.9,0.9-1.6,1.9-2.1,3.1c-0.5,1.2-0.8,2.5-0.8,3.8c0,1.4,0.3,2.6,0.8,3.8s1.2,2.2,2.1,3.1
					c0.9,0.9,1.9,1.6,3.1,2.1s2.5,0.8,3.8,0.8c1.4,0,2.6-0.3,3.8-0.8c1.2-0.5,2.2-1.2,3.1-2.1c0.9-0.9,1.6-1.9,2.1-3.1
					c0.5-1.2,0.8-2.5,0.8-3.8S392.6,139.6,392.1,138.4z M390.5,145.4c-0.4,1-1,1.9-1.7,2.6c-0.7,0.7-1.6,1.3-2.6,1.7s-2,0.6-3.2,0.6
					c-1.1,0-2.2-0.2-3.2-0.6c-1-0.4-1.9-1-2.6-1.7s-1.3-1.6-1.7-2.6c-0.4-1-0.6-2-0.6-3.2c0-1.1,0.2-2.2,0.6-3.2s1-1.9,1.7-2.6
					c0.7-0.7,1.6-1.3,2.6-1.7s2-0.6,3.2-0.6c1.1,0,2.2,0.2,3.2,0.6c1,0.4,1.9,1,2.6,1.7s1.3,1.6,1.7,2.6c0.4,1,0.6,2,0.6,3.2
					C391.2,143.4,390.9,144.4,390.5,145.4z M384.9,143c0.8-0.1,1.4-0.4,1.9-0.9s0.8-1.2,0.8-2.2c0-1.1-0.3-1.9-1-2.5
					c-0.6-0.6-1.7-0.9-3-0.9h-4.4v11.3h2.1v-4.6h1.5l2.8,4.6h2.2L384.9,143z M383.8,141.4c-0.3,0-0.6,0-1,0h-1.5v-3.2h1.5
					c0.3,0,0.6,0,1,0c0.3,0,0.6,0.1,0.9,0.2c0.3,0.1,0.5,0.3,0.6,0.5s0.2,0.5,0.2,0.9s-0.1,0.7-0.2,0.9c-0.2,0.2-0.4,0.4-0.6,0.5
					C384.4,141.3,384.1,141.4,383.8,141.4z"/>
			</g>
		</svg>
   		`;

		let cpu_svg = ``;
		if(cpudata['cpu']['manu'] == 'amd'){
			cpu_svg = amd_svg;
		}else if(cpudata['cpu']['manu'] == 'intel'){
			cpu_svg = intel_svg;
		}

		$('#cpuman_img').html(cpu_svg);

		let swap_svg = '<svg class="h-6 inline mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#0075FF" d="M14.5 10.33h6.67A.83.83 0 0 0 22 9.5 7.5 7.5 0 0 0 14.5 2a.83.83 0 0 0-.83.83V9.5a.83.83 0 0 0 .83.83"></path><path fill="#666D80" d="M21.08 12h-8.15a.91.91 0 0 1-.91-.91V2.92A.92.92 0 0 0 11 2a10 10 0 1 0 11 11 .92.92 0 0 0-.92-1"></path></svg>';

		// Fill the RAM information
		var swap_lang = swap_svg + '{{ram_burstable}}';

		var swap_val = ramdata['burst'];
		$('#ramlimit').html(ramdata['limit'] + ' MB');
		if('swap' in ramdata){
			swap_lang = swap_svg + '{{ram_swap}}';
			swap_val = ramdata['swap'];
		}
		$('#swap_lang').html(swap_lang);
		$('#swap_val').html(swap_val + ' MB');


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
				cpu_data.push([parseInt(val[1]) * 1000, parseFloat(val[6])]);

				inode_data.push([parseInt(val[1]) * 1000, parseFloat(val[4])]);

				ram_data.push([parseInt(val[1]) * 1000, parseFloat(val[5])]);

				disk_data.push([parseInt(val[1]) * 1000, parseFloat(val[3])]);

				ntw_in_data.push([parseInt(val[1]) * 1000, parseFloat(val[7])]);

				ntw_out_data.push([parseInt(val[1]) * 1000, parseFloat(val[8])]);

				ntw_total_data.push([parseInt(val[1]) * 1000, (parseInt(val[7])+parseInt(val[8]))]);

				io_read_data.push([parseInt(val[1]) * 1000, parseFloat(val[9])]);

				io_write_data.push([parseInt(val[1]) * 1000, parseFloat(val[10])]);

				// Display the average speed of available data
				avg_download += parseInt(val[7]);
				avg_upload += parseInt(val[8]);
				avg_io_read += parseInt(val[9]);
				avg_io_write += parseInt(val[10])
				count++;

			});
			
			var cpu_graph = [
				{ name: "{{mon_cpu_usage}}",	data: cpu_data}
			];

			var inode_graph = [
				{ name: "{{mon_inode_usage}}",	data: inode_data, color: "#011f4d"}
			];

			var ram_graph = [
				{ name: "{{mon_ram_usage}}",	data: ram_data, color: "#ffc800"}
			];

			var disk_graph = [
				{ name: "{{mon_disk_usage}}",	data: disk_data, color: "#ff4c00"}
			];

			var io_read_graph = [
				{ name: "{{mon_io_read_spd}}",	data: io_read_data, color: "#0015ff"},
			];

			var io_write_graph = [
				{ name: "{{mon_io_write_spd}}",	data: io_write_data, color: "#ff4c00"},
			];

			var ntw_graph = [
				{ name: "{{mon_down_speed}}",	data: ntw_in_data, color: "#0517e3"},
				{ name: "{{mon_up_speed}}",	data: ntw_out_data , color: "#00004d"},
				{ name: "{{mon_total_speed}}",	data: ntw_total_data }
			];

			var presentMonths = convertDateStringToArray(month['mth_txt']);
			var date1 = new Date(presentMonths[0]);
			var month_last_day = new Date(presentMonths[1]);
			var date2;

			let min_date = new Date(formatDateFromEpoch(data['vps_create_date']));
			let max_date = new Date();
			let remove_other_date_data = {};
			var vps_create_month = data['vps_create_month'];
			var today = new Date();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(mm.toString().length == 1){
        mm = '0' + mm;
			}

			if(!empty(month['custom_date'])){
	
				let custom_date = month['custom_date'].split(',');

				date1 = custom_date['0'];
				date2 = custom_date['1'];
				$('#sys_prev_month').css('visibility', 'hidden');
				$('#sys_next_month').hide();

			}else{
				
				date2 = max_date;
				if(month_last_day < max_date){
					date2 = month_last_day;
				}

				if(vps_create_month == month['month']){
					$('#sys_prev_month').css('visibility', 'hidden');
				}else{
	
					$('#sys_prev_month').attr("onclick", "show_monitor_window('',"+ month['prev'] +");" );
					$('#sys_prev_month').css('visibility', 'visible');
				}
	
				if(month['next_month'] > (yyyy+""+mm)){
					$('#sys_next_month').hide();
				}else{
					$('#sys_next_month').attr("onclick", "show_monitor_window('',"+ month['next_month'] +");" );
					$('#sys_next_month').show();
				}
				
			}
	
			let sys_date_range = new DateRangePicker(document.getElementById('sys_range_date'),
													{
														"minDate" : min_date,
														"maxDate" : max_date,
													});
			if(min_date >= date1){
				date1 = min_date;
			}
			
			remove_other_date_data["minDate"] = date1
			remove_other_date_data["maxDate"] = date2;

			sys_date_range.setDates(date1, date2);

			// Calculating the average Downloading Speed per month
			avg_download = (avg_download/count/1024/1024).toFixed(5);
			$("#avg_download").html(avg_download + " MB/s");

			// Calculating the average Uploading Speed per month
			avg_upload = (avg_upload/count/1024/1024).toFixed(5);
			$("#avg_upload").html(avg_upload + " MB/s");

			// Calculating the average I/O read per month
			avg_io_read = (avg_io_read/count/1024/1024).toFixed(5);
			$("#io_read").html(avg_io_read + " MB/s");

			// Calculating the average I/O write per month
			avg_io_write = (avg_io_write/count/1024/1024).toFixed(5);
			$("#io_write").html(avg_io_write + " MB/s");

			cpu_options = flot_options();
			cpu_options['series'] = cpu_graph;
			cpu_options['colors'] = ["#FDC046"];

			cpu_build_graph = live_resource_graph("", "CpuMonitoringChart", cpu_options);

			if(!empty(ramdata['percent'])){
				ram_options = flot_options();
				ram_options['series'] = ram_graph;
				ram_options['colors'] = ["#FDC046"];
				ram_build_graph = live_resource_graph("", "RamMonitoringChart", ram_options);
			}
			
			disk_options = flot_options();
			disk_options['series'] = disk_graph;
			disk_options['colors'] = ["#FDC046", "#FE8F4D", "#E60C8D"];
			disk_options['yaxis'] = {
				labels: {
					formatter: function(val){

						if(val > 1024 && parseInt(val/1024) < 1024){
							return parseFloat(val / 1024).toFixed(1) + " GB";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " TB";
						}else{
							return val + " MB";
						}
					},
					style: {
						fontFamily: 'inter',
						cssClass: 'dark:fill-white',
					},
				},
			};

			disk_build_graph = live_resource_graph("", "diskMonitoringChart", disk_options);

			inode_options = flot_options();
			inode_options['series'] = inode_graph;
			inode_options['colors'] = ["#FDC046", "#FE8F4D", "#E60C8D"];
			inode_build_graph = live_resource_graph("", "inodesMonitoringChart", inode_options);

			ntw_options = flot_options();
			ntw_options['series'] = ntw_graph;
			ntw_options['colors'] = ["#FDC046", "#FE8F4D", "#E60C8D"];
			ntw_options['yaxis'] = {
				labels: {
					formatter: function(val){

						if(val > 1024 && parseInt(val/1024) < 1024){
							return parseFloat(val / 1024).toFixed(1) + " KB/s";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " MB/s";
						}else{
							return val + " B/S";
						}
					},
					style: {
						fontFamily: 'inter',
						cssClass: 'dark:fill-white',
					},
				},
			};

			ntw_build_graph = live_resource_graph("", "networkInfoChart", ntw_options);

			io_read_options = flot_options();
			io_read_options['series'] = io_read_graph;
			io_read_options['colors'] = ["#FDC046", "#FE8F4D", "#E60C8D"];
			io_read_options['yaxis'] = {
				labels: {
					formatter: function(val){

						if(val >= 1024 && parseInt(val/1024) < 1024){
							return parseFloat(val / 1024).toFixed(1) + " MB/s";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " GB/s";
						}else{
							return val + " KB/s";
						}
					},
					style: {
						fontFamily: 'inter',
						cssClass: 'dark:fill-white',
					},
				},
			};
			io_read_build_graph = live_resource_graph("", "ioReadSpeedChart", io_read_options);

			io_write_options = flot_options();
			io_write_options['series'] = io_write_graph;
			io_write_options['colors'] = ["#FDC046", "#FE8F4D", "#E60C8D"];
			io_write_options['yaxis'] = {
				labels: {
					formatter: function(val){

						if(val > 1024 && parseInt(val/1024) < 1024){
							return parseFloat(val / 1024).toFixed(1) + " MB/s";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " GB/s";
						}else{
							return val + " KB/s";
						}
					},
					style: {
						fontFamily: 'inter',
						cssClass: 'dark:fill-white',
					},
				},
			};
			io_write_build_graph = live_resource_graph("", "ioWriteSpeedChart", io_write_options);
		}else{
			$("#note_box").css("display", "block");
		}
	});

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
		series: [],
		chart: {
			type: "area",
			height: "200",
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: true,
					zoom: true,
					zoomin: true,
					zoomout: true,
					pan: true,
					reset: true,
					customIcons: []
				  }
			},
			animations: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		grid: {
			borderColor: gridBorderColor,
		},
		stroke: {
			curve: 'smooth',
			width: 1,
		},
		fill: {
			type: "gradient",
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.7,
				opacityTo: 0,
				stops: [30, 99, 100]
			},
			colors: ["#FDC046", "#FE8F4D", "#E60C8D"],
		},
		xaxis: {
			type: 'datetime',
			labels: {
				style: {
					fontFamily: 'inter',
					cssClass: 'dark:fill-white',
				}
			},
			
		},
		yaxis: {
			labels: {
				style: {
					fontFamily: 'inter',
					cssClass: 'dark:fill-white',
				}
			},
		},
		legend: {
			position: 'bottom',
			horizontalAlign: 'center',
		},
		tooltip:{
			x: {
				format: 'dd MMM yyyy HH:mm:ss'  
			}
		},
	};
	
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

function show_bandwidth_window(mon, custDates = []){

	var all_data = '';

	let bandwidth_api_call = '[[API]]act=bandwidth&svs=' + N['vpsid'] + '&show=' + mon;

	if(!empty(custDates)){
		bandwidth_api_call = '[[API]]act=bandwidth&svs=' + N['vpsid'] + '&show=' + mon + '&customDates='+custDates;
	}

	AJAX(bandwidth_api_call, function(data) {

		all_data = data;
		var month = data['month'];
		let monthly_data = data['bandwidth']['yr_bandwidth'];

		if(empty(month)){
			return false;
		}
		
		var bandwidth_options = {
			series: [{
					name: '{{usage}}',
					data: []
				},{
					name: '{{in}}',
					data: []
				},{
					name: '{{out}}',
					data: []
				}
			],
			chart: {
				type: "area",
				width: "100%",
				toolbar: {
					show: true,
					tools: {
						download: true,
						selection: true,
						zoom: true,
						zoomin: true,
						zoomout: true,
						pan: true,
						reset: true,
						customIcons: []
					}
				},
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				borderColor: gridBorderColor,
			},
			stroke: {
				curve: 'smooth',
				width: 1,
			},
			fill: {
				type: "gradient",
				gradient: {
					shadeIntensity: 1,
					opacityFrom: 0.7,
					opacityTo: 0,
					stops: [30, 99, 100]
				},
				colors: ["#FDC046", "#FE8F4D", "#E60C8D"],
			},
			colors: ["#FDC046", "#FE8F4D", "#E60C8D"],
			xaxis: {
				type: 'datetime',
			},
			yaxis: {
				labels: {
					formatter: function(val){

						if(val >= 1024 && parseInt(val/1024) < 1024){
							return parseFloat(val / 1024).toFixed(1) + " GB";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " TB";
						}else{
							return val + " MB";
						}
					},
				},
			},
			legend: {
				position: 'bottom',
				horizontalAlign: 'center',
			},
		};

		var bandwidth_monthly_options = {
			series: [{
					name: '{{in}}',
					data: []
				},{
					name: '{{out}}',
					data: []
				}
			],
			chart: {
				type: "bar",
				width: "100%",
				stacked: true,
				toolbar: {
					show: false,
				},
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
				borderColor: gridBorderColor,
			},
			stroke: {
				curve: 'smooth',
				width: 1,
			},
			fill: {
				colors: ["#0075FF", "#00C88F", ],
			},
			xaxis: {
				categories: [ "{{jan}}", "{{feb}}", "{{mar}}", "{{apr}}", "{{may}}", "{{jun}}", "{{jul}}", "{{aug}}", "{{sep}}", "{{oct}}", "{{nov}}", "{{dec}}" ],
				tickAmount: '2',
			},
			yaxis: {
				decimalsInFloat: 0,
				labels: {
					formatter: function(val){

						if(val >= 1024){
							return parseFloat(val / 1024).toFixed(1) + " GB";
						}else if(parseInt(val/1024) >= 1024){
							return (val / 1024 /1024).toFixed(1) + " TB";
						}else{
							return val + " MB";
						}
					},
				},
			},
			legend: {
				position: 'bottom',
				horizontalAlign: 'center',
			},
		};
	
		let bandwidth_graph_object = bandwidth_monthly_graph_object = {};
	
		bandwidth_graph_object = live_resource_graph("", "bwband_holder1", bandwidth_options);
		bandwidth_monthly_graph_object = live_resource_graph("", "bw_monthly_body", bandwidth_monthly_options);

		let monthly_in_data = [];
		let monthly_out_data = [];

		for(x in monthly_data){

			monthly_in_data.push(monthly_data[x]['in']);
			monthly_out_data.push(monthly_data[x]['out']);
		}

		monthly_data_update = [
			{data: monthly_in_data},
			{data: monthly_out_data},
		];

		live_resource_graph(bandwidth_monthly_graph_object, "bw_monthly_body", {}, monthly_data_update);
		var prev_month = month['prev'];
		var next_month = month['next'];
		var months = month['mth_txt'].split('<br>');

		var presentMonths = convertDateStringToArray(month['mth_txt']);
		var date1 = new Date(presentMonths[0]);
		var month_end_day = new Date(presentMonths[1]);
		
		var date2;

		let min_date = new Date(formatDateFromEpoch(all_data['vps_create_date']));
		let max_date = new Date();
		let remove_other_date_data = {};
		if(!empty(all_data['bandwidth']['custom_date'])){

			function dateFormatter(mont){
				let dateStr = mont;
				let year = dateStr.substring(0, 4);
				let month = dateStr.substring(4, 6);
				let day = dateStr.substring(6, 8);
				let formattedDate = month + "/" + day + "/" + year;
				return formattedDate;
			}
			
			date1 = dateFormatter(all_data['bandwidth']['custom_date']['from']);
			date2 = dateFormatter(all_data['bandwidth']['custom_date']['to']);

		}else{

			date2 = max_date;
			
			if(month_end_day < max_date){
				date2 = month_end_day;
			}
		}

		let bw_date_range = new DateRangePicker(document.getElementById('bw_range_date'),
												{
													"minDate" : min_date,
													"maxDate" : max_date,
												});
		if(min_date >= date1){
			date1 = min_date;
		}

		remove_other_date_data["minDate"] = date1
		remove_other_date_data["maxDate"] = date2;

		let band_limit = data['bandwidth']['limit_gb'] + ' {{li_band_gb}}';
		let free_gb = data['bandwidth']['free_gb'];
		let used_gb = data['bandwidth']['used_gb'];
		let band_percent = data['bandwidth']['percent'];

		if(data['bandwidth']['limit_gb'] == 0){
			band_limit = '<i class="fas fa-infinity"></i> {{li_band_gb}}';
			free_gb = 1000000;
			used_gb = 1;
		}
		bw_date_range.setDates(date1, date2);
		$('#bw_limit').html(band_limit);
		$('#bw_used').html(data['bandwidth']['used_gb'] + ' {{li_band_gb}}');
		$('#bw_percent').html(band_percent + ' %');
		
		var d1 = makedata(all_data['bandwidth']['usage'], 1, remove_other_date_data);
		var indata = makedata(all_data['bandwidth']['in'], 1, remove_other_date_data);
		var outdata = makedata(all_data['bandwidth']['out'], 1, remove_other_date_data);
		// console.log(indata);

		updated_bw_data = [{
			data: d1
		},{
			data : indata
		},{
			data : outdata
		}];

		live_resource_graph(bandwidth_graph_object, "bwband_holder1",{}, updated_bw_data);

		var today = new Date();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(mm.toString().length == 1){
			mm = '0' + mm;
		}

		var presentMonth = all_data['vps_create_month'];

		if(empty(all_data['bandwidth']['custom_date'])){
			$('#reset_api').hide();
			if(presentMonth == month['month']){
				$('#prev_month').css('visibility', 'hidden');
			}else{

				$('#prev_month').attr("onclick", "show_bandwidth_window("+ month['prev'] +");" );
				$('#prev_month').css('visibility', 'visible');
			}

			if(month['next'] > (yyyy+""+mm)){
				$('#next_month').hide();
			}else{
				$('#next_month').attr("onclick", "show_bandwidth_window("+ month['next'] +");" );
				$('#next_month').show();
			}
		}else{
			$('#reset_api').show();
			$('#prev_month').css('visibility', 'hidden');
			$('#next_month').hide();
		}
	});
};

// To get bandwidth data on range on dates
function custom_bandwidth_call(){
	
	let start_date = new Date($('#bw_start_date').val());
	let end_date = new Date($('#bw_end_date').val());

	let bandwidth_date_range = [start_date.getDate()+"/"+(start_date.getMonth() + 1)+"/"+start_date.getFullYear(),end_date.getDate()+"/"+(end_date.getMonth() + 1)+"/"+end_date.getFullYear()];

	show_bandwidth_window("",bandwidth_date_range);

}

// To get system monitor data on range on dates
function custom_monitor_call(){
	
	let start_date = new Date($('#sys_start_date').val());
	let end_date = new Date($('#sys_end_date').val());

	let system_date_range = [start_date.getDate()+"/"+(start_date.getMonth() + 1)+"/"+start_date.getFullYear(),end_date.getDate()+"/"+(end_date.getMonth() + 1)+"/"+end_date.getFullYear()];

	show_monitor_window('', '', system_date_range);

}

function formatDateFromEpoch(epoch) {
	var date = new Date(epoch * 1000); // Convert to milliseconds
	var year = date.getFullYear();
	var month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based, so adding 1 and padding with leading zero if necessary
	var day = ("0" + date.getDate()).slice(-2); // Padding with leading zero if necessary
  
	return year + "-" + month + "-" + day;
}

function formatTimeFromEpoch(epoch){

	let date = new Date(epoch * 1000);
	
	return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
}

function reset_monitor_graph(){
	show_monitor_window();
}

function reset_bandwidth_graph(){
	show_bandwidth_window();
}

function convertDateStringToArray(dateString) {

	// Split the string by the '<br>' separator
	var dates = dateString.split('<br>');

	// Initialize an empty array to store the converted dates
	var convertedDates = [];
	
	// Iterate through each date string
	for (var i = 0; i < dates.length; i++) {
	  var date = dates[i].trim(); // Remove any leading/trailing spaces
	  
	  // Split the date string by spaces
	  var parts = date.split(' ');
	  
	  // Extract the day, month, and year
	  var day = parts[0];
	  var month = parts[1];
	  var year = parts[2];
	  
	  // Convert the month abbreviation to a two-digit number
	  var monthNumber = ('JanFebMarAprMayJunJulAugSepOctNovDec'.indexOf(month) / 3 + 1).toString().padStart(2, '0');
	  
	  // Format the date string as 'MM/DD/YYYY'
	  var formattedDate = monthNumber + '/' + day + '/' + year;
	  
	  // Add the formatted date to the array
	  convertedDates.push(formattedDate);
	}
	
	return convertedDates;
}

function show_processes_window(shw_win){

	$('#processes').attr('action', 'act=processes&svs='+ N['vpsid']);

	// Show the popup
	if(shw_win == 1){
		toggleModal('show_processes_window_modal');
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
				tdata += '<td><input type="checkbox" name="sel_proc[]" class="virt-input" id="process-'+data["processes"][x]['PID']+'" value="'+ data["processes"][x]['PID'] +'"></td>';
				tdata += '</tr>';
			}
		}

		if(empty(data["processes"])){
			$('#process_div').html('<div class="notice">{{proc_vps_is_off}}</div>');
			return false;
		}
		
		$('#proctable').html(tdata);
		
		$("#proctable").dataTable({
			'destroy': true,
			'columnDefs': [ {
				'targets': [9], // column index (start from 0)
				'orderable': false, // set orderable false for selected columns
				},
				{ "width": "5%", "targets": [0,1] },
				{ "width": "10%", "targets": [7] },		 
				{ "width": "20%", "targets": [8] },
				{ "width": "6%", "targets": [9] },		 
			],
			'autoWidth': true, 

		});
		
		
	});

	$("#process_poweroff").unbind().click(function(){
		$("#processes").submit();
	})
};

function response_processes(){
	show_processes_window(0);
};

function show_services_window(shw_win){

	$('#servicesform').attr('action', 'act=services&svs=' + N['vpsid']);
	$('#services_div').html('');
	AJAX('[[API]]act=services&svs=' + N['vpsid'], function(data) {

		var cols = new Object();
		cols["heading"] = {"l" : '{{ser_heading}}', "width": '30px'};
		cols["status"] = {"l" : '{{ser_status}}', "width": '30px'};
		cols["autostart"] = {"l" : '{{ser_autostart}}', "width": '30px'};
		cols["select_all"] = {"l" : '<div class=""><input type="checkbox" id="services_select_all" class="select_all virt-checkbox" onclick="check(document.getElementsByName(\'sel_serv[]\'), this)"><label class="custom-control-label" for="services_select_all"></div>', "width": '30px', "class" : "select-all-checkbox"};

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
					tmp[x]["status"] = '{{ser_statrun}}';
					break;
				}else{
					tmp[x]["status"] = '{{ser_statoff}}';
				}
			}

			for(z in autostart){
				if(autostart[z] == $v){
					tmp[x]["autostart"] = '{{ser_staton}}';
					break;
				}else{
					tmp[x]["autostart"] = '{{ser_statoff}}';
				}
			}

			tmp[x]["select_all"] = '<input type="checkbox" class="virt-checkbox" id="services-checkbox'+$v+'" name="sel_serv[]" value="'+ $v +'">';
		}
		// Form the TABLE
		drawTable({'id' : 'services_div', 'tid' : 'servicestable', "width" : '100%'}, cols, tmp);

		// Prepare the list
		$("#servicestable").dataTable({
			'columnDefs': [ {
				'targets': [3], // column index (start from 0)
				'orderable': false, // set orderable false for selected columns
			 }]
		});
	});

	var action = '';
	$('#start_x,	#restart_x, #stop_x').val('');

	$("#sstart").unbind().click(function(){
		$('#start_x').val(1);
		return submitit('servicesform', 'response_services');
	});

	$("#sstop").unbind().click(function(){
		$('#stop_x').val(1);
		return submitit('servicesform', 'response_services');
	});

	$("#srestart").unbind().click(function(){
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
		cols["time"] = {"l" : '{{sts_time}}', "width": '30px'};
		cols["status"] = {"l" : '{{sts_sts}}', "width": '30px'};

		// Prepare the list
		for(x in data["var"]){
			$v = data["var"][x];

			if($v['status'] == 1){
				var sts_status = '<i class="fas success fa-running mr-2"></i>{{sts_running}}';
			}else{
				var sts_status = '<i class="fas danger fa-times-circle mr-2"></i>{{sts_stopped}}';
			}
			data["var"][x]["time"] = $v['datified_time'];
			data["var"][x]["status"] = sts_status;
		}
		// Form the TABLE
		drawTable({'id' : 'statustable_div', 'tid' : 'statustable', 'class' : 'table'}, cols, data["var"]);

		$("#statustable").dataTable({
				"order": [[ 0, "desc" ]]
			}
		);

	});

};

function show_logs_window(){

	AJAX('[[API]]act=logs&svs=' + N['vpsid'], function(data) {

		var cols = new Object();
		cols["time"] = {"l" : '{{log_date}}', "width": '150px'};
		cols["action_text"] = {"l" : '{{log_task}}', "width": '60px'};
		cols["status"] = {"l" : '{{log_status}}', "width": '35px'};
		cols["ip"] = {"l" : '{{log_ip}}', "width": '35px'};

		// Prepare the list
		for(x in data["logs"]){
			$v = data["logs"][x];
			if($v['status'] == 1){
				var sts_status = '<font color="#06d79c">{{log_success}}</font>';
			}else{
				var sts_status = '<font color="#FF0000">{{log_fail}}</font>';
			}
			data["logs"][x]["time"] = nDate($v['time']);
			data["logs"][x]["status"] = sts_status;
		}
		// Form the TABLE
		drawTable({'id' : 'logs_div', 'tid' : 'logstable', 'class':'table border tasks_table w-100 text-left'}, cols, data["logs"]);

		$("#logstable").dataTable({
				"order": [[ 0, "desc" ]]
			}
		);

	});
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

	toggleModal('show_self_shutdown_window_modal');
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

		modalConfirm(function(confirm){
			if(confirm){
				submitit('shutdown_form', 'response_shutdown');
			}else{
				return false;
			}
		},'{{sd_confirm_submit}}');

	} else if (id[0] == "deleteTimer"){

		modalConfirm(function(confirm){
			if(confirm){
				$("#delete_timer").val(id[1]);
				submitit('shutdown_form', 'response_shutdown');
			}else{
				return false;
			}
		},"{{sd_confirm_delete}}");

	} else {
		error_alert("{{sd_date_alert}}");
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

		table_cols["id"] = {"l" : '{{id}}', "width": '30px'};
		table_cols["date"] = {"l" : '{{date}}', "width": '30px'};
		table_cols["hours"] = {"l" : '{{hour}}', "width": '20px'};
		table_cols["minutes"] = {"l" : '{{minute}}', "width": '20px'};
		table_cols["show_action"] = {"l" : '{{sd_action_title}}', "width": '30px'};
		table_cols["show_status"] = {"l" : '{{state}}', "width": '30px'};

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
					table_data[key]["show_status"] = '<i class="far fa-trash-alt delete fa-1x mr-2" aria-hidden="true" title="{{delete}}" id="deleteTimer_'+ data["self_shutdown"][key].id +'" onclick="submit_self_shutdown_form(this);"></i><i class="far fa-edit edit fa-1x" title="{{edit}}" id="editTimer_'+ data["self_shutdown"][key].id +'" onclick="edit_self_shutdown(this);"></i>';
				}else{
					table_data[key]["show_status"] = '<i class="fas fa-check start" title="{{done}}"></i>';
				}
			});
		}

		if(!empty(table_data)){
			$("#shutdown_links").show();
			drawTable({'id' : 'shutdown_details_div', 'tid' : 'shutdown_details', 'width' : '95%'}, table_cols, table_data);
		}

	}
};

function show_system_alerts_window(){

	AJAX('[[API]]act=system_alerts&svs=' + N['vpsid'], function(data) {

		var cols = new Object();
		cols["time"] = {"l" : '{{time}}'};
		cols["cpu"] = {"l" : '{{cpu}}'};
		cols["ram"] = {"l" : '{{ram}}'};
		cols["disk"] = {"l" : '{{disk}}'};

		// Prepare the list
		for(x in data["alerts"]){
			$v = data["alerts"][x];
			data["alerts"][x]["time"] = nDate($v['time'], '');
			data["alerts"][x]["cpu"] = '<font class="'+ ($v['cpu'] > 75 ? 'sysred' : ($v['cpu'] > 50 ? 'sysyellow' : 'sysgreen'))+'">'+$v['cpu']+'</font>';
			data["alerts"][x]["ram"] = '<font class="'+ ($v['ram'] > 75 ? 'sysred' : ($v['ram'] > 50 ? 'sysyellow' : 'sysgreen'))+'">'+$v['ram']+'</font>';
			data["alerts"][x]["disk"] = '<font class="'+ ($v['disk'] > 75 ? 'sysred' : ($v['disk'] > 50 ? 'sysyellow' : 'sysgreen'))+'">'+$v['disk']+'</font>';
		}
		// Form the TABLE
		drawTable({'id' : 'system_alerts_div', 'tid' : 'system_alertstable', "width" : '80%'}, cols, data["alerts"]);

		$("#system_alertstable").dataTable();

	});

	toggleModal('show_system_alerts_window_modal');
};

// Show the usersettings
function usersettings_onload(){

	// timezone array for backward compatibility
	var mapped_timezones = N['mapped_timezones']

	if(N['timezone'] in mapped_timezones){
		N['timezone'] = mapped_timezones[N['timezone']];
	}

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
	timezones = N['timezones_new'];

	var options = '';
	var tzone = '';
	
	$.each(timezones, function(key, value){
		options += `<optgroup label="${key}">`
		$.each(value, function(timezone, timezone_name){
			if(N['timezone'] == timezone){
				tzone = timezone; 
			}
			options += `<option value="${timezone}">${timezone_name}</option>`
		})
	});

	$("#usersettings_timezone").html(options);
	$("#usersettings_timezone").select2({width:'100%'});
	setTimeout(() => {
		$("#usersettings_timezone").val(tzone).trigger('change');
	}, 5);

	// Should we show the logo URL option ?
	if(N["user_type"] == 2){
		$("#site_iden_settings, #user_site_setting, #leg_pol_settings").show();

		if(!empty(N['allow_cloud_dom_name'])){
			$("#cuser_dom_name").show();
		}

	}else{
		$("#cuser_dom_name, #user_site_setting, #site_iden_settings, #leg_pol_settings").hide();
	}

	// We save 0% bandwidth threshold as -1 and hence we need to convert it back
	if(N['preferences']['vps_bandwidth_threshold'] == -1 || N['preferences']['vps_bandwidth_threshold'] == null) {
		N['preferences']['vps_bandwidth_threshold'] = 0;
	}

	// Parse the variables
	parseVars("usersettings", N["preferences"]);

};

//Json beautify block
function jsonViewer(json, collapsible=false) {
	var TEMPLATES = {
		item: '<div class="json__item"><div class="json__key">%KEY%</div><div class="json__value json__value--%TYPE%">%VALUE%</div></div>',
		itemCollapsible: '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>',
		itemCollapsibleOpen: '<label class="json__item json__item--collapsible"><input type="checkbox" class="json__toggle"/><div class="json__key">%KEY%</div><div class="json__value json__value--type-%TYPE%">%VALUE%</div>%CHILDREN%</label>'
	};

	function createItem(key, value, type){
		var element = TEMPLATES.item.replace('%KEY%', key);

		if(type == 'string') {
			element = element.replace('%VALUE%', '"' + value + '"');
		} else {
			element = element.replace('%VALUE%', value);
		}

		element = element.replace('%TYPE%', type);

		return element;
	}

	function createCollapsibleItem(key, value, type, children){
		var tpl = 'itemCollapsible';
		
		if(collapsible) {
			tpl = 'itemCollapsibleOpen';
		}
		
		var element = TEMPLATES[tpl].replace('%KEY%', key);

		element = element.replace('%VALUE%', type);
		element = element.replace('%TYPE%', type);
		element = element.replace('%CHILDREN%', children);

		return element;
	}

	function handleChildren(key, value, type) {
		var html = '';

		for(var item in value) { 
			var _key = item,
				_val = value[item];

			html += handleItem(_key, _val);
		}

		return createCollapsibleItem(key, value, type, html);
	}

	function handleItem(key, value) {
		var type = typeof value;

		if(typeof value === 'object') {        
			return handleChildren(key, value, type);
		}

		return createItem(key, value, type);
	}

	function parseObject(obj) {
		_result = '<div class="json">';

		for(var item in obj) { 
			var key = item,
				value = obj[item];

			_result += handleItem(key, value);
		}

		_result += '</div>';

		return _result;
	}
	
	return parseObject(json);
};
//Json beautify block End

// API Key wizard
function apikey_onload(){

	if(isError()){
		error(N["error"]);
		return -1;
	}

	if(N['apikeys'] == ""){
		$('#apikeyslist').html('<div class="notice">{{apik_no_key}}</div>');
		$('#no_table_api').show();
		return;
	}

	//Prepar the table list
	if(!empty(N['api_logs'])){
		var tdata = '<thead><tr>';
		var api_iterator;
		var sign_status = 0;

		tdata += '<th>{{id}}</th>';
		tdata += '<th>{{api_id}}</th>';
		tdata += '<th>{{vpsid}}</th>';
		tdata += '<th>{{from_ip}}</th>';
		tdata += '<th>{{action}}</th>';
		tdata += '<th>{{time}}</th>';
		tdata += '<th>{{data}}</th>';
		tdata += '<th>{{status}}</th>';
		tdata += '</tr></thead>';
		tdata += '<tr>';
		//console.log(N['api_logs']);
		$.each(N['api_logs'], function (i) {
				if(empty(N['api_logs'][i].status )){
					sign_status = '<div style="text-align:center;"><i class="fas fa-1x fa-check-circle text-primary"></i></div>';
				}else{
					sign_status = '<div style="text-align:center;"><i class="fas fa-1x fa-times-circle stop"></i></div>';
				}

				var data_to = N['api_logs'][i].data;
				var data_too = '';
				data_to = JSON.parse(data_to);
				//console.log(data_to);
				data_too += jsonViewer(data_to, true);

				tdata += '<td>'+ N['api_logs'][i].id +'</td>';
				tdata += '<td>'+ N['api_logs'][i].api_id +'</td>';
				tdata += '<td>'+ N['api_logs'][i].vpsid +'</td>';
				tdata += '<td>'+ N['api_logs'][i].from_ip +'</td>';
				tdata += '<td>'+ vlang[N['api_logs'][i].action] +'</td>';
				tdata += '<td>'+ nDate(N['api_logs'][i].time, 'd/m/Y H:i:s') +'</td>';
				tdata += '<td>'+ data_too +'</td>';
				tdata += '<td>'+ sign_status +'</td>';
				tdata += '</tr>';
		});
	
		$('#no_table_api').hide();
		$('#api_table').show();
		$('#apitable').html(tdata);
	
		$("#apitable").dataTable({
			"order": [[ 0, "desc" ]],
			'columnDefs': [
				{ "width": "5%", "targets": [0,1,2] },
				{ "width": "40%", "targets": [6] },
				{ "width": "15%", "targets": [3] },
				{ "width": "20%", "targets": [5] },
			],
			"bDestroy": true,
			autoWidth: false
		});
	}else{
		$('#no_table_api').show();
		$('#api_table').hide();
	}

	var cols = new Object();
	cols["apikey"] = {"l" : '{{apik_h_apikey}}', "width": '30px'};
	cols["apipass"] = {"l" : '{{apik_h_apipass}}'};
	cols["ip"] = {"l" : '{{apik_h_apiip}}'};
	cols["manage"] = {"l" : '{{manage}}', "width" : '5%', "class" : 'text-center'};

	// Prepare the list
	for(x in N["apikeys"]){
		$v = N["apikeys"][x];
		N["apikeys"][x]["manage"] = '<div class="d-flex"><a href="javascript:loadpage(\'act=editapi&idapi='+N["apikeys"][x]["idapi"]+'\')" class="mx-2"><i class="far edit fa-1x fa-edit text-yellow-600" tooltip="{{edit}}"></i></a>\
		<a href="javascript:delapikey('+x+')" class="mx-2"><i class="far fa-1x fa-trash-alt danger" aria-hidden="true" tooltip="{{delete}}"></i></a>\
		<a href="javascript:resetapikey('+x+')" class="mx-2"><i class="fas fa-1x fa-sync-alt text-blue-600" aria-hidden="true" tooltip="{{reset_api_key}}"></i></a></div>';

		if(!empty(N["apikeys"][x]["ip"])){
			var final = JSON.parse(N["apikeys"][x]["ip"]);
			N["apikeys"][x]["ip"] = final;
		}else{
			N["apikeys"][x]["ip"] = '{{all_ip}}';
		}
	}
	
	// Form the TABLE
	drawTable({'id' : 'apikeyslist', 'tid' : 'apikey_list_table', "width" : '80%'}, cols, N["apikeys"]);
	showtooltip();
};

// Add an API KEY
function addapikey(){
	call('[[API]]'+'act=apikey&do=add');
};

// Deletes an API KEY
function delapikey(key){
	modalConfirm(function(confirm){
		if(confirm){
			call('[[API]]'+'act=apikey&del='+key);
		}else{
			return false;
		}
	},"{{del_apikey}}");
};

// Reset an API KEY
function resetapikey(key){
	modalConfirm(function(confirm){
		if(confirm){
			call('[[API]]'+'act=apikey&resetapikey='+key);
		}else{
			return false;
		}
	},"{{reset_apikey}}");
};

function delisokey(data){
	
	data = data || 0;
	var ids = [];
  
	if(empty(data) && $("#iso_options").val() == 0){
		showToast('toast-warning', '{{lst_no_option_sel}}');
		return false;
	}
	
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
		showToast('toast-warning', '{{lst_no_vps_sel}}');
		return;
	}
	
	var fids = new Object();
	fids['act']='euiso';
	fids['del'] = ids.join(",");
	
	var url = '[[API]]'+$.param(fids);

	modalConfirm(function(confirm){
		if(confirm){
			call(url);
		}else{
			return false;
		}
	},"{{euiso_iso_del_confirm}}");

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
	cols["edituser"] = {"l" : '{{edit}}', "width" : '5%'};
	cols["deluser"] = {"l" : '{{delete}}', "width" : '5%'};

	// Prepare the list
	for(x in N["user_list"]){
		$v = N["user_list"][x];
		N["user_list"][x]["edituser"] = '<a href="javascript:loadpage(\'act=edituser&uid='+x+'\')"><i class="far fa-edit fa-1x edit-icon"></i></a>';
		N["user_list"][x]["deluser"] = '<a href="javascript:delusers('+x+','+N["page"]["cur_page"]+', \''+N["user_list"][x]['email']+'\')" class="areload"><i class="far fa-1x fa-trash-alt danger" aria-hidden="true" title="{{delete}}"></i></a>';
	}

	pageLinks("userslist-link", 'act=users', N['page']);

	// Form the TABLE
	drawTable({'id' : 'userslist', 'tid' : 'users_list_table', "width" : '80%'}, cols, N["user_list"]);
	
};

// Add User onshow
function adduser_onshow(){
	$('#adu_user_email').val("");
	$('#adu_user_password').val("");
};

// Delete the user
function delusers(id, page, email){

	modalConfirm(function(confirm){
		if(confirm){
			call('act=users&delete='+id+'&page='+page);
		}else{
			loadpage('act=users');
		}
	},"{{usr_del_conf}} "+email+" ?");
};

// Edit User Wizard
function edituser_onload(){

	// Set the action correctly
	$("#edituserform").attr("action", "act=edituser&uid="+N["edit_user"]['uid']);

	// Parse the variables to load the default ones
	parseVars("edituser", N["edit_user"]);

};

// List Recipe Wizard
function recipes_onload(){

	// First Clear the Div
	$('#recipeslist').html("");

	$('#no_recipe').hide();	

	if(isError()){
		error(N["error"]);
		return -1;
	}

	var options = '';
	$.each(N["allowed_shells"], function(k, v){
		options += `<option value="`+k+`">`+k+`</option>`;
	});

	$("#shell").html(options);

	// Are there any recipes ?
	if(!("recipe_list" in N) || N['recipe_list'] == ''){
		$('#no_recipe').show();
		$('#recipeslist-link').hide();
		return;
	}else{

		var cols = new Object();
		cols["name"] = {"l" : '{{adr_recipe_name}}'};
		cols["editrecipe"] = {"l" : '{{edit}}', "width" : '5%'};
		cols["delrecipe"] = {"l" : '{{delete}}', "width" : '5%'};
		// Prepare the list
		for(x in N["recipe_list"]){
			$v = N["recipe_list"][x];
			N["recipe_list"][x]["editrecipe"] = '<a href="javascript:loadpage(\'act=editrecipe&rid='+x+'\')"><i class="far edit fa-1x fa-edit text-yellow-600"></i></a>';
			N["recipe_list"][x]["delrecipe"] = '<a href="javascript:delrecipe('+x+','+N["page"]["cur_page"]+', \''+N["recipe_list"][x]['name']+'\')" class="areload"><i class="far fa-1x fa-trash-alt delete danger" aria-hidden="true" title="{{delete}}"></i></a>';
		}

		pageLinks("recipeslist-link", 'act=recipes', N['page']);

		// Form the TABLE
		drawTable({'id' : 'recipeslist', 'rid' : 'recipes_list_table', "width" : '80%'}, cols, N["recipe_list"]);
	}
};


// Delete the Recipe
function delrecipe(id, page, name){

	modalConfirm(function(confirm){
		if(confirm){
			call('act=recipes&delete='+id+'&page='+page);
		}else{
			loadpage('act=recipes');
		}
	},"{{rcp_del_conf}} "+name+" ?");
};

// Edit Recipe Wizard
function editrecipe_onload(){

	var options = ''
	for (var k in N['allowed_shells']) {
		if (N['allowed_shells'].hasOwnProperty(k)) {
			var v = N['allowed_shells'][k];
			options += '<option value="' + k + '" ' + ((N["edit_recipe"]["shell"] == v) ? 'selected="selected"' : '') + '>' + k + '</option>';
		}
	}
	
	$("#shell_type").html(options);

	// Set the action correctly
	$("#editrecipeform").attr("action", "act=editrecipe&rid="+N['edit_recipe']['rid']);

	// Parse the variables to load the default ones
	parseVars("editrecipe", N["edit_recipe"]);
};


// Edit API Wizard
function editapi_onload(){
	if(empty(N['edit_api']['ip'])){
		$('#edit_ip_addresses').val('');
	}else{
		var final_ips = JSON.parse(N['edit_api']['ip']);
		$('#edit_ip_addresses').val(final_ips);
	}
	$('#edit_enable_logging').prop('checked', false);
	if(!empty(N['edit_api']['logging'])){
		$('#edit_enable_logging').prop('checked', true);
	}
	$('#editapi_id').val(N['edit_api']['idapi']);
};

function twofactauth_onload(){
	
	$('#twofactauth_passcode').val("");

	AJAX('[[API]]act=twofactauth', function(data) {

		$('#otp_email_user').html(data['username']);
		
		var selected_type = 'none'
		
		if(!empty(data['twofactauth']['2fa_type'])){
			selected_type = data['twofactauth']['2fa_type'];
		}
		
		$("#2fa_type").val(selected_type);
		
		// Display the QR Code Always
		$('#qrcode').html('<img class="border mt-3" src="'+data["twofactauth"]["qrcode"]+'" />');
		
		// Display the Secret Code Always
		$('#secret_key').html(data['twofactauth']['secret_key']);
		$('#secret_key_val').val(data['twofactauth']['secret_key']);
		
		show_otp_divs();

	});
	
};

function show_otp_divs(){
	
	$(".otp_methods_div").css("display", "none");
	
	//alert($("#2fa_type").val())
	var show_div = $("#2fa_type").val()+'_otp_div';
	$("#"+show_div).show();
	if($("#2fa_type").val() != 'none'){
		$('#otp_input_div').show();
	}
};

function reset_otp_key(){

	modalConfirm(function(confirm){
		if(confirm){
			AJAX('[[API]]'+'act=twofactauth&reset_secret_key=1', function(data) {
				var twofa = data['twofactauth'];
				//alert(twofa['secret_key'])
				$("#secret_key").html(twofa['secret_key']);
				$("#secret_key_val").val(twofa['secret_key']);
				$('#qrcode').html('<img src="'+twofa["qrcode"]+'" />');
			});
		}else{
			return false;
		}
	},"{{twofactauth_secret_key_conf}}");
};

function send_passcode(){
	call('[[API]]'+'act=twofactauth&email_passcode=1');
}

function show_rdns(){
	loadpage('act=rdns');
}

// rDNS Wizard
function rdns_onload(){

	// Clean the div of rdnslist
	$('#rdnslist').html("");
	$("#no_rdns").hide();
	
	$("#rdns_ip").on("select2:close", function(event){
		ele = $("#select2-rdns_ip-results")
		.parent(".select2-results")
		.prev(".select2-search")
		.find(".select2-search__field");
		ele.unbind();
		event.stopImmediatePropagation();
	});


	
	$('#rdns_ip').select2({
		width:"100%",
		ajax: {
			type: "POST",
			dataType: 'json',
			delay: 250,
			url: "[[API]]act=rdns&search_rdns=1",
			data: function (params) {
				return {
					search: params.term
				};
			},
			processResults: function (data) {
				return {
					results: $.map(data['allowed_ip'], function (obj) {
						
						let vv = [], opt = [];
						
						if (obj['ipv6'] !== '' && obj['ipr_netmask'] !== '') {
							for (let y in obj['ipr_ips']) {
								vv.push(obj['ipr_ips'][y]);
								opt.push(obj['ipr_ips'][y] + ' (' + obj["hostname"] + ')');
							}
						} else {
							vv.push(obj['ip']);
							opt.push(obj['ip'] + ' (' + obj["hostname"] + ')');
						}
			
						return vv.map((ip, index) => {
							return { id: ip, text: opt[index] };
						});
					}).flat() // Flattening the array of arrays
				};
			},
		},
	});
	

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

	AJAX('[[API]]act=rdns', function(data) {
	
		if(data["rdns_records"] == null){
			$("#no_rdns").show();
			$('#records-rdns .pagination-top, #records-rdns .pagination-bottom').hide();
			return false;
		}

		var cols = new Object();
		cols["id"] = {"l" : '{{id}}', "width": '30px'};
		cols["ip"] = {"l" : '{{ip}}'};
		cols["name"] = {"l" : '{{name}}'};
		cols["content"] = {"l" : '{{domain}}'};
		cols["delete"] = {"l" : ''};

		pageNum = getParameterByName('page', 1);
		pageNum = empty(pageNum) ? 1 : pageNum;

		// Prepare the list
		let inc_counter = ((pageNum - 1) * 50) + 1;
		for(x in data["rdns_records"]){
			$v = data["rdns_records"][x];
			data["rdns_records"][x]["delete"] = '<a href="javascript:delrdns(\''+x+'\')" ><i class="far fa-trash-alt delete-icon fa-1x"></i></a>';
			if(x.includes('id')){
				data["rdns_records"][x]["delete"] = 'NA';
			}
			data["rdns_records"][x]['id'] = inc_counter++;
		}

		pageLinks("records-rdns", 'act=rdns', data['page']);

		// Form the TABLE
		drawTable({'id' : 'rdnslist', 'tid' : 'rdnslist_table', "width" : '100%'}, cols, data["rdns_records"]);

	});
};

// Delete rDNS
function delrdns(id){
	modalConfirm(function(confirm){
		if(confirm){
			pageNum = getParameterByName('page', 1);
			call('[[API]]'+'act=rdns&delete='+id+'&page='+pageNum);
			rdns_onload();
		}else{
			return false;
		}
	},"{{del_rdns}}");
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
	$("#no_pdns").hide();

	// Select DNS Server for Zone entries
	let deafult_pdns_id = N["default_pdns_id"];
	var txt = [];
	for(x in N["user_pdns_servers"]){
		$v = N["user_pdns_servers"][x];
		txt.push('<option value="'+x+'" >'+ $v['name'] + (deafult_pdns_id == x ? ' (DNS Plan)' : '')+'</option>');
	}
	$("#user_pdns_servers").html(txt.join(''));
	
	if(empty(N["domains"])){
		$("#no_pdns").show();
		return false;
	}

	var cols = new Object();
	cols["id"] = {"l" : '{{id}}', "width": '30px'};
	cols["pdns_server"] = {"l" : '{{pdns_server}}'};
	cols["name"] = {"l" : '{{domain}}'};
	cols["manage"] = {"l" : '{{manage}}', "width": '30px'};

	// Prepare the list
	let inc_counter = 1;
	for(x in N["domains"]){
		$v = N["domains"][x];
		N["domains"][x]["manage"] = '<a href="javascript:loadpage(\'act=managezone&domainid='+x+'\')" ><i class="fa fa-cogs settings fa-1x blue-icon mr-3"></i></a><a href="javascript:delpdns(\''+x+'\')" ><i class="far fa-trash-alt delete-icon fa-1x"></i></a>';
		N["domains"][x]['id'] = inc_counter++;
	}

	// Form the TABLE
	drawTable({'id' : 'pdnslist', 'tid' : 'pdnslist_table'}, cols, N["domains"]);

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

	$("#no_records").hide();
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
	cols["id"] = {"l" : '{{id}}', "width": '30px'};
	cols["name"] = {"l" : '{{mz_host}}'};
	cols["type"] = {"l" : '{{mz_type}}'};
	cols["content"] = {"l" : '{{mz_points_to}} / {{mz_txt_value}}'};
	cols["prio"] = {"l" : '{{mz_priority}}'};
	cols["ttl"] = {"l" : '{{mz_ttl}}'};
	cols["manage"] = {"l" : '', "width": '30px'};
	cols["delete"] = {"l" : '', "width": '30px'};

	if(empty(N["records"])){
		$("#no_records").show();
		return false;
	}

	// Prepare the list
	for(x in N["records"]){
		$v = N["records"][x];
		N["records"][x]["manage"] = '<a href="javascript:editpdns_zone('+x+')" ><i class="far fa-edit fa-1x edit-icon ml-2"></i></a>';
		N["records"][x]["delete"] = '<a href="javascript:delpdns_zone(\''+N['get_domain_id']+'\','+x+')" ><i class="far fa-trash-alt delete-icon fa-1x"></i></a>';
	}

	// Form the TABLE
	drawTable({'id' : 'managezonelist', 'tid' : 'managezonelist_table', "width" : '100%'}, cols, N["records"]);

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

	// Show the modal
	toggleModal('show_addrecord_form');
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
	$('#edittype_val').val(N['records'][zone_id]['type']);
	$('#editcontent').val(N['records'][zone_id]['content']);
	$('#editprio').val(N['records'][zone_id]['prio']);
	$('#editttl').val(N['records'][zone_id]['ttl']);

	// Show the modal
	toggleModal('show_editrecord_form');
};

function delpdns_zone(domain_id, zone_id){
	call('[[API]]act=managezone&domainid='+domain_id+'&delete='+zone_id);
};


// Create wizard (Launch Instance)
function create_onload(){

	$('#create_hostname input').slice(1).remove();

	var notice = '';

	if(N['resources']['num_vs'] < 1 && !empty(N['res_limit']['num_vs'])){
		notice = '{{li_num_vs_over}}';
	}

	if(!empty(N['error'])){
		if('insufficient_balance' in N['error']){
			notice = '{{li_insufficient_balance}}';
		}
	}

	if(!empty(notice)){
		$('#createlist').html("");
		$('#createlist').html(`<div class="notice">${notice}</div>`);
		return;
	}

	$("#firewall_rules_table").hide();
	// reset the notice
	$('#vm_count_notice').text('');

	$('.adv_border, #tr_ipv4, #tr_ip_int, #tr_ipv6subnet, #tr_ipv6').hide();

	var hidden_fields = new Array();
	hidden_fields = ['osid', 'plid'];

	$.each(hidden_fields, function(k, v){
		$('#createform #'+v).val('');
	});
	
	// Is it inhouse billing ?
	if(!empty(N['inhouse_billing'])){

		$('#ihb_div').hide();
		
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
	var unlimited_lang = '<i class=\'fas fa-infinity\'></i>';

	// Show the user list
	var txt = [];
	txt.push('<option value="0">{{li_add_user}}</option>');
	for(x in N['users']){
		txt.push('<option value="'+ x +'" '+(x == N['uid'] ? 'selected="selected"' : '')+'>'+ N["users"][x]['email'] +'</option>');
	}

	$("#li_uid").html(txt.join(''));
	var txt = [];
	txt.push('<option value="0">{{li_none}}</option>');
	for(x in N['firewall_plans']){
		txt.push('<option value="'+ x +'" >'+ N["firewall_plans"][x]['fw_plan_name'] +'</option>');
	}
	$("#li_fwid").html(txt.join(''));
	
	// Load the regions (server groups)
	var txt = [];

	let svg_region_flag = '<svg fill="#0075ff" class="h-8 inline" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m0 22H4V8h28Z" class="clr-i-outline clr-i-outline-path-1"/><path d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2" class="clr-i-outline clr-i-outline-path-2"/><path d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2" class="clr-i-outline clr-i-outline-path-3"/><path d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2" class="clr-i-outline clr-i-outline-path-4"/></svg>';

	let user_regions_html = '<div class="flex flex-row flex-wrap lg:gap-5 md:gap-5 xl:gap-5 px-4 pb-2">';

	for(x in N['servergroups']){
		if(!empty(N["servergroups"][x]['virts'])){
			
			user_regions_html += `
			<div class="region-card flex items-center justify-between" onclick="select_region('`+x+`')" id="region_id_`+x+`">
				<div class="region-flag p-2">`
				+svg_region_flag+`
				</div>
				<div class="region-info">`+N["servergroups"][x]['sg_reseller_name']+`
				</div>
			</div>`;
		}
	}

	user_regions_html += '</div>';
	$("#user_regions").html(user_regions_html);

	// Load the virtualizations
	var txt = [];
	txt.push('<option value="0">{{li_none}}</option>');
	for(x in N['virts']){
		
		txt.push('<option value="'+ [x] +'" id="virt_'+ [x] +'">'+ N['virt_lang'][x] +'</option>');
	}

	$("#virt").html(txt.join(''));
	
	// Load isos
	var txt = [];
	txt.push('<option value="0">{{li_none}}</option>');
	if('isos' in N){
		var iso_list = '<option value="0">{{hvm_none}}</option>';
		var options_eu_iso = options_iso = '';
		for(x in N['isos']){
			if(!empty(N['isos'][x]['isuseriso'])){
				options_eu_iso += '<option value="'+ x +'">'+ N['isos'][x]['name'] +'</option>';
			}else{
				options_iso += '<option value="'+ x +'">'+ N['isos'][x]['name'] +'</option>';
			}
		}
		if(!empty(options_iso)){
			iso_list += '<optgroup label="{{hvm_admin_iso}}">' + options_iso + '</optgroup>';
		}
		if(!empty(options_eu_iso)){
			iso_list += '<optgroup label="{{hvm_user_iso}}">' + options_eu_iso + '</optgroup>';
		}
	}

	$("#iso_select").html(iso_list);

	if('num_ipv4' in N['resources']){
		$('#num_ipv4').html(N['resources']['num_ipv4']);
		$('#tr_ipv4').show();
	}

	if('num_ip_int' in N['resources'] && N['resources']['num_ip_int'] > 0){
		$('#num_ip_int').html(N['resources']['num_ip_int']);
		$('#tr_ip_int').show();
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
	// $('#cpu_cores_title').tooltip({ title:'{{li_cpucore_exp}} '+N['resources']['cores']});
	$('#max_cores').html(N['resources']['cores']);
	$('#max_space').html(N['resources']['space_per_vm']);
	$('#avail_cores').html(avail_cores);

	// For advance options
	if(N['resources']['network_speed'] > -1){

		if(empty(N['inhouse_billing'])){
			$("#adv_options").removeClass('hidden');
		}

		$('#li_network_speed_div').show();

		// Load speeds
		var last = 0;
		var order = [];
		var network_speed_values = Array(128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280, 1920, 2560, 3849, 5120, 6400, 7680, 8960, 10240, 11520, 12800, 128000, 1280000);

		for(x in network_speed_values){
			order.push(parseFloat(network_speed_values[x]));
		}

		order.sort(function(a,b){return a-b});
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');

		if(empty(N['resources']['network_speed'])){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < N['resources']['network_speed'] && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
				}
			}

			if(N['resources']['network_speed'] < last){
				txt.push('<option value="'+ N['resources']['network_speed'] +'">'+ N['resources']['network_speed'] +' KB/s </option>');
			}
		}

		$("#network_speed2").html(txt.join(''));

		// Load the upload speed
		var last = 0;
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');
		
		var tmp_up_lim = N['resources']['upload_speed'];
		if(tmp_up_lim == -1){
			tmp_up_lim = N['resources']['network_speed'];
		}
		
		if(tmp_up_lim == 0){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < tmp_up_lim && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
				}
			}

			if(tmp_up_lim < last){
				txt.push('<option value="'+ tmp_up_lim +'">'+ tmp_up_lim +' KB/s </option>');
			}
		}
		$("#upload_speed2").html(txt.join(''));

	}

	$('#vm_count_plus').unbind().click(function(){

		// get the count from input
		var count = $('#vm_count').val();
		$('#vm_count_notice').text('');

		// max limit is 10. so if its greater than 10 then return.
		if(count >= 10){
			$('#vm_count_notice').text('{{vm_count_max}}');
			return false;
		}
		
		// increase the count
		count++;

		// update the count on input
		$('#vm_count').val(count);

		// clone the hostname field
		var ele = $('#hostname-1').clone(true);

		// change the id
		ele = ele.clone().prop('id', 'hostname-'+count);

		// change the value
		var value = $(ele).val();
		value = value+'-'+count;
		ele = ele.prop('value', value);
		ele.addClass('add_host');
		// add the new field
		$('#hostname-'+(count - 1)).after(ele);

	});

	$('#vm_count_minus').unbind().click(function(){

		// get the count from input
		var count = $('#vm_count').val();
		$('#vm_count_notice').text('');

		// count should not be less than 1.
		if(count <= 1){
			$('#vm_count_notice').text('{{vm_count_min}}');
			return false;
		}
		
		// remove the field
		$('#hostname-'+count).remove();

		// decrease the count
		count--;

		// update the count on input
		$('#vm_count').val(count);

	});


	$('#vm_count').change(function(){

		// get the count from input
		var count = $('#vm_count').val();

		$('#vm_count_notice').text('');

		// min is 1 and max is 10
		if(count > 10){
			$('#vm_count_notice').text('{{vm_count_max}}');
			return false;
		}

		if(count < 1){
			$('#vm_count_notice').text('{{vm_count_min}}');
			return false;
		}

		// remove all the fields except the first.
		$('#create_hostname input').slice(1).remove();

		// add the fields according to the count
		for (let index = 1; index < count; index++) {

			var ele = $('#hostname-1').clone(true);
			ele = ele.clone().prop('id', 'hostname-'+(index + 1));
			var value = $(ele).val();
			value = value+'-'+(index+1);
			ele = ele.prop('value', value);
			$('#hostname-'+index).after(ele);

		}

	});

	if(!empty(N["ssh_keys"])){
		let html = `<div class="m-2"><select name="existing_key[]" class="custom-select virt-select select2" id="create_existing_keys" data-placeholder="{{sel_ssh_key}}" multiple>`;
		$.each(N["ssh_keys"], function(k, v){
			html += `<option value="`+v["value"]+`">`+v["name"]+`</option>`;
		})
		html += `</select></div>`
		$("#existing_keys_div").append(html);
		$("#create_existing_keys").select2({width:"100%"});
	}else{
		$("#existing_keys_div").append(`<div class="notice">{{no_ssh_keys}}</div>`);
	}

	handle_ssh_settings();
	
};

function select_region(region_id, prefix){

	prefix = prefix || '';
	let region_select_icon = '<svg id="'+prefix+'region_select_icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute h-7 top-[.6rem] right-1 fill-[#0075ff] dark:fill-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.559 3.697a3 3 0 0 1 4.882 0l.19.267a1 1 0 0 0 .925.413l.849-.095a3 3 0 0 1 3.313 3.313l-.095.85a1 1 0 0 0 .413.923l.267.19a3 3 0 0 1 0 4.883l-.267.19a1 1 0 0 0-.413.925l.095.849a3 3 0 0 1-3.313 3.313l-.85-.095a1 1 0 0 0-.923.413l-.19.267a3 3 0 0 1-4.883 0l-.19-.267a1 1 0 0 0-.925-.413l-.849.095a3 3 0 0 1-3.313-3.313l.095-.85a1 1 0 0 0-.413-.923l-.267-.19a3 3 0 0 1 0-4.883l.267-.19a1 1 0 0 0 .413-.925l-.095-.849a3 3 0 0 1 3.313-3.313l.85.095a1 1 0 0 0 .923-.413zm6.148 5.596a1 1 0 0 1 0 1.414l-3.819 3.819c-.49.49-1.286.49-1.776 0l-1.82-1.819a1 1 0 1 1 1.415-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0"></path></svg>';

	$("."+prefix+"region-card").removeClass(prefix+'selected_region');
	$("#"+prefix+"region_select_icon").remove();
	$("#"+prefix+"region_id_"+region_id).addClass(prefix+'selected_region');
	$("#"+prefix+"region_id_"+region_id).append(region_select_icon);
	$("#"+prefix+"sgid").val(region_id);
	fill_virts(prefix);
}

let add_ssh_event = 0;
function handle_ssh_settings(prefix){

	if(!empty(N['disable_enduser_sshkeys'])){
		$('.disable_eu_sshkeys').hide();
		return;
	}

	prefix = prefix || '';
	var sshkeys = '';
	if("info" in N && !empty(N['info']["ssh_keys"])){
		sshkeys = N['info']["ssh_keys"];
	}

	if(!empty(N["ssh_keys"])){
		sshkeys = N["ssh_keys"];
	}
	
	if(!empty(sshkeys)){
		let html = `<div class="m-2"><select name="existing_key[]" class="custom-select virt-select select2" id=""+prefix+"create_existing_keys" data-placeholder="{{sel_ssh_key}}" multiple>`;
		$.each(sshkeys, function(k, v){
			html += `<option value="`+v["value"]+`">`+v["name"]+`</option>`;
		})
		html += `</select></div>`
		$("#"+prefix+"existing_keys_div").append(html);
		$("#"+prefix+"create_existing_keys").select2({width:"100%"});
	}else{
		$("#"+prefix+"existing_keys_div").append(`<div class="notice">{{no_ssh_keys}}</div>`);
	}

	// $(".ssh_options").prop("checked", false);
	$("."+prefix+"add_ssh_keys_div").hide();
	$("."+prefix+"use_ssh_keys_div").hide();
	$("#"+prefix+"new_key_loader").hide();
	
	$(".ssh_options").unbind().on("click", function(){
		$("."+prefix+"add_ssh_keys_div").hide();
		$("."+prefix+"use_ssh_keys_div").hide();
		$("#"+prefix+"download_private").hide();
		$("#"+prefix+"new_key_loader").hide();
		$("#"+prefix+"sshkey, #"+prefix+"private_key").val("");
		$("#"+prefix+"sshkey").removeAttr("readonly");
		$("#"+prefix+"private_key_link").attr("href", "");

		// $("#"+$(this).attr("value")+"_div").show();

		if($(this).attr("value") == 'add_ssh_keys'){
			add_ssh_event = 1;
		}

		$("."+$(this).attr("value")+"_div").show();
		if($(this).attr("value") == "generate_keys"){
			$("#"+prefix+"new_key_loader").show();
			$("."+prefix+"generate_keys_div").show();
			add_ssh_event = 0
			$.ajax({
				type: "POST",
				url: "[[API]]act=create&generate_keys=1&api=json",
				dataType : "json",
				success:function(data){
					if(!empty(data["new_keys"]) && empty(add_ssh_event)){
						$("#"+prefix+"new_key_loader").hide();
						$("#"+prefix+"download_private").show();
						$("#"+prefix+"private_key_link").attr("href", "data:attachment/text," + encodeURI(data["new_keys"]["private_key"]))
						$("#"+prefix+"private_key_link").attr("download", "private_key")
						$("#"+prefix+"private_key_link")[0].click()
						$("#"+prefix+"sshkey").val(data["new_keys"]["public_key"])
						$("#"+prefix+"private_key").val(data["new_keys"]["private_key"])
						$("#"+prefix+"sshkey").attr("readonly", "readonly")
					}
				}
			});
		}
	})
};

function create_onshow(){

	var elementExists = document.getElementById('createform');

	if(elementExists == null){
		return;
	}

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

	fill_extra_fields();

	//	VNC pass lenght differs with virt type
	generate_vnc_pass('vncpass1', $('#createform').find('#virt').val());
	
	show_cpu_topology('#create');
	change_cpu_topology('#create');
	show_adv_options('#create', $('#createform').find('#virt').val());

};

function fill_extra_fields(prefix){

	prefix = prefix || '';

	$(".adv_border").hide();

	$("#"+prefix+"tr_nic").hide();
	
	if(empty(prefix)){
		generate_vnc_pass('vncpass1', $('#createform').find('#virt').val());
	}

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
	
	var virt_swap = ["lxc", "proxl", "proxk", "kvm", "vzk", "xcp", "vzo"];

	if(virt == "openvz" || virt == "proxo"){
		$("#"+prefix+"tr_burst").show();
		$("#"+prefix+"tr_swap").hide();		
	}else if(virt_swap.includes(virt)){
		$("#"+prefix+"tr_burst").hide();
		$("#"+prefix+"tr_swap").show();
	}
	
	if(virt == "kvm" && N['resources']['cloud_allow_virtio'] == 1){
		$('#'+prefix+'tr_virtio, #'+prefix+'disk-tab').show();
	}else{
		$("#"+prefix+"tr_virtio").hide();
	}

	// if(!empty(N['resources']['enable_iops_sec']) && virt == 'kvm'){
	// 	$(".iops_sec").show();
	// }else{
	// 	$(".iops_sec").hide();
	// }
	
	if(!empty(N['nic_support']) && !empty(N['nic_support'][virt]) && !empty(N['enable_nic'])){
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
	
		$("#"+prefix+"nic").html(nic_type_list);
		$("#"+prefix+"tr_nic").show();
	}
	
	//re_height();
	$(".adv_border").show();
	$('#cpu').hide();
	$('#disk').hide();

	$('#networking-tab').trigger('click');

	show_adv_options("#create", virt);
}

function generate_vnc_pass(ele, virt){
	$_(ele).value = randstr(!empty(N['vncpasslen'][virt]) ? N['vncpasslen'][virt] : 8);
}

// Edit Instance wizard (Edit Instance)
function editvm_onload(){

	var unlimited_lang = '<i class=\'fas fa-infinity\'></i>';
	
	$('#ei_tr_ips').hide();
	$('#ei_tr_ips_int').hide();
	$('#ei_tr_ipv6subnet').hide();
	$('#ei_tr_ipv6').hide();
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

	var distro_img = N['vps']['distro'] == '' ? 'others' : N['vps']['distro'];
	
	$('#ei_os_name').html("<div class='flex items-center'><img src='[[images]]"+distro_img+".png' width='35' height='35'>&nbsp&nbsp"+N['vps']['os_name']+"</div>");

	if(!empty(N['vps']['os_name'].match(/windows/gi))){
		$("#ei_vm_admin_name").val('Administrator');
	}else{
		$("#ei_vm_admin_name").val('root');
	}

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

	// $('#ei_total_iops_sec').val(N['vps']['total_iops_sec']);
	// $('#ei_read_bytes_sec').val(N['vps']['read_bytes_sec']);
	// $('#ei_write_bytes_sec').val(N['vps']['write_bytes_sec']);
	$('#ei_tr_ips').show();

	$('#ei_ipsint').val(count(N['vps']['ips_int']));
	$('#ei_num_ipsint').html(N['resources']['num_ip_int']);
	$('#ei_tr_ipsint').show();

	// $('#ei_ipsint').attr("disabled", "disabled");

	$('#ei_ipv6subnet').val(count(N['vps']['ips6_subnet']));
	$('#ei_num_ipv6subnet').html(N['resources']['num_ipv6_subnet']);
	$('#ei_tr_ipv6subnet').show();


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
	
	var bandwidth_lang = (N['res_limit']['bandwidth'] == 0 ? unlimited_lang : N['resources']['bandwidth']	+ ' GB');

	$('#ei_bandwidth').val(N['vps']['bandwidth']);
	$('#ei_res_bandwidth').html(bandwidth_lang);

	var avail_cores = (N['res_limit']['num_cores'] == 0 ? unlimited_lang : N['resources']['num_cores']);
	$('#ei_avail_cores').html(avail_cores);
	$('#ei_cores').val(N['vps']['cores']);

	// $('#ei_recom_core').tooltip({ title:'{{ei_cpucore_exp}} '+N['resources']['cores']});
	$('#ei_max_cores').html(N['resources']['cores']);
	$('#ei_max_space').html(N['resources']['space_per_vm']);
	if(!empty(N['resources']['disable_change_hostname'])){
		$('#ei_hostname').prop("readonly",true);

	}
	if(!empty(N['resources']['disable_change_password'])){
		$('#ei_rootpass').prop("readonly",true);
		$("#gen_rootpass").removeAttr('onclick');
	}

	// For advance options
	if(N['resources']['network_speed'] > -1){
		
		if(N['vps']['network_speed'] >= 0){
			$('#ei_network_speed').val(N['vps']['network_speed']);
		}
		
		$('#ei_network_speed_div, #ei_advoptions_toggle').show();

		// Load speeds
		var last = 0;
		var order = [];
		var network_speed_values = Array(128, 256, 384, 512, 640, 768, 896, 1024, 1152, 1280, 1920, 2560, 3849, 5120, 6400, 7680, 8960, 10240, 11520, 12800, 128000, 1280000);

		for(x in network_speed_values){
			order.push(parseFloat(network_speed_values[x]));
		}

		order.sort(function(a,b){return a-b});
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');
		if(N['resources']['network_speed'] == 0){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < N['resources']['network_speed'] && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
				}
			}

			if(N['resources']['network_speed'] < last){
				txt.push('<option value="'+ N['resources']['network_speed'] +'">'+ N['resources']['network_speed'] +' KB/s </option>');
			}
		}

		$("#ei_network_speed2").html(txt.join(''));

		// Load the upload speed
		var last = 0;
		var txt = [];
		txt.push('<option value="0" selected="selected">{{li_no_limit}}</option>');
		var tmp_up_lim = N['resources']['upload_speed'];
		if(tmp_up_lim == -1){
			tmp_up_lim = N['resources']['network_speed'];
		}
		
		if(N['vps']['upload_speed'] >= -1){
			$('#ei_upload_speed').val(N['vps']['upload_speed']);
		}
		
		if(tmp_up_lim == 0){
			for(x in order){
				txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
			}
		}else{
			for(x in order){
				last = order[x];
				if(order[x] < tmp_up_lim && !isNaN(order[x])){
					txt.push('<option value="'+ order[x] +'">'+ order[x] +'	KB/s </option>');
				}
			}

			if(tmp_up_lim < last){
				txt.push('<option value="'+ tmp_up_lim +'">'+ tmp_up_lim +' KB/s </option>');
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
		var sel_plans = '<option value="">{{ei_none}}</option>';
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
			
			$('#ei_'+x).removeAttr('disabled');
			
			var def_val = ('in_plan' in N && x in N['in_plan']) ? '{{ei_in_plan}} : '+N['in_plan'][x] : ''
			$('#ei_tr_'+x+' .bill-rates').html('<p>'+def_val+'</p><p>{{ei_add_pricing}} : </p><p class="text-[#0075ff]">&nbsp;'+N['billing_symbol']+N['resource_pricing'][x]['h_rate']+'</b>'+(x == 'bandwidth' ? '' : '/{{hour}} {{or}} <b>'+N['billing_symbol']+N['resource_pricing'][x]['m_rate']+'</b>'+'/{{month}}</p>'));
		}
		
		$("#ei_load_balancer").html('');
		if("load_balancer" in N && !empty(N['load_balancer']) && empty(N['vps']['load_balancer'])){
			
			lb_html = `
				<div class="col-sm-12">
					<label>{{select_lb}}</label><br>
					<select name="load_balancer" class="custom-select">
						<option value="0">{{li_none}}</option>`;
					
			$.each(N['load_balancer'], function(k, lb){
				lb_html += '<option value="'+lb['vps_uuid']+'">'+lb['vpsid']+' - '+lb['hostname']+'</option>';
			});
			lb_html += `</select>
			</div>`;
			$("#ei_load_balancer").html(lb_html);
		}
	}

	//show bios option if the virt is kvm
	if(N['vps']['virt'] == 'kvm') {
		$('#ei_tr_bios').show();
		let opt = '';
		opt += '<option value="seabios" ' + ((N['vps']['data']['bios'] == 'seabios') ? 'selected' : '') + '>SeaBios (Default)</option>';
		opt += '<option value="uefi" ' + ((N['vps']['data']['bios'] == 'uefi') ? 'selected' : '') + '>UEFI (OVMF)</option>';
		$("#ei_bios").html(opt);

	}else{
		$('#ei_tr_bios').hide();
	}

};


function editvm_onshow(){

	is_only_one('ei_');
	checkvnc('ei_');
	fill_ostemplates('ei_');
	fill_extra_fields('ei_');
	$('#ei_rootpass').val("");
	
	if(empty(N['vps']['vnc'])){
		//	VNC pass lenght differs with virt type
		generate_vnc_pass('ei_vncpass', N['vps']['virt']);
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
	show_adv_options('#editvm', virt);
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

	$('#cr_num_ip_int').html(N['res_limit']['num_ip_int']);
	$('#used_num_ip_int').html(res_used(N['res_limit']['num_ip_int'] - N['resources']['num_ip_int']));
	$('#res_num_ip_int').html(N['resources']['num_ip_int']);

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
	$('#lim_space_per_vm').html(res_lim(N['res_limit']['space_per_vm']));

};

function ctasks_onload(url){

	var th = '';
	var pre = '';
	var tmpsvs = getParameterByName("svs", 1);
	var svs_url = '&random='+Math.random();
	var tab = '';

	if(!empty(tmpsvs)){
		svs_url = '&svs=' + N['vpsid'];
		tab = '_tab'
	}

	$(".no_ctasks").hide();
	
	if(!url){
		url = '[[API]]act=ctasks' + svs_url;
	}
	
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

	AJAX(url, function(data) {

		if(empty(data['tasks'])){
			$(".no_ctasks").show();
			$("#ctasks_links").hide();
			return false;
		}

		pageLinks(pre+'tasks_links'+tab, url, data['page'], 'ctasks_onload');

		// Form the TABLE
		var table = '<div class="relative overflow-x-auto shadow-md sm:rounded-lg my-3"><table id="'+pre+'tasks_table'+tab+'" class="table"><thead><tr><th>{{actid}}</th><th>{{vpsid}}</th>'+th+'<th>{{user}}</th><th>{{tasks_started}}</th><th>{{tasks_updated}}</th><th>{{tasks_ended}}</th><th>{{action}}</th><th>{{status}}</th><th>{{tasks_progress}}</th></thead><tbody>';

		// Prepare the list
		for(x in data["tasks"]){

			$v = data["tasks"][x];

			if($v['progress_num'] == 100){
				$v['progress'] = '<i class="fas fa-1x fa-check-circle text-primary success"></i>';
			}else if($v['status'] == -1){
				$v['progress'] = '<i class="fas fa-1x fa-times-circle danger"></i></i>';
			}

			table += '<tr id="'+pre+'tasks_'+$v['actid']+'"><td>'+$v['actid']+'</td><td>'+$v["vpsid"]+'</td>';
			if(N['user_type'] == 2){
				$v["server_name"] = (typeof $v["serid"] != 'undefined' ? $v["server_name"]+' ('+$v["serid"]+')' : 'Unslaved Server');
				table += '<td>'+$v["server_name"]+'</td>';
			}

			table += '<td>'+$v['email']+'</td><td id="start'+pre+'date_'+$v["actid"]+'">'+$v["started"]+'</td><td id="update'+pre+'date_'+$v["actid"]+'">'+$v["updated"]+'</td><td id="end'+pre+'date_'+$v["actid"]+'">'+$v["ended"]+'</td><td>'+$v['action']+'</td><td id="'+pre+'status_'+$v['actid']+'">'+$v['status_txt']+'</td><td id="'+pre+'progress_'+$v['actid']+'"><center><div style="text-align:center;" id="'+pre+'pbar'+$v['actid']+'">'+$v["progress"]+'</center><div style="display:none;" class="progress w-100 ctask_progress '+pre+'progressbar'+$v['actid']+'"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="'+pre+'progressbar'+$v['actid']+'"></div></div></td></tr>';

		}

		table += '</tbody></table></div>';

		
		if((N['user_type'] == 2 || act == 'ctasks') && empty(tmpsvs)){
			$('#ctasks_links').show();
			$('#ctaskslist').html(table);
			
		}else{
			$("#ctasks_links_tab").show();
			$('#vpstasks_div').html(table);
		}

		update_tasks(url, pre);

		// $('#'+pre+'tasks_table'+tab).DataTable({});
		
	});
	
};

function set_backup_servers_table(backup_servers) {
	if(!$.isArray(backup_servers) || backup_servers.length == 0) {
		$('#bslist').html('<div class="notice">{{bs_no_servers}}</div>');
		$('#backupservers .bottom-go-options').hide();
		return;
	}
	
	$('#bslist').html('');
	$('#backupservers .bottom-go-options').show();
	
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
		data[i]['manage'] = '<a href="#" title="{{edit}}" onclick="loadpage(\'act=editbackupserver&bserid=' + backup_servers[i]['bserid'] + '\'); return false;"><i class="far fa-edit edit fa-1x"></i></a>&nbsp;&nbsp;&nbsp;<a href="#" title="{{delete}}" onclick="delete_backup_server(' + data[i]['bserid'] + '); return false;"><i class="far fa-trash-alt delete fa-1x" aria-hidden="true"></i></a>';
		data[i]['select_all'] = '<input type="checkbox" class="ios" name="bs[]" value="' + backup_servers[i]['bserid'] + '" />';
	}
	
	drawTable({'id' : 'bslist', 'tid' : 'bslist_list_table', 'width' : '100%'}, cols, data);
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
		error_alert("{{lst_no_option_sel}}");
		return false;
	} else if(action == 1) {
		delete_backup_server();
	}
}

function delete_backup_server(bserid) {
	// old confirm
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
		$('#sshkeylist').html('<div class="notice">{{sshkey_no_keys}}</div>');
		$('#sshkeys .bottom-go-options').hide();
		return;
	}
	
	$('#sshkeylist').html('');
	$('#sshkeys .bottom-go-options').show();
	
	var cols = new Object();
	cols["keyid"] = {'l' : '{{id}}', 'width' : '10%'};
	cols["uuid"] = {'l' : '{{sshkey_uuid}}', 'width' : '20%'};
	cols["name"] = {'l' : '{{sshkey_name}}'};
	cols["manage"] = {'l' : '{{manage}}', "width" : '10%'};
	cols["select_all"] = {'l' : '<input type="checkbox" name="select_all" id="ssh_select_all" class="select_all  virt-checkbox" onchange="checkbox_select_all(this);">', "width" : '5%', "class" : "select-all-checkbox"};
	
	var data = [];

	for(var i=0; i<ssh_keys.length; i++) {
		data[i] = new Array();
		data[i]['keyid'] = ssh_keys[i]['keyid'];
		data[i]['uuid'] = ssh_keys[i]['uuid'];
		data[i]['name'] = ssh_keys[i]['name'];
		data[i]['manage'] = '<a href="#" title="{{edit}}" onclick="loadpage(\'act=editsshkey&keyid=' + ssh_keys[i]['keyid'] + '\'); return false;"><i class="far fa-edit fa-1x edit-icon" title="{{edit}}"></i></a>&nbsp;&nbsp;&nbsp;<a href="#" title="{{delete}}" onclick="delete_ssh_key(' + ssh_keys[i]['keyid'] + '); return false;"><i class="far fa-1x fa-trash-alt delete-icon" aria-hidden="true" title="{{delete}}"></i></a>';
		data[i]['select_all'] = '<input type="checkbox" class="ios virt-checkbox" name="sshkeys[]" id="ssh-checkbox'+ssh_keys[i]['keyid']+'" value="' + ssh_keys[i]['keyid'] + '" />';
	}
	
	drawTable({'id' : 'sshkeylist', 'tid' : 'sshkey_list_table'}, cols, data);
}

function sshkeys_onload() {
	set_ssh_keys_table(N['ssh_keys']);
}

function addsshkey_onload() {
	$('#addsshkeyform')[0].reset();

	$('.private_key_container').hide();

	$("#gen-sshkey").click(function(){
		Loading(1)
		var key = {'generate' : 1};
		$.ajax({
			url: "[[API]]act=addsshkey",
			method : 'post',
			data : key,
			dataType : 'json',
			success: function(result){
				Loading(0);
				$("#addsshkey_value").val(result['sshkey']['result']['public_key']);
				$('.private_key_container').show();
				$("#private_key").text(result['sshkey']['result']['private_key']);
			}
		});
	});
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
		error_alert("{{lst_no_option_sel}}");
		return false;
	} else if(action == 1) {
		delete_ssh_key();
	}
}

function delete_ssh_key(keyid) {

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

	if(empty(keyids)){
		error_alert("{{sshkey_err_key}}");
		return false;
	}

	modalConfirm(function(confirm){
		if(confirm){
			submitit('deletesshkeyform', 'deletesshkeyform_response');
		}else{
			return false;
		}
	},'{{sshkey_conf_delete}}');
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
	AJAX('[[API]]act=euiso', function(data) {
		if(empty(data['isos'])){
			$('#euisolist').html('<div class="notice">{{euiso_no_iso}}</div>');
			return;
		}
		
		if($('#iso_list_table').length>0){
			$('#iso_list_table tr td').eq(2).css({'color':'red'});
		}
	
		var cols = new Object();
		cols["uuid"] = {"l" : '{{uuid}}', "width": '60px'};
		cols["distro"] = {"l" : '{{euiso_iso_distro}}', "width": '30px'};
		cols["iso"] = {"l" : '{{euiso_iso_name}}'};
		cols["size"] = {"l" : '{{euiso_iso_rsize}}'};
		cols["downloaded"] = {"l" : '{{euiso_iso_size}}'};
		cols["download_time"] = {"l" : '{{euiso_dwnld_time}}'};
		cols["active"] = {"l" : '{{euiso_iso_status}}', "width" : '10'};
		cols["delete"] = {"l" : '{{euiso_iso_del}}', "width" : '10'};
		cols["select_all"] = {"l" : '<input type="checkbox" name="select_all" id="iso_select_all" class="select_all virt-checkbox" onclick="checkbox_select_all(this);" >', "width" : '5%', 'class' : 'select-all-checkbox'};
		
		var is_downloading = 0;
		
		// Prepare the list
		for(x in data["isos"]){
			$v = data["isos"][x];
			active = $v['active'];
			$v['active'] = Math.round(($v['downloaded']/$v['size'])*100) + ' %';
			$v['size'] = Math.round($v['size'] / 1024 / 1024) + ' MB';
			$v['downloaded'] = Math.round($v['downloaded'] / 1024 / 1024) + ' MB';
			$v['download_time'] = $v['download_time'];
			$v["delete"] = '<a href="javascript:void(0);" onclick="delisokey(\''+x+'\');return false;" class="areload" data-iso=\''+x+'\'><i class="far fa-1x fa-trash-alt danger" title="{{delete}}"></i></a>';
			$v["select_all"] = '<input type="checkbox" class="ios isorow virt-checkbox" id="iso-checkbox'+[x]+'" name="iso_id[]" value="'+[x]+'" "/>';
			
			if(empty(active)){
				is_downloading = 1;
			}
		}
	
		// Form the TABLE
		drawTable({'id' : 'euisolist', 'tid' : 'iso_list_table'}, cols, data["isos"]);
		
		var sel_opts = "<option value='0'>{{lst_with_selected}}</option><option value='1'>{{delete}}</option>";
		
		var bottom_menu = `<div class="bottom-go-options py-5 flex justify-end"><div class="flex gap-3 lg:w-96 sm:w-52">
			<select class="virt-select" name="multi_options" id="iso_options">
				${sel_opts}
			</select>
			<span class="go-option">
				<input type="button" value="{{go}}" onclick="delisokey();return false;" class="btn justify-content-end align-items-center d-flex" />
			</span>
		</div></div>`;
		
		bottom_menu += '<div class="text-center mt-3">';
		
		if("euiso_auto_del" in data){
			bottom_menu += '<div class="notice">'+N['euiso_auto_del']+'</div>';
		}

		bottom_menu += '</div>';
		if(!$('#enduser_listiso-tab .bottom-go-options').length){
			$("#euisolist").parent().after(bottom_menu);
		}

		// Are there any ISO that are downloading ?
		if(!empty(is_downloading)){
			euiso = setTimeout('loadpage("act=euiso")', 30000);
			is_downloading = 0;
		}
	});
	
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

	if(isError()){
		error(N["error"]);
		return -1;
	}

	// Hide charges, invoices if user is WHMCS User
	if(!empty(N["foreign_uid"]) && !empty(N["cb_invoice_whmcs_user"])){
		$("#charges_box").hide();
		$("#cur_invoices_box").hide();
		$("#invoice_tab").hide();
		$("#transactions_tab").hide();
		$("#make_payment_tab").hide();
		$('#usage_tab').addClass('active');
		$('#invoices, #invoice_tab').removeClass('active');
		$('#invoice_tab').removeClass('active');
		$('#usage').addClass('active');
		$('#usage').removeClass('fade');
	}
	
	// No invoices ?
	if(empty(N["invoices"])){
		
		$('#billinglist').html('<div class="notice">{{bill_no_invoice}}</div>');
	
	// Some invoices
	}else{

		var cols = new Object();
		cols["invoid"] = {"l" : '{{bill_invoid}}', "width": '15%'};
		cols["invodate"] = {"l" : '{{bill_invodate}}', "width": '15%'};
		cols["duedate"] = {"l" : '{{bill_duedate}}', "width": '15%'};
		cols["item"] = {"l" : '{{bill_item}}', "width": '15%'};
		cols["_net"] = {"l" : '{{bill_net}}', "width": '15%'};
		cols["status_txt"] = {"l" : '{{bill_status}}', "width": '15%'};
		cols["view"] = {"l" : '', "width" : '5%'};
		// cols["select_all"] = {"l" : '<div class="custom-control custom-checkbox"><input type="checkbox" name="select_all" id="invoice_select_all" class="select_all custom-control-input" onclick="checkbox_select_all(this);" ><label class="custom-control-label" for="invoice_select_all"></label></div>', "width" : '1%', "centered" : true, 'class' : 'table-col'};
		
		// Prepare the list
		for(x in N["invoices"]){
			
			$v = N["invoices"][x];

			x = x.replace('i_','');
			$v['invodate'] = datetime($v['invodate']);
			$v['duedate'] = datetime($v['duedate']);
			$v['_net'] = N['billing_symbol']+$v['net'];
			$v["view"] = '<a target="_blank" href="[[giver]]act=invoices&invoid='+x+'"><i class="fa fa-file text-lg text-blue-600" /></a>';
			// $v["select_all"] = '<div class="custom-control custom-checkbox"><input type="checkbox" class="ios custom-control-input" name="invoid[]" value="'+[x]+'" id="invoice_checkbox'+[x]+'" /><label class="custom-control-label" for="invoice_checkbox'+[x]+'"></label></div>';
		}

		// Form the TABLE
		pageLinks("billing-link", 'act=billing', N['page']);
		drawTable({'id' : 'billinglist', 'tid' : 'invoices_table', "width" : '90%'}, cols, N["invoices"]);
		
	
	}
	
	// No Transactions ?
	if(empty(N["transactions"])){
		
		$('#transactionslist').html('<div class="notice">{{bill_no_trans}}</div>');
	
	// Some Transactions
	}else{

		var cols = new Object();
		cols["trid"] = {"l" : '{{bill_trid}}', "width": '60px' };
		cols["date"] = {"l" : '{{bill_trdate}}', "width": '25%' };
		cols["gateway"] = {"l" : '{{bill_gateway}}', "width": '25%'};
		cols["amt"] = {"l" : '{{bill_net}}', "width": '25%'};
		cols["bal"] = {"l" : '{{bill_bal}}'};
		
		// Prepare the list
		for(x in N["transactions"]){
			$v = N["transactions"][x];
			$v['date'] = datetime($v['date']);
			if(!empty($v['invoid'])){
				$v['gateway'] = '<a target="_blank" href="[[giver]]act=invoices&invoid='+$v['invoid']+'" class="text-blue-500 underline">{{bill_invoice}} : '+$v['invoid']+'</a>';
			}
		}

		// Form the TABLE
		drawTable({'id' : 'transactionslist', 'tid' : 'transactions_table', "width" : '90%'}, cols, N["transactions"]);
		
		pageLinks("transactions-link", 'act=billing', N['trpage'], false, 'trpage');
	
	}
	
	// No Usage ?
	if(empty(N["usage"])){
		
		$('#usagelist').html('<div class="notice">{{bill_no_usage}}</div>');
	
	// Some Usage Items
	}else{

		var cols = new Object();
		cols["usid"] = {"l" : '{{bill_usid}}', "width": '60px'};
		cols["vps"] = {"l" : '{{bill_vps}}', "width": '200'};
		cols["region"] = {"l" : '{{bill_region}}', "width": '150'};
		cols["resource"] = {"l" : '{{bill_type}}', "width": '75'};
		cols["starttime"] = {"l" : '{{bill_starttime}}',"width": '180'};
		cols["updatetime"] = {"l" : '{{bill_updatetime}}',"width": '180'};
		cols["charge"] = {"l" : '{{bill_charge}}', "width": '150'};
		
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
		drawTable({'id' : 'usagelist', 'tid' : 'usage_table', "width" : '90%'}, cols, N["usage"]);
		
		$('#usage_table').dataTable({
			"order": [[ 0, "desc" ]]
		});
	
	}

	// No Usage ?
	if(empty(N["billed_usage"])){
		
		$('#billed_usagelist').html('<div class="notice">{{bill_no_usage}}</div>');
	
	// Some Usage Items
	}else{

		var cols = new Object();
		cols["usid"] = {"l" : '{{id}}', "width": '60px'};
		cols["invoid"] = {"l" : '{{bill_invoid}}', "width": '90px'};
		cols["vps"] = {"l" : '{{bill_vps}}', "width": '200'};
		cols["region"] = {"l" : '{{bill_region}}', "width": '150'};
		cols["resource"] = {"l" : '{{bill_type}}', "width": '75'};
		cols["starttime"] = {"l" : '{{bill_starttime}}',"width": '180'};
		cols["updatetime"] = {"l" : '{{bill_updatetime}}',"width": '180'};
		cols["charge"] = {"l" : '{{bill_charge}}', "width": '150'};

		// Prepare the list
		for(x in N["billed_usage"]){
			$v = N["billed_usage"][x];
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
		drawTable({'id' : 'billed_usagelist', 'tid' : 'billed_usage_table', "width" : '90%'}, cols, N["billed_usage"]);
		
		pageLinks("billed_usage-link", 'act=billing', N['uspage'], false, 'uspage');
	
	}

	// No Gateways ?
	if(empty(N["gateways"])){
		
		$('#make_payment').html('<div class="notice">{{bill_no_payment_gateway}}</div>');
	
	// Payment Gateways
	}else{
		var options = '<option value="" selected="selected">None</option>';
		for(x in N["gateways"]){
			options += '<option value="'+x+'">'+N["gateways"][x]+'</option>';
		}
		$('#gateway').html(options);

		

	}
	
	$('#balance').html(N['billing_symbol']+N['balance']);
	$('#charges').html(N['billing_symbol']+N['charges']);
	$('#cur_usage').html(N['billing_symbol']+N['cur_usage']);
	$('#cur_invoices').html(N['billing_symbol']+N['cur_invoices']);
	$('#billing_symbol').html(N['billing_symbol']);
	$('.pay_fields').prop("disabled", true);
};

function lb_assign(formid){
	// $("#"+formid).
	Loading(1);
	$.ajax({
		type: "POST",
		url: "[[API]]act=load_balancer&vpsid="+$("#"+formid).attr("data-vpsid")+"&api=json",
		data: $("#"+formid).serialize(),
		dataType : "json",
		success:function(res){
			Loading(0);
			if('vps_assigned' in res){
				setTimeout(function(){ success_alert("{{lb_save_settings_done}}");
					$("#alert-modal").on("hidden.bs.modal", function (e) {
						refresh_page();
					});
				return; } ,200);
			}

			// Are there any errors ?
			if(typeof(res["error"]) != "undefined"){
				setTimeout(function(){ var errors = "";
				for(x in res["error"]){
					errors = errors + res["error"][x]+ "<br>";
				}
				error_alert(errors); } ,200);
			}
		}
	});

}

let lb_uuid = '';
//manage load balancer onload
function manage_load_balancer_onload(){

	if(empty(N['load_balancer'])){
		return false;
	}

	let load_balancer = N['load_balancer'];
	lb_uuid = load_balancer['vps_uuid'];
	html = `
		<div class="px-3">
		
			<div class="flex flex-row gap-5">
				<div class="flex flex-wrap text-center gap-3">
					<div class="border rounded-full p-3 relative justify-center mr-2 w-12 h-12">
						<i class="fas fa-code-branch h2 m-0"></i>
						<div class="absolute -mr-4">
							<i class="fas fa-circle cursor-pointer text-`+(N['lb_status'] ? 'green' : 'red')+`-500 h6 m-0"></i>
						</div>
					</div>
				</div>
				
				<div class="">
					<div class="flex items-center mb-2">
						<h5 class="m-0 text-xl">`+load_balancer['hostname']+`</h5>
					</div>
					<div class="flex items-center">
						<div class="text-[#6C757D] m-0">`+load_balancer['sg_name']+`</div>
						<div class="mx-1">/</div>
						<div class="text-[#6C757D] m-0">`+load_balancer['ip']+`</div>
					</div>
				</div>
			</div>

			<div class="flex justify-center mb-1">
				<div class="nav-button">

					<button id="vps-list" onclick="showtab(this.id, 'lblist-tab-content')" class="py-1 md:px-8 px-2 lblist-tab-button tab-button active"><i class="fas fa-server mr-2"></i>{{lb_vps_list}}<span class="badge-primary bg-primary ml-2">`+load_balancer['num_vps']+`</span></button>

					<button id="rules-list" onclick="showtab(this.id, 'lblist-tab-content');" class="py-1 md:px-8 px-2 lblist-tab-button tab-button"><i class="fas fa-atlas mr-2"></i>{{lb_rules_list}}<span class="badge-primary bg-primary ml-2">`+(!empty(load_balancer['settings']) ? Object.keys(load_balancer['settings']).length : 0)+`</span></button>

					<button id="lb-settings" onclick="showtab(this.id, 'lblist-tab-content');" class="py-1 md:px-8 px-2 lblist-tab-button tab-button"><i class="fas fa-cogs mr-2"></i>{{lb_settings}}</button>

					<button id="lb-stats" onclick="showtab(this.id, 'lblist-tab-content'); lb_get_stats();" class="py-1 md:px-8 px-2 lblist-tab-button tab-button"><i class="fas fa-table mr-2"></i>{{lb_stats}}</button>

					<button id="lb-logs" onclick="showtab(this.id, 'lblist-tab-content');lb_get_logs()" class="py-1 md:px-8 px-2 lblist-tab-button tab-button"><i class="fas fa-clipboard-list mr-2"></i>{{le_logs}}</button>

				</div>
			</div>

			<div class="lblist-tab-content bg" id="vps-list-tab" role="tabpanel" aria-labelledby="vps-list">						
				<div class="mx-auto w-full">
					<div class="p-0 mx-n3">
							<table class="table min-w-full text-sm" id="lb_vm_table">
								<thead>
									<tr>
										<th class="min_width">
											{{id}}
										</th>
										<th>
											UUID
										</th>
										<th>
											{{hostname}}
										</th>
										<th>
											IP
										</th>
										<th>
											{{server}}
										</th>
										<th class="min_width">
											{{lb_manage}}
										</th>
									</tr>
								</thead>
							`;
								$.each(N['vpses'], function(vpsid, vps){
									html += `
									<tr>
										<td>
											`+vpsid+`
										</td>
										<td>
											`+vps['uuid']+(!empty(vps['locked']) ? `<i class="fas fa-lock pl-2" tooltip="`+vps['locked']['reason']+`" data-original-title="" title="" style=""></i>` : ``) +`
										</td>
										<td>
											`+vps['hostname']+`
										</td>
										<td>
											`+vps['ip']+`
										</td>
										<td>
											`+vps['server_name']+`
										</td>
										<td>
											<a class="text-danger" onclick="lb_remove_vm('`+vpsid+`')" title="{{remove}}"><i class="fas fa-trash m-1 cursor-pointer danger"></i></a>
										</td>
									</tr>`;
								})
							html += `
								</table>
							</div>
						</div>
					</div>

			<div class="lblist-tab-content bg hidden" id="rules-list-tab" role="tabpanel" aria-labelledby="rules-list">
				<div class="mx-auto w-full">
					<div class="p-0">									
						<table class="table dataTable min-w-full text-sm" id="lb_rules_table">
							<thead>
										<tr>
											<th>
												{{lb_source_protocol}}
											</th>
											<th>
												{{lb_source_port}}
											</th>
											<th>
												{{lb_dest_protocol}}
											</th>
											<th>
												{{lb_dest_port}}
											</th>
											<th>
												{{lb_lb_method}}
											</th>
											<!--<th>
												{{lb_dir}}
											</th>-->
											<th class="min_width">
												{{lb_manage}}
											</th>
										</tr>
									</thead>
								`;
								$.each(load_balancer['settings'], function(sk, sv){
									html += `
										<tr id="lb_settings_tr_`+sk+`">
											<span id="lb_settings_`+sk+`" style="display:none;">`+JSON.stringify(sv)+`</span>
											<td>
												`+sv['source_protocol']+`
											</td>
											<td>
												`+sv['source_port']+`
											</td>
											<td>
												`+sv['dest_protocol']+`
											</td>
											<td>
												`+sv['dest_port']+`
											</td>
											<td>
												`+sv['lb_method']+`
											</td>
											<td>
										<div class="d-flex">
											<a title="{{edit}}"><i class="far fa-edit fa-1x m-1 edit-icon mx-2" onclick="lb_edit_rule('`+sk+`',this)"></i></a>
											<a title="{{remove}}" onclick="lb_remove_rule('`+sk+`')"><i class="fas fa-trash m-1 delete-icon"></i></a>
										</div>
									</td>
								</tr>
							`;
						})
						html += `
						</table>
									
					</div>
				</div>		
			</div>					

			<div class="lblist-tab-content bg hidden mt-10 bg h-96 overflow-y-auto" id="lb-settings-tab" role="tabpanel" aria-labelledby="lb-settings">
					<form method="post" id="lb_settings_form">						
							<fieldset class="user_details_f">
								<h1 class="user_details_f lg:text-2xl">{{lb_method}}</h1>
								<div class="flex flex-row mx-auto w-full">
									<div class="flex-initial w-80 my-2">
										<label class="virt-label" for="chs_method">
											{{lb_choose_method}}
										</label><br>
										<select name="lb_method" class="virt-select">
											<option value="roundrobin">roundrobin({{lb_default}})</option>
											<option value="leastconn">leastconn</option>
											<option value="static-rr">static-rr</option>
											<option value="first">first</option>
										</select>
									</div>
								</div>
							</fieldset>
							<fieldset class="user_details_f">
								<h1 class="user_details_f lg:text-2xl">{{lb_rules}}</h1>
								<br>
								<div class="grid grid-cols-3">
									<div class="lb_div">
										<h6 class="text-lg">{{load_balancer}}</h6>
									</div>
									<div class="mt-3"></div>
									<div class="vps_div">
										<h6>{{lb_vps}}</h6>
									</div>
								</div>
								<br>
								<div class="flex gap-4">
									<div class="flex flex-auto lb_div">
										<div class="px-1 flex-1">
											<label class="virt-label">
											{{lb_protocol}}
											</label><br>
											<select name="source_protocol" class="virt-select select2" id="lb_source_protocol">
												<option value="http">HTTP</option>
												<option value="https">HTTPS</option>
												<option value="http2">HTTP2</option>
												<option value="http3">HTTP3</option>
												<option value="tcp">TCP</option>
											</select>
										</div>

										<div class="px-1 flex-1">
											<label class="virt-label">
												{{lb_port}}
											</label><br>
											<input type="text" name="source_port" id="lb_source_port" value="80" class="virt-input">
										</div>

									
										<div class="px-1 flex-1" id="lb_ssl_cert" style="display:none">
											<label class="virt-label">
												{{lb_ssl_certificate}}
											</label><br>
											<select id="lb_ssl_options" class="virt-select" name="ssl_options">
												<option value="create">{{lb_ssl_create}}</option>
												<option value="use_own">{{lb_ssl_use}}</option>`;
												if("lb_ssl_certs" in N && !empty(N['lb_ssl_certs'])){
													$.each(N['lb_ssl_certs'], function(sslk, sslv){
														html += `<option value="`+sslv['ssl_id']+`">`+sslv['ssl_name']+`</option>`;
													});
												}
												html += `
											</select>
										</div>
									</div>			

									<div class="flex mt-8 flex-none w-5 text-center">
										<i class="fas fa-arrow-right"></i>
									</div>

									<div class="flex flex-auto vps_div">
										<div class="px-1 flex-1">
											<label class="virt-label">
												{{lb_protocol}}
											</label><br>
											<select name="dest_protocol" class="virt-select" onchange="($(this).val() == 'https' ? $('#lb_dest_port').val('443') : $('#lb_dest_port').val('80'))">
												<option value="http">HTTP</option>
												<option value="https">HTTPS</option>
												<option value="tcp">TCP</option>
											</select>
										</div>
										
										<div class="w-full px-1 flex-1">
											<label class="virt-label">
												{{lb_port}}
											</label><br>
											<input type="text" name="dest_port" id="lb_dest_port" value="80" class="virt-input">
										</div>
									</div>
									<!--<div class="col-2 my-2 px-1">
										<label>
											{{dir}}
										</label><br>
										<input type="text" name="dir" value="/" class="form-control">
									</div>-->
								</div>
							</fieldset>
							<fieldset class="user_details_f mt-8" id="lb_use_own_div" style="display:none;">
								<legend class="user_details_f mb-0">{{lb_cert_details}}</legend>
								<div class="flex flex-col">
									<div class="px-1 my-2">
										<label class="virt-label">
											{{lb_ssl_name}}
										</label><br>
										<input type="text" name="ssl_name" class="virt-input">
									</div>
								</div>
								<div class="flex flex-col">
									<div class="px-1 my-2">
										<label class="virt-label">
											{{lb_cert}}
										</label><br>
										<textarea class="virt-input" name="cert" rows="5"></textarea>
									</div>
									<div class="px-1 my-2">
										<label class="virt-label">
											{{lb_key}}
										</label><br>
										<textarea class="virt-input" name="key" rows="5"></textarea>
									</div>
									<div class="px-1 my-2">
										<label class="virt-label">
											{{lb_chain}}
										</label><br>
										<textarea class="virt-input" name="chain" rows="5"></textarea>
									</div>
								</div>
							</fieldset>
							
						<div class="w-100 mt-8 text-center">
							<input type="button" id="lb_save_settings" value="{{lb_save_settings}}" class="btn blue_btn" name="lb_save_settings"/>
						</div>					
				</form>	
			</div>

			<div class="lblist-tab-content hidden mt-10" id="lb-stats-tab" role="tabpanel" aria-labelledby="lb-stats">
				<center><div class="loader"></div></center>
			</div>

			<div class="lblist-tab-content hidden mt-10" id="lb-logs-tab" role="tabpanel" aria-labelledby="lb-logs">
				<center><div class="loader"></div></center>
			</div>
	
		</div>`;
		
	$("#manage_lb_div").html(html);

	$(".scrollbar-virt").scrollbar();

	$("#lb_ssl_options").on("change", function(){
		if($(this).val() == "use_own"){
			$("#lb_use_own_div").show();
		}else{
			$("#lb_use_own_div").hide();
		}
	});

	$("#lb_vm_table").dataTable({
		'destroy': true,
		'columnDefs': [ 
			{ 'targets': [5] }, // column index (start from 0)
			{ "orderable": false, "targets": [5] },
		],
		'autoWidth': false,
	});

	$("#lb_rules_table").dataTable({
		'destroy': true,
		'columnDefs': [ 
			{ 'targets': [5] }, // column index (start from 0)
			{ "orderable": false, "targets": [5] },
		],
		'autoWidth': false,
	});

	$("#lb_vm_table_wrapper .row").addClass("mx-auto w-100");
	$("#lb_rules_table_wrapper .row").addClass("mx-auto w-100 bg");

	$("#lb_source_protocol").on("change", function(){
		if($(this).val() == "http"){
			$("#lb_ssl_cert").hide();
			$("#lb_use_own_div").hide();
			$("#lb_ssl_options").val("create");
			$("#lb_source_port").val("80");
		}else if($(this).val() == "https" || $(this).val() == "http2" || $(this).val() == "http3"){
			$("#lb_source_port").val("443");
			$("#lb_ssl_cert").show();
		}else if($(this).val() == "tcp"){
			$("#lb_ssl_cert").hide();
			$("#lb_use_own_div").hide();
			$("#lb_ssl_options").val("create");
			$("#lb_source_port").val("22");
		}
	})

	$("#lb_save_settings").on("click", function(){
		$("#lb_save_settings").prop("disabled", true);
		Loading(1);
		$.ajax({
			type: "POST",
			url: "[[API]]act=manage_load_balancer&lb_uuid="+lb_uuid+"&save_settings=1&api=json",
			dataType : "json",
			data:$("#lb_settings_form").serialize(),
			success:function(res){
				Loading(0);
				$("#lb_save_settings").prop("disabled", false);
				if("save_settings_done" in res){
					setTimeout(function(){ success_alert("{{lb_save_settings_done}}");
						$("#alert-modal").on("hidden.bs.modal", function (e) {
							refresh_page();
						});
					return; } ,200);
				}
	
				// Are there any errors ?
				if(typeof(res["error"]) != "undefined"){
					setTimeout(function(){ var errors = "";
					for(x in res["error"]){
						errors = errors + res["error"][x]+ "<br>";
					}
					error_alert(errors); } ,200);
				}
			}
		});
	});

	showtooltip();

}

function lb_get_stats(){
	Loading(1);
	$.ajax({
		type: "POST",
		url: "[[API]]act=manage_load_balancer&lb_uuid="+lb_uuid+"&get_stats=1&api=json",
		dataType : "json",
		success:function(res){
			Loading(0);
			if("lb_stats" in res){
				$("#lb-stats-tab").html(`<div id="lb_stats_div" class="bg h-96 overflow-y-auto">`+res['lb_stats']+`</div>`);
				if($("#lb_stats_div").find("table")[$("#lb_stats_div").find("table").length-4] !== "undefined"){
					$("#lb_stats_div").find("table")[$("#lb_stats_div").find("table").length-4].hide();
				}

				if($("#lb_stats_div").find("table")[$("#lb_stats_div").find("table").length-3] !== "undefined"){
					$("#lb_stats_div").find("table")[$("#lb_stats_div").find("table").length-3].hide();
				}
				
			}

			// Are there any errors ?
			if(typeof(res["error"]) != "undefined"){
				setTimeout(function(){ var errors = "";
				for(x in res["error"]){
					errors = errors + res["error"][x]+ "<br>";
				}
				error_alert(errors ,"1"); } ,200);
			}
		}
	});
}
function lb_get_logs(){
	Loading(1);
	$.ajax({
		type: "POST",
		url: "[[API]]act=manage_load_balancer&lb_uuid="+lb_uuid+"&get_logs=1&api=json",
		dataType : "json",
		success:function(res){
			Loading(0);
			if("lb_logs" in res){
				$("#lb-logs-tab").html(`<div style="overflow:auto;" class="h-96 overflow-y-auto bg"><pre>`+res['lb_logs'].join('<br>')+`</pre></div>`);
			}

			// Are there any errors ?
			if(typeof(res["error"]) != "undefined"){
				setTimeout(function(){ var errors = "";
				for(x in res["error"]){
					errors = errors + res["error"][x]+ "<br>";
				}
				error_alert(errors ,"1"); } ,200);
			}
		}
	});
}

function lb_delete(delete_lb){
	msg = `{{lb_delete_lb_confirm}}<br>
	<div class="custom-control custom-checkbox">
		<input type="checkbox" name="lb_delete_added_vm" id="lb_delete_added_vm" class="custom-control-input" >
		<label class="custom-control-label" for="lb_delete_added_vm">{{lb_delete_added_vm}}</label>
	</div>`;
	modalConfirm(function(confirm){
		if(confirm == false){
			return false;
		}else{
			Loading(1);
			var is_checked = $("#lb_delete_added_vm").prop("checked");
			$.ajax({
				type: "POST",
				url: "[[API]]act=load_balancer&delete_lb="+delete_lb+(!empty(is_checked) ? "&delete_added_vm=1" : "")+"&api=json",
				dataType : "json",
				success:function(res){
					Loading(0);
					if("delete_lb_done" in res){
						let success_msg = "{{delete_lb_done}}";
						
						if(!empty(res["delete_lb_done"]["done_msg"])){
							success_msg += "{{lb_vm_not_deleted}}"+res["delete_lb_done"]["done_msg"];
						}
						setTimeout(function(){ success_alert(success_msg);
							$("#alert-modal").on("hidden.bs.modal", function (e) {
								refresh_page();
							});
						return; } ,200);
					}
		
					// Are there any errors ?
					if(typeof(res["error"]) != "undefined"){
						setTimeout(function(){ var errors = "";
						for(x in res["error"]){
							errors = errors + res["error"][x]+ "<br>";
						}
						error_alert(errors ,"1"); } ,200);
					}
				}
			});
		}
	}, msg);
}

function lb_remove_vm(vpsid){
	msg = `{{lb_confirm_vps_remove}}<br>
	<div class="custom-control custom-checkbox">
		<input type="checkbox" name="lb_delete_vm" id="lb_delete_vm" class="custom-control-input" >
		<label class="custom-control-label" for="lb_delete_vm">{{lb_delete_vm}}</label>
	</div>`;
	modalConfirm(function(confirm){
		if(confirm == false){
			return false;
		}else{
			Loading(1);
			var is_checked = $("#lb_delete_vm").prop("checked");
			$.ajax({
				type: "POST",
				url: "[[API]]act=manage_load_balancer&lb_uuid="+lb_uuid+"&remove_vps="+vpsid+(!empty(is_checked) ? "&delete_vm=1" : "")+"&api=json",
				dataType : "json",
				success:function(res){
					Loading(0);
					if("remove_vps_done" in res){
						setTimeout(function(){ success_alert("{{lb_remove_vps_done}}");
							$("#alert-modal").on("hidden.bs.modal", function (e) {
								refresh_page();
							});
						return; } ,200);
					}
		
					// Are there any errors ?
					if(typeof(res["error"]) != "undefined"){
						setTimeout(function(){ var errors = "";
						for(x in res["error"]){
							errors = errors + res["error"][x]+ "<br>";
						}
						error_alert(errors ,"1"); } ,200);
					}
				}
			});
		}
	}, msg);
}

function lb_remove_rule(rule){
	modalConfirm(function(confirm){
		if(confirm == false){
			return false;
		}else{
			Loading(1);
			$.ajax({
				type: "POST",
				url: "[[API]]act=manage_load_balancer&lb_uuid="+lb_uuid+"&remove_rule="+rule+"&api=json",
				dataType : "json",
				success:function(res){
					Loading(0);
					if("remove_rule_done" in res){
						success_alert("{{lb_remove_rule_done}}");
						refresh_page();
						return;
					}
		
					// Are there any errors ?
					if(typeof(res["error"]) != "undefined"){
						setTimeout(function(){ var errors = "";
						for(x in res["error"]){
							errors = errors + res["error"][x]+ "<br>";
						}
						error_alert(errors); } ,200);
					}
				}
			});
		}
	}, "{{lb_confirm_rule_delete}}");
}

function lb_edit_rule(k, ele){

	if($("#edit_lb_rule_div").length <= 0){
		var _edit_lb_rule_div = '<div id="edit_lb_rule_div"></div>';
		$(_edit_lb_rule_div).prependTo('#manage_load_balancer');
	}
	var data = JSON.parse($("#lb_settings_"+k).html());
	var _htm = `
	<div id="lbrule_modal" aria-hidden="true" class="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 justify-center items-center z-50 bg-scroll">
			<div class="relative w-full px-4 h-full md:h-auto max-w-[832px] ">
				<!-- Modal content -->
				<div class="modal-content">
					
					<!-- Modal header -->
					<div class="modal-header">
						<h3 class="modal-flex-title">{{lb_edit_rule}}</h3>
						<button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleModal('lbrule_modal')">
							<i class="fas fa-1x fa-times"></i>
						</button>
					</div>

					<!-- Modal body -->
					<div class="p-4 space-y-6 modal-body dark:text-gray-300 h-96 overflow-y-auto">
						<form method="post" id="lb_edit_settings_form">
							<input type="hidden" name="old_key" value="`+(k)+`"/>
							<h4 class="lg:text-2xl mb-3">{{lb_method}}</h4>
							<div class="flex flex-row">
								<div class="basis-2/4">
									<label class="virt-label" for="chs_method">
										{{lb_choose_method}}
									</label><br>
									<select name="edit_lb_method" class="virt-select">
										<option value="roundrobin" `+(data.lb_method == "roundrobin" ? "selected" : "")+`>roundrobin({{lb_default}})</option>
										<option value="leastconn" `+(data.lb_method == "leastconn" ? "selected" : "")+`>leastconn</option>
										<option value="static-rr" `+(data.lb_method == "static-rr" ? "selected" : "")+`>static-rr</option>
										<option value="first" `+(data.lb_method == "first" ? "selected" : "")+`>first</option>
									</select>
								</div>
							</div>
							<h4 class="lg:text-2xl mt-3">{{lb_rules}}</h4>
							<br>
							<div class="grid grid-cols-3 gap-4">
								<div class="lb_div">
									<h6 class="virt-label text-lg ">{{load_balancer}}</h6>
								</div>
								<div class="mt-3"></div>
								<div class="vps_div">
									<h6>{{lb_vps}}</h6>
								</div>
							</div>

							<!-- <div class="grid grid-cols-6"> -->
							<div class="flex flex-row">
								<div class="flex auto edit_lb_div">
									<div class="flex-auto  px-1 w-36">
										<label class="virt-label">{{lb_protocol}}</label><br>
										<select name="edit_source_protocol" class="virt-select" id="edit_source_protocol" onchange="check_source_protocol($(this).val(), 1);">
											<option value="http" `+(data.source_protocol == "http" ? "selected" : "")+`>HTTP</option>
											<option value="https" `+(data.source_protocol == "https" ? "selected" : "")+`>HTTPS</option>
											<option value="http2" `+(data.source_protocol == "http2" ? "selected" : "")+`>HTTP2</option>
											<option value="http3" `+(data.source_protocol == "http3" ? "selected" : "")+`>HTTP3</option>
											<option value="tcp" `+(data.source_protocol == "tcp" ? "selected" : "")+`>TCP</option>
										</select>
									</div>
									<div class="flex-auto  px-1 w-36">
										<label class="virt-label">
											{{lb_port}}
										</label><br>
										<input type="text" name="edit_source_port" id="lb_edit_source_port" value="`+data.source_port+`" class=" virt-input w-70">
									</div>

									<div class="flex-auto px-1 w-36" id="lb_edit_ssl_cert" >
										<label class="virt-label">
											{{lb_ssl_certificate}}
										</label><br>
										<select id="lb_edit_ssl_options" class="virt-select" name="edit_ssl_options">
											<option value="create">{{lb_ssl_create}}</option>
											<option value="use_own">{{lb_ssl_use}}</option>`;
											if("lb_ssl_certs" in N && !empty(N['lb_ssl_certs'])){
												$.each(N['lb_ssl_certs'], function(sslk, sslv){
													_htm += `<option value="`+sslv['ssl_id']+`" `+(data.ssl_id == sslv['ssl_id'] ? 'selected="selected"' : '')+`>`+sslv['ssl_name']+`</option>`;
												});
											}
											_htm += `
										</select>
									</div>
								</div>
								<div class="flex-auto text-center">
									<i class="fas fa-arrow-right w-6 mt-8"></i>
								</div>
								<div class="flex auto edit_vps_div">
									<div class="flex-auto w-36 px-1 ">
										<label class="virt-label">
											{{lb_protocol}}
										</label><br>
										<select name="edit_dest_protocol" class="virt-select" id="edit_dest_protocol" onchange="($(this).val() == 'https' ? $('#edit_dest_port').val('443') : $('#edit_dest_port').val('80'))">
										<option value="http" `+(data.dest_protocol == "http" ? "selected" : "")+`>HTTP</option>
										<option value="https" `+(data.dest_protocol == "https" ? "selected" : "")+`>HTTPS</option>
										<option value="tcp" `+(data.dest_protocol == "tcp" ? "selected" : "")+`>TCP</option>
										</select>
									</div>
									<div class="flex-auto w-36 px-1 ">
										<label class="virt-label">
											{{lb_port}}
										</label><br>
										<input type="text" name="edit_dest_port" id="edit_dest_port" value="`+data.dest_port+`" class="virt-input">
									</div>
								</div>
							</div>
							<div class="flex flex-row w-100 my-3" `+(data.source_protocol == "http" ? "style='display:none'" : "")+`>
								<div class="flex-initial w-36">
									<label class="virt-label">{{lb_reinstall_ssl}}&nbsp;<a class="info" data-placement="right" tooltip="{{lb_reinstall_ssl_exp}}"><i class="fas text-primary fa-info-circle"></i></a></label>
								</div>
								<div class="flex-initial">
									<div class="custom-control custom-checkbox">
										<input type="checkbox" name="reinstall_ssl" id="lb_reinstall_ssl" class="virt-checkbox">
										<label class="virt-label" for="lb_reinstall_ssl"></label>
									</div>
								</div>
							</div>

							<div class="" id="lb_edit_use_own_div" style="display:none;">
								<h4 class="mb-0">{{lb_cert_details}}</h4>
								<div class="flex flex-col mx-auto w-100">
									<div class=" px-1 my-2">
										<label class="virt-label">
											{{lb_ssl_name}}
										</label><br>
										<input type="text" name="edit_ssl_name" class="virt-input"/>
									</div>
								</div>
								<div class="flex flex-col mx-auto w-100">
									<div class="px-1 my-2">
										<label class="virt-label">
											{{lb_cert}}
										</label><br>
										<textarea class="virt-input " name="edit_cert" rows="5"></textarea>
									</div>
									<div class=" px-1 my-2">
										<label class="virt-label">
											{{lb_key}}
										</label><br>
										<textarea class="virt-input " name="edit_key" rows="5"></textarea>
									</div>
									<div class=" px-1 my-2">
										<label class="virt-label">
											{{lb_chain}}
										</label><br>
										<textarea class="virt-input " name="edit_chain" rows="5"></textarea>
									</div>
								</div>
							</div>
						</form>
					</div>
					<!-- Modal footer -->
					<div class="p-4 border-t text-center border-gray-200 rounded-b dark:border-gray-600">
						<input type="submit" class="blue_btn" id="edit_settings" value="{{lb_save_settings}}">
					</div>
				</div>
			</div>
		</div>
`;
	var ele = $(_htm).prependTo('#edit_lb_rule_div');
	toggleModal('lbrule_modal');
	showtooltip();
	$("#lb_edit_ssl_options").on("change", function(){
		if($(this).val() == "use_own"){
			$("#lb_edit_use_own_div").show();
		}else{
			$("#lb_edit_use_own_div").hide();
		}
	});
	check_source_protocol(data.source_protocol);
	$("#edit_settings").on("click", function(){
		$("#edit_settings").prop("disabled", true);
		Loading(1);
		$.ajax({
			type: "POST",
			url: "[[API]]act=manage_load_balancer&lb_uuid="+lb_uuid+"&edit_settings=1&api=json",
			dataType : "json",
			data:$("#lb_edit_settings_form").serialize(),
			success:function(res){
				Loading(0);
				$("#edit_settings").prop("disabled", false);
				if("edit_settings_done" in res){
					setTimeout(function(){ success_alert("{{lb_save_settings_done}}");
						$("#alert-modal").on("hidden.bs.modal", function (e) {
							refresh_page();
						});
					return; } ,200);
				}
	
				// Are there any errors ?
				if(typeof(res["error"]) != "undefined"){
					setTimeout(function(){ var errors = "";
					for(x in res["error"]){
						errors = errors + res["error"][x]+ "<br>";
					}
					error_alert(errors); } ,200);
				}
			}
		});
	})
	$(ele).on("hidden.bs.modal", function (e) {
		$("#edit_lb_rule_div").remove();
	});
}

function check_source_protocol(val, checkit = 0){
	if(val == "http"){
		$(".edit_lb_div").removeClass("col-7");
		$(".edit_lb_div").addClass("col-6");
		$(".edit_vps_div").removeClass("col-4");
		$(".edit_vps_div").addClass("col-5");
		$("#lb_edit_ssl_cert").hide();
		$("#lb_edit_use_own_div").hide();
		$("#lb_edit_ssl_options").val("create");
		if(checkit){
			$("#lb_edit_source_port").val("80");
		}
	}else if(val == "https" || val == "http2" || val == "http3"){
		$(".edit_lb_div").removeClass("col-6");
		$(".edit_lb_div").addClass("col-7");
		$(".edit_vps_div").removeClass("col-5");
		$(".edit_vps_div").addClass("col-4");
		$("#lb_edit_ssl_cert").show();
		if(checkit){
			$("#lb_edit_source_port").val("443");
		}
	}else if(val == "tcp"){
		$(".edit_lb_div").removeClass("col-7");
		$(".edit_lb_div").addClass("col-6");
		$(".edit_vps_div").removeClass("col-4");
		$(".edit_vps_div").addClass("col-5");
		$("#lb_edit_ssl_cert").hide();
		$("#lb_edit_use_own_div").hide();
		$("#lb_edit_ssl_options").val("create");
		if(checkit){
			$("#lb_edit_source_port").val("22");
		}
	}
}

//load balancer onload
function load_balancer_onload(){
	if(!("load_balancer" in N) || empty(N["load_balancer"])){
		$("#lb_list").html('<div class="notice">{{no_lb}}</div>');
		return false;
	}
	lb_table = `
	<table class="table min-w-full whitespace-nowrap w-100" id="lb_table" cellpadding="8">
		<thead class="bg-[#F8FAFD] dark:bg-[#15172B] border-y border-y-[#ECEFF3] dark:border-y-gray-800">
			<tr>
				<th>
					{{id}}
				</th>
				<th>
					{{lb_vps_host}}
				</th>
				<th>
					{{lb_ip}}
				</th>
				<th>
					{{lb_num_vps}}
				</th>
				<th>
					{{lb_user}}
				</th>
				<th>
					{{lb_server_group}}
				</th>
				<th>
					{{lb_manage}}
				</th>
			</tr>
		</thead>
		`;
		$.each(N['load_balancer'], function(k, v){
			lb_table += `
			<tr>
				<td>
					`+v['lbid']+`
				</td>
				<td>
					`+v['hostname']+` (`+v['vpsid']+`)
				</td>
				<td>
					`+v['ip']+`
				</td>
				<td>
					`+v['num_vps']+`
				</td>
				<td>
					`+v['email']+`
				</td>
				<td>
					`+v['sg_name']+`
				</td>
				<td>
					<a onclick="loadpage('lb_uuid=`+v['vps_uuid']+`&act=manage_load_balancer');" title="{{lb_manage}}"><i class="fas fa-cog blue-icon mx-2"></i></a>
					<a href="javascript:void(0);" onclick="lb_delete('`+v['vps_uuid']+`')" title="{{delete}}"><i class="fas fa-trash danger"></i></a>
				</td>
			</tr>
			`;
		});
	lb_table +=`
	</table>`;
	$("#lb_list").html(lb_table);
	$("#lb_table").dataTable({
		'destroy': true,
		'paging': false,
		'columnDefs': [ 
			//{ 'targets': [7] }, // column index (start from 0)
			{ "orderable": false, "targets": [6] },
		],
		'autoWidth': false,
	});
	$("#lb_table_filter").parent().prev().addClass("pagination-top")
	pageLinks("pagelinks_lb", 'act=load_balancer', N['page']);
	
}

////////////////////////////
// Miscellaneous FUNCTIONS
////////////////////////////

// Match the passwords
function pass_match(pass1, pass2, msg_div){
	var newpass = $("#"+pass1).val();
	var conf = $("#"+pass2).val();
	if(newpass !== conf){
		$("."+msg_div).text("{{pass_match}}");
		$("."+msg_div).css("color", "red");
	}else{
		$("."+msg_div).text("");
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
		return	a.status - b.status;
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

function unit_convert(v, round_nearest = 0){

	let storage_units = ['MB', 'GB', 'TB', 'PB'];
	var units_index = 0;

	while (v >= 1024 && units_index < storage_units.length - 1) {
		v /= 1024;
		units_index++;
	}

	if(round_nearest){
		return Math.round(v) + ' ' + storage_units[units_index];
	}else{
		return parseFloat(v).toFixed(2)+' '+storage_units[units_index]
	}
	
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
	if (password1.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))	strength += 1.5;	
	
	//If it has numbers and characters, increase strength value.
	if (password1.match(/([a-zA-Z])/) && password1.match(/([0-9])/))	strength += 1.5;	
	
	//If it has one special character, increase strength value.
	if (password1.match(/([!,%,&,@,#,$,^,*,?,_,~])/) && password1.match(/([a-zA-Z])/))	strength += 1.5;
	
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

function check_pass_strength(id, strength_meter_div) {

	var pass = $("#"+id).val();
	var strength = Array();

	$("."+id+"_pass-strength").removeClass("short bad good strong");

	if (!pass) {
		display_pass_strength("strength_indicator", 0, id, strength_meter_div);
		return;
	}

	try{

		strength = passwordStrength(pass);
		
		if(strength[1] > 100) strength[1] = 100;

		switch(strength[0]){
			case 1:
				score = "bad";// For short password
				display_pass_strength(score, strength[1], id, strength_meter_div);
				break;
			case 2:
				score = "bad"; // For bad password
				display_pass_strength(score, strength[1], id, strength_meter_div);
				break;
			case 3:
				score = "good";// For good password
				display_pass_strength(score, strength[1], id, strength_meter_div);
				break;
			case 4:
				score = "strong";// For Strong password
				display_pass_strength(score, strength[1], id, strength_meter_div);
				break;
		}
	}catch(e){}
};

function display_pass_strength(score, per, id, strength_meter_div){

	var lang;

	if(typeof per == "undefined") per = 0;

	if(score == "bad") lang = "{{bad}}";
	if(score == "good") lang = "{{good}}";
	if(score == "strong") lang = "{{strong}}";
	if(score == "short") lang = "'{{short}}";
	if(score == "strength_indicator") lang = "{{strength_indicator}}";

	var weakIndicator = $("."+strength_meter_div+" .weakIndicator");
	var mediumIndicator = $("."+strength_meter_div+" .mediumIndicator");
	var strongIndicator = $("."+strength_meter_div+" .strongIndicator");
	// var strengthText = $("."+strength_meter_div+" .strengthText");

	if (per === 0) {
		weakIndicator.hide();
		mediumIndicator.hide();
		strongIndicator.hide();
	} else if (per <= 50) {
		weakIndicator.show();
		mediumIndicator.hide();
		strongIndicator.hide();
	} else if (per > 50 && per < 100) {
		weakIndicator.show();
		mediumIndicator.show();
		strongIndicator.hide();
	} else {
		weakIndicator.show();
		mediumIndicator.show();
		strongIndicator.show();
	}
	// strengthText.text(lang);
	$("."+id+"_pass-strength").addClass(score).html(lang + "(" + per + "/100)");
};

function setpwd(size){
	var pwd = rand_pass(size);
	$("#os_newpass").val(pwd);
	$("#conf_pass").val(pwd);
};

function copy_password(){

	var os_newpass = $("#os_newpass").val();
	$("#prompt-modal .modal-body").html(`<label class="virt-label">{{new_pass}}</label><input type="text" class="virt-input " value="${os_newpass}">`);
	toggleModal('prompt-modal');
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

function formatState (state) {
	if (!state.id) { return state.text; }
	var icon = $(state.element).data("icon");
	var $state = $(
		"<span><img src=\"" + icon + "\" class=\"distro_img\" style=\"margin-right:5px\" /> " + state.text + "</span>"
	);
	return $state;
};

$(document).ready(function(){

	$(".select2").select2({ width: '100%'});

	virt_pop();
	
	$('.cplogos').click(function(){

		clicked_input = $(this).children().attr("name");
		$('#cp_ins').val(clicked_input);

		modalConfirm(function(confirm){
			if(confirm){
				return submitit('installcp');
			}else{
				return false;
			}
		},'{{cpan_confirm}}');

		return false;
	});

	$('.login-password').click(function(){
		if($(this).hasClass('fa-eye')){
			$("#_password").attr("type","text");
			$(this).removeClass('fa-eye');
			$(this).addClass("fa-eye-slash");
		}else{
			$("#_password").attr("type","password");
			$(this).removeClass('fa-eye-slash');
			$(this).addClass("fa-eye");
		}
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
	return (v < 1 ? '<i class="fas fa-infinity"></i>' : v);
};

function res_ava(v, u){
	return (((v < 1) && (u < 1)) ? '<i class="fas fa-infinity"></i>' : v);
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

function changevpsstatus(vpsid, status, net_status){
	
	if(status == 0){
		
		$("#stat_" + vpsid).html('<i class="fa fa-circle text-red-600"></i>');

	}else if(status == 1){
		
		$("#stat_" + vpsid).html('<i class="fas fa-circle text-green-600" title="{{lst_vps_id_stat_on}}"></i>');

		$("#sus_" + vpsid).html('<a title="{{lst_lv_suspendvs}}" onclick="vpsaction(\'suspend\', '+vpsid+');"><i class="fa fa-pause fa-1x text-gray-600"></i></a>');
		
		$("#net_sus_" + vpsid).html((net_status == 0 ? '<a title="{{lst_suspendvs_net}}" onclick="vpsaction(\'network_suspend\', '+vpsid+');"><span class="fa-stack"><i class="fas fa-wifi text-blue-600 fa-stack-1x"></i><i class="fa fa-solid fa-stack-1x fa-slash danger"></i></span></a>' : '<a title="{{lst_unsuspendvs_net}}" onclick="vpsaction(\'network_unsuspend\', '+ vpsid +');"><i class="fas fa-wifi text-blue-600"></i></a>'));

	}else if(status == 2){
		
		$("#stat_" + vpsid).html('<i class="vpslist fa fa-circle text-gray-600" title="{{lst_vps_state_suspended}}"></i>');

		$("#sus_" + vpsid).html('<a title="{{lst_lv_unsuspendvs}}" onclick="vpsaction(\'unsuspend\', '+vpsid+');"><i class="fas fa-play text-blue-600"></i></a>');
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
			$("#"+ele2).html('<i class="fas fa-sort-up fa-1x mr-2"></i>')
		}
	}else{
		$("#"+ele).slideUp("slow");
		if(ele2 != 0){
			$("#"+ele2).html('<i class="fas fa-sort-down fa-1x mr-2"></i>')
			
		}
	}
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
function ihb_list_plans(sgid, get_lb_plans = 0){
	
	// Make sure the divs are visible
	$('#ihb_div').show();
	$('#ihb_no_pl').hide();
	$("#ihb_plans .ihb_plans_container").hide();
	$(".lb_ihb_plans_container").hide();
	
	if('servergroups' in N){
		$('#ihb_sel_plan').html(N["servergroups"][sgid]['sg_reseller_name']);
	}
	
	// Make the list of plans
	var html = '';
	var lb_html = '';
	var pricing = {};
	var tempi = 0;
	var plan_start = '';
		
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
	
	if('servergroups' in N && empty(N["servergroups"][sgid]["virts"])){
		return false;
	}

	let sgid_allowed_virts = Array();

	if('servergroups' in N){
		sgid_allowed_virts = Object.values(N["servergroups"][sgid]["virts"]);
	}
	

	// Is there any plan
	if(empty(pricing)){
		$('#ihb_no_pl').show();
		$('.adv_border').hide();
		$('#the_creator').hide();
	}else{

		let first_lb_plan_id = '';
		let first_plan_id = '';
		let cpu_icon = '<svg fill="#0075ff" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" class="h-6 inline"><g stroke-width="0"></g><path d="M23.08 23.07h-11v1.5h11.75a.75.75 0 0 0 .75-.75V11.33h-1.5Z" class="clr-i-outline clr-i-outline-path-1"></path><path d="M32.2 18.15a.8.8 0 1 0 0-1.6H30v-5.4h2.2a.8.8 0 1 0 0-1.6H30V8.1A2.1 2.1 0 0 0 27.9 6h-1.55V3.8a.8.8 0 1 0-1.6 0V6h-5.4V3.8a.8.8 0 1 0-1.6 0V6h-5.4V3.8a.8.8 0 1 0-1.6 0V6H8.1A2.1 2.1 0 0 0 6 8.1v1.45H3.8a.8.8 0 1 0 0 1.6H6v5.4H3.8a.8.8 0 1 0 0 1.6H6v5.4H3.8a.8.8 0 1 0 0 1.6H6v2.75A2.1 2.1 0 0 0 8.1 30h2.65v2.2a.8.8 0 1 0 1.6 0V30h5.4v2.2a.8.8 0 1 0 1.6 0V30h5.4v2.2a.8.8 0 1 0 1.6 0V30h1.55a2.1 2.1 0 0 0 2.1-2.1v-2.75h2.2a.8.8 0 1 0 0-1.6H30v-5.4ZM28 27.9a.1.1 0 0 1-.1.1H8.1a.1.1 0 0 1-.1-.1V8.1a.1.1 0 0 1 .1-.1h19.8a.1.1 0 0 1 .1.1Z" class="clr-i-outline clr-i-outline-path-2"></path></svg>';

		let space_icon = '<svg fill="#0075ff" class="h-6 inline" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><path class="clr-i-outline clr-i-outline-path-1" d="M34 21.08 30.86 8.43A2 2 0 0 0 28.94 7H7.06a2 2 0 0 0-1.93 1.47L2 21.08a1 1 0 0 0 0 .24V29a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2v-7.69a1 1 0 0 0 0-.23M4 29v-7.56L7.06 9h21.87L32 21.44V29Z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M6 20h24v2H6z"></path><path class="clr-i-outline clr-i-outline-path-3" d="M26 24h4v2h-4z"></path></svg>';

		let ram_icon = '<svg class="h-6 inline" fill="#0075ff" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><path class="clr-i-outline clr-i-outline-path-1" d="M8 12h4v8H8z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M16 12h4v8h-4z"></path><path class="clr-i-outline clr-i-outline-path-3" d="M24 12h4v8h-4z"></path><path d="M15 27H4V17H2v10a2 2 0 0 0 2 2h12.61v-3.45h2.26V24H15Z" class="clr-i-outline clr-i-outline-path-4"></path><path d="M32 7H4a2 2 0 0 0-2 2v4h2V9h28v4h2V9a2 2 0 0 0-2-2" class="clr-i-outline clr-i-outline-path-5"></path><path d="M32 27H19v2h13a2 2 0 0 0 2-2V17h-2Z" class="clr-i-outline clr-i-outline-path-6"></path></svg>';

		let bandwidth_icon = '<svg fill="#0075ff" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" class="h-6 inline"><g stroke-width="0"></g><path d="M26.54 20.82a.88.88 0 0 0-.88-.88h-4.91l1.1-1.1a.88.88 0 0 0-1.25-1.24l-3.21 3.22L20.6 24a.88.88 0 1 0 1.25-1.24l-1.09-1.06h4.9a.88.88 0 0 0 .88-.88Z" class="clr-i-outline clr-i-outline-path-1"></path><path d="M29.27 21.7a.88.88 0 1 0 0-1.76h-.58a.88.88 0 1 0 0 1.76Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M32.21 20h-.06a.85.85 0 0 0-.85.88.91.91 0 0 0 .91.88.88.88 0 1 0 0-1.76Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M32.59 11a.88.88 0 0 0-1.25 1.24l1.1 1.1h-4.91a.88.88 0 1 0 0 1.76h4.9l-1.09 1.09a.88.88 0 0 0 1.25 1.24l3.21-3.22Z" class="clr-i-outline clr-i-outline-path-4"></path><path d="M24.5 15.07a.88.88 0 1 0 0-1.76h-.58a.88.88 0 1 0 0 1.76Z" class="clr-i-outline clr-i-outline-path-5"></path><path d="M21.9 14.27a.85.85 0 0 0-.85-.88H21a.88.88 0 1 0 0 1.76.91.91 0 0 0 .9-.88Z" class="clr-i-outline clr-i-outline-path-6"></path><path d="M30.36 23.65v.39a3.77 3.77 0 0 1-3.62 3.89H7.28a5.32 5.32 0 0 1-5.13-5.48A5.32 5.32 0 0 1 7.28 17h1.63l.09-.88a8.92 8.92 0 0 1 8.62-8h.08a8.49 8.49 0 0 1 6.56 3.29h2.37a10.55 10.55 0 0 0-8.91-5.25h-.11A10.82 10.82 0 0 0 7.22 15a7.28 7.28 0 0 0-7 7.43 7.27 7.27 0 0 0 7.08 7.43h19.47A5.72 5.72 0 0 0 32.35 24a4 4 0 0 0 0-.39Z" class="clr-i-outline clr-i-outline-path-7"></path></svg>';

		plan_start += ' <div class="flex flex-row flex-wrap lg:gap-5 md:gap-5 xl:gap-5 px-4 pb-2">';

		for(y in pricing){
			var x = pricing[y]['plid'];
			if(empty(N["plans"][x])){
				continue;
			}

			var bandwidth = (N["plans"][x]["bandwidth"] == 0 ? '<i class="fas fa-infinity"></i> ': unit_convert(N["plans"][x]["bandwidth"], 0));
			var download_speed = (N["plans"][x]["network_speed"] == 0 ? '<i class=\'fas fa-infinity\'></i>' : N["plans"][x]["network_speed"] + ' KBps');
			var upload_speed = (N["plans"][x]["upload_speed"] == -1 ? download_speed : (N["plans"][x]["upload_speed"] == 0 ? '<i class=\'fas fa-infinity\'></i>' : N["plans"][x]["upload_speed"]+' KBps'));

			tooltip = classname = '';

			if((N["plans"][x]['plan_name']).length >= 18){
				tooltip = 'tooltip="'+N["plans"][x]['plan_name']+'"';
				classname = 'wrap';
			}

			//if load balancer plan is there then make tab wise selection
			if(!empty(N["plans"][x]['load_balancer']) && !empty(get_lb_plans)){

				if(!sgid_allowed_virts.includes(N["plans"][x]["virt"])){
					continue;
				}
				
				if(empty(first_lb_plan_id)){
					first_lb_plan_id = "ihb_pl_"+sgid+"_"+x;
				}

				lb_html += '<div class="plan-card ihb_regpl pb-2" onclick="ihb_select_plan(this, 1)" id="ihb_pl_'+sgid+'_'+x+'">';


				lb_html += '<div class="plan-card-head rounded-t-lg pt-3 pb-2">';
				lb_html += '<h3 class="plan-card-h3 '+classname+'" '+tooltip+'>'+N["plans"][x]['plan_name']+'</h3>';

				lb_html += '</div>';

				lb_html += '<div class="flex pt-2"><div class="flex flex-col w-1/2 p-1 items-center justify-center">';
				lb_html += '<div class="whitespace-nowrap">';
				lb_html += '<div class="justify-center flex flex-col items-center">';
				lb_html += '<h3 class="plan-mrate"><sup class="px-0.5 !font-light">'+N['billing_symbol']+'</sup>'+parseFloat(pricing[y]['m_rate']).toFixed(0)+'<span class="!font-light !text-sm">/mo</span></h3>';
				lb_html += '<span class="plan-hrate">'+N['billing_symbol']+parseFloat(pricing[y]['h_rate']).toFixed(2)+'/{{li_hour}}</span>';
				lb_html += '</div>';
				lb_html += '</div></div>';
				
				lb_html += '<div class="plan-card-sm w-1/2 justify-center"><div class="flex flex-col">';
				lb_html += '<div class="flex gap-3 items-center py-0.5">'+cpu_icon;
				lb_html += '<h3 class="plancard_h4 text-gray-500 dark:dark:text-gray-300 text-sm">'+N["plans"][x]["cores"]+' {{core}}</h3></div>';
				lb_html += '<div class="flex gap-3 items-center py-0.5">'+space_icon;
				lb_html += '<h3 class="plancard_h4 text-gray-500 dark:dark:text-gray-300 text-sm">'+N["plans"][x]["space"]+' {{gb}}</h3></div>';
				lb_html += '<div class="flex gap-3 items-center py-0.5">'+ram_icon;
				lb_html += '<h3 class="plancard_h4 text-gray-500 dark:text-gray-300 text-sm">'+unit_convert(N["plans"][x]["ram"], 0)+'</h3></div>';
				lb_html += '<div class="flex gap-3 items-center py-0.5">'+bandwidth_icon;
				lb_html += '<h4 class="plancard_h4 text-gray-500 dark:dark:text-gray-300 text-sm">'+bandwidth+'<span class="info-text ml-1" tooltip="{{mon_down_speed}} : '+download_speed+'<br>{{mon_up_speed}} : '+upload_speed+'"><i class="fa fa-info-circle" aria-hidden="true" ></i></span></h3>';
				lb_html += '</div></div>';
			
				lb_html += '</div></div>';
				lb_html += '</div>';
			}else if(empty(N["plans"][x]['load_balancer'])){

				if(!sgid_allowed_virts.includes(N["plans"][x]["virt"])){
					continue;
				}

				if(empty(first_plan_id)){
					first_plan_id = "ihb_pl_"+sgid+"_"+x;
				}

				html += '<div class="plan-card ihb_regpl pb-2" onclick="ihb_select_plan(this)" id="ihb_pl_'+sgid+'_'+x+'">';
				html += '<div class="plan-card-head rounded-t-lg pt-3 pb-2">';
				html += '<h3 class="plan-card-h3 '+classname+'" '+tooltip+'>'+N["plans"][x]['plan_name']+'</h3>';

				html += '</div>';

				html += '<div class="flex pt-2"><div class="flex flex-col w-1/2 p-1 items-center justify-center">';
				html += '<div class="whitespace-nowrap">';
				html += '<div class="justify-center flex flex-col items-center">';
				html += '<h3 class="plan-mrate"><sup class="px-0.5 !font-light">'+N['billing_symbol']+'</sup>'+parseFloat(pricing[y]['m_rate']).toFixed(0)+'<span class="!font-light !text-sm">/mo</span></h3>';
				html += '<span class="plan-hrate">'+N['billing_symbol']+parseFloat(pricing[y]['h_rate']).toFixed(2)+'/{{li_hour}}</span>';
				html += '</div>';
				html += '</div></div>';
				
				html += '<div class="plan-card-sm w-1/2 justify-center"><div class="flex flex-col">';
				html += '<div class="flex gap-3 items-center py-0.5">'+cpu_icon;
				html += '<h3 class="plancard_h4 text-gray-500 dark:dark:text-gray-300 text-sm">'+N["plans"][x]["cores"]+' {{core}}</h3></div>';
				html += '<div class="flex gap-3 items-center py-0.5">'+space_icon;
				html += '<h3 class="plancard_h4 text-gray-500 dark:dark:text-gray-300 text-sm">'+N["plans"][x]["space"]+' {{gb}}</h3></div>';
				html += '<div class="flex gap-3 items-center py-0.5">'+ram_icon;
				html += '<h3 class="plancard_h4 text-gray-500 dark:text-gray-300 text-sm">'+unit_convert(N["plans"][x]["ram"], 0)+'</h3></div>';
				html += '<div class="flex gap-3 items-center py-0.5">'+bandwidth_icon;
				html += '<h4 class="plancard_h4 text-gray-500 dark:dark:text-gray-300 text-sm">'+bandwidth+'<span class="info-text ml-1" tooltip="{{mon_down_speed}} : '+download_speed+'<br>{{mon_up_speed}} : '+upload_speed+'"><i class="fa fa-info-circle" aria-hidden="true" ></i></span></h3>';
				html += '</div></div>';
			
				html += '</div></div>';
				html += '</div>';
			}
			tempi++;
		}

		if(!empty(lb_html)){
			lb_html += '</div>';
		}
		
		// If no valid plans found for selected region
		if(html == ''){
			$('#ihb_no_pl').show();
			$('.adv_border').hide();
			$('#the_creator').hide();
		}else{
			html = plan_start + html + '</div>';
			$(".ihb_plans_container").eq(0).html('<h4 class="virt-form-head mt-3 px-4">{{available_plans}}</h4>'+html);
			$(".ihb_plans_container").show();
			$("#the_creator").show();
		}
		
		if(!empty(lb_html)){

			lb_html = plan_start + lb_html + '</div>';

			$("#lb_tr_hostname").hide();
			$(".lb_ihb_plans_container").eq(0).html('<h4 class="virt-form-head mt-3 px-4">{{available_plans}}</h4>'+lb_html);
			$("#lb_create").show();
			$(".lb_ihb_plans_container").show();
			ihb_select_plan("#"+first_lb_plan_id, 1);
		}else if(!empty(html)){

			$("#lb_create").hide();
			ihb_select_plan("#"+first_plan_id);
		}else{
			return false;
		}

		$("#lb_add_div").html('');
		if("load_balancer" in N && !empty(N['load_balancer'][sgid])){
			lb_html = `
				<div>
					<hr class="my-2 border-b-1 border-[#0075FF] create_common">
					<label class="virt-label">{{select_lb}</label><br>
					<select name="load_balancer" class="virt-select mt-2">
						<option value="0">{{li_none}}</option>`;
					
			$.each(N['load_balancer'][sgid], function(k, lb){
				lb_html += '<option value="'+lb['vps_uuid']+'">'+lb['vpsid']+' - '+lb['hostname']+'</option>';
			});
			lb_html += `</select>
			</div>`;
			$("#lb_add_div").html(lb_html);
		}

	}

	showtooltip();
	
	// Show and scroll
	$("#ihb_plans").show();
	return true;
	
}

// Is called when the user selects a plan
function ihb_select_plan(plan, is_lb = 0){
	
	// Remove selected plan class from previous plan
	$(".ihb_slctd_pl .plan-card-head").removeClass("!border-[#0075FF]");
	$(".ihb_regpl").removeClass('ihb_slctd_pl');
	$("#selected_plan_icon").remove();
	// Add selected plan class to this plan
	$(plan).addClass('ihb_slctd_pl');
	$(".ihb_slctd_pl .plan-card-head").addClass("!border-[#0075FF]");
	
	$(".ihb_slctd_pl").append('<svg id="selected_plan_icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute h-8 top-[.55rem] right-1 fill-[#0075ff] dark:fill-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.559 3.697a3 3 0 0 1 4.882 0l.19.267a1 1 0 0 0 .925.413l.849-.095a3 3 0 0 1 3.313 3.313l-.095.85a1 1 0 0 0 .413.923l.267.19a3 3 0 0 1 0 4.883l-.267.19a1 1 0 0 0-.413.925l.095.849a3 3 0 0 1-3.313 3.313l-.85-.095a1 1 0 0 0-.923.413l-.19.267a3 3 0 0 1-4.883 0l-.19-.267a1 1 0 0 0-.925-.413l-.849.095a3 3 0 0 1-3.313-3.313l.095-.85a1 1 0 0 0-.413-.923l-.267-.19a3 3 0 0 1 0-4.883l.267-.19a1 1 0 0 0 .413-.925l-.095-.849a3 3 0 0 1 3.313-3.313l.85.095a1 1 0 0 0 .923-.413zm6.148 5.596a1 1 0 0 1 0 1.414l-3.819 3.819c-.49.49-1.286.49-1.776 0l-1.82-1.819a1 1 0 1 1 1.415-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0"></path></svg>');

	// Get the Plan ID
	var plid = $(plan).attr('id').split('_')[3];
	if(empty(is_lb)){
		$('#plid').val(plid);
		$('#virt').val(N["plans"][plid]["virt"]);
		fill_ostemplates();
		fill_extra_fields();
		$("#network_speed").val(N['plans'][plid]['network_speed']);
		$("#upload_speed").val(N['plans'][plid]['upload_speed']);
		if(!empty(N['plans'][plid]['recipes'])){

			$('#recipe').val(JSON.parse(N['plans'][plid]['recipes']));
			$('#recipe').select2({width:"100%"});
			
		}
		
		if(N['resources']['network_speed'] > -1){
			$("#adv_options").removeClass('hidden');
		}
	}else{
		$('#lb_plid').val(plid);
		$('#lb_uid').val(N['uid']);
	}

	
	var id = $(plan).attr('id');
	var val = $('#'+id).find('.plan-title').text();
	$('#hostname-1').val(val.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''));

	$(".create_common").show();	

	if(!empty(is_lb)){
		$("#lb_tr_hostname").show();
	}else{
		if(empty(N['disable_webuzo'])){
			$("#webuzo_show_tr").show();
		}
		$("#tr_rootpass").show();
		$("#tr_uid").show();
		$("#tr_os").show();
		$("#tr_vm_count").show();
		$("#ssh_options_div").show();
		$("#lb_add_div").show();
		$("#disable_password").show();
	}
	
}

// Parse the form
function fill_virts(prefix){
	prefix = prefix || '';
	var sgid = parseInt($("#"+prefix+"sgid").val());

	if($("."+prefix+"selected_region").length > 0){
		let selected_region_id = ($("."+prefix+"selected_region").attr('id')).split("_");
		sgid = selected_region_id.pop();
	}

	//sgid = ;
	var allowed_virts = new Object();
	$("#"+prefix+"tr_regions").hide();
	// Show the virts
	if(sgid < 0){
		return false;
	}

	if('servergroups' in N){
		var virts = N["servergroups"][sgid]["virts"];

		for(V in virts){
			try{
				if(N["resources"]["allowed_virts"][virts[V]]){
					allowed_virts[virts[V]] = virts[V];
				}
			}catch(e){}
		}

		var allowed_virts_html = '';

		for(virt in allowed_virts){

			var selected = N['set_def_hvm'] == 1 && virt.toLowerCase().search('hvm') != -1 ? "selected='selected'" : '';

			allowed_virts_html += '<option value="'+virt+'" id="virt_'+virt+'" '+selected+'>'+N['virt_lang'][virt]+'</option>';
		}

		$("#"+prefix+"virt").html(allowed_virts_html);
	}
	
	// Also list region plans and their pricing
	if(!empty(N['inhouse_billing'])){

		let get_lb_plans = (prefix == 'lb_') ? 1 : 0;
		let has_plans =  ihb_list_plans(sgid, get_lb_plans);

		if(!has_plans){
			$('.create_common').hide();
			if(prefix == 'lb_'){
				$('#lb_ihb_no_pl').show();
				$("#lb_tr_hostname").hide();
				$("#lb_create").hide();
				return false;
			}

		}else{
			if(prefix == 'lb_'){
				$('#lb_ihb_no_pl').hide();
			}
		}
	}

	// Also try to fill OS Templates now
	fill_ostemplates();
	fill_extra_fields();

};

function merge_array(array1, array2) {
	var result_array = [];
	var arr = array1.concat(array2);
	var len = arr.length;
	var assoc = {};

	while(len--) {
		var item = arr[len];

		if(!assoc[item]) 
		{ 
			result_array.unshift(item);
			assoc[item] = true;
		}
	}

	return result_array;
}

// Fills the virts
function fill_ostemplates(prefix){

	if(typeof prefix == "undefined"){
		prefix = '';
	}
	
	var plid;
	var mgs_array = [];
	if('plans' in N){
		$('.ihb_regpl').each(function(){
			if($(this).hasClass('ihb_slctd_pl')){
				plid = $('.ihb_slctd_pl').attr('id').split('_')[3];
				var mgs = N['plans'][plid]['mgs'];
				if(empty(mgs)){
					return mgs_array;
				}
	
				mgs_array = mgs.split(',');
	
				mgs_array = $.map(mgs.split(','), function(value){
					return parseInt(value);
					// or return +value; which handles float values as well
				});
	
			}
		});
	}
	
	prefix = prefix || '';

	var virt = $("#"+prefix+"virt").val();

	// if virt is empty take it from selected plan
	if(empty(virt) && !empty(plid)){
		virt = N['plans'][plid]['virt'];
	}

	// For pending setup we will need to take it from id=ps_virt
	if(empty(virt)){
		var virt = $("#ps_virt").val();
	}
	
	var user_mgs = N['user_mgs'] ? N['user_mgs'] : [];

	var tmp_mgs = [];

	tmp_mgs = !empty(mgs_array) ? mgs_array : merge_array(user_mgs, mgs_array);

	var temp = [];

	var os_badge = `

	<div class="`+prefix+`create_os commonBoxShadow dark:shadow-white/20 relative border-[#0075ff12] dark:border-none flex flex-col items-center bg-white gap-3 p-3 m-2  rounded-lg cursor-pointer lg:w-48 md:w-48 w-full dark:bg-[#101224] active:border-[#0075FFB5]">
		<div class="absolute top-1 right-1 bg-[#EBF4FF] p-1.5 rounded-full hidden">
			<svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
				<path d="M8 1L3.1875 6L1 3.72727" stroke="#0075FF" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
		<img src="" class="distro_img" width="60"/>
		<div class="w-full flex flex-col items-center">
			<h3 class="text-[#1F212D] dark:text-white font-medium mb-2 distro_name"></h3>
			<select class="text-[#5F6F64] dark:text-white text-sm !border-0 !border-b-2 focus:!border-0 focus:!border-b-2 !border-[#0075FF] dark:border-gray-600 bg-white dark:bg-[#15172B] p-2 w-full outline-none version pop">
				<option value="-1">{{os_select_version}}</option>
			</select>			
		</div>
		<div class="os_badge_list dropdown-menu w-100"></div>
	</div>
	`;

	$("#"+prefix+"osid-box").html('');
	var oslist = [];

	// Now show the allowed templates
	for(x in N["ostemplates"]){
		if(virt != N["ostemplates"][x]["Nvirt"]){
			continue;
		}

		if(tmp_mgs.length > 0){
			for(var i = 0; i < tmp_mgs.length; i++) {

				if(jQuery.inArray(parseInt(tmp_mgs[i]), N['ostemplates'][x]['mg']) !== -1){

					if(jQuery.inArray(x, temp) !== -1){
						continue;
					}

					temp.push(x);

					var distro_name = (N["ostemplates"][x]['distro'] == '') ? '{{os_other}}' : N["ostemplates"][x]['distro'];

					if(typeof(oslist[distro_name]) === 'undefined'){
						oslist[distro_name] = [];
					}
					oslist[distro_name][x] = N["ostemplates"][x];

				}
			}
		}
		
		if(tmp_mgs.length == 0){
			var distro_name = (N["ostemplates"][x]['distro'] == '') ? '{{os_other}}' : N["ostemplates"][x]['distro'];

			if(typeof(oslist[distro_name]) === 'undefined'){
				oslist[distro_name] = [];
			}
			
			oslist[distro_name][x] = N["ostemplates"][x];

		}

	}

	if(empty(oslist)){
		$("#"+prefix+"osid-box").html(`<div class="w-full"><div class="notice">{{no_os_templates}}</div></div>`);
	}

	for(x in oslist){

		if(oslist[x] != ''){

			var distro_name = '';
			var distro_img = '';

			if(x == ''){
				distro_name = '{{os_other}}';
				distro_img = '[[svg]]others.svg';
			}else{
				distro_name = x;
				distro_img = `[[svg]]${x}.svg`;
			}

			var $os_select = $(os_badge).clone();
			
			$os_select.find('.distro_img').attr('src', distro_img);
			$os_select.find('.distro_name').text(distro_name);
			
			var os_ids = Object.keys(oslist[x]);
			// Show dropdown only if distro has more than 1 template
			if(os_ids.length > 1) {
				for(os in oslist[x]) {
					$os_select.find('.version').append('<option value="'+os+'" data-os="'+os+'">'+oslist[x][os]['name']+'</option>');
					$("#"+prefix+"osid-box").append($os_select);
				}
			} else {

				var os_id = os_ids[0];
				$os_select.find('.version').append('<option value="'+os_id+'">'+oslist[x][os_id]['name']+'</option>');			
				$os_select.find('.create_os').attr('data-os', os_id);
				$os_select.find('.os_badge_list').remove();
			}

			$("#"+prefix+"osid-box").append($os_select);
		}
	}

	os_badges(prefix+'osid-box', prefix+'osid', prefix);

};

hide_on_tabs_action('tr_iso', 'tr_bios');

//hides the element on particaluar nav tab action
function hide_on_tabs_action(hide_action_id, prefix = ''){

	$( document ).ready(function() {
		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			$("#"+prefix).hide();
			if($("#"+hide_action_id).hasClass('active')){
				$("#"+prefix).show();
			}
  		});
	});

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
	let first_sgid = 0;
	let found_first_sgid = 0;

	for(x in N["servergroups"]){
		sgid = x;

		if(found_first_sgid == 0 && !empty(N["servergroups"][x]['virts'])){
			first_sgid = x;
			found_first_sgid = 1;
		}

		i++;
	}

	select_region(first_sgid, prefix);
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
function makedata(data, date, remove_other_date_data = {}){
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
			if(!empty(remove_other_date_data) && (date < remove_other_date_data["minDate"] || date > remove_other_date_data["maxDate"])){
				continue;
			}
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
		background: "#1E1E1E",
		color:"white",
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
		$('#lmrdns').removeClass('!hidden');
	}
	
	// Does this user have access to 2FA ?
	if("enable_2fa" in N){
		$('#lmtwofactauth').show();
		$('#info_twofactauth_li').show();
	}

	// Does this user have access to pdns ?
	if("pdns" in N){
		$('#lmpdns').removeClass('!hidden');
	}

	// Do we have to show API credentials ?
	if(empty(N["disable_apicredential"])){
		$('#lmapikey').show();
	}

	// Do we have to show API credentials ?
	if(N["uid"] > 0){
		$('.disable_loginlogo').html('<img src="[[images]]disable_logo.png" width="600"/>');
		$('.disable_loginlogo').show();
		$('.disable_loginlogo_mainlogo').hide();
	}

	// Id user type is 2 than show else dont show
	for(x in default_hidden_t2){
		if(N['user_type'] == 2){
			$('#'+default_hidden_t2[x]).removeClass('!hidden');
		}else{
			$('#'+default_hidden_t2[x]).addClass('!hidden');
		}
	}

	if(empty(N['disable_recipes'])  && N['user_type'] == 2){
		$('#lmrecipes').removeClass('!hidden');
	}

	// Is this user a billing user ?
	if (!empty(N['inhouse_billing'])) {
		$('#lmbilling').removeClass('!hidden');
		$('#lmcloudres').addClass('!hidden');

		if(!("disable_volume_enduser" in N)){
			$("#lmvolume").removeClass('!hidden');
		}

		if(!("disable_lb_enduser" in N) && ("check_licensepro" in N) && !empty(N['check_licensepro'])){
			$("#lmload_balancer").removeClass('!hidden');
		}
	}

	if (("enable_eu_iso" in N)) {
		$('#lmeuiso, #enduser_iso').removeClass('!hidden');
	}
	
	if(!("disable_webuzo" in N)){
		$('#lmapps').removeClass('!hidden');
	}
	
	// Are we suppose to show the iso option for HVM?
	if(!empty(N["info"]) && ("iso_support" in N["info"]["flags"]) && (N["info"]["flags"]["iso_support"] <= 0)){
		$('#lmeuiso, #enduser_iso').addClass('!hidden');
	}

	// Does this user have access to backup servers ?
	/* if(!("disable_backup_cp" in N)){
		$('#lmbackupservers').show();
	} */

	if(!("disable_enduser_sshkeys" in N)){
		$('#lmsshkeys').removeClass('!hidden');
	}

	if(!("disable_enduser_firewall" in N)) {
		$('#lmfirewallplan').removeClass('!hidden');
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
		error_alert("{{res_nothing_sel}}");
		return;
	}
};

// Show the Device restore window to restore on the server
function ShowDeviceRestore(){

	// Selected files and folders
	var fnf = getSelectedRestore();

	// Check if anything is selected or not
	if(fnf.length < 1){
		error_alert("{{res_nothing_sel}}");
		return;
	}
};

// Starts the server restore process
function doRestore(device){

	device = device || 0;

	// Selected files and folders
	var fnf = getSelectedRestore();

	// Check if anything is selected or not
	if(fnf.length < 1){
		error_alert("{{res_nothing_sel}}");
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

function showtooltip(){
	//return true;
	// Get the html tag
	$('.tooltip_holder').html('');
	$('[tooltip]').each(function(i, v){

		var tag = $(this).prop('tagName');

		var tooltip_text = $(this).attr('tooltip');
		var rand_str = randstr(6);

		// add the attribute as well
		$(this).attr('data-tooltip-target', rand_str);

		var tootltip_div = '<div id="'+rand_str+'" role="tooltip" class="tooltip_class tooltip opacity-0 invisible absolute z-40 inline-block">'+tooltip_text+'<div class="tooltip-arrow" data-popper-arrow></div></div>';

		var parent_tag = $(this).parent().prop('tagName');
		$('.tooltip_holder').append(tootltip_div);
		
		$(this).removeClass('cursor-pointer');
		$(this).addClass('cursor-pointer');

	});

	// Initialize the flowbite to show tooltip
	initFlowbite();
}

// Time in VPS Manage
$(document).ready(function() {
	//$('.dash-tabs').responsiveTabs();
	
	showtooltip();

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

	$(".scrollbar-virt, .sidebar-nav").scrollbar();

});

$(document).ready(function(){

	$(window).resize(function() {
		var element = $('.dash-tabs-responsive');
		tabResponsive(element); 
	});

});

function tabResponsive(element) {
    $('#responsive-drp-button').hide();
    var mainElementWidth = element.parent().width();
    
    var buttons = element.find('button');
    var buttonIds = [];
    var dropdownTabsButtonIds = [];
    
    buttons.each(function() {
        var buttonId = $(this).attr('id');
        if (buttonId !== 'responsive-drp-button' && $(this).css('display') !== 'none') {
            if ($(this).parent().attr('id') === 'dropdown-tabs') {
                dropdownTabsButtonIds.push(buttonId);
            } else {
                buttonIds.push(buttonId);
            }
        }
    });

    // Combine buttonIds and dropdownTabsButtonIds
    var allButtonIds = buttonIds.concat(dropdownTabsButtonIds);

    // Move all buttons to .dash-tabs-responsive first
    allButtonIds.forEach(function(buttonId) {
        $('#' + buttonId).detach().appendTo('.dash-tabs-responsive');
    });
    $('#responsive-drp-button').detach().appendTo('.dash-tabs-responsive');

    // Determine the number of visible buttons based on width
    var maxVisibleButtons;
    if (mainElementWidth >= 1001) {
        $('#responsive-drp-button').hide();
        return;
    } else if (mainElementWidth >= 655) {
        maxVisibleButtons = 6;
    } else if (mainElementWidth >= 555) {
        maxVisibleButtons = 4;
    } else if (mainElementWidth >= 350) {
        maxVisibleButtons = 3;
    } else {
        maxVisibleButtons = 1;
    }

    // Show the responsive button and move excess buttons to #dropdown-tabs
    $('#responsive-drp-button').show();
    var skippedIds = allButtonIds.slice(maxVisibleButtons);
    skippedIds.forEach(function(buttonId) {
        $('#' + buttonId).detach().appendTo('#dropdown-tabs');
    });
}

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
			
			if($v['status'] == -1 || $v['progress_num'] == 100 || !empty($v['notupdated_task'])){
				if($v['status'] == "1"){
					cur_progress = '<i class="fas fa-1x fa-check-circle text-primary success"></i>';
				}else if($v['status'] == "-1" ){
					cur_progress = '<i class="fas fa-1x fa-times-circle danger"></i></i>';
				}
				$('.'+pre+'progressbar'+$v["actid"]).hide();
			}else{
				$('.'+pre+'progressbar'+$v["actid"]).show().width('100%');
				$('#'+pre+'progressbar'+$v["actid"]).width(cur_progress);
			}
			$('#'+pre+'pbar'+$v["actid"]).html(cur_progress);
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
			$("#cpu_tab").show();
		}
	}
	
}

function change_cpu_topology(khidki){
	
	if($(khidki).find('.enable_cpu_topology').is(':checked')){
		$(khidki).find("#eu_topology_sockets").show();
		$(khidki).find("#eu_topology_cores").show();
		$(khidki).find("#eu_topology_threads").show();
		$("#cpu_tab").show();
	}else{
		$(khidki).find("#eu_topology_sockets").hide();
		$(khidki).find("#eu_topology_cores").hide();
		$(khidki).find("#eu_topology_threads").hide();
		$(khidki).find(".topology_sockets").val(0);
		$(khidki).find(".topology_cores").val(0);
		$(khidki).find(".topology_threads").val(0);
	}
	
}

function show_adv_options(par_div, virt=""){

	var elements = document.getElementsByClassName("ihb_regpl");

	if(!empty(elements)){

		var slctd_plid = 0;
		var pl_kvm_cache = '';

		$(elements).each(function(i,v){
			if($(elements[i]).hasClass('ihb_slctd_pl')){
				slctd_plid = $(elements[i]).attr('id').split('_')[3];
				pl_kvm_cache = N['plans'][slctd_plid]['kvm_cache'];
			}
		});
	}
	
	var par_div_id = par_div+" ";
	
	var ei = "";
	if(par_div.indexOf("edit") != -1){
		ei = "ei_";
	}
	
	$(par_div_id+"#tr_"+ei+"disable_ebtables").hide();
	$(par_div_id+"#tr_"+ei+"rdp").hide();
	$(par_div_id+"#tr_"+ei+"cpu_mode").hide();
	$(par_div_id+"select#"+ei+"cpu_mode").html("");
	
	if(virt == ""){
		if($("#virt option").length == 1){
			virt = $(par_div_id+"#virt option").val();
		}else{
			virt = $(par_div_id+"#virt").val();
		}
	}

	// Added Enduser supoort for recipes on create
	if(!empty(N['recipes'])){

		recipes = N['recipes'];
	
		let recp = '';
		for(i in recipes){
			recp += '<option value="'+i+'">'+recipes[i]['name']+'</option>';
		};

		$('#recipe').html(recp);

	}
	
	if(Array("openvz", "vzo").indexOf(virt) != -1){
		return true;
	}
	
	// General Options
	
	var props_show_chk = {};
	
	// General options
	props_show_chk.disable_ebtables = 0;
	
	if(N["resources"] != undefined && N["resources"]["allow_cloud_ebt_disable"] > 0){
		props_show_chk.disable_ebtables = 1;
	}
	
	// HVM Options
	props_show_chk.rdp = 0;
	
	// HVM Options
	if(Array("kvm", "proxk", "xenhvm", "vzk", "xcphvm").indexOf(virt) != -1){
		props_show_chk.rdp = 1
	}
	
	// Show all avalid checkbox
	for (var i in props_show_chk){
		if(props_show_chk[i] == 1){
			var chk_el = "#"+ei+"tr_"+i+" #"+ei+i;
			if(N['vps'] != undefined && N['vps'][i] != undefined){
				$(chk_el).prop("checked", false);
				if(N['vps'][i] > 0){
					$(chk_el).prop("checked", true);
				}
				$("#"+ei+"tr_"+i).show();
			}else{
				$("#tr_"+i).show();
			}
		}else{
			$("#"+ei+"tr_"+i).hide();
		}
	}
	
	if(Array("kvm", "proxk").indexOf(virt) == -1){
		return true;
	}

	var cache_options = ['0', 'writeback', 'writethrough', 'directsync', 'default'];

	var options = '';
	var selected = '';

	cache_options.forEach(function(v){

		selected = (v == pl_kvm_cache ? 'selected=selected' : '');

		if('vps' in N){
			if('kvm_cache' in N['vps']){
				selected = N['vps']['kvm_cache'] == v ? 'selected=selected' : '';
			}
		}
		options += '<option value="'+v+'" '+ selected +' >'+ (v == 0 ? 'None' : ucfirst(v)) +'</option>';
	});

	$('#'+ei+'tr_disk_cache, #'+ei+'disk').show();
	$('#'+ei+'kvm_cache').html(options);

	// KVM related HVM options:
	$("#"+ei+"tr_cpu_mode ,#"+ei+"cpu").show();
	
	// CPU mode select options
	if(N['cpu_modes'][virt] != "" && N['cpu_modes'][virt] != undefined && N['cpu_modes'][virt] != false){
		
		var t_cmodes = N['cpu_modes'][virt];
		
		// This variable holds cpu_modes select options
		var opts = '';
		
		// Variables used to select VPS current cpu_mode value if present
		var selected = '';
		var selected_str = '';
		
		// If this is create and we have plan selected, then load value of plan's cpu_mode
		var plid = '';
		if($('.ihb_slctd_pl').attr('id') != undefined){
			plid = $('.ihb_slctd_pl').attr('id').split('_')[3];
		}
		if(plid > 0 && N['plans'] != undefined && N['plans'][plid] != undefined && N['plans'][plid]['cpu_mode'] != undefined){
			selected = N['plans'][plid]['cpu_mode'];
		}
		
		// If this is editvm, and VPS has cpu_mode present, then select that value.
		if(N['vps'] != undefined && N['vps']['cpu_mode'] != undefined){
			selected = N['vps']['cpu_mode'];
		}
		
		for(i in t_cmodes){
			// Select VPS current cpu_mode value
			selected_str = (selected != '' && selected == t_cmodes[i][0] ? ' selected="selected" ' : '');
			opts += '<option value="'+t_cmodes[i][0]+'" '+selected_str+'>'+t_cmodes[i][1]+'</option>';
		};
		$(par_div_id+"select#"+ei+"cpu_mode").html(opts);
	}
	
	return true;
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
		$('[id^="webuzoos_"]').prop("disabled", false);
		$('[id^="webuzoos_"]').removeProp("disabled");
	}else if($('#collapse1').css('display') == "block" || $('#collapse1').attr('aria-expanded') == "true"){
		$('[id^="webuzoos_"]').prop("disabled", true);
	}
	
};

function webuzo_apps(stack){

	stack = stack || 0;

	// Remove active class from all tab buttons
	document.querySelectorAll('.webuzo_appstack').forEach(btn => {
		btn.classList.remove('active');
	});

	// Add active class to the clicked tab button
	document.querySelector('#'+stack).classList.add('active');
	
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
	
	// Set the value of webuzo_stack to the clicked button's value
	$('#webuzo_stack').val(stack);

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
			$("#stack2_tr, #stack3_tr").addClass('d-inline-block');
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
					str +=`<option value="${val[k]['softname']}">${val[k]['fullname']}</option>`;
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
			return;
		}
		
		if("isfree" in data){			
			$("#lemp, #llmp").hide();
			$(".stack_tr").hide();
		}else{
			$("#lemp, #llmp").show();
			$(".stack_tr").show();
			$(".stack_tr").slideDown("slow");
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
		
		$("#webuzo_scriptlist").html(options);
		
		if("webuzo_apps" in data){
			for(x in data['webuzo_apps']){
				var id = 'webuzo_'+x;
				var str = '';
				var val = data['webuzo_apps'][x];

				for(k in val){
					str +=`<option value="${val[k]['softname']}">${val[k]['fullname']}</option>`;
					
				}		
				$("#"+id).html(str);
			}
		}
		
		if("info" in data && !empty(data["info"]["dns_nameserver"])){
			$.each(data["info"]["dns_nameserver"], function(k,v){	
				$("#webuzo_ns"+(k+1)).val(v);
			});
		}
		
		var webuzo_templates = "<select  id='webuzo_os' name='webuzo_os' class='select2 virt-select my-2'>";
		
		$.each(data["info"]["webuzo_templates"], function(k,v){	

			if(v["hvm"] == N["info"]["vps"]["hvm"]){
				webuzo_templates += '<option value="'+k+'">'+v['name']+'</option>';
			}

		});
		webuzo_templates += "</select>";
		$("#webuzo_templates").html(webuzo_templates);

		$("#webuzo_os").select2({
			"width" : "100%",
		});
		
		
	});
	
	var events = $._data($('#webuzosettingsform')[0], 'events');
	
	if(empty(events)){
		
		$('#webuzosettingsform').submit(function(){

			modalConfirm(function(confirm){
				if(confirm){
					showspinner();
			
					return submitit('webuzosettingsform', 'webuzo_sumbit_response');
				}else{
					return false;
				}
			},'{{webuzo_install_data_lost_warn}}');

			return false;			
		
		});
	}

};

function webuzo_sumbit_response(data){	
	if("webuzo_enabled" in data && data['webuzo_enabled'] == true){
		
	}
};

// VPS with webuzo distro List
function apps_onload(){
	
	if(isError()){
		error(N["error"]);
		return -1;
	}
	if(empty(N['vs'])){
		$('#vslst').html('<div class="notice">{{apps_no_vs}}</div>');
		return;
	}
	
	$('#vslst').html('');
	$('#suspend_div').html("");
	
	var cols = new Object();	
	cols['vpsid'] = {"l" : '{{id}}', "width" : '50'};
	cols['vps_name'] = {"l" : '{{name}}', "width" : '60'};
	cols['vtype'] = {"l" : '{{lst_lv_type}}', "width" : '70'};
	cols['osimg'] = {"l" : '{{lst_lv_os}}', "width" : '60'};
	cols['hostname'] = {"l" : '{{lst_lv_hname}}', "width" : '120'};

	if(!empty(N['info']['flags']['show_server'])){
		cols["server"] = {"l" : '{{lst_lv_sname}}', "width" : '100'};
	}

	// cols['def_ip'] = {"l" : '{{ip}}', "width" : '50'};
	cols['manage_vm'] = {"l" : '', "width" : '1%'};
	
	// Prepare the list
	for(x in N['vs']){
		
		if(!empty(N['vs'][x]['vnc'])){
			vnc_vm.push(x);
		}
		
		$v = N['vs'][x];
		N['vs'][x]['vtype'] = show_virt_name($v['virt'] +($v['hvm'] < 1 ? '' : 'hvm'));
		var os_distro = $v['distro'];
		N['vs'][x]['osimg'] = '<img src="'+( os_distro.match(/^http/g) ? $v['distro'] : '[[images]]'+ $v['distro'] )+'" />';

		if(!empty(N['info']['flags']['show_server'])){
			N['vs'][x]['server'] = N["vs"][x]["server_name"];
		}

		var ip = '';

		for (var k in N['vs'][x]['ips']) {
			ip = N['vs'][x]['ips'][k];
			break;
		}
		
		N["vs"][x]['hostname'] = '<span id="tr_hostname'+$v['vpsid']+'" class="vs-data-1">'+$v['hostname']+'</span>' + (!empty($v['nw_suspended']) ? '<img style="float:right;margin:15px;" title="{{lst_ntwsuspended}}" width="15" id="ntw_suspended'+id+'" src="[[images]]admin/disconnect.png" >': '')+'<span class="d-block font-weight-light">'+ip+'</span>';
		
		N["vs"][x]["manage_vm"] = '<a href="javascript:loadpage(\'act=vpsmanage&webuzo=1&svs='+x+'\');" title="{{manage}}" class="manage-arrow"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>';
	}
	
	// Form the TABLE
	drawTable({'id' : 'vslst', 'tid' : 'vslst_list_table'}, cols, N["vs"]);
	
	var srt = 0;
	if(!empty(N['info']['flags']['enable_idsort'])){
		srt = 1;
	}
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
				$(".webuzo_box_stack2_tr, .webuzo_box_stack3_tr").hide();
				$(".webuzo_box_stack1_tr").addClass("active");
			}else{
				$(".webuzo_box_stack2_tr, .webuzo_box_stack3_tr").show();
				$(".webuzo_box_stack_tr").slideDown("slow");
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
			
			$("#webuzo_box_scriptlist").html(options);
			
			if("webuzo_apps" in data){
				for(x in data['webuzo_apps']){
					var id = 'webuzo_box_'+x;
					var str = '';
					var val = data['webuzo_apps'][x];
					for(k in val){
						str += `<option value="${val[k]['softname']}" id="serverver_${k}" >${val[k]['fullname']}</option>`
					}				
					$("#"+id).html(str);
				}
			}
			
			var webuzo_templates = "<select name='webuzo_os' class='virt-select'><option value='0' >{{li_none}}</option>";
			$.each(data["webuzo_templates"], function(k,v){	
				webuzo_templates += '<option value="'+k+'">'+v['name']+'</option>';
			});
			webuzo_templates += "</select>";
			$("#webuzo_box_templates").html(webuzo_templates);
			
		});
		
		$('#webuzo_box').show();
		$('#webuzo_box_adv_border').show();
	}
		
	else{
		$('#webuzo_box').hide();
	}
}

function webuzo_box_apps(stack){
	stack = stack || 0;
	
	// Remove active class from all tab buttons
	document.querySelectorAll('.webuzo_box_stacks').forEach(btn => {
		btn.classList.remove('active');
	});

	// Add active class to the clicked tab button
	document.querySelector('#'+stack+'_stack').classList.add('active');
	
	if(stack === 'lamp'){
		$("#webuzo_box_webserver_tr").show();
		// $("#webuzo_box_stack_tr").hide();
	}else{
		$("#webuzo_box_webserver_tr").hide();
	}
}


function webuzo_box_script_req(sid){
	
	if(sid == 0 || $(".webuzo_box_stack1").data("demo") > 0){
		return;
	}
	
	$(".webuzo_box_stack1, .webuzo_box_stack2, .webuzo_box_stack3").removeClass("active");
	
	processing_symb(1);
	
	AJAX('[[API]]act=create&scriptreqid='+sid, function(data) {
		processing_symb();
		if("error" in data){
			error(data["error"]);
			$(".webuzo_box_unsupport").show();
			return;
		}
		
		if("isfree" in data){
			$(".webuzo_box_stack2_tr, .webuzo_box_stack3_tr").hide();
			$(".webuzo_box_stack1_tr").addClass("active");
		}else{
			$(".webuzo_box_stack2_tr, .webuzo_box_stack3_tr").show();
			$(".webuzo_box_stack1_tr").data("demo", "0");
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
					str +=`<option value="${val[k]['softname']}" name="${x}">${val[k]['fullname']}</option>`;
				}
				processing_symb();
				$("#"+id).html(str);
				$("#webuzo_webserver_tr").show();
			}
		}
	});
};

function gateway_req(val){

	$("#payment-error").html(" ");
	
	let gateway = $('#gateway').val();

	// Is there a requirement function ?
	var requirementfn = window[val+'_requirement'];
	if(typeof requirementfn === 'function'){
		requirementfn(val);
	}

	if(gateway == 'razorpay'){
			
		$('#make_payment_form').submit(function(event){
			event.preventDefault();
			process_payment();
		});

	}else{
		$('#make_payment_form').unbind('submit');
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


// For showing the search form on page
function showsearch(){
	if($_("showsearch").style.display == ""){
		$_("showsearch").style.display = "none";
	}else{
		$_("showsearch").style.display = "";
	}
}

// For LetsEncrypt

// function letsencrypt_onload(){
// 	AJAX('[[API]]act=letsencrypt', function(data){

// 		var crt_details = data['userdata']['crt_details'];
// 		var site_domain = data['userdata']['site_domain'];
// 		if(site_domain == ''){
// 			$("#site_domain").removeClass("domain_header");
// 			$("#site_domain").html("<b>{{le_no_site_domain}}</b>");		
// 			$("#site_domain").addClass("no_domain");
// 		}else{
			
// 			if(site_domain.length == 1){
// 				// Only primary domain
// 				$("#site_domain").html(site_domain);
// 				$("#site_domain").removeClass("no_domain");
// 				$("#site_domain").addClass("domain_header");

// 				// No secondary domain so hide that
// 				$("#sec_site_domain").hide();
// 			}else{
// 				// For primary domain
// 				$("#site_domain").html(site_domain[0]);
// 				$("#site_domain").removeClass("no_domain");
// 				$("#site_domain").addClass("domain_header");

// 				// For secondary domain
// 				site_domain.shift();
// 				$("#sec_site_domain").html(site_domain.join(","));
// 				$("#sec_site_domain").removeClass("no_domain");
// 				$("#sec_site_domain").addClass("sec_domain_header");

// 			}
// 		}

// 		var crt_details_tbl = '<table class="table table-hover" id="crt_details_tbl"><tbody><tr id="crt_details_tbl_hd"><th colspan="2">{{le_crt_details}}</th></tr><tr><td style="width: 120px;" class="fhead">{{server}}</td><td><span class="server_name">'+data['userdata']['servername']+'</span></td></tr>';

// 		var le_crt_details_labels = [];

// 		le_crt_details_labels['crt_domain'] = "{{le_crt_domain}}";
// 		le_crt_details_labels['crt_san'] = "{{le_crt_san}}";
// 		le_crt_details_labels['crt_issuer'] = "{{le_crt_issuer}}";
// 		le_crt_details_labels['crt_serialno'] = "{{le_crt_serialno}}";
// 		le_crt_details_labels['crt_valid_from_time'] = "{{le_crt_valid_from_time}}";
// 		le_crt_details_labels['crt_valid_to_time'] = "{{le_crt_valid_to_time}}";
// 		le_crt_details_labels['next_renew'] = "{{le_next_renew}}";
// 		le_crt_details_labels['crt_installed'] = "{{le_crt_installed}}";

// 		$.each(crt_details, function(index, value){
// 			crt_details_tbl += '<tr><td style="width: 250px;" class="fhead">'+le_crt_details_labels[index]+'</td><td id="'+index+'" style="text-align: left;">'+crt_details[index]+'</td></tr>';
// 		});

// 		crt_details_tbl += '</tbody></table>';

// 		$("#crt_details_tbl_main").html(crt_details_tbl);

// 	});
// }

// function le_show_form(){
// 	AJAX('[[API]]act=letsencrypt', function(data){
// 		var form_labels = [];

// 		form_labels = {
// 			'primary_domain': '{{le_primary_domain}}',
// 			'contact_email': '{{le_contact_email}}',
// 			'key_size': '{{le_key_size}}',
// 			'renew_days': '{{le_renew_days}}',
// 			'staging': '{{le_staging}}',
// 			'enable_force': '{{le_enable_force}}',
// 			'primary_domain_exp': '{{le_primary_domain_exp}}',
// 			'contact_email_exp': '{{le_contact_email_exp}}',
// 			'key_size_exp': '{{le_key_size_exp}}',
// 			'renew_days_exp': '{{le_renew_days_exp}}',
// 			'staging_exp': '{{le_staging_exp}}',
// 			'enable_force_exp': '{{le_enable_force_exp}}'
// 		}

// 		var crt_config_options_inputs = data['userdata']['crt_config_options']['crt_save_cfg_frm']['inputs'];

// 		var install_cert_form = '<form id="crt_save_cfg_frm" name="crt_save_cfg_frm" class="form-horizontal" role="form" action="" method="POST">';

// 		for(var k in crt_config_options_inputs){

// 			if(crt_config_options_inputs.hasOwnProperty(k)){

// 				install_cert_form += '<div class="col-md-12"><div class="form-group" data-toggle="tooltip" data-placement="bottom" title=""><label class="form-label d-inline-block mr-1" for="'+k+'">'+form_labels[k]+'</label><span class="info-text" data-toggle="tooltip" data-aniamtion="true" title="'+form_labels[k+'_exp'+'']+'"><i class="fa fa-info-circle" aria-hidden="true"></i></span>';

// 				var type = crt_config_options_inputs[k]['type'];

// 				switch (type){
					
// 					case 'text':
// 						install_cert_form += '<input type="text" id="'+k+'" name="'+k+'" class="form-control" value="'+crt_config_options_inputs[k]['value']+'"/></div></div>';
// 					break;
// 					case 'select':
// 						install_cert_form += '<select id="'+k+'" name="'+k+'" class="custom-select"></div>';
// 						for(i=0;i<data['userdata']['crt_select_opts'][k].length;i++){
// 							var select_opts = '';
// 							data['userdata']['crt_select_opts'][k][i] == crt_config_options_inputs[k]['value'] ? select_opts = 'selected="selected"' : select_opts = ''; 			
// 							install_cert_form += '<option id="'+data['userdata']['crt_select_opts'][k][i]+'" name="'+data['userdata']['crt_select_opts'][k][i]+'" value="'+data['userdata']['crt_select_opts'][k][i]+'" ' + select_opts + '>'+data['userdata']['crt_select_opts'][k][i]+'</option>';
// 						}
// 						install_cert_form += '</select></div></div>';
// 					break;	
// 					case 'checkbox':
// 						var checkbox = '';
// 						crt_config_options_inputs[k]['value'] == true ? checkbox = 'checked="checked"' : checkbox='';
// 						install_cert_form += '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id="'+k+'" name="'+k+'" '+checkbox+' /><label class="custom-control-label" for="'+k+'"></div></div></div>';
// 					break;
// 					default:
// 					break;	
// 				}
		 
// 			}
	
// 		}
// 		install_cert_form += '<div class="form-group"><div class="text-center" ><button type="button" id="save_cfg_id" class="green_but" onclick="process_req(\'save_cfg\');" >{{le_proceed}}</button></div><div class="col-xs-12"><div class="text-center" id="processing_form" style="display: none;"><div class="progress w-25 mx-auto mt-3">\
// 		<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>\
// 	</div></div></div></div>';	

// 		install_cert_form += '</form>';

// 		$("#processing").css("display", "block");
// 		$("#get_crt_id").css("background-color", "#2C3C69");
// 		$("#conf_modal").modal({keyboard: true});
// 		$("#conf_modal").modal({show:true});
// 		$("#processing").css("display", "none");
// 		$("#get_crt_id").css("background-color", "#06d79c");
// 		$("#conf_modal_body").html(install_cert_form);

// 		$('[data-toggle="tooltip"]').tooltip({
// 			trigger : 'hover'
// 		});

// 	});
// }

// var sel_act = "";

// function process_req(sel){
			
// 	var dos = ["get_crt", "renew_crt", "save_cfg", "show_logs"]; 
// 	$("#progress-cont").hide();
	
// 	if(dos.indexOf(sel) < 0){
// 		error_alert("{{err_invalid_opt}}");
// 		return;
// 	}

// 	// Disable buttons till certificate is being install
// 	for(x in dos){
// 		$("#"+dos[x]+"_id").attr("disabled", "disabled");
// 	}
	
// 	$("#"+sel+"_id").css("background-color", "#2C3C69");
// 	$("#processing").css("display", "block");
// 	var data = "";
// 	if(sel == "save_cfg"){
// 		$("#processing_form").css("display", "block");
// 		data = "opt=save_cfg&"+$("#crt_save_cfg_frm").serialize();
// 		letsencrypt_action(data,sel,dos);
// 	}else if(sel == "show_logs"){
// 		data = "opt="+sel;
// 		letsencrypt_action(data,sel,dos);
// 	}else if(sel == "renew_crt"){

// 		progress = 0;
// 		data = "opt="+sel;
// 		sel_act = sel;

// 		modalConfirm(function(confirm){
// 			if(confirm){
// 				letsencrypt_action(data, sel, dos);
// 			}else{
// 				return false;
// 			}
// 		},"{{le_confirm_process}}");
	
// 		if(sel != "get_crt"){
// 			for(x in dos){
// 				$("#"+dos[x]+"_id").removeAttr("disabled");
// 			}
// 			$("#"+sel+"_id").css("background-color", "#06d79c");
// 			$("#processing").css("display", "none");
// 			return false;
// 		}	

// 	}else{
		
// 		progress = 0;
// 		data = "opt="+sel;
// 		sel_act = sel;

// 		letsencrypt_action(data,sel,dos);
// 	}
// }

// function letsencrypt_action(data, sel='', dos) {
	
// 	AJAX('[[API]]act=letsencrypt&'+data+'', function(data){
		
// 		$("#processing").css("display", "none");
// 		$("#processing_form").css("display", "none");
// 		$("#"+sel+"_id").css("background-color", "#06d79c");
// 		if(sel == "get_crt" || sel == "renew_crt"){
			
// 			$('#letsencrypt-progressbar').show();
// 			console.log(data['userdata']['slaveactid']);
// 			var actid = data['userdata']['slaveactid'];
// 			le_progress('[[API]]act=letsencrypt&actid='+actid);
// 			$("#progress-cont").show();
// 		}else{
// 			if(data['userdata']['done']){
// 				if(sel == "show_logs"){
// 					var logs = '';
// 					!data['userdata']['logs'] == '' ? logs = data['userdata']['logs'] : logs = '{{le_no_logs}}'
// 					$("#logs_modal_body").html("<pre>"+ logs +"</pre>");
// 					$("#logs_modal").modal({keyboard: true});
// 					$("#logs_modal").modal({show:true});
// 					$("#show_logs_id").css("background-color", "#06d79c");
// 				}else if(sel == "save_cfg"){
// 					for(var x in data['userdata']['crt_details']){
// 						$("#"+x).html(data['userdata']['crt_details'][x]);
// 					}
// 					$("#conf_modal").modal("hide");

// 					var primary_domain = $("#primary_domain").val().split(",");
								
// 					if(primary_domain.length == 1){
						
// 						// Only primary domain
// 						$("#site_domain").html(primary_domain);
// 						$("#site_domain").removeClass("no_domain");
// 						$("#site_domain").addClass("domain_header");
						
// 						// No secondary domain so hide that
// 						$("#sec_site_domain").hide();
// 					}else{
						
// 						// For primary domain
// 						$("#site_domain").html(primary_domain[0]);
// 						$("#site_domain").removeClass("no_domain");
// 						$("#site_domain").addClass("domain_header");
						
// 						// For secondary domain
// 						primary_domain.shift();
// 						$("#sec_site_domain").html(primary_domain.join(","));
// 						$("#sec_site_domain").removeClass("no_domain");
// 						$("#sec_site_domain").addClass("sec_domain_header");
// 					}
// 					process_req("get_crt");
// 				}
// 			}else if(data['userdata']['error']){
// 				var err = "";
// 				for(var x in data['userdata']['error']){
// 					err += data['userdata']['error'][x]+"<br>"; 
// 				}
// 				error_alert(err);
// 			}
// 		}
	
// 		$("#conf_modal").modal("hide");
	
// 		for(x in dos){
// 			$("#"+dos[x]+"_id").removeAttr("disabled");
// 		}
	
// 	});

// }

// function donecert(){
// 	if(sel_act == "get_crt"){
// 		alert("'.lang_vars_name($l['done_req_crt'], array('req_crt' => $l['get_crt'])).'");
// 	}else if(sel_act == "renew_crt"){
// 		alert("'.lang_vars_name($l['done_req_crt'], array('req_crt' => $l['renew_crt'])).'");
// 	}
// }

// function le_progress(url){
	
//	 $.getJSON(url, function(data){

// 		var taskdata = data['taskdata'];

// 		var percent = taskdata['progress'];
// 		var status = taskdata['status'];

// 		$('.le-progress-bar').text(percent+"%");
// 		$('.le-progress-bar').width(percent+"%");
// 		$('.status-txt').html(taskdata['status_txt']);

// 		if(percent == 100){
// 			setTimeout(function(){$('#letsencrypt-progressbar').hide();},2000);
// 			location.reload();
// 		}
		
// 		if(status == -1){
// 			error_alert(taskdata['status_txt']);
// 			$('#letsencrypt-progressbar').hide();
// 			clearTimeout(task_timeout);
// 		}
//	 });
//	 task_timeout = setTimeout(function(){le_progress(url);}, 10000);
// }


// type = '' or 0 - Success
// type = 1 - Error
function customAlert(msg, type) {
	
	var type = type || 0;

	if (empty(type)){
		$("#alert-modal .modal-title").html('<i class="fa fa-check-circle mr-2 success" aria-hidden="true"></i> {{modal_success}}');
	} else {
		$("#alert-modal .modal-title").html('<i class="fa fa-times-circle mr-2 error" aria-hidden="true"></i> {{modal_error}}');
	}

	$("#alert-modal .modal-body").html(msg);
	toggleModal('alert-modal');

}

function error_alert(msg){
	//customAlert(msg, 1);
	showToast('toast-danger', msg);
};

function success_alert(msg){
	//customAlert(msg);
	showToast('toast-success', msg);
};

function warning_alert(msg){
	showToast('toast-warning', msg);
};

function dashboard_info_box() {
	var count = 0;
	// count the number of div is currently on display
	$('.vps-info-box').each(function(){
		if($(this).css('display') != 'none'){
			count++;
		}
	});

	// if 2 divs are on display then divide them in two.
	if(count == 2){
		$('.vps-info-box').removeClass('col-lg-4');
		$('.vps-info-box').removeClass('col-lg-3');
		$('.vps-info-box').addClass('col-lg-6');
	}else if(count == 3){
		// if 3 divs are on display then divide them in three.
		$('.vps-info-box').removeClass('col-lg-3');
		$('.vps-info-box').removeClass('col-lg-6');
		$('.vps-info-box').addClass('col-lg-4');
	}else{
		// there are 4 divs so divide them in four.
		$('.vps-info-box').removeClass('col-lg-4');
		$('.vps-info-box').removeClass('col-lg-6');
		$('.vps-info-box').addClass('col-lg-3');
	}
	showtab('overview', 'main-tab-content')
}

$(document).ready(function(){

	$.extend( true, $.fn.dataTable.defaults, {
		"language": {
			"lengthMenu": "{{show}} _MENU_ {{entries}}",
			"search": "{{search}}:",
			"info": "{{showing}} _START_ {{to}} _END_ {{of}} _TOTAL_ {{entries}}",
			"infoEmpty": "{{showing}} 0 {{to}} 0 {{of}} 0 {{entries}}",
			"zeroRecords": "{{no_data_avail}}",
			"emptyTable": "{{no_data_avail}}",
			"infoFiltered": "({{filtered_from}} _MAX_ {{total_entries}})",
			"paginate": {
				"first":"{{first}}",
				"last":"{{last}}",
				"next":"{{next}}",
				"previous":"{{previous}}"
			}
		}
	} );

	(function() {
			var proxied = window.alert;
			window.alert = function() {
			$("#alert-modal .modal-body").html(arguments[0]);
			toggleModal('alert-modal');
		};
	})();

});

function counts() {
	
	if(N['uid'] > 0){
		var fields = ['vps', 'users', 'api', 'ssh_keys', 'euiso', 'lb', 'recipes'];

		fields.forEach(function(v){
			$('#'+v+'_count').text(N['counts'][v]);
		});
	}
}

function header_fix() {

	header_calc();

	$(window).resize(function() {
		header_calc();
	});

}

function header_calc() {
	var pagecontent = $('.page-content').outerWidth();
	var leftmenu = $('.left_menu').outerWidth();
	$('#welcome').width(pagecontent+'px');
	$('#footer').css({'width' : pagecontent+'px'});
	$('#welcome').css({'left':leftmenu+'px'});
}

function virt_pop(){
	
		// Initialize the flowbite to show tooltip
		initFlowbite();
		return true;
		$(".pop").each(function(i, v){

		var tag = $(this).prop('tagName');

		var pop_text = $(this).attr('pop_text');
		var rand_str = randstr(6);

		// add the attribute as well
		$(this).attr('data-popover-target', rand_str);

		var popover_div = '<div data-popover id="'+rand_str+'" role="tooltip" class="absolute z-10 invisible popover_class"><div class="px-3 py-2"><p>'+pop_text+'</p></div><div data-popper-arrow></div></div>';

		var parent_tag = $(this).parent().prop('tagName');

		// Just incase if the tagname is I then we will need to check its parent tag as html does not allow Div inside span
		if(tag == 'I' && parent_tag == 'SPAN'){
			$(this).parent().after(popover_div);
		}else{
			$(this).after(popover_div);
			$(this).removeClass('cursor-pointer');
			$(this).addClass('cursor-pointer');
		}
	});
}

function os_badges(ele1, ele2, prefix) {

	prefix = prefix || '';
	
	// While clicking on the OS Icons we will reset the other dropdowns
	$('.'+prefix+'create_os').click(function(){

		// Check for the other OS
		$(this).siblings().each(function(){
			// Reset it to -1
			$(this).find('.version').val(-1);
		});

		$('#'+prefix+'selected_os_icon').remove();
		// Remove the selected class from other divs
		$('#'+ele1+' .'+prefix+'create_os').removeClass('selected');
		// Get the value which is OSname
		var os_id = $(this).find('.version').val();
		
		if(os_id > 1) {
			$(this).addClass('selected');
			$('#'+ele2).val(os_id);
			$('.selected').append('<svg id="'+prefix+'selected_os_icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute h-6 top-1 right-1 fill-[#0075ff] dark:fill-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.559 3.697a3 3 0 0 1 4.882 0l.19.267a1 1 0 0 0 .925.413l.849-.095a3 3 0 0 1 3.313 3.313l-.095.85a1 1 0 0 0 .413.923l.267.19a3 3 0 0 1 0 4.883l-.267.19a1 1 0 0 0-.413.925l.095.849a3 3 0 0 1-3.313 3.313l-.85-.095a1 1 0 0 0-.923.413l-.19.267a3 3 0 0 1-4.883 0l-.19-.267a1 1 0 0 0-.925-.413l-.849.095a3 3 0 0 1-3.313-3.313l.095-.85a1 1 0 0 0-.413-.923l-.267-.19a3 3 0 0 1 0-4.883l.267-.19a1 1 0 0 0 .413-.925l-.095-.849a3 3 0 0 1 3.313-3.313l.85.095a1 1 0 0 0 .923-.413zm6.148 5.596a1 1 0 0 1 0 1.414l-3.819 3.819c-.49.49-1.286.49-1.776 0l-1.82-1.819a1 1 0 1 1 1.415-1.414L11 12.586l3.293-3.293a1 1 0 0 1 1.414 0"></path></svg>');
		}
	});
};

function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "")	+ expires + "; path=/;SameSite=None; Secure";
};

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

function eraseCookie(name) {
	document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function change_theme_mode(auto_change){

	var auto_change = auto_change || 0;
	refresh_page();
	var theme_mode = getCookie('virt_theme_mode');
	var href = $("#theme_mode").attr('href');
	var divClone = $("#pills-tab").clone();

	const d = new Date();
	let hour = d.getHours();

	if(!empty(auto_change)){
		if(hour >= 16 && hour <= 7){
			theme_mode = 'light';
		}else{
			theme_mode = 'dark';
		}
	}

	//alert("current_mode - "+current_mode+" theme_mode - "+theme_mode)
	if(theme_mode == 'light'|| empty(theme_mode)){
		setCookie('virt_theme_mode', 'dark');
		
		var new_href = href.replaceAll("&theme_mode=light&", '&') + "theme_mode=dark&";
	}

	if(theme_mode == 'dark'){
		setCookie('virt_theme_mode', 'light');
		var new_href = href.replaceAll("&theme_mode=dark&", '&') + "theme_mode=light&";
	}

	$("#theme_mode").attr('href', new_href);
	$("#pills-tab").replaceWith(divClone.clone());
}

//volumes section start
var managemenuvolhider;

function showmanagevolmenu(did) {

	if (managemenuvolhider) {
		clearTimeout(managemenuvolhider);
		hidemanagemenuvol();
	}

	$("#volmanagemenu_" + did).css("display", "block");

};

function hidemanagevolmenu() {
	managemenuvolhider = setTimeout("hidemanagemenuvol()", 200);
};

function hidemanagemenuvol() {
	$(".volmanagemenu").css("display", "none");
};

function actions_vol(todo, did){

	if(empty(todo)){
		return alert("{{vol_action_not_found}}");
	}

	if(empty(did)){
		return alert("{{vol_did_not_found}}");
	}

	let action = {attach_disk : 1, detach_disk : 2, resizevol : 3};

	AJAX('[[API]]act=volume&todo_action=' + action[todo] + '&todo_did=' + did + '&api=json', function(data) {

		if("error" in data['action_edit_data']){
			error(data['action_edit_data']["error"]);
			return;
		}

		$("#vpsvol_drop_row").css("display", "none");
		$("#hidden_vol_size").css("display", "none");
		// This was for attach volume
		if(data['action_edit_data']['disk_data']['action'] == 1){
			
			$("#vpsvol_drop_row").css("display", "block");
			$("#vpsvol_drop_row").css("visibility", "visible");
			
			let vpses = '';
			if(!empty(data['action_edit_data']['disk_data']['vps'])){
				$.each(data['action_edit_data']['disk_data']['vps'], function(vpsid, vps) {
					vpses +='<option value="'+ vps['vpsid'] +'">'+ vps['vps_name'] + '-' + vps['hostname'] +'</option>';
				});
				
				$("#vps_sel_edit").html(vpses);
			}

			$("#volname_edit").val(data['action_edit_data']['disk_data']['disk']['disk_name']);
		
		// This was for detach volume
		}else if(data['action_edit_data']['disk_data']['action'] == 2){

			let vpses = 0;
			$.each(data['action_edit_data']['disk_data']['vps'], function(vpsid, vps) {
				vpses = vps['vpsid'];
			});

			return editvol_submit(vpses, data['action_edit_data']['disk_data']['disk']['did'], data['action_edit_data']['disk_data']['action']);

		// This was for resize volume
		}else if(data['action_edit_data']['disk_data']['action'] == 3){
			
			$("#hidden_vol_size").css("display", "block");
			$("#vpsvol_drop_row").css("display", "block");
			$("#vpsvol_drop_row").css("visibility", "hidden");
			
			let vpses = 0;
			$.each(data['action_edit_data']['disk_data']['vps'], function(vpsid, vps) {
				vpses +='<option value="'+ vps['vpsid'] +'" selected>'+ vps['vps_name'] + '-' + vps['hostname'] +'</option>';
				return false;
			});
			
			$("#vps_sel_edit").html(vpses);

			$("#volname_edit").val(data['action_edit_data']['disk_data']['disk']['disk_name']);
			$("#vol_size_edit").val(data['action_edit_data']['disk_data']['disk']['size']);

		}else{
			return alert("{{vol_action_not_found}}");
		}


		$("#edit_vol_action").val(data['action_edit_data']['disk_data']['action']);
		$("#edit_vol_did").val(data['action_edit_data']['disk_data']['disk']['did']);
		
		toggleModal('show_vol_operations');

	});
	showtooltip();

}
	
function volume_onload() {

	$('#volumeslist, #vol_list-bottom-go-options').html("");

	if(empty(N['storage_disk'])){
		$('#volumeslist').html(`<div class="notice">{{vol_no_volumes}}</div>`);
		return false;
	}

	let cols = new Object();
	cols["id"] = {"l" : '{{vol_did}}', "width": '4%'};
	cols["name"] = {"l" : '{{vol_disk_name}}', "width": '20%'};
	cols["region"] = {"l" : '{{vol_region}}', "width": '20%'};
	cols["mnt"] = {"l" : '{{vol_mntpoint}}', "width": '15%'};
	cols["size"] = {"l" : '{{vol_disk_size}}', "width": '10%'};
	cols['vpsid'] = {"l" : '{{Vol_vpsid}}', "width": '5%'};
	cols['user'] = {"l" : '{{vol_disk_user}}', "width": '20%'};
	cols["manage"] = {'l' : '{{manage}}', "width": '5%' };
	cols["select_all"] = {"l" : '<input type="checkbox" name="select_all" id="diskdid_select_all" class="select_all virt-checkbox" onchange="checkbox_select_all(this);">', "width" : '1%', "class" : 'select-all-checkbox'};

	let disk_data = N['storage_disk'];
		
	let tmp = new Object();
		
	// Prepare the list
	for(x in disk_data){

		let regions = '';

		$v = disk_data[x];
		tmp[x] = new Object();

		if('servergroups' in N && !empty(N['servergroups'])){

			for(k in N['servergroups']){
			
				if(N['servergroups'][k]['sgid'] == $v['sgid']){
					regions += N['servergroups'][k]['sg_reseller_name'] + ' ';	
				}
			}

		}

		let volmanagebuts = '';
		let volmanageactbuttons = '';
	
		volmanagebuts += '<div id="vol_oper_' + $v['did'] + '">';
		if ($v["vps_uuid"] != undefined && !empty($v['vps_uuid'])) {
	
			if (!empty($v["vps_uuid"].match(/attachable/g))) {
				volmanagebuts += '<a title="{{vol_attach}}" onclick="actions_vol(\'attach_disk\', ' + $v['did'] + ');"><img src="[[images]]admin/connect.png" /></a>';
			} else {
				volmanagebuts += '<a title="{{vol_detach}}" onclick="actions_vol(\'detach_disk\', ' + $v['did'] + ');"><img src="[[images]]admin/disconnect.png" /></a>';
			}
				
		} else {
			volmanagebuts += '<a href="#"><img src="[[images]]blank_page.gif" /></a>';
		}
	
		volmanagebuts += '</div><div><a title="{{vol_resize}}" id="' + $v['did'] + '" onclick="actions_vol(\'resizevol\',' + $v['did'] + ');"><i class="fas fa-expand-arrows-alt fa-1x text-warning resize"></i></a></div>';
	
		// NEW POPOVER 
		volmanageactbuttons = '<span data-popover-target="aaaction_' + $v['did'] + '" data-popover-placement="left">'+'<i class="fa fa-cogs settings fa-1x cursor-pointer text-blue-600 mr-2"></i></span><div data-popover id="aaaction_' + $v['did'] + '" role="tooltip" class="absolute z-40 opacity-0 invisible eu_menu_popover"><div class="flex gap-4 items-center vpsmanage_icons px-2 py-2">'+volmanagebuts+'</div><div data-popper-arrow></div></div>';
	
		tmp[x]['id'] = $v['did'];
		tmp[x]['name'] = $v['disk_name'];
		tmp[x]['region'] = regions;
		tmp[x]["mnt"] = $v['mnt_point'];
		tmp[x]['size'] = $v['size'];
		tmp[x]['vpsid'] = ($v['vpsid'] == undefined ? '{{vol_none}}' : $v['vpsid']) ;
		tmp[x]['user'] = $v['user_email'];
		tmp[x]['manage'] = volmanageactbuttons + '<a title="{{vol_delete}}" id="' + $v['did'] + '" onclick="del_vol(\'delvol\',' + $v['did'] + ');"><i class="far fa-trash-alt fa-1x delete-icon"></i></a>';
		tmp[x]["select_all"] = '<input type="checkbox" class="ios disk_did_c virt-checkbox" name="diskdid_list[]" id="diskdid-checkbox'+$v['did']+'" value="'+$v['did']+'" />';
	
	}

	// Form the TABLE
	drawTable({'id' : 'volumeslist', 'tid' : 'volumes_listtable', "width" : '100%'}, cols, tmp);

	pageLinks("pagelinks_volumes", 'act=volume', N['trpagevol'], false, 'trpagevol');

	showtooltip();
	virt_pop();

	var multselarr = {
		"0":"{{lst_with_selected}}",
		"delvol" : "{{delete}}",
	};
		
	var sel_opts = "";
		
	for(var i in multselarr){				
		sel_opts += '<option value='+i+'>'+multselarr[i]+'</option>';
	}

	var bottom_menu = `<div class="flex justify-end my-4 mr-2">
		<div class="flex w-1/2 lg:w-1/4 gap-3">
			<select class="virt-select" name="multi_options_vol" id="multi_options_vol" >
				${sel_opts}
			</select>
			<input type="button" value="{{go}}" onclick="del_vol()" class="btn justify-content-end align-items-center d-flex text-white" />
		</div>
	</div>
	<div class="clearfix"></div>`;
	
	$("#vol_list-bottom-go-options").html(bottom_menu);

	$("#volumes_listtable").dataTable({
		'destroy': true,
		'columnDefs': [ 
			{ 'targets': [8] }, // column index (start from 0)
			{ "orderable": false, "targets": [2, 3, 7, 8] },
			{ "orderable": true, "targets": [0, 1, 4, 5, 6] },
		],
		'autoWidth': false,

	});

}

function show_createvolumes(ele_id, tab_content){

	showtab(ele_id, tab_content);

	AJAX('[[API]]act=volume&listvs=1&api=json', function(data) {

		$("#show_createvol_window").show();

		if (!empty(data['vs'])) {
			 let vpses = '<option value="0">{{li_none}}</option>';
			 $.each(data['vs'], function(id, vps) {
				vpses += '<option value="' + id + '">' + vps['vpsid'] + '-' + vps['hostname'] + '</option>';
			 });
			 $("#vps_sel").html(vpses);
		}

		$('#billing_symbol_hr_vol').html(data['billing_symbol']);
		$('#billing_symbol_mo_vol').html(data['billing_symbol']);

		 $("#vps_sel").select2({
		 	selectOnClose: true,
		 	width: "100%",
		 });

	});

}

function change_vol_serid(el) {
	$("#h_rate").val('');
	$("#m_rate").val('');
	$("#vol_pr_hr").val(0);
	$("#vol_pr_mo").val(0);
	$("#vol_size").val('');
	AJAX('[[API]]act=volume&vol_per_vpsid='+el.value+'&api=json', function(data) {
		$("#h_rate").val(data['resource_pricing']['space']['h_rate']);
		$("#m_rate").val(data['resource_pricing']['space']['m_rate']);
	});

}

function cal_price_volumes(){

	let h_price = $("#h_rate").val();
	let m_price = $("#m_rate").val();
	let size = $("#vol_size").val();
	
	let price_set_hr = 0;
	let price_set_mo = 0;

	price_set_hr = size * h_price;

	price_set_mo = size * m_price;

	$("#vol_pr_mo").val(Math.round((price_set_mo + Number.EPSILON) * 100) / 100);
	$("#vol_pr_hr").val(Math.round((price_set_hr + Number.EPSILON) * 100) / 100);
}	

function editvol_submit(vpsid = 0 , did = 0, action_to_perform = 0){

	action_to_perform = empty(action_to_perform) ? $("#edit_vol_action").val() : action_to_perform;

	if(empty(action_to_perform)){
		return alert("{{vol_action_not_found}}");
	}

	vpsid =	empty(vpsid) ? $("#vps_sel_edit").val() : vpsid;
	did = empty(did) ? $("#edit_vol_did").val() : did;
	let vol_size = $("#vol_size_edit").val();

	AJAX('[[API]]act=volume&perform_action=' + action_to_perform + '&vpsid_vol=' + vpsid + '&e_vol_did=' + did + '&vol_size=' + vol_size + '&listvs=1&api=json', function(data) {
	
		if("error" in data){
			error(data["error"]);
			return;
		}

		if(typeof(data["done"]) != 'undefined'){
			done(data["done"]);
		}
	});
}

function del_vol(todo, did){
	
	let dids = [];

	did = did || 0;
	todo = todo || '';
	
	let conf = {delvol :{0:'{{vol_delete_disk}}' , 1:'{{vol_conf_mul_delete_disk}}'}};

	if(!empty(did) || !empty(todo)){
			
		modalConfirm(function(confirm){
			if(confirm){
				call('[[API]]'+'act=volume&'+todo+'='+did);
			}else{
				return false;
			}
		},conf[todo][0]);

	// Are we in multiselect mode ?
	}else{
			
		todo = $("#multi_options_vol").val();

		$('.disk_did_c').each(function(){
			if($(this).is(':checked')){
				dids.push($(this).val());
			}
		});
			
		if(empty(todo)){
			error({error:"{{lst_no_option_sel}}"});
			return false;
		}

		if(dids.length < 1){
			error({error:"{{no_vol_sel}}"});
			return false;
		}

		let vals = dids.join(",");
			
		modalConfirm(function(confirm){
			if(!confirm){
				return false;
			}else{
				call('[[API]]'+'act=volume&'+todo+'='+vals);
			}
		},conf[todo][1]);
		
	}
}

function search_volumes(){
	var str = $("#listvol_search").serialize();
	pageNum = getParameterByName('trpagevol', 1);
	loadpage('[[API]]act=volume&' + str + '&trpagevol=' + pageNum);
}

 //volumes section End

 function copy(ele, copy_ele){

	// const clipboard = FlowbiteInstances.getInstance('CopyClipboard', 'npm-install-copy-text');
	const tooltip = FlowbiteInstances.getInstance('Tooltip', $(ele).attr('data-tooltip-target'));

	const $defaultIcon = document.getElementById('default-icon');
	const $successIcon = document.getElementById('success-icon');

	
	const $defaultTooltipMessage = document.getElementById('default-tooltip-message');
	const $successTooltipMessage = document.getElementById('success-tooltip-message');


	const showSuccess = () => {
		$defaultIcon.classList.add('hidden');
		$successIcon.classList.remove('hidden');
		$defaultTooltipMessage.classList.add('hidden');
		$successTooltipMessage.classList.remove('hidden');    
		tooltip.show();
	}
	
	const resetToDefault = () => {
		$defaultIcon.classList.remove('hidden');
		$successIcon.classList.add('hidden');
		$defaultTooltipMessage.classList.remove('hidden');
		$successTooltipMessage.classList.add('hidden');
		tooltip.hide();
	}

	var txt = document.getElementById(copy_ele).innerText || document.getElementById(copy_ele).textContent;
	
		if (navigator && navigator.clipboard && navigator.clipboard.writeText){
		navigator.clipboard.writeText(txt);
	}else{
		const el = document.createElement('textarea');
		el.value = txt;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}

	showSuccess();

	// reset to default state
	setTimeout(() => {
		resetToDefault();
	}, 2000);
};

function show_vm_pass(){
	
	if($(".eyeclass").hasClass('fa-eye')){
		$("#vps-vm_pass_hidden").hide();
		$("#vps-vm_pass").show();
		$(".eyeclass").removeClass('fa-eye').addClass("fa-eye-slash");
	}else{
		$(".eyeclass").removeClass('fa-eye-slash').addClass("fa-eye");
		$("#vps-vm_pass").hide();
		$("#vps-vm_pass_hidden").show();
	}
}

function show_login_pass(){
	
	if($(".login-eyeclass").hasClass('fa-eye')){
		$("#vps-vm_pass_hidden").hide();
		$("#vps-vm_pass").show();
		$(".login-eyeclass").removeClass('fa-eye').addClass("fa-eye-slash");
	}else{
		$(".login-eyeclass").removeClass('fa-eye-slash').addClass("fa-eye");
		$("#vps-vm_pass").hide();
		$("#vps-vm_pass_hidden").show();
	}
}

//changes the bootoder 
change_bootorder = (ele) => {
	
	//get the element by id
	const select = document.getElementById("boot"); 
	//perform if options are greater then one
	if(select){
		if(select.options.length > 1){

			var selected = {};
			let prev = "";
			let pos = 0;
			let current = hidden_value = "";

			for (var option of select.options){
				if(option.selected) {
					prev = pos;
				}
				selected[pos] = option.value;
				pos+=1
			}
			
			if(prev !== ""){
				current = selected[prev];
				let v1 = "";
				if(ele.id == "up"){
					v1 = selected[prev - 1];  
					if(v1 != undefined){
						selected[prev-1] = current;
					}
				}else if(ele.id == "down"){
					v1 = selected[prev + 1];  
					if(v1 != undefined){
						selected[prev+1] = current;
					}
				}   
				if(v1 != undefined){
					selected[prev] = v1;
				}
			}
			
			select.innerHTML = "";
			
			for (var key in selected) {
				
				let newOption = new Option(selected[key].toUpperCase(), selected[key], false, false);
				
				if(current === selected[key]){
					newOption = new Option(selected[key].toUpperCase(), selected[key], true, true);
				}
				select.add(newOption);

				hidden_value += selected[key] + ',';
			}

			document.getElementById("boot_ord_val").value = hidden_value;

		}
	}
}


add_bootorder = () => {
	
	const select = document.getElementById("boot"); 

	if(select){
		let newOption = "";
		let val = "";

		if(select.options.length > 1){
			let disk = cd = 1;
			for (var option of select.options){
				if(option.value.match(/cdrom/gi)){
					cd += 1;	
				}else if(option.value.match(/disk/gi)){
					disk += 1;
				}
			}

			for(i = 1; (i < disk-1); i++){
				val = "disk"+i.toString();
				newOption += "<option value=\""+val+"\">"+val.toUpperCase()+"</option>";
			}

			for(i= 1; i < cd; i++){
				val = "cdrom"+i.toString();
				newOption += "<option value=\""+val+"\">"+val.toUpperCase()+"</option>";
			}
			select.innerHTML = "";
			select.innerHTML = newOption;
		}
	}
}

cdrom_bootorder = () =>{
	document.getElementById("hvm_sec_iso").onchange = function() {  
		const select = document.getElementById("boot"); 
		if(select){
			if(!empty(this.value) && empty(select.querySelector("option[value=\"cdrom2\"]"))){
				let newOption = new Option("CDROM"+"2", "cdrom"+"2", false, false);
				select.add(newOption);
				var new_val = document.getElementById("boot_ord_val").value
				if(new_val){
					new_val = new_val + "cdrom2,";
					document.getElementById("boot_ord_val").value = new_val;
				}
				
			}
			if(empty(this.value) && !empty(select.querySelector("option[value=\"cdrom2\"]"))){
				select.removeChild(select.querySelector("option[value=\"cdrom2\"]"));
				var new_val = document.getElementById("boot_ord_val").value
				if(new_val){
					new_val = new_val.replace("cdrom2,", '');
					document.getElementById("boot_ord_val").value = new_val;
				}
			}
		}
	};  

	document.getElementById("hvm_isos").onchange = function() {  
		const select = document.getElementById("boot"); 
		if(select){
			if(!empty(this.value) && empty(select.querySelector("option[value=\"cdrom1\"]"))){
				let newOption = new Option("CDROM"+"1", "cdrom"+"1", false, false);
				select.add(newOption);
				var new_val = document.getElementById("boot_ord_val").value
				if(new_val){
					new_val = new_val + "cdrom1,";
					document.getElementById("boot_ord_val").value = new_val;
				}
			}
			if(empty(this.value) && !empty(select.querySelector("option[value=\"cdrom1\"]"))){
				select.removeChild(select.querySelector("option[value=\"cdrom1\"]"));
				var new_val = document.getElementById("boot_ord_val").value
				if(new_val){
					new_val = new_val.replace("cdrom1,", '');
					document.getElementById("boot_ord_val").value = new_val;
				}
			}
		}
	}; 
}

function show_create_load_balancer(){
	AJAX('[[API]]act=create&check_loadbalancer=1&api=json', function(data) {

		N = data;
		var txt = [];
		$("#lb_hostname").val("");
	
		if(empty(N["plans"])){
			$("#no_lb_plans").show();
			return false;
		}
		
		let svg_region_flag = '<svg fill="#0075ff" class="h-8 inline" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m0 22H4V8h28Z" class="clr-i-outline clr-i-outline-path-1"/><path d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2" class="clr-i-outline clr-i-outline-path-2"/><path d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2" class="clr-i-outline clr-i-outline-path-3"/><path d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2" class="clr-i-outline clr-i-outline-path-4"/></svg>';

		let lb_user_regions_html = '<h4 class="virt-form-head mt-3 tr_regions_head px-4">{{vm_region}}</h4><div class="flex flex-row flex-wrap lg:gap-5 md:gap-5 xl:gap-5 px-4 pb-2"><input type="hidden" id="lb_sgid" name="sgid">';
		let plan_count = 0;
		for(x in N["servergroups"]){
			if(!empty(N["servergroups"][x])){
				txt.push('<option value="'+ x +'" id="lb_sgid_'+ x +'">'+ N["servergroups"][x]['sg_reseller_name'] +'</option>');
				lb_user_regions_html += `
				<div class="lb_region-card flex items-center justify-between" onclick="select_region('`+x+`', 'lb_')" id="lb_region_id_`+x+`">
					<div class="lb_region-flag p-2">`
					+svg_region_flag+`
					</div>
					<div class="lb_region-info">`+N["servergroups"][x]['sg_reseller_name']+`
					</div>
				</div>`;
			}
			
			if(!empty(N["pricing"][x])){
				plan_count++;
			}
		}

		lb_user_regions_html += '</div>';

		if(empty(plan_count)){
			$("#no_lb_plans").show();
			return false;
		}

		$("#lb_user_regions").html(lb_user_regions_html);
	
		is_only_one('lb_');
	});
}

function load_firewall_info(){
	AJAX('[[API]]act=firewallplan', function(data) {
		if(empty(data['firewall_plans'])){
			$('#no_firewall_plans').show();
			$('#fwp_list_table').hide();
			$('#firewallplanlist').hide();
			return false;
		}

		$('#fwp_list_table').show();
		$('#no_firewall_plans').hide();
		$('#firewallplanlist').show();

		if (!$.fn.DataTable.isDataTable("#fwp_list_table")) {
		
			$("#fwp_list_table").DataTable({
				sorting :false,
				info: false,
				ordering : false,
				searching : false,
				bAutoWidth: false,
				"language": {
					"emptyTable": "{{fw_no_rules_addeds}}"
				},
				fixedHeader: {
					footer: false
				},
				"columns": [
					{ "sWidth": "15%" },
					{ "sWidth": "50%" },
					{ "sWidth": "15%" },
				//	{ "sWidth": "10%" },
					{ "sWidth": "10%" }
				],
			});
		
		}else{
			$("#fwp_list_table").DataTable().clear().draw();
		}

		$("#fwp_list_table").removeClass("no-footer");

		let firewallplan_table = $("#fwp_list_table").DataTable();

		for(x in data["firewall_plans"]){
			var default_policy = '<span style=\'color:'+(empty(data["firewall_plans"][x]["default_policy"]) ? 'red;\'> {{drop}}' : 'green;\'> {{accept}}')+'</span>';
			firewallplan_table.row.add(

				[data["firewall_plans"][x]["fwid"],
				data["firewall_plans"][x]["fw_plan_name"],
				default_policy,
				'<i class="far fa-edit edit-icon fa-1x" onclick="edit_firewallplan_tab('+x+')"></i>&nbsp;&nbsp;<a href="javascript:delfirewallplan('+ x +')" class="areload"><i class="far fa-1x fa-trash-alt delete-icon" aria-hidden="true" title="{{delete}}"></i></a>']
				//'<input type="checkbox" class="ios virt-checkbox" name="delete_fwids[]" id="firewall-plan-'+ x +'" value="'+ x +'" />']
				
			).draw();

		}

		$("#fwp_list_table td:nth-child(3) , #fwp_list_table td:nth-child(4), #fwp_list_table th:nth-child(3), #fwp_list_table th:nth-child(4)");

		let multselarr = {
			"0":"{{lst_with_selected}}",
			"delete_fwids" : "{{delete}}",
		};

		let sel_opts = "";
			
		for(let i in multselarr){
			sel_opts += '<option value='+i+'>'+multselarr[i]+'</option>';
		}

		let bottom_menu = `<div class="bottom-go-options"><div class="input-group">
		<select class="custom-select" name="multi_options_fwp" id="multi_options_fwp" >
		${sel_opts}
		</select>
		<span class="input-group-append go-option">
			<a class="btn justify-content-end align-items-center d-flex" type="button"><input type="button" value="{{go}}" onclick="firewallplan_go_click()" class="go_btn" /></a>
		</span>
		</div></div><div class="clearfix"></div>`;

		if($("#fwp_list_table_wrapper .bottom-go-options")[0]){
			//do nothing
		}else{
			$("#fwp_list_table_wrapper .row:nth-child(2)").after(bottom_menu);
		}
	});
}

function show_firewall_plans(){

	AJAX('[[API]]act=firewallplan&svs=' + N['vpsid'], function(data) {

		$('#changefirewallplanform').attr('action','act=firewallplan&svs='+N['vpsid']);

		current_firewall_plan = 0;
		if(!empty(data['current_firewall_plan'])){
			current_firewall_plan = data['current_firewall_plan'];
		}

		var firewall_plans = data['firewall_plans'];
		if(!empty(data['firewallplan_templates'])){
			
			for(x in data['firewallplan_templates']){
				firewall_plans[x] = data['firewallplan_templates'][x];
			}
		}
		
		var txt = [];
		txt.push('<option value="0">{{li_none}}</option>');
		for(x in data['firewall_plans']){
			txt.push('<option value="'+ x +'"'+( (current_firewall_plan == x) ? 'selected="selected"' : ' ')+' >'+ firewall_plans[x]['fw_plan_name'] +'</option>');
		}

		N["firewall_plans"] = firewall_plans;
		$("#li_change_fwid").html(txt.join(''));

		firewallrule_list(current_firewall_plan, 'change_firewall_rules_table');
	});

	var events = $._data($('#changefirewallplanform')[0], 'events');
	
	if(empty(events)){
		
		$('#changefirewallplanform').submit(function(){

			let warn_text = empty($("#li_change_fwid").val()) ? '{{fw_remove_plan}}' : '{{fw_change_plan_warn}}';

			modalConfirm(function(confirm){

				if(confirm){

					return submitit('changefirewallplanform', 'show_firewall_plans');

				}else{
					return false;
				}

			},warn_text);

			return false;
			
		});
	}
}

function show_firewall_window(){

	AJAX('[[API]]act=addfirewallplan', function(data) {

		let protocol_firewall = data['protocol'];
		let admin_templates = data['admin_firewallplan_template'];
		let options = "";
		for(key in protocol_firewall) {
			if (protocol_firewall.hasOwnProperty(key)) {
				let val = protocol_firewall[key];
				options += '<option value="'+val+'">'+val+'</otion>';
			}
		}
		
		let template_options = '<option value="-1">None</otion>';
		if(!empty(admin_templates)){

			for(key in admin_templates) {
				if (admin_templates.hasOwnProperty(key)) {
					let val = admin_templates[key]['fw_plan_name'];
					let index = admin_templates[key]['fwid'];
					template_options += '<option value="'+index+'">'+val+'</otion>';
				}
			}

		}

		$('#protocol_firewall').html(options);
		$('#protocol_firewall').select2();
		$('#add_use_firewallplan_template').html(template_options);
		$('#add_use_firewallplan_template').select2();

		if (!$.fn.DataTable.isDataTable( "#managerules")) {

			$("#managerules").DataTable({
				sorting :false,
				paging: false,
				info: false,
				ordering : false,
				searching : false,
				"language": {
					"emptyTable": "{{fw_no_rules_added}}"
				},
				"columnDefs": [
					{ className: "width-2", "targets": [ 0 ] },
					{ className: "width-8", "targets": [ 1 ] },
					{ className: "width-10", "targets": [ 2, 4 ] },
					{ className: "width-15", "targets": [ 5, 6 ] },
					{ className: "width-20", "targets": [ 7 ] },
					{ className: "width-11", "targets": [ 3 ] },
					{ className: "width-9", "targets": [ 8 ] }
				],
				"fnDrawCallback" : function(){
					rows = $("#managerules").DataTable().rows().nodes();
					rows_length = rows.length;
					if(!empty(rows_length)){
						
						$("#managerules thead").remove();
						$.each(rows, function(index){
							$("td:first", this).html(index + 1);
						});

						$("#firewall_reset").show();
		
					}else{
						$("#firewall_reset").hide();
					}
		
				}
			});
		
		}else{
			$("#managerules").DataTable().clear().draw();
		}

	});

}

function protocol_check(value){
	
	let fwp_select_id = value.id;
	let fwp_ports_input_field = '';
	 
	if(fwp_select_id == 'protocol_firewall'){
		fwp_ports_input_field = $("#sport, #dport");
	} else if (fwp_select_id == 'edit_protocol_firewall') {
		fwp_ports_input_field = $("#edit_sport, #edit_dport");
	}

	if (!fwp_ports_input_field.length) return;

	fwp_ports_input_field.val('NONE');

	let fwp_no_port_proto = ["ICMP", "GRE", "ESP"];
	
	$('#'+fwp_select_id).change(function() {

		let fwp_protocol_selected = $(this).val();

		if (fwp_no_port_proto.includes(fwp_protocol_selected)){
			fwp_ports_input_field.prop('disabled', true).val('NONE').css('cursor','not-allowed');
		} else {
			fwp_ports_input_field.prop('disabled', false).css('cursor','');
		}

	});
}

function addfirewallrule(is_edit = 0){

	let edit_select = !empty(is_edit) ? 'edit_' : '';
	let direction = $("#"+edit_select+"direction").val();
	let iptype = "";
	let protocol_val = $("#"+edit_select+"protocol_firewall").val();
	let protocol_display = $("#"+edit_select+"protocol_firewall option:selected").html();
	let direction_val = $("#"+edit_select+"direction").val();
	let direction_display = $("#"+edit_select+"direction option:selected").html();
	let decision_val = $("#"+edit_select+"decision").val();
	let decision_display = $("#"+edit_select+"decision option:selected").html();
	let tcp_array = ["http", "tcp", "https", "mysql", "postgresql", "rdp"];
	let udp_array = ["udp", "dnsudp"];
	let firewallplan_table = $("#"+edit_select+"managerules").DataTable();
	let sport = $("#"+edit_select+"sport").val();
	let dport = $("#"+edit_select+"dport").val();
	let src_addr = $("#"+edit_select+"source_addr").val();

	if(protocol_val == 0){
		error_alert("{{fw_no_protocol}}");
		return false;
	}
	
	if(direction_val == 0){
		error_alert("{{fw_need_direction}}");
		return false;
	}
	
	if(sport == "" && !(protocol_val == "icmp" || protocol_val == "gre" || protocol_val == "esp") ){
		error_alert("{{fw_empty_sport}}");
		return false;
	}

	if(dport == "" && !(protocol_val == "icmp" || protocol_val == "gre" || protocol_val == "esp") ){
		error_alert("{{fw_empty_dport}}");
		return false;
	}

	if(src_addr == ""){
		error_alert("{{fw_empty_source_addr}}");
		return false;
	}

	if($("#"+edit_select+"iptype").val() == 4){
		iptype = "IPv4";
	}else{
		iptype = "IPv6";
	}
	
	firewallplan_table.row.add(
		["",
		"<input type=\"hidden\" name=\"direction[]\" value=\""+direction_val+"\" />"+direction_display, 
		"<input type=\"hidden\" name=\"iptype[]\" value=\""+$("#"+edit_select+"iptype").val()+"\" />"+iptype,
		"<input type=\"hidden\" name=\"decision[]\" value=\""+decision_val+"\" />"+decision_display,
		"<input type=\"hidden\" name=\"protocol[]\" value=\""+protocol_val+"\" />"+protocol_display, 
		"<input type=\"hidden\" name=\"sport[]\" value=\""+sport+"\" />"+sport,
		"<input type=\"hidden\" name=\"dport[]\" value=\""+dport+"\" />"+dport, 
		"<input type=\"hidden\" name=\"source_addr[]\" value=\""+src_addr+"\" />"+src_addr, 
		"<i class=\"fa fa-trash-alt delete-icon\" onclick=\"delete_rule(this,"+is_edit+");\"></i>"]
	).draw();
}

function firewallplan_onload(){

	if(empty(N['firewall_plans'])){

		$('#no_firewall_plans').show();
		$('#fwp_list_table').hide();
		$('#firewallplanlist').hide();
		return false;

	}

	$('#fwp_list_table').show();
	$('#no_firewall_plans').hide();
	$('#firewallplanlist').show();

	if (!$.fn.DataTable.isDataTable( "#fwp_list_table")) {
		
		$("#fwp_list_table").DataTable({
			sorting :false,
			info: false,
			ordering : false,
			searching : false,
			bAutoWidth: false,
			"language": {
				"emptyTable": "{{fw_no_rules_addeds}}"
			},
			fixedHeader: {
				footer: false
			},
			"columns": [
				{ "sWidth": "15%" },
				{ "sWidth": "50%" },
				{ "sWidth": "15%" },
			//	{ "sWidth": "10%" },
				{ "sWidth": "10%" }
			],
		});
	
	}else{

		$("#fwp_list_table").DataTable().clear().draw();

	}

	$("#fwp_list_table").removeClass("no-footer");

	let firewallplan_table = $("#fwp_list_table").DataTable();

	for(x in N["firewall_plans"]){
			var default_policy = '<span style=\'color:'+(empty(N["firewall_plans"][x]["default_policy"]) ? 'red;\'> {{drop}}' : 'green;\'> {{accept}}')+'</span>';
		firewallplan_table.row.add(

			[N["firewall_plans"][x]["fwid"],
			N["firewall_plans"][x]["fw_plan_name"],
			default_policy,
			'<i class="far fa-edit edit-icon fa-1x" onclick="edit_firewallplan_tab('+x+')"></i>&nbsp;&nbsp;<a href="javascript:delfirewallplan('+ x +')" class="areload"><i class="far fa-1x fa-trash-alt delete-icon" aria-hidden="true" title="{{delete}}"></i></a>']
			//'<input type="checkbox" class="ios virt-checkbox" name="delete_fwids[]" id="firewall-plan-'+ x +'" value="'+ x +'" />']
			
		).draw();

	}

	$("#fwp_list_table td:nth-child(3) , #fwp_list_table td:nth-child(4), #fwp_list_table th:nth-child(3), #fwp_list_table th:nth-child(4)");

	let multselarr = {
		"0":"{{lst_with_selected}}",
		"delete_fwids" : "{{delete}}",
	};
	
	let sel_opts = "";
		
	for(let i in multselarr){
		sel_opts += '<option value='+i+'>'+multselarr[i]+'</option>';
	}

	let bottom_menu = `<div class="bottom-go-options"><div class="input-group">
	<select class="custom-select" name="multi_options_fwp" id="multi_options_fwp" >
	${sel_opts}
	</select>
	<span class="input-group-append go-option">
		<a class="btn justify-content-end align-items-center d-flex" type="button"><input type="button" value="{{go}}" onclick="firewallplan_go_click()" class="go_btn" /></a>
	</span>
	</div></div><div class="clearfix"></div>`;

	if($("#fwp_list_table_wrapper .bottom-go-options")[0]){
		//do nothing
	}else{
		$("#fwp_list_table_wrapper .row:nth-child(2)").after(bottom_menu);
	}

}

function delete_rule(element, is_edit = 0){

	let edit_select = !empty(is_edit) ? 'edit_' : '';
	let table = $("#"+edit_select+"managerules").DataTable();
	table.row($(element).parents("tr")).remove().draw();
	
}

function firewallrule_list(fw, firewall_table_container){

	$("#"+firewall_table_container).hide();

	if(empty(fw)){
		return false;
	}

	if (!$.fn.DataTable.isDataTable("#"+firewall_table_container)) {

		$("#"+firewall_table_container).DataTable({
			sorting :false,
			paging: false,
			info: false,
			ordering : false,
			searching : false,
			bAutoWidth: false,
			"language": {
				"emptyTable": ""
			},
			fixedHeader: {
				footer: false
			},
			"columnDefs":[
				{ "className" : "text-left", "targets" : [0,1,2,5,6]},
				{ "className" : "text-left", "targets" : [3,4]},
				{ "className" : "text-left", "targets" : [7]}
			],
			"fnDrawCallback" : function(){
				// $("#"+firewall_table_container+" thead").remove();
				rows = $("#"+firewall_table_container).DataTable().rows().nodes();
				rows_length = rows.length;
				if(!empty(rows_length)){
					$.each(rows, function(index){
						$("td:first", this).html("<div class='rounded'>"+(index + 1)+"</div>");
					});
				}
			}
		});
	
	}else{
		$("#"+firewall_table_container).DataTable().clear().draw();
	}

	AJAX('[[API]]act=firewallplan&get_firewall_plan='+fw, function(data) {

		let template_rules = JSON.parse(data["ret_firewall_plan"][fw]["rules"]);
		if(!empty(template_rules)){

			let firewalllist_table = $("#"+firewall_table_container).DataTable();
			firewalllist_table.clear().draw();
			
			template_rules.forEach(function(v){
				let tmp_cell = v.split(" ");
				ip_protocol = (tmp_cell[0] == 4) ? "IPv4" : ((tmp_cell[0] == 6) ? "IPv6" : "");
				direction = "<span class='"+(tmp_cell[1] == 'IN' ? 'text-green-500' : 'text-red-500')+"'>"+tmp_cell[1]+"</span>";
				policy = tmp_cell[2];
				protocol = tmp_cell[3];
				src_port = tmp_cell[4];
				dstn_port = tmp_cell[5];
				src_address = tmp_cell[6];

				firewalllist_table.row.add(
					["", ip_protocol, direction, policy, protocol, src_port, dstn_port, src_address]
				).draw();
			});

			$("#"+firewall_table_container).show();
			
		}
	});

}

// list_firewall-tab
function list_firewall_plans(hide_edit_fw = 0){
	if(empty(hide_edit_fw)){
		$("#list_firewall").removeClass("active");
		$("#edit_firewall").addClass("hidden");
		$("#list_firewall").removeClass("hidden");
		$("#list_firewall").addClass("active");
	}else{
		$("#edit_firewall").removeClass("active");
		$("#edit_firewall").addClass("hidden");
		$("#list_firewall").removeClass("active");
		$("#list_firewall").addClass("hidden");
	}
}

function edit_firewallplan_tab(fwpid){

	$("#list_firewall").removeClass("active");
	$("#list_firewall").addClass("hidden");
	$("#edit_firewall").removeClass("hidden");
	$("#edit_firewall").addClass("active");

	if(empty(N["firewall_plans"])){
		error_alert("{{fw_invalid}}");
		return false;
	}
	$("#editfirewallform")[0].reset();
	AJAX('[[API]]act=editfirewallplan&fwpid='+fwpid, function(data) {
		let protocol_firewall = data['protocol'];

		let options = "";

		for(key in protocol_firewall) {
			if (protocol_firewall.hasOwnProperty(key)) {
				let val = protocol_firewall[key];
				options += '<option value="'+ val +'">'+ val +'</otion>';
			}
		}

		$('#edit_fwp_name').val(data["firewall_plans"]["fw_plan_name"]);
		$('#edit_default_policy').val(data["firewall_plans"]["default_policy"]);
		$('#edit_protocol_firewall').html(options);
		$('#edit_protocol_firewall').select2();
		$('#firewall_plan_id').val(data["firewall_plans"]['fwid']);
		
		if (!$.fn.DataTable.isDataTable( "#edit_managerules")) {

			$("#edit_managerules").DataTable({
				sorting :false,
				paging: false,
				info: false,
				ordering : false,
				searching : false,
				"language": {
					"emptyTable": "{{fw_no_rules_added}}"
				},
				"fnDrawCallback" : function(){

					rows = $("#edit_managerules").DataTable().rows().nodes();
					rows_length = rows.length;
					
					if(!empty(rows_length)){

						$.each(rows, function(index){
							$("td:first", this).html(index + 1);
						});

						$("#firewall_reset").show();
		
					}else{
						$("#firewall_reset").hide();
					}
		
				}
			});
		
		}else{
			$("#edit_managerules").DataTable().clear().draw();
		}
	
		let firewall_rules = JSON.parse(data["firewall_plans"]["rules"]);
		let firewallplan_table = $("#edit_managerules").DataTable();
		firewallplan_table.clear().draw();

		if(empty(firewall_rules)){
			return false;
		}

		firewall_rules.forEach(function(v){
			let tmp_rule = v.split(" ");
			let direction_val = direction_display = tmp_rule[1];
			let decision_val = decision_display = tmp_rule[2];
			let ipversion = tmp_rule[0];
			let iptype = '';

			if(ipversion == 4){
				iptype = 'IPv4';
			}

			let protocol_val = protocol_display = tmp_rule[3];
			let sport_val = tmp_rule[4];
			let dport_val = tmp_rule[5];
			let src_addr = tmp_rule[6];

			firewallplan_table.row.add(
				["",
				"<input type=\"hidden\" name=\"direction[]\" value=\""+direction_val+"\" />"+direction_display, 
				"<input type=\"hidden\" name=\"iptype[]\" value=\""+ipversion+"\" />"+iptype,
				"<input type=\"hidden\" name=\"decision[]\" value=\""+decision_val+"\" />"+decision_display,
				"<input type=\"hidden\" name=\"protocol[]\" value=\""+protocol_val+"\" />"+protocol_display, 
				"<input type=\"hidden\" name=\"sport[]\" value=\""+sport_val+"\" />"+sport_val,
				"<input type=\"hidden\" name=\"dport[]\" value=\""+dport_val+"\" />"+dport_val, 
				"<input type=\"hidden\" name=\"source_addr[]\" value=\""+src_addr+"\" />"+src_addr, 
				"<i class=\"fa fa-trash-alt delete-icon\" onclick=\"delete_rule(this,1);\"></i>"]
			).draw();
		});

	})
}

function firewallplan_go_click() {

	var action = $("#multi_options_fwp").val();
	
	if(action == 0){
		error_alert("{{lst_no_option_sel}}");
		return false;
	} 
	
	if(action == "delete_fwids"){
		delfirewallplan();
	}
}

function delfirewallplan(fw_ids){

	var fwids = [];

	// Is it coming for multiple rules?
	if(empty(fw_ids)){

		// Check for the checkboxes
		$("#firewallplan .ios:checked").each(function(){
			fwids.push($(this).val());
		});

		// If user has not selected any checkboxes the throw an error
		if(fwids){
			error_alert('{{fw_no_plan_selected}}');
			return false;
		}

	}else{
		fwids.push(fw_ids);
	}

	let delete_fwids = {
		"delete_fwids": fwids
	};

	modalConfirm(function(confirm){

		if(confirm){

			$.ajax({
				type: "POST",
				url: "[[API]]act=firewallplan",
				dataType : "json",
				data : delete_fwids,
				success:function(data){
					if(empty(data["error"])){
						handleResponseData(data["done"]);
					}else{
						error_alert(data["error"]);
					}
				}
			});

		}else{
			return false;
		}

	},'{{fw_del_confirm}}');

}

function editfirewallplan_onload(){

	if(empty(N["firewall_plans"])){
		error_alert("{{fw_invalid}}");
		return false;
	}
	$("#editfirewallform")[0].reset();
	let protocol_firewall = N['protocol'];
	let options = "";
	for(key in protocol_firewall) {
		if (protocol_firewall.hasOwnProperty(key)) {
			let val = protocol_firewall[key];
			options += '<option value="'+ val +'">'+ val +'</otion>';
		}
	}
	
	$('#edit_fwp_name').val(N["firewall_plans"]["fw_plan_name"]);
	$('#edit_default_policy').val(N["firewall_plans"]["default_policy"]);
	$('#edit_protocol_firewall').html(options);
	$('#edit_protocol_firewall').select2();
	$('#firewall_plan_id').val(N["firewall_plans"]["fwid"]);

	if (!$.fn.DataTable.isDataTable( "#edit_managerules")) {

		$("#edit_managerules").DataTable({
			sorting :false,
			paging: false,
			info: false,
			ordering : false,
			searching : false,
			"language": {
				"emptyTable": "{{fw_no_rules_added}}"
			},
			"fnDrawCallback" : function(){

				rows = $("#edit_managerules").DataTable().rows().nodes();
				rows_length = rows.length;

				if(!empty(rows_length)){

					$.each(rows, function(index){
						$("td:first", this).html(index + 1);
					});

					$("#firewall_reset").show();
	
				}else{
					$("#firewall_reset").hide();
				}
	
			}
		});
	
	}else{
		$("#edit_managerules").DataTable().clear().draw();
	}

	let firewall_rules = JSON.parse(N["firewall_plans"]["rules"]);
	let firewallplan_table = $("#edit_managerules").DataTable();
	firewallplan_table.clear().draw();
	if(empty(firewall_rules)){
		return false;
	}
	firewall_rules.forEach(function(v){
		let tmp_rule = v.split(" ");
		let direction_val = direction_display = tmp_rule[1];
		let decision_val = decision_display = tmp_rule[2];
		let ipversion = tmp_rule[0];
		let iptype = '';

		if(ipversion == 4){
			iptype = 'IPv4';
		}

		let protocol_val = protocol_display = tmp_rule[3];
		let sport_val = tmp_rule[4];
		let dport_val = tmp_rule[5];
		let src_addr = tmp_rule[6];

		firewallplan_table.row.add(
			["",
			"<input type=\"hidden\" name=\"direction[]\" value=\""+direction_val+"\" />"+direction_display, 
			"<input type=\"hidden\" name=\"iptype[]\" value=\""+ipversion+"\" />"+iptype,
			"<input type=\"hidden\" name=\"decision[]\" value=\""+decision_val+"\" />"+decision_display,
			"<input type=\"hidden\" name=\"protocol[]\" value=\""+protocol_val+"\" />"+protocol_display, 
			"<input type=\"hidden\" name=\"sport[]\" value=\""+sport_val+"\" />"+sport_val,
			"<input type=\"hidden\" name=\"dport[]\" value=\""+dport_val+"\" />"+dport_val, 
			"<input type=\"hidden\" name=\"source_addr[]\" value=\""+src_addr+"\" />"+src_addr, 
			"<i class=\"fa fa-trash-alt delete-icon\" onclick=\"delete_rule(this,1);\"></i>"]
		).draw();
	});
}

function addtemplaterules(el){
	
	//Get Firewall id from the template dropdown
	let temporary_template = $(el).attr('id');
	let template_id = Number($("#"+temporary_template+" option:selected").val());

	//If None is slected do nothing
	if(template_id == -1){
		return false;
	}

	//Make an api call to get the current admin templates
	AJAX('[[API]]act=addfirewallplan', function(data) {

		let template_rules = JSON.parse(data["admin_firewallplan_template"][template_id]["rules"]);
		if(!empty(template_rules)){

			let firewallplan_table = $("#managerules").DataTable();
			firewallplan_table.clear().draw();

			template_rules.forEach(function(v){

				let tmp_rule = v.split(" ");

				let direction_val = direction_display = tmp_rule[1];
				let decision_val = decision_display = tmp_rule[2];
				let ipversion = tmp_rule[0];
				let iptype = '';

				if(ipversion == 4){
					iptype = 'IPv4';
				}

				let protocol_val = protocol_display = tmp_rule[3];
				let sport_val = tmp_rule[4];
				let dport_val = tmp_rule[5];
				let src_addr = tmp_rule[6];

				firewallplan_table.row.add(
					["",
					"<input type=\"hidden\" name=\"direction[]\" value=\""+direction_val+"\" />"+direction_display, 
					"<input type=\"hidden\" name=\"iptype[]\" value=\""+ipversion+"\" />"+iptype,
					"<input type=\"hidden\" name=\"decision[]\" value=\""+decision_val+"\" />"+decision_display,
					"<input type=\"hidden\" name=\"protocol[]\" value=\""+protocol_val+"\" />"+protocol_display, 
					"<input type=\"hidden\" name=\"sport[]\" value=\""+sport_val+"\" />"+sport_val,
					"<input type=\"hidden\" name=\"dport[]\" value=\""+dport_val+"\" />"+dport_val, 
					"<input type=\"hidden\" name=\"source_addr[]\" value=\""+src_addr+"\" />"+src_addr, 
					"<i class=\"fa fa-trash-alt delete-fix\" onclick=\"delete_rule(this);\"></i>"]
				).draw();
			});
			
		}
	});
	
}

function hide_down(is_edit = 0){

	let edit_select = !empty(is_edit) ? 'edit_' : '';
	$("#"+edit_select+"dport").val("");
	$("#"+edit_select+"sport").val("");
	$("#"+edit_select+"managerules").DataTable().clear().draw();
	
}

function chartDarkAdjust() {
	chartsList.map((chart) => {
		chart.updateOptions({
			grid: {
				borderColor: "#232339",
			},
			tooltip: {
				theme: 'light'
			},
		})
	})
}

function chartLightAdjust() {
	chartsList.map((chart) => {
		chart.updateOptions({
			grid: {
				borderColor: "#ECEFF3",
			},
			tooltip: {
				theme: 'light'
			},
		})
	})
}

function showtab(ele_id, tab_content, fn) {
 
	//Hide all tabs content
	document.querySelectorAll('.'+tab_content).forEach(tab => {
		tab.classList.add('hidden');
	});

	// Get the button class from content class
	// if tab_content is main-tab-content then button class will be main-tab-button
	var tab_button_class = tab_content.split('-');

	// Remove active class from all tab buttons
	document.querySelectorAll("."+tab_button_class[0]+'-tab-button').forEach(button => {
		button.classList.remove('active', 'shadow');
	});
	
	// Show the selected tab
	document.getElementById(ele_id+'-tab').classList.remove('hidden');

	// Add active class to the clicked tab button
	document.getElementById(ele_id).classList.add('active', 'shadow');
	
	var callfunc = window[fn];
	if(typeof callfunc === 'function'){
		callfunc();
	}
}

function gridBorder() {
	const userTheme = localStorage.getItem("theme");
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
	// initial theme check
	if (userTheme === "dark" || (!userTheme && systemTheme)) {
		return "#232339";
	}
	return "#ECEFF3";
}

window.onload = function () {
	document.querySelectorAll('.progress-fill').forEach(function (fill) {
		reloadProgressBar(fill);
	});
};

function reloadProgressBar(fill) {
	const value = parseFloat(fill.dataset.progress);
	const max = parseFloat(fill.dataset.max);
	const percentage = (value / max) * 100;
	
	fill.style.width = `${percentage}%`;
	// fill.innerText = `${percentage}%`;
}

function toggleModal(modalID){
	document.getElementById(modalID).classList.toggle("hidden");
	document.getElementById("modal-backdrop").classList.toggle("hidden");
	document.getElementById(modalID).classList.toggle("flex");
	document.getElementById("modal-backdrop").classList.toggle("flex");
}


function showToast(toastId, msg) {
	if(!empty(msg)){
		$("."+toastId+'-msg').html(msg);
	}

	$('#'+toastId).show();
	setTimeout(hideToast.bind(null, toastId), 5000);
}

function hideToast(toastId) {
	$('#'+toastId).hide();
}

function show_settings_tab(sectionId, tab_content){

	$("."+tab_content).hide();
	
	if(!empty(sectionId)){
		$("#"+sectionId).show();
	}
}


