// Mock data for dashboard demo mode

export const mockFeatureUsage = [
  { name: "Audio Translation", value: 8432 },
  { name: "Tiered Language Glossary", value: 5621 },
  { name: "Talk to Teacher", value: 3847 },
];

export const mockLanguageDistribution = [
  { name: "Spanish", value: 35 },
  { name: "Arabic", value: 18 },
  { name: "Dari/Pashto", value: 15 },
  { name: "Somali", value: 12 },
  { name: "Swahili", value: 8 },
  { name: "Mandarin", value: 6 },
  { name: "Vietnamese", value: 4 },
  { name: "Other", value: 2 },
];

export const mockProgressData = [
  { date: "Nov 15", sessions: 42, translations: 156, vocabulary: 89 },
  { date: "Nov 18", sessions: 38, translations: 142, vocabulary: 76 },
  { date: "Nov 21", sessions: 55, translations: 198, vocabulary: 112 },
  { date: "Nov 24", sessions: 48, translations: 175, vocabulary: 95 },
  { date: "Nov 27", sessions: 62, translations: 234, vocabulary: 128 },
  { date: "Nov 30", sessions: 45, translations: 168, vocabulary: 88 },
  { date: "Dec 3", sessions: 71, translations: 267, vocabulary: 145 },
  { date: "Dec 6", sessions: 58, translations: 212, vocabulary: 118 },
  { date: "Dec 9", sessions: 67, translations: 245, vocabulary: 134 },
  { date: "Dec 12", sessions: 73, translations: 278, vocabulary: 152 },
];

export const mockAnalyticsData = [
  {
    type: "translation",
    description: "Student translated science vocabulary passage with audio playback",
    language: "Arabic",
    time: "2 minutes ago",
    grade: "Grade 5",
  },
  {
    type: "glossary",
    description: "Accessed tiered vocabulary for math academic terms",
    language: "Spanish",
    time: "5 minutes ago",
    grade: "Grade 7",
  },
  {
    type: "glossary",
    description: "15 math terms reviewed in tiered language glossary",
    language: "Dari",
    time: "12 minutes ago",
    grade: "Grade 4",
  },
  {
    type: "talk_to_teacher",
    description: "Student asked clarifying question about assignment",
    language: "Somali",
    time: "18 minutes ago",
    grade: "Grade 6",
  },
  {
    type: "translation",
    description: "Reading comprehension passage translated with audio",
    language: "Pashto",
    time: "25 minutes ago",
    grade: "Grade 8",
  },
  {
    type: "talk_to_teacher",
    description: "Two-way communication for assignment feedback",
    language: "Ukrainian",
    time: "32 minutes ago",
    grade: "Grade 3",
  },
];

export const mockDistricts = [
  {
    id: "1",
    name: "Cleveland Metropolitan School District",
    schools: 12,
    teachers: 48,
    students: 2340,
  },
  {
    id: "2",
    name: "Akron Public Schools",
    schools: 8,
    teachers: 32,
    students: 1560,
  },
  {
    id: "3",
    name: "Canton City Schools",
    schools: 6,
    teachers: 24,
    students: 890,
  },
];

export const mockSchools = [
  {
    id: "1",
    name: "Lincoln Elementary",
    districtId: "1",
    teachers: 6,
    students: 245,
    grades: ["K", "1", "2", "3", "4", "5"],
  },
  {
    id: "2",
    name: "Washington Middle School",
    districtId: "1",
    teachers: 8,
    students: 412,
    grades: ["6", "7", "8"],
  },
  {
    id: "3",
    name: "Roosevelt High School",
    districtId: "1",
    teachers: 12,
    students: 678,
    grades: ["9", "10", "11", "12"],
  },
];

export const mockTeachers = [
  {
    id: "1",
    name: "Maria Santos",
    email: "m.santos@cmsd.edu",
    school: "Lincoln Elementary",
    grade: "Grade 3",
    students: 24,
    lastActive: "Today",
  },
  {
    id: "2",
    name: "James Wilson",
    email: "j.wilson@cmsd.edu",
    school: "Lincoln Elementary",
    grade: "Grade 5",
    students: 28,
    lastActive: "Today",
  },
  {
    id: "3",
    name: "Sarah Chen",
    email: "s.chen@cmsd.edu",
    school: "Washington Middle School",
    grade: "Grade 7",
    students: 32,
    lastActive: "Yesterday",
  },
];
