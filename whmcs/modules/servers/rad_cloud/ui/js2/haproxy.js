/*! Rad_cloud (c) (Softaculous Ltd.) rad_cloud.com/license */
/*! HAProxy JS*/
/*! Used in haproxy_theme.php, managevps_theme.php and rad_cloud.js */
/*! Created On: 11 May 2017 */

var $vpses, $supported_protocols, $haproxydata, $arr_haproxy_src_ips, $servers;

var vdf_elems = ["protocol", "src_hostname", "src_port", "dest_ip", "dest_port"];
var vdf_row_cols = ["protocol", "src_hostname", "src_port", "dest_ip", "dest_port", "id", "vpsuuid", "serid"];
var is_admin;
var vdf_url;
var vdf_vpsuuid;
var vdf_serid;
var vdf_edit_ico, vdf_save_ico, vdf_delete_ico, vdf_revert_ico;
var cur_vps;

// Add search feature to select input
function add_select2(id){
	$('#'+id+' .chosen').select2({width:"100%"});
}

function listvpsforwardertbl(){
	var $tmp_ha = {};
	var alert_entries = {};

	if(empty($haproxydata)){
		$('#vdf-list').html(`<div class="notice">{{no_vdf}}</div>`);
		return;
	}

	for(x in $haproxydata){
		$tmp_ha[x] = {};
		
		if(is_admin != undefined){
			$tmp_ha[x]['id'] = '<span id="'+$haproxydata[x]['id']+'_id"><span class="coldat">'+$haproxydata[x]['id']+'</span></span>';
			$tmp_ha[x]['vpsuuid'] = '<span id="'+$haproxydata[x]['id']+'_vpsuuid"><span class="coldat">'+$haproxydata[x]['vpsid']+'&nbsp;('+$vpses[$haproxydata[x]['vpsuuid']]['hostname']+')</span></span>';
			$tmp_ha[x]['serid'] = '<span id="'+$haproxydata[x]['id']+'_serid"><span class="coldat">'+$servers[$haproxydata[x]['serid']]['server_name']+'</span></span>';
		}
		
		$tmp_ha[x]['protocol'] = '<span id="'+$haproxydata[x]['id']+'_protocol"><span class="coldat">'+$haproxydata[x]['protocol']+'</span></span>';
		$tmp_ha[x]['src_hostname'] = '<span id="'+$haproxydata[x]['id']+'_src_hostname"><span class="coldat">'+$haproxydata[x]['src_hostname']+'</span></span>';
		$tmp_ha[x]['src_port'] = '<span id="'+$haproxydata[x]['id']+'_src_port"><span class="coldat">'+$haproxydata[x]['src_port']+'</span></span>';
		$tmp_ha[x]['dest_ip'] = '<span id="'+$haproxydata[x]['id']+'_dest_ip"><span class="coldat">'+$haproxydata[x]['dest_ip']+'</span></span>';
		$tmp_ha[x]['dest_port'] = '<span id="'+$haproxydata[x]['id']+'_dest_port"><span class="coldat">'+$haproxydata[x]['dest_port']+'</span></span>';
		$tmp_ha[x]['actions'] = '<span class="vdf_actions" id="'+$haproxydata[x]['id']+'_vdf_actions"><span class="vdf_edit" id="'+$haproxydata[x]['id']+'_edit"><i class="'+vdf_edit_ico+'"  onclick="edit_row(this, '+$haproxydata[x]['id']+');" data-toggle="tooltip" data-placement="auto" title="{{vdf_tooltip_edit}}" ></i></span><span class="vdf_delete"><i class="'+vdf_delete_ico+'" onclick="vdf_confirm('+$haproxydata[x]['id']+');" data-toggle="tooltip" data-placement="auto" title="{{vdf_tooltip_delete}}" ></i></span></span>';
		$tmp_ha[x]['select_all'] = '<span id="'+$haproxydata[x]['id']+'_checkbox" class="custom-control custom-checkbox"><input type="checkbox" class="ios custom-control-input" name="vdf_list[]" id="vdf-checkbox'+$haproxydata[x]['id']+'" value="'+$haproxydata[x]['id']+'"/><label class="custom-control-label" for="vdf-checkbox'+$haproxydata[x]['id']+'">';
		
	}
	
	var cols = new Object();
	if(is_admin != undefined){
		cols["id"] = {"l" : "{{id}}"};
		cols["vpsuuid"] = {"l" : "{{vdf_vpsid}}"};
		cols["serid"] = {"l" : "{{vdf_serid}}"};
	}
	
	cols["protocol"] = {"l" : "{{vdf_proto}}"};
	cols["src_hostname"] = {"l" : "{{vdf_src_hname}}"};
	cols["src_port"] = {"l" : "{{vdf_src_port}}"};
	cols["dest_ip"] = {"l" : "{{vdf_dest_ip}}"};
	cols["dest_port"] = {"l" : "{{vdf_dest_port}}"};
	cols["actions"] = {"l" : "{{actions}}"};
	cols["select_all"] = {"l" : '<div class="custom-control custom-checkbox"><input type="checkbox" class="select_all custom-control-input" name="select_all" id="vdf_select_all" onclick=\"checkbox_select_all(this);\" /><label class="custom-control-label" for="vdf_select_all"></label></div>', "class" : "select-all-checkbox"};

	// Form the TABLE
	drawTable({'id' : 'vdf_tbl_div', 'tid' : 'vps_forwarders_tbl', "width" : '100%'}, cols, $tmp_ha);
	apply_data_table('vps_forwarders_tbl');
	
	$(".scrollbar-virt").scrollbar();
	$('#vdf_tbl_div select[name="vps_forwarders_tbl_length"]').on('change', update_record_alerts);
	$('#vdf_tbl_div .paginate_button').on('click', update_record_alerts);
	update_record_alerts();

	$("#addvdf").trigger("reset");
};

