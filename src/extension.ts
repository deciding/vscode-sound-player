import { ExtensionContext, window } from 'vscode' // builtin import
import { SoundPlayerProvider } from './SoundPlayerProvider' // main class

export function activate(context: ExtensionContext): void { // activate function activated by the onCustomEditor:asurance.soundplayer event
    // In short, all disposable objects that your extension creates should go into subscriptions in some way so that they can be properly cleaned up 
    //when your extension is unloaded.
    // https://stackoverflow.com/a/55579618/8470034
    // viewtype: asurance.soundplayer
    context.subscriptions.push(window.registerCustomEditorProvider('asurance.soundplayer', new SoundPlayerProvider(context), {
        webviewOptions: {
            retainContextWhenHidden: true // keep the state when hide the webview
        },
        supportsMultipleEditorsPerDocument: true, // allw multipe editors available
    }))
}
