import { useMemo } from 'react'
import styles from './AnalogTimer.module.css'

const MODE_LABELS = {
  work: 'Work Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break'
}

function AnalogTimer({ timeRemaining, totalDuration, currentMode, isActive }) {
  // Calculate the percentage of time completed
  const percentComplete = ((totalDuration - timeRemaining) / totalDuration) * 100

  // Calculate angle for the progress arc (starts at top, goes clockwise)
  const angle = (percentComplete / 100) * 360

  // Generate minute markers (0, 5, 10, 15, ..., 55)
  const minuteMarkers = useMemo(() => {
    const markers = []
    for (let i = 0; i <= 55; i += 5) {
      const angle = (i / 60) * 360 - 90 // -90 to start at top
      const radius = 120
      const x = 150 + radius * Math.cos(angle * Math.PI / 180)
      const y = 150 + radius * Math.sin(angle * Math.PI / 180)

      markers.push({
        value: i,
        x,
        y
      })
    }
    return markers
  }, [])

  // Generate tick marks around the clock
  const tickMarks = useMemo(() => {
    const marks = []
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * 360 - 90
      const isLargeTick = i % 5 === 0
      const innerRadius = isLargeTick ? 105 : 110
      const outerRadius = 115

      const x1 = 150 + innerRadius * Math.cos(angle * Math.PI / 180)
      const y1 = 150 + innerRadius * Math.sin(angle * Math.PI / 180)
      const x2 = 150 + outerRadius * Math.cos(angle * Math.PI / 180)
      const y2 = 150 + outerRadius * Math.sin(angle * Math.PI / 180)

      marks.push({
        x1, y1, x2, y2,
        isLarge: isLargeTick
      })
    }
    return marks
  }, [])

  // Calculate hand position (points to remaining time)
  // Hand should point to the current position on the clock face
  const handAngle = -90 + (360 - angle) // Start at top, rotate counterclockwise with remaining time
  const handLength = 70
  const handX = 150 + handLength * Math.cos(handAngle * Math.PI / 180)
  const handY = 150 + handLength * Math.sin(handAngle * Math.PI / 180)

  // Format time as MM:SS for digital display
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  // Get mode label
  const modeLabel = MODE_LABELS[currentMode] || 'Work Time'

  return (
    <div className={styles.analogTimer}>
      <div className={`${styles.modeIndicator} ${styles[currentMode]}`}>
        <span className={styles.modeDot}></span>
        {modeLabel}
      </div>

      <div className={`${styles.clockContainer} ${styles[currentMode]}`}>
        <svg viewBox="0 0 300 300" className={styles.clockFace}>
          {/* Background circle */}
          <circle cx="150" cy="150" r="145" className={styles.outerRim} />
          <circle cx="150" cy="150" r="138" className={styles.background} />

          {/* Tick marks */}
          {tickMarks.map((mark, i) => (
            <line
              key={i}
              x1={mark.x1}
              y1={mark.y1}
              x2={mark.x2}
              y2={mark.y2}
              className={mark.isLarge ? styles.largeTick : styles.smallTick}
            />
          ))}

          {/* Minute numbers */}
          {minuteMarkers.map((marker) => (
            <text
              key={marker.value}
              x={marker.x}
              y={marker.y}
              className={styles.minuteNumber}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {marker.value}
            </text>
          ))}

          {/* Clock hand pointing to current time */}
          <line
            x1="150"
            y1="150"
            x2={handX}
            y2={handY}
            className={`${styles.hand} ${styles[`${currentMode}Hand`]}`}
          />

          {/* Center circle for hand pivot */}
          <circle cx="150" cy="150" r="8" className={styles.centerDot} />
        </svg>

        {/* Digital time display below clock */}
        <div className={styles.digitalDisplay}>
          <time
            dateTime={`PT${minutes}M${seconds}S`}
            aria-live="polite"
            aria-atomic="true"
          >
            {formattedTime}
          </time>
        </div>
      </div>

      <div className={styles.status} aria-live="polite">
        {isActive ? 'Running' : 'Paused'}
      </div>
    </div>
  )
}

export default AnalogTimer
