import { useEffect, useRef } from 'react'

function NotificationSound({ shouldPlay, onSoundPlayed }) {
  const audioContextRef = useRef(null)

  useEffect(() => {
    if (shouldPlay) {
      playNotificationSound()
      showBrowserNotification()
      onSoundPlayed()
    }
  }, [shouldPlay, onSoundPlayed])

  const playNotificationSound = () => {
    try {
      // Create or reuse AudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }

      const audioContext = audioContextRef.current

      // Create a simple pleasant notification tone
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Configure sound (pleasant chime)
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // A5 note
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1) // E5 note

      // Fade in and out
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5)

      // Play sound
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    } catch (error) {
      console.warn('Audio playback failed:', error)
    }
  }

  const showBrowserNotification = () => {
    // Request notification permission if not already granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('PomoFocus', {
        body: 'Timer completed! Time for a break.',
        icon: '/vite.svg',
        badge: '/vite.svg'
      })
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('PomoFocus', {
            body: 'Timer completed! Time for a break.',
            icon: '/vite.svg',
            badge: '/vite.svg'
          })
        }
      })
    }
  }

  // This component doesn't render anything visible
  return null
}

export default NotificationSound
