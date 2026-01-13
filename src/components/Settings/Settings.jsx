import { useState } from 'react'
import styles from './Settings.module.css'

function Settings({
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  onUpdateSettings,
  isTimerActive
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localWork, setLocalWork] = useState(workDuration)
  const [localShortBreak, setLocalShortBreak] = useState(shortBreakDuration)
  const [localLongBreak, setLocalLongBreak] = useState(longBreakDuration)

  const handleApply = () => {
    onUpdateSettings(localWork, localShortBreak, localLongBreak)
    setIsExpanded(false)
  }

  const handleReset = () => {
    setLocalWork(25)
    setLocalShortBreak(5)
    setLocalLongBreak(15)
  }

  return (
    <div className={styles.settings}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="settings-panel"
      >
        ⚙️ Settings
      </button>

      {isExpanded && (
        <div id="settings-panel" className={styles.panel}>
          <fieldset className={styles.fieldset} disabled={isTimerActive}>
            <legend className={styles.legend}>Timer Intervals (minutes)</legend>

            {isTimerActive && (
              <p className={styles.disabledMessage}>
                Settings are disabled while timer is running
              </p>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="work-duration" className={styles.label}>
                Work Duration
              </label>
              <input
                id="work-duration"
                type="number"
                min="1"
                max="60"
                value={localWork}
                onChange={(e) => setLocalWork(Number(e.target.value))}
                className={styles.input}
                aria-describedby="work-description"
              />
              <span id="work-description" className={styles.description}>
                Focused work time (1-60 min)
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="short-break-duration" className={styles.label}>
                Short Break
              </label>
              <input
                id="short-break-duration"
                type="number"
                min="1"
                max="60"
                value={localShortBreak}
                onChange={(e) => setLocalShortBreak(Number(e.target.value))}
                className={styles.input}
                aria-describedby="short-break-description"
              />
              <span id="short-break-description" className={styles.description}>
                Quick rest between sessions (1-60 min)
              </span>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="long-break-duration" className={styles.label}>
                Long Break
              </label>
              <input
                id="long-break-duration"
                type="number"
                min="1"
                max="60"
                value={localLongBreak}
                onChange={(e) => setLocalLongBreak(Number(e.target.value))}
                className={styles.input}
                aria-describedby="long-break-description"
              />
              <span id="long-break-description" className={styles.description}>
                Extended rest after 4 pomodoros (1-60 min)
              </span>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleApply}
                className={`${styles.button} ${styles.apply}`}
                disabled={isTimerActive}
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleReset}
                className={`${styles.button} ${styles.reset}`}
                disabled={isTimerActive}
              >
                Reset to Defaults
              </button>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  )
}

export default Settings