function update_record_alerts(){
	$('#vdf_tbl_div .paginate_button').on('click', update_record_alerts);
	
	$('#vps_forwarders_tbl tr').each(function(i,t){
		if(i == 0){
			return;
		}
		
		var $span = $(t).find('td span[id$="protocol"]');
		
		if($span.length == 0) {
			return;
		}
		
		var x = parseInt($span.attr("id").split('_')[0]);
		
		if($haproxydata[x]['skipped_json'] != undefined){
			var str = '{{vdf_skipped_msg}}'+"\n";
			
			var s = JSON.parse($haproxydata[x]['skipped_json']);
			
			$(t).css('background-color', '#FF9090');
			
			if(s.haproxy_reservedports != undefined){
				str += '{{vdf_skipped_haproxy_reservedports}}'+"\n";
			}
			if(s.haproxy_reservedports_http != undefined){
				str += '{{vdf_skipped_haproxy_reservedports_http}}'+"\n";
			}
			if(s.haproxy_allowedports != undefined){
				str += '{{vdf_skipped_haproxy_allowedports}}'+"\n";
			}
			
			$(t).attr('title', str);
		}
	});
}



function edit_row(self, vdfid){
	
	var vpsips = (empty(is_admin) ? $vpses[vdf_vpsuuid]['ips'] : '');
	
	if(!empty(is_admin)){
		processing_symb(1);
	
		POST({
			url: vdf_url,
			data: 'vpsuuid='+$haproxydata[vdfid]['vpsuuid']+'&vdf_action=getvpsips',
		}, function(data){
			processing_symb();
			edit_row_afterips(self, vdfid, data.vpsips);
			
		});
		return;
	}
	
	edit_row_afterips(self, vdfid, vpsips);
	
};

function edit_row_afterips(self, vdfid, vpsips){
	var coleditelms = {};
	coleditelms["protocol"] = "<span class=\"coledit\">";
	coleditelms["protocol"] += "<select id=\""+vdfid+"_protocol_edit\" class=\"form-control\" onchange=\"handleprotochange(this, "+vdfid+");\">";
	$.each($supported_protocols, function(i,t){
		coleditelms["protocol"] += "<option value=\""+t+"\" "+($("#"+vdfid+"_protocol .coldat").html() == t ? "selected=\"selected\"" : "")+">"+t+"</option>";
	});
	coleditelms["protocol"] += "</select></span>";
	
	coleditelms["src_hostname"] = "<span class=\"coledit\">";
	coleditelms["src_hostname"] += "<input id=\""+vdfid+"_src_hostname_edit\" type=\"text\" class=\"form-control mb-0\" value=\""+$("#"+vdfid+"_src_hostname .coldat").html()+"\" />";
	coleditelms["src_hostname"] += "</span>";
	
	coleditelms["src_port"] = "<span class=\"coledit\">";
	coleditelms["src_port"] += "<input id=\""+vdfid+"_src_port_edit\" type=\"text\" class=\"form-control mb-0\" value=\""+$("#"+vdfid+"_src_port .coldat").html()+"\" />";
	coleditelms["src_port"] += "</span>";
	
	coleditelms["dest_ip"] = "<span class=\"coledit\">";
	coleditelms["dest_ip"] += "<select id=\""+vdfid+"_dest_ip_edit\" class=\"form-control\">";
	
	$.each(vpsips, function(i,t){
		coleditelms["dest_ip"] += "<option value=\""+i+"\" "+($("#"+vdfid+"_dest_ip .coldat").html() == i ? "selected=\"selected\"" : "")+">"+i+"</option>";
	});
	coleditelms["dest_ip"] += "</select></span>";
	
	coleditelms["dest_port"] = "<span class=\"coledit\">";
	coleditelms["dest_port"] += "<input id=\""+vdfid+"_dest_port_edit\" type=\"text\" class=\"form-control mb-0\" value=\""+$("#"+vdfid+"_dest_port .coldat").html()+"\" />";
	coleditelms["dest_port"] += "</span>";
	
	
	$.each(coleditelms, function(i, t){
		$("#"+vdfid+"_"+i+" .coledit").remove();
		$("#"+vdfid+"_"+i).append(coleditelms[i]);
		$("#"+vdfid+"_"+i+" .coldat").css("display", "none");
		$("#"+vdfid+"_"+i+" .coledit").css("display", "block");
	});
	
	var revertimg = "<i class=\""+vdf_revert_ico+"\" onclick=\"revert_vdf(this, "+vdfid+");\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"{{vdf_tooltip_revert}}\" ></i><i class=\""+vdf_save_ico+"\" onclick=\"save_vdf(this);\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"{{vdf_tooltip_save}}\" ></i>";
	$("#"+vdfid+"_edit").append(revertimg);
	$(self).remove();
	
	$("#"+vdfid+"_protocol select").trigger("change");
	
	// Add search feature to select and adjust select height
	add_select2("vps_forwarders_tbl");
};

