const { app, BrowserWindow, BrowserView } = require("electron")

app.on('ready', function() {
    const win = new BrowserWindow({
        width: 600,
        height: 400
    });
    const habitica_view = new BrowserView()
    win.setBrowserView(habitica_view)
    habitica_view.webContents.loadURL("https://habitica.com")
    function fit_width_and_height() {
        habitica_view.setBounds({x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1]})
    }
    setTimeout(
        () => habitica_view.webContents.executeJavaScript("var taskButton = document.getElementById('create-task-btn');taskButton.parentNode.removeChild(taskButton)"), 1000
    )
    fit_width_and_height()
    
    win.on('resize', function () {
        fit_width_and_height()
    })
});
