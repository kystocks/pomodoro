import styles from './Timer.module.css'

const MODE_LABELS = {
  work: 'Work Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break'
}

function Timer({ timeRemaining, currentMode, isActive }) {
  // Format time as MM:SS
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  // Get mode label
  const modeLabel = MODE_LABELS[currentMode] || 'Work Time'

  // Create ISO 8601 duration format for datetime attribute
  const isoDuration = `PT${minutes}M${seconds}S`

  return (
    <div className={styles.timer}>
      <div className={`${styles.modeIndicator} ${styles[currentMode]}`}>
        <span className={styles.modeDot}></span>
        {modeLabel}
      </div>

      <time
        className={styles.display}
        dateTime={isoDuration}
        aria-live="polite"
        aria-atomic="true"
      >
        {formattedTime}
      </time>

      <div className={styles.status} aria-live="polite">
        {isActive ? 'Running' : 'Paused'}
      </div>
    </div>
  )
}

export default Timer
