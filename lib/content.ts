/*
  All wedding text lives here. Edit this file to change anything guests see.
  Leave a field as "" (empty) or [] to hide it on the site.
  Content is taken from the printed card (PDF) and written in English.
*/
export const WEDDING = {
  config: {
    // Countdown counts down to the wedding ceremony (4:00 AM after Wednesday night, India time).
    countdownTo: "2026-12-10T04:00:00+05:30",
    // Background song (starts when the doors open). Replace the file in public/ to change it; set "" to turn music off.
    music: "/music-rajasthani.m4a" // "Free Soul Indian Rajasthani Style Cinematic Music" by kalsstockmedia (Pixabay, royalty-free)
  },

  couple: {
    groom: "Ravi",
    bride: "Priyanka",
    groomFull: "Ravindra",
    groomNick: "Ravi",
    brideFull: "Saumya",
    brideNick: "Priyanka",
    monogram: ["R", "P"]
  },

  text: {
    blessing: "Shree Ganeshay Namah",
    tapToOpen: "Tap the seal to open",
    envelopeFor: "A personal invitation for",
    guestDefault: "You & Your Family",

    heroEyebrow: "Together with their families",
    heroDate: { weekday: "Wednesday", day: "09", month: "December", year: "2026" },
    heroPlace: "Pindwara · Rajasthan",
    scroll: "Scroll",

    welcomeEyebrow: "A personal invitation",
    welcomeDear: "Dear",
    welcomeText: "By the boundless grace of the Almighty and the blessings of our elders, our family is celebrating the wedding of our son. Your presence would be the greatest blessing on this joyous occasion.",
    welcomeSign: "With love, the Parmar family",

    countdownEyebrow: "Counting down",
    countdownTitle: "Until the auspicious moment",
    countdownSub: "Wednesday night, 9 December 2026",
    units: ["Days", "Hours", "Minutes", "Seconds"],
    countdownDone: "Today is the wedding day!",

    inviteEyebrow: "The invitation",
    invocations: [
      "Shree Ganeshay Namah", "Shri Dharti Matay Namah", "Shri Parmatmay Namah",
      "Shri Naklang Devay Namah", "Shri Saraswati Matay Namah"
    ],
    doha: "Peli devat sumarlo Gajanand ko naam,\nsukh sampat seva kare to toy kare siddh kaam.",
    dohaMeaning: "Before all else, remember the name of Lord Gajanand. Serve him, and he blesses us with joy and prosperity and brings every task to fulfilment. He is the son of Goddess Parvati, named Ganpati by his father, Lord Shankar.",
    graceLine: "By the boundless grace of the Almighty, our family joyfully announces the wedding of",
    groomLine: "Ravindra Parmar (Ravi)",
    groomFamily: [
      "Grandson of Smt. Tulsidevi & the late Shri Anaji Parmar",
      "Son of Smt. Bebydevi & Shri Bhanwarlalji Parmar",
      "Village Pindwara, District Sirohi, Rajasthan – 307022"
    ],
    withWord: "with",
    brideLine: "Saumya (Priyanka)",
    brideFamily: [
      "Granddaughter of the late Shri Govind Das Prajapati",
      "Daughter of Smt. Krishna Kumari & the late Shri Narendra Kumar Prajapati",
      "Shri Ramsevak Prajapati",
      "Omkar Tower, G.B. Sakpal Marg, Saat Rasta, Mahalakshmi, opposite Tata Trust Small Animal Hospital, Mumbai – 400011"
    ],
    muhurat: "Their wedding has been fixed for Wednesday, 9 December 2026 — Samvat 2083, Paush Sudi Ekam.",
    request: "We warmly request you to grace this auspicious occasion with your family and bless the bride and groom.",

    baraatEyebrow: "The Baraat",
    baraatTitle: "Join the Procession",
    baraatText: "On Wednesday night, 9 December 2026, at 11:30 PM, the baraat will set out from the home of Shri Bhanwarlalji Anaji Parmar in Padmavati Colony and arrive at Mateshwari Hotel & Restaurant (Circle Pindwara, NH-27, Kojra, Rajasthan).",
    baraatHint: "Scroll to walk with the baraat",
    baraatTagline: "Dance with us to the beat of the dhol, under the stars.",
    baraatTime: "Wed, 9 Dec · 11:30 PM",
    baraatFrom: "Padmavati Colony",
    baraatFromSub: "Home of Shri Bhanwarlalji Anaji Parmar",
    baraatTo: "Mateshwari Hotel",
    baraatToSub: "& Restaurant · Circle Pindwara, NH-27, Kojra",
    baraatMap: "Mateshwari Hotel and Restaurant, Pindwara Circle, NH 27, Kojra, Rajasthan",

    eventsEyebrow: "Celebrations",
    eventsTitle: "Wedding Festivities",
    eventsDoha: "Vighna haran mangal karan, Gannayak Ganraj,\npratham nimantran aapko, pooran karjo kaaj.",
    eventsDohaMeaning: "O remover of obstacles and bringer of good fortune, Lord of the Ganas — our very first invitation is to you. Please bless these celebrations to completion.",
    addCalendar: "Add to calendar",
    openMap: "Directions",

    familyEyebrow: "With warm regards",
    familyTitle: "Our Family",
    familyText: "Awaiting your gracious presence with love",

    contactEyebrow: "Questions?",
    contactTitle: "Get in touch",
    call: "Call",

    closingEyebrow: "With love and blessings",
    closingTitle: "We await your gracious presence",
    inviterLabel: "Invited by",
    inviter: "Shri Bhanwarlalji Parmar",
    inviterNote: "son of the late Shri Anaji Parmar",
    inviterAddress: "Village Pindwara, District Sirohi, Rajasthan – 307022",
    mithiTitle: "A sweet request",
    mithiText: "Please, please come to our Mamaji's wedding!",
    mithiFrom: "With love from",
    mithiNames: "Monika, Girish, Mahi, Yahvi, Vedanshi, Advika, Daksh, Mishrut, Kaushal, Harsh, Nakshit & Khushal",
    footer: "Shree Ganeshay Namah · Ravi & Priyanka · 09.12.2026"
  },

  // Celebrations, shown as arched cards. Times are India time.
  events: [
    {
      id: "bandoli",
      icon: "diya",
      name: "Bandoli",
      note: "A joyful pre-wedding evening of music, blessings and celebration",
      day: "Tuesday", date: "8 December 2026", time: "9:00 PM",
      venue: "Parmar residence, Padmavati Colony, Pindwara",
      start: "2026-12-08T21:00:00+05:30", end: "2026-12-08T23:30:00+05:30",
      mapQuery: "Padmavati Colony, Pindwara, Rajasthan 307022"
    },
    {
      id: "vivah",
      icon: "mandap",
      name: "The Wedding",
      note: "Shubh Vivah — sacred vows beneath the mandap",
      day: "Wednesday", date: "9 December 2026", time: "Night, 4:00 AM",
      venue: "Mateshwari Hotel & Restaurant, Pindwara",
      start: "2026-12-10T04:00:00+05:30", end: "2026-12-10T07:00:00+05:30",
      mapQuery: "Mateshwari Hotel and Restaurant, Pindwara Circle, NH 27, Kojra, Rajasthan"
    },
    {
      id: "pratibhoj",
      icon: "thali",
      name: "Reception Feast",
      note: "Pratibhoj — a celebratory meal with family and friends",
      day: "Thursday", date: "10 December 2026", time: "12 noon – 4:00 PM",
      venue: "Mateshwari Hotel & Restaurant, Pindwara",
      start: "2026-12-10T12:00:00+05:30", end: "2026-12-10T16:00:00+05:30",
      mapQuery: "Mateshwari Hotel and Restaurant, Pindwara Circle, NH 27, Kojra, Rajasthan"
    }
  ],

  // Family lists from the inside card. Empty groups are hidden.
  family: [
    {
      title: "Eagerly Awaiting You", tab: "Awaiting You", sub: "Darshanabhilashi",
      names: [
        "Smt. Tulsidevi & the late Shri Anaji Parmar",
        "Smt. Jamnadevi & Shri Raghunathji Parmar",
        "Smt. Shantidevi & Shri Veeraramji Parmar",
        "The late Smt. Savitadevi & Shri Chelaramji Parmar",
        "Smt. Bebydevi & Shri Bhanwarlalji Parmar",
        "Smt. Mamtadevi & Shri Dineshji Parmar",
        "Smt. Mamtadevi & Shri Yogeshji Parmar"
      ],
      extra: [
        "Pradeep, Hitesh, Jitendra, Ganpat, Bhavesh, Dilip, Khushal",
        "Veenakumari, Lalitakumari, Kanyakumari",
        "Tanisha, Mayank, Manan, Harshil, Ruhi, Rajveer"
      ]
    },
    {
      title: "Sons-in-law & Daughters", tab: "Sons-in-law", sub: "Jamai Paksh",
      names: [
        "Smt. Falgunidevi & Shri Kaluramji Devda",
        "Smt. Savitadevi & Shri Gopalji Bhati",
        "Smt. Vimladevi & Shri Mahendraji Gehlot",
        "Smt. Kamladevi & Shri Shankarlalji Bhati",
        "Smt. Bhavnadevi & Shri Punaramji Gehlot",
        "Smt. Sonaldevi & Shri Chiragji Gehlot"
      ]
    },
    {
      title: "Maternal Family", tab: "Maternal", sub: "Nanihal Paksh",
      names: [
        "Smt. Nenudevi & Shri Kesharamji Bhati",
        "Smt. Vimladevi & Shri Ganeshji Bhati",
        "Smt. Leeladevi & Shri Himmatji Bhati",
        "Smt. Monikadevi & Shri Mahendraji Bhati",
        "and the entire Bhati family"
      ]
    }
  ],

  contacts: [
    { name: "Shri Bhanwarlalji Parmar", phone: "9820162732" },
    { name: "Shri Veeraramji Parmar", phone: "9819183391" },
    { name: "Ravi Parmar", phone: "7303366970" },
    { name: "Khushal Parmar", phone: "8976352508" }
  ]
};

export type Wedding = typeof WEDDING;
export type WeddingEvent = (typeof WEDDING.events)[number];
export type FamilyGroup = (typeof WEDDING.family)[number];
