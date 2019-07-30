let editor_config = {
    path_absolute: "http://divergent.msi/",
    selector: "textarea.tinymce",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media",
    relative_urls: false,
    file_browser_callback: function (field_name, url, type, win) {
        var x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        var y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

        var cmsURL = editor_config.path_absolute + 'admin/filemanager?field_name=' + field_name;
        if (type === 'image') {
            cmsURL = cmsURL + "&type=Images";
        } else {
            cmsURL = cmsURL + "&type=Files";
        }

        tinyMCE.activeEditor.windowManager.open({
            file: cmsURL,
            title: 'Dogukan.dev Dosya Yöneticisi',
            width: x * 0.8,
            height: y * 0.8,
            resizable: "yes",
            close_previous: "no"
        });

        var cmsURL = editor_config.path_absolute;
    }
};

tinymce.init(editor_config);

!function (a) {
    var b = new Array, c = new Array;
    a.fn.doAutosize = function (b) {
        var c = a(this).data("minwidth"), d = a(this).data("maxwidth"), e = "", f = a(this),
            g = a("#" + a(this).data("tester_id"));
        if (e !== (e = f.val())) {
            var h = e.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            g.html(h);
            var i = g.width(), j = i + b.comfortZone >= c ? i + b.comfortZone : c, k = f.width(),
                l = k > j && j >= c || j > c && d > j;
            l && f.width(j)
        }
    }, a.fn.resetAutosize = function (b) {
        var c = a(this).data("minwidth") || b.minInputWidth || a(this).width(),
            d = a(this).data("maxwidth") || b.maxInputWidth || a(this).closest(".tagsinput").width() - b.inputPadding,
            e = a(this), f = a("<tester/>").css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: e.css("fontSize"),
                fontFamily: e.css("fontFamily"),
                fontWeight: e.css("fontWeight"),
                letterSpacing: e.css("letterSpacing"),
                whiteSpace: "nowrap"
            }), g = a(this).attr("id") + "_autosize_tester";
        !a("#" + g).length > 0 && (f.attr("id", g), f.appendTo("body")), e.data("minwidth", c), e.data("maxwidth", d), e.data("tester_id", g), e.css("width", c)
    }, a.fn.addTag = function (d, e) {
        return e = jQuery.extend({focus: !1, callback: !0}, e), this.each(function () {
            var f = a(this).attr("id"), g = a(this).val().split(b[f]);
            if ("" == g[0] && (g = new Array), d = jQuery.trim(d), e.unique) {
                var h = a(this).tagExist(d);
                1 == h && a("#" + f + "_tag").addClass("not_valid")
            } else var h = !1;
            if ("" != d && 1 != h) {
                if (a("<span>").addClass("tag").append(a("<span>").text(d).append("&nbsp;&nbsp;"), a("<a>", {
                    href: "#",
                    title: "Removing tag",
                    text: "x"
                }).click(function () {
                    return a("#" + f).removeTag(escape(d))
                })).insertBefore("#" + f + "_addTag"), g.push(d), a("#" + f + "_tag").val(""), e.focus ? a("#" + f + "_tag").focus() : a("#" + f + "_tag").blur(), a.fn.tagsInput.updateTagsField(this, g), e.callback && c[f] && c[f].onAddTag) {
                    var i = c[f].onAddTag;
                    i.call(this, d)
                }
                if (c[f] && c[f].onChange) {
                    var j = g.length, i = c[f].onChange;
                    i.call(this, a(this), g[j - 1])
                }
            }
        }), !1
    }, a.fn.removeTag = function (d) {
        return d = unescape(d), this.each(function () {
            var e = a(this).attr("id"), f = a(this).val().split(b[e]);
            for (a("#" + e + "_tagsinput .tag").remove(), str = "", i = 0; i < f.length; i++) f[i] != d && (str = str + b[e] + f[i]);
            if (a.fn.tagsInput.importTags(this, str), c[e] && c[e].onRemoveTag) {
                var g = c[e].onRemoveTag;
                g.call(this, d)
            }
        }), !1
    }, a.fn.tagExist = function (c) {
        var d = a(this).attr("id"), e = a(this).val().split(b[d]);
        return jQuery.inArray(c, e) >= 0
    }, a.fn.importTags = function (b) {
        var c = a(this).attr("id");
        a("#" + c + "_tagsinput .tag").remove(), a.fn.tagsInput.importTags(this, b)
    }, a.fn.tagsInput = function (e) {
        var f = jQuery.extend({
            interactive: !0,
            defaultText: "",
            minChars: 0,
            width: "100%",
            height: "50px",
            autocomplete: {selectFirst: !1},
            hide: !0,
            delimiter: ",",
            unique: !0,
            removeWithBackspace: !0,
            placeholderColor: "#666666",
            autosize: !0,
            comfortZone: 20,
            inputPadding: 12,
            borderRadius: 3
        }, e), g = 0;
        return this.each(function () {
            if ("undefined" == typeof a(this).attr("data-tagsinput-init")) {
                a(this).attr("data-tagsinput-init", !0), f.hide && a(this).hide();
                var e = a(this).attr("id");
                (!e || b[a(this).attr("id")]) && (e = a(this).attr("id", "tags" + (new Date).getTime() + g++).attr("id"));
                var h = jQuery.extend({
                    pid: e,
                    real_input: "#" + e,
                    holder: "#" + e + "_tagsinput",
                    input_wrapper: "#" + e + "_addTag",
                    fake_input: "#" + e + "_tag"
                }, f);
                b[e] = h.delimiter, (f.onAddTag || f.onRemoveTag || f.onChange) && (c[e] = new Array, c[e].onAddTag = f.onAddTag, c[e].onRemoveTag = f.onRemoveTag, c[e].onChange = f.onChange);
                var i = '<div id="' + e + '_tagsinput" class="tagsinput"><div id="' + e + '_addTag">';
                if (f.interactive && (i = i + '<input id="' + e + '_tag" value="" data-default="' + f.defaultText + '" />'), i += '</div><div class="tags_clear"></div></div>', a(i).insertAfter(this), a(h.holder).css("width", f.width), a(h.holder).css("min-height", f.height), a(h.holder).css("height", f.height), "" != a(h.real_input).val() && a.fn.tagsInput.importTags(a(h.real_input), a(h.real_input).val()), f.interactive) {
                    if (a(h.fake_input).val(a(h.fake_input).attr("data-default")), a(h.fake_input).css("color", f.placeholderColor), a(h.fake_input).resetAutosize(f), a(h.holder).bind("click", h, function (b) {
                        a(b.data.fake_input).focus()
                    }), a(h.fake_input).bind("focus", h, function (b) {
                        a(b.data.fake_input).val() == a(b.data.fake_input).attr("data-default") && a(b.data.fake_input).val(""), a(b.data.fake_input).css("color", "#000000")
                    }), void 0 != f.autocomplete_url) {
                        autocomplete_options = {source: f.autocomplete_url};
                        for (attrname in f.autocomplete) autocomplete_options[attrname] = f.autocomplete[attrname];
                        void 0 !== jQuery.Autocompleter ? (a(h.fake_input).autocomplete(f.autocomplete_url, f.autocomplete), a(h.fake_input).bind("result", h, function (b, c, d) {
                            c && a("#" + e).addTag(c[0] + "", {focus: !0, unique: f.unique})
                        })) : void 0 !== jQuery.ui.autocomplete && (a(h.fake_input).autocomplete(autocomplete_options), a(h.fake_input).bind("autocompleteselect", h, function (b, c) {
                            return a(b.data.real_input).addTag(c.item.value, {focus: !0, unique: f.unique}), !1
                        }))
                    } else a(h.fake_input).bind("blur", h, function (b) {
                        var c = a(this).attr("data-default");
                        return "" != a(b.data.fake_input).val() && a(b.data.fake_input).val() != c ? b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                            focus: !0,
                            unique: f.unique
                        }) : (a(b.data.fake_input).val(a(b.data.fake_input).attr("data-default")), a(b.data.fake_input).css("color", f.placeholderColor)), !1
                    });
                    a(h.fake_input).bind("keypress", h, function (b) {
                        return d(b) ? (b.preventDefault(), b.data.minChars <= a(b.data.fake_input).val().length && (!b.data.maxChars || b.data.maxChars >= a(b.data.fake_input).val().length) && a(b.data.real_input).addTag(a(b.data.fake_input).val(), {
                            focus: !0,
                            unique: f.unique
                        }), a(b.data.fake_input).resetAutosize(f), !1) : void (b.data.autosize && a(b.data.fake_input).doAutosize(f))
                    }), h.removeWithBackspace && a(h.fake_input).bind("keydown", function (b) {
                        if (8 == b.keyCode && "" == a(this).val()) {
                            b.preventDefault();
                            var c = a(this).closest(".tagsinput").find(".tag:last").text(),
                                d = a(this).attr("id").replace(/_tag$/, "");
                            c = c.replace(/[\s]+x$/, ""), a("#" + d).removeTag(escape(c)), a(this).trigger("focus")
                        }
                    }), a(h.fake_input).blur(), h.unique && a(h.fake_input).keydown(function (b) {
                        (8 == b.keyCode || String.fromCharCode(b.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,/]+/)) && a(this).removeClass("not_valid")
                    })
                }
            }
        }), this
    }, a.fn.tagsInput.updateTagsField = function (c, d) {
        var e = a(c).attr("id");
        a(c).val(d.join(b[e]))
    }, a.fn.tagsInput.importTags = function (d, e) {
        a(d).val("");
        var f = a(d).attr("id"), g = e.split(b[f]);
        for (i = 0; i < g.length; i++) a(d).addTag(g[i], {focus: !1, callback: !1});
        if (c[f] && c[f].onChange) {
            var h = c[f].onChange;
            h.call(d, d, g[i])
        }
    };
    var d = function (b) {
        var c = !1;
        return 13 == b.which ? !0 : ("string" == typeof b.data.delimiter ? b.which == b.data.delimiter.charCodeAt(0) && (c = !0) : a.each(b.data.delimiter, function (a, d) {
            b.which == d.charCodeAt(0) && (c = !0)
        }), c)
    }
}(jQuery);
