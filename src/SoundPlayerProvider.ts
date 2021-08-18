import { CustomReadonlyEditorProvider, ExtensionContext, Uri, WebviewPanel } from 'vscode'
import { SoundPlayerDocument } from './SoundPlayerDocument' // 
import { GetWebviewContent } from './Util' // 

export class SoundPlayerProvider implements CustomReadonlyEditorProvider<SoundPlayerDocument> { // readonly editor

    private html: Promise<string> // webview content

    constructor(context: ExtensionContext) {
        // GetWebviewContent is from Util, replace script/css to actual filepath
        this.html = GetWebviewContent(context.asAbsolutePath('public')) // join(context.extensionUri, 'public')
    }

    openCustomDocument(uri: Uri): SoundPlayerDocument { // create doc and pass to resolveCustomEditor for viewing
        return new SoundPlayerDocument(uri)
    }

    async resolveCustomEditor(document: SoundPlayerDocument, webviewPanel: WebviewPanel): Promise<void> {
        webviewPanel.webview.options = {
            enableScripts: true // enable webview to run scripts
        }
        const html = await this.html
        webviewPanel.webview.html = html // webview static content
        const result = await document.parseResult
        webviewPanel.webview.postMessage(result) // post the message to the webview, for dynamic content
    }
}
