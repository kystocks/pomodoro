import { useState, useEffect, useCallback } from 'react'
import SquareTimer from './components/SquareTimer/SquareTimer'
import AnalogTimer from './components/AnalogTimer/AnalogTimer'
import Controls from './components/Controls/Controls'
import Settings from './components/Settings/Settings'
import SessionCounter from './components/SessionCounter/SessionCounter'
import NotificationSound from './components/NotificationSound/NotificationSound'
import styles from './App.module.css'

const MODES = {
  WORK: 'work',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak'
}

function App() {
  // Customizable interval durations (in minutes)
  const [workDuration, setWorkDuration] = useState(25)
  const [shortBreakDuration, setShortBreakDuration] = useState(5)
  const [longBreakDuration, setLongBreakDuration] = useState(15)

  // Timer state
  const [currentMode, setCurrentMode] = useState(MODES.WORK)
  const [timeRemaining, setTimeRemaining] = useState(workDuration * 60) // in seconds
  const [isActive, setIsActive] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [shouldPlaySound, setShouldPlaySound] = useState(false)
  const [showAnalogClock, setShowAnalogClock] = useState(false)

  // Get duration for current mode
  const getCurrentDuration = useCallback(() => {
    switch (currentMode) {
      case MODES.WORK:
        return workDuration * 60
      case MODES.SHORT_BREAK:
        return shortBreakDuration * 60
      case MODES.LONG_BREAK:
        return longBreakDuration * 60
      default:
        return workDuration * 60
    }
  }, [currentMode, workDuration, shortBreakDuration, longBreakDuration])

  // Update time remaining when duration settings change (only if timer is not active)
  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(getCurrentDuration())
    }
  }, [getCurrentDuration, isActive])

  // Countdown timer effect
  useEffect(() => {
    let intervalId

    if (isActive && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && isActive) {
      // Timer completed
      handleTimerComplete()
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isActive, timeRemaining])

  // Handle timer completion
  const handleTimerComplete = () => {
    setIsActive(false)
    setShouldPlaySound(true)

    // Determine next mode
    if (currentMode === MODES.WORK) {
      const newCompletedCount = completedPomodoros + 1
      setCompletedPomodoros(newCompletedCount)

      // After 4 pomodoros, take a long break
      if (newCompletedCount % 4 === 0) {
        setCurrentMode(MODES.LONG_BREAK)
        setTimeRemaining(longBreakDuration * 60)
      } else {
        setCurrentMode(MODES.SHORT_BREAK)
        setTimeRemaining(shortBreakDuration * 60)
      }
    } else {
      // Break completed, back to work
      setCurrentMode(MODES.WORK)
      setTimeRemaining(workDuration * 60)
    }
  }

  // Start/Pause toggle
  const handleStartPause = () => {
    setIsActive(!isActive)
  }

  // Reset timer
  const handleReset = () => {
    setIsActive(false)
    setTimeRemaining(getCurrentDuration())
  }

  // Skip to next interval
  const handleSkip = () => {
    setIsActive(false)
    handleTimerComplete()
  }

  // Update duration settings
  const handleUpdateSettings = (work, shortBreak, longBreak) => {
    setWorkDuration(work)
    setShortBreakDuration(shortBreak)
    setLongBreakDuration(longBreak)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT') return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          handleStartPause()
          break
        case 'Escape':
          e.preventDefault()
          handleReset()
          break
        case 'Enter':
          e.preventDefault()
          handleSkip()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isActive, currentMode, timeRemaining])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>PomoFocus</h1>
        <p className={styles.subtitle}>Stay focused with the Pomodoro Technique</p>
      </header>

      <main className={styles.main}>
        <div className={styles.timerToggle}>
          <button
            onClick={() => setShowAnalogClock(false)}
            className={!showAnalogClock ? styles.active : ''}
            aria-pressed={!showAnalogClock}
          >
            Digital
          </button>
          <button
            onClick={() => setShowAnalogClock(true)}
            className={showAnalogClock ? styles.active : ''}
            aria-pressed={showAnalogClock}
          >
            Analog
          </button>
        </div>

        {showAnalogClock ? (
          <AnalogTimer
            timeRemaining={timeRemaining}
            totalDuration={getCurrentDuration()}
            currentMode={currentMode}
            isActive={isActive}
          />
        ) : (
          <SquareTimer
            timeRemaining={timeRemaining}
            totalDuration={getCurrentDuration()}
            currentMode={currentMode}
            isActive={isActive}
          />
        )}

        <Controls
          isActive={isActive}
          onStartPause={handleStartPause}
          onReset={handleReset}
          onSkip={handleSkip}
        />

        <SessionCounter
          completedPomodoros={completedPomodoros}
          nextLongBreak={4 - (completedPomodoros % 4)}
        />

        <Settings
          workDuration={workDuration}
          shortBreakDuration={shortBreakDuration}
          longBreakDuration={longBreakDuration}
          onUpdateSettings={handleUpdateSettings}
          isTimerActive={isActive}
        />

        <div className={styles.keyboardHints}>
          <p>Keyboard shortcuts: <kbd>Space</kbd> Start/Pause · <kbd>Esc</kbd> Reset · <kbd>Enter</kbd> Skip</p>
        </div>
      </main>

      <NotificationSound
        shouldPlay={shouldPlaySound}
        onSoundPlayed={() => setShouldPlaySound(false)}
      />
    </div>
  )
}

export default App
