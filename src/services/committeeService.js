import { captureError } from '../store/errorStore.js'

export const COMMITTEE_DATA = {
  currentTerm: '2026 – 2027',
  councils: [
    {
      id: 'executive',
      name: 'Executive Committee',
      description: 'Official governing board overseeing federation relations, Dan grading certifications, and dojo operations.',
      members: [
        {
          id: 'mem-1',
          name: 'Shihan Tariqul Islam',
          title: 'President & Technical Director',
          rank: '5th Dan Black Belt',
          role: 'President',
          institution: 'Kaizen Karate Academy / NSC Central',
          department: 'Technical & Dan Examination Board',
          image: null,
          bio: 'International WKF Referee and Senior Technical Director with 25+ years of martial arts leadership. Oversees national Dan gradings.'
        },
        {
          id: 'mem-2',
          name: 'Sensei Md. Hasibul Hasan',
          title: 'Chief Instructor & Founder',
          rank: '3rd Dan Black Belt',
          role: 'Chief Instructor',
          institution: 'Hajee Mohammad Danesh Science and Technology University (HSTU)',
          department: 'HSTU Campus Karate Dojo',
          image: null,
          bio: 'Founder of HSTU Karate Dojo and certified WKF Coach. Specializes in Shito-Ryu Kata, Kihon biomechanics, and athlete development.'
        },
        {
          id: 'mem-3',
          name: 'Dr. Md. Mizanur Rahman',
          title: 'Advisor & General Secretary',
          rank: 'Honorary Black Belt',
          role: 'General Secretary',
          institution: 'HSTU Sports Advisory Board',
          department: 'Physical Education & Athletics',
          image: null,
          bio: 'Guiding collegiate martial arts policy, tournament sanctioning, and student sports scholarships across universities.'
        },
        {
          id: 'mem-4',
          name: 'Farhana Sultana',
          title: 'Guardian Girls Lead & Coach',
          rank: '1st Dan Black Belt',
          role: 'Women Empowerment Lead',
          institution: 'Kaizen Academy Women Division',
          department: 'Self-Defense & Community Outreach',
          image: null,
          bio: 'Certified WKF Coach leading the Guardian Girls Karate program for female empowerment, practical self-defense, and university safety.'
        },
        {
          id: 'mem-5',
          name: 'Asif Mahmud',
          title: 'Treasurer & Operations Coordinator',
          rank: '1st Kyu Brown Belt',
          role: 'Treasurer',
          institution: 'HSTU Campus',
          department: 'Finance & Member Services',
          image: null,
          bio: 'Coordinates branch billing, member onboarding, equipment procurement, and tournament logistics across branches.'
        }
      ]
    },
    {
      id: 'technical',
      name: 'Technical & Referee Board',
      description: 'Accredited examiners responsible for black belt syllabi, tournament refereeing, and Olympic kumite rules.',
      members: [
        {
          id: 'tech-1',
          name: 'Shihan Tariqul Islam',
          title: 'Chief Technical Examiner',
          rank: '5th Dan',
          role: 'Referee Commission Chairman',
          institution: 'National Sports Council',
          department: 'WKF Referee Accreditation',
          bio: 'Official WKF International Judge & Referee evaluating all Dan syllabus examinations and competition rules.'
        },
        {
          id: 'tech-2',
          name: 'Sensei Md. Hasibul Hasan',
          title: 'Kata & Bunkai Director',
          rank: '3rd Dan',
          role: 'Kata Technical Director',
          institution: 'HSTU Campus Dojo',
          department: 'Shito-Ryu Tradition & Bunkai',
          bio: 'Accredited coach managing kata execution, bunkai practical defense, and junior squad tournament preparation.'
        }
      ]
    }
  ]
}

export const committeeService = {
  getCommitteeData() {
    return COMMITTEE_DATA
  },

  getCouncils() {
    return COMMITTEE_DATA.councils
  },

  getCouncilById(id) {
    return COMMITTEE_DATA.councils.find(c => c.id === id) || COMMITTEE_DATA.councils[0]
  }
}
