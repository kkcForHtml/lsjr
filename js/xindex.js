var eix = {}

$(function() {
	eix.renderExcludes();
});

/**
 * 自动补齐百分号
 * 
 * @param ispt
 *            是否为百分比类型
 */
eix.autoPercent = function(e, isPt) {
	var value = $.trim(e.value);
	if (isPt && value) {
		var fine = "";
		for ( var i = 0, dot = 0; i < value.length; i++) {
			var c = value.charAt(i);
			dot = c == '.' ? dot + 1 : dot;
			if (('0' <= c && c <= '9') || (c == '.' && dot == 1))
				fine += c;
		}

		if (fine) {
			e.value = fine + "%";
		} else {
			e.value = '';
			errorTips($(e));
		}
	}
}
eix.displayNumber = function (e) {
	if (isNaN($(e).val())) {
		$(e).val('');
		errorTips($(e));
	}
}
eix.selectOptions = function(e) {
	var $e = $(e);
	if ($e.attr("type") == "checkbox" && $e.attr("ixtype") == "choice") {
		var indexId = e.name;
		if ($e.attr("oexcluded") == "true") {
			if (e.checked) {
				$("input[name='" + indexId + "'][type='checkbox']").each(
						function(i, checkbox) {
							var $c = $(checkbox);
							if (checkbox != e) {
								$c.removeAttr("checked");
							}
						});
			}
		} else {
			if (e.checked) {
				$("input[name='" + indexId + "'][oexcluded='true']")
						.removeAttr("checked");
			}
		}
	}
	eix.renderExcludes();
	eix.renderExplainAccry(e);
}

/**
 * 多选事件
 * 
 */
eix.renderExplainAccry = function(self) {
	var reqExplains = {};
	var reqAccries = {};
	$("input[ixtype='choice']").each(function(i, e) {
		if (e.checked && $(e).attr("explain") == "true") {
			reqExplains[e.name] = true;
		} else if (!reqExplains[e.name]) {
			reqExplains[e.name] = false;
		}

		if (e.checked && $(e).attr("accry") == "true") {
			reqAccries[e.name] = true;
		} else if (!reqAccries[e.name]) {
			reqAccries[e.name] = false;
		}
	});

	for ( var p in reqExplains) {
		var $explain = $("#explain_" + p);
		var $editor = $explain.find("input[name='" + p + "']");
		if (reqExplains[p]) {
			$explain.show();
			if (self && (self.name == p)) {
				$editor.focus();
			}
		} else {
			$explain.hide();
			$editor.val('');
		}
	}
	for ( var p in reqAccries) {
		if (reqAccries[p]) {
			$("#accry_" + p).show();
		} else {
			$("#accry_" + p).hide();
		}
	}
}

eix.renderExcludes = function() {
	var allExcludeds = {};
	var excludeds = {};
	var indexes = [];
	$("input[excludes]").each(function(i, e) {
		e._$_ = $(e);
		var excludes = e._$_.attr("excludes");
		if (excludes) {
			indexes.push(e);
			var list = excludes.split(",");
			e.exList = list;
			for ( var i = 0; i < list.length; i++) {
				allExcludeds[list[i]] = $("input[name='" + list[i] + "']");
				if (e.checked) {
					allExcludeds[list[i]].removeAttr("checked");
				}
			}
		}
	});

	for ( var i = 0; i < indexes.length; i++) {
		var e = indexes[i];
		var exList = e.exList;
		if (e.checked) {
			for ( var k = 0; k < exList.length; k++) {
				excludeds[exList[k]] = 1;
			}
		}
	}

	for ( var p in allExcludeds) {
		allExcludeds[p].each(function(i, e) {
			var $e = $(e);
			if (excludeds[p]) {
				$e.removeAttr("checked").attr("disabled", "true");
				if ($e.attr("type") == "text") {
					$e.val("").css("background-color", "#eCeCeC");
				}
				$("#lbl_" + e.id).css("color", "#888");
			} else if ($e.attr('x-readonly') == "false") {
				$e.removeAttr("disabled");
				if ($e.attr("type") == "text") {
					$e.css("background-color", "")
				}
				$("#lbl_" + e.id).css("color", "");
			}
		});
	}
}

eix.showHideAppr = function(checked, targetName) {
	if (checked.value == "true") {// 同意不需要审批意见
		$("[name='" + targetName + "']").hide();
	} else {
		$("[name='" + targetName + "']").show();// 驳回要给出审批意见
	}
}
