import { ActiveLine, Line } from './line'

const openTime = Date.now()
const lines = 100
const firstDate = '2023-03-31T17:40:00.000+02:00'
const secondDate = '2023-04-23T18:00:00.000+02:00'

const startTime = new Date(firstDate).getTime()
const endTime = new Date(secondDate).getTime()

const completed = 100 * (openTime - startTime) / (endTime - startTime)
const oneLinePercentage = 100 / lines

const completedLinesAmount = Math.floor(completed / oneLinePercentage)

function App() {
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
