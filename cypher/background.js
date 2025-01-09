/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/

console.log("start");

function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create all the context menu items.
*/

/*
browser.menus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("menuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);
*/

/*
browser.menus.create({
  id: "remove-me",
  title: browser.i18n.getMessage("menuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);
*/

/*
browser.menus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);
*/

/*
browser.menus.create({
  id: "greenify",
  type: "radio",
  title: browser.i18n.getMessage("menuItemGreenify"),
  contexts: ["all"],
  checked: true,
  icons: {
    "16": "icons/paint-green-16.png",
    "32": "icons/paint-green-32.png"
  }
}, onCreated);
*/
browser.menus.create({
  id: "encrypt",
  type: "radio",
  title: browser.i18n.getMessage("menuItemEncrypt"),
  contexts: ["all"],
  checked: true,
  icons: {
    "16": "icons/paint-green-16.png",
    "32": "icons/paint-green-32.png"
  }
}, onCreated);
/*
browser.menus.create({
  id: "bluify",
  type: "radio",
  title: browser.i18n.getMessage("menuItemBluify"),
  contexts: ["all"],
  checked: false,
  icons: {
    "16": "icons/paint-blue-16.png",
    "32": "icons/paint-blue-32.png"
  }
}, onCreated);
*/

// a laisser sinon plus de menu
browser.menus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"]
}, onCreated);


/*
browser.menus.create({
  id: "check-uncheck",
  type: "checkbox",
  title: browser.i18n.getMessage("menuItemUncheckMe"),
  contexts: ["all"],
  checked: true,
}, onCreated);
*/
/*
browser.menus.create({
  id: "open-sidebar",
  title: browser.i18n.getMessage("menuItemOpenSidebar"),
  contexts: ["all"],
  command: "_execute_sidebar_action"
}, onCreated);
*/

/*
browser.menus.create({
  id: "tools-menu",
  title: browser.i18n.getMessage("menuItemToolsMenu"),
  contexts: ["tools_menu"],
}, onCreated);
*/

/*
Set a colored border on the document in the given tab.

Note that this only work on normal web pages, not special pages
like about:debugging.
*/
let blue = 'document.body.style.border = "5px solid blue"';
let green = 'document.body.style.border = "5px solid green"';

function borderify(tabId, color) {
  browser.tabs.executeScript(tabId, {
    code: color
  });
}

/*
Update the menu item's title according to current "checked" value.
*/
function updateCheckUncheck(checkedState) {
  if (checkedState) {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemUncheckMe"),
    });
  } else {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemCheckMe"),
    });
  }
}

function copySelection() {
    let selectedText = window.getSelection().toString(); //.trim();
    console.log(selectedText);
    if (selectedText) {
        console.log("2")
        console.log(selectedText);
        document.execCommand("Copy");
    }
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {

    console.log(info.menuItemId)
    
    switch (info.menuItemId) {
    case "log-selection":
        console.log(info.selectionText);
        break;
    case "remove-me":
        console.log("removing");
        let removing = browser.menus.remove(info.menuItemId);
        removing.then(onRemoved, onError);
        break;
    case "encrypt":
        console.log("blue");
        console.log(info.selectionText);
        
        copySelection();
        
        //borderify(tab.id, blue);
        break;
    case "greenify":
        console.log("green");
        borderify(tab.id, green);
        break;
    case "check-uncheck":
        updateCheckUncheck(info.checked);
        break;
    case "open-sidebar":
        console.log("Opening my sidebar");
        break;
    case "tools-menu":
        console.log("Clicked the tools menu item");
        break;
    }
});

function getSelectionText() {
    let text = "";

    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    return text;
}
function tick() {
    console.log("tick");
    copySelection();

    console.log(getSelectionText());
    
    setTimeout(tick, 1000);
}
setTimeout(tick, 1000);


