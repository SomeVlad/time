import { useEffect, useState } from 'react'
import { ActiveLine, Line } from './line'

const updateLinesTimeout = 1000
const lines = 100
const oneLinePercentage = 100 / lines

const firstDate = '2023-03-31T17:40:00.000+02:00'
const secondDate = '2023-04-23T11:35:00.000+02:00'

const startTime = new Date(firstDate).getTime()
const endTime = new Date(secondDate).getTime()
const timeDiff = endTime - startTime

const calcCompletedLines = () => {
    const completed = 100 * (Date.now() - startTime) / timeDiff

    return Math.floor(completed / oneLinePercentage)
}

function App() {
    const [completedLinesAmount, setCompletedLinesAmount] = useState(calcCompletedLines())

    const tick = () => {
        setCompletedLinesAmount(calcCompletedLines())
    }

    // tick()
    useEffect(() => {
        const intervalId = setInterval(tick, updateLinesTimeout)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div>
            {new Array(completedLinesAmount).fill(null).map((_, i) => {
                return (
                    <Line
                        key={i}
                        completed={100}
                        label={null}
                    />
                )
            })}
            <ActiveLine
                lines={lines}
                completedLinesAmount={completedLinesAmount}
                startTime={startTime}
                endTime={endTime}
            />
            {new Array(lines - completedLinesAmount - 1).fill(null).map((_, i) => {
                return (
                    <Line
                        key={completedLinesAmount + i + 1}
                        completed={0}
                        label={null}
                    />
                )
            })}
        </div>
    )
}

export default App
