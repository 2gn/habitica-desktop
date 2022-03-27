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
    // dark mode
    if (nativeTheme.shouldUseDarkColors) {
        habitica_view.webContents.insertCSS(`
            body, .modal-content {
                background: #222222 !important;
            }
            .tasks-list {
                background: #333333 !important;
            }
            .task-content, .item {
                background: #444444 !important;
            }
            input.form-control.input-search, input.input-search, textarea.form-control.input-search, textarea.input-search, .btn-secondary, .filter-panel {
                background: #333333 !important;
            }
            
            .col-12 {
                background: #222222 !important;
            }
            .price-label.gold {
                color: #FFD93D !important;
            }
            body, .task-title, .task-notes, checklist-item, h1, h2, h3, h4, h5, h6, .secondary-menu .nav-link, dropdown-label, .btn-secondary, .dropdown {
                color: #eeede7 !important;
            }
        `)
    }
    win.on('focus', function() {
        // it works but weird. I think I need to find for alternatives.
        habitica_view.webContents.executeJavaScript(`
            var taskButton = document.getElementById('create-task-btn')
            taskButton.parentNode.removeChild(taskButton)
        `)
    })
});
