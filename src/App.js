import { ActiveLine, Line } from './line'

const openTime = Date.now()
const lines = 100
const firstDate = '2023-02-15T09:36:00.000+01:00'
const secondDate = '2023-03-09T15:45:00.000+01:00'

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
