/**
 * @file better-elastic-textarea.js
 * @version 1.0.5 2013-07-08T11:35:18
 * @overview Elastic textarea for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-elastic-textarea
 */
(function(DOM) {
    "use strict";

    DOM.extend("textarea.elastic", [
        "div[style=position:relative]>pre[style=visibility:hidden;margin:0;border-style:solid]>span[style=display:inline-block;white-space:pre-wrap]"
    ], {
        constructor: function(wrapper) {
            var holder = wrapper.child(0),
                span = holder.child(0);

            this.on("input", this, "_syncWithHolder", [span]);
            this._syncWithHolder(span);

            this.parent("form").on("reset", this, "_syncWithHolder", [span, true]);

            holder.setStyle({
                "font": this.getStyle("font"),
                "padding": this.getStyle("padding"),
                "border-width": this.getStyle("border-width")
            });

            wrapper.append(this.after(wrapper));
        },
        _syncWithHolder: function(span, defaultValue) {
            var value = this.get(defaultValue ? "defaultValue" : "value");

            // use &nbsp; to fix issue with adding a new line
            if (value[value.length - 1] === "\n") value += "&nbsp;";
            
            // IE doesn't respect newlines so use <br> instead
            span.set(value.split("\n").join("<br>"));
        }
    });

    DOM.importStyles("textarea.elastic", {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        resize: "none",
        "box-sizing": "border-box"
    });
    
}(window.DOM));