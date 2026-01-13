import styles from './SquareTimer.module.css'

const MODE_LABELS = {
  work: 'Work Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break'
}

function SquareTimer({ timeRemaining, totalDuration, currentMode, isActive }) {
  // Calculate the percentage of time completed
  const percentComplete = ((totalDuration - timeRemaining) / totalDuration) * 100

  // Create SVG path for square progress (stroke around perimeter)
  const createSquareProgressPath = () => {
    const inset = 40 // Distance from edge to center of stroke
    const size = 320 // Path size (400 - 2*inset)
    const cornerRadius = 20 // Rounded corners

    // Calculate total perimeter (accounting for rounded corners)
    const straightEdge = size - 2 * cornerRadius
    const cornerCircumference = 2 * Math.PI * cornerRadius
    const perimeter = 4 * straightEdge + cornerCircumference
    const progressDistance = (percentComplete / 100) * perimeter

    if (progressDistance === 0) {
      return '' // No progress to show
    }

    let path = ''
    let distanceCovered = 0

    // Start at top-left corner (after the rounded corner)
    const startX = inset + cornerRadius
    const startY = inset
    path = `M ${startX},${startY} `

    // Top edge (left to right)
    if (distanceCovered + straightEdge <= progressDistance) {
      path += `L ${inset + size - cornerRadius},${inset} `
      distanceCovered += straightEdge

      // Top-right corner
      const cornerLength = (cornerCircumference / 4)
      if (distanceCovered + cornerLength <= progressDistance) {
        path += `Q ${inset + size},${inset} ${inset + size},${inset + cornerRadius} `
        distanceCovered += cornerLength

        // Right edge (top to bottom)
        if (distanceCovered + straightEdge <= progressDistance) {
          path += `L ${inset + size},${inset + size - cornerRadius} `
          distanceCovered += straightEdge

          // Bottom-right corner
          if (distanceCovered + cornerLength <= progressDistance) {
            path += `Q ${inset + size},${inset + size} ${inset + size - cornerRadius},${inset + size} `
            distanceCovered += cornerLength

            // Bottom edge (right to left)
            if (distanceCovered + straightEdge <= progressDistance) {
              path += `L ${inset + cornerRadius},${inset + size} `
              distanceCovered += straightEdge

              // Bottom-left corner
              if (distanceCovered + cornerLength <= progressDistance) {
                path += `Q ${inset},${inset + size} ${inset},${inset + size - cornerRadius} `
                distanceCovered += cornerLength

                // Left edge (bottom to top)
                if (distanceCovered + straightEdge <= progressDistance) {
                  path += `L ${inset},${inset + cornerRadius} `
                  distanceCovered += straightEdge

                  // Top-left corner
                  const remaining = progressDistance - distanceCovered
                  if (remaining > 0) {
                    if (remaining >= cornerLength) {
                      path += `Q ${inset},${inset} ${inset + cornerRadius},${inset} `
                    } else {
                      const angle = (remaining / cornerLength) * 90
                      const rad = angle * Math.PI / 180
                      const x = inset + cornerRadius * (1 - Math.cos(rad))
                      const y = inset + cornerRadius * (1 - Math.sin(rad))
                      path += `Q ${inset},${inset} ${x},${y} `
                    }
                  }
                } else {
                  const remaining = progressDistance - distanceCovered
                  path += `L ${inset},${inset + size - cornerRadius - remaining} `
                }
              } else {
                const remaining = progressDistance - distanceCovered
                const angle = (remaining / cornerLength) * 90
                const rad = angle * Math.PI / 180
                const x = inset + cornerRadius - cornerRadius * Math.sin(rad)
                const y = inset + size - cornerRadius * Math.cos(rad)
                path += `Q ${inset},${inset + size} ${x},${y} `
              }
            } else {
              const remaining = progressDistance - distanceCovered
              path += `L ${inset + size - cornerRadius - remaining},${inset + size} `
            }
          } else {
            const remaining = progressDistance - distanceCovered
            const angle = (remaining / cornerLength) * 90
            const rad = angle * Math.PI / 180
            const x = inset + size - cornerRadius * Math.cos(rad)
            const y = inset + size - cornerRadius + cornerRadius * Math.sin(rad)
            path += `Q ${inset + size},${inset + size} ${x},${y} `
          }
        } else {
          const remaining = progressDistance - distanceCovered
          path += `L ${inset + size},${inset + cornerRadius + remaining} `
        }
      } else {
        const remaining = progressDistance - distanceCovered
        const angle = (remaining / cornerLength) * 90
        const rad = angle * Math.PI / 180
        const x = inset + size - cornerRadius + cornerRadius * Math.sin(rad)
        const y = inset + cornerRadius * (1 - Math.cos(rad))
        path += `Q ${inset + size},${inset} ${x},${y} `
      }
    } else {
      const remaining = progressDistance - distanceCovered
      path += `L ${startX + remaining},${inset} `
    }

    return path
  }

  // Format time as MM:SS for digital display
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  // Get mode label
  const modeLabel = MODE_LABELS[currentMode] || 'Work Time'

  return (
    <div className={styles.squareTimer}>
      <div className={`${styles.modeIndicator} ${styles[currentMode]}`}>
        <span className={styles.modeDot}></span>
        {modeLabel}
      </div>

      <div className={`${styles.clockContainer} ${styles[currentMode]}`}>
        <svg viewBox="0 0 400 400" className={styles.clockFace}>
          {/* Outer frame/rim */}
          <rect
            x="10"
            y="10"
            width="380"
            height="380"
            rx="32"
            className={styles.outerRim}
          />

          {/* Inner background */}
          <rect
            x="20"
            y="20"
            width="360"
            height="360"
            rx="28"
            className={styles.background}
          />

          {/* Progress stroke around perimeter */}
          {percentComplete > 0 && (
            <path
              d={createSquareProgressPath()}
              className={`${styles.progressStroke} ${styles[`${currentMode}Stroke`]}`}
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Digital time display in center */}
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

export default SquareTimer
