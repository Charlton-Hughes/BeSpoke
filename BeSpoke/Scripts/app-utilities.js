// Spear custom JS entity methods, not part of spec
var showAlert = function IsBusy(message, type, target, callback) {
	var msgType = { type: BootstrapDialog.TYPE_SUCCESS, title: 'SUCCESS' };
	switch (type) {
		case "warning":
			msgType.type = BootstrapDialog.TYPE_WARNING;
			msgType.title = type.toUpperCase();
			break;
		case "danger":
			msgType.type = BootstrapDialog.TYPE_DANGER;
			msgType.title = "ATTENTION";
			break;
	}
	BootstrapDialog.alert({
		title: msgType.title,
		message: message,
		type: msgType.type, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
		closable: true, // <-- Default value is false
		draggable: true, // <-- Default value is false
		buttonLabel: 'OK', // <-- Default value is 'OK',
		callback: callback
	});
};

function moneyFormat(unformatted) {
	if (unformatted) {
		return '$' + Number.parseFloat(unformatted).toFixed(2);
	} else {
		return '';
	}
}

(function () {

	// Thanks again, IE 11!
	if (!Array.prototype.insert) {
		Array.prototype.insert = function (index, item) {
			this.splice(index, 0, item);
		};
	}

	// Thanks yet again, IE 11!
	if (!Array.prototype.clear) {
		Array.prototype.clear = function () {
			while (this.length > 0) {
				this.pop();
			}
		}
	}


	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function (search, this_len) {
			if (this_len === undefined || this_len > this.length) {
				this_len = this.length;
			}
			return this.substring(this_len - search.length, this_len) === search;
		};
	}

	// Thanks yet again, yet again, IE 11!
	if (!String.prototype.splice) {
		/**
		 * {JSDoc}
		 *
		 * The splice() method changes the content of a string by removing a range of
		 * characters and/or adding new characters.
		 *
		 * @this {String}
		 * @param {number} start Index at which to start changing the string.
		 * @param {number} delCount An integer indicating the number of old chars to remove.
		 * @param {string} newSubStr The String that is spliced in.
		 * @return {string} A new string with the spliced substring.
		 */
		String.prototype.splice = function (start, delCount, newSubStr) {
			return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
		};
	}


	// remove one object from array based on a unique id
	if (!Array.prototype.removeObj) {
		Array.prototype.removeObj = function (id, value) {
			for (var i = 0; i < this.length; i++) {
				if (this[i][id] == value) {
					return this.splice(i, 1);
				}
			}
		}
	}

	if (!Array.prototype.findObjById) {
		Array.prototype.findObjById = function (property, value) {
			var found = null;
			for (var i = 0; i < this.length; i++) {
				if (this[i][property] == value) {
					found = this[i];
				}
			}
			return found;
		}
	}

	// From StackOverflow's site...
	String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
		function () {
			"use strict";
			var str = this.toString();
			if (arguments.length) {
				var t = typeof arguments[0];
				var key;
				var args = ("string" === t || "number" === t) ?
					Array.prototype.slice.call(arguments)
					: arguments[0];

				for (key in args) {
					str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
				}
			}

			return str;
		};

	// JavaScript represents decimals with high scales as exponents, which is sometimes a problem...
	Number.prototype.noExponents = function () {
		var data = String(this).split(/[eE]/);
		if (data.length === 1) return data[0];

		var z = '', sign = this < 0 ? '-' : '',
			str = data[0].replace('.', ''),
			mag = Number(data[1]) + 1;

		if (mag < 0) {
			z = sign + '0.';
			while (mag++) z += '0';
			return z + str.replace(/^\-/, '');
		}
		mag -= str.length;
		while (mag--) z += '0';
		return str + z;
	};

	if (!String.isNullOrEmpty) {
		Object.defineProperty(String, 'isNullOrEmpty', {
			value: function (str) {
				return !(str != null && (typeof (str) == 'number' || str.length > 0));
			},
			configurable: true,
			enumerable: false,
			writable: true
		});
	}
})();

