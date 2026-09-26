<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Header -->
    <SectionHeader
      eyebrow="Digital Credential Authentication"
      title="Certificate Verification"
      description="Authenticate official Dan black belt diplomas, Kyu grade rank certificates, and WKF coaching licenses issued by Kaizen Karate Academy."
    />

    <!-- Verification Search Box -->
    <div class="mt-8 bg-white dark:bg-gray-850 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <form @submit.prevent="verifyCurrent" class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <input
            v-model="certIdInput"
            type="text"
            placeholder="Enter Certificate Number (e.g. KZ-DAN-2026-001)"
            class="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-950 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-400 transition"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm cursor-pointer shrink-0 disabled:opacity-50"
        >
          <span v-if="loading" class="inline-flex items-center gap-2">
            <svg class="animate-spin size-3.5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Verifying…
          </span>
          <span v-else>Verify Certificate</span>
        </button>
      </form>

      <!-- Quick sample pills -->
      <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
        <span class="text-[11px] text-gray-500 dark:text-gray-400">Quick Test:</span>
        <button
          v-for="sample in sampleCerts"
          :key="sample.id"
          type="button"
          @click="selectSample(sample.id)"
          class="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
        >
          {{ sample.id }}
        </button>
      </div>
    </div>

    <!-- Result: Verified Certificate -->
    <div v-if="certificate" class="mt-8 bg-white dark:bg-gray-850 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-lg relative overflow-hidden">
      <!-- Decorative Security Header -->
      <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600" />

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <div class="size-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-800/60">
              <span class="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              AUTHENTIC RECORD • VERIFIED
            </div>
            <h2 class="text-lg sm:text-xl font-black text-gray-900 dark:text-white mt-1">
              {{ certificate.rankTitle }}
            </h2>
          </div>
        </div>

        <div class="text-left sm:text-right">
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Certificate ID</span>
          <span class="text-sm font-mono font-bold text-gray-900 dark:text-white">
            {{ certificate.certificateNumber }}
          </span>
        </div>
      </div>

      <!-- Recipient & Details Grid -->
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Recipient Full Name</span>
          <div class="text-base font-bold text-gray-900 dark:text-white mt-0.5">
            {{ certificate.recipientName }}
          </div>
          <div v-if="certificate.recipientNameBangla" class="text-xs text-gray-500 font-medium">
            {{ certificate.recipientNameBangla }}
          </div>
        </div>

        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Member Identification</span>
          <div class="text-sm font-bold text-gray-900 dark:text-white font-mono mt-0.5">
            {{ certificate.memberNumber || 'N/A' }}
          </div>
        </div>

        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Issuing Dojo Branch</span>
          <div class="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-0.5">
            {{ certificate.dojoBranch }}
          </div>
        </div>

        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Issue Date</span>
          <div class="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
            {{ certificate.issueDate }}
          </div>
        </div>

        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Credential Validity</span>
          <div class="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
            {{ certificate.expiryDate }}
          </div>
        </div>

        <div>
          <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Standard & Curriculum</span>
          <div class="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
            WKF & JKF Shito-Ryu
          </div>
        </div>
      </div>

      <!-- Program & Notes -->
      <div class="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Accredited Program</span>
        <p class="text-xs font-semibold text-gray-900 dark:text-white mt-0.5">
          {{ certificate.programTitle }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          {{ certificate.notes }}
        </p>
      </div>

      <!-- Signatures Bar -->
      <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <div class="space-y-0.5">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Lead Examiner</span>
            <div class="text-xs font-bold text-gray-900 dark:text-white">{{ certificate.trainer?.name }}</div>
            <div class="text-[10px] text-gray-500">{{ certificate.trainer?.title }}</div>
          </div>
          <div class="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
          <div class="space-y-0.5">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Academic Council</span>
            <div class="text-xs font-bold text-gray-900 dark:text-white">{{ certificate.coordinator?.name }}</div>
            <div class="text-[10px] text-gray-500">{{ certificate.coordinator?.title }}</div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="copyShareLink"
            class="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="size-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{{ copied ? 'Link Copied!' : 'Copy Link' }}</span>
          </button>

          <button
            type="button"
            @click="printRecord"
            class="px-3.5 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Record</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="mt-8 p-6 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800 text-center">
      <div class="size-10 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center mb-2">
        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-sm font-bold text-red-900 dark:text-red-200">Verification Failed</h3>
      <p class="text-xs text-red-700 dark:text-red-300 mt-1 max-w-md mx-auto">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionHeader from '../components/ui/SectionHeader.vue'
import { certificateService } from '../services/certificateService.js'

const route = useRoute()
const router = useRouter()

const certIdInput = ref('')
const loading = ref(false)
const certificate = ref(null)
const errorMessage = ref('')
const copied = ref(false)

const sampleCerts = certificateService.getSampleCertificates()

async function verify(id) {
  const term = (id || certIdInput.value).trim()
  if (!term) return
  certIdInput.value = term
  loading.value = true
  errorMessage.value = ''
  certificate.value = null

  router.replace({ query: { ...route.query, certId: term } })

  const res = await certificateService.verifyCertificate(term)
  loading.value = false
  if (res.valid) {
    certificate.value = res.certificate
  } else {
    errorMessage.value = res.error || 'Certificate not found.'
  }
}

function verifyCurrent() {
  verify(certIdInput.value)
}

function selectSample(id) {
  certIdInput.value = id
  verify(id)
}

async function copyShareLink() {
  const url = `${window.location.origin}/cert-verify?certId=${encodeURIComponent(certIdInput.value)}`
  try {
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  } catch (err) {
    /* ignore */
  }
}

function printRecord() {
  window.print()
}

onMounted(() => {
  const q = route.query.certId
  if (q) {
    certIdInput.value = String(q)
    verify(String(q))
  }
})
</script>
