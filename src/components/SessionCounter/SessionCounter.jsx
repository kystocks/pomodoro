import styles from './SessionCounter.module.css'

function SessionCounter({ completedPomodoros, nextLongBreak }) {
  // Generate visual dots for progress toward long break
  const dots = Array.from({ length: 4 }, (_, i) => i < (completedPomodoros % 4))

  return (
    <div className={styles.counter}>
      <h2 className={styles.heading}>Session Progress</h2>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.number}>{completedPomodoros}</span>
          <span className={styles.label}>Completed Pomodoros</span>
        </div>

        <div className={styles.progressIndicator}>
          <span className={styles.progressLabel}>
            {nextLongBreak === 4 ? 'Start your first session!' : `${nextLongBreak} until long break`}
          </span>
          <div className={styles.dots} role="img" aria-label={`Progress: ${completedPomodoros % 4} of 4 sessions until long break`}>
            {dots.map((filled, index) => (
              <span
                key={index}
                className={`${styles.dot} ${filled ? styles.filled : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionCounter
