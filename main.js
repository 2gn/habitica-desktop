const {
    app,
    BrowserWindow,
    BrowserView,
    nativeTheme
} = require("electron")

app.on('ready', function() {
    const win = new BrowserWindow({
        width: 600,
        height: 400
    });
    const habitica_view = new BrowserView()
    win.setBrowserView(habitica_view)
    habitica_view.webContents.loadURL("https://habitica.com")
    habitica_view.setBounds({x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1]})
    habitica_view.setAutoResize(
        {
            width: true,
            height: true,
            horizontal:true,
            vertical:true
        }
    )
    habitica_view.webContents.insertCSS(`
        .popover {
            visibility: hidden;
        }
    `)
    win.on('focus', function() {
        // it works but weird. I think I need to find for alternatives.
        habitica_view.webContents.executeJavaScript(`
            var taskButton = document.getElementById('create-task-btn')
            taskButton.parentNode.removeChild(taskButton)
        `)
    })
});
