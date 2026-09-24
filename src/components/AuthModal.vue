<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="$emit('close')"
      >
        <!-- Blurred overlay -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')" />

        <!-- Modal card -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="scale-95 opacity-0 translate-y-2"
          enter-to-class="scale-100 opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="scale-100 opacity-100 translate-y-0"
          leave-to-class="scale-95 opacity-0 translate-y-2"
        >
          <div
            v-if="isOpen"
            class="relative z-10 w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <!-- Header accent bar -->
            <div class="h-1 w-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500" />

            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div class="px-7 pt-6 pb-7">
              <!-- Logo + Title -->
              <div class="flex flex-col items-center gap-2 mb-6">
                <div class="size-12 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-[2px] shadow-lg">
                  <img src="/logo.jpg" alt="Kaizen" class="w-full h-full object-cover rounded-[9px]" />
                </div>
                <h2 class="text-lg font-black text-gray-950 dark:text-white tracking-tight">
                  {{ mode === 'login' ? 'Welcome back' : 'Join Kaizen Academy' }}
                </h2>
                <p class="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {{ mode === 'login'
                    ? 'Sign in to access your training dashboard'
                    : 'Create your free student account' }}
                </p>
              </div>

              <!-- Tab switcher -->
              <div class="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 mb-5 gap-1">
                <button
                  @click="mode = 'login'; clearState()"
                  class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  :class="mode === 'login'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
                >Login</button>
                <button
                  @click="mode = 'signup'; clearState()"
                  class="flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  :class="mode === 'signup'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
                >Sign Up</button>
              </div>

              <!-- ── LOGIN FORM ── -->
              <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="flex flex-col gap-3.5">
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Email</label>
                  <input
                    id="auth-login-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    placeholder="you@example.com"
                    class="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-400 transition"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Password</label>
                    <a
                      :href="`https://lms.kaizen.paradox-bd.com/update-password?forgot=1`"
                      target="_blank"
                      class="text-[10px] text-rose-600 dark:text-rose-400 hover:underline"
                    >Forgot password?</a>
                  </div>
                  <div class="relative">
                    <input
                      id="auth-login-password"
                      v-model="password"
                      :type="showPwd ? 'text' : 'password'"
                      autocomplete="current-password"
                      required
                      placeholder="••••••••"
                      class="w-full px-3 py-2 pr-9 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-400 transition"
                    />
                    <button type="button" @click="showPwd = !showPwd"
                      class="absolute inset-y-0 right-2 flex items-center px-1 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path v-if="!showPwd" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Error banner -->
                <div v-if="localError" class="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                  <svg class="size-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-xs text-red-700 dark:text-red-400">{{ localError }}</p>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-sm cursor-pointer mt-1"
                >
                  <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                    <svg class="animate-spin size-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Signing in…
                  </span>
                  <span v-else>Sign In</span>
                </button>
              </form>

              <!-- ── SIGNUP FORM ── -->
              <form v-else-if="mode === 'signup' && !signupDone" @submit.prevent="handleSignup" class="flex flex-col gap-3.5">
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Full Name</label>
                  <input
                    id="auth-signup-name"
                    v-model="fullName"
                    type="text"
                    autocomplete="name"
                    required
                    placeholder="Your full name"
                    class="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-400 transition"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Email</label>
                  <input
                    id="auth-signup-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    placeholder="you@example.com"
                    class="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-400 transition"
                  />
                </div>

                <p class="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  By signing up you agree to Kaizen Academy's training policies.
                  A password setup link will be sent to your email.
                </p>

                <!-- Error banner -->
                <div v-if="localError" class="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
                  <svg class="size-3.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <p class="text-xs text-red-700 dark:text-red-400">{{ localError }}</p>
                </div>

                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-sm cursor-pointer mt-1"
                >
                  <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                    <svg class="animate-spin size-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Creating account…
                  </span>
                  <span v-else>Create Account</span>
                </button>
              </form>

              <!-- ── SIGNUP SUCCESS ── -->
              <div v-else-if="mode === 'signup' && signupDone" class="flex flex-col items-center gap-4 py-4 text-center">
                <div class="size-14 rounded-full bg-green-100 dark:bg-green-950/60 flex items-center justify-center">
                  <svg class="size-7 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white text-base">Account created!</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{{ signupMessage }}</p>
                </div>
                <a
                  href="https://lms.kaizen.paradox-bd.com"
                  target="_blank"
                  class="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                >Go to Kaizen Academy →</a>
              </div>

              <!-- Divider + LMS link -->
              <div v-if="!signupDone" class="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                <p class="text-[10px] text-gray-400 dark:text-gray-500">
                  Full training experience on
                  <a href="https://lms.kaizen.paradox-bd.com" target="_blank"
                    class="text-rose-600 dark:text-rose-400 font-semibold hover:underline">Kaizen Academy LMS →</a>
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { login, signUp } from '../store/authStore.js'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  initialMode: { type: String, default: 'login' }
})
const emit = defineEmits(['close', 'logged-in'])

const mode      = ref(props.initialMode)
const email     = ref('')
const password  = ref('')
const fullName  = ref('')
const showPwd   = ref(false)
const localError = ref('')
const isSubmitting = ref(false)
const signupDone   = ref(false)
const signupMessage = ref('')

watch(() => props.isOpen, (open) => {
  if (open) {
    mode.value = props.initialMode
    clearState()
  }
})

watch(() => props.initialMode, (m) => { mode.value = m })

function clearState() {
  email.value = ''
  password.value = ''
  fullName.value = ''
  showPwd.value = false
  localError.value = ''
  isSubmitting.value = false
  signupDone.value = false
  signupMessage.value = ''
}

async function handleLogin() {
  localError.value = ''
  isSubmitting.value = true
  const res = await login(email.value.trim(), password.value)
  isSubmitting.value = false
  if (res.success) {
    emit('logged-in')
    emit('close')
  } else {
    localError.value = res.message || 'Login failed.'
  }
}

async function handleSignup() {
  localError.value = ''
  if (!fullName.value.trim()) {
    localError.value = 'Please enter your full name.'
    return
  }
  isSubmitting.value = true
  const res = await signUp(fullName.value.trim(), email.value.trim())
  isSubmitting.value = false
  if (res.success) {
    signupDone.value = true
    signupMessage.value = res.code === 1
      ? 'Check your email for a link to set your password, then you can log in.'
      : 'Your account has been created. The academy admin will verify it shortly.'
  } else {
    localError.value = res.message || 'Signup failed. Please try again.'
  }
}
</script>
