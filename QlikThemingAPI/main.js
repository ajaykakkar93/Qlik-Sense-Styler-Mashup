// adds an element to the array if it does not already exist using a comparer
// function
$(document).ready(function () {
	var i = 1,
		singleColorArr = {},
		exportPickerColor = [];
	//var data ={};
	function apply_test() {
		if ($("style#apply_test_css").length <= 0) {
			$("head").append($("<style id='apply_test_css'>" + $("#style_here").val() + "</style>"));
		} else {
			$("#apply_test_css").empty().append($("#style_here").val() + "");
		}
	}

	function addSingleColorArr(key, value) {
		var arr = [],
			arrid = key.split("_");
		for (let index = 0; index < value.length; index++) {
			const element = value[index].value;
			//console.log(element);
			arr.push(element);
		}
		updateData({
			name: "Color - " + key,
			scale: arr
		});
		// console.log((arrid[1]-1),singleColorArr);
	}

	function GetDynamicTextBox(value) {
		return ('<td><input id="' + value + '" name = "SingleSchemePickerBox" type="text" value = "" class="form-control color_picker" /></td>' + '<td><button type="button" class="btn btn-danger remove"><i class="glyphicon glyphicon-remove-sign"></i></button></td>');
	}

	function generateRand() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
	var updateData = function () {
		var len = arguments.length,
			i = 0;
		for (i = 0; i < len; i++) {
			singleColorArr[arguments[i].name] = arguments[i].scale;
		}
		//console.log(singleColorArr);
	};
	// add btn click evt
	$("body").on("click", ".removeDefaultColorPickerBtn", function () {
		var trID = $(this).attr("trID");
		console.log("remove table", trID);
		$("#" + trID).remove();
		DefaultcolorPicker(i, $("#ColorPicker tr input[name='PickerScale']"));
	});

	function DefaultcolorPicker(key, value) {
		//console.log(key,value);
		key = key - 1;
		exportPickerColor = [];
		for (let index = 0; index < value.length; index++) {
			const element = value[index].value;
			console.log(index, element);
			exportPickerColor.push(element);
		}
		//console.log(exportPickerColor);
	}
	//Add color scheme
	$("#btnAdd_Picker").click(function () {
		// console.log("TableID", i);
		var inputID1 = generateRand();
		var td = '<tr id="tr_' + i + '"><td>' + i + "</td>" + '<td><input showGradient="showGradient_' + i + '" class="form-control color_picker" name="PickerScale" type="text" id="' + inputID1 + '"/></td>' + '<td><button class="btn btn-danger removeDefaultColorPickerBtn" trID="tr_' + i + '" type="button"><i class="glyphicon glyphicon-remove-sign"></i></button></td>' + "</tr>";
		//ColorPicker
		$("#ColorPicker").append(td);
		$("#" + inputID1).ColorPickerSliders({
			size: "sm",
			placement: "bottom",
			swatches: false,
			sliders: true,
			hsvpanel: true,
			onchange: function (container, color) {
				DefaultcolorPicker(i, $("#ColorPicker tr input[name='PickerScale']"));
			}
		});
		DefaultcolorPicker(i, $("#ColorPicker tr input[name='PickerScale']"));
		i++;
	});
	//Add color scheme
	$("#btnAdd_color_scheme").click(function () {
		//console.log("TableID", i);
		$("#single_scheme_container").append('<div class="table table-responsive" id="Container_table_' + i + '" ><button tableid="table_' + i + '" type="button" class="btn btn-danger removeSingleSchemeBtn"><i class="glyphicon glyphicon-remove-sign"></i>&nbsp; Remove&nbsp;</button>' + '<table id="table_' + i + '" class="table table-responsive table-striped table-bordered">' + "<thead>" + "	<tr>" + "		<td>Select Color : " + i + "</td>" + "		<td>&nbsp;</td>" + "	</tr>" + "</thead>" + '<tbody id="SingleColorPicker">' + "</tbody>" + "<tfoot>" + "<tr>" + '	<th colspan="5">' + '		<button tableid="table_' + i + '" type="button" class="btn btn-primary addSingleSchemeBtn"><i class="glyphicon glyphicon-plus-sign"></i>&nbsp; Add&nbsp;</button>' + "	</th>" + "</tr>" + "</tfoot>" + "</table></div>");
		i++;
	});
	// add btn click evt
	$("body").on("click", ".addSingleSchemeBtn", function () {
		var inputID = generateRand();
		var tableID = $(this).attr("tableid");
		//console.log("tableID", tableID);
		var div = $("<tr />");
		div.html(GetDynamicTextBox("" + inputID));
		$("#" + tableID + " tbody#SingleColorPicker").append(div);
		$("#" + inputID).ColorPickerSliders({
			size: "sm",
			placement: "bottom",
			swatches: false,
			sliders: true,
			hsvpanel: true,
			onchange: function (container, color) {
				// console.log('adding',"#"+tableID+" input[name='SingleSchemePickerBox']");
				addSingleColorArr(tableID, $("#" + tableID + " input[name='SingleSchemePickerBox']"));
			}
		});
		addSingleColorArr(tableID, $("#" + tableID + " input[name='SingleSchemePickerBox']"));
	});
	$("body").on("click", ".removeSingleSchemeBtn", function () {
		var tableID = $(this).attr("tableid");
		console.log("removing : ", tableID);
		//$(this).remove();
		//$("#"+tableID).remove();
		$("#Container_" + tableID).remove();
		var ii = tableID.split("_");
		delete singleColorArr["Color - " + tableID];
		console.log(singleColorArr);
	});
	$("body").on("click", ".remove", function () {
		$(this).closest("tr").remove();
	});
	$("#btnexport_color_scheme").click(function () {
		var final = [];
		for (var key in singleColorArr) {
			//console.log(key,singleColorArr[key]);
			final.push({
				name: key,
				type: "row",
				propertyValue: key,
				scale: singleColorArr[key]
			});
		}
		console.log(final);
		$("#rextareaexport_color_scheme").empty().append(JSON.stringify(final));
	});
	// Generate css
	function getCSS() {
		console.log("Starting");
		var styleVal = {
			sheet: {
				TitleBarGrp: $("input[name='TitleBarGrp']:checked").attr("val") == "true" ? true : false,
				sheet_title_height: $("#sheet_title_height").val(),
				sheet_title_fontsize: $("#sheet_title_fontsize").val(),
				sheet_title_imgwidth: $("#sheet_title_imgwidth").val(),
				sheet_bg_grp: $("input[name='sheet_bg_grp']:checked").attr("val") == "true" ? true : false,
				sheet_bg: $("#sheet_bg").val(),
				sheet_bg_img: $("#sheet_bg_img").val()
			},
			object: {
				obj_transparent: $("input[name='obj_transparent']:checked").attr("val") == "true" ? true : false,
				ignore_style: $("input[name='ignore_style']:checked").attr("val") == "true" ? true : false,
				//"obj_border": $("#obj_border").val(),
				obj_title_margin: $("#obj_margin").val(),
				obj_bg: $("#obj_bg").val(),
				obj_title_color: $("#obj_title_color").val(),
				obj_title_bgcolor: $("#obj_title_bgcolor").val(),
				obj_title_padding: $("#obj_title_padding").val(),
				obj_title_fontsize: $("#obj_title_fontsize").val(),
				obj_title_fontweight: $("#obj_title_fontweight").val()
			},
			table: {
				table_header_color: $("#table_header_color").val(),
				table_header_bgcolor: $("#table_header_bgcolor").val(),
				table_total_top_color: $("#table_total_top_color").val(),
				table_total_top_bgcolor: $("#table_total_top_bgcolor").val(),
				table_total_bottom_color: $("#table_total_bottom_color").val(),
				table_total_bottom_bgcolor: $("#table_total_bottom_bgcolor").val(),
				table_row_fontsize: $("#table_row_fontsize").val(),
				table_header_fontsize: $("#table_header_fontsize").val(),
				table_row_odd: $("#table_row_odd").val(),
				table_row_even: $("#table_row_even").val(),
				table_dim_align: $("#table_dim_align :selected").val(),
				table_mes_align: $("#table_mes_align :selected").val(),
				table_custom_align: $("#table_custom_align :selected").val(),
				table_header_align: $("#table_header_align :selected").val()
			},
			pivot: {
				pivot_header_color: $("#pivot_header_color").val(),
				pivot_header_bgcolor: $("#pivot_header_bgcolor").val(),
				pivot_row_fontsize: $("#pivot_row_fontsize").val(),
				pivot_header_fontsize: $("#pivot_header_fontsize").val(),
				pivot_dim_align: $("#pivot_dim_align :selected").val(),
				pivot_mes_align: $("#pivot_mes_align :selected").val()
			}
		};
		//"pivot_custom_align":$("#pivot_mes_align :selected").val(),
		//"pivot_header_align":$("#pivot_mes_align :selected").val()
		console.log(styleVal);
		var style = "";
		// '+styleVal+'

		style += ".qv-object-nav{";
		style += "	background-color: transparent !important;";
		style += "}";

		style += ".qvt-sheet {";
		style += styleVal.sheet.sheet_bg_grp ? "    background: " + styleVal.sheet.sheet_bg + ";" : "   background-image: " + styleVal.sheet.sheet_bg_img + ";";
		style += "}";
		style += ".sheet-title-container {";
		style += styleVal.sheet.TitleBarGrp ? "  display:none;" : "";
		style += "}";
		style += "#sheet-title.sheet-grid {";
		style += "    height: " + styleVal.sheet.sheet_title_height + ";     font-size:" + styleVal.sheet.sheet_title_fontsize + ";";
		style += "}";
		style += "#sheet-title .sheet-title-logo-img {";
		style += "    max-width: " + styleVal.sheet.sheet_title_imgwidth + ";";
		style += "}";
		/* object bg transparent */
		style += ".qv-inner-object {";
		style += styleVal.object.obj_transparent ? " background-color: transparent !important;" : "";
		style += "}";
		/* end */
		/* scroll bar */
		style += ".scrollbar-track.vertical .scrollbar-thumb {";
		style += "    width: 10px;";
		style += "}";
		style += ".scrollbar-track.horizontal .scrollbar-thumb {";
		style += "    height: 10px;";
		style += "}";
		/* end */
		/* liui icon color */
		style += ".qv-object .lui-icon, .qv-object .lui-caret, .qv-object .lui-checkbox__check {";
		style += "    color: #000 !important;";
		style += "}";
		/* end */
		/* object background color  .qv-object-VizlibTextObject,  */
		/* .qv-object-kpi, .qv-object-text-image  */
		style += ".qv-object-kpi, .qv-object-text-image {";
		style += styleVal.object.ignore_style ? "" : "   background-color: " + styleVal.object.obj_bg + "    !important;" + "   -webkit-box-shadow: 0 0 5px 2px " + styleVal.object.obj_bg + ";" + "    -moz-box-shadow: 0 0 5px 2px " + styleVal.object.obj_bg + ";" + "    box-shadow: 0 0 5px 1px rgba(183, 182, 182, 0.68);";
		style += "}";
		/* end */
		style += ".qv-object-barchart, .qv-object-combochart, .qv-object-table, .qv-object-pivot-table, .qv-object-waterfallchart, .qv-object-treemap, .qv-object-map, .qv-object-linechart, .qv-object-scatterplot, .qv-object-piechart, .qv-object-gauge, .qv-object-histogram, .qv-object-distributionplot, .qv-object-boxplot {";
		style += "    background-color: " + styleVal.object.obj_bg + "    !important;";
		style += "    -webkit-box-shadow: 0 0 5px 2px " + styleVal.object.obj_bg + ";";
		style += "    -moz-box-shadow: 0 0 5px 2px " + styleVal.object.obj_bg + ";";
		style += "    box-shadow: 0 0 5px 1px rgba(183, 182, 182, 0.68);";
		style += "}";
		/* */
		/* .qv-object-kpi .qv-object-header,.qv-object-gauge .qv-object-header, .qv-object-text-image .qv-object-header */
		style += ".qv-object-kpi .qv-object-header,.qv-object-gauge .qv-object-header, .qv-object-text-image .qv-object-header {";
		//style+=(styleVal.object.ignore_style ? '':'   padding: '+styleVal+'    !important;')
		style += "}";
		style += ".qv-object-barchart .qv-object-header, .qv-object-combochart .qv-object-header, .qv-object-table .qv-object-header, .qv-object-pivot-table .qv-object-header, .qv-object-waterfallchart .qv-object-header, .qv-object-treemap .qv-object-header, .qv-object-map .qv-object-header, .qv-object-linechart .qv-object-header, .qv-object-scatterplot .qv-object-header, .qv-object-piechart .qv-object-header, .qv-object-histogram .qv-object-header, .qv-object-distributionplot .qv-object-header, .qv-object-boxplot .qv-object-header {";
		style += '  padding: 0px !important;';
		style += "    background: " + styleVal.object.obj_title_bgcolor + ";";
		style += "}";
		style += ".qv-object-barchart .qv-object-header h1, .qv-object-combochart .qv-object-header h1, .qv-object-table .qv-object-header h1, .qv-object-pivot-table .qv-object-header h1, .qv-object-waterfallchart .qv-object-header h1, .qv-object-treemap .qv-object-header h1, .qv-object-map .qv-object-header h1, .qv-object-linechart .qv-object-header h1, .qv-object-scatterplot .qv-object-header h1, .qv-object-piechart .qv-object-header h1, .qv-object-histogram .qv-object-header h1, .qv-object-distributionplot .qv-object-header h1, .qv-object-boxplot .qv-object-header h1 {";
		style += "    padding: " + styleVal.object.obj_title_padding + ";";
		style += "    border-bottom: 1px dashed rgb(199, 199, 199);";
		style += "    font-size: " + styleVal.object.obj_title_fontsize + " !important;";
		style += "    font-weight: " + styleVal.object.obj_title_fontweight + " !important;";
		style += "    margin: " + styleVal.object.obj_title_margin + " !important;";
		style += "    color: " + styleVal.object.obj_title_color + " !important;";

		style += "}";
		/* table style */
		style += ".qv-st-interactive:not(.qv-st-selections-active):not(.qv-st-reordering-active) .qv-st-header:not(.qv-st-custom-header) .qv-st-header-cell-search,";
		style += ".qv-st-navigatable:not(.qv-st-selections-active):not(.qv-st-reordering-active) .qv-st-header-sortable:not(.qv-st-custom-header) {";
		style += "    background: " + styleVal.table.table_header_bgcolor + " !important;";
		style += "    color: " + styleVal.table.table_header_color + " !important;";
		style += "    font-size: " + styleVal.table.table_header_fontsize + " !important;";
		style += "}";
		style += "div .qv-st-header-wrapper tr:nth-child(2) {";
		style += "    background: " + styleVal.table.table_total_top_bgcolor + " !important;";
		style += "    color: " + styleVal.table.table_total_top_color + " !important;";
		style += "}";
		style += "div .qv-st-bottom-header tr {";
		style += "    background: " + styleVal.table.table_total_bottom_bgcolor + " !important;";
		style += "    color: " + styleVal.table.table_total_bottom_color + "!important;";
		style += "}";
		style += "div table .qv-st-data-cell.qv-st-data-cell-numeric .qv-st-value {";
		style += "    text-align: " + styleVal.table.table_mes_align + " !important;";
		style += "}";
		style += "div table .qv-st-data-cell.qv-st-data-cell-dimension-value .qv-st-value {";
		style += "    text-align: " + styleVal.table.table_dim_align + " !important;";
		style += "}";
		style += "div table .qv-st-data-cell .qv-st-value {";
		style += "    text-align: " + styleVal.table.table_custom_align + " !important;";
		style += "}";
		style += "div table tr th .qv-st-value {";
		style += "    text-align: " + styleVal.table.table_header_align + " !important;";
		style += "}";

		style += "div .qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(even) {";
		style += "	background: " + styleVal.table.table_row_even + " !important;";
		style += "}";
		style += "div .qv-object-table .qv-inner-object .qv-object-content-container .qv-grid-object-scroll-area table tr:nth-child(odd) {";
		style += "	background: " + styleVal.table.table_row_odd + " !important;";
		style += "}";

		/* table style */
		/* pivot table */
		style += ".qv-pt .cell.header.top {";
		style += "    color: " + styleVal.pivot.pivot_header_color + " !important;";
		style += "    background: " + styleVal.pivot.pivot_header_bgcolor + ";";
		style += "}";
		style += ' .qv-object-pivot-table .qv-inner-object table tr[tid="header.row"]:nth-child(3) {';
		style += "    background: " + styleVal.pivot.pivot_header_bgcolor + " !important;";
		style += "    color: " + styleVal.pivot.pivot_header_color + " !important;";
		style += "}";
		style += " .qv-object-pivot-table .qv-inner-object table td.cell.numeric {";
		style += "    text-align: " + styleVal.pivot.pivot_mes_align + " !important;";
		style += "}";
		style += " .qv-object-pivot-table .qv-inner-object table td.cell.data {";
		style += "    text-align: " + styleVal.pivot.pivot_dim_align + " !important;";
		style += "}";
		style += " .qv-object-pivot-table .qv-inner-object table tr th div {";
		style += "    font-size: " + styleVal.pivot.pivot_header_fontsize + " !important;";
		style += "}";
		style += ".qv-object-pivot-table .qv-inner-object table td.cell.header , .qv-object-pivot-table .qv-inner-object table td.cell.data{";
		style += "	font-size: " + styleVal.pivot.pivot_row_fontsize + " !important;";
		/*text-align: Center !important;*/
		style += "}";
		/* pivot table */
		/* CSS */
		$("#style_here").empty().append(style);
		$("#style_here").show();
		//.linedTextEditor();
	}
	$("#download").hide();
	$("#submit").click(function () {
		getCSS();
		//  $('#download').attr("href",'data:text/plain;charset=utf-8,' + ($('#style_here').val()));
		// download css
		/*
    setTimeout(function() {
      console.log("exporting");
      var anchor = document.querySelector("a");
      anchor.onclick = function() {
        anchor.href = "data:text/plain;charset=utf-8," + $("#style_here").val();
        anchor.download = "theme.txt";
      };
      anchor.click();
    }, 1000);
*/
	});
	$('input[name="sheet_bg_grp"]').on("change", function () {
		if ($("input[name='sheet_bg_grp']:checked").attr("val") == "true") {
			$("#sheet_bg").parent().parent().show();
			$("#sheet_bg_img").parent().parent().hide();
		} else {
			$("#sheet_bg").parent().parent().hide();
			$("#sheet_bg_img").parent().parent().show();
		}
	});
	$(".color_picker").ColorPickerSliders({
		size: "sm",
		placement: "bottom",
		swatches: false,
		sliders: true,
		hsvpanel: true,
		onchange: function (container, color) {
			getCSS();
			apply_test();
		}
	});
	$("input").on("change", function () {
		getCSS();
		apply_test();
	});
	$("select").on("change", function () {
		getCSS();
		apply_test();
	});
	// export JSON
	//export
	$("#btnExportJSON").click(function () {
		var final = [];
		for (var key in singleColorArr) {
			//console.log(key,singleColorArr[key]);
			final.push({
				name: key,
				type: "row",
				propertyValue: key,
				scale: singleColorArr[key]
			});
		}
		//console.log(final);
		var palette = {
			_inherit: true,
			_variables: {
				"@TitleSize": "15px",
				"@SubtitleSize": "12px",
				"@TextSize": "14px",
				"@FooterColor": "#6d6d6d",
				"@FooterSize": "10px",
				"@footerBG": "#e6e6e6",
				"@TitleColor": "#000",
				"@SubtitleColor": "#888888",
				"@TextColor": "#232323",
				"@BackgroundColor": "#fff",
				"@AxisMajorColor": "#0dff31",
				"@AxisMinorColor": "#ff1a31",
				"@dark": "#000",
				"@light": "#ccc",
				"@primaryColor": "#0b62ae",
				"@othersColor": "#CC9B00",
				"@errorColor": "#CC4000",
				"@nullColor": "#dadada",
				"@objectLabelValue": "#fff",
				"@axisLineMajor": "#000000",
				"@axisLineMinor": "#000000",
				"@gridLinehighContrastColor": "#ebf1ed",
				"@gridLinemajorColor": "#eeeeee",
				"@gridLineminorColor": "#eeeeee",
				"@referenceLineoutOfBoundsBG": "#fff",
				"@straightTableHeaderFontSize": "15px",
				"@straightTableHeaderColor": "#000",
				"@lineChartoutOfRangeColor": "@default",
				"@lineChartlabelvaluecolor": "#000",
				"@barChartlabelvaluecolor": "#000",
				"@barChartoutOfRangeColor": "@default"
			},
			customStyles: [{
				cssRef: "theme.css",
				classRef: "sense-theme"
			}],
			color: "@TextColor",
			fontSize: "@TextSize",
			backgroundColor: "@BackgroundColor",
			dataColors: {
				primaryColor: "@primaryColor",
				othersColor: "@othersColor",
				errorColor: "@errorColor",
				nullColor: "@nullColor"
			},
			object: {
				title: {
					main: {
						color: "@TitleColor",
						fontSize: "@TitleSize"
					},
					subTitle: {
						color: "@SubtitleColor",
						fontSize: "@SubtitleSize"
					},
					footer: {
						color: "@FooterColor",
						fontSize: "@FooterSize",
						backgroundColor: "@footerBG"
					}
				},
				label: {
					name: {
						color: "@TextColor",
						fontSize: "@TextSize"
					},
					value: {
						color: "@objectLabelValue",
						fontSize: "@TextSize"
					}
				},
				axis: {
					title: {
						color: "@TextColor",
						fontSize: "@TextSize"
					},
					label: {
						name: {
							color: "@TextColor",
							fontSize: "@TextSize"
						}
					},
					line: {
						major: {
							color: "@axisLineMajor"
						},
						minor: {
							color: "@axisLineMinor"
						}
					}
				},
				grid: {
					line: {
						highContrast: {
							color: "@gridLinehighContrastColor"
						},
						major: {
							color: "@gridLinemajorColor"
						},
						minor: {
							color: "@gridLineminorColor"
						}
					}
				},
				referenceLine: {
					label: {
						name: {
							color: "@TextColor",
							fontSize: "@TextSize"
						}
					},
					outOfBounds: {
						color: "@TextColor",
						backgroundColor: "@referenceLineoutOfBoundsBG",
						fontSize: "@TextSize"
					}
				},
				legend: {
					title: {
						color: "@TextColor",
						fontSize: "@TextSize"
					},
					label: {
						color: "@TextColor",
						fontSize: "@TextSize"
					}
				},
				straightTable: {
					backgroundColor: "@light",
					header: {
						fontSize: "@straightTableHeaderFontSize",
						color: "@straightTableHeaderColor"
					},
					content: {
						fontSize: "@TextSize",
						color: "@default"
					}
				},
				lineChart: {
					outOfRange: {
						color: "@lineChartoutOfRangeColor"
					},
					label: {
						value: {
							color: "@lineChartlabelvaluecolor",
							fontSize: "@font-normal"
						}
					}
				},
				barChart: {
					label: {
						value: {
							color: "@barChartlabelvaluecolor",
							fontSize: "@font-normal"
						}
					},
					outOfRange: {
						color: "@barChartoutOfRangeColor"
					}
				}
			},
			palettes: {
				data: final,
				/* color palets */
				ui: [{
					name: "Color Picker",
					colors: exportPickerColor
				}]
			},
			scales: []
		};
		$("#json_here").empty().append(JSON.stringify(palette));
		setTimeout(function () {
			$("#json-display").show();
			var editor = new JsonEditor('#json-display', getJson());
			console.log(getJson());
			editor.load(getJson());
		}, 1000);
		//console.log(JSON.stringify(palette));
	});

	function getJson(textareaID) {
		try {
			return JSON.parse($('#json_here').val());
		} catch (ex) {
			alert('Wrong JSON Format: ' + ex);
		}
	}
});