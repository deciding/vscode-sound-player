import React from 'react'
import { render } from 'react-dom'
import Error from './Error'
import Loading from './Loading'
import SoundPlayer from './SoundPlayer'
import './index.css'

const root = document.getElementById('main')! // main div

// Render a React element into the DOM in the supplied container and return a reference to the component (or returns null for stateless components).
render(< Loading />, root)

window.addEventListener('message', (ev: MessageEvent<AudioData | ErrorMessage>) => {
    switch (ev.data.type) { // in type.d.ts
        case 'audioData':
            render(<SoundPlayer audioData={ev.data} />, root)
            break
        case 'error':
            render(<Error message={ev.data.message} />, root)
            break

    }
})