function save_vdf(self){
	
	var vdfid = $(self).parents().eq(1).attr("id").split("_")[0];
	
	// Get vdf data to post
	var postdata = {};
	postdata['vdfid'] = encodeURIComponent(vdfid);
	postdata['vdf_action'] = 'editvdf';
	
	if(is_admin != undefined){
		postdata['vpsuuid'] = encodeURIComponent($haproxydata[vdfid]["vpsuuid"]);
		postdata['serid'] = encodeURIComponent($haproxydata[vdfid]["serid"]);
	}
	$.each(vdf_elems, function(i,t){
		postdata[t] = encodeURIComponent($("#"+vdfid+"_"+t+"_edit").val());
	});
	processing_symb(1);
	// Post the data
	POST({
		url: vdf_url,
		data: $.param(postdata),
	}, function(data){	
		processing_symb();
		
		if('done' in data){
			
			// Update row with new values
			$.each(vdf_row_cols, function(i,t){
				$("#"+vdfid+"_"+t+" .coldat").html($("#"+vdfid+"_"+t+"_edit").val());
				
				// If this record was skipped previously then remove tooltip and change its background-color
				if($haproxydata[vdfid]['skipped'] != undefined){
					$('#'+vdfid+'_protocol').parents().filter('tr').eq(0).attr('title', '');
					$('#'+vdfid+'_protocol').parents().filter('tr').eq(0).css('background-color', '');
				}
				
			});
			// Show new values set in .coldat
			revert_vdf(self, vdfid);
		}
	});
	
};

function revert_vdf(self, vdfid){
	
	$.each(vdf_row_cols, function(i, t){
		$("#"+vdfid+"_"+t+" .coledit").remove();
		$("#"+vdfid+"_"+t+" .coldat").css("display", "block");
	});
	
	var editimg = "<i class=\""+vdf_edit_ico+"\" onclick=\"edit_row(this, "+vdfid+");\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"{{vdf_tooltip_edit}}\" ></i>";
	
	$("#"+vdfid+"_edit *").remove();
	$("#"+vdfid+"_edit").append(editimg);
	
};

// This function processes delete VDF records
function vdf_confirm(vdfid){
	
	vdfid = vdfid || 0;
	
	vdfids = new Array();
	
	selopts = $("#haproxy_multiselect_action option");
	selectvals = new Array();

	for(i=0; i<selopts.length; i++){
		val = selopts.eq(i).val();
		if(val != 0){
			selectvals.push(val);
		}
	}
	
	confirmmsg = ["{{vdf_conf_del_entries}}"];
	selectIndx = selectvals.indexOf($("#haproxy_multiselect_action").val());

	if(vdfid < 1){

		if(selectIndx == -1){
			error_alert("{{vdf_no_act_sel}}");
			return false;
		}
	
		$("#vdf_tbl_div .ios:checked").each(function(i, t) {
			vdfids.push($(t).parent().attr("id").split("_")[0]);
		});
	
	}else{
		vdfids.push(vdfid);
		selectIndx = 0;
	}
	
	if(vdfids.length < 1){
		error_alert("{{nothing_selected}}");
		return false;
	}

	modalConfirm(function(confirm){
		if(!confirm){
			return false;
		}else{

			var finalids = new Object();

			//finalids["action"] = selectvals[selectIndx];
			finalids["ids"] = vdfids.join(",");
			finalids["vdf_action"] = "delvdf";
			
			$("#progress_bar").show();
			
			processing_symb(1);
			// Post the data
			POST({
				url: vdf_url,
				data: $.param(finalids),
			}, function(data){	
				processing_symb();
				if('done' in data){
					if(is_admin != undefined){
						window.location = window.location;
						return;
					}
					$.each(vdfids, function(i, t){
						delete $haproxydata[t];
					});
					listvpsforwardertbl();
				}
			});
			
		}
	}, confirmmsg[selectIndx]);
	
};

