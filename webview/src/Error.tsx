import React, { ReactElement } from 'react'

type Props = {
    message: string
}

export default function Error({
    message,
}: Readonly<Props>): ReactElement { // simple span showing error msg
    return <span>{`音频解析错误:${message}`}</span>
}
