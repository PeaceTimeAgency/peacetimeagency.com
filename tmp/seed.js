const fs = require('fs');
const path = require('path');

const MOCK_DB_PATH = path.join('c:', 'Users', 'SATCO', 'OneDrive', 'Documents', 'PTA003', 'mock-db.json');
const db = JSON.parse(fs.readFileSync(MOCK_DB_PATH, 'utf-8'));

if (!db.settings) db.settings = {};

if (!db.settings.applyPage) {
  db.settings.applyPage = {
    title: "Creator Intake Form",
    description: "Join Peace Time Agency and level up your TikTok LIVE experience! We're here to support your growth, battles, and experiences in a positive creator network. Please fill out the following questions honestly and completely.",
    certificationText: "I certify that all information provided is accurate and belongs to me.",
    questions: [
      {
        id: "is18Plus",
        type: "radio",
        question: "1. Are you 18 years or older?",
        required: true,
        options: ["Yes", "No"],
        helpText: "Must be 18+ to join and participate in LIVE features.",
      },
      {
        id: "isUSCA",
        type: "radio",
        question: "2. Are you located in the United States or Canada?",
        required: true,
        options: ["Yes", "No"],
        helpText: "Our primary support and features focus on US/CA creators at this time.",
      },
      {
        id: "streamingCountry",
        type: "text",
        question: "What country are you streaming from?",
        required: true,
        showIf: { questionId: "isUSCA", equals: "No" }
      },
      {
        id: "contentTypes",
        type: "checkbox",
        question: "3. What type of content do you make on TikTok LIVE? (Select up to 3)",
        required: true,
        options: [
          "Just Chatting / Casual Talk", "Gaming / Gameplay", "IRL (In Real Life) / Daily Life",
          "Talent Shows / Singing, Dancing, Performances", "Battles / PK / LIVE Matches",
          "Educational / Tutorials / Advice", "Q&A / Fan Interaction", "Other (please specify below)"
        ],
        helpText: "Choose the categories that best describe your LIVE style/content.",
      },
      {
        id: "otherContentType",
        type: "text",
        question: "Please describe your other content type",
        required: true,
        showIf: { questionId: "contentTypes", equals: "Other (please specify below)" }
      },
      {
        id: "nicheDescription",
        type: "textarea",
        question: "4. Please describe your niche/style (e.g. gaming format, IRL vibe, specific talent).",
        required: true,
        helpText: "This helps us understand your vibe and how we can best support you.",
      },
      {
        id: "liveFrequency",
        type: "radio",
        question: "5. How often do you plan to go LIVE per week?",
        required: true,
        options: ["0–2 times", "3–5 times", "6–10 times", "10+ times / Almost daily"],
        helpText: "Consistency helps us plan support and campaigns for you.",
      },
      {
        id: "averageSessionLength",
        type: "radio",
        question: "6. What is your average LIVE session length?",
        required: true,
        options: ["Under 1 hour", "1–2 hours", "2–4 hours", "4+ hours"],
        helpText: "This helps us tailor tips and scheduling advice.",
      },
      {
        id: "streamingDuration",
        type: "radio",
        question: "7. How long have you been streaming on TikTok LIVE?",
        required: true,
        options: ["Less than 1 month", "1 to 3 months", "3 to 6 months", "6 to 12 months", "1+ years"],
      },
      {
        id: "streamingGoals",
        type: "textarea",
        question: "8. What are your goals for streaming?",
        required: true,
        helpText: "(Example: full-time income, growing a community, content creation, gaming career, etc.)",
      },
      {
        id: "improvements",
        type: "checkbox",
        question: "9. What do you want to improve most right now? (Select all that apply)",
        required: true,
        options: ["Growing followers", "Monetization", "Viewer engagement", "Stream setup / overlays", "Content strategy", "Other"],
      },
      {
        id: "otherImprovement",
        type: "text",
        question: "Please specify what else you want to improve",
        required: true,
        showIf: { questionId: "improvements", equals: "Other" }
      },
      {
        id: "followerCount",
        type: "text",
        question: "10. What is your current follower count?",
        required: true,
        helpText: "e.g. 5,000",
      },
      {
        id: "receivesGifts",
        type: "radio",
        question: "11. Do you currently receive gifts on LIVE?",
        required: true,
        options: ["Yes regularly", "Sometimes", "Rarely", "Not yet"],
      },
      {
        id: "biggestChallenge",
        type: "textarea",
        question: "12. What is your biggest challenge with streaming right now?",
        required: true,
      },
      {
        id: "openToCoaching",
        type: "radio",
        question: "13. Are you open to coaching and feedback to grow your streams?",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "otherAgency",
        type: "radio",
        question: "14. Do you currently belong to another TikTok LIVE agency?",
        required: true,
        options: ["Yes", "No"],
      },
      {
        id: "otherAgencyName",
        type: "text",
        question: "Agency Name",
        required: true,
        showIf: { questionId: "otherAgency", equals: "Yes" }
      },
      {
        id: "tiktokHandle",
        type: "text",
        question: "15. TikTok Username (@)",
        required: true,
        helpText: "Please provide your current main TikTok handle so we can review your profile.",
      },
      {
        id: "discordId",
        type: "text",
        question: "16. Discord ID",
        required: false,
        helpText: "Highly recommended! We use Discord for community chats, updates, training, and quick support.",
      },
      {
        id: "emailAddress",
        type: "text",
        question: "17. Email Address",
        required: false,
      },
      {
        id: "additionalNotes",
        type: "textarea",
        question: "Additional Notes (Optional)",
        required: false,
      }
    ]
  };
  fs.writeFileSync(MOCK_DB_PATH, JSON.stringify(db, null, 2));
  console.log('Seed successful');
} else {
  console.log('Already seeded');
}
