/**
 * @file src/better-elastic-textarea.js
 * @version 1.1.0-rc.3 2013-11-24T18:10:01
 * @overview Elastic textarea for better-dom
 * @copyright Maksim Chemerisuk 2013
 * @license MIT
 * @see https://github.com/chemerisuk/better-elastic-textarea
 */
(function(DOM) {
    "use strict";

    var SPACE_HOLDER_KEY = "space-holder";

    // Insiped by article at a list apart:
    // http://alistapart.com/article/expanding-text-areas-made-elegant

    DOM.extend("textarea[rows='1']", {
        constructor: function() {
            var wrapper = DOM.create("div.better-elastic-textarea>pre>span");

            this
                .data(SPACE_HOLDER_KEY, wrapper.find("span"))
                .on("input", this.onTextareaInput);

            this.parent("form").on("reset", this, this.onFormReset);

            wrapper.child(0).style({
                font: this.style("font"),
                padding: this.style("padding"),
                "border-width": this.style("border-width")
            });

            wrapper.append(this.after(wrapper));
        },
        onTextareaInput: function(value) {
            // use a small trick here: type of the first argument
            // is string only when defaultValue is sent in handleFormReset
            if (typeof value !== "string") value = this.get();

            // use &nbsp; to fix issue with adding a new line
            if (value[value.length - 1] === "\n") value += "&nbsp;";

            // IE doesn't respect newlines so use <br> instead
            this.data(SPACE_HOLDER_KEY).set(value.split("\n").join("<br>"));
        },
        onFormReset: function() {
            this.fire("input", this.get("defaultValue"));
        }
    });
}(window.DOM));
