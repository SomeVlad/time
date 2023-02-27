import { memo, useEffect, useRef, useState } from 'react'
import styles from './line.module.css'

function useDetectOverflow(labelRef, fillerRef) {
    const labelWidth = labelRef?.current?.offsetWidth
    const fillerWidth = fillerRef?.current?.offsetWidth

    if (!labelWidth || !fillerWidth) return false

    return fillerWidth < labelWidth + 10
}

function calcLineCompleted(
    completed,
    thisLineMin,
    thisLineMax,
    oneLinePercentage,
) {
    if (completed > thisLineMax) {
        return 100
    }

    if (completed < thisLineMin) {
        return 0
    }

    const completedFraction = (completed - thisLineMin) % oneLinePercentage

    return 100 * completedFraction / oneLinePercentage
}

function ActiveProgressBarLine({ lines, completedLinesAmount, startTime, endTime }) {
    const [time, setTime] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 20)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const completed = 100 * (time - startTime) / (endTime - startTime)
    const oneLinePercentage = 100 / lines
    const thisLineMin = oneLinePercentage * completedLinesAmount
    const thisLineMax = oneLinePercentage * (completedLinesAmount + 1)
    const lineCompleted = calcLineCompleted(completed, thisLineMin, thisLineMax, oneLinePercentage)
    const isLabelOverflow = lineCompleted > 0 && lineCompleted < 9
    const labelText = `${completed.toFixed(9)}%`

    return (
        <Line
            key={completedLinesAmount}
            completed={lineCompleted}
            label={labelText}
            isLabelOverflow={isLabelOverflow}
        />
    )
}

function ProgressBarLine({ completed, label }) {
    const labelRef = useRef(null)
    const fillerRef = useRef(null)

    const isLabelOverflow = useDetectOverflow(labelRef, fillerRef)
    const labelStyles = `${styles['line-label']} ${isLabelOverflow ? `${styles['line-label_overflow']}` : ''}`

    return (
        <div className={styles['line-container']}>
            <div
                ref={fillerRef}
                className={styles['line-filler']}
                style={{ width: `${completed}%` }}
            >
                {label && (
                    <code className={labelStyles} ref={labelRef}>
                        {label}
                    </code>
                )}
            </div>
        </div>
    )
}

export const Line = memo(ProgressBarLine)
export const ActiveLine = memo(ActiveProgressBarLine)