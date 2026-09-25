import { ref } from 'vue'
import { captureError } from '../store/errorStore.js'

const ERP_BASE = typeof window !== 'undefined' ? '' : 'https://erp.kaizen.paradox-bd.com'

/**
 * Built-in fallback dojos for immediate render and offline resilience
 */
export const DEFAULT_DOJOS = [
  {
    name: 'hstu-campus',
    slug: 'hstu-campus',
    branch_name: 'HSTU Campus Karate Dojo',
    is_active: 1,
    city: 'Dinajpur',
    address: 'Hajee Mohammad Danesh Science and Technology University, Dinajpur-5200',
    contact_phone: '+880 1712-345678',
    contact_email: 'karate@hstu.ac.bd',
    head_sensei: 'Sensei Md. Hasibul Hasan',
    head_sensei_title: 'Chief Instructor, 3rd Dan Black Belt',
    head_sensei_bio: 'Certified WKF Coach and National Black Belt with over 12 years of martial arts and kata training experience. Specializes in Shito-Ryu Kata and competitive Kumite.',
    schedule_summary: 'Sunday, Tuesday, Thursday: 5:00 PM – 7:00 PM | Saturday (Kata & Sparring): 8:00 AM – 10:30 AM',
    monthly_fee: 1200,
    admission_fee: 2500,
    hero_tagline: 'The premier collegiate martial arts training center at HSTU Campus.',
    linked_erp_branch: 'HSTU Campus',
    features: [
      { icon: 'Award', title: 'WKF Certified', desc: 'Olympic-standard curriculum' },
      { icon: 'Shield', title: 'Traditional Dan', desc: 'Japan Karate Federation recognized' },
      { icon: 'Users', title: 'Collegiate Squad', desc: 'Varsity & youth training programs' }
    ],
    programs: [
      { name: 'Kihon & Kata Basics', days: 'Sun, Tue, Thu', time: '5:00 PM – 6:00 PM', level: 'Beginner (White to Green)' },
      { name: 'Advanced Bunkai & Kumite', days: 'Sun, Tue, Thu', time: '6:00 PM – 7:00 PM', level: 'Intermediate to Black Belt' },
      { name: 'Championship Competition Squad', days: 'Saturday', time: '8:00 AM – 10:30 AM', level: 'Elite Squad Invitational' }
    ]
  },
  {
    name: 'dhaka-central',
    slug: 'dhaka-central',
    branch_name: 'Dhaka Central Karate Dojo',
    is_active: 1,
    city: 'Dhaka',
    address: 'National Sports Council (NSC) Complex, Purana Paltan, Dhaka-1000',
    contact_phone: '+880 1812-987654',
    contact_email: 'dhaka@kaizenkarate.org',
    head_sensei: 'Shihan Tariqul Islam',
    head_sensei_title: 'Technical Director, 5th Dan Black Belt',
    head_sensei_bio: 'International WKF Referee and Chief Technical Examiner. Mentored over 50 national medalists in Kumite and Kata across South Asian championships.',
    schedule_summary: 'Monday, Wednesday, Friday: 6:00 PM – 8:30 PM | Sunday (Elite Kumite): 9:00 AM – 12:00 PM',
    monthly_fee: 2000,
    admission_fee: 3500,
    hero_tagline: 'High-performance championship training dojo in the heart of Dhaka.',
    linked_erp_branch: 'Dhaka Central',
    features: [
      { icon: 'Zap', title: 'National Hub', desc: 'Olympic pathway tournament team' },
      { icon: 'Target', title: 'Elite Kumite', desc: 'Electronic sensor combat training' },
      { icon: 'Heart', title: 'Fitness & Defense', desc: 'Adult & executive conditioning' }
    ],
    programs: [
      { name: 'Junior Tigers (Ages 6-13)', days: 'Mon, Wed, Fri', time: '5:00 PM – 6:00 PM', level: 'Youth Beginners' },
      { name: 'Senior Traditional & Sports Karate', days: 'Mon, Wed, Fri', time: '6:00 PM – 7:30 PM', level: 'Open Belt' },
      { name: 'National Elite Kumite Squad', days: 'Sunday', time: '9:00 AM – 12:00 PM', level: 'National Competitors' }
    ]
  }
]

const dojosState = ref([...DEFAULT_DOJOS])
const isLoaded = ref(false)

export const dojoService = {
  getDojos() {
    return dojosState.value
  },

  getDojoBySlug(slug) {
    if (!slug) return null
    return dojosState.value.find(d => d.slug === slug || d.name === slug) || null
  },

  async fetchDojos() {
    try {
      const res = await fetch(`${ERP_BASE}/api/resource/Dojo%20Branch?fields=["*"]`, {
        headers: { 'Accept': 'application/json' }
      })
      if (!res.ok) return dojosState.value
      const json = await res.json()
      if (Array.isArray(json?.data) && json.data.length > 0) {
        // Merge with local rich programs/features
        const merged = json.data.map(apiDojo => {
          const fallback = DEFAULT_DOJOS.find(f => f.slug === apiDojo.slug) || {}
          return {
            ...fallback,
            ...apiDojo,
            features: fallback.features || [
              { icon: 'Award', title: 'WKF Certified', desc: 'Olympic-standard curriculum' },
              { icon: 'Shield', title: 'Authentic Lineage', desc: 'Official Dan Certification' },
              { icon: 'Users', title: 'All Skill Levels', desc: 'Youth, Teen & Adult Classes' }
            ],
            programs: fallback.programs || [
              { name: 'General Karate Session', days: 'Scheduled Days', time: 'Evening', level: 'All Grades' }
            ]
          }
        })
        dojosState.value = merged
        isLoaded.value = true
        return merged
      }
    } catch (err) {
      captureError(err, 'dojoService:fetchDojos', false)
    }
    return dojosState.value
  },

  async fetchDojoBySlug(slug) {
    const cached = this.getDojoBySlug(slug)
    try {
      const res = await fetch(`${ERP_BASE}/api/resource/Dojo%20Branch/${encodeURIComponent(slug)}`, {
        headers: { 'Accept': 'application/json' }
      })
      if (!res.ok) return cached
      const json = await res.json()
      if (json?.data) {
        const fallback = DEFAULT_DOJOS.find(f => f.slug === slug) || {}
        const merged = {
          ...fallback,
          ...json.data,
          features: fallback.features || [
            { icon: 'Award', title: 'WKF Certified', desc: 'Olympic-standard curriculum' },
            { icon: 'Shield', title: 'Authentic Lineage', desc: 'Official Dan Certification' },
            { icon: 'Users', title: 'All Skill Levels', desc: 'Youth, Teen & Adult Classes' }
          ],
          programs: fallback.programs || [
            { name: 'General Karate Session', days: 'Scheduled Days', time: 'Evening', level: 'All Grades' }
          ]
        }
        // Update in cache list
        const idx = dojosState.value.findIndex(d => d.slug === slug)
        if (idx !== -1) dojosState.value[idx] = merged
        else dojosState.value.push(merged)
        return merged
      }
    } catch (err) {
      captureError(err, `dojoService:fetchDojoBySlug:${slug}`, false)
    }
    return cached
  }
}