function handleprotochange(self, vdfid){
	
	//2 = TCP
	if($(self).val() == 'TCP'){
		var $arr_src_ips = $arr_haproxy_src_ips;
		if(is_admin != undefined){
			$arr_src_ips = $servers[$haproxydata[vdfid]['serid']]['arr_haproxy_src_ips'];
		}
		// List source IPs as src_hostname
		var str = "";
		str = "<span class=\"coledit\">";
		str += "<select id=\""+vdfid+"_src_hostname_edit\" class=\"form-control\">";
		$.each($arr_src_ips, function(i,t){
			str += "<option value=\""+t+"\" "+(t == $("#"+vdfid+"_src_hostname .coldat").html() ? "selected=\"selected\"" : "")+">"+t+"</option></span>";
		});
		str += "</select></span>";	
		
	// HTTP or HTTPS
	}else{
		//src_hostname
		str = "<span class=\"coledit\">";
		str += "<input id=\""+vdfid+"_src_hostname_edit\" type=\"text\" class=\"form-control mb-0\" value=\""+$("#"+vdfid+"_src_hostname .coldat").html()+"\" />";
		str += "</span>";
	}
	$("#"+vdfid+"_src_hostname .coledit").remove();
	$("#"+vdfid+"_src_hostname").append(str);
	
	// add search feature to select
	add_select2("vps_forwarders_tbl");
	
};

function processaddvdfform(self){
	var id = $(self).attr("id");
	
	if(is_admin != undefined){
		
		if(id == "serid"){
			var str = "";
			var serid = parseInt($("#serid").val());
			
			str = "<option value=\"-1\">"+$l["vdf_select_vps"]+"</option>";
			
			processing_symb(1);
			POST({
				url: vdf_url,
				data: 'serid='+serid+'&vdf_action=getvps',
			}, function(data){
				processing_symb();
				if('done' in data){
					if(data.vpses != undefined){
						$.each(data.vpses, function(i,t){
							cur_vps = data.vpses;
							if(t["serid"] == serid){
								str += "<option value=\""+i+"\">"+t['vpsid']+" - "+t['hostname']+" ( "+t["vps_name"]+" )</option>";
							}
						});
						$("#vpsuuid").html(str);
					}
				}
			});
			
			$("#protocol").trigger("change");
			return true;
		}
		
		if(id == "vpsuuid"){
			var str = "";
			$("#dest_ip").html('');
			
			var vpsuuid = $("#vpsuuid").val();
			if(cur_vps[vpsuuid] == undefined){
				// update select dest ips list
				$("#dest_ip").trigger("chosen:updated");
				return;
			}
			
			str = "<option value=\"-1\">"+$l["vdf_select_ip"]+"</option>";
			
			processing_symb(1);
			POST({
				url: vdf_url,
				data: 'vpsuuid='+vpsuuid+'&vdf_action=getvpsips',
			}, function(data){
				processing_symb();
				if('done' in data){
					if(data.vpsips != undefined){
						$.each(data.vpsips, function(i,t){
							str+= "<option value=\""+i+"\">"+i+"</option>";
						});
					}
					$("#dest_ip").html(str);
				}
			});
			return true;
		}
		
	}
	
	if(id == "protocol"){
		var str = "";
		var parent = $("#src_hostname").parent();
		// 2 = TCP
		if($(self).val() == "TCP"){
			var $arr_src_ips = $arr_haproxy_src_ips;
			if(is_admin != undefined){
				var serid = $("#serid").val();
				if($servers[serid] == undefined){
					error_alert("'.$l['no_server_found'].'");
					return;
				}else{
					$arr_src_ips = $servers[serid]["arr_haproxy_src_ips"];
				}
			}
			
			str = "<label class='form-label' for='src_hostname' >{{vdf_src_hname}}</label><select class=\"form-control\" id=\"src_hostname\" name=\"src_hostname\">";
			str += "<option value=\"-1\">{{vdf_select_ip}}</option>";
			$.each($arr_src_ips, function(i,t){
				str += "<option value=\""+t+"\">"+t+"</option>";
			});
			str += "</select>";
			$("#src_port").val("");
			$("#dest_port").val("");
			$(parent).parent().children().eq(0).children().eq(0).text("{{vdf_src_ip}}");
			
		// https or http
		}else{
			str = "<label class='form-label' for='src_hostname' >{{vdf_src_hname}}</label><input type=\"text\" id=\"src_hostname\" class=\"form-control w-100\" name=\"src_hostname\"/>";
			if($(self).val() == "HTTP"){
				$("#src_port").val("80");
				$("#dest_port").val("80");
			}else if($(self).val() == "HTTPS"){
				$("#src_port").val("443");
				$("#dest_port").val("443");
			}
			$(parent).parent().children().eq(0).children().eq(0).text("{{vdf_src_dom}}");
			
		}
		// Remove old before adding updated one
		$("#src_hostname").remove();
		
		$(parent).html(str);
		
		// add search feature to select
		add_select2("addvdf_form_div");
		
		return true;
	}
	if(id == "submitaddvdf"){
		// Post the data
		processing_symb(1);
		POST({
			url: vdf_url,
			data: $("#addvdf").serialize(),
		}, function(data){
			processing_symb();
			if('done' in data){
				
				if(is_admin != undefined){
					window.location = window.location;
					return;
				}
				
				var id = parseInt(data.done.id);
				
				// set vpsuuid and serid of the entry if this is called on admin page.
				// For other page call, this values will be already set.
				if(is_admin != undefined){
					vdf_vpsuuid = $("#vpsuuid").val();
					vdf_serid = $("#serid").val();
				}
				
				$haproxydata[id] = {
					"id" : id,
					"vpsuuid" : vdf_vpsuuid,
					"serid" : vdf_serid,
					"protocol" : $("#protocol").val(),
					"src_hostname" : $("#src_hostname").val(),
					"src_port" : $("#src_port").val(),
					"dest_ip" : $("#dest_ip").val(),
					"dest_port" : $("#dest_port").val()
				}
				
				listvpsforwardertbl();
				
			}
		});
	}
}

