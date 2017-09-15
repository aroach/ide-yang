const cp = require('child_process')
const path = require('path')
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
    console.log(__dirname)
    const serverHome = path.join(__dirname, '..', 'server', 'yang-language-server', 'bin')
    const command = serverHome + '/yang-language-server'
    console.log(serverHome)
    const childProcess = cp.spawn(command)
    console.log(childProcess)
    childProcess.on('error', err => {
          console.log(err)
          atom.notifications.addError('Unable to start the yang-language-server language server.', {
            dismissable: true,
            description: 'Sad trombone.'
          })
        }
      )
    return childProcess
  }
}

module.exports = new YangLanguageClient()
