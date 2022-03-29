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
    const view = new BrowserView()
    win.setBrowserView(view)
    view.webContents.loadURL("https://habitica.com")
    view.setBounds({x: 0, y: 0, width: win.getSize()[0], height: win.getSize()[1]})
    view.setAutoResize(
        {
            width: true,
            height: true,
            horizontal:true,
            vertical:true
        }
    )
    view.webContents.insertCSS(`
        .popover {
            visibility: hidden;
        }
    `)
    let isDarkmode = false;
    
    win.on('focus', function() {
        // it works but weird. I think I need to find for some alternatives.
        view.webContents.executeJavaScript(`
            var taskButton = document.getElementById('create-task-btn')
            taskButton.parentNode.removeChild(taskButton)
        `)
        // dark mode
        if (nativeTheme.shouldUseDarkColors) {
            if (!isDarkmode) {
                view.webContents.insertCSS(`
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
                    body, .task-title, .task-notes, checklist-item, h1, h2, h3, h4, h5, h6, .secondary-menu .nav-link, dropdown-label, .btn-secondary, .dropdown, .dropdown-menu {
                        color: #eeede7 !important;
                    }
                    .dropdown-menu {
                        background-color: #111111 !important;
                    }
                    .task-disabled-habit-control-bg {
                        background: #878190 !important;
                        color: #999 !important;
                    }
                    .task-disabled-habit-control-inner .negative .positive {
                        color: #999 !important;
                    }
                    .task-good-control-bg {
                        background: #24a878 !important;
                    }
                    .task-best-control-bg {
                        background: #3680a6 !important;
                    }
                    .task-neutral-control-bg {
                        background: #b98942 !important;
                    }
                `)
                isDarkmode = true;
            };
        } else if (isDarkmode) {
            view.webContents.reload()
            isDarkmode = false;
        }
    });
});
