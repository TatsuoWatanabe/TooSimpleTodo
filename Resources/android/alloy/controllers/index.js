function Controller() {
    function tabOpen() {
        const activity = $.index.getActivity();
        activity.onCreateOptionsMenu = function(evt) {
            evt.menu.add({
                title: "Add",
                icon: "",
                showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
            }).addEventListener("click", $.tasks.openAddTask);
        };
        activity.invalidateOptionsMenu();
    }
    function tabFocus(e) {
        Alloy.Globals.currentTab = e.tab;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId12 = [];
    $.__views.tasks = Alloy.createController("Tasks", {
        id: "tasks"
    });
    $.__views.tasksTab = Ti.UI.createTab({
        window: $.__views.tasks.getViewEx({
            recurse: true
        }),
        title: "Tasks",
        id: "tasksTab"
    });
    __alloyId12.push($.__views.tasksTab);
    $.__views.done = Alloy.createController("Done", {
        id: "done"
    });
    $.__views.doneTab = Ti.UI.createTab({
        window: $.__views.done.getViewEx({
            recurse: true
        }),
        title: "Done",
        id: "doneTab"
    });
    __alloyId12.push($.__views.doneTab);
    $.__views.all = Alloy.createController("All", {
        id: "all"
    });
    $.__views.allTab = Ti.UI.createTab({
        window: $.__views.all.getViewEx({
            recurse: true
        }),
        title: "All",
        id: "allTab"
    });
    __alloyId12.push($.__views.allTab);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId12,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    tabOpen ? $.__views.index.addEventListener("open", tabOpen) : __defers["$.__views.index!open!tabOpen"] = true;
    tabFocus ? $.__views.index.addEventListener("focus", tabFocus) : __defers["$.__views.index!focus!tabFocus"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.addEventListener("close", function() {
        $.destroy();
    });
    $.index.open();
    Alloy.Collections.Todo.fetch();
    __defers["$.__views.index!open!tabOpen"] && $.__views.index.addEventListener("open", tabOpen);
    __defers["$.__views.index!focus!tabFocus"] && $.__views.index.addEventListener("focus", tabFocus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;