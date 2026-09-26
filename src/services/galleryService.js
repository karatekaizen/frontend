export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'National Karate Championship 2026',
    category: 'championships',
    categoryLabel: 'Championships',
    image: 'https://cdn.sanity.io/images/18l4qwt0/production/4e1b401c9c0831f44def998ee0bdee8cb772871e-6000x3375.png?rect=469,0,5063,3375&w=1200&h=800&fit=max&auto=format',
    date: 'February 2026',
    location: 'National Sports Council Gymnasium, Dhaka',
    caption: 'Kaizen Academy athletes competing in senior Kumite and Kata finals under official WKF electronic referee scoring.'
  },
  {
    id: 'gal-2',
    title: 'Annual Shito-Ryu Dan Grading Examination',
    category: 'belt-exams',
    categoryLabel: 'Belt Gradings',
    image: 'https://cdn.sanity.io/images/18l4qwt0/production/3b78b453781937a128fabbe001952f45b138db70-1016x1138.jpg?rect=0,231,1016,677&w=1200&h=800&fit=max&auto=format',
    date: 'January 2026',
    location: 'HSTU Campus Central Dojo, Dinajpur',
    caption: 'Students demonstrating Pinan Katas, Bassai Dai bunkai defense, and continuous sparring before the technical board.'
  },
  {
    id: 'gal-3',
    title: 'WKF National Coach & Referee Clinic',
    category: 'seminars',
    categoryLabel: 'Seminars',
    image: 'https://cdn.sanity.io/images/18l4qwt0/production/fd1969fd6435890d6844223908304f0a4066dea6-2752x1536.png?rect=224,0,2304,1536&w=1200&h=800&fit=max&auto=format',
    date: 'December 2025',
    location: 'Mirpur Indoor Stadium, Dhaka',
    caption: 'Intensive coaching qualification workshop covering updated WKF video review procedures, fouls, and tactical drills.'
  },
  {
    id: 'gal-4',
    title: 'HSTU Campus Dojo Daily Kihon Training',
    category: 'dojo-life',
    categoryLabel: 'Dojo Life',
    image: 'https://res.cloudinary.com/dksn30eyz/image/upload/v1785926139/hkd/y5m1cmpx9ugjuzoh7wq0.jpg',
    date: 'November 2025',
    location: 'HSTU Gymnasium Dojo',
    caption: 'Senior squad athletes refining Tsuki strikes, stance transitions (Zenkutsu-Dachi, Nekoashi-Dachi), and endurance conditioning.'
  },
  {
    id: 'gal-5',
    title: 'Guardian Girls Self-Defense Workshop',
    category: 'seminars',
    categoryLabel: 'Seminars',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&h=800&q=80',
    date: 'October 2025',
    location: 'Auditorium 2, HSTU Campus',
    caption: 'Special community empowerment camp training university women in situational awareness, wrist releases, and defensive footwork.'
  },
  {
    id: 'gal-6',
    title: 'South Asian Divisional Kumite Tournament',
    category: 'championships',
    categoryLabel: 'Championships',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&h=800&q=80',
    date: 'September 2025',
    location: 'Shaheed Suhrawardy Indoor Stadium',
    caption: 'Kaizen competitors securing 4 gold and 3 silver medals across senior -60kg, -75kg, and open kata divisions.'
  }
]

export const galleryService = {
  getItems(category = 'all') {
    if (!category || category === 'all') return GALLERY_ITEMS
    return GALLERY_ITEMS.filter(item => item.category === category)
  },

  getCategories() {
    return [
      { label: 'All Photos', value: 'all', count: GALLERY_ITEMS.length },
      { label: 'Championships', value: 'championships', count: GALLERY_ITEMS.filter(i => i.category === 'championships').length },
      { label: 'Belt Gradings', value: 'belt-exams', count: GALLERY_ITEMS.filter(i => i.category === 'belt-exams').length },
      { label: 'Seminars & Clinics', value: 'seminars', count: GALLERY_ITEMS.filter(i => i.category === 'seminars').length },
      { label: 'Dojo Life', value: 'dojo-life', count: GALLERY_ITEMS.filter(i => i.category === 'dojo-life').length }
    ]
  }
}
