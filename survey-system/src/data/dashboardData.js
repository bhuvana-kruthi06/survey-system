// Mock survey results data — replace with real API call later
// Shape matches what your backend will return
 
export const surveyMeta = {
  title: "Customer Experience Survey",
  description: "Feedback from customers about product experience.",
  totalResponses: 248,
  completionRate: 87,
  avgTime: "2m 34s",
  lastResponse: "2 hours ago",
};
 
export const questionResults = [
  {
    id: "q1",
    type: "radio",
    text: "How did you first hear about us?",
    totalAnswered: 248,
    data: [
      { label: "Search engine", count: 92 },
      { label: "Social media", count: 74 },
      { label: "Friend or colleague", count: 48 },
      { label: "Advertisement", count: 22 },
      { label: "Blog or article", count: 12 },
    ],
  },
  {
    id: "q2",
    type: "checkbox",
    text: "Which features do you use most often?",
    totalAnswered: 231,
    data: [
      { label: "Survey builder", count: 178 },
      { label: "Results dashboard", count: 156 },
      { label: "Data export", count: 112 },
      { label: "Team collaboration", count: 89 },
      { label: "Templates library", count: 64 },
      { label: "API integrations", count: 41 },
    ],
  },
  {
    id: "q3",
    type: "rating",
    text: "How satisfied are you with our product overall?",
    totalAnswered: 244,
    average: 7.8,
    data: [
      { label: "1", count: 3 },
      { label: "2", count: 4 },
      { label: "3", count: 6 },
      { label: "4", count: 9 },
      { label: "5", count: 18 },
      { label: "6", count: 24 },
      { label: "7", count: 38 },
      { label: "8", count: 62 },
      { label: "9", count: 51 },
      { label: "10", count: 29 },
    ],
  },
  {
    id: "q4",
    type: "radio",
    text: "How likely are you to recommend us to a friend or colleague?",
    totalAnswered: 241,
    data: [
      { label: "Definitely would", count: 98 },
      { label: "Probably would", count: 82 },
      { label: "Not sure", count: 34 },
      { label: "Probably not", count: 18 },
      { label: "Definitely not", count: 9 },
    ],
  },
  {
    id: "q5",
    type: "textarea",
    text: "Any additional comments or suggestions?",
    totalAnswered: 143,
    samples: [
      "Love the clean interface, very easy to use!",
      "Would love dark mode support in the future.",
      "The dashboard charts are very helpful for quick insights.",
      "Please add more export formats like Excel.",
      "Great product overall, customer support is excellent.",
      "The survey builder is intuitive and saves a lot of time.",
    ],
  },
];
 
// Trend data for the line chart (responses over last 7 days)
export const trendData = [
  { day: "Mon", responses: 28 },
  { day: "Tue", responses: 42 },
  { day: "Wed", responses: 35 },
  { day: "Thu", responses: 51 },
  { day: "Fri", responses: 47 },
  { day: "Sat", responses: 29 },
  { day: "Sun", responses: 16 },
];
 