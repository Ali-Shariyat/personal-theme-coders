
$(window).on("load", function () {
    $(".loader").delay(1000).fadeOut();
    $(".main").height($("[data-main-tab].active").outerHeight(true));
$("[data-main-tab].active").parent("ul").find("> li:not(.active)").css("height","0");
$("[data-main-tab].active").css("height","")
$(document).on("click", "[data-sidebar-tab]", function () {
    var _self = $(this);
    var _get_data_val = _self.attr("data-sidebar-tab");
    window.location.hash = _self.attr("data-sidebar-tab");
    if (!_self.hasClass("active")) {
        $(".main").animate({
            scrollTop: 0
        }, 0);
        $(".sidebar-items").find("[data-sidebar-tab=" + _get_data_val + "]").addClass("active").siblings("[data-sidebar-tab]").removeClass("active");
        $("[data-main-tab=" + _get_data_val + "]").addClass("active").siblings("[data-main-tab]").removeClass("active");
        $("[data-main-tab=" + _get_data_val + "].active").parent("ul").find("> li:not(.active)").css("height","0");
        $("[data-main-tab=" + _get_data_val + "].active").css("height","")
        $(".main").height($("[data-main-tab=" + _get_data_val + "].active").outerHeight(true));
        $(".black-page").trigger("click");
    }
});

if ($("[data-sidebar-tab]").length) {
    if (window.location.hash !== "") {
        $("[data-sidebar-tab=" + window.location.hash.replace("#", "") + "]").trigger("click");
    }else{
        $("[data-sidebar-tab]:first").trigger("click");
    }
}
$(window).on('hashchange', function() {
if ($("[data-sidebar-tab]").length) {
    if (window.location.hash !== "") {
        $("[data-sidebar-tab=" + window.location.hash.replace("#", "") + "]").trigger("click");
    }else{
        $("[data-sidebar-tab]:first").trigger("click");
    }
}
});
$(document).on("click", "[data-menu-open]", function (e) {
    var $this = $(this);
    var $this_parents = $this.parents(".sidebar");
    if ($this_parents.hasClass("active")) {
        $this_parents.removeClass("active");
        $this_parents.find(".sidebar-items .item .sidebar-items-title").removeAttr("style");
        $this_parents.find(".sidebar-items .social-network ul").removeAttr("style");
        $(".black-page").fadeOut();
        // $this_parents.find(".sidebar-items > li").addClass("justify-content-center");
    }else{
        $this_parents.addClass("active");
        $this_parents.find(".sidebar-items .item .sidebar-items-title").fadeIn();
        $this_parents.find(".sidebar-items .social-network ul").fadeIn();
        $(".black-page").fadeIn();
        // $this_parents.find(".sidebar-items > li").removeClass("justify-content-center");
    }
    e.stopPropagation();
    e.preventDefault();
});
});
$(document).on("click", ".black-page", function (e) {
    $(".black-page").fadeOut();
    var menu_open = $("[data-menu-open]");
    var menu_open_parents = menu_open.parents(".sidebar");
    menu_open_parents.removeClass("active");
    menu_open_parents.find(".sidebar-items .item .sidebar-items-title").removeAttr("style");
    menu_open_parents.find(".sidebar-items .social-network ul").removeAttr("style");
});
$(document).on("click", ".change-theme-color i.fas", function (e) {
    $(this).parents(".change-theme-color").toggleClass("active");
});
$(document).on("click", ".change-theme-color ul li", function (e) {
    $("body").attr("data-color",$(this).attr("data-color"));
});

$(document).on("click",".theme-switch",function () {
    if(!$(this).find(".sun").hasClass("up")){
        $(this).find(".sun").removeClass("down").addClass("up");
        $(this).find(".moon").removeClass("up").addClass("down");
        $("body").addClass("dark-theme");
    }else{
        $(this).find(".sun").removeClass("up").addClass("down");
        $(this).find(".moon").removeClass("down").addClass("up");
        $("body").removeClass("dark-theme");
    }
});










/*
* File Name / glitteringSea.js
* Created Date / Aug 14, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

(function () {
    'use strict';
    window.addEventListener('load', function () {
        var canvas = document.getElementById('canvas');

        if (!canvas || !canvas.getContext) {
            return false;
        }

        /********************
         Random Number
         ********************/

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /********************
         Var
         ********************/

        var ctx = canvas.getContext('2d');
        var X = canvas.width = window.innerWidth;
        var Y = canvas.height = window.innerHeight;
        var mouseX = null;
        var mouseY = null;
        var shapeNum = 500;
        var shapes = [];
        var style = {
            black: 'black',
            white: 'white',
            lineWidth: 4,
        };

        /********************
         Animation
         ********************/

        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(cb) {
                setTimeout(cb, 13);
            };

        /********************
         Shape
         ********************/

        function Shape(ctx, x, y) {
            this.ctx = ctx;
            this.init(x, y);
        }

        Shape.prototype.init = function(x, y) {
            this.x = x;
            this.y = y;
            this.r = rand(10, 25);
            this.ga = Math.random() * Math.random() * Math.random() * Math.random();
            this.v = {
                x: Math.random(),
                y: -2
            };
            this.l = rand(0, 20);
            this.sl = this.l;
        };

        Shape.prototype.updateParams = function() {
            var ratio = this.l / this.sl;
            //this.r *= ratio;
            this.l -= 1;
            if (this.l < 0) {
                this.init(X * (Math.random() + Math.random()) / 2, rand(0, Y));
            }
        };

        Shape.prototype.updatePosition = function() {
            this.x += Math.random();
            this.y += -Math.random();
        };

        Shape.prototype.draw = function() {
            var ctx  = this.ctx;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.globalAlpha = this.ga;
            //ctx.fillStyle = 'rgb(123, 252, 100)';
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        };

        Shape.prototype.render = function(i) {
            this.updatePosition();
            this.updateParams();
            this.draw();
        };

        for (var i = 0; i < shapeNum; i++) {
            var s = new Shape(ctx, X * (Math.random() + Math.random()) / 2, rand(0, Y));
            shapes.push(s);
        }

        /********************
         Render
         ********************/

        function render() {
            ctx.clearRect(0, 0, X, Y);
            for (var i = 0; i < shapes.length; i++) {
                shapes[i].render(i);
            }
            requestAnimationFrame(render);
        }

        render();

        /********************
         Event
         ********************/

        function onResize() {
            X = canvas.width = window.innerWidth;
            Y = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', function() {
            onResize();
        });

        window.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, false);

    });
})();
