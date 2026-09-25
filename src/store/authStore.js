/**
 * authStore.js — Shared auth state for the Kaizen website.
 * Connects to the same Frappe/LMS backend as lms.kaizen.paradox-bd.com.
 * Credentials & sessions are fully unified (shared site, shared cookies).
 *
 * LMS signup uses: lms.lms.user.sign_up (name + email → sends password-set link)
 * Login uses:      frappe standard /api/method/login
 */
import { reactive, computed } from 'vue'

const LMS_BASE = 'https://lms.kaizen.paradox-bd.com'
let _csrf = null

// ─── State ────────────────────────────────────────────────────────────────
const state = reactive({
  user: null,       // null = loading | 'Guest' = logged out | email = logged in
  profile: null,    // Frappe User doc fields
  loading: false,
  error: null,
})

// ─── Computed ─────────────────────────────────────────────────────────────
export const isLoggedIn  = computed(() => state.user && state.user !== 'Guest')
export const currentUser = computed(() => state.user)
export const userProfile = computed(() => state.profile)
export const authLoading = computed(() => state.loading)
export const authError   = computed(() => state.error)

// ─── Internal helpers ─────────────────────────────────────────────────────
async function getCSRF() {
  if (_csrf) return _csrf
  try {
    const r = await fetch(`${LMS_BASE}/api/method/frappe.auth.get_logged_user`, {
      credentials: 'include'
    })
    _csrf = r.headers.get('X-Frappe-CSRF-Token') || 'fetch'
  } catch {
    _csrf = 'fetch'
  }
  return _csrf
}

async function fetchProfile(email) {
  try {
    const r = await fetch(
      `${LMS_BASE}/api/resource/User/${encodeURIComponent(email)}` +
      `?fields=["first_name","last_name","full_name","email","user_image","username","bio"]`,
      { credentials: 'include' }
    )
    const data = await r.json()
    state.profile = data?.data || null
  } catch {
    state.profile = null
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────

/** Call once on app mount to restore existing session */
export async function checkSession() {
  state.loading = true
  try {
    const r = await fetch(`${LMS_BASE}/api/method/frappe.auth.get_logged_user`, {
      credentials: 'include'
    })
    if (!r.ok) {
      state.user = 'Guest'
      state.profile = null
      return
    }
    const data = await r.json()
    state.user = data?.message || 'Guest'
    if (isLoggedIn.value) await fetchProfile(state.user)
  } catch {
    state.user = 'Guest'
    state.profile = null
  } finally {
    state.loading = false
  }
}

/** Login with email + password. Returns { success, message } */
export async function login(email, password) {
  state.error = null
  state.loading = true
  try {
    const csrf = await getCSRF()
    const r = await fetch(`${LMS_BASE}/api/method/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-Frappe-CSRF-Token': csrf,
      },
      body: new URLSearchParams({ usr: email, pwd: password }).toString(),
    })
    const data = await r.json().catch(() => ({}))
    if (r.ok) {
      _csrf = null   // refresh CSRF token after login
      await checkSession()
      return { success: true }
    }
    const msg = data?.message || 'Invalid email or password.'
    state.error = msg
    return { success: false, message: msg }
  } catch (err) {
    const msg = 'Login failed. Please try again.'
    state.error = msg
    return { success: false, message: msg }
  } finally {
    state.loading = false
  }
}

/**
 * Sign up via LMS — sends name + email.
 * Frappe creates account with random password, then sends a "set your password"
 * email link. Returns { success, code, message }
 * code 1 = email sent | code 2 = needs admin verify (no SMTP yet)
 */
export async function signUp(fullName, email, branch = '') {
  state.error = null
  state.loading = true
  try {
    const csrf = await getCSRF()
    const payload = {
      email,
      full_name: fullName,
      verify_terms: 1,
      user_category: 'Student',
    }
    if (branch) payload.branch = branch
    const r = await fetch(`${LMS_BASE}/api/method/lms.lms.user.sign_up`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Frappe-CSRF-Token': csrf,
      },
      body: JSON.stringify(payload),
    })
    const data = await r.json().catch(() => ({}))
    if (!r.ok) {
      const exc = data?.exception || data?._error_message || ''
      if (exc.includes('Sign Up is disabled')) {
        const msg = 'Sign up is currently disabled. Please contact the academy.'
        state.error = msg
        return { success: false, message: msg }
      }
      const msg = data?.message || 'Signup failed.'
      state.error = msg
      return { success: false, message: msg }
    }
    const [code, message] = data.message
    if (parseInt(code) === 0) {
      state.error = message
      return { success: false, message }
    }
    return { success: true, code: parseInt(code), message }
  } catch (err) {
    const msg = 'Signup failed. Please try again.'
    state.error = msg
    return { success: false, message: msg }
  } finally {
    state.loading = false
  }
}

/** Logout from Frappe session */
export async function logout() {
  state.loading = true
  try {
    const csrf = await getCSRF()
    await fetch(`${LMS_BASE}/api/method/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'X-Frappe-CSRF-Token': csrf, 'Accept': 'application/json' }
    })
  } catch { /* ignore */ } finally {
    _csrf = null
    state.user = 'Guest'
    state.profile = null
    state.loading = false
  }
}

export default state
