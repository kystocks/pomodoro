import styles from './Controls.module.css'

function Controls({ isActive, onStartPause, onReset, onSkip }) {
  return (
    <div className={styles.controls}>
      <button
        className={`${styles.button} ${styles.primary}`}
        onClick={onStartPause}
        aria-label={isActive ? 'Pause timer' : 'Start timer'}
      >
        {isActive ? 'Pause' : 'Start'}
      </button>

      <button
        className={`${styles.button} ${styles.secondary}`}
        onClick={onReset}
        aria-label="Reset timer"
      >
        Reset
      </button>

      <button
        className={`${styles.button} ${styles.secondary}`}
        onClick={onSkip}
        aria-label="Skip to next interval"
      >
        Skip
      </button>
    </div>
  )
}

export default Controls
