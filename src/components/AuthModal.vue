<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="state.isAuthModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs"
      @click.self="close"
    >
      <div
        class="w-full max-w-md bg-white dark:bg-gray-850 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden transition-all"
        role="dialog"
        aria-modal="true"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div class="flex items-center gap-2.5">
            <div class="size-8 rounded-lg bg-rose-600/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              KZ
            </div>
            <div>
              <h3 class="text-base font-bold text-gray-950 dark:text-white leading-tight">
                {{ isLogin ? 'Sign In to Kaizen' : 'Student & Member Registration' }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Unified Karate Ecosystem & LMS Account
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="close"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Mode Segmented Control Tabs -->
        <div class="px-6 pt-4">
          <div class="grid grid-cols-2 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl text-xs font-semibold">
            <button
              type="button"
              @click="state.authModalTab = 'login'"
              :class="isLogin ? 'bg-white dark:bg-gray-700 text-gray-950 dark:text-white shadow-xs' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
              class="py-2 rounded-lg transition-all text-center"
            >
              Sign In
            </button>
            <button
              type="button"
              @click="state.authModalTab = 'signup'"
              :class="!isLogin ? 'bg-white dark:bg-gray-700 text-gray-950 dark:text-white shadow-xs' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
              class="py-2 rounded-lg transition-all text-center"
            >
              Create Account
            </button>
          </div>
        </div>

        <!-- Form Body -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <!-- Full Name (Signup only) -->
          <div v-if="!isLogin">
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input
              v-model="form.fullName"
              type="text"
              required
              placeholder="e.g. Kenji Sato"
              class="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="student@kaizen.paradox-bd.com"
              class="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <span v-if="!isLogin" class="text-[11px] text-gray-400">Min. 6 characters</span>
            </div>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              placeholder="••••••••"
              class="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

          <!-- Category (Signup only) -->
          <div v-if="!isLogin">
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Member Category</label>
            <select
              v-model="form.userCategory"
              class="w-full px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            >
              <option value="Student">Student / Karateka</option>
              <option value="Instructor">Instructor / Coach</option>
              <option value="Employee">Staff Member</option>
              <option value="Others">Supporter / Parent</option>
            </select>
          </div>

          <!-- Error Alert Banner -->
          <div
            v-if="errorMessage"
            class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs text-red-700 dark:text-red-300"
          >
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="state.isLoading"
            class="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg v-if="state.isLoading" class="animate-spin size-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>{{ state.isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Complete Registration') }}</span>
          </button>
        </form>

        <!-- Footer Notice -->
        <div class="px-6 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 text-center">
          <span>Same credentials give you access to </span>
          <a href="https://lms.kaizen.paradox-bd.com" target="_blank" class="text-rose-600 dark:text-rose-400 font-semibold hover:underline">Kaizen LMS</a>
          <span> Academy & Tournaments.</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { authStore, authState } from '../store/authStore.js'

const state = authState
const isLogin = computed(() => state.authModalTab === 'login')
const errorMessage = ref('')

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  userCategory: 'Student'
})

function close() {
  errorMessage.value = ''
  authStore.closeAuthModal()
}

async function handleSubmit() {
  errorMessage.value = ''
  try {
    if (isLogin.value) {
      await authStore.login(form.email, form.password)
    } else {
      await authStore.signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        userCategory: form.userCategory
      })
    }
  } catch (err) {
    errorMessage.value = err.message || 'Operation failed. Please try again.'
  }
}
</script>
