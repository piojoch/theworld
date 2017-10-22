// site.js
(function () {
    //var ele = $("#userName");
    //ele.text("Piotr Jochymczyk");

    //var main = $("#main");
    //main.on("onmouseenter", function () {
    //    main.style = "background-color: #888;";
    //});
    //main.on("onmouseleave", function () {
    //    main.style = "";
    //});

    //var menuItems = $("ul.menu li a");
    //menuItems.on("click", function () {
    //    var me = $(this);
    //    alert(me.text());
    //});

    var $sidebarAndWrapper = $("#sidebar,#wrapper");

    $("#sidebarToggle").on("click", function () {
        $sidebarAndWrapper.toggleClass("hide-sidebar");

        if ($sidebarAndWrapper.hasClass("hide-sidebar")) {
            $(this).text("Show Sidebar");
        }
        else {
            $(this).text("Hide Sidebar");
        }
    });
    
})();