window.Utilities = {
	MessageComposerCallback: null,
	UnsavedChangesMessages: 'You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?',
	NotSubmittedChangesMessages: 'You have attempted to leave this page.  If you have made any changes to the fields without clicking the Submit button, your changes will be lost.  Are you sure you want to exit this page?',
	DefaultProcessingHTML: '<i class="far fa-spinner fa-spin"></i> &nbsp; <span>Loading...</span>',
	SaveData: (function () {
		var a = document.createElement("a");
		return function (data, fileName, mimeType) {
			var blob = new Blob([data]);
			if (window.navigator.msSaveOrOpenBlob)
				window.navigator.msSaveOrOpenBlob(blob, fileName);
			else {
				var url = null;
				if (mimeType)
					url = window.URL.createObjectURL(blob, { type: mimeType });
				else url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = fileName;
				a.click();
				window.URL.revokeObjectURL(url);
			}
		};
	}()),
	DaysBetween: function (date1, date2) {
		// The number of milliseconds in one day
		var ONE_DAY = 1000 * 60 * 60 * 24
		// Convert both dates to milliseconds
		var date1_ms = date1.getTime()
		var date2_ms = date2.getTime()
		// Calculate the difference in milliseconds
		var difference_ms = Math.abs(date1_ms - date2_ms)
		// Convert back to days and return
		return Math.round(difference_ms / ONE_DAY)
	},

	// Validates that the input string is a valid date formatted as "m/d/yyyy"
	IsValidDate: function (dateString) {
		if (dateString instanceof Date) {
			dateString = (dateString.getMonth() + 1) + "/" + dateString.getDate() + "/" + dateString.getFullYear();
		}
		// First check for the pattern
		if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
			return false;

		// Parse the date parts to integers
		var parts = dateString.split("/");
		var day = parseInt(parts[1], 10);
		var month = parseInt(parts[0], 10);
		var year = parseInt(parts[2], 10);

		// Check the ranges of month and year
		if (year < 1000 || year > 3000 || month == 0 || month > 12)
			return false;

		var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// Adjust for leap years
		if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	},

	VersionCompare: function (v1, v2, options) {
		var lexicographical = options && options.lexicographical,
			zeroExtend = options && options.zeroExtend,
			v1parts = (v1 || "").split('.'),
			v2parts = (v2 || "").split('.');

		function isValidPart(x) {
			return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
		}

		if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
			return NaN;
		}

		if (zeroExtend) {
			while (v1parts.length < v2parts.length) v1parts.push("0");
			while (v2parts.length < v1parts.length) v2parts.push("0");
		}

		if (!lexicographical) {
			v1parts = v1parts.map(Number);
			v2parts = v2parts.map(Number);
		}

		for (var i = 0; i < v1parts.length; ++i) {
			if (v2parts.length == i) {
				return 1;
			}

			if (v1parts[i] == v2parts[i]) {
				continue;
			}
			else if (v1parts[i] > v2parts[i]) {
				return 1;
			}
			else {
				return -1;
			}
		}

		if (v1parts.length != v2parts.length) {
			return -1;
		}

		return 0;
	},
	/* TODO: add support for error handler */
	ArrayBufferRequest: function (url, data, verificationToken, success, err) {
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		xhr.open('POST', url);
		xhr.onreadystatechange = function () {
			if (xhr.readyState > 3 && xhr.status === 200) {
				success(xhr);
			} else if (xhr.readyState > 3 && err) {
				err(xhr.statusText);
			}

		};
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		if (verificationToken)
			xhr.setRequestHeader('__RequestVerificationToken', verificationToken);

		if (data && typeof data !== "string") {
			data = $.param(data);
		}
		xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
		xhr.responseType = 'arraybuffer';

		xhr.send(data || null);
	},

	IsBusy: function (b, options) {
		var settings = $.extend({
			container: 'body',
			message: 'Working... please wait.',
			messageCss: null,
			delay: 0,
			timeout: null
		}, options);
		var lContainer = $(settings.container);
		//rs to do: need to update this to track body busy so we don't have to remove it each time
		if (lContainer.find('.popBusy').length > 0) {
			lContainer.find('.popBusy').remove();
		}
		if (lContainer.find('.popBusy').length === 0) {
			var popBusy = '<div class="popBusy"></div>';
			lContainer.append(popBusy);
		}
		var popBusyContent = '<div class="popBusy-blocker"></div>';
		popBusyContent += '<div class="' + (settings.messageCss || 'popBusy-text') + '"><i class="far fa-spinner fa-spin"></i> &nbsp; <span>' + settings.message + '</span></div>';
		popBusyContent += '</div>';
		lContainer.find('.popBusy').html(popBusyContent);
		if (b) {
			if (settings.delay > 0)
				window.setTimeout(function (e) {
					lContainer.find('.popBusy').show();
				}, settings.delay);
			else lContainer.find('.popBusy').show();
			if (settings.timeout !== null)
				window.setTimeout(function (e) {
					lContainer.find('.popBusy').hide();
				}, settings.timeout);
		}
		else {
			if (settings.delay > 0)
				window.setTimeout(function (e) {
					lContainer.find('.popBusy').hide();
				}, settings.delay);
			else lContainer.find('.popBusy').hide();
		}

		lContainer.find(".popBusy-text").on("dblclick", function () {
			lContainer.find('.popBusy').hide();
		});
	},
	Debounce: function (func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	},
	MessageComposer: function (show, options) {
		var frame = $("#composerFrame");

		if (show) {

			var url = "/Home/Notifications/Compose",
				args = $.param(options || {});

			if (args) url += "?" + args;
			if (!frame.length) {
				frame = $('<iframe id="composerFrame" src="about:blank" style="display:none;position:absolute;width:100%;height:100%;left:0;top:0;border:none;background:rgba(128,128,125,0.5);" allowtransparency="true"></iframe>')
					.appendTo(document.body);
			}
			frame[0].src = url;
			frame.show();
		} else {
			frame[0].src = "about:blank";
			frame.hide();
			if (Utilities.MessageComposerCallback) {
				Utilities.MessageComposerCallback();
				Utilities.MessageComposerCallback = null;
			}
		}
	},

	// assessment date is expected to be UTC for all assessment entry functions
	/*
	 * 
	 * show: can be set to false to preload frame (recommended)
	 * definition: arguments to load table
	 *		Title: displayed title in editor
	 *		AssessmentDate: date for assessment
	 *		PersonSK: array of integers
	 *		Item: array of item definitions
	 *			PerformanceItemSK
	 *			Children: array of integers for child PI SKs
	 *	onclose: callback when user has requested to close the editor
	 *	onsave: callback when a save has successfully completed
	 * 
	 */
	AssessmentEntry: function (options) {
		options = options || {};

		var frame = $('#assessmentEntryFrame'),
			wnd = frame.length ? frame[0].contentWindow : null,
			api = wnd ? wnd.AssessmentEditor : null,
			savefn = options.onsave,
			closefn = options.onclose;

		var settings = {
			show: !!options.show,
			definition: options.definition || null,
			onsave: function () {
				if (savefn)
					savefn();
			},
			onclose: function () {
				frame.hide();
				if (closefn)
					closefn();
			}
		};


		var fnApplySettings = function () {
			if (settings.definition) {
				//console.log("loading defs");
				api.Load(settings.definition, settings.onsave, settings.onclose);
			}
			if (settings.show) {
				//console.log('showing frame');
				frame.show();
			} else {
				//console.log('hiding frame');
				frame.hide();
			}
		};

		if (!frame.length) {
			//console.log('creating frame');
			// immediately load the frame for use
			if (!frame.length) {
				if (settings.show)
					Utilities.IsBusy(true, { message: "Loading editor..." });
				frame = $('<iframe id="assessmentEntryFrame" src="/Assessment" style="display:none;position:absolute;width:100%;height:100%;left:0;top:0;border:none;background:rgba(128,128,125,0.5);" allowtransparency="true"></iframe>')
					.appendTo(document.body)
					.on('load', function () {
						frame = $(this);
						wnd = frame[0].contentWindow;
						api = wnd.AssessmentEditor;
						fnApplySettings();
						Utilities.IsBusy(false);
					});
			}
		}

		if (api)
			fnApplySettings();


	},
	/*
 * 
 * show: can be set to false to preload frame (recommended)
 * definition: arguments to load table
 *		Title: displayed title in editor
 *		AssessmentDate: date for assessment
 *		AssessmentTime: time for assessment
 *		PersonSK: array of integers
 *		Item: array of item definitions
 *			PerformanceItemSK
 *			Children: array of integers for child PI SKs
 *	onclose: callback when user has requested to close the editor
 *	onsave: callback when a save has successfully completed
 * 
 */
	QuickAssessmentEntry: function (options) {
		options = options || {};

		if (options.show) {
			var container = $('.dataTables_scrollBody').length ? '.dataTables_scrollBody'
				: $('.app-panel-content').length ? '.app-panel-content' : 'body';

			$(options.anchor).popover({
				container: container,
				content: '<iframe src="/Assessment/QuickEntry" style="width:300px;height:300px;border:none;"></iframe>',
				html: true,
				placement: 'auto',
				trigger: 'manual',
				viewport: container
			})
				.on('shown.bs.popover', function () {
					var anchor = $(this);
					var frame = $('#' + $(this).attr('aria-describedby')).find('iframe'),
						wnd = frame.length ? frame[0].contentWindow : null,
						savefn = options.onsave,
						closefn = options.onclose;

					var settings = {
						definition: options.definition || null,
						onsave: function () {
							if (savefn)
								savefn();
						},
						onclose: function () {
							if (closefn)
								closefn();
							anchor.popover('destroy');
						}
					};

					var fnLoad = $.proxy(function () {
						var api = this.wnd.QuickAssessmentEditor;
						if (!api) {
							//console.log('QAE not ready yet, trying again in 100ms');
							setTimeout(fnLoad, 100);
						} else {
							api.Load(this.settings.definition, this.settings.onsave, this.settings.onclose);
						}
					},
						{
							wnd: wnd,
							settings: settings
						});

					// would do a frame ready/load event, but IE doesn't fire it correctly
					fnLoad();
				})
				.popover('show');
		} else {
			$('.dataTables_scrollBody [aria-describedby]').each(function () {
				var frame = $('#' + $(this).attr('aria-describedby')).find('iframe'),
					wnd = frame.length ? frame[0].contentWindow : null;

				if (wnd && wnd.QuickAssessmentEditor) {
					wnd.QuickAssessmentEditor.Close();
				}
			});
		}
		return;
	},
	/*
	Used for Basic Entry as well as Assessment Entry from Nutrition and Injuryies
	* definition:
	* newTab : true/false
	* personSKs: array of People values
	* items: collection of PIs and their children
	* date: date for assessments, if empty it will just select today's date.
	* module: Nutrion or Injury Enum
	* sourceSK: GoalSK or InjurySK, null when coming from Basic Entry
	*/
	BasicEntry: function (options) {
		options = options;

		var target = (options.newTab) ? "_blank" : "_self";

		var tmpl = '<form id="basic-entry-generated" method="POST" action="/Dashboard/AssessmentEntry" :target="target">\
		<input type="hidden" name="__RequestVerificationToken" :value="token" />\
<template v-for="(p, idx) in personSKs">\
		<input type="hidden" :name="\'PersonSKs[\'+idx+\']\'" :value="p" />\
</template>\
<template v-for="(g, idx) in items">\
		<input type="hidden" :name="\'ItemGroups[\'+idx+\'].PerformanceItemSK\'" :value="g.PerformanceItemSK" />\
		<input type="hidden" :name="\'ItemGroups[\'+idx+\'].AssessmentMethodSK\'" :value="g.AssessmentMethodSK" />\
		<template v-for="(c, cidx) in g.Children">\
			<input type="hidden" :name="\'ItemGroups[\'+idx+\'].Children[\'+cidx+\']\'" :value="c"/>\
		</template>\
</template>\
		<input type="hidden" name="newTab" :value="newTab" />\
		<input type="hidden" name="assessmentDate" :value="date" />\
		<input type="hidden" name="rootMenuCategory" :value="module" />\
		<input type="hidden" name="sourceSK" :value="sourceSK" />\
</form>';

		/*Data sent to the EvolutionManageAssessment*/
		//Put this in app Utilities
		var model = $.extend({
			target: target,
			token: $('input[name="__RequestVerificationToken"]').val()
		}, options);

		if (!isNaN(model.personSKs))
			model.personSKs = [model.personSKs];

		var formHTML = this.ParseTemplate(
			tmpl,
			model
		);

		var form = $(formHTML);
		$("body").append(form);
		form.submit();
		if (options.newTab) {
			$("#performance-item-selector").modal('hide');
		}
	},

	FormPost: function (url, data) {
		var fields = [];

		$.each(data, function (key) {
			fields.push('<input type="hidden" name="{name}" value="{value}" />'.formatUnicorn({
				name: key, value: data[key]
			}));
		});

		var formHTML = '<form method="POST" action="{url}">\
		<input type="hidden" name="__RequestVerificationToken" value="{token}" />\
		{fields}</form>'.formatUnicorn(
			{
				url: url,
				token: $('input[name="__RequestVerificationToken"]').val(),
				fields: fields.join('')
			}
		);

		var form = $(formHTML);
		$("body").append(form);
		form.submit();
	},

	/*
	easy show bootstrap type error messages
	BootstrapDialog.TYPE_DEFAULT
	BootstrapDialog.TYPE_INFO
	BootstrapDialog.TYPE_PRIMARY
	BootstrapDialog.TYPE_SUCCESS
	BootstrapDialog.TYPE_WARNING
	BootstrapDialog.TYPE_DANGER
	*/
	ShowInfoDialog: function (title, message, type, action) {
		if (type === null)
			type = BootstrapDialog.TYPE_DEFAULT;
		BootstrapDialog.show({
			type: type,
			title: title,
			message: message,
			buttons: [{
				label: 'OK',
				action: function (dialog) {
					if (action) {
						action();
					}
					dialog.close();
				}
			}]
		});
	},
	ValidateInputs: function (inputArray) {
		/*
		 * on multiple inputs you can add a min property on the control to set the min selections required
		 * on text and textarea you can set a regexPattern property and it will vaildate based on that regex, can also set a minLength and maxLength to validte on that too
		 * any input you want to validate just add the class requiredField
		 * input-validation-error and error (for the date object) css classes required
		 * calendar objects can have a maxDate and minDate attribute
		 * validate a group of radio buttons by wrapping them in a div and then add the class radioGroup to the div at least one of the rdo buttons have to be selected to validate true
		 * linked inputs - a linked input will be validated if its linked parent has a value
		 * validateMethod = can call a complex validation 
		 * two ways to call
		 * 1. call it with NO param passed and it will look for any input that has the requiredField class and validate it
		 * 2. pass it a array of jquery objects and it will validate them
		 * 
		 * method returns true if all controlls passed validation or false if any one fails
		 */
		var inputs = null;
		if (inputArray)
			inputs = inputArray
		else inputs = $('.requiredField');
		var isValid = true;

		$.each(inputs, function (index, item) {
			var i = (item instanceof $) ? item : $(item);
			if (i.is('div') && i.hasClass('radioGroup')) {
				var rdos = i.find('input:checked');
				if (rdos.length > 0) {
					i.removeClass('validation-error');
				}
				else {
					i.addClass('validation-error');
					isValid = false;
					i.off('click.spearValidation').on("click.spearValidation", function () {
						var rdos = i.find('input:checked');
						if (rdos.length > 0) {
							i.removeClass('validation-error');
						}
					});
				}
			} else if (i.hasClass('calendar') || i.hasClass('datepicker')) {
				var date = Date.parse(i.val());
				var p = GetValidateOptions(i);
				if ((p.validateoptional || !isNaN(date)) && (!p.validateMethod || window[p.validateMethod](i.val()))) {
					i.removeClass('error');
				} else {
					i.addClass('error');
					isValid = false;
					i.off('change.spearValidation').on("change.spearValidation", function () {
						if ((p.validateoptional || !isNaN(date)) && (!p.validateMethod || window[p.validateMethod](i.val())))
							i.removeClass('error');
						else i.addClass('error');
					});
				}
			}
			else if (!i.prop('multiple') && i.prev() && i.prev().hasClass('combobox-container')) {
				if (i.prev().hasClass('combobox-selected'))
					i.prev().find('input:text').removeClass('input-validation-error');
				else {
					var txtBox = i.prev().find('input:text');
					txtBox.addClass('input-validation-error');
					txtBox.off('change.spearValidation').on('change.spearValidation', function () {
						if (txtBox.val() && txtBox.val().length > 0)
							txtBox.removeClass('input-validation-error');
						else txtBox.addClass('input-validation-error');
					});
					isValid = false;
				}
			} else if (i.prop('multiple') && i.hasClass('selectpicker')) {
				if (i.val() == null || (i.val().length == 0 || i.val().length < parseInt(i.attr('min')))) {
					i.parent().find('button:first').attr('style', 'color:black;background:#f3d7d7;border: 1px solid #b94a48;');
					i.parent().off('change.spearValidation').on('change.spearValidation', function () {
						if (i.val().length > 0)
							i.parent().find('button:first').attr('style', '');
						else i.parent().find('button:first').attr('style', 'color:black;background:#f3d7d7;border: 1px solid #b94a48;');
					});
					isValid = false;
				} else i.parent().find('button:first').attr('style', '');
			} else if (i.hasClass('selectpicker')) {
				var p = GetValidateOptions(i);
				if (i.val() && i.val().length > 0 && (p.skipNoSelection == false || i.prop('selectedIndex') > 0)) {
					i.parent().find('button').attr('style', '');
				} else {
					i.parent().find('button').attr('style', 'color:black;background:#f3d7d7;border: 1px solid #b94a48;');
					i.parent().off('change.spearValidation').on('change.spearValidation', function () {
						if (i.val().length > 0)
							i.parent().find('button').attr('style', '');
						else i.parent().find('button').attr('style', 'color:black;background:#f3d7d7;border: 1px solid #b94a48;');
					});
					isValid = false;
				}
			} else if (i.prop('multiple')) {
				if (i.val() == null || (i.val().length == 0 || i.val().length < parseInt(i.attr('min')))) {
					i.next().find('button').addClass("input-validation-error");
					i.next().find('.multiselect-container input[type=checkbox]').off('click.spearValidation').on('click.spearValidation', function () {
						if (i.val().length + 1 > 0)
							i.next().find('button').removeClass("input-validation-error");
					});
					isValid = false;
				} else {
					if (i.prop('multiple')) {
						i.next().find('button').removeClass("input-validation-error");
					}
					else i.removeClass("input-validation-error");
				}
			} else if (i.is('select')) {
				var p = GetValidateOptions(i);
				if (i.find('option').length > 0) {
					if (i.val() && i.val().length > 0 && (p.skipNoSelection == false || i.prop('selectedIndex') > 0))
						i.removeClass('input-validation-error');
					else {
						i.addClass('input-validation-error');
						isValid = false;
						i.off('change.spearValidation').on("change.spearValidation", function () {
							if (i.val() != null && i.val().length > 0)
								i.removeClass('input-validation-error');
							else i.addClass('input-validation-error');
						});
					}
				} else i.removeClass('input-validation-error');
			}
			else if (i.is('input:text') || i.is('textarea')) {
				var p = GetValidateOptions(i);
				if (p.validateoptional && (i.val() == null || i.val().length == 0))
					i.removeClass('validation-error').removeClass('input-validation-error');
				else {
					if (i.val() != null && i.val().length >= p.minLength && i.val().length <= p.maxLength && (!p.validateMethod || window[p.validateMethod](i.val())) && (p.rx == null || p.rx.test(i.val())))
						i.removeClass('validation-error');
					else {
						i.addClass('validation-error');
						isValid = false;
						i.off('keyup.spearValidation').on("keyup.spearValidation", function () {
							if (p.validateoptional && (i.val() == null || i.val().length == 0))
								i.removeClass('validation-error');
							else {
								if (i.val() != null && i.val().length >= p.minLength && i.val().length <= p.maxLength && (!p.validateMethod || window[p.validateMethod](i.val())) && (p.rx == null || p.rx.test(i.val())))
									i.removeClass('validation-error');
								else i.addClass('validation-error');
							}
						});
					}
				}
			}
		});
		return isValid;
	},
	ShowConfirmDialog: function (title, message, type, action, yesLabel, noLabel) {
		if (type === null)
			type = BootstrapDialog.TYPE_DEFAULT;
		BootstrapDialog.show({
			type: type,
			title: title,
			message: message,
			buttons: [{
				label: (!yesLabel ? 'Yes' : yesLabel),
				action: function (dialog) {
					if (action)
						action();
					dialog.close();
				}
			}, {
				label: (!noLabel ? 'No' : noLabel),
				action: function (dialog) {
					dialog.close();
				}
			}]
		});
	},

	ConfirmDialogAlwaysAction: function (title, message, type, action, noaction) {
		if (type === null)
			type = BootstrapDialog.TYPE_DEFAULT;
		BootstrapDialog.show({
			type: type,
			title: title,
			message: message,
			buttons: [{
				label: 'Yes',
				action: function (dialog) {
					if (action)
						action();
					dialog.close();
				}
			}, {
				label: 'No',
				action: function (dialog) {
					if (noaction)
						noaction();
					dialog.close();
				}
			}]
		});
	},
	RegexProcessor: function (inp, e) {
		var jel = $(inp),
			pattern = jel.data('pattern') || jel.attr('pattern'),
			separator = jel.data('separator') || jel.attr('separator'),
			regex = jel.data('compiled-pattern'),
			lastGoodValue = jel.data('last-good-value') || null;

		if (inp.value === lastGoodValue) return lastGoodValue;
		if (!regex) {
			if (!pattern) {
				switch (jel.attr('type')) {
					case 'number':
						pattern = '^-?[0-9]*\.?[0-9]*$'; break;
				}
			}

			if (!pattern) return lastGoodValue;

			regex = new RegExp(pattern);
			jel.data('compiled-pattern', regex);
		}

		if (!inp.value) return lastGoodValue;

		if (!regex.test(inp.value)) {
			var withsep = inp.value.splice(-1, 0, separator);
			if (regex.test(withsep))
				inp.value = withsep;
		}

		if (!regex.test(inp.value)) {
			e.stopPropagation();
			inp.value = lastGoodValue;
			return inp.value;

			/* IE 11 + VueJS with placeholders
			 * don't detect "fake" events like we'd
			 * like. This is generating an actual
			 * native event to make everything happy.
			 */

			//CH 1-20-2020, I could not get Utilities.RegexProcessor to work with updating the Vue model property.
			//It would correctly update the value using jquery, and then the vue binding would change it back.
			//I updated the RegexProcess method to send back the updated value so you can manually push it into the Vue model.
			var newEvt = document.createEvent("HTMLEvents");
			newEvt.initEvent("change", false, true);
			inp.dispatchEvent(newEvt);

			//console.log(regex, "bad value", inp.value, "restoring", lastGoodValue);
			return false;
		} else {
			jel.data('last-good-value', inp.value);
			//console.log("good value", inp.value);
			return inp.value;
		}

	},

	GetParameter: function (name) {
		url = window.location.href;
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
		if (!results) {
			return undefined;
		}
		return results[1] || undefined;
	},
	TextCounter: function (options) {
		if (!options.InputElement) throw "No input element specified for TextCounter";
		//if (!options.FeedbackElement) throw "No feedback element specified for TextCounter";

		var inputElement = options.InputElement,
			feedbackElement = options.FeedbackElement,
			maximumCharacters = options.Max || 255;

		$(inputElement).on('change input propertychange', function () {
			var currentLength = $(inputElement).val().length;
			var textRemaining = maximumCharacters - currentLength;

			if (feedbackElement) {
				$(feedbackElement).html(textRemaining);
			}
		}).trigger('change');
	},
	AsShortDateString: function (dtSource) {
		if (dtSource) {
			//rs even though every other browser out there can take a space sep for date time IE 11 cannot :(
			var dt = typeof dtSource.getMonth === "function"
				? dtSource : new Date(dtSource.replace(" ", "T"));
			if (isNaN(dt)) {
				return "";
			}
			else {
				return (dt.getMonth() + 1) +
					"/" + dt.getDate() +
					"/" + dt.getFullYear();
			}
		} else return "";
	},

	UTCISOFromISOZoned: function (iso) {
		var dt = DateTime
			.fromISO(iso, { zone: Spear.CurrentIANA })
			.setZone("UTC");

		return dt.toString(); // dt.toFormat("yyyy-LL-dd'T'HH:mmZ")
	},

	PadNumber: function (num, size) {
		var s = "00000000" + num;
		return s.substr(s.length - size);
	},

	/* Generates short ISO format date/time string, ignoring time zone
	 * timeOptions argument structure:
	 *   text = text format, IE hh:mm
	 *   hour = numeric hour
	 *   minute = numeric minute
	 */
	ISOFromParts: function (dt, timeOptions) {
		if (!(dt instanceof Date)) {
			if (isNaN(dt))
				dt = Date.parse(dt);
			else
				dt = new Date(dt);
		}

		var t = timeOptions.time;
		if (!t) {
			t = Utilities.PadNumber(((timeOptions.hour || 0) * 1), 2) +
				":" +
				Utilities.PadNumber(((timeOptions.minute || 0) * 1), 2);
		}

		var iso = "{y}-{m}-{d}T{t}".formatUnicorn(
			{
				y: dt.getFullYear(),
				m: Utilities.PadNumber(dt.getMonth() + 1, 2),
				d: Utilities.PadNumber(dt.getDate(), 2),
				t: t
			});

		return iso;
	},

	/* expects a ISO UTC string
	 * formatting options at
	 * https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html
	 * default format ex:
	 * March 4, 2012 8:52PM CDT => "3/4/2012 8:52 PM CDT"
	 * toUTC
	 *     true = from selected zone to UTC
	 *     false = from UTC to selected zone
	 * format = format string (default "L/d/yyyy h:mm a ZZZZ")
	 */
	FormatZonedDate: function (iso, toUTC, format) {
		var dt = DateTime
			.fromISO(iso, { zone: toUTC ? Spear.CurrentIANA : "UTC" })
			.setZone(toUTC ? "UTC" : Spear.CurrentIANA);

		return dt.toFormat(format || "L/d/yyyy h:mm a ZZZZ");
	},

	/*
		Options:
			Value = raw decimal value
			Increment = indicator of decimal scale
			UoM = unit of measure to display
			Format = special format string, important for index values
			ShowUoM = True to include UoM in result
			IsAggregate = Some values are formatted differently based on this
	   */
	FormatAssessmentValue: function (options) {
		var opts = $.extend({}, {
			Value: null,
			UoM: null,
			Format: null,
			ShowUoM: false,
			Increment: null,
			IsAggregate: false,
			ValidateIndex: true
		}, options, true);

		try {
			if (opts.Value === null || opts.Value === undefined || opts.Value === "") return null;

			var val = opts.Value;

			if (opts.Increment) {
				var ct = Math.round(val / opts.Increment);
				val = opts.Increment * ct;
			}

			var caseFormat = (opts.UoM || "").replace(/ /g, "").toLowerCase().trim(),
				formattedValue = "",
				uomString = " " + opts.UoM,
				includeUoM = opts.ShowUoM,
				incrementScale = opts.Increment && opts.Increment.noExponents().indexOf(".") !== -1 ?
					opts.Increment.noExponents().split('.')[1].length : 0,
				feet = Math.floor(val / 12),
				inches = (val % 12).toFixed(incrementScale),
				leadZeros = function (value, targetLength) {
					var bits = value.split('.');

					/* not string.repeat because old Webkit for report engine doesn't support that */
					var padd = Array((parseInt(targetLength, 10) || 0) + 1).join("0");
					return (padd + bits[0]).slice(-2)
						+ (bits.length > 1 ? "." + bits[1] : "");
				},
				hours = Math.floor(val / 3600),
				minutes = Math.floor((val % 3600) / 60),
				seconds = val % 60;

			if (options.Format
				&& options.Format.indexOf("|") !== -1
				&& !options.IsAggregate) {
				// Index format can only be applied to a single assessment,
				// not an aggregate
				caseFormat = "index";
			}

			// Keep this switch statement in sync with Titus.Infrastructure.Formatter.
			switch (caseFormat) {
				case "hr:min:sec":
					formattedValue =
						hours.toString() +
						":" +
						leadZeros(minutes.toString(), 2) +
						":" +
						leadZeros(seconds.toFixed(incrementScale), 2);
					break;
				case "min":
				case "min/sec":
				case "min:sec":
					var sep = ":";
					if (caseFormat.indexOf("/") > -1) sep = "/";
					formattedValue =
						minutes.toString() +
						sep +
						leadZeros(seconds.toFixed(incrementScale), 2);
					break;
				case "hr:min":
					formattedValue =
						hours.toString() +
						":" +
						leadZeros(minutes.toFixed(incrementScale), 2);
					break;
				case "ft/in":
					formattedValue =
						feet.toString() +
						"' " +
						inches +
						"\"";
					uomString = "";
					break;
				case "%":
					formattedValue = (val * 100).toFixed(incrementScale > 1 ? incrementScale - 2 : incrementScale);
					uomString = "%";
					break;
				case "index":
					var sections = options.Format.split(/\|/g);

					var index = Math.round(val);

					if (index > (sections.length - 1)) {
						// throw exception?
						if (options.ValidateIndex)
							formattedValue = "UndefinedIndex(" + index + ")";
						else
							formattedValue = "";
					}
					else {
						formattedValue = sections[index];
					}
					uomString = "";
					break;
				default:
					// includes no uom at all
					formattedValue = val.toFixed(incrementScale);
					break;
			}

			return formattedValue + (includeUoM ? uomString : "");
		} catch (ex) {
			log("Format error: " + JSON.stringify(ex));
		}
	},
	ParseAssessmentValue: function (options) {
		var opts = $.extend({}, {
			Value: "",
			UoM: null,
			Increment: null
		}, options, true);

		if (!opts.Value) return null;

		var parts = options.Value.replace(/"/, "").split(/[/:']/g)
			.map(function (p) { return p * 1.0; }),
			value = 0.0,
			depth = 0,
			uom = opts.UoM.toLowerCase();

		if (['hrs:min', 'hr/min', 'hr:min'].indexOf(uom) > -1)
			depth++;

		switch (opts.UoM.toLowerCase()) {
			case 'hrs:min':
			case 'hrs:min:sec':
			case 'hr/min':
			case 'hr:min':
			case 'hr:min:sec':
			case 'min:sec':
			case 'min/sec':
			case 'min / sec(2 boxes)':
				while (parts.length) {
					value += parts.pop() * Math.pow(60.0, depth++);
				}
				return value;
			case 'ft/in':
				value += parts.pop() * 1.0;
				if (parts.length)
					value += parts.pop() * 12.0;
				return value;
			case '%':
				return parts[0] * 0.01;
			default:
				return parts[0] * 1;
		}
	},

	StatusColorAsBattery: function (status) {
		var color = (status || "").toString().toLowerCase(),
			template = '<i class="far fa-{btty} status-{color}-color"></i>',
			fobj = { btty: "battery-full", color: "green" };

		switch (color) {
			case "294":
			case "red":
				fobj = { btty: "battery-quarter", color: "red" };
				break;
			case "295":
			case "yellow":
				fobj = { btty: "battery-half", color: "yellow" };
				break;
			case "438":
			case "undetermined":
				fobj = { btty: "battery-empty", color: "undetermined" };
				break;
			case "296":
			case "green":
			default:
				fobj = { btty: "battery-full", color: "green" };
				break;
		}
		return template.formatUnicorn(fobj);
	},
	MissionStatusAsBattery: function (status) {
		var color = (status || "").toString().toLowerCase(),
			template = '<i class="far fa-{btty} status-{color}-color"></i>',
			fobj = { btty: "full", color: "green" };

		switch (color) {
			case "1347":
			case "not recommended":
				fobj = { btty: "battery-quarter", color: "red" };
				break;
			case "1348":
			case "recommended":
			default:
				fobj = { btty: "battery-full", color: "green" };
				break;

		}

		return template.formatUnicorn(fobj);
	},
	HideToolTip: function () {
		$('[data-toggle="tooltip"]').tooltip('hide');
	},
	DoFilterChangeNotification: function (dialogMessage, busyMessage, url) {
		Utilities.ShowConfirmDialog('Group filter change',
			"You have changed the group filter.<br />" + dialogMessage,
			BootstrapDialog.TYPE_INFO,
			function () {
				Utilities.IsBusy(true, { delay: null, message: busyMessage });
				window.location.href = url;
			});
	},
	AddMonths: function (date, value) {
		var d = new Date(date),
			n = date.getDate();
		d.setDate(1);
		d.setMonth(d.getMonth() + value);
		d.setDate(Math.min(n, getDaysInMonth(d.getFullYear(), d.getMonth())));
		return d;
	},
	DateCompare: function (a, b) {
		//var a = new Date(DateA);
		//var b = new Date(DateB);

		var msDateA = Date.UTC(a.getFullYear(), a.getMonth() + 1, a.getDate());
		var msDateB = Date.UTC(b.getFullYear(), b.getMonth() + 1, b.getDate());

		if (parseFloat(msDateA) < parseFloat(msDateB))
			return -1;  // less than
		else if (parseFloat(msDateA) == parseFloat(msDateB))
			return 0;  // equal
		else if (parseFloat(msDateA) > parseFloat(msDateB))
			return 1;  // greater than
		else
			return null;  // error
	},
	BindLockedHeaders: function (item) {
		return $(item.table).floatThead({
			top: $(item.scrollContainer).position().top,
			position: item.position,
			zIndex: 100,
			scrollContainer: function ($table) {
				return $table.closest(item.scrollContainer);
			}
		});
	},
	LockHeader: function (lockedHeaderList, headerIndex) {
		$.each(lockedHeaderList, function (index, item) {
			if (!headerIndex || headerIndex == index) {
				if (item.tblToLockHeader == null) {
					item.tblToLockHeader = Utilities.BindLockedHeaders(item);
					if (item.linkTable == null)
						$(item.table).height($(item.table).height());
					else $(item.table).height($(item.linkTable).height());
					$(window).resize(function () {
						if (item.reflowEvent != null) window.clearTimeout(item.reflowEvent);
						item.reflowEvent = window.setTimeout(function () {
							item.tblToLockHeader.floatThead('destroy');
							item.tblToLockHeader = Utilities.BindLockedHeaders(item);
						}, 200);
					});
				}
				else {
					item.tblToLockHeader.floatThead('reflow');
				}
			}
		});
	},
	/*
	 * Renders HTML using a temporary VueJS binding model.
	 * template: HTML element that is the template, or a HTML string.
	 * model: JSON containing your data model.
	 * 
	 * WARNING: The performance of this has not been thoroughly tested.
	 * Please evaluate cautiously if using, especially in IE 11.
	 */
	ParseTemplate: function (template, model, methods) {
		if (!window.Vue)
			throw "VueJS must be loaded prior to any parseTemplate call.";

		if (!template)
			return null;

		var tempContainer = document.createElement('div');
		tempContainer.innerHTML = template.nodeType ? template.innerHTML : template;

		var tempVM = new Vue({ el: tempContainer, data: model, methods: methods });

		tempVM.$forceUpdate();
		var html = tempVM.$el.innerHTML;

		// clean up
		tempVM.$destroy();
		tempVM = null;
		tempContainer = null;

		return html;
	},
	ObjectToFormData: function (frmData, obj, rootName, ignoreList) {
		var formData = null;
		if (frmData)
			formData = frmData;
		else formData = new FormData();
		function appendFormData(data, root) {
			if (!ignore(root)) {
				root = root || '';
				if (data instanceof File) {
					formData.append(root, data);
				} else if (Array.isArray(data)) {
					for (var i = 0; i < data.length; i++) {
						appendFormData(data[i], root + '[' + i + ']');
					}
				} else if (typeof data === 'object' && data) {
					for (var key in data) {
						if (data.hasOwnProperty(key)) {
							if (root === '') {
								appendFormData(data[key], key);
							} else {
								appendFormData(data[key], root + '.' + key);
							}
						}
					}
				} else {
					if (data !== null && typeof data !== 'undefined') {
						formData.append(root, data);
					}
				}
			}
		}
		function ignore(root) {
			return Array.isArray(ignoreList)
				&& ignoreList.some(function (x) { return x === root; });
		}
		appendFormData(obj, rootName);
		return formData;
	},
	AutoColonInTimeInput: function (evt, self) {
		if (evt.keyCode == 8) {
			return;
		}
		var curVal = $(self).val();
		if (curVal.length == 1 && curVal <= 1) { return; }
		else if (curVal.length == 2 || (curVal.length == 1 && curVal > 1)) {
			curVal = curVal + ":";
			$(self).val(curVal);
		}
	},
	PhoneNumberFormat: function (phoneWithExtensionString) {
		var cleaned = ('' + phoneWithExtensionString).replace(/\D/g, '');
		var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})(\d*)$/);
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3] + (match[4] !== "" ? ',' + match[4] : '');
		}
		return null;
	},
	GetNumbersOnly: function (stringWithCharacterMix) {
		return ('' + stringWithCharacterMix).replace(/\D/g, '');
	}
};

//helper functions for Utilities.ValidateInputs method
function GetValidateOptions(i) {
	var r = i.attr('regexpattern'), rx = null;
	if (r) rx = RegExp(r);
	var linkeditem = i.attr('linkeditem');
	if (linkeditem)
		linkHasValue = $(linkeditem).val() != null && $(linkeditem).val().length > 0;
	else linkHasValue = true;
	return {
		minLength: (i.attr('minlength') ? parseInt(i.attr('minlength')) : Number.MIN_VALUE),
		maxLength: (i.attr('maxlength') ? parseInt(i.attr('maxlength')) : Number.MAX_VALUE),
		validateMethod: i.attr('validatemethod'),
		linkHasValue: linkHasValue,
		rx: rx,
		minDate: (i.attr('minDate') ? Date.parse(i.attr('minDate')) : new Date(-8640000000000000)),
		maxDate: (i.attr('maxDate') ? Date.parse(i.attr('maxDate')) : new Date(8640000000000000)),
		validateoptional: i.attr('ValidateOptional') != null && i.attr('ValidateOptional') == 'true',
		skipNoSelection: i.attr('skipnoselection') != null && i.attr('skipnoselection') == 'true'
	};
}
//*********************** end **********************