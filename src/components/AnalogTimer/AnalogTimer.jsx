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

  // Generate SVG path for elapsed time pie slice (counterclockwise from top)
  const createElapsedSlice = () => {
    if (percentComplete === 0) return ''

    const radius = 138 // Match the background circle radius

    // Calculate where the minute hand is (based on remaining time)
    const totalMinutes = Math.ceil(totalDuration / 60)
    const remainingMinutes = timeRemaining / 60
    const handAngle = -90 + (remainingMinutes / totalMinutes) * 360

    const startAngle = -90 // Start at top (12 o'clock / max value)
    const endAngle = handAngle // End where minute hand is

    // Convert to radians
    const startRad = startAngle * Math.PI / 180
    const endRad = endAngle * Math.PI / 180

    // Calculate start and end points on the circle
    const startX = 150 + radius * Math.cos(startRad)
    const startY = 150 + radius * Math.sin(startRad)
    const endX = 150 + radius * Math.cos(endRad)
    const endY = 150 + radius * Math.sin(endRad)

    // The arc angle is simply the elapsed angle
    // Large arc flag is 1 when elapsed time > 50%
    const largeArcFlag = angle > 180 ? 1 : 0

    // Create a pie slice: center -> top -> arc counterclockwise to hand -> back to center
    return `M 150 150 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`
  }

  // Generate minute markers dynamically based on total duration
  const minuteMarkers = useMemo(() => {
    const markers = []
    const totalMinutes = Math.ceil(totalDuration / 60)
    const maxValue = totalMinutes

    // Determine marker interval based on total minutes
    let markerInterval
    if (maxValue <= 5) {
      markerInterval = 1 // 5 minutes or less: show every minute
    } else if (maxValue % 5 === 0) {
      markerInterval = 5 // Divisible by 5: show every 5 minutes
    } else if (maxValue % 2 === 0) {
      markerInterval = 2 // Even but not divisible by 5: show every 2 minutes
    } else {
      markerInterval = 1 // Odd: show every minute
    }

    for (let i = 0; i <= maxValue; i += markerInterval) {
      // Skip 0 and only show up to maxValue
      if (i === 0 || i > maxValue) continue

      // Position: top is maxValue, increases clockwise from there
      const angle = (i / maxValue) * 360 - 90 // -90 to start at top
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
  }, [totalDuration])

  // Generate tick marks around the clock based on total duration
  const tickMarks = useMemo(() => {
    const marks = []
    const totalMinutes = Math.ceil(totalDuration / 60)
    const maxValue = totalMinutes

    for (let i = 0; i <= maxValue; i++) {
      const angle = (i / maxValue) * 360 - 90
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
  }, [totalDuration])

  // Calculate minute hand position (points to remaining time on dynamically scaled clock)
  const remainingMinutes = timeRemaining / 60
  const totalMinutes = Math.ceil(totalDuration / 60)
  const maxValue = totalMinutes

  // Minute hand should point to remaining time on the scaled clock
  const minuteHandAngle = -90 + (remainingMinutes / maxValue) * 360 // Start at top, go clockwise
  const minuteHandLength = 70
  const minuteHandX = 150 + minuteHandLength * Math.cos(minuteHandAngle * Math.PI / 180)
  const minuteHandY = 150 + minuteHandLength * Math.sin(minuteHandAngle * Math.PI / 180)

  // Calculate second hand position (completes one rotation per minute)
  const seconds = timeRemaining % 60
  const secondHandAngle = -90 + (seconds / 60) * 360 // Start at top, go clockwise
  const secondHandLength = 90
  const secondHandX = 150 + secondHandLength * Math.cos(secondHandAngle * Math.PI / 180)
  const secondHandY = 150 + secondHandLength * Math.sin(secondHandAngle * Math.PI / 180)

  // Format time as MM:SS for digital display
  const minutes = Math.floor(timeRemaining / 60)
  const displaySeconds = timeRemaining % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`

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
          {/* Define clip path to constrain pie slice to clock face */}
          <defs>
            <clipPath id="clockClip">
              <circle cx="150" cy="150" r="138" />
            </clipPath>
          </defs>

          {/* Background circle */}
          <circle cx="150" cy="150" r="145" className={styles.outerRim} />
          <circle cx="150" cy="150" r="138" className={styles.background} />

          {/* Elapsed time pie slice */}
          {percentComplete > 0 && (
            <path
              d={createElapsedSlice()}
              className={`${styles.elapsedSlice} ${styles[`${currentMode}Slice`]}`}
              clipPath="url(#clockClip)"
            />
          )}

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

          {/* Minute hand pointing to remaining minutes */}
          <line
            x1="150"
            y1="150"
            x2={minuteHandX}
            y2={minuteHandY}
            className={`${styles.minuteHand} ${styles[`${currentMode}MinuteHand`]}`}
          />

          {/* Second hand ticking away the seconds */}
          <line
            x1="150"
            y1="150"
            x2={secondHandX}
            y2={secondHandY}
            className={`${styles.secondHand} ${styles[`${currentMode}SecondHand`]}`}
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
