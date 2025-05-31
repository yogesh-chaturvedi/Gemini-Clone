import React, { useEffect } from 'react'
import { useState } from 'react'

function Time() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(new Date())
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const formatted = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    return (
        <div>
            <div className="container  rounded-3xl p-1">
                <div className='text-white'>{formatted}</div>
            </div>
        </div>
    )
}

export default Time
