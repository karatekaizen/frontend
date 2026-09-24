import { reactive } from 'vue'
import { showToast } from './toastStore.js'

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
  return match ? decodeURIComponent(match[3]) : null
}

const STORAGE_EVENTS_KEY = 'kaizen_student_events'

export const authState = reactive({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isAuthModalOpen: false,
  authModalTab: 'login', // 'login' | 'signup'
  registeredEvents: []
})

export const authStore = {
  get state() {
    return authState
  },

  initAuth() {
    try {
      const rawEvents = localStorage.getItem(STORAGE_EVENTS_KEY)
      if (rawEvents) {
        authState.registeredEvents = JSON.parse(rawEvents)
      }
    } catch {
      authState.registeredEvents = []
    }

    const userId = getCookie('user_id')
    const fullName = getCookie('full_name')
    const systemUser = getCookie('system_user')

    if (userId && userId !== 'Guest') {
      authState.user = {
        email: userId,
        fullName: fullName || userId.split('@')[0],
        isSystemUser: systemUser === 'yes'
      }
      authState.isLoggedIn = true
    } else {
      authState.user = null
      authState.isLoggedIn = false
    }
  },

  openAuthModal(tab = 'login') {
    authState.authModalTab = tab
    authState.isAuthModalOpen = true
  },

  closeAuthModal() {
    authState.isAuthModalOpen = false
  },

  async login(email, password) {
    authState.isLoading = true
    try {
      const formData = new FormData()
      formData.append('usr', email.trim())
      formData.append('pwd', password)

      const res = await fetch('/api/method/login', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMsg = data.message || data._server_messages || 'Invalid email or password.'
        throw new Error(typeof errorMsg === 'string' ? errorMsg : 'Authentication failed')
      }

      const fullName = data.full_name || getCookie('full_name') || email.split('@')[0]
      const isSystem = getCookie('system_user') === 'yes'

      authState.user = {
        email: email.trim(),
        fullName,
        isSystemUser: isSystem
      }
      authState.isLoggedIn = true
      authState.isAuthModalOpen = false

      showToast({
        title: 'Welcome back!',
        message: `Signed in as ${fullName}`,
        type: 'success'
      })

      return { success: true, user: authState.user }
    } catch (err) {
      showToast({
        title: 'Sign In Failed',
        message: err.message || 'Could not verify credentials',
        type: 'error'
      })
      throw err
    } finally {
      authState.isLoading = false
    }
  },

  async signup({ fullName, email, password, userCategory = 'Student' }) {
    authState.isLoading = true
    try {
      const formData = new FormData()
      formData.append('email', email.trim())
      formData.append('full_name', fullName.trim())
      formData.append('password', password)
      formData.append('verify_terms', '1')
      formData.append('user_category', userCategory)

      const res = await fetch('/api/method/lms.lms.user.sign_up', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      if (Array.isArray(data.message) && data.message[0] === 0) {
        throw new Error(data.message[1] || 'Unable to register')
      }

      authState.user = {
        email: email.trim(),
        fullName: fullName.trim(),
        isSystemUser: false
      }
      authState.isLoggedIn = true
      authState.isAuthModalOpen = false

      showToast({
        title: 'Account Created',
        message: `Welcome to Kaizen Karate, ${fullName}!`,
        type: 'success'
      })

      return { success: true, user: authState.user }
    } catch (err) {
      showToast({
        title: 'Sign Up Failed',
        message: err.message || 'Registration encountered an error',
        type: 'error'
      })
      throw err
    } finally {
      authState.isLoading = false
    }
  },

  async logout() {
    try {
      await fetch('/api/method/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch {
      // Continue client cleanup even if network request fails
    }

    authState.user = null
    authState.isLoggedIn = false

    showToast({
      title: 'Signed Out',
      message: 'You have been successfully logged out.',
      type: 'info'
    })
  },

  registerForEvent(event) {
    if (!authState.isLoggedIn) {
      this.openAuthModal('login')
      showToast({
        title: 'Sign In Required',
        message: 'Please sign in or register to participate in this event.',
        type: 'warning'
      })
      return false
    }

    const eventId = event.id || event.title
    const exists = authState.registeredEvents.some(e => (e.id || e.title) === eventId)

    if (exists) {
      showToast({
        title: 'Already Registered',
        message: `You are already registered for ${event.title}`,
        type: 'info'
      })
      return false
    }

    const registration = {
      id: eventId,
      title: event.title,
      dates: event.dates || event.date,
      location: event.location,
      category: event.category || 'Championship',
      registeredAt: new Date().toISOString()
    }

    authState.registeredEvents.unshift(registration)
    try {
      localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(authState.registeredEvents))
    } catch {
      // Ignore storage errors
    }

    showToast({
      title: 'Registration Confirmed',
      message: `Successfully registered for ${event.title}!`,
      type: 'success'
    })
    return true
  },

  unregisterFromEvent(eventId) {
    const idx = authState.registeredEvents.findIndex(e => (e.id || e.title) === eventId)
    if (idx !== -1) {
      const removed = authState.registeredEvents.splice(idx, 1)[0]
      try {
        localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(authState.registeredEvents))
      } catch {
        // Ignore storage errors
      }
      showToast({
        title: 'Registration Cancelled',
        message: `Withdrawn from ${removed.title}`,
        type: 'info'
      })
    }
  }
}
