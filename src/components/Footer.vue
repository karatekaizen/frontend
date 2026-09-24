<template>
  <footer class="bg-gray-950 text-gray-400 border-t border-gray-900 mt-20 transition-colors">
    <!-- Olympic & Sports Affiliations Bar (High Contrast with Olympic Rings) -->
    <div class="border-b border-gray-900 bg-gray-900/40 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          <!-- Olympic Rings SVG -->
          <svg class="h-4 w-auto fill-none stroke-current" viewBox="0 0 100 45" stroke-width="3">
            <!-- 5 Olympic rings -->
            <circle cx="18" cy="18" r="14" class="stroke-blue-400"/>
            <circle cx="50" cy="18" r="14" class="stroke-gray-300"/>
            <circle cx="82" cy="18" r="14" class="stroke-rose-500"/>
            <circle cx="34" cy="27" r="14" class="stroke-amber-400"/>
            <circle cx="66" cy="27" r="14" class="stroke-emerald-400"/>
          </svg>
          <span class="text-gray-300">Recognised by the International Olympic Committee • Olympic Movement</span>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-semibold tracking-wider text-gray-400">
          <router-link to="/olympics" class="hover:text-white transition-colors text-decoration-none px-2 py-1 rounded bg-gray-900/60 border border-gray-800">
            IOC
          </router-link>
          <router-link to="/olympics" class="hover:text-white transition-colors text-decoration-none px-2 py-1 rounded bg-gray-900/60 border border-gray-800">
            IPC
          </router-link>
          <router-link to="/events" class="hover:text-white transition-colors text-decoration-none px-2 py-1 rounded bg-gray-900/60 border border-gray-800">
            THE WORLD GAMES
          </router-link>
          <router-link to="/documents" class="hover:text-white transition-colors text-decoration-none px-2 py-1 rounded bg-gray-900/60 border border-gray-800">
            WADA ANTI-DOPING
          </router-link>
          <router-link to="/about" class="hover:text-white transition-colors text-decoration-none px-2 py-1 rounded bg-gray-900/60 border border-gray-800">
            SPORTACCORD
          </router-link>
          <router-link to="/about" class="hover:text-white transition-colors text-decoration-none px-2 py-1 rounded bg-gray-900/60 border border-gray-800">
            GAISF
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        <!-- Brand Column -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 p-[1.5px] shadow-sm overflow-hidden shrink-0">
              <img src="/logo.jpg" alt="Kaizen Karate Academy" class="w-full h-full object-cover rounded-[9px]" />
            </div>
            <div>
              <span class="text-base font-black text-white tracking-tight font-sans block">
                Kaizen Karate Academy
              </span>
              <div class="text-[11px] text-gray-400 font-medium">Academy of Martial Arts</div>
            </div>
          </div>

          <p class="text-xs text-gray-400 leading-relaxed">
            Kaizen Karate Academy is a premier martial arts dojo dedicated to traditional Karate-Do excellence, Dan grading standards, and high-performance athletic development.
          </p>

          <div class="text-xs text-gray-400 space-y-1 pt-1">
            <div><strong class="text-gray-300">Central Dojo:</strong> HSTU Gymnasium, Dinajpur - 5200</div>
            <div><strong class="text-gray-300">Phone:</strong> +880 1777-300309</div>
            <div><strong class="text-gray-300">Email:</strong> hstukarate@gmail.com</div>
          </div>
        </div>

        <!-- Competitions Links -->
        <div class="space-y-3 text-xs">
          <div class="font-bold text-white uppercase tracking-wider text-xs">
            Competitions
          </div>
          <ul class="space-y-2">
            <li><router-link to="/events" class="text-gray-400 hover:text-white transition-colors text-decoration-none">World Championships</router-link></li>
            <li><router-link to="/events" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Karate 1 Premier</router-link></li>
            <li><router-link to="/events" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Karate 1 Series A</router-link></li>
            <li><router-link to="/events" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Youth League</router-link></li>
            <li><router-link to="/ranking" class="text-gray-400 hover:text-white transition-colors text-decoration-none">World Standings</router-link></li>
          </ul>
        </div>

        <!-- Kaizen Digital Ecosystem (LMS & ERP) -->
        <div class="space-y-3 text-xs">
          <div class="font-bold text-rose-400 uppercase tracking-wider text-xs flex items-center gap-1.5">
            <span class="size-1.5 rounded-full bg-rose-500"></span>
            Kaizen Ecosystem
          </div>
          <ul class="space-y-2">
            <li>
              <a href="https://lms.kaizen.paradox-bd.com" target="_blank" rel="noopener" class="text-gray-300 hover:text-white transition-colors text-decoration-none flex items-center gap-1 font-medium">
                <span>Kaizen Academy (LMS)</span>
                <svg class="size-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
            <li>
              <a href="https://erp.kaizen.paradox-bd.com" target="_blank" rel="noopener" class="text-gray-300 hover:text-white transition-colors text-decoration-none flex items-center gap-1 font-medium">
                <span>Kaizen ERP Portal</span>
                <svg class="size-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
            <li>
              <a href="https://erp.kaizen.paradox-bd.com/app" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors text-decoration-none">
                Athlete & Dojo Portal
              </a>
            </li>
            <li>
              <a href="https://lms.kaizen.paradox-bd.com/lms/courses" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors text-decoration-none">
                Referee & Dan Grading
              </a>
            </li>
            <li>
              <router-link to="/approved" class="text-gray-400 hover:text-white transition-colors text-decoration-none">
                Homologated Gear
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Governance & Rules -->
        <div class="space-y-3 text-xs">
          <div class="font-bold text-white uppercase tracking-wider text-xs">
            Governance
          </div>
          <ul class="space-y-2">
            <li><router-link to="/documents" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Rules 2026</router-link></li>
            <li><router-link to="/documents" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Kata Syllabus</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Executive Board</router-link></li>
            <li><router-link to="/olympics" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Olympic Movement</router-link></li>
            <li><router-link to="/social-legacy" class="text-gray-400 hover:text-white transition-colors text-decoration-none">Guardian Girls</router-link></li>
          </ul>
        </div>

        <!-- Newsletter & Social -->
        <div class="space-y-3 text-xs">
          <div class="font-bold text-white uppercase tracking-wider text-xs">
            Official Dispatches
          </div>
          <p class="text-xs text-gray-400 leading-relaxed">
            Subscribe to receive official draws, press bulletins, and tournament timetables.
          </p>

          <form @submit.prevent="subscribeNewsletter" class="space-y-2">
            <input
              v-model="newsletterEmail"
              type="email"
              placeholder="name@federation.org"
              class="w-full px-3 py-2 text-xs rounded-lg bg-gray-900 border border-gray-750 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              required
            />
            <button
              type="submit"
              class="w-full px-3 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-xs cursor-pointer"
            >
              Subscribe Bulletins
            </button>
          </form>
        </div>

      </div>

      <!-- Copyright Bottom Bar -->
      <div class="pt-8 mt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div>
          Copyright © 2026 Kaizen Karate Academy. All rights reserved.
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/documents" class="hover:text-white text-decoration-none text-gray-400">Privacy Policy</router-link>
          <span>•</span>
          <router-link to="/documents" class="hover:text-white text-decoration-none text-gray-400">Legal Notice</router-link>
          <span>•</span>
          <router-link to="/documents" class="hover:text-white text-decoration-none text-gray-400">Cookies</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { showToast } from '../store/toastStore.js'

const newsletterEmail = ref('')

function subscribeNewsletter() {
  if (!newsletterEmail.value) return
  showToast({
    title: 'Subscribed to Bulletins',
    message: newsletterEmail.value,
    type: 'success'
  })
  newsletterEmail.value = ''
}
</script>