function showvdfform(){
	var str = "";
	var ips = {};
	
	// Reset form
	$("#addvdf").trigger("reset");
	$("#addvdf select").trigger("chosen:updated");
	
	// Adjust height of lables
	$("#addvdf_form_div .row").eq(1).find(".control-label").parent().height(38);
	
	// Populate servers and vps list for admin page only
	if(is_admin != undefined){
		var str = "";
		str = "<option value=\"-1\">"+$l["select_server"]+"</option>";
		
		$.each($servers, function(i,t){
			str += "<option value=\""+i+"\">"+t["server_name"]+"</option>";
		});
		$("#serid").html(str);
		
	}else{
		// Get VPS IPs to be shown in form
		ips = $vpses[vdf_vpsuuid]["ips"];
	}
	
	// Populate protocols list
	str = "<option value=\"-1\">{{vdf_sel_proto}}</option>";
	$.each($supported_protocols, function(i, t){
		str += "<option value=\""+t+"\">"+t+"</option>";
	});
	$("#protocol").html(str);

	// Populate VPS IPs list
	str = "";
	str = "<option value=\"-1\">{{vdf_select_ip}}</option>";
	
	$.each(ips, function(i,t){
		str+= "<option value=\""+i+"\">"+i+"</option>";
	});
	$("#dest_ip").html(str);
	
	
	// Show form
	$("#addvdf_form_div").css("display", "block");
	$("#showaddvdfformbtn").hide();
	
	// add search feature to select
	add_select2("addvdf_form_div");
}

// Creates the TABLE
function apply_data_table(fp_tid){
	
	$('#'+fp_tid).dataTable({
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
		},
		'columnDefs': [ {
			'targets': [6,5], // column index (start from 0)
			'orderable': false, // set orderable false for selected columns,
			'width' : '5%'
		 },
		 { "width": "13%", "targets": [0] },
		 { "width": "21%", "targets": [1] },
		 { "width": "16%", "targets": [2] },
		 { "width": "18%", "targets": [3] },
		 { "width": "20%", "targets": [4] },
		],
		'autoWidth': true,
	});
};

function processing_symb(show){
	if(show == 1){
		$("#processing_symb").css('display','block');
	}else{
		$("#processing_symb").css('display','none');
	}
}