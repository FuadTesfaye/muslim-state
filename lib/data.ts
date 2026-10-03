import {
  EventItem,
  CompetitionItem,
  CompetitionQuestion,
  RubricCriteria,
  SubmissionToGrade,
  CertificateItem,
  AuditLogItem,
  FormSchema,
  TicketPass
} from './types';

export type Language = 'en' | 'ar' | 'am';

export interface Translations {
  home: string;
  events: string;
  competitions: string;
  test: string;
  leaderboard: string;
  certificates: string;
  dashboard: string;
  staff: string;
  admin: string;
  h: string;
  s: string;
  registerNow: string;
  viewCompetitions: string;
  upcomingSummits: string;
  featuredCompetitions: string;
  liveStats: string;
  totalAttendees: string;
  competitionsActive: string;
  diplomasAwarded: string;
  gateThroughput: string;
  more: string;
  search: string;
  all: string;
  filter: string;
  details: string;
  apply: string;
  checkout: string;
  verify: string;
  passDetails: string;
  dir: 'ltr' | 'rtl';
}

export const L: Record<Language, Translations> = {
  en: {
    home: 'Home',
    events: 'Events & Summits',
    competitions: 'Competitions',
    test: 'Proctored Exam',
    leaderboard: 'Leaderboard',
    certificates: 'Diplomas',
    dashboard: 'Dashboard',
    staff: 'Arrival Gate',
    admin: 'Secretariat Admin',
    h: 'Enterprise Islamic Event & Competition OS',
    s: 'Data-driven platform for international Islamic summits, Quran recitation championships, Hadith mastery tournaments, and real-time secretariat administration.',
    registerNow: 'Register for Summit',
    viewCompetitions: 'View Competitions',
    upcomingSummits: 'Flagship Summits & Conferences',
    featuredCompetitions: 'Active Tournaments & Olympiads',
    liveStats: 'Live Secretariat Telemetry',
    totalAttendees: 'Registered Delegates',
    competitionsActive: 'Live Tournaments',
    diplomasAwarded: 'Accredited Diplomas',
    gateThroughput: 'Gate Check-in Velocity',
    more: 'Explore All',
    search: 'Search by keyword or token...',
    all: 'All',
    filter: 'Filter',
    details: 'View Details',
    apply: 'Register Pass',
    checkout: 'Proceed to Checkout',
    verify: 'Verify Credential',
    passDetails: 'Digital Lanyard Pass',
    dir: 'ltr'
  },
  ar: {
    home: 'الرئيسية',
    events: 'المؤتمرات والقمم',
    competitions: 'المسابقات والبطولات',
    test: 'الاختبار المراقب',
    leaderboard: 'لوحة الصدارة',
    certificates: 'الشهادات المعتمدة',
    dashboard: 'لوحة المشارك',
    staff: 'بوابة الدخول',
    admin: 'أمانة المؤتمر',
    h: 'منظومة إدارة المؤتمرات والمسابقات الإسلامية',
    s: 'منصة مؤسسية ذكية لإدارة القمم الدولية، بطولات تلاوة القرآن الكريم، مسابقات إتقان الحديث، وإدارة الأمانة العامة لحظيًا.',
    registerNow: 'سجل في القمة',
    viewCompetitions: 'استعرض المسابقات',
    upcomingSummits: 'القمم والمؤتمرات الكبرى',
    featuredCompetitions: 'البطولات والأولمبياد الحالية',
    liveStats: 'بيانات الأمانة العامة المباشرة',
    totalAttendees: 'المشاركون المسجلون',
    competitionsActive: 'البطولات النشطة',
    diplomasAwarded: 'الشهادات الصادرة',
    gateThroughput: 'سرعة التحقق بالبوابة',
    more: 'عرض الكل',
    search: 'ابحث بالاسم أو الرمز...',
    all: 'الكل',
    filter: 'تصفية',
    details: 'التفاصيل',
    apply: 'حجز التذكرة',
    checkout: 'إتمام الحجز',
    verify: 'تحقق من الشهادة',
    passDetails: 'البطاقة الرقمية الرسمية',
    dir: 'rtl'
  },
  am: {
    home: 'መነሻ',
    events: 'ጉባኤዎችና ዝግጅቶች',
    competitions: 'ውድድሮች',
    test: 'የተቆጣጠረ ፈተና',
    leaderboard: 'ደረጃ ሰሌዳ',
    certificates: 'ዲፕሎማዎች',
    dashboard: 'የተሳታፊ ገጽ',
    staff: 'መግቢያ በር',
    admin: 'ዋና አስተዳደር',
    h: 'የኢስላማዊ ዝግጅቶችና ውድድሮች አስተዳደር ሥርዓት',
    s: 'ለአለም አቀፍ የኢስላማዊ ጉባኤዎች፣ የቁርዓን ንባብ ሻምፒዮናዎች፣ የሀዲስ ውድድሮችና ቅጽበታዊ አስተዳደር የተሰራ ዘመናዊ መድረክ።',
    registerNow: 'አሁን ይመዝገቡ',
    viewCompetitions: 'ውድድሮችን ይመልከቱ',
    upcomingSummits: 'ዋና ዋና ጉባኤዎች',
    featuredCompetitions: 'ንቁ ውድድሮች',
    liveStats: 'የአስተዳደር የቀጥታ መረጃ',
    totalAttendees: 'የተመዘገቡ ተሳታፊዎች',
    competitionsActive: 'ንቁ ውድድሮች',
    diplomasAwarded: 'የተሰጡ ዲፕሎማዎች',
    gateThroughput: 'የበር ፍተሻ ፍጥነት',
    more: 'ሁሉንም እይ',
    search: 'ፈልግ...',
    all: 'ሁሉም',
    filter: 'አጣራ',
    details: 'ዝርዝር እይ',
    apply: 'ይመዝገቡ',
    checkout: 'ጨርስ',
    verify: 'አረጋግጥ',
    passDetails: 'ዲጂታል ባጅ',
    dir: 'ltr'
  }
};

export const SEED_EVENTS: EventItem[] = [
  {
    id: 'summit-2026',
    title: 'International IlmFlow Islamic Summit 2026',
    titleAr: 'القمة العالمية لمنظومة علوم الشريعة 2026',
    tagline: 'Bridging Classical Scholarship, Ethical Governance & Emerging Technologies',
    dateRange: 'November 14 – 16, 2026 (3 Days)',
    location: 'Grand Minaret Hall & Convention Center',
    totalDays: 3,
    totalCapacity: 1200,
    registeredCount: 842,
    description:
      'A 3-day premier international academic gathering bringing together leading jurists, Hadith authorities, and innovative technologists for scholarly symposiums, keynote research, and networking.',
    tierPrices: {
      vip: 120,
      general: 60,
      academic: 35,
      youth: 20
    },
    speakers: [
      {
        name: 'Dr. Tariq Al-Hashimi',
        title: 'Professor of Usul al-Fiqh',
        institution: 'Islamic University of Madinah',
        avatarIcon: 'book'
      },
      {
        name: 'Sheikh Yusuf Karimi',
        title: 'Senior Jurist & Khateeb',
        institution: 'Central Islamic Sanctuary',
        avatarIcon: 'mic'
      },
      {
        name: 'Dr. Amina Mansoor',
        title: 'Chair of Islamic Bioethics',
        institution: 'Dar al-Hikmah Institute',
        avatarIcon: 'vid'
      }
    ],
    sessions: [
      {
        day: 1,
        time: '09:00 - 10:30',
        title: 'Opening Plenary: The Revival of Scholarly Sanad',
        speaker: 'Sheikh Yusuf Karimi',
        hall: 'Al-Bukhari Auditorium'
      },
      {
        day: 1,
        time: '11:00 - 12:30',
        title: 'Usul al-Fiqh in the Era of Algorithmic Transactions',
        speaker: 'Dr. Tariq Al-Hashimi',
        hall: 'Imam Malik Hall'
      },
      {
        day: 2,
        time: '10:00 - 11:30',
        title: 'Bioethical Rulings on Genomic Intervention',
        speaker: 'Dr. Amina Mansoor',
        hall: 'Ibn Sina Hall'
      },
      {
        day: 3,
        time: '14:00 - 16:00',
        title: 'Grand Assembly & Parchment Diploma Conferral',
        speaker: 'All Keynote Faculty',
        hall: 'Grand Minaret Hall'
      }
    ]
  },
  {
    id: 'quran-symposium-2026',
    title: 'Holy Quran Recitation & Tajweed Mastery Symposium',
    titleAr: 'الملتقى الدولي لإتقان التلاوة وضوابط التجويد',
    tagline: 'Preserving the Ten Qira’at with Unbroken Chains of Transmission',
    dateRange: 'December 4 – 5, 2026 (2 Days)',
    location: 'Sultan Baybars Academic Quad',
    totalDays: 2,
    totalCapacity: 600,
    registeredCount: 489,
    description:
      'Dedicated to the deep science of Makharij, Sifat, and Waqf & Ibtida. Includes live auditions, masterclasses, and competition adjudications.',
    tierPrices: {
      vip: 90,
      general: 45,
      academic: 25,
      youth: 15
    },
    speakers: [
      {
        name: 'Qari Hisham Al-Misri',
        title: 'Master of the Ten Minor & Major Qira’at',
        institution: 'Al-Azhar Recitation Council',
        avatarIcon: 'mic'
      },
      {
        name: 'Ustadha Maryam Al-Khattab',
        title: 'Lead Instructor of Tajweed Science',
        institution: 'Imam Shatibi Foundation',
        avatarIcon: 'book'
      }
    ],
    sessions: [
      {
        day: 1,
        time: '09:30 - 11:30',
        title: 'Phonetic Articulation of Difficult Makharij',
        speaker: 'Qari Hisham Al-Misri',
        hall: 'Hall of Shatibi'
      },
      {
        day: 2,
        time: '13:00 - 15:00',
        title: 'Live Championship Finals & Audio Adjudication',
        speaker: 'Grand Adjudication Panel',
        hall: 'Central Sanctuary'
      }
    ]
  }
];

export const SEED_COMPETITIONS: CompetitionItem[] = [
  {
    id: 'comp-quran-championship',
    title: 'International Holy Quran Recitation Championship',
    titleAr: 'بطولة تلاوة القرآن الكريم الدولية',
    category: 'Quran & Tajweed',
    level: 'Advanced / Open',
    type: 'audio_recitation',
    prizePool: '$15,000 + Gold Ijazah',
    maxParticipants: 200,
    enrolledCount: 142,
    description:
      'Upload a studio or clean acoustic recitation of designated Surahs (Surah Maryam 1-25 or Al-Isra 78-100). Judged on a strict 100-point rubric covering Tajweed, Makharij, and Waqf.'
  },
  {
    id: 'comp-bukhari-tournament',
    title: 'Global Sahih al-Bukhari Hadith Mastery Tournament',
    titleAr: 'المسابقة العالمية في إتقان صحيح البخاري',
    category: 'Hadith Sciences',
    level: 'Intermediate to Advanced',
    type: 'proctored_test',
    durationMinutes: 15,
    prizePool: '$10,000 + Manuscript Diploma',
    maxParticipants: 500,
    enrolledCount: 384,
    description:
      'Authoritative proctored exam evaluating knowledge of Sanad, Matn, narrator trustworthiness, and jurisprudence derived from Sahih al-Bukhari. Includes anti-cheat telemetry and negative marking.'
  },
  {
    id: 'comp-fiqh-invitational',
    title: 'Young Muslim Jurisprudence (Fiqh) Invitational',
    titleAr: 'مسابقة فقه العبادات والمعاملات للشباب',
    category: 'Fiqh & Usul',
    level: 'Beginner to Intermediate',
    type: 'proctored_test',
    durationMinutes: 10,
    prizePool: '$5,000 + Scholarship',
    maxParticipants: 300,
    enrolledCount: 215,
    description:
      'Interactive timed exam testing principles of Salah, Zakat, Sawm, and contemporary ethical transactions with clear textual proof requirements.'
  },
  {
    id: 'comp-scholarly-essay',
    title: 'Scholarly Treatise on Contemporary Islamic Ethics',
    titleAr: 'مسابقة البحث المحكم في الأخلاق والمعاملات المعاصرة',
    category: 'Research & Treatise',
    level: 'Graduate & Researcher',
    type: 'scholarly_essay',
    prizePool: '$7,500 + Academic Publication',
    maxParticipants: 100,
    enrolledCount: 68,
    description:
      'Submit an original 2,500-word scholarly research paper examining artificial intelligence, bioethics, or community economics from an authentic Islamic worldview.'
  }
];

export const QUESTION_BANK: CompetitionQuestion[] = [
  {
    id: 'q1',
    category: 'Bukhari',
    question: 'What is the very first Hadith recorded in Sahih al-Bukhari?',
    questionAr: 'ما هو أول حديث أخرجه الإمام البخاري في صحيحه؟',
    options: [
      'Actions are judged only by intentions (Innamal a’malu bin-niyyat)',
      'Islam is built upon five pillars',
      'The believer does not lie',
      'Seek knowledge even if it takes you to distant lands'
    ],
    correctIndex: 0,
    explanation:
      'Sahih al-Bukhari opens with the narration of Umar ibn al-Khattab: "Actions are by intentions, and every person will receive that which he intended."',
    points: 5
  },
  {
    id: 'q2',
    category: 'Tajweed',
    question: 'How many primary points of articulation (Makharij al-Huruf) exist according to Imam Ibn al-Jazari?',
    questionAr: 'كم عدد مخارج الحروف العامة والخاصة عند ابن الجزري؟',
    options: ['14 Special Makharij', '17 Special Makharij across 5 General areas', '10 Makharij', '28 Makharij'],
    correctIndex: 1,
    explanation:
      'According to Imam Ibn al-Jazari in Al-Muqaddimah, there are 17 specific articulation points distributed across 5 major regions: Al-Jawf, Al-Halq, Al-Lisan, Ash-Shafatayn, and Al-Khayshum.',
    points: 5
  },
  {
    id: 'q3',
    category: 'Fiqh',
    question: 'What is the minimum distance required for a traveller to shorten the four-rak’ah prayer (Qasr) according to the majority of jurists?',
    questionAr: 'ما هي مسافة القصر المقررة عند جمهور الفقهاء؟',
    options: [
      'Approximately 48 miles (approx. 80-88 km)',
      '15 miles (approx. 24 km)',
      '120 miles (approx. 193 km)',
      'Any distance outside one’s house boundary regardless of miles'
    ],
    correctIndex: 0,
    explanation:
      'The majority of classical jurists (Malikis, Shafi’is, Hanbalis) determined the travel distance (Masafat al-Qasr) as 4 Burud (approx. 80 to 88 kilometers / 48 miles).',
    points: 5
  },
  {
    id: 'q4',
    category: 'Seerah',
    question: 'In which year of the Hijrah did the Treaty of Hudaybiyyah occur?',
    questionAr: 'في أي سنة من الهجرة تم صلح الحديبية؟',
    options: ['2nd Year AH', '4th Year AH', '6th Year AH', '8th Year AH'],
    correctIndex: 2,
    explanation: 'The Treaty of Hudaybiyyah was agreed in Dhu al-Qi’dah of the 6th year after the Hijrah.',
    points: 5
  },
  {
    id: 'q5',
    category: 'Tajweed',
    question: 'Which rule applies to the Noon Sakinah when followed by the letter Ba (ب)?',
    questionAr: 'ما حكم النون الساكنة إذا أتى بعدها حرف الباء؟',
    options: ['Izhar', 'Idgham', 'Iqlab', 'Ikhfa'],
    correctIndex: 2,
    explanation:
      'When Noon Sakinah or Tanween is followed by the letter Ba (ب), it is transformed into a hidden Meem with Ghunnah (Iqlab).',
    points: 5
  },
  {
    id: 'q6',
    category: 'Bukhari',
    question: 'Who was the primary scribe of the revelation and compiler of the Mus’haf during Abu Bakr’s Caliphate?',
    questionAr: 'من الصحابي الجليل الذي كلفه أبو بكر الصديق بجمع القرآن الكريم؟',
    options: ['Ali ibn Abi Talib', 'Zayd ibn Thabit', 'Abdullah ibn Mas’ud', 'Ubayy ibn Ka’b'],
    correctIndex: 1,
    explanation:
      'Abu Bakr as-Siddiq entrusted Zayd ibn Thabit (RA) with the monumental duty of compiling the complete Quran from written parchments and memorizers.',
    points: 5
  },
  {
    id: 'q7',
    category: 'Fiqh',
    question: 'What is the required Nisab threshold for gold in Islamic jurisprudence?',
    questionAr: 'ما هو نصاب الذهب الشرعي المعتبر لوجوب الزكاة؟',
    options: ['20 Dinars / Mithqal (approx. 85 grams of fine gold)', '50 grams', '100 Dinars', '40 Mithqal'],
    correctIndex: 0,
    explanation:
      'The Nisab for gold is 20 Mithqals (Dinars), which equals approximately 85 grams of pure gold. When a lunar year passes, 2.5% is due.',
    points: 5
  },
  {
    id: 'q8',
    category: 'Seerah',
    question: 'What was the first public building established by the Prophet ﷺ upon arriving in Madinah?',
    questionAr: 'ما هو أول صرح بناه النبي صلى الله عليه وسلم عند وصوله إلى قباء والمدينة؟',
    options: ['The Central Treasury', 'Masjid Quba followed by the Prophet’s Mosque', 'The Market of Madinah', 'The Defense Citadel'],
    correctIndex: 1,
    explanation:
      'Masjid Quba was the very first mosque established, followed immediately by the Prophet’s Mosque (Al-Masjid an-Nabawi) in the heart of Madinah.',
    points: 5
  },
  {
    id: 'q9',
    category: 'Bukhari',
    question: 'In the narration of Jibreel (peace be upon him), what did the Prophet ﷺ state regarding Ihsan?',
    questionAr: 'في حديث جبريل عليه السلام المشهور، ما هو تعريف الإحسان؟',
    options: [
      'To worship Allah as if you see Him, for if you do not see Him, He surely sees you',
      'To give all your wealth in charity',
      'To fast every single day without interruption',
      'To isolate yourself in contemplation'
    ],
    correctIndex: 0,
    explanation:
      'The Prophet ﷺ defined Ihsan: "That you worship Allah as if you see Him, and even though you do not see Him, He sees you." (Sahih al-Bukhari).',
    points: 5
  },
  {
    id: 'q10',
    category: 'Tajweed',
    question: 'Which of the following letters are the letters of Qalqalah (echo / bouncing sound)?',
    questionAr: 'ما هي حروف القلقلة المجموعة في العبارة الشهيرة؟',
    options: ['قطب جد (Qaf, Taa, Baa, Jeem, Daal)', 'يرملون', 'يرملو', 'خص ضغط قظ'],
    correctIndex: 0,
    explanation: 'The letters of Qalqalah are collected in the mnemonic: Qutb Jad (ق, ط, ب, ج, د).',
    points: 5
  },
  {
    id: 'q11',
    category: 'Fiqh',
    question: 'What is the ruling on Sujud as-Sahw (prostration of forgetfulness) when an essential pillar (Rukn) is intentionally omitted in prayer?',
    questionAr: 'ما حكم سجود السهو إذا ترك المصلي ركناً عمداً؟',
    options: [
      'The prayer is invalid and cannot be rectified by Sujud as-Sahw',
      'Two prostrations make up for it completely',
      'One extra prostration suffices',
      'The prayer continues normally'
    ],
    correctIndex: 0,
    explanation:
      'If an essential pillar (Rukn) is omitted deliberately, the prayer is void. If forgotten, the pillar itself must be performed before Sujud as-Sahw.',
    points: 5
  },
  {
    id: 'q12',
    category: 'Seerah',
    question: 'Who was the companion known as the "Secret Keeper of the Messenger of Allah ﷺ" (Sahib Sirr)?',
    questionAr: 'من هو الصحابي الجليل الملقب بأمين سر رسول الله صلى الله عليه وسلم؟',
    options: ['Hudhayfah ibn al-Yaman', 'Abu Ubaydah ibn al-Jarrah', 'Bilal ibn Rabah', 'Mu’adh ibn Jabal'],
    correctIndex: 0,
    explanation:
      'Hudhayfah ibn al-Yaman (RA) was entrusted with the confidential register of the hypocrites by the Prophet ﷺ.',
    points: 5
  },
  {
    id: 'q13',
    category: 'Tajweed',
    question: 'What is the duration of Madd Lazim (compulsory prolonged elongation)?',
    questionAr: 'كم مقدار مد المد اللازم الكلمي والحرفي؟',
    options: ['6 Harakat (counts)', '2 Harakat', '4 Harakat', '8 Harakat'],
    correctIndex: 0,
    explanation:
      'Madd Lazim must be lengthened strictly to 6 vowel counts (Harakat) by consensus of the scholars of Qira’at.',
    points: 5
  },
  {
    id: 'q14',
    category: 'Bukhari',
    question: 'Which famous companion narrated the largest number of Hadith recorded in the canonical collections?',
    questionAr: 'من هو الصحابي الذي كان أكثر رواية للحديث النبوي الشريف؟',
    options: ['Abu Hurairah (RA)', 'Anas ibn Malik (RA)', 'Aisha bint Abi Bakr (RA)', 'Abdullah ibn Umar (RA)'],
    correctIndex: 0,
    explanation:
      'Abu Hurairah (RA) narrated over 5,300 Hadiths, having dedicated himself exclusively to attending the assemblies of the Prophet ﷺ.',
    points: 5
  },
  {
    id: 'q15',
    category: 'Fiqh',
    question: 'What is the authentic condition for the validity of wiping over leather socks (Khuffayn)?',
    questionAr: 'ما هو الشرط الأساسي لجواز المسح على الخفين؟',
    options: [
      'They must have been put on while in a complete state of ritual purity (Tuhur)',
      'They must be black in color',
      'They can only be worn during winter',
      'They require renewal every 2 hours'
    ],
    correctIndex: 0,
    explanation:
      'The Prophet ﷺ said to Al-Mughirah: "Leave them, for I put them on while my feet were in a state of purity."',
    points: 5
  },
  {
    id: 'q16',
    category: 'Seerah',
    question: 'During which battle did the miraculous incident of the Trench (Khandaq) take place?',
    questionAr: 'في أي غزوة تم حفر الخندق بمشورة الصحابي سلمان الفارسي؟',
    options: ['Ghazwat al-Ahzab (5 AH)', 'Ghazwat Badr (2 AH)', 'Ghazwat Uhud (3 AH)', 'Ghazwat Hunayn (8 AH)'],
    correctIndex: 0,
    explanation:
      'The trench was dug in the Battle of the Confederates (Al-Ahzab) in the 5th year of Hijrah on the advice of Salman al-Farsi (RA).',
    points: 5
  },
  {
    id: 'q17',
    category: 'Tajweed',
    question: 'What are the letters of Isti’la (Elevation / Heavy letters)?',
    questionAr: 'ما هي حروف الاستعلاء المفخمة دائماً؟',
    options: ['خص ضغط قظ (Kha, Saad, Daad, Ghayn, Taa, Qaf, Zhaa)', 'يرملون', 'أخي هاك علما', 'قطب جد'],
    correctIndex: 0,
    explanation: 'The letters of Isti’la are: (خ, ص, ض, غ, ط, ق, ظ) grouped as "Khussa Daghtin Qizh".',
    points: 5
  },
  {
    id: 'q18',
    category: 'Bukhari',
    question: 'What is the term for a Hadith whose chain of transmission is connected directly back to the Prophet ﷺ?',
    questionAr: 'ما هو اصطلاح الحديث الذي يضاف إلى النبي صلى الله عليه وسلم بسند متصل؟',
    options: ['Marfu’ (مرفوع)', 'Mawquf (موقوف)', 'Maqtu’ (مقطوع)', 'Mu’allaq (معلق)'],
    correctIndex: 0,
    explanation:
      'A Hadith attributed directly to the speech, deed, or tacit approval of the Prophet ﷺ is termed Marfu’.',
    points: 5
  },
  {
    id: 'q19',
    category: 'Fiqh',
    question: 'What constitutes the essence of the Day of Arafah in Hajj?',
    questionAr: 'ما هو الحديث الشريف الذي يبين أهمية الوقوف بعرفة في مناسك الحج؟',
    options: [
      'Al-Hajju Arafah (Hajj is Arafah)',
      'Hajj is circumambulation',
      'Hajj is animal sacrifice',
      'Hajj is travel'
    ],
    correctIndex: 0,
    explanation:
      'The Prophet ﷺ said: "Al-Hajju Arafah" — standing in the plain of Arafah on the 9th of Dhu al-Hijjah is the indispensable pillar without which Hajj is incomplete.',
    points: 5
  },
  {
    id: 'q20',
    category: 'Seerah',
    question: 'What was the document crafted by the Prophet ﷺ establishing mutual citizenship and rights between Muslims and Jewish tribes in Madinah?',
    questionAr: 'ما هي الوثيقة التاريخية التي كتبها النبي صلى الله عليه وسلم لتنظيم شؤون أهل المدينة؟',
    options: ['Sahifat al-Madinah (Constitution of Madinah)', 'Treaty of Hudaybiyyah', 'Pledge of Aqabah', 'Pledge of Ridwan'],
    correctIndex: 0,
    explanation:
      'Sahifat al-Madinah (The Constitution of Madinah) is celebrated by historians as the earliest written constitution enshrining civil rights, mutual defense, and judicial arbitration.',
    points: 5
  }
];

export const RUBRIC_CRITERIA: RubricCriteria[] = [
  {
    id: 'tajweed_accuracy',
    name: 'Tajweed Rules & Precision',
    nameAr: 'أحكام التجويد والغنن والمدود',
    maxPoints: 30,
    description: 'Adherence to Noon/Meem Sakinah, Mudood counts, Ahkam of Raa and Laam.'
  },
  {
    id: 'makharij_sifat',
    name: 'Makharij & Phonetic Articulation',
    nameAr: 'مخارج الحروف وصفاتها الذاتية',
    maxPoints: 30,
    description: 'Accurate distinction between subtle phonemes (e.g. Haa vs Khaa, Saad vs Seen).'
  },
  {
    id: 'vocal_modulation',
    name: 'Vocal Modulation & Khushu’',
    nameAr: 'حسن الصوت والخشوع والنبر',
    maxPoints: 20,
    description: 'Reverent delivery, pacing, tonal control without excessive theatrical vibrato.'
  },
  {
    id: 'waqf_ibtida',
    name: 'Waqf & Ibtida (Stopping & Starting)',
    nameAr: 'الوقف والابتداء وحسن البيان',
    maxPoints: 20,
    description: 'Grammatically appropriate pauses that preserve the Quranic theological meaning.'
  }
];

export const SEED_SUBMISSIONS: SubmissionToGrade[] = [
  {
    id: 'sub-101',
    competitionId: 'comp-quran-championship',
    competitionTitle: 'International Holy Quran Recitation Championship',
    participantName: 'Bilal Al-Habashi',
    type: 'audio',
    audioTitle: 'Surah Maryam (Verses 1 - 22)',
    audioDuration: '4 min 12 sec',
    rubricScores: {
      tajweed_accuracy: 28,
      makharij_sifat: 29,
      vocal_modulation: 19,
      waqf_ibtida: 18
    },
    totalScore: 94,
    feedback: 'Flawless Qalqalah and exquisite emotional resonance in the opening Ayahs of Maryam.',
    judgeName: 'Qari Hisham Al-Misri',
    status: 'graded'
  },
  {
    id: 'sub-102',
    competitionId: 'comp-quran-championship',
    competitionTitle: 'International Holy Quran Recitation Championship',
    participantName: 'Zubayr Ibn Awwam',
    type: 'audio',
    audioTitle: 'Surah Al-Isra (Verses 78 - 88)',
    audioDuration: '3 min 45 sec',
    rubricScores: {
      tajweed_accuracy: 24,
      makharij_sifat: 23,
      vocal_modulation: 17,
      waqf_ibtida: 15
    },
    totalScore: 79,
    feedback: 'Slight clipping on the Ghunnah duration during verse 82. Overall strong resonance.',
    judgeName: 'Ustadha Maryam Al-Khattab',
    status: 'appealed',
    appealRebuttal:
      'Rebuttal submitted: The recording micro-delay slightly compressed the waveform at 02:14. Respectfully request review of the uncompressed WAV file.'
  },
  {
    id: 'sub-103',
    competitionId: 'comp-scholarly-essay',
    competitionTitle: 'Scholarly Treatise on Contemporary Islamic Ethics',
    participantName: 'Fatima Az-Zahra',
    type: 'essay',
    essayTitle: 'Algorithmic Agency & Fiqhi Accountability in Autonomous AI Systems',
    essayContent:
      'This treatise analyzes algorithmic decision making through the lens of Jinayat and Daman (civil liability). We demonstrate that autonomous agents remain tools of their legal principal (Al-Mubashir vs Al-Mutasabbib)...',
    rubricScores: {},
    status: 'pending'
  }
];

export const SEED_TICKETS: TicketPass[] = [
  {
    id: 'tkt-8801',
    eventId: 'summit-2026',
    eventTitle: 'International IlmFlow Islamic Summit 2026',
    attendeeName: 'Ahmad Al-Mansoor',
    email: 'ahmad@example.com',
    phone: '+251 911 234 567',
    tier: 'VIP',
    selectedDays: [1, 2, 3],
    basePrice: 120,
    discountAmount: 18,
    finalPrice: 102,
    token: 'ILM-PASS-901',
    qrCodeSvg: '',
    checkedIn: true,
    checkedInAt: '10:14 AM, Day 1',
    createdAt: '2026-10-01'
  },
  {
    id: 'tkt-8802',
    eventId: 'summit-2026',
    eventTitle: 'International IlmFlow Islamic Summit 2026',
    attendeeName: 'Sumayyah Bint Habib',
    email: 'sumayyah@example.com',
    phone: '+251 922 890 123',
    tier: 'General',
    selectedDays: [1, 2],
    basePrice: 60,
    discountAmount: 0,
    finalPrice: 60,
    token: 'ILM-PASS-402',
    qrCodeSvg: '',
    checkedIn: false,
    createdAt: '2026-10-02'
  },
  {
    id: 'tkt-8803',
    eventId: 'quran-symposium-2026',
    eventTitle: 'Holy Quran Recitation & Tajweed Mastery Symposium',
    attendeeName: 'Hamzah Al-Kurdi',
    email: 'hamzah@example.com',
    phone: '+251 933 456 789',
    tier: 'Academic',
    selectedDays: [1, 2],
    basePrice: 25,
    discountAmount: 5,
    finalPrice: 20,
    token: 'ILM-PASS-773',
    qrCodeSvg: '',
    checkedIn: false,
    createdAt: '2026-10-02'
  }
];

