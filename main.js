const { app, BrowserWindow, BrowserView } = require("electron")

app.on('ready', function() {
    console.log('App is ready');
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
    fit_width_and_height()
    
    win.on('resize', function () {
        fit_width_and_height()
    })
});