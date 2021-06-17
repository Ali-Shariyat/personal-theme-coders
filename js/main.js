
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