export const SEED_CERTIFICATES: CertificateItem[] = [
  {
    id: 'ILM-2026-QRN-789',
    holderName: 'Bilal Al-Habashi',
    competitionOrEventTitle: 'International Holy Quran Recitation Championship',
    rankOrHonor: 'First Place — Gold Sanad Diploma (Score: 94/100)',
    issueDate: 'October 3, 2026',
    verificationHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    authorizedSignatory: 'Sheikh Yusuf Karimi & Qari Hisham Al-Misri'
  },
  {
    id: 'ILM-2026-HAD-412',
    holderName: 'Zayd Ibn Harithah',
    competitionOrEventTitle: 'Global Sahih al-Bukhari Hadith Mastery Tournament',
    rankOrHonor: 'Grand Tournament Finalist — High Distinction',
    issueDate: 'October 2, 2026',
    verificationHash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    authorizedSignatory: 'Dr. Tariq Al-Hashimi'
  },
  {
    id: 'ILM-2026-SUM-105',
    holderName: 'Ahmad Al-Mansoor',
    competitionOrEventTitle: 'International IlmFlow Islamic Summit 2026',
    rankOrHonor: 'VIP Delegate & Continuing Islamic Legal Education (30 CLE Hours)',
    issueDate: 'October 1, 2026',
    verificationHash: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    authorizedSignatory: 'Secretariat General of IlmFlow'
  }
];

export const SEED_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '10:14:22 AM',
    actorRole: 'staff',
    actorName: 'Gate Officer Tariq',
    action: 'CHECKIN_VERIFIED',
    details: 'Verified Token ILM-PASS-901 for attendee Ahmad Al-Mansoor (VIP Pass).'
  },
  {
    id: 'log-2',
    timestamp: '09:45:10 AM',
    actorRole: 'judge',
    actorName: 'Qari Hisham Al-Misri',
    action: 'RUBRIC_GRADE_PUBLISHED',
    details: 'Assigned 94/100 to contestant Bilal Al-Habashi for Surah Maryam audition.'
  },
  {
    id: 'log-3',
    timestamp: '08:30:00 AM',
    actorRole: 'admin',
    actorName: 'Secretariat Admin',
    action: 'CAPACITY_QUOTA_INCREASED',
    details: 'Increased Summit 2026 Academic quota from 200 to 300 seats.'
  }
];

export const INITIAL_FORM_SCHEMA: FormSchema = {
  id: 'contestant-enrollment-v1',
  title: 'Championship Contestant Verification & Guardian Consent Form',
  version: 1,
  fields: [
    {
      id: 'f_full_name',
      type: 'text',
      label: 'Contestant Full Legal Name',
      placeholder: 'e.g. Abdullah Ibn Mas’ud',
      required: true
    },
    {
      id: 'f_age',
      type: 'number',
      label: 'Age in Lunar / Solar Years',
      placeholder: '18',
      required: true
    },
    {
      id: 'f_gender',
      type: 'gender',
      label: 'Gender Category',
      required: true,
      options: ['Brother / Male Division', 'Sister / Female Division']
    },
    {
      id: 'f_parent_consent',
      type: 'checkboxes',
      label: 'Parental / Legal Guardian Consent (Mandatory for Youth under 18)',
      required: false,
      conditionalOnField: 'f_age',
      conditionalValue: '17',
      options: [
        'I confirm I am the legal guardian and consent to tournament proctoring and public recitation broadcast.'
      ]
    },
    {
      id: 'f_qiraah_style',
      type: 'dropdown',
      label: 'Selected Riwayah / Qira’ah',
      required: true,
      options: [
        'Hafs an Asim (حفص عن عاصم)',
        'Warsh an Nafi (ورش عن نافع)',
        'Qalun an Nafi (قالون عن نافع)',
        'Al-Duri an Abi Amr (الدوري عن أبي عمرو)'
      ]
    },
    {
      id: 'f_signature',
      type: 'signature',
      label: 'Contestant Digital Attestation & Oath of Integrity',
      required: true
    }
  ]
};
