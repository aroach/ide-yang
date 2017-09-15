const cp = require('child_process')
const path = require('path')
const {shell} = require('electron')
const {AutoLanguageClient, DownloadFile} = require('atom-languageclient')

// const serverDownloadUrl = 'https://github.com/yang-tools/yang-lsp/archive/master.zip'
// const serverDownloadSize = 916025
// const serverLauncher = '/server/yang-language-server/bin/yang-language-server'

class YangLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.yang' ] }
  getLanguageName () { return 'YANG' }
  getServerName () { return 'yang-language-server' }

  startServerProcess () {
    const serverHome = atom.config.get('ide-yang.yangLangServer')
    let executable = process.platform === 'win32' ? 'yang-language-server.bat' : 'yang-language-server';
    const command = serverHome + '/' + executable
    const childProcess = cp.spawn(command)
    childProcess.on('error', err => {
          atom.notifications.addError('Unable to start the yang-lsp language server.', {
            dismissable: true,
            buttons: [
              { text: 'Download YANG Language Server', onDidClick: () => shell.openExternal('https://github.com/yang-tools/yang-lsp') },
              { text: 'Set Server Path', onDidClick: () => atom.workspace.open("atom://config/packages/ide-yang") }
            ],
            description: 'You either don\'t have the language server installed or the path to it is incorrect.'
          })
        }
      )
    return childProcess
  }
}

module.exports = new YangLanguageClient()
