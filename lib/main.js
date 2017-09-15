const cp = require('child_process')
const {AutoLanguageClient, DownloadFile} = require('atom-languageclient')

const serverDownloadUrl = 'https://github.com/yang-tools/yang-lsp/archive/master.zip'
const serverDownloadSize = 916025
const serverLauncher = '/server/yang-language-server/bin/yang-language-server'

console.log('Starting ide-lang')

class YangLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.yang' ] }
  getLanguageName () { return 'YANG' }
  getServerName () { return 'yang-language-server' }

  startServerProcess () {
    console.log('startServerProcess')
    this.logStatus('Starting server process')
    const serverHome = '../server/yang-language-server/bin/'
    const command = serverHome + 'yang-language-server'
    console.log(command)
    const childProcess = cp.spawn(command)
    childProcess.on('error', err =>
          atom.notifications.addError('Unable to start the yang-language-server language server.', {
            dismissable: true,
            description: 'Sad trombone.'
          })
        )
    return childProcess
  }
}

module.exports = new YangLanguageClient()
