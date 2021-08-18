import { CustomDocument, Uri } from 'vscode'
import { DecodeAudio, LoadArrayBuffer, LogError } from './Util'

export class SoundPlayerDocument implements CustomDocument {

    readonly parseResult: Promise<AudioData | ErrorMessage> // AudioData if parse is successful

    constructor(readonly uri: Uri) {
        this.parseResult = this.loadAndParse(uri) // load and parse the audio
    }

    private async loadAndParse(uri: Uri): Promise<AudioData | ErrorMessage> {
        const buffer = await LoadArrayBuffer(uri) // from Util. workspace.fs.readFile(uri)
        try {
            const result = await DecodeAudio(buffer) // from Util. context.decodeAudioData(buffer, resolve, reject))
            const auidoData: AudioData = {
                type: 'audioData',
                numberOfChannels: result.numberOfChannels,
                length: result.length,
                sampleRate: result.sampleRate,
                channels: []
            }
            for (let i = 0; i < result.numberOfChannels; i++) {
                auidoData.channels.push(...result.getChannelData(i)) // spread channel data
            }
            return auidoData
        } catch (e) {
            const error: ErrorMessage = {
                type: 'error',
                message: LogError(e)
            }
            return error
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dispose(): void { }

}
