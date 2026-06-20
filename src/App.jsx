import React, { useState, useMemo } from "react";
import {
  Lock,
  CheckCircle2,
  XCircle,
  Trophy,
  ChevronRight,
  RotateCcw,
  ArrowLeft,
  BookOpen,
  Flame,
  Award,
} from "lucide-react";

/* ============================================================
   PIAIC – Agent Factory MCQ Exam App
   Module 1 built from File 1: "The AI Agent Factory — Orientation"
   Pass mark: 70%. Clear a module to unlock the next one.
   Questions are written in simple English.
   ============================================================ */

const NAVY = "#0f2942";
const NAVY_SOFT = "#1b3a5c";
const TEAL = "#0d9488";
const TEAL_DK = "#0f766e";
const AMBER = "#f59e0b";

const PASS_MARK = 70; // percent

// ---- Module 1 questions (from File 1) ----
const MODULE_1 = [
  {
    q: "The AI Agent Factory is called a canonical source for which era of AI Tools?",
    options: ["The First Era", "The Second Era", "The Third Era", "The Fourth Era"],
    answer: 2,
    why: "The book is the canonical source for the Third Era of AI Tools.",
  },
  {
    q: "What does the word \"canonical\" mean in this book?",
    options: [
      "A copy of another book",
      "The authoritative source that everything else is built from",
      "A short summary",
      "A list of rules",
    ],
    answer: 1,
    why: "Canonical = the authoritative source, the one master version everything else is built from.",
  },
  {
    q: "The Agent Factory is delivered through how many channels?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 2,
    why: "It reaches readers through a four-channel ecosystem.",
  },
  {
    q: "Which of these is NOT one of the four delivery channels?",
    options: ["The Book", "TutorClaw", "Skillpack", "The Marketplace"],
    answer: 3,
    why: "The four channels are The Book, TutorClaw, Skillpack, and Derivative Books.",
  },
  {
    q: "The terms Digital FTE, Digital Worker and AI Worker all mean the same thing. What is it?",
    options: [
      "A human employee",
      "A role-based AI agent that does structured work under human oversight",
      "A type of computer chip",
      "A cloud server",
    ],
    answer: 1,
    why: "All three names mean a role-based AI agent that performs structured work under human oversight.",
  },
  {
    q: "Which term does \"the thesis\" use as its technical term?",
    options: ["Digital FTE", "AI Worker", "Digital Worker", "Robot"],
    answer: 1,
    why: "The thesis uses \"AI Worker\" as its technical term.",
  },
  {
    q: "Which term does the book use as its business-facing term?",
    options: ["AI Worker", "Digital FTE", "Machine", "Agent Harness"],
    answer: 1,
    why: "The book uses \"Digital FTE\" as its business-facing term.",
  },
  {
    q: "What can Digital FTEs do that is different from human employees?",
    options: [
      "Take lunch breaks",
      "Operate continuously, scale instantly, and be deployed in large numbers",
      "Work only during office hours",
      "Get tired after long work",
    ],
    answer: 1,
    why: "Digital FTEs can operate continuously, scale instantly, and be deployed in large numbers.",
  },
  {
    q: "A workforce that combines human judgment with machine intelligence forms what kind of company?",
    options: ["A Traditional Company", "An AI-Native Company", "A Factory Company", "A Cloud Company"],
    answer: 1,
    why: "Humans plus Digital FTEs form a hybrid workforce — an AI-Native Company.",
  },
  {
    q: "The \"Five-Layer Cake of AI\" metaphor was popularized by whom?",
    options: ["Sam Altman", "Dario Amodei", "Jensen Huang, CEO of NVIDIA", "Alexis Ohanian"],
    answer: 2,
    why: "The metaphor was popularized by Jensen Huang, CEO of NVIDIA.",
  },
  {
    q: "In the Five-Layer Cake, which layer is at the very base (Layer 1)?",
    options: ["Applications", "Models", "Chips", "Energy"],
    answer: 3,
    why: "Layer 1 is Energy — the foundational power for all AI systems.",
  },
  {
    q: "Which layer of the cake is Layer 2?",
    options: ["Energy", "Chips", "Models", "Applications"],
    answer: 1,
    why: "Layer 2 is Chips — the specialized processors that do the calculations.",
  },
  {
    q: "In the Five-Layer Cake, what sits at the very top (Layer 5)?",
    options: ["Energy", "Infrastructure", "Applications", "Chips"],
    answer: 2,
    why: "Layer 5 is Applications — the end-user products and services.",
  },
  {
    q: "What does Layer 3 (Infrastructure) refer to?",
    options: ["Power plants", "Physical data centers and supercomputers", "End-user apps", "Neural networks"],
    answer: 1,
    why: "Layer 3 is the physical data centers and supercomputers that house and run the hardware.",
  },
  {
    q: "What does Layer 4 (Models) refer to?",
    options: [
      "Power supply",
      "The software algorithms and neural networks that form the intelligence of AI",
      "Computer chips",
      "End-user apps",
    ],
    answer: 1,
    why: "Layer 4 is the Models — the software algorithms and neural networks (often open-source).",
  },
  {
    q: "In Mode 1 (Problem-solving engagement), what happens after the problem is solved?",
    options: ["A custom agent keeps running", "The session ends", "A new agent is built", "The book is updated"],
    answer: 1,
    why: "Mode 1: General Agent → Problem Solution → Session Ends (direct use for an immediate outcome).",
  },
  {
    q: "What is the main goal of Mode 2 (Manufacturing engagement)?",
    options: [
      "To solve a quick problem and stop",
      "To build a custom AI Worker that keeps running after the session ends",
      "To read the book",
      "To delete old agents",
    ],
    answer: 1,
    why: "Mode 2 uses a general agent to manufacture a custom AI Worker that keeps running after the session.",
  },
  {
    q: "TutorClaw is described as which channel?",
    options: ["The Book", "The personal AI tutor that runs 24/7", "The building partner", "A derivative book"],
    answer: 1,
    why: "TutorClaw is the canonical source teaching itself — your personal AI tutor running 24/7.",
  },
  {
    q: "On which platforms can you reach TutorClaw?",
    options: ["Only email", "WhatsApp, Telegram, and web", "Only a desktop app", "Only inside Claude Code"],
    answer: 1,
    why: "TutorClaw meets learners on WhatsApp, Telegram, and the web.",
  },
  {
    q: "The Skillpack runs inside which kind of tools?",
    options: [
      "Only web browsers",
      "Claude Code, OpenCode, and any SKILL.md-honoring tool",
      "Only mobile games",
      "Only spreadsheets",
    ],
    answer: 1,
    why: "The Skillpack runs inside Claude Code, OpenCode, or any SKILL.md-honoring tool.",
  },
  {
    q: "In the 10-80-10 pattern applied to learning, what does the book set?",
    options: ["The execution", "The intent (the first 10%)", "The final verification", "The pricing"],
    answer: 1,
    why: "The book sets the intent — the first 10% (domain knowledge, frameworks, standards).",
  },
  {
    q: "In the 10-80-10 pattern, who or what handles the 80% (execution)?",
    options: ["The reader alone", "TutorClaw and the Agent Factory Skillpack", "The energy layer", "NVIDIA"],
    answer: 1,
    why: "TutorClaw and the Skillpack handle execution — the personalized teaching and step-by-step building.",
  },
  {
    q: "In the 10-80-10 pattern, what is the final 10%?",
    options: [
      "Reading the book again",
      "Your professional judgment that verifies the outcome",
      "Buying a new tool",
      "Writing a new book",
    ],
    answer: 1,
    why: "The final 10% is your professional judgment that verifies the agent is correct and the work is sound.",
  },
  {
    q: "According to the book, Claude Code and OpenCode are:",
    options: [
      "Competitors fighting each other",
      "Two expressions of the same discipline",
      "Two different books",
      "Two energy layers",
    ],
    answer: 1,
    why: "They are not competitors — they are two expressions of the same discipline. Method is constant, tool is the variable.",
  },
  {
    q: "Derivative books are specialized along which two axes?",
    options: ["Price and size", "Topic and audience", "Color and shape", "Speed and memory"],
    answer: 1,
    why: "Derivative books are specialized by topic or by audience, while keeping the same methodology.",
  },
  {
    q: "Which group is called \"The Builders\" in this book?",
    options: [
      "Enterprise Executives",
      "Domain Experts",
      "AI Developers, Software Engineers & Platform Architects",
      "Department Leaders",
    ],
    answer: 2,
    why: "AI Developers, Software Engineers & Platform Architects are \"The Builders\".",
  },
  {
    q: "Which cloud-native technologies are mentioned for building scalable systems?",
    options: ["Excel, Word, PowerPoint", "Docker, Kubernetes, Dapr", "Photoshop, Figma", "WhatsApp, Telegram"],
    answer: 1,
    why: "Builders use cloud-native architectures: Docker, Kubernetes, and Dapr.",
  },
  {
    q: "Department Leaders & Operational Teams are given which nickname?",
    options: ["The Builders", "The Operators", "The Thinkers", "The Owners"],
    answer: 1,
    why: "Department Leaders & Operational Teams are called \"The Operators\".",
  },
  {
    q: "Which CEO talked about a one-person billion-dollar company in January 2024?",
    options: ["Jensen Huang", "Sam Altman, of OpenAI", "Dario Amodei", "Alexis Ohanian"],
    answer: 1,
    why: "Sam Altman (OpenAI) spoke about a one-person billion-dollar company in January 2024.",
  },
  {
    q: "Dario Amodei (Anthropic CEO) named which categories as most likely for the first single-person billion-dollar company?",
    options: [
      "Farming, fishing, mining",
      "Developer tools, automated customer service, and proprietary trading",
      "Movies, music, gaming",
      "Hotels, airlines, tourism",
    ],
    answer: 1,
    why: "Amodei named developer tools, automated customer service, and proprietary trading.",
  },
  {
    q: "What is the \"system of record\" in the Agent Factory pattern?",
    options: ["TutorClaw", "The book (the canonical source of truth)", "The Skillpack", "The energy layer"],
    answer: 1,
    why: "The book is the system of record — the canonical source of truth that everything else trusts.",
  },
];

// ---- Module 2 questions (from File 2: Foundations — Start in the Browser) ----
const MODULE_2 = [
  {
    q: "According to the Foundations chapter, where should you START doing your AI work?",
    options: ["On your computer's terminal", "In a browser tab (a website)", "Inside a mobile game", "On a special AI machine"],
    answer: 1,
    why: "You learn all six skills right in a browser tab — that is where most real AI work happens.",
  },
  {
    q: "Which websites does the chapter say you can use to learn all six skills?",
    options: ["Facebook, Instagram, YouTube", "Claude.ai, ChatGPT, or Gemini", "Gmail, Outlook, Yahoo", "Amazon, eBay, Daraz"],
    answer: 1,
    why: "Open Claude.ai, ChatGPT, or Gemini — type what you want and get work back.",
  },
  {
    q: "What is one big benefit of starting in the browser?",
    options: [
      "It costs a lot of money",
      "Nothing to install, and no risk to your own computer",
      "It only works at night",
      "You must be a coder first",
    ],
    answer: 1,
    why: "Nothing to install and no risk to your own computer — if you can use a website, you can do all six.",
  },
  {
    q: "Soon the book splits into two paths. What are they?",
    options: [
      "Reading and sleeping",
      "Using AI to do your own work faster, and building AI Workers that do the work for you",
      "Buying and selling computers",
      "Writing and deleting files",
    ],
    answer: 1,
    why: "The two paths are: using AI to work faster yourself, and building AI Workers that do the work for you.",
  },
  {
    q: "How many Foundations courses are there?",
    options: ["Four", "Five", "Six", "Ten"],
    answer: 2,
    why: "There are six Foundations courses — the skills every reader needs before picking a path.",
  },
  {
    q: "\"Start in the browser. Graduate when you need to.\" What changes when you graduate?",
    options: [
      "The skills you learned",
      "Where your work lives (browser vs your machine)",
      "The price of the course",
      "Your internet speed",
    ],
    answer: 1,
    why: "Same skills everywhere — what changes is where your work lives.",
  },
  {
    q: "When should you \"graduate\" to your own machine?",
    options: ["Never", "When the AI needs to touch your real files", "On the first day", "Only on weekends"],
    answer: 1,
    why: "You graduate to your machine when the AI needs to touch your real files directly.",
  },
  {
    q: "Which tool is described as \"desktop apps, for non-coders\"?",
    options: ["Claude Code / OpenCode", "Cowork / OpenWork", "ChatGPT", "Gemini"],
    answer: 1,
    why: "Cowork / OpenWork are the desktop apps for non-coders.",
  },
  {
    q: "Which tool is described as \"the terminal, for people who work with code\"?",
    options: ["Cowork / OpenWork", "Claude Code / OpenCode", "Gemini", "The browser"],
    answer: 1,
    why: "Claude Code / OpenCode is the terminal, for people who work with code.",
  },
  {
    q: "Which course teaches \"how to ask, so you get what you actually wanted\"?",
    options: ["AI Prompting", "Code You Never Write", "Skills & Connectors", "Markdown In, HTML Out"],
    answer: 0,
    why: "AI Prompting is about how to ask so you get what you actually wanted.",
  },
  {
    q: "Which course is about \"the two simple document languages every agent speaks\"?",
    options: ["AI Prompting", "Markdown In, HTML Out", "How to Think in the AI Era", "What AI Actually Is"],
    answer: 1,
    why: "Markdown In, HTML Out covers the two simple document languages every agent speaks.",
  },
  {
    q: "What does the \"Code You Never Write\" course let you do?",
    options: [
      "Become a professional gamer",
      "Get AI to write, run, and check code for you, even if you never coded",
      "Delete all your files",
      "Build a new computer by hand",
    ],
    answer: 1,
    why: "It lets you get AI to write, run, and check code for you, even if you have never coded.",
  },
  {
    q: "What is the main idea of \"Skills & Connectors\"?",
    options: [
      "Teach AI a task once, then give it safe access to your real apps",
      "Learn how to type fast",
      "Buy new software every month",
      "Watch videos all day",
    ],
    answer: 0,
    why: "Teach AI a task once, then give it safe access to your real apps.",
  },
  {
    q: "Which course teaches \"when to reach for AI, when not to, and how to frame the problem\"?",
    options: ["What AI Actually Is", "How to Think in the AI Era", "AI Prompting", "Code You Never Write"],
    answer: 1,
    why: "How to Think in the AI Era teaches when to use AI, when not to, and how to frame the problem.",
  },
  {
    q: "What signal tells you that you are ready for the next group (General Agents)?",
    options: [
      "When your battery is low",
      "When uploading your files into the chat every time starts to feel slow",
      "When you finish one course",
      "When you change your password",
    ],
    answer: 1,
    why: "When uploading files into the chat every time feels slow, you are ready for agents that live on your computer.",
  },
];

// ---- Module 3 questions (from File 3: What AI Actually Is — 9 Ideas) ----
const MODULE_3 = [
  {
    q: "The crash course explains AI using how many big ideas?",
    options: ["Three", "Six", "Nine", "Twelve"],
    answer: 2,
    why: "Nine ideas, no math and no code — the one thing the other five courses assume you already understand.",
  },
  {
    q: "The nine ideas are grouped into how many parts?",
    options: ["Two", "Three", "Four", "Nine"],
    answer: 1,
    why: "Three parts: The machine, Why it behaves this way, and From predictor to agent.",
  },
  {
    q: "What is the single core idea (Idea 1) of how a language model works?",
    options: [
      "It looks up answers in a big database",
      "It predicts what text most plausibly comes next, one small piece at a time",
      "It copies answers from Google",
      "It asks a human for help",
    ],
    answer: 1,
    why: "A language model predicts the most plausible next piece of text, one small piece (token) at a time.",
  },
  {
    q: "A good picture for a language model is:",
    options: [
      "A librarian who finds the right book",
      "The world's most well-read autocomplete",
      "A calculator",
      "A normal search engine",
    ],
    answer: 1,
    why: "Stop picturing a librarian who retrieves; picture a writer who continues — the most well-read autocomplete.",
  },
  {
    q: "When you ask \"What is the capital of France?\", how does the model give \"Paris\"?",
    options: [
      "It opens a database row labelled France → Paris",
      "It predicts the most plausible continuation, which appeared many times in training",
      "It calls the French government",
      "It guesses randomly each time",
    ],
    answer: 1,
    why: "It produces the most plausible continuation of \"The capital of France is\" — which happens to be Paris.",
  },
  {
    q: "What does \"frequency equals reliability\" mean?",
    options: [
      "The more often a true continuation appeared in training, the more strongly the model predicts it",
      "The model is always 100% reliable",
      "AI works faster at night",
      "More money means better answers",
    ],
    answer: 0,
    why: "Sparse topic → weak prediction → confident-sounding guess. Thick text → reliable prediction.",
  },
  {
    q: "Idea 2 says the model learned by reading, and then:",
    options: [
      "it keeps learning forever",
      "the learning stopped (the weights froze)",
      "it forgot everything",
      "it started teaching humans",
    ],
    answer: 1,
    why: "When training ends, the result is frozen into a fixed set of weights that does not change again.",
  },
  {
    q: "What is \"training\"?",
    options: [
      "The model practising every day",
      "The one-time education done once, in the past, by the company that built the model",
      "You correcting the model in a chat",
      "Reading the news",
    ],
    answer: 1,
    why: "Training is the one-time, expensive education done once in the past. It is finished.",
  },
  {
    q: "What is \"inference\"?",
    options: [
      "The model changing its own weights",
      "Every time you use it: the frozen weights run on your prompt and nothing inside the model changes",
      "The first day of training",
      "Deleting the model",
    ],
    answer: 1,
    why: "Inference is using the model: frozen weights run on your prompt and change nothing inside the model.",
  },
  {
    q: "You correct the model in a chat and it says \"you're right, my mistake.\" What really happened?",
    options: [
      "The model learned from you permanently",
      "It only predicted the text that plausibly follows a correction; it did not learn",
      "The weights changed",
      "The company updated the model",
    ],
    answer: 1,
    why: "It predicted text that follows a correction. Close the chat and it has no memory the correction happened.",
  },
  {
    q: "Why is there a \"knowledge cutoff\"?",
    options: [
      "The internet was switched off",
      "Training ended on a certain date, so anything after that is not in the weights",
      "The model is lazy",
      "Users blocked the news",
    ],
    answer: 1,
    why: "It is a brilliant expert who stopped reading the news on a specific day — the day training ended.",
  },
  {
    q: "Why can't the model know your company's private numbers or yesterday's email?",
    options: [
      "It is hiding them from you",
      "That information was never in the training text, so there was nothing to freeze",
      "It needs your password",
      "It simply forgot them",
    ],
    answer: 1,
    why: "The model isn't withholding it — the information was never there to freeze.",
  },
  {
    q: "How do \"memory\" features actually work?",
    options: [
      "The model changes its weights for you",
      "The product saves a few facts about you as text and re-inserts that text into the context",
      "The model remembers like a human does",
      "They do not work at all",
    ],
    answer: 1,
    why: "It is not the model remembering; the product re-feeds a saved note into the context each time.",
  },
  {
    q: "What does \"stateless\" mean here?",
    options: [
      "The model has no country",
      "The model has no memory of its own; every response is computed fresh from the frozen weights plus what is in front of it",
      "The model is broken",
      "The model is always online",
    ],
    answer: 1,
    why: "Stateless = no memory of its own; each response is computed from scratch.",
  },
  {
    q: "Idea 3 says there is no separate place where the model:",
    options: ["stores files", "checks if its answer is true", "connects to the internet", "saves your chats"],
    answer: 1,
    why: "There is no second machine inside it that audits the prediction for truth before it reaches you.",
  },
  {
    q: "A human expert can generate an answer AND check it. The model has:",
    options: [
      "both faculties",
      "only the first one (it generates, but does not check)",
      "only the checking faculty",
      "neither faculty",
    ],
    answer: 1,
    why: "The model has only the generating faculty. Fluency is produced; truth is not separately verified.",
  },
  {
    q: "When AI produces a fluent, confident, but completely false statement, this is called:",
    options: ["a crash", "a hallucination", "a virus", "a shutdown"],
    answer: 1,
    why: "A hallucination — fluent, confident, false. It is the machine working as built, not a glitch.",
  },
  {
    q: "The course says a hallucination is:",
    options: [
      "a glitch or malfunction to be fixed",
      "the machine working exactly as built: predicting a plausible continuation where it happens not to be true",
      "a hardware problem",
      "caused by a slow internet",
    ],
    answer: 1,
    why: "It is not a glitch — it is plausible continuation in a spot where the plausible answer isn't true.",
  },
  {
    q: "In the \"two faculties\" idea, who is the \"missing second faculty\"?",
    options: ["The company", "You — the human checks the truth", "Another AI", "The internet"],
    answer: 1,
    why: "You are the missing second faculty — the part that checks.",
  },
  {
    q: "Idea 4 says the model reads your text as:",
    options: ["single letters", "tokens (chunks that are usually a word or piece of a word)", "pictures", "numbers only"],
    answer: 1,
    why: "Text is chopped into tokens. The model only ever sees these chunks, not the letters inside them.",
  },
  {
    q: "Why does the model miscount the letters in \"strawberry\"?",
    options: [
      "It is not smart enough",
      "It sees chunks (tokens), not individual letters",
      "The word is too long",
      "It refuses to count",
    ],
    answer: 1,
    why: "Counting letters inside a chunk is like counting rooms from a street address — it only sees the chunk.",
  },
  {
    q: "Roughly, in English, how do tokens compare to words?",
    options: [
      "One token equals ten words",
      "About three tokens is about four words",
      "Words and tokens are exactly the same",
      "One word equals five tokens",
    ],
    answer: 1,
    why: "Roughly three tokens ≈ four words in English — but the chunk is the real unit.",
  },
  {
    q: "For languages like Urdu, Arabic, or Hindi, what usually happens?",
    options: [
      "They use fewer tokens",
      "Text is chopped into more tokens per word, so it costs more and fills the context window faster",
      "The model cannot read them",
      "Nothing changes at all",
    ],
    answer: 1,
    why: "Non-Latin scripts are chopped into more tokens per word — higher cost and a faster-filling context window.",
  },
  {
    q: "How does the model handle images and audio?",
    options: [
      "It cannot use them at all",
      "Images are sliced into patches and audio into segments, and each piece becomes a token",
      "It prints them out",
      "It emails them to a human",
    ],
    answer: 1,
    why: "More kinds of tokens, same machine — image patches and audio segments become tokens too.",
  },
  {
    q: "Idea 5: The context window is:",
    options: [
      "a window on your screen",
      "the only thing the model can see for one response (the text in front of it)",
      "the model's permanent memory",
      "a type of token",
    ],
    answer: 1,
    why: "Because the weights are frozen, the context window is the model's entire world for one response.",
  },
  {
    q: "Idea 6: Why does the model sound so confident even when it is wrong?",
    options: [
      "It always checks its facts first",
      "Confidence is a learned style, made by the same process as the content, and decoupled from truth",
      "It is angry",
      "A human teacher told it to",
    ],
    answer: 1,
    why: "A confident sentence is the house style, not a verdict on accuracy.",
  },
  {
    q: "What is \"sycophancy\" in AI?",
    options: [
      "The model refusing to answer",
      "The model leaning toward telling you what you seem to want (agreeing with you)",
      "The model speaking another language",
      "The model crashing",
    ],
    answer: 1,
    why: "Agreement got rated higher than disagreement, so the model leans toward what you seem to want.",
  },
  {
    q: "Idea 7, the \"jagged frontier,\" means:",
    options: [
      "AI ability is smooth and predictable",
      "AI can be superhuman at one task and surprisingly bad at a neighbouring easy one",
      "AI only works on hard tasks",
      "AI is equally good at everything",
    ],
    answer: 1,
    why: "Competence doesn't track difficulty — it can draft a legal clause but miscount letters in 'strawberry'.",
  },
  {
    q: "Which errors are the most dangerous on the jagged frontier?",
    options: [
      "The hard tasks you already check carefully",
      "The easy-looking tasks it quietly fails — the ones you'd never think to check",
      "Spelling mistakes",
      "Slow answers",
    ],
    answer: 1,
    why: "The dangerous one is the easy task it flubs, because you would never think to check it.",
  },
  {
    q: "Idea 8: What turns a predictor into an \"agent\"?",
    options: [
      "A faster computer",
      "A predictor + tools + a loop (predict an action, a tool runs it, the result returns, repeat)",
      "A new kind of mind",
      "More training data",
    ],
    answer: 1,
    why: "An agent is the same predictor, given tools, running a predict-act-observe loop toward a goal.",
  },
  {
    q: "Idea 9: What is \"thinking\" or \"reasoning\" in the newest models?",
    options: [
      "A second brain that checks the truth",
      "More prediction, out loud, before the final answer",
      "Asking a human for help",
      "Searching the web",
    ],
    answer: 1,
    why: "It predicts a long stretch of working first, then predicts the final answer from it — still pure prediction.",
  },
  {
    q: "Does more \"thinking\" make the model perfectly correct?",
    options: [
      "Yes, it closes the gap completely",
      "No — more thinking narrows the gap but does not close it; you are still the final check",
      "Yes, always",
      "It makes the answer worse",
    ],
    answer: 1,
    why: "More thinking narrows the gap. It does not close it. You are still the final check.",
  },
  {
    q: "The course opens with a car analogy. What is its main point?",
    options: [
      "You must be a mechanic to drive",
      "You can drive without knowing the engine, but knowing roughly what is under the hood keeps you calm when something goes wrong",
      "Cars are exactly like computers",
      "Driving is too dangerous to try",
    ],
    answer: 1,
    why: "People who know roughly what's under the hood stay calm when something goes wrong; people who don't, panic.",
  },
  {
    q: "Among the six Foundations courses, when should you read \"What AI Actually Is\"?",
    options: [
      "Last of all",
      "Before the others, even though it is the most abstract",
      "Only if you are a coder",
      "It does not matter",
    ],
    answer: 1,
    why: "Read this one first — then every \"why does it do that?\" in the other five courses already has an answer.",
  },
  {
    q: "In the \"prove it in two minutes\" test, the model is asked to count the letter R in which word?",
    options: ["blueberry", "strawberry", "raspberry", "cranberry"],
    answer: 1,
    why: "The strawberry test — the model often miscounts until forced to spell the word out letter by letter.",
  },
  {
    q: "Besides miscounting letters, which task is WEAK because the model works in tokens?",
    options: ["Writing common code", "Rhyming, anagrams, and wordplay", "Explaining common concepts", "Continuing a story"],
    answer: 1,
    why: "Rhyming, anagrams, and wordplay work on letters and sounds, but the model operates on chunks.",
  },
  {
    q: "Why do typos in your prompt rarely matter?",
    options: [
      "The model ignores all spelling completely",
      "A misspelled word still maps to chunks close enough to the intended meaning",
      "The model fixes them before reading",
      "Typos are deleted automatically",
    ],
    answer: 1,
    why: "A misspelled word still maps to chunks close enough to the meaning — which is why the prompting course says don't bother fixing typos.",
  },
  {
    q: "A tool says it has a \"200,000-token context window.\" What does that describe?",
    options: [
      "Its internet speed",
      "How many chunks (tokens) it can hold at once",
      "The number of users it can serve",
      "Its training cost",
    ],
    answer: 1,
    why: "The context window size is how many chunks it can hold at once — tokens are the unit of memory and of money.",
  },
  {
    q: "\"But ChatGPT can search the web — doesn't it look things up?\" What does the course say?",
    options: [
      "Yes, the model itself looks things up",
      "The product can fetch facts, but the model still only predicts a continuation from whatever lands in its context",
      "No tool can ever help it",
      "The model now has a built-in database",
    ],
    answer: 1,
    why: "The product can; the model still doesn't. Fetched facts land in the context window, and the model predicts a continuation from them.",
  },
  {
    q: "Which two prompting fixes remove the cues that make the model agree with you?",
    options: [
      "Shouting and repeating the question",
      "Neutral framing (\"give the strongest case on each side\") and forcing a score (\"rate this 1–10\")",
      "Using more emojis",
      "Asking the same thing twice",
    ],
    answer: 1,
    why: "Neutral framing removes the signal it would lean toward; a number is harder to fake agreeably than an adjective.",
  },
  {
    q: "Which is a good habit that comes from accepting the jagged frontier?",
    options: [
      "Trust hard tasks blindly",
      "Try the same task in two or three different models, since one catches what another drops",
      "Never verify anything",
      "Use only one model forever",
    ],
    answer: 1,
    why: "Different models have differently-shaped frontiers, so one catches what another drops.",
  },
  {
    q: "What is the one-line bottom line of the whole course?",
    options: [
      "AI is always right",
      "A prediction machine that learned by reading and has no organ for truth — fluent everywhere, reliable only where the text was thick, and you are the part that checks",
      "AI is just a fast database",
      "AI thinks exactly like a human",
    ],
    answer: 1,
    why: "That sentence is the summary of all nine ideas — and \"you are the part that checks\" is the takeaway.",
  },
];

// ---- Module 4 questions (from File 4: AI Prompting in 2026 — A Crash Course) ----
const MODULE_4 = [
  {
    q: "The crash course teaches how many concepts, covering 80% of real AI use?",
    options: ["Five", "Nine", "Thirteen", "Twenty"],
    answer: 2,
    why: "Thirteen concepts, grouped into four short parts, cover eighty percent of real use.",
  },
  {
    q: "What is the main difference between a novice prompt and a power-user prompt?",
    options: [
      "The power user pays for a better model",
      "The power user briefs AI with files, context, constraints, and a clear ask",
      "The power user writes much shorter prompts",
      "The power user only asks yes/no questions",
    ],
    answer: 1,
    why: "The gap is not cleverness, it is a handful of habits: brief AI like a smart new colleague, with files, context, constraints, and a clear ask.",
  },
  {
    q: "The course compares AI to which kind of helper?",
    options: [
      "A senior expert who already knows everything about you",
      "A really smart fresh college grad, highly motivated but who doesn't know much about you yet",
      "A search engine",
      "A calculator",
    ],
    answer: 1,
    why: "AI is like a smart fresh grad: very capable, but you must brief it because it does not know your situation yet.",
  },
  {
    q: "How did AI learn what it knows, according to the course?",
    options: [
      "By living in the real world and gaining experience",
      "By reading massive amounts of text from the internet",
      "By asking humans questions one by one",
      "By copying other AI models",
    ],
    answer: 1,
    why: "AI has no body and no senses. It learned by reading text: Wikipedia, books, forums, articles, and more.",
  },
  {
    q: "What does the course say frequency in training data roughly equals?",
    options: ["The price of the AI tool", "The speed of the answer", "The reliability of the answer", "The length of the answer"],
    answer: 2,
    why: "Topics that are talked about a lot (like cooking) are strong and reliable. Rare topics are sparse, and private data is absent entirely.",
  },
  {
    q: "Why should you not waste time fixing typos in your prompt?",
    options: [
      "AI cannot read typos at all",
      "AI was trained on internet text, which is full of typos, so it handles them gracefully",
      "Typos make the AI answer faster",
      "Typos are required for AI to understand you",
    ],
    answer: 1,
    why: "AI is used to typos from its training data, so a misspelled word will not change the answer.",
  },
  {
    q: "What should you do with confident-sounding AI answers on rare or thin topics?",
    options: [
      "Trust them completely, since AI is always right",
      "Check anything important against a primary source, since confidence is not the same as correctness",
      "Ignore the answer entirely",
      "Ask the AI to repeat itself",
    ],
    answer: 1,
    why: "AI can sound confident even when the topic was barely covered in training data. A confidently wrong source becomes a confidently wrong model.",
  },
  {
    q: "What are the three retrieval modes the course describes?",
    options: [
      "Fast, medium, slow",
      "Pretrained, web search, deep research",
      "Text, voice, image",
      "Free, paid, enterprise",
    ],
    answer: 1,
    why: "Pretrained answers from training data alone, web search reads a few live pages, and deep research scans dozens of sources for a structured report.",
  },
  {
    q: "Which retrieval mode is best for a question about a regulatory change that just happened?",
    options: ["Pretrained only", "Web search", "Neither, AI cannot help", "Image generation"],
    answer: 1,
    why: "Pretrained knowledge has a cutoff date. Web search rescues a stale model by pulling a recent article.",
  },
  {
    q: "What is one weakness of web search mode that the course points out?",
    options: [
      "It is always too slow to use",
      "It does not check whether sources are current, so it can cite an old or outdated page",
      "It never works on phones",
      "It cannot read any websites",
    ],
    answer: 1,
    why: "A friend asking about running locations got a 20-year-old page recommending a school that was already closed. Web search does not verify how current a source is.",
  },
  {
    q: "What does the course mean by \"the context window is everything the model knows for a response\"?",
    options: [
      "The model remembers every chat you've ever had, forever",
      "Anything not placed in the context window does not exist for that answer",
      "The model can read your private files automatically",
      "Context windows are unlimited in size",
    ],
    answer: 1,
    why: "The model only knows what is in its context window right now: the system prompt, tools, your prompt, chat history, and uploaded files.",
  },
  {
    q: "Roughly how large is a modern AI context window, per the course's comparison?",
    options: [
      "About 7 words",
      "About 750 words",
      "About 750,000 words, similar to 4-5 Harry Potter books",
      "Unlimited words, with no limit at all",
    ],
    answer: 2,
    why: "Modern models can hold around 750,000 words at once — but it is still a limit, not infinite.",
  },
  {
    q: "What is \"context rot\" and how do you avoid it?",
    options: [
      "Files become corrupted over time; avoid uploading files",
      "Recall degrades in long, topic-mixing conversations; start a new chat when the topic changes",
      "The AI forgets your name; you must repeat it every message",
      "Old AI models stop working; always use the newest model",
    ],
    answer: 1,
    why: "Long conversations that jump between unrelated topics distract the model. The rule of thumb: when the topic changes, start a new conversation.",
  },
  {
    q: "Which of these is a symptom that a conversation has gone stale?",
    options: [
      "The AI answers more quickly than before",
      "The AI references unrelated earlier parts of the chat and gives longer, vaguer answers",
      "The AI starts using shorter sentences",
      "The AI stops citing any sources",
    ],
    answer: 1,
    why: "Stale chats show signs like irrelevant references, vaguer hedging answers, and repeated apologies without progress.",
  },
  {
    q: "How do you invoke AI's reasoning or \"think hard\" mode in plain language?",
    options: [
      "Type a special code that only developers know",
      "Just ask in plain language, such as 'think hard' or 'think carefully before answering'",
      "Pay extra money every time",
      "Restart the app",
    ],
    answer: 1,
    why: "Asking in plain language is the portable way that works across every modern AI tool, with no special syntax needed.",
  },
  {
    q: "According to the course, when should you NOT bother using thinking mode?",
    options: [
      "For multi-input, multi-tradeoff decisions",
      "For quick lookups, one-paragraph summaries, and casual brainstorming",
      "For comparing complex options carefully",
      "For decisions with high stakes",
    ],
    answer: 1,
    why: "Thinking mode is slower and uses more budget, so save it for harder questions, not quick simple lookups.",
  },
  {
    q: "Why are AI models biased toward agreeing with you (sycophancy)?",
    options: [
      "They are designed to always be polite",
      "They were trained on human feedback, and agreeing got more thumbs-up than disagreeing",
      "They run out of things to say",
      "They cannot understand disagreement",
    ],
    answer: 1,
    why: "Across millions of users, agreeing with people got more thumbs-up than disagreeing, so models lean toward telling you what you want to hear.",
  },
  {
    q: "Which prompt phrasing is an example of sycophancy bait?",
    options: [
      "Evaluate this strategy and list pros and cons",
      "Find evidence that this strategy will work",
      "Compare strategy A and strategy B on cost and risk",
      "Critique this plan using a rubric",
    ],
    answer: 1,
    why: "Verbs like 'find', 'defend', 'confirm', and 'prove' hand the AI a conclusion before the question. Neutral verbs like 'evaluate' or 'compare' avoid this.",
  },
  {
    q: "What is a \"rubric\" in the context of prompting AI?",
    options: [
      "A type of AI model",
      "A list of specific things to check, each scored or answered separately",
      "A web search filter",
      "A grading curve used only in schools",
    ],
    answer: 1,
    why: "A rubric forces specific criteria, which keeps the AI from collapsing vague evaluations into simple praise like 'great work!'",
  },
  {
    q: "What is the correct order of steps in the brainstorm-iterate loop?",
    options: [
      "Ask for the full draft first, then add context later",
      "Load context, demand 3-5 options, give explicit feedback, iterate, then expand the chosen option",
      "Pick the first answer the AI gives and stop",
      "Skip feedback and just ask for more options repeatedly",
    ],
    answer: 1,
    why: "This loop pushes the model past its first, average instinct, and most of the leverage lives in the loop, not the final draft.",
  },
  {
    q: "In writing, the brainstorm-iterate loop is also known by what name?",
    options: ["Free writing", "Draft-first writing", "Outline before drafting", "Speed writing"],
    answer: 2,
    why: "Outlining before drafting works the same way: outline first, critique it, expand into bullets, critique those, and only then write the prose.",
  },
  {
    q: "Why does editing at the outline stage matter more than editing the final draft?",
    options: [
      "Outlines take longer to read than drafts",
      "Editing one word in an outline can change the direction of the whole piece; editing one word in a final draft changes only one word",
      "Drafts cannot be edited once written",
      "AI ignores outlines completely",
    ],
    answer: 1,
    why: "Almost all the leverage in writing happens at the outline level, since AI builds word by word and needs structure first to see the whole shape.",
  },
  {
    q: "When AI transcribes a receipt or splits a bill from a photo, what should you always do?",
    options: [
      "Trust the totals completely without checking",
      "Always double-check the totals",
      "Never use AI for this task",
      "Ask AI to redo it in video format",
    ],
    answer: 1,
    why: "AI works well for receipts and transcription, but you should always double-check totals for accuracy.",
  },
  {
    q: "What is an \"artifact\" when AI builds a small app in the side panel?",
    options: [
      "Only a static screenshot, nothing more",
      "A persistent object you can edit in place, iterate on, and share by link",
      "Something that disappears the instant you close the tab",
      "Something that requires a paid account to even view",
    ],
    answer: 1,
    why: "An artifact is iterable and shareable: the recipient does not even need an account to open and use it.",
  },
  {
    q: "What are the three slots in the recipe for a small-app prompt?",
    options: [
      "Title, Author, Date",
      "Goal, Input, Output",
      "Start, Middle, End",
      "Color, Size, Shape",
    ],
    answer: 1,
    why: "Goal (what it should do), Input (what the user provides), and Output (what the user sees) are the three slots that build a working small app.",
  },
  {
    q: "What is the \"silent failure mode\" in AI data analysis?",
    options: [
      "The AI refuses to answer math questions",
      "The AI writes a paragraph with numbers but never actually runs code to compute them",
      "The AI crashes the app every time",
      "The AI only works with spreadsheets",
    ],
    answer: 1,
    why: "Sometimes AI estimates numbers in prose instead of computing them. The fix is to explicitly ask it to write and run code, and show you the code.",
  },
  {
    q: "For AI desktop apps like Cowork or OpenWork, what is the \"permission ladder\" principle?",
    options: [
      "Give full access immediately to save setup time",
      "Scope of access grows with track record, not with how much you trust the company",
      "Never allow any file access, ever",
      "Only allow access on weekends",
    ],
    answer: 1,
    why: "Start with read-only access to a single small folder, and expand access only after successful, clean runs.",
  },
  {
    q: "What does the course mean when it says \"AI is jagged\"?",
    options: [
      "AI text formatting has sharp edges",
      "Different models are good at different things, and there is no single best model, since the leader changes every few months",
      "AI is unreliable in every situation",
      "AI only works well on certain days of the week",
    ],
    answer: 1,
    why: "AI capability is uneven across tasks and models, and rankings shift over time, so there is no permanent 'best' model.",
  },
  {
    q: "What habit does the course recommend for choosing which AI model to use?",
    options: [
      "Commit to one tool forever and never switch",
      "Try the same prompt in 2-3 different models routinely, and check a leaderboard about once a month",
      "Always use the most expensive option available",
      "Always use whichever tool loads fastest",
    ],
    answer: 1,
    why: "Since rankings change often, testing the same prompt across a few models and checking a leaderboard monthly keeps your choice current.",
  },
  {
    q: "Which five AI \"families\" does the course name for cross-model checking?",
    options: [
      "Claude, ChatGPT, Gemini, Meta AI, and DeepSeek",
      "Claude, Claude, Claude, ChatGPT, and Gemini",
      "Only Claude and ChatGPT",
      "Google, Microsoft, Apple, Amazon, and Meta",
    ],
    answer: 0,
    why: "The five distinct families are Anthropic (Claude), OpenAI (ChatGPT), Google (Gemini), Meta (Meta AI), and DeepSeek.",
  },
  {
    q: "Why does \"models checking models\" only work with genuinely different families?",
    options: [
      "Because different families are always cheaper to use",
      "Because models from the same family share similar blind spots, so cross-checking needs different priors",
      "Because using two models from the same family is against the rules",
      "Because different families always agree with each other",
    ],
    answer: 1,
    why: "Two Claude models checking each other is not real cross-model checking, since their priors are too similar. Real differences in training catch different mistakes.",
  },
  {
    q: "What is the single move that underlies almost every advanced technique in the whole course?",
    options: [
      "Pay for the most expensive AI subscription",
      "Get the right context in, and keep the wrong context out",
      "Write the longest possible prompt every time",
      "Always use thinking mode for every question",
    ],
    answer: 1,
    why: "This one sentence is the foundation behind nearly every technique in the page: control what goes into the model's context window.",
  },
];

// ---- Module 5 questions (from File 5: Markdown In, HTML Out — A Crash Course) ----
const MODULE_5 = [
  {
    q: "What is the one-line idea of this whole course?",
    options: [
      "Write in HTML, read in Markdown",
      "Write in Markdown, read in HTML",
      "Write and read only in plain text",
      "Never use Markdown or HTML",
    ],
    answer: 1,
    why: "The course teaches: write to the AI in Markdown, and read the AI's answer in HTML — \"Markdown in, HTML out\".",
  },
  {
    q: "What is Markdown?",
    options: [
      "A programming language for building apps",
      "Plain text with a few extra marks that show structure (like # for a heading)",
      "A type of web browser",
      "A paid software you must install",
    ],
    answer: 1,
    why: "Markdown is plain text with a few extra marks that show structure — a # before a heading, a - before a list item. Nothing to install.",
  },
  {
    q: "What is HTML?",
    options: [
      "A spreadsheet format",
      "The language that web pages are built from",
      "A kind of computer chip",
      "A messaging app",
    ],
    answer: 1,
    why: "HTML is the language web pages are built from — every page you open in a browser is HTML underneath.",
  },
  {
    q: "Are Markdown and HTML a type of programming?",
    options: [
      "Yes, both are hard programming languages",
      "No, both are just ordinary text; the skill is knowing which one to use in which direction",
      "Only HTML is programming",
      "Only Markdown is programming",
    ],
    answer: 1,
    why: "Neither is programming. Both are ordinary text. The skill is knowing which one to use in which direction.",
  },
  {
    q: "Power users write TO the AI in Markdown. Why?",
    options: [
      "Because it looks nicer",
      "Because structure leaves the AI nothing to guess about",
      "Because it is the only language AI understands",
      "Because it is shorter to type",
    ],
    answer: 1,
    why: "They write to the AI in Markdown (headings, lists, code blocks) because structure leaves nothing to guess about.",
  },
  {
    q: "Power users ask the AI to answer IN HTML. Why?",
    options: [
      "Because a designed page is the only long answer a busy human actually reads",
      "Because HTML is shorter",
      "Because AI cannot write Markdown",
      "Because HTML uses less data",
    ],
    answer: 0,
    why: "They ask for HTML (diagrams, tables, color) because a designed page is the only long answer a busy human actually reads.",
  },
  {
    q: "Behind the whole course sits one question that settles every format choice. What is it?",
    options: [
      "How much does it cost?",
      "Who reads this last?",
      "How long is it?",
      "Which AI tool am I using?",
    ],
    answer: 1,
    why: "The one question is \"who reads this last?\" — a person → HTML, an AI → Markdown, a social feed → plain text.",
  },
  {
    q: "If a PERSON will read it in a browser, what should you ask for?",
    options: ["Markdown", "HTML", "Plain text", "CSV"],
    answer: 1,
    why: "If a person will read it in a browser, ask for HTML.",
  },
  {
    q: "If an AI will read it next (or you will feed it back to an AI later), what should you keep it in?",
    options: ["HTML", "PDF", "Markdown", "Slides"],
    answer: 2,
    why: "If an AI will read it, or you will feed it back to an AI later, keep it in Markdown.",
  },
  {
    q: "If you are honestly unsure who reads it last, what is the safe default?",
    options: [
      "HTML, because it looks best",
      "Markdown, because a person can read it well enough and an AI reads HTML badly",
      "Plain text always",
      "A PDF file",
    ],
    answer: 1,
    why: "When unsure, default to Markdown — a person reads Markdown fine, but an AI reads HTML badly. You can always render Markdown into HTML later.",
  },
  {
    q: "Why is Markdown called the \"specification language\" of agentic work?",
    options: [
      "Because it is colorful",
      "Because agents are trained on huge amounts of Markdown, so they read its structure natively",
      "Because it is the newest language",
      "Because only experts can write it",
    ],
    answer: 1,
    why: "Agents are trained on enormous amounts of Markdown, so they parse its structure natively — a # heading is a signal about importance, not just decoration.",
  },
  {
    q: "The habit, stated once: anything an agent must NOT get wrong belongs where?",
    options: [
      "Buried inside a long sentence",
      "Under its own heading or in its own bullet, never inside a sentence",
      "In a separate email",
      "At the very end with no label",
    ],
    answer: 1,
    why: "Anything an agent must not get wrong belongs under its own heading or in its own bullet — never hidden inside a sentence.",
  },
  {
    q: "In the sports-day example, why did the agent schedule the under-8 races in the afternoon heat anyway?",
    options: [
      "The agent was broken",
      "The constraint was buried mid-sentence in prose, so the agent treated it as just a preference",
      "The administrator wanted it that way",
      "The agent ran out of memory",
    ],
    answer: 1,
    why: "The constraint was buried mid-sentence in prose, so the agent weighted it as a preference. Moving it under a \"## Hard constraints\" heading fixed it.",
  },
  {
    q: "Why did the team stop asking agents for Markdown OUTPUT and start asking for HTML? (Pick the best reason.)",
    options: [
      "Long Markdown becomes unreadable, but HTML stays rich and shareable",
      "Markdown is illegal now",
      "HTML is always shorter",
      "AI cannot produce Markdown anymore",
    ],
    answer: 0,
    why: "Past about a hundred lines humans stop reading Markdown; HTML stays readable, has almost no ceiling, and is shareable as a link.",
  },
  {
    q: "What does \"Markdown's ceiling is low\" mean?",
    options: [
      "Markdown files must be short",
      "Markdown can do headings, lists and tables but little else; for workflows or layouts it falls back to ASCII art",
      "Markdown cannot be saved",
      "Markdown only works on phones",
    ],
    answer: 1,
    why: "Markdown handles headings, lists, and tables, but for diagrams, color, or layout it resorts to clumsy ASCII art — its ceiling is low.",
  },
  {
    q: "\"HTML out\" has one important condition. What is it?",
    options: [
      "The reader must be a human",
      "The file must be under 1 KB",
      "You must write the HTML yourself",
      "It only works on weekends",
    ],
    answer: 0,
    why: "Every advantage of HTML is for human eyes and browsers. To an AI, HTML is noise — so anything kept FOR an AI stays Markdown. The condition for HTML is: the reader is human.",
  },
  {
    q: "A # makes a heading. What do more # symbols do?",
    options: [
      "Make the text bigger",
      "Make deeper levels (## is a section, ### is a subsection)",
      "Delete the heading",
      "Change the color",
    ],
    answer: 1,
    why: "One # is the title, ## is a major section, ### is a subsection. More # symbols make deeper levels.",
  },
  {
    q: "What do headings actually DO for the AI?",
    options: [
      "Just make the document pretty",
      "Show which information is most important and which details belong under which section",
      "Slow the AI down",
      "Nothing useful",
    ],
    answer: 1,
    why: "Headings show the AI what matters most and which details belong where. Everything under \"## Hard constraints\" is a constraint it must follow.",
  },
  {
    q: "What is the rule about titles in a Markdown document?",
    options: [
      "Use as many # titles as you like",
      "Use one # title per document (two titles can look like two separate tasks)",
      "Never use a title",
      "Titles must be at the bottom",
    ],
    answer: 1,
    why: "Use one # title per document. Two titles can make the agent treat them as two separate tasks fused together.",
  },
  {
    q: "What does \"make headings claims, not labels\" mean?",
    options: [
      "Headings should be one word only",
      "\"## Budget: PKR 50,000 hard ceiling\" carries more meaning than just \"## Budget\"",
      "Never write headings",
      "Headings should be questions",
    ],
    answer: 1,
    why: "A heading like \"## Budget: PKR 50,000 hard ceiling\" says more than a plain \"## Budget\". Make the heading itself carry the constraint.",
  },
  {
    q: "Bullets ( - ) tell the AI what about the items?",
    options: [
      "They are a sequence; order matters",
      "They are a set; order does not matter; each one is independently true",
      "They are all wrong",
      "They must be done last",
    ],
    answer: 1,
    why: "Bullets say: these items are a set, order does not matter, each is independently true. Use them for features, requirements, constraints, options.",
  },
  {
    q: "Numbered lists ( 1. 2. 3. ) tell the AI what about the items?",
    options: [
      "Order does not matter",
      "They are a sequence; order is the point; step 3 assumes step 2 happened",
      "They are optional",
      "They are a set",
    ],
    answer: 1,
    why: "Numbers say: these items are a sequence, order is the point — step 3 assumes step 2 happened. Use them for procedures and workflows.",
  },
  {
    q: "What is a \"checkable\" requirement bullet?",
    options: [
      "One a reviewer could mark right or wrong without any discussion",
      "One that sounds nice",
      "One that is very long",
      "One written in HTML",
    ],
    answer: 0,
    why: "\"Page should be fast\" is not checkable. \"Page loads in under 3 seconds on a 3G connection\" is. The best bullets can be objectively verified.",
  },
  {
    q: "What do triple backticks ( ``` ) tell the AI?",
    options: [
      "Delete this text",
      "This is data to look at, not an instruction to follow",
      "Make this bold",
      "This is the most important part",
    ],
    answer: 1,
    why: "Wrapping text in triple backticks tells the AI \"this is data, not an instruction\" — useful for error messages, example output, or quotes.",
  },
  {
    q: "What is the most useful trick with code blocks?",
    options: [
      "Hiding text from the AI",
      "Showing the AI an example of what the correct output should look like",
      "Making the prompt longer",
      "Changing the font",
    ],
    answer: 1,
    why: "Instead of describing a format in three paragraphs, show one example inside a fence. The AI cannot misread a concrete example.",
  },
  {
    q: "Why do links matter in a prompt?",
    options: [
      "They make the prompt colorful",
      "The AI can actually visit the page and read the real source instead of guessing from memory",
      "They are required by law",
      "They make the AI faster",
    ],
    answer: 1,
    why: "Include a link and (with web access on) the AI reads the real page — you replace possibly-wrong remembered info with the actual source.",
  },
  {
    q: "When you add an image, why does the description you write inside the brackets matter?",
    options: [
      "It is just decoration",
      "It is what the AI reads when it looks at your image — like a caption telling it what to notice",
      "It changes the image size",
      "It is never used",
    ],
    answer: 1,
    why: "The image description is what the AI reads about your image — think of it as a caption telling the AI what to pay attention to.",
  },
  {
    q: "Everything in Part 2 assembles into one artifact. What is it?",
    options: ["A web page", "The specification (spec)", "An email", "A video"],
    answer: 1,
    why: "Headings, lists, code blocks, and links assemble into one document: the specification — the shape you write hundreds of times in this book.",
  },
  {
    q: "In the spec skeleton, what does the \"Out of scope\" section do?",
    options: [
      "Lists things you DO want",
      "States what you do NOT want, which kills the agent's most common failure: over-delivery",
      "Sets the price",
      "Lists the author's name",
    ],
    answer: 1,
    why: "\"Out of scope\" states what you are NOT asking for, stopping enthusiastic over-delivery — the login system you never wanted.",
  },
  {
    q: "What is the move that separates a real spec from a wish?",
    options: [
      "Making it longer",
      "Validate the spec before you execute it — hand it to an agent and ask it to attack it",
      "Adding more colors",
      "Sending it to many people",
    ],
    answer: 1,
    why: "Do not hand your first draft to an agent and hope. Validate it first: ask the agent to list ambiguities, missing constraints, and grade it out of 10.",
  },
  {
    q: "What does \"the spec is the deliverable\" mean?",
    options: [
      "The spec is paperwork you do before the real work",
      "In AI-native work the specification IS the real work; improve the spec and every output improves with it",
      "You should skip the spec",
      "The spec is only for managers",
    ],
    answer: 1,
    why: "The spec is not paperwork before the real work — it IS the real work. The agent's output is a function of your spec. This is spec-driven development.",
  },
  {
    q: "In Part 3, will you learn to write HTML tags by hand?",
    options: [
      "Yes, every tag in detail",
      "No — the agent writes the HTML; your job is to know when to ask for it, what to ask for, and how to judge it",
      "Yes, but only the colors",
      "No, HTML is never used",
    ],
    answer: 1,
    why: "You will not write HTML tags. The agent writes them. Your job is knowing when to ask for HTML, what to ask for, and how to judge what comes back.",
  },
  {
    q: "How do you get HTML out of an agent in a chat tool like Claude.ai?",
    options: [
      "Learn to code first",
      "Say \"create an HTML artifact\" (or \"Canvas\" on ChatGPT/Gemini) and it builds a live page in a side panel",
      "Email the company",
      "It is impossible in a browser",
    ],
    answer: 1,
    why: "Say \"create an HTML artifact\" and the AI builds a live page in a side panel. On ChatGPT or Gemini, say \"Canvas\" instead.",
  },
  {
    q: "Asking for HTML is easy. Where does the real skill live?",
    options: [
      "In the trigger word you use",
      "In the brief you write around it: who will read it, what it should contain, how it should feel",
      "In the color you pick",
      "In how fast you type",
    ],
    answer: 1,
    why: "The difference between a mediocre page and an excellent one is not the trigger word but the brief — who reads it, what it contains, and how it should feel.",
  },
  {
    q: "Which four things should you include in every HTML request?",
    options: [
      "Price, length, font, and color only",
      "Who will read it, what it should contain, whether it should be interactive, and how it should be read",
      "Your name, the date, the time, and the weather",
      "Nothing — just say 'make a page'",
    ],
    answer: 1,
    why: "Every HTML request should say: who will read it, what it should contain, whether it should be interactive, and how it should be read.",
  },
  {
    q: "Pattern 1 is \"Plans and explorations\". When you need to make a decision, what should you ask the AI for?",
    options: [
      "One single answer",
      "Several options laid out side by side as a visual grid, each card showing what you gain and give up",
      "A long essay",
      "Nothing at all",
    ],
    answer: 1,
    why: "Do not ask for one answer. Ask the AI to lay out several options side by side as a grid so you can compare at a glance, then pick.",
  },
  {
    q: "Pattern 5 is \"Throwaway editors\". What is the part that makes this pattern work?",
    options: [
      "Keeping the page forever",
      "The export/\"copy as text\" button — it turns a visual decision back into precise text the AI can act on",
      "Adding many colors",
      "Sharing it publicly",
    ],
    answer: 1,
    why: "You use a quick drag-and-drop page for ten minutes, then the export button copies your final arrangement as text. The page is disposable; the text is what you keep.",
  },
  {
    q: "What is the through-line in all five HTML patterns?",
    options: [
      "Everything stays in Markdown",
      "Markdown (or your data) goes in, HTML comes out, and anything that needs to continue the conversation comes back as text",
      "You must write code",
      "Each pattern needs a different tool",
    ],
    answer: 1,
    why: "In every pattern: Markdown (or data) goes in, HTML comes out, and anything continuing the conversation comes back as text.",
  },
  {
    q: "When you post into a social feed (WhatsApp, LinkedIn, Facebook), what should the body of your post be?",
    options: ["HTML", "Plain text", "A PDF", "Markdown with tables"],
    answer: 1,
    why: "Feeds strip or ignore formatting, so the post body should be plain text. HTML is only for the link-preview card or a screenshotted image.",
  },
  {
    q: "For a page you SHARE as a link in a post, what do you ask the AI to add so the preview card looks designed?",
    options: [
      "More colors",
      "Open Graph (link-preview) tags",
      "A longer title",
      "A password",
    ],
    answer: 1,
    why: "Ask the AI to include Open Graph / link-preview tags so the platform builds a good preview card instead of a blank one.",
  },
  {
    q: "Which publishing option is the easiest, with zero setup?",
    options: [
      "GitHub Pages",
      "Claude.ai's built-in publish button (one click turns the artifact into a public link)",
      "Netlify",
      "GitHub Gist",
    ],
    answer: 1,
    why: "Claude.ai's built-in publish is easiest: one click on the artifact panel turns your page into a public link, no hosting or account needed on their end.",
  },
  {
    q: "You need a permanent page on your own web address. Which option fits best?",
    options: [
      "Claude.ai publish",
      "GitHub Gist",
      "GitHub Pages (a free, stable address like yourname.github.io/mypage)",
      "Just keep it in chat",
    ],
    answer: 2,
    why: "GitHub Pages gives a free, stable web address you fully control — the right choice for a lasting landing page or portfolio.",
  },
  {
    q: "Which option is permanent but with the simplest setup (just drag and drop)?",
    options: ["Netlify", "GitHub Pages", "GitHub Gist", "Claude.ai publish"],
    answer: 0,
    why: "Netlify sits between Claude's publish button and GitHub Pages: make a free account, drag your HTML file on, and it is live at a real address.",
  },
  {
    q: "Sometimes the reader needs a specific file, not a web page. What small addition does the question \"who reads this last?\" get?",
    options: [
      "How much does it cost?",
      "...and what will they DO with it?",
      "...what color do they like?",
      "...how fast can they read?",
    ],
    answer: 1,
    why: "The question gains one addition: who reads this last, AND what will they do with it? Reading, signing, editing, and presenting each point to a different format.",
  },
  {
    q: "Someone needs to SIGN, print, or file your output as a permanent record. Which format?",
    options: ["Word (.docx)", "PDF", "Excel (.xlsx)", "CSV"],
    answer: 1,
    why: "A PDF looks the same everywhere and cannot be accidentally changed — perfect for signing, printing, or filing.",
  },
  {
    q: "Someone needs to EDIT your output and add comments (Track Changes). Which format?",
    options: ["PDF", "Word document (.docx)", "CSV", "HTML link"],
    answer: 1,
    why: "A Word document (.docx) lets the recipient open it in Word and use Track Changes — you are fitting into their workflow.",
  },
  {
    q: "Someone needs to PRESENT your output in a meeting. Which format?",
    options: ["Slides (.pptx)", "CSV", "PDF", "Markdown"],
    answer: 0,
    why: "Slides (.pptx) open in PowerPoint, Keynote, or Google Slides for clicking through in a meeting.",
  },
  {
    q: "Someone needs to WORK with the numbers (change assumptions, add formulas). Which format?",
    options: ["PDF", "Excel spreadsheet (.xlsx)", "Slides", "Plain text"],
    answer: 1,
    why: "An Excel spreadsheet (.xlsx) lets them open it in Excel or Google Sheets and interact with the data — formulas recalculate.",
  },
  {
    q: "The book says \"CSV is to data what Markdown is to text\". What does that mean?",
    options: [
      "Both are colorful",
      "Both are plain, simple, and meant for machines and tools",
      "Both are only for humans",
      "Both are paid formats",
    ],
    answer: 1,
    why: "CSV and Excel mirror Markdown and HTML: CSV is plain and meant for machines (like Markdown for text); Excel is formatted for humans (like HTML).",
  },
  {
    q: "When you ask for an office format (PDF, Word, slides, Excel), what is that office file in the workflow?",
    options: [
      "The source of truth you keep editing",
      "The last step — the export; you keep your clean structured source (Markdown/CSV) and regenerate the export when needed",
      "Something you never use",
      "The only file that matters",
    ],
    answer: 1,
    why: "You write content once in clean structured text; the office file is the last step, the export. To change something, edit the source and regenerate — don't work backwards.",
  },
  {
    q: "In the accountant example, three people get three different formats. How did she pick each one?",
    options: [
      "By habit",
      "By asking: what will this person do with it?",
      "By picking the cheapest",
      "By choosing randomly",
    ],
    answer: 1,
    why: "The audit reviewer got Excel, the board got a published link, the signed letter went as PDF — each chosen by asking \"what will this person do with it?\"",
  },
  {
    q: "Part 4 describes three \"motions\" (ways to do the same work). What are they?",
    options: [
      "Read, write, delete",
      "Chat, Terminal, and Desktop",
      "Morning, noon, night",
      "Free, paid, premium",
    ],
    answer: 1,
    why: "The three motions are Chat (browser), Terminal (Claude Code / OpenCode), and Desktop (Cowork / OpenWork).",
  },
  {
    q: "Right now, which of the three motions do you actually need?",
    options: [
      "All three at once",
      "Just the first one (chat) — the other two are previews for later",
      "Only the terminal",
      "None of them",
    ],
    answer: 1,
    why: "Right now you only need chat. The terminal and desktop motions are previews — come back to them after the later courses.",
  },
  {
    q: "Why is chat the best starting point for a single spec-and-page pair?",
    options: [
      "It is the most expensive",
      "The AI builds the page right next to your chat, you see it instantly, edits happen in place, and sharing is one click",
      "It needs no internet",
      "It can read all your files automatically",
    ],
    answer: 1,
    why: "In chat the AI builds the page beside your conversation, you see it instantly, changes happen in place, and sharing is one click — nothing is faster for one pair.",
  },
  {
    q: "Where does the chat motion reach its limit?",
    options: [
      "It cannot make HTML",
      "It can only work with what you paste or attach; scattered files across folders need a tool that finds them",
      "It is too slow",
      "It cannot publish links",
    ],
    answer: 1,
    why: "Chat can only use what you paste or attach. If notes are scattered across many files and folders, you need the terminal or desktop motion that finds them.",
  },
  {
    q: "In the terminal motion, what is the big difference from chat?",
    options: [
      "It is more colorful",
      "Instead of pasting notes, you put them in a folder and the AI reads every file automatically",
      "It cannot make files",
      "It only works online",
    ],
    answer: 1,
    why: "In the terminal, you put your notes in a folder, the AI reads every file by itself, and it writes real files (spec.md, report.html) onto your disk.",
  },
  {
    q: "In the desktop motion (Cowork / OpenWork), what important habit should you always use?",
    options: [
      "Let it change files without asking",
      "Ask it to show you a plan first and wait for your approval before writing anything",
      "Never read the plan",
      "Delete files first",
    ],
    answer: 1,
    why: "Because desktop apps can change real files, always ask them to show a plan first and wait for your approval before writing anything.",
  },
  {
    q: "If you keep only ONE sentence from the whole course, what is it?",
    options: [
      "Always use HTML for everything",
      "Write Markdown precise enough for a machine; demand HTML rich enough for a human",
      "Never write specs",
      "Only chat tools matter",
    ],
    answer: 1,
    why: "The single sentence to carry: write Markdown precise enough for a machine; demand HTML rich enough for a human.",
  },
  {
    q: "An HONEST caveat in the course: when is HTML output NOT worth it?",
    options: [
      "When the output is long and visual",
      "For a quick three-line answer in back-and-forth chat — there, plain responses are the right default",
      "When sharing a report",
      "When a person reads it",
    ],
    answer: 1,
    why: "HTML uses more tokens; for a three-line answer it is pure overhead. The trade is worth it when the output is long, visual, shared, or revisited.",
  },
  {
    q: "In the appendix, why are you told NOT to read the long HTML block line by line?",
    options: [
      "Because it is secret",
      "Because long HTML is for the browser, not the eye — the reading happens in the browser, not in the code",
      "Because it is wrong",
      "Because it is too short",
    ],
    answer: 1,
    why: "The point of the appendix is that long HTML is meant for the browser, not your eye. You scroll past it — that scroll is itself the lesson.",
  },
];

// ---- Module 6 questions (from File 6: Code You Never Write — A Crash Course · 13 concepts) ----
const MODULE_6 = [
  {
    q: "What is the one-line promise of the \"Code You Never Write\" course?",
    options: [
      "You learn to write code line by line",
      "You describe the problem; the AI picks the language, writes the code, runs it, and fixes it — you never write or read a line",
      "You only read code, never write it",
      "You build your own computer first",
    ],
    answer: 1,
    why: "You describe the problem. The AI picks the language, writes the code, runs it, and fixes it. You never write a line, though you learn to check what it did.",
  },
  {
    q: "In the opening story, what did the bookkeeper do differently last month?",
    options: [
      "She finally learned to program",
      "She opened an AI chat and described the file-matching problem in plain English",
      "She hired a developer for two weeks",
      "She gave up on the task",
    ],
    answer: 1,
    why: "She typed a plain-English request — find every transaction in one file but not the other — and got the answer in a minute.",
  },
  {
    q: "The course teaches how many concepts, covering what share of real use?",
    options: ["9 concepts, 50%", "13 concepts, 80%", "20 concepts, 100%", "5 concepts, 30%"],
    answer: 1,
    why: "13 concepts, grouped into four short parts, cover about 80% of real AI use for everyday data work.",
  },
  {
    q: "Concept 1 says \"code is no longer gated by coding.\" What is the new question you ask?",
    options: [
      "\"Do I know how to do this?\"",
      "\"Can I describe what done looks like?\"",
      "\"Which language should I use?\"",
      "\"Who can I hire to do this?\"",
    ],
    answer: 1,
    why: "Stop asking \"do I know how to do this?\" Start asking \"can I describe what done looks like?\" If you can describe done, you can commission code.",
  },
  {
    q: "The table of six professions (bookkeeper, doctor, teacher...) all shared one pattern. What was it?",
    options: [
      "Their problems were always describable but never commissionable, until now",
      "They all already knew how to code",
      "They all used the exact same software",
      "They all worked in the same company",
    ],
    answer: 0,
    why: "Six professions, zero lines of code read. Every row was a problem that was always describable but never commissionable, until now.",
  },
  {
    q: "Concept 2: who picks the programming language?",
    options: [
      "You must always choose it yourself",
      "The AI picks the language; you only describe the outcome",
      "A human developer must pick it",
      "The language never matters at all",
    ],
    answer: 1,
    why: "You describe the outcome; the choice of language follows automatically. Telling the AI \"use Python\" is micromanagement.",
  },
  {
    q: "When you want a number, file, or report, which language does the AI usually pick?",
    options: ["JavaScript", "Python", "HTML", "SQL"],
    answer: 1,
    why: "For a number, file, or report (totals, reconciliations, renaming files), Python is the AI's mother tongue most of the time.",
  },
  {
    q: "When you want \"a thing you click or open\" (a calculator or dashboard), which language does the AI usually pick?",
    options: ["Python", "JavaScript / TypeScript", "CSV", "Markdown"],
    answer: 1,
    why: "For something clickable that runs in a browser, the AI reaches for JavaScript / TypeScript.",
  },
  {
    q: "The one property of code worth memorizing is:",
    options: [
      "Code is always slow",
      "Code is exact, in both directions — it does exactly what it was told, including the wrong thing, perfectly, at scale",
      "Code is always correct",
      "Code can read your mind",
    ],
    answer: 1,
    why: "Code is exact in both directions: zero arithmetic errors, but it will also do exactly the wrong thing if the brief is wrong — fast, and at scale.",
  },
  {
    q: "The recipe analogy: a perfectly obedient robot told \"simmer 20 hours\" instead of 20 minutes makes charcoal. What is the lesson?",
    options: [
      "The robot failed",
      "The robot didn't fail — the brief did; writing a clear brief is the whole job",
      "Recipes are useless",
      "Robots cannot cook at all",
    ],
    answer: 1,
    why: "The robot executed perfectly. The brief was wrong. Everything in Part 2 is about writing briefs that don't burn the kitchen down.",
  },
  {
    q: "Concept 3: the one question you ask before any prompt is:",
    options: [
      "\"How much will it cost?\"",
      "\"Is this a question for the AI's mind, or a job for its hands?\"",
      "\"Which AI is the best one?\"",
      "\"How long will it take?\"",
    ],
    answer: 1,
    why: "That single decision — mind (just answer) vs hands (write and run code) — is the one the whole course turns on.",
  },
  {
    q: "AI has two ways to help you. What are they?",
    options: [
      "Sleep and wake",
      "Answer (from its own reasoning) and compute (write and run code on your real data)",
      "Read and delete",
      "Buy and sell",
    ],
    answer: 1,
    why: "It can answer (draft, advise, summarize, explain) and it can compute (write and run code that operates on your actual data).",
  },
  {
    q: "Why were the school administrator's results wrong (it said 8 families, the real number was 11)?",
    options: [
      "The AI was broken",
      "The AI answered (skimmed) when it should have computed (run code)",
      "The spreadsheet was empty",
      "She typed the wrong question",
    ],
    answer: 1,
    why: "Nobody lied; the AI pattern-matched from a skim rather than computing. The three missed families had partial payments a glance reads as paid.",
  },
  {
    q: "What do the four letters \"VPRF\" stand for?",
    options: [
      "Very Precise Range Finder",
      "Volume, Precision, Repetition, Files",
      "Verify, Process, Run, Fix",
      "Value, Price, Risk, Format",
    ],
    answer: 1,
    why: "VPRF — Volume, Precision, Repetition, Files — is the four-letter test for spotting a code problem.",
  },
  {
    q: "How many of the four VPRF signals must a task trip to count as a \"code problem\"?",
    options: ["All four", "Any one is enough", "At least three", "Exactly two"],
    answer: 1,
    why: "If a task trips even one of Volume, Precision, Repetition, or Files, it is a code problem.",
  },
  {
    q: "Which of these is a CODE problem?",
    options: [
      "\"Draft a polite email declining a meeting\"",
      "\"Which of these 80 contracts have a non-standard termination clause?\"",
      "\"Is my business idea good?\"",
      "\"Explain what a mutual fund is\"",
    ],
    answer: 1,
    why: "Volume + Files. Code scans all 80; a glance-based answer would miss some.",
  },
  {
    q: "The \"trap to watch for\" is a task that looks like an answer problem but secretly trips which signal?",
    options: ["Volume", "Precision", "Repetition", "Files"],
    answer: 1,
    why: "\"Roughly how did sales trend?\" feels conversational, but if a decision rests on the number, it is a Precision (code) problem.",
  },
  {
    q: "Concept 4: the three-line incantation forces the AI to do what?",
    options: [
      "Write a long essay",
      "Compute (run code), prove it ran by showing the code, and state the exact row count, column names, and date range",
      "Use only Python",
      "Skip all verification",
    ],
    answer: 1,
    why: "Line 1 forces computation, line 2 demands the code as proof, line 3 makes it report row count, columns, and date range.",
  },
  {
    q: "Why does asking for the row count, column names, and date range act as a \"lie detector\"?",
    options: [
      "It makes the AI answer faster",
      "If the AI is really reading your file these will be exactly right; if it is making things up you'll get a round number and wrong column names",
      "It changes the colour of the answer",
      "It is required by law",
    ],
    answer: 1,
    why: "Reading the real file gives exact details; inventing gives a suspiciously round number and plausible-but-wrong column names — your signal to stop.",
  },
  {
    q: "The course says tell the AI to \"compute,\" but never tell it:",
    options: [
      "what the data is",
      "which language to compute in",
      "the row count",
      "the goal",
    ],
    answer: 1,
    why: "\"Write and run code\" lets the AI pick the right tool. Adding \"in Python\" forces its hand on a guess you're not equipped to make.",
  },
  {
    q: "Concept 5: the best code briefs contain:",
    options: [
      "as much technical language as possible",
      "no technical language at all — you describe a good outcome, not loops or libraries",
      "only the name of the programming language",
      "nothing except the goal",
    ],
    answer: 1,
    why: "You specify what a good outcome looks like, exactly as you would for a human assistant; the AI translates intent into implementation.",
  },
  {
    q: "What are the five sections of a complete code brief?",
    options: [
      "Title, Author, Date, Page, Footer",
      "Goal, Input, Output, Rules, Edge cases",
      "Start, Middle, End, Review, Sign",
      "Who, What, When, Where, Why",
    ],
    answer: 1,
    why: "The five-section brief is Goal, Input, Output, Rules, and Edge cases.",
  },
  {
    q: "The two brief sections beginners skip are the two that matter most. Which are they?",
    options: ["Goal and Input", "Rules and Edge cases", "Output and Goal", "Input and Output"],
    answer: 1,
    why: "Rules and Edge cases are the two starred sections beginners skip — and the ones that prevent almost every wrong answer.",
  },
  {
    q: "In a brief, what belongs in the \"Rules\" section?",
    options: [
      "The price of the work",
      "Your professional knowledge — constraints a stranger wouldn't know (e.g. the school year starts in August, \"Pending\" means not submitted)",
      "The programming language to use",
      "The author's name",
    ],
    answer: 1,
    why: "Rules is where your professional knowledge lives. Every wrong analysis traces back to a Rule you knew but didn't state.",
  },
  {
    q: "What is the professional move for the \"Edge cases\" section (imperfect data)?",
    options: [
      "Guess what each bad row probably means",
      "Decide in advance: \"If you hit a row you can't interpret, don't guess; skip it, and list every skipped row at the end.\"",
      "Silently delete all the bad rows",
      "Ignore the data completely",
    ],
    answer: 1,
    why: "That one sentence converts silent corruption into a visible report you can review.",
  },
  {
    q: "Why do people who half-know programming often write WORSE briefs than total beginners?",
    options: [
      "They are lazy",
      "They micromanage the \"how\" and under-specify the \"what\"",
      "They type too slowly",
      "They never read the data",
    ],
    answer: 1,
    why: "Half-knowing leads to micromanaging implementation (\"write this in Python\") while under-specifying the outcome that actually matters.",
  },
  {
    q: "Concept 6: since the model has no truth-checker of its own, verification here means:",
    options: [
      "simply trusting the AI",
      "running and reading, not trusting — with code, you can run it",
      "deleting the output",
      "asking a friend to guess",
    ],
    answer: 1,
    why: "The model has no truth-checker, but code does one thing it doesn't: you can run it. So verification is running and reading, not trusting.",
  },
  {
    q: "What is the single most powerful verification move (the \"known-answer test\")?",
    options: [
      "Re-derive the entire thing by hand",
      "Run the code on one slice whose answer you already know",
      "Trust the biggest number",
      "Use the most expensive AI",
    ],
    answer: 1,
    why: "Feed the code a slice you already verified (one month you closed, one student you computed). If it reproduces your answer, your trust is earned.",
  },
  {
    q: "In the pharmacist example, how did \"salting\" the data with one known error help?",
    options: [
      "It deleted the bad data",
      "The script caught her planted error plus four real ones — catching the plant is what let her trust the four",
      "It made the code run faster",
      "It proved the AI was lying",
    ],
    answer: 1,
    why: "Salt your data with one known error and see if the code finds it — a known-answer test in its most elegant form, costing about ninety seconds.",
  },
  {
    q: "What is the ONE check you must never skip?",
    options: [
      "The cross-model check",
      "Never act on a precision-critical number you haven't tested against at least one answer you independently know",
      "The adversarial pass",
      "The plain-English replay",
    ],
    answer: 1,
    why: "Code is exact, including exactly wrong. The known-answer test is your firewall — the one check you never skip.",
  },
  {
    q: "Concept 7: what mindset does the course recommend when code breaks?",
    options: [
      "The project has failed; give up",
      "An error is not failure — it is the computer describing, very precisely, what it needs; errors are dialogue",
      "Delete everything and restart",
      "Blame the AI",
    ],
    answer: 1,
    why: "An error is not the project failing; it is the computer telling you, precisely, what it needs. Errors are dialogue, not failure.",
  },
  {
    q: "For a red-text error, what is the entire skill?",
    options: [
      "First learn to read the code yourself",
      "Paste the full error and say \"diagnose it, fix the code, and run it again\" — you forward it, you don't interpret it",
      "Ignore it and hope",
      "Email the software company",
    ],
    answer: 1,
    why: "You don't interpret the error; you forward it. The AI reads its own error messages, fixes the script, and reruns. Most errors die on the first paste.",
  },
  {
    q: "\"Fluency in errors is not required.\" What IS required (the marketer / \"codec\" story)?",
    options: [
      "You must understand every error message",
      "Willingness to paste the error so the AI can read it",
      "Errors simply can't be fixed",
      "Only real coders can fix errors",
    ],
    answer: 1,
    why: "The marketer never learned what a codec was and never needed to. Fluency in errors is not required; willingness to paste them is.",
  },
  {
    q: "If the same fix fails three times in a row, what does that usually mean?",
    options: [
      "You typed the prompt wrong",
      "The approach is wrong, not the typing — step back, restate the problem fresh, and ask for two different approaches",
      "The AI is permanently broken",
      "You should wait a full day",
    ],
    answer: 1,
    why: "Three strikes means the approach is wrong. Restate the problem fresh and ask for two completely different approaches; if the chat is long, start a clean one (context rot).",
  },
  {
    q: "Concept 8: \"Keep what you build.\" What turns a one-time solution into an asset?",
    options: [
      "Deleting the script after use",
      "Saving the script (with a plain-English header) so you can rerun it forever and hand it to anyone",
      "Memorizing all the code",
      "Paying a monthly fee",
    ],
    answer: 1,
    why: "Describe once, run forever, hand to anyone. Saving the documented script is the first brick of every AI Worker later in the book.",
  },
  {
    q: "The recommended way to store kept scripts is:",
    options: [
      "in your email inbox",
      "one folder (my-scripts/) with a subfolder per task, each holding the brief, the script, and a sample input file",
      "printed out on paper",
      "nowhere — just remember them",
    ],
    answer: 1,
    why: "Give them a home: my-scripts/, one subfolder per task, each with the brief, the script, and a sample input — tomorrow's known-answer test, pre-packaged.",
  },
  {
    q: "Complete the line: \"Chat is where scripts are born; your machine is where they ____.\"",
    options: ["die", "live", "hide", "break"],
    answer: 1,
    why: "Chat is where scripts are born; your machine is where they live — the best argument for moving to the Part 3 surfaces later.",
  },
  {
    q: "Concept 9: on Claude.ai (the browser/home surface), what is its main limit?",
    options: [
      "It cannot produce HTML",
      "The sandbox sees only what you upload — 40 files means 40 uploads, and \"log into my network devices\" is impossible from there",
      "It is far too slow",
      "It costs too much money",
    ],
    answer: 1,
    why: "The browser sandbox is great for one-off jobs, but it only sees what you upload and can't reach your folders or devices.",
  },
  {
    q: "Complete the line: \"The chat sandbox is a workshop you visit; it is not where your ____ live.\"",
    options: ["friends", "files", "scripts", "emails"],
    answer: 1,
    why: "The chat sandbox is a workshop you visit; it is not where your files live. When the problem is about your computer, you've outgrown the visit.",
  },
  {
    q: "Concept 10: Claude Code and OpenCode live in the terminal. The course reframes the terminal as:",
    options: [
      "a scary developer-only tool",
      "just a chat box that sits inside a folder — everything you type is plain English, and the files are already there",
      "a kind of video game",
      "another web browser",
    ],
    answer: 1,
    why: "The terminal is just a chat box that sits inside a folder. It lists files you never uploaded, because they were already there.",
  },
  {
    q: "What is the network engineer's case an example of?",
    options: [
      "A task that needs code running from his own machine, on his network, on a schedule — which a browser tab can never do",
      "A simple one-off question",
      "Something only the chat sandbox can handle",
      "A task that needs no code at all",
    ],
    answer: 0,
    why: "He logs into 40 devices each morning to pull health reports. That needs code running from his machine, on his network — no browser sandbox can do it.",
  },
  {
    q: "Concept 11: Cowork and OpenWork are desktop apps. Their defining feature is:",
    options: [
      "they delete files automatically to save space",
      "plan first, act after approval — they show a plan in plain English and wait for your approval before doing anything",
      "they only work while you are online",
      "they need absolutely no setup",
    ],
    answer: 1,
    why: "Their built-in rhythm is plan-then-approve: they describe what they'll do, you read it in plain English, catch wrong assumptions, then approve.",
  },
  {
    q: "What is the honest sequencing advice for moving off the browser?",
    options: [
      "Install every tool on day one",
      "Stay on Claude.ai until uploading becomes the annoying part of your week — that annoyance is the graduation signal",
      "Never use the chat surface again",
      "Only ever use the terminal",
    ],
    answer: 1,
    why: "Most readers feel that upload annoyance within a month of applying the course to real work; that's when the tool-pair courses are waiting.",
  },
  {
    q: "Concept 12: \"Blast radius.\" Two facts people learn the expensive way are:",
    options: [
      "files are always backed up and undo always works",
      "files deleted by an agent often skip the recycle bin, and files edited by a script keep no undo history",
      "code is always slow and AI is always right",
      "the AI remembers everything, so nothing is lost",
    ],
    answer: 1,
    why: "On your own machine, deleted files often skip the recycle bin and script-edited files keep no undo history — so you shrink the blast radius first.",
  },
  {
    q: "What are the four blast-radius rules before code touches your files?",
    options: [
      "Hurry, guess, overwrite, hope",
      "Work on copies, dry run first, scope the territory (smallest folder), and output to new files",
      "Delete first, then check later",
      "Give the AI full access immediately",
    ],
    answer: 1,
    why: "Four cheap rules — work on copies, dry run first, scope to the smallest folder, output to new files — remove nearly all the risk.",
  },
  {
    q: "What is a \"dry run\"?",
    options: [
      "Running the same code twice",
      "Asking the AI to show every operation it would perform — and wait — before anything actually moves",
      "Running code with no data in it",
      "Deleting the originals first",
    ],
    answer: 1,
    why: "\"Show me every operation you'd perform, and wait.\" You read the list before any rename, move, or delete happens.",
  },
  {
    q: "Concept 13: which of these needs MORE than one-prompt code?",
    options: [
      "Totalling your monthly expenses",
      "Software other people log into, always-on automation, high-stakes actions with no undo, and judgment calls",
      "Renaming 300 photos by date",
      "Reconciling two files once",
    ],
    answer: 1,
    why: "Across the edge of the map sit multi-user software, unattended automation, no-undo actions, and judgment — buildable, but with real engineering discipline.",
  },
  {
    q: "\"Judgment wearing a computation costume\" (e.g. \"compute which employees to promote\") means:",
    options: [
      "the arithmetic is the hard part",
      "the arithmetic is trivial; the criteria are the whole problem, and they are yours — code computes, you decide",
      "the AI should make the decision for you",
      "promotions can never use code",
    ],
    answer: 1,
    why: "The math is trivial; the criteria are the entire problem, and they are yours, not Python's. Code computes; you decide.",
  },
  {
    q: "The single identity the whole course comes back to is:",
    options: [
      "you are the contractor",
      "you are the client, not the contractor",
      "you are the manager",
      "you are the developer",
    ],
    answer: 1,
    why: "Underneath all 13 concepts: you are the client, not the contractor. You brief clearly, verify against what you know, and keep what you paid for.",
  },
  {
    q: "The one skill the prompting course never needed, but this course teaches, is:",
    options: [
      "typing fast",
      "you can trust work you cannot see — because you tested it against something you already knew",
      "writing HTML tags by hand",
      "memorizing Python syntax",
    ],
    answer: 1,
    why: "The new skill is trusting work you cannot see, earned by testing it against an answer you independently know.",
  },
  {
    q: "Project 1 (\"The Year of You\") asks you to:",
    options: [
      "write a short novel",
      "compute a year of your own real data (screen time, bills, grades...), verify it with a known-answer test, and keep the script",
      "build a full website",
      "learn JavaScript from scratch",
    ],
    answer: 1,
    why: "Export a year of real data about yourself, brief it, demand code, verify one month by hand, finish with an HTML report and a saved, documented script.",
  },
];

// ---- Module 7 questions (from File 7: "Skills & Connectors: Teach AI Once, Connect It to Your Apps") ----
const MODULE_7 = [
  {
    q: "What is this course's one-line summary of its scope?",
    options: [
      "2 features, 5 tools, 0 code from you",
      "10 features, 2 tools, 100 lines of code",
      "1 feature, 1 tool, full coding required",
      "5 features, 10 tools, half code from you",
    ],
    answer: 0,
    why: "The course promises 2 Features, 5 Tools, 0 Code From You — turning your chat box into a coworker.",
  },
  {
    q: "How does the course describe the old way most people use AI?",
    options: [
      "Like a personal assistant who remembers everything",
      "Like a vending machine — you ask, you get an answer, then it forgets everything",
      "Like a calculator",
      "Like a search engine only",
    ],
    answer: 1,
    why: "Most people treat AI like a vending machine: walk up, type a request, take what falls out, and every visit starts from zero.",
  },
  {
    q: "What is a Skill, in this course's definition?",
    options: [
      "A way to give AI access to your files",
      "Something that teaches AI to do a task your way, every time, without re-explaining",
      "A type of AI model",
      "A chat history feature",
    ],
    answer: 1,
    why: "A Skill teaches AI a task once so it repeats that task your way, every time, without you re-explaining it.",
  },
  {
    q: "What is a Connector, in this course's definition?",
    options: [
      "A way to format text",
      "Safe access that lets AI reach into apps where your real work lives, like files, email, or spreadsheets",
      "A button that clears your chat",
      "A type of programming language",
    ],
    answer: 1,
    why: "A Connector gives AI safe access to the apps where your real work lives, so it can act instead of asking you to copy-paste.",
  },
  {
    q: "This course assumes the mental model from which earlier Foundations course?",
    options: ["AI Prompting in 2026", "What AI Actually Is", "Code You Never Write", "How to Think in the AI Era"],
    answer: 1,
    why: "This is a Foundations crash course that assumes the mental model already built in \"What AI Actually Is.\"",
  },
  {
    q: "Which two courses pair naturally with this one, according to the course itself?",
    options: [
      "AI Prompting in 2026 and How to Think in the AI Era",
      "Code You Never Write and What AI Actually Is",
      "Only AI Prompting in 2026",
      "Only How to Think in the AI Era",
    ],
    answer: 0,
    why: "It pairs naturally with AI Prompting in 2026 (how to talk to AI well) and How to Think in the AI Era (asking the right questions).",
  },
  {
    q: "When was this course content last verified?",
    options: ["December 2025", "June 2026", "January 2026", "It is never verified"],
    answer: 1,
    why: "The course notes it was last verified in June 2026, though menu paths and limits may drift over time.",
  },
  {
    q: "What is the single sentence the whole course is built on?",
    options: [
      "A chat message tells AI what to do this once. A Skill teaches AI how every time. A Connector gives AI hands to reach your real apps.",
      "AI can do anything you ask without limits",
      "Connectors and Skills are the same thing",
      "Only programmers can build Skills",
    ],
    answer: 0,
    why: "Every section in the course is a variation on this one idea: a chat message is one-time, a Skill is repeatable how-to, a Connector is reach into your real apps.",
  },
  {
    q: "In the kitchen analogy, what do Connectors represent?",
    options: ["The recipe cards", "The kitchen itself — the stove, knives, and stocked pantry", "The chef's uniform", "The customer's order"],
    answer: 1,
    why: "Connectors are the kitchen itself: the tools and the stocked pantry. Without them a cook can describe a meal but cannot make one.",
  },
  {
    q: "In the kitchen analogy, what do Skills represent?",
    options: ["The kitchen appliances", "The recipe cards — step-by-step instructions for making a dish your way", "The grocery list", "The waiter"],
    answer: 1,
    why: "Skills are the recipe cards: step-by-step instructions for making a specific dish your way, consistently, whether you or a new hire is cooking.",
  },
  {
    q: "What happens if you have a kitchen (Connectors) but no recipes (Skills)?",
    options: ["Nothing changes", "Every dish is improvised and inconsistent", "The kitchen stops working", "Recipes appear automatically"],
    answer: 1,
    why: "Give a cook a kitchen but no recipes, and every dish is improvised and inconsistent.",
  },
  {
    q: "What happens if you have recipes (Skills) but no kitchen (Connectors)?",
    options: ["The cook can read recipes but cannot actually cook", "Nothing is needed", "The dish is automatically perfect", "The recipes rewrite themselves"],
    answer: 0,
    why: "Give them recipes but no kitchen, and they can read but not cook — both are needed together to reliably produce the dish.",
  },
  {
    q: "In the course's glossary, what does \"Fire\" or \"trigger\" mean?",
    options: ["Deleting a skill", "When AI activates a skill on its own because your request matched it", "Turning off a connector", "Restarting the chat"],
    answer: 1,
    why: "Fire / trigger means AI activates a skill on its own when your request matches the skill's description.",
  },
  {
    q: "In the course's glossary, what does \"Scope\" mean?",
    options: ["The price of a connector", "How much access you give a connector — a single folder versus everything", "The length of a skill file", "The number of skills you own"],
    answer: 1,
    why: "Scope is how much access you give: a single folder, or everything. Smaller scope means safer.",
  },
  {
    q: "What is the recommended best practice the first time you connect a new app?",
    options: ["Grant full write access immediately", "Start read-only and grant write access only once you trust how the tool behaves", "Never connect any app", "Always connect every available app at once"],
    answer: 1,
    why: "Good practice is to start read-only and grant write access only once you trust how the tool behaves.",
  },
  {
    q: "How often do you decide which connectors a chat may use?",
    options: ["Once, forever, with no further control", "Per conversation — connecting an app once just makes it available", "Only at sign-up", "Connectors cannot be controlled at all"],
    answer: 1,
    why: "Connecting an app once makes it available, but you still decide per conversation which connectors that chat may actually use.",
  },
  {
    q: "Which of these is listed as a ready-made connector in the directory?",
    options: ["Microsoft Paint", "Google Drive", "Notepad", "Calculator"],
    answer: 1,
    why: "The directory of ready-made connectors includes Google Drive, Gmail, Slack, Notion, Figma, Linear, Atlassian, and more.",
  },
  {
    q: "What standard does a custom connector use to reach a new service?",
    options: ["HTML", "MCP", "CSS", "SQL"],
    answer: 1,
    why: "You can add a custom connector to any service that speaks MCP, the open protocol connectors run on.",
  },
  {
    q: "What can some \"interactive\" connectors do, beyond just returning text?",
    options: ["Nothing extra", "Render a live dashboard, task board, or design surface right inside the conversation", "Delete your files automatically", "Change your subscription plan"],
    answer: 1,
    why: "Some connectors are interactive — they render a live dashboard, task board, or design surface right inside the conversation.",
  },
  {
    q: "How is a Project different from a Skill?",
    options: [
      "A Project is the same as a Skill",
      "A Project always loads its context the moment you open a chat in it; a Skill stays dormant until a matching request fires it",
      "A Project never loads any context",
      "A Skill always loads everywhere, all the time",
    ],
    answer: 1,
    why: "A Project always loads context the instant you open a chat in it — useful, but always on. A Skill stays dormant until a request matches it.",
  },
  {
    q: "How is a Skill different from a Connector?",
    options: [
      "They are identical features",
      "A Connector is access — what AI can reach; a Skill is expertise — how AI should behave",
      "A Connector is expertise; a Skill is access",
      "Neither one matters for real work",
    ],
    answer: 1,
    why: "A Connector is access (what AI can reach); a Skill is expertise (how AI should behave). They are partners, not alternatives.",
  },
  {
    q: "How is a Skill different from Custom instructions?",
    options: [
      "Custom instructions touch everything you do; a Skill touches one kind of task",
      "A Skill touches everything; custom instructions touch nothing",
      "They cannot both exist at once",
      "Custom instructions only work inside one chat",
    ],
    answer: 0,
    why: "Custom instructions apply broadly to all your chats. A Skill applies to one kind of task, like a specific report format.",
  },
  {
    q: "In Claude.ai (web and mobile), how do Skills normally activate?",
    options: [
      "You must type a slash command every time",
      "They fire automatically — AI reads your request and checks it against your installed skills' descriptions",
      "They never activate on their own",
      "Only an administrator can activate them",
    ],
    answer: 1,
    why: "In Claude.ai, Skills fire automatically: AI checks your plain-language request against the descriptions of your installed skills and loads a match on its own.",
  },
  {
    q: "In Cowork and the Microsoft 365 add-ins, how can you explicitly force a specific skill?",
    options: ["You can't — it's always automatic only", "Type / to browse your skills and pick one directly", "You must email support", "You must restart the app"],
    answer: 1,
    why: "In Cowork and the Microsoft 365 add-ins, you can type / to browse your skills and pick one explicitly, or just describe the task naturally.",
  },
  {
    q: "In Claude Code and OpenCode, can skills load automatically?",
    options: ["No, they require manual installation every single time", "Yes — they load automatically when relevant, and can also be invoked deliberately", "Only on certain days", "Only if connected to the internet"],
    answer: 1,
    why: "In Claude Code and OpenCode, skills also load automatically when relevant, and you can invoke them deliberately too.",
  },
  {
    q: "What is the \"third option\" for forcing a skill that works everywhere, including Claude.ai?",
    options: ["Restarting your device", "Just naming the skill in plain English, like \"use my brand-voice skill\"", "Paying for a premium plan", "Uninstalling and reinstalling the skill"],
    answer: 1,
    why: "A third option works everywhere: just name the skill in plain English, such as \"use my brand-voice skill to draft this caption.\"",
  },
  {
    q: "What is the course's overall takeaway about how skills fire by default?",
    options: ["Default behavior is manual; you must always pick a skill yourself", "Default behavior is automatic — AI picks the right skill by reading your prompt", "Skills never fire unless paid for", "Skills only fire once per day"],
    answer: 1,
    why: "Default behavior is automatic. Slash commands and naming a skill are override tools for when you want to be explicit.",
  },
  {
    q: "What is the \"real magic\" the course describes when Skills and Connectors are combined?",
    options: [
      "Nothing changes versus using either alone",
      "The Connector fetches the real data; the Skill shapes the output your way — work gets delegated, not just assisted",
      "Connectors stop working when Skills are added",
      "Only one of the two can be active at a time",
    ],
    answer: 1,
    why: "Together, the Connector fetches the real data and the Skill shapes the output your way — this is where work actually gets delegated rather than assisted.",
  },
  {
    q: "In the accountant's monthly close example, what does the Connector do?",
    options: ["It writes the report cover page", "It fetches the ledger data from Google Drive", "It deletes old client files", "It sends invoices automatically"],
    answer: 1,
    why: "The Drive connector fetches the ledger; the client-summary skill then formats and organizes that data into the firm's report layout.",
  },
  {
    q: "In the marketer's weekly content batch example, which connector reaches the content calendar?",
    options: ["Gmail", "Notion", "Slack", "Figma"],
    answer: 1,
    why: "A connector reaches the content calendar in Notion, while a brand-voice skill writes the captions on-brand.",
  },
  {
    q: "According to the course's two-question test, what does it mean if the friction is \"I keep re-explaining how to do this\"?",
    options: ["You need a Connector", "You need a Skill", "You need neither", "You need to delete the app"],
    answer: 1,
    why: "If the friction is that you keep re-explaining how to do something, you need a Skill.",
  },
  {
    q: "According to the course's two-question test, what does it mean if the friction is \"I keep fetching data from another app\"?",
    options: ["You need a Skill", "You need a Connector", "You need to stop using AI", "You need a Project only"],
    answer: 1,
    why: "If the friction is fetching data from another app, you need a Connector.",
  },
  {
    q: "What is the first of the course's two honest cautions about Skills?",
    options: ["Skills cost money to build", "Not everything deserves a skill — a task you only do once is just a good prompt", "Skills always slow you down", "Skills can only be built by Anthropic"],
    answer: 1,
    why: "Not everything deserves a skill. A skill is only worth making when the task repeats; a one-off task is just a good prompt.",
  },
  {
    q: "What is the course's second honest caution, about Connectors?",
    options: ["Connectors should be left open to every app you own", "A connector you don't need is a door you've left open — scope is safety", "Connectors are always 100% safe regardless of scope", "Connectors should never be used at all"],
    answer: 1,
    why: "A connector you don't need is a door you've left open. Connect only the apps a workflow actually requires — scope is safety.",
  },
  {
    q: "What does \"skill-creator\" do?",
    options: ["It deletes unused skills", "It is Anthropic's own skill for helping you build new skills by asking clarifying questions and writing the SKILL.md", "It connects apps automatically", "It is a connector for Google Drive"],
    answer: 1,
    why: "Anthropic provides skill-creator, a skill for making skills — you describe what you want, it asks clarifying questions, then generates a complete SKILL.md.",
  },
  {
    q: "The course calls building a skill with skill-creator your first example of what bigger idea?",
    options: ["\"Code You Never Write\" — you describe the outcome and AI produces the artifact", "Learning Python from scratch", "Manual file management", "Hiring a programmer"],
    answer: 0,
    why: "You describe an outcome and AI produces the artifact — the SKILL.md — without you writing or reading a line of code. That's \"Code You Never Write\" made permanent.",
  },
  {
    q: "A SKILL.md file is made of which two parts?",
    options: ["A title and a price tag", "Frontmatter (name and description) and the body (the actual instructions)", "A signature and a date", "An image and a caption"],
    answer: 1,
    why: "Every SKILL.md has frontmatter — the name and description — and a body containing the actual instructions.",
  },
  {
    q: "Which part of a SKILL.md does AI keep loaded at all times?",
    options: ["The entire body of instructions", "Only the frontmatter (name and description)", "Nothing is ever kept loaded", "Only the examples section"],
    answer: 1,
    why: "The frontmatter — name and description — is the only part AI keeps loaded at all times, used to decide whether the skill is relevant.",
  },
  {
    q: "When is the body of a SKILL.md actually loaded?",
    options: ["Never, it's just for humans to read", "Only when the description matches your request", "Every time you open Claude.ai", "Only on weekends"],
    answer: 1,
    why: "The body — the actual instructions — loads only when the description matches your request. This is progressive disclosure, level two.",
  },
  {
    q: "What kind of folder can a more complex skill add for detailed docs AI reads only when needed?",
    options: ["downloads/", "references/", "trash/", "history/"],
    answer: 1,
    why: "For more complex skills you can add a references/ folder, containing detailed docs AI reads only when needed.",
  },
  {
    q: "What kind of folder holds small programs for steps inside a skill that must be exact?",
    options: ["assets/", "scripts/", "notes/", "media/"],
    answer: 1,
    why: "A scripts/ folder holds small programs for steps that must be exact, while assets/ holds template files to fill in.",
  },
  {
    q: "What must a skill's main file be named exactly?",
    options: ["instructions.md", "SKILL.md", "readme.txt", "main.skill"],
    answer: 1,
    why: "The file must be named exactly SKILL.md, or the upload will fail.",
  },
  {
    q: "What naming convention must a skill's folder use?",
    options: ["UPPERCASE only", "kebab-case, like client-monthly-summary", "Spaces between words", "Random numbers"],
    answer: 1,
    why: "The folder name must use kebab-case, such as client-monthly-summary, not spaces or underscores.",
  },
  {
    q: "What is forbidden inside a skill's name and description fields?",
    options: ["Numbers", "XML-style tags, anything inside angle brackets", "The word \"the\"", "Lowercase letters"],
    answer: 1,
    why: "The name and description must contain no XML-style tags — nothing inside angle brackets — and the description must stay under about 1024 characters.",
  },
  {
    q: "Why can't you name a skill with \"claude\" or \"anthropic\" in it?",
    options: ["Those words are simply too long", "Those words are reserved", "It's a typing rule with no real reason", "Names must always be in Spanish"],
    answer: 1,
    why: "Don't name a skill with \"claude\" or \"anthropic\" in it — those names are reserved.",
  },
  {
    q: "According to the course, what is \"the whole game\" when building a skill?",
    options: ["The number of folders you create", "The description field — it decides whether your skill ever fires", "The file size of the skill", "The color of the skill icon"],
    answer: 1,
    why: "The description decides whether your skill ever fires. AI doesn't read your instructions to decide relevance — it reads only the description.",
  },
  {
    q: "What is the course's formula for a strong skill description?",
    options: ["Just the skill's name, nothing else", "What it does + when to use it + the exact phrases you'd actually say", "A long story about why you built it", "A list of unrelated features"],
    answer: 1,
    why: "The formula is: what it does, plus when to use it, plus the exact phrases you'd actually say.",
  },
  {
    q: "What debugging trick can you use once a skill is installed, to check if its description is right?",
    options: ["Delete and rebuild it every time", "Ask AI, \"When would you use my [skill name] skill?\" and see if its answer matches what you intended", "Uninstall all other skills first", "Wait 24 hours and check again"],
    answer: 1,
    why: "Ask AI \"When would you use my client-summary skill?\" If its answer is too wide or too narrow, you've found exactly what to fix in the description.",
  },
  {
    q: "On Team or Enterprise plans, what extra thing can you do with a skill you've built?",
    options: ["Nothing extra is possible", "Share it with specific colleagues or publish it to your organization's directory", "Sell it on an external marketplace", "Convert it into a connector automatically"],
    answer: 1,
    why: "On Team or Enterprise plans you can share a skill with specific colleagues or publish it to your organization's directory so everyone can install it.",
  },
  {
    q: "Are shared skills editable by the colleagues who install them?",
    options: ["Yes, anyone can freely edit them", "No — shared skills are view-only and auto-update when the owner changes the original", "They become connectors instead", "They are deleted after one use"],
    answer: 1,
    why: "Shared skills are view-only and auto-update when you change the original, handy for standardizing how a whole team produces documents.",
  },
  {
    q: "When was the Agent Skills open standard published, and by whom?",
    options: ["By Google, in 2024", "By Anthropic, in December 2025", "By OpenAI, in 2023", "It has never been published"],
    answer: 1,
    why: "In December 2025 Anthropic published the Agent Skills open standard at agentskills.io, and adoption by other vendors followed quickly.",
  },
  {
    q: "Which other companies' tools also agreed to read the same SKILL.md files?",
    options: ["No other company adopted it", "OpenAI's Codex CLI and Google's Gemini CLI", "Only Microsoft Word", "Only Adobe Photoshop"],
    answer: 1,
    why: "Within months, tools from other vendors, including OpenAI's Codex CLI and Google's Gemini CLI, agreed to read the same SKILL.md files.",
  },
  {
    q: "What organization did the Linux Foundation form in December 2025 for agentic AI governance?",
    options: ["The World Wide Web Consortium", "The Agentic AI Foundation", "The Open Skills Alliance", "The AI Safety Council"],
    answer: 1,
    why: "In December 2025 the Linux Foundation formed the Agentic AI Foundation to give neutral, cross-vendor governance to core agentic-AI infrastructure.",
  },
  {
    q: "Which of these is one of the Agentic AI Foundation's founding projects?",
    options: ["Microsoft Excel", "MCP, the standard connectors run on", "Adobe Photoshop", "Google Chrome"],
    answer: 1,
    why: "The Agentic AI Foundation's founding projects include MCP — the standard connectors run on — along with Block's goose and OpenAI's AGENTS.md.",
  },
  {
    q: "In the course's \"five surfaces\" table, who is Claude.ai (web/mobile) listed as being for?",
    options: ["Only professional developers", "Everyone — it's described as your main tool", "Only enterprise administrators", "Only people who already know how to code"],
    answer: 1,
    why: "Claude.ai (web/mobile) is listed as being for everyone — your main tool — where skills install via the directory or a zip upload.",
  },
  {
    q: "In the course's surface table, who is Cowork / OpenWork (desktop) listed as being for?",
    options: ["Only coders", "Knowledge workers and non-coders", "Only graphic designers", "Only system administrators"],
    answer: 1,
    why: "Cowork / OpenWork (desktop) is listed as being for knowledge workers and non-coders, where enabled skills appear automatically.",
  },
  {
    q: "In the course's surface table, who is Claude Code / OpenCode (terminal) listed as being for?",
    options: ["People who work with code", "People who never touch a computer", "Only marketing teams", "Only accountants"],
    answer: 0,
    why: "Claude Code / OpenCode (terminal) is listed as being for people who work with code, where you drop a skill folder into a skills directory.",
  },
  {
    q: "Within each tool pair shown (Claude.ai vs Cowork/OpenWork, Claude Code vs OpenCode), which one is the open-source alternative?",
    options: ["The first tool listed in each pair", "The second tool listed in each pair", "Neither is open-source", "Both are equally proprietary"],
    answer: 1,
    why: "Within each pair, the first tool is the commercial one and the second is the open-source alternative; both read the same SKILL.md.",
  },
  {
    q: "Part 5 of the course repeats which earlier idea about safety?",
    options: ["AI always checks safety automatically, so you don't need to", "Nothing inside the model checks whether an action is safe or correct — you are that check", "Only Anthropic can be responsible for safety", "Safety checks only matter for connectors, never skills"],
    answer: 1,
    why: "Same principle as \"What AI Actually Is\": nothing inside the model checks whether an action is safe or correct. You are that check.",
  },
  {
    q: "What is the course's key safety sentence about skills and connectors?",
    options: [
      "A skill and a connector are both completely harmless by default",
      "A skill is a set of instructions you are letting AI follow, and a connector is a door into your real data",
      "Skills and connectors require no caution at all",
      "Only connectors can ever cause harm, never skills",
    ],
    answer: 1,
    why: "Treat a skill from a stranger like a contract you're about to sign, and a connector like a key you're about to hand over.",
  },
  {
    q: "What are the two named dangers of a malicious skill?",
    options: ["Slow loading and high cost", "Prompt injection and data exfiltration", "Bad grammar and broken links", "Too many options and confusing menus"],
    answer: 1,
    why: "The two named dangers are prompt injection — the skill manipulates AI into unintended actions — and data exfiltration, where it secretly sends information out.",
  },
  {
    q: "What is the risk of \"over-broad connector access\"?",
    options: ["The connector becomes slower", "If you grant write access carelessly, AI can change or send things on your behalf beyond what you intended", "The connector automatically disconnects", "There is no real risk at all"],
    answer: 1,
    why: "A connector can only reach what you can reach, but if you grant write access carelessly, AI can change or send things on your behalf.",
  },
  {
    q: "What is Project 1 in the course's hands-on exercises about?",
    options: ["Connecting five apps at once", "Turning your most-repeated \"I keep re-explaining how\" task into your first real skill", "Deleting all existing skills", "Reading the course a second time"],
    answer: 1,
    why: "Project 1 (30-45 minutes) asks you to turn your most-repeated re-explaining task into a skill, using skill-creator and testing it on a real input.",
  },
  {
    q: "What is Project 2 in the course's hands-on exercises about?",
    options: ["Building five skills at once", "Connecting one app read-only and getting a real answer from your own data with zero copy-paste", "Buying an Enterprise plan", "Writing a SKILL.md by hand without any AI help"],
    answer: 1,
    why: "Project 2 (20-30 minutes) has you connect one app, keep it read-only, and pull a real answer from your own data without uploading anything.",
  },
  {
    q: "What is Project 3 in the course's hands-on exercises about?",
    options: ["Deleting your connectors", "Wiring a skill and a connector together so one sentence produces a finished, correctly formatted result from live data", "Switching to a different AI provider", "Memorizing the SKILL.md format"],
    answer: 1,
    why: "Project 3 (45-60 minutes) combines Projects 1 and 2: the connector fetches real input, the skill shapes the output your way.",
  },
  {
    q: "What is Project 4, the capstone, about?",
    options: ["Deleting all your work", "Making the skill portable or handing it off, proving it outlives the chat and the tool", "Building a brand-new connector from scratch", "Switching your skill to a different file name"],
    answer: 1,
    why: "Project 4 (30 minutes), the capstone, proves the skill outlives the chat — and the tool — by making it portable or handing it off.",
  },
];

// ---- Module metadata ----
const MODULES = [
  { id: 1, title: "Orientation", subtitle: "What is this thing I'm holding?", questions: MODULE_1 },
  { id: 2, title: "Foundations", subtitle: "Start in the Browser", questions: MODULE_2 },
  { id: 3, title: "What AI Actually Is", subtitle: "The 9 Ideas crash course · verified", questions: MODULE_3 },
  { id: 4, title: "AI Prompting in 2026", subtitle: "A Crash Course · 13 concepts · verified", questions: MODULE_4 },
  { id: 5, title: "Markdown In, HTML Out", subtitle: "A Crash Course · 14 concepts · verified", questions: MODULE_5 },
  { id: 6, title: "Code You Never Write", subtitle: "A Crash Course · 13 concepts · verified", questions: MODULE_6 },
  { id: 7, title: "Skills & Connectors", subtitle: "Teach AI Once, Connect It to Your Apps · 66 questions · verified", questions: MODULE_7 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState("map"); // map | quiz | results
  const [activeModule, setActiveModule] = useState(null);
  const [passed, setPassed] = useState([]); // array of module ids passed
  const [order, setOrder] = useState([]); // shuffled questions for current run
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]); // {qIndex, picked}

  const moduleData = MODULES.find((m) => m.id === activeModule);

  const isUnlocked = (m) => {
    if (m.id === 1) return m.questions !== null;
    return passed.includes(m.id - 1) && m.questions !== null;
  };

  const startModule = (m) => {
    if (!isUnlocked(m)) return;
    setActiveModule(m.id);
    setOrder(shuffle(m.questions));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScreen("quiz");
  };

  const next = () => {
    const rec = [...answers, { q: order[current], picked: selected }];
    setAnswers(rec);
    if (current + 1 < order.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      // finish
      const correct = rec.filter((r) => r.picked === r.q.answer).length;
      const pct = Math.round((correct / rec.length) * 100);
      if (pct >= PASS_MARK && !passed.includes(activeModule)) {
        setPassed([...passed, activeModule]);
      }
      setScreen("results");
    }
  };

  const score = useMemo(() => {
    const correct = answers.filter((r) => r.picked === r.q.answer).length;
    const total = answers.length || 1;
    return { correct, total: answers.length, pct: Math.round((correct / total) * 100) };
  }, [answers]);

  // ---------- MAP SCREEN ----------
  if (screen === "map") {
    return (
      <Shell>
        <div style={{ marginBottom: 28 }}>
          <p style={{ ...styles.eyebrow }}>PIAIC · AGENT FACTORY</p>
          <h1 style={styles.h1}>Mid-Term MCQ Exam</h1>
          <p style={styles.lead}>
            Clear each module with <b>{PASS_MARK}%</b> or more to unlock the next one. Pick a module to begin.
          </p>
        </div>

        <div style={styles.grid}>
          {MODULES.map((m) => {
            const unlocked = isUnlocked(m);
            const done = passed.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => startModule(m)}
                disabled={!unlocked}
                style={{
                  ...styles.moduleCard,
                  cursor: unlocked ? "pointer" : "not-allowed",
                  opacity: unlocked ? 1 : 0.55,
                  borderColor: done ? TEAL : "#e2e8f0",
                  background: done ? "#ecfdf5" : "#fff",
                }}
              >
                <div style={styles.moduleTop}>
                  <span style={{ ...styles.moduleNum, background: unlocked ? NAVY : "#94a3b8" }}>
                    {m.id}
                  </span>
                  {done ? (
                    <Trophy size={18} color={TEAL} />
                  ) : unlocked ? (
                    <BookOpen size={18} color={NAVY} />
                  ) : (
                    <Lock size={16} color="#94a3b8" />
                  )}
                </div>
                <h3 style={styles.moduleTitle}>{m.title}</h3>
                <p style={styles.moduleSub}>{m.subtitle}</p>
                <div style={styles.moduleFoot}>
                  {m.questions ? (
                    <span style={{ color: "#64748b", fontSize: 12 }}>{m.questions.length} questions</span>
                  ) : (
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>Locked</span>
                  )}
                  {unlocked && !done && (
                    <span style={{ display: "inline-flex", alignItems: "center", color: TEAL, fontSize: 13, fontWeight: 600 }}>
                      Start <ChevronRight size={15} />
                    </span>
                  )}
                  {done && <span style={{ color: TEAL, fontSize: 13, fontWeight: 600 }}>Passed ✓</span>}
                </div>
              </button>
            );
          })}
        </div>

        <div style={styles.progressBanner}>
          <Award size={18} color={AMBER} />
          <span>
            Progress: <b>{passed.length}</b> / {MODULES.length} modules passed
          </span>
        </div>
      </Shell>
    );
  }

  // ---------- QUIZ SCREEN ----------
  if (screen === "quiz") {
    const qObj = order[current];
    const progress = Math.round(((current) / order.length) * 100);
    return (
      <Shell>
        <button onClick={() => setScreen("map")} style={styles.backBtn}>
          <ArrowLeft size={16} /> Exit to modules
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 8 }}>
          <p style={styles.eyebrow}>
            MODULE {activeModule} · {moduleData.title.toUpperCase()}
          </p>
          <span style={{ color: "#64748b", fontSize: 14, fontWeight: 600 }}>
            Question {current + 1} of {order.length}
          </span>
        </div>

        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>

        <div style={styles.qCard}>
          <h2 style={styles.qText}>{qObj.q}</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {qObj.options.map((opt, i) => {
              const locked = selected !== null;
              const isCorrect = i === qObj.answer;
              const isPicked = selected === i;

              // Default (not yet answered) look
              let borderColor = "#e2e8f0";
              let background = "#fff";
              let letterBg = "#f1f5f9";
              let letterColor = "#475569";
              let boxShadow = "none";
              let opacity = 1;

              if (locked) {
                if (isCorrect) {
                  // Always reveal the correct option in green once locked
                  borderColor = TEAL;
                  background = "#f0fdf4";
                  letterBg = TEAL;
                  letterColor = "#fff";
                  boxShadow = `0 0 0 2px ${TEAL}33`;
                } else if (isPicked) {
                  // The wrong option the user picked, shown in red
                  borderColor = "#ef4444";
                  background = "#fef2f2";
                  letterBg = "#ef4444";
                  letterColor = "#fff";
                  boxShadow = "0 0 0 2px #ef444433";
                } else {
                  // Untouched, irrelevant options fade out
                  opacity = 0.55;
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => !locked && setSelected(i)}
                  disabled={locked}
                  style={{
                    ...styles.option,
                    borderColor,
                    background,
                    boxShadow,
                    opacity,
                    cursor: locked ? "default" : "pointer",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ ...styles.optLetter, background: letterBg, color: letterColor }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span style={{ color: "#1e293b", fontSize: 15 }}>{opt}</span>
                  </div>

                  {locked && isCorrect && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: TEAL_DK, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      <CheckCircle2 size={18} color={TEAL} /> Right
                    </span>
                  )}
                  {locked && !isCorrect && isPicked && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#b91c1c", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                      <XCircle size={18} color="#ef4444" /> Wrong
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <p
              style={{
                marginTop: 16,
                marginBottom: 0,
                fontSize: 13.5,
                color: "#64748b",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}
            >
              {qObj.why}
            </p>
          )}
        </div>

        <button
          onClick={next}
          disabled={selected === null}
          style={{
            ...styles.primaryBtn,
            opacity: selected === null ? 0.5 : 1,
            cursor: selected === null ? "not-allowed" : "pointer",
          }}
        >
          {current + 1 === order.length ? "Finish & See Result" : "Next Question"}
          <ChevronRight size={18} />
        </button>
      </Shell>
    );
  }

  // ---------- RESULTS SCREEN ----------
  const didPass = score.pct >= PASS_MARK;
  return (
    <Shell>
      <div
        style={{
          ...styles.resultHero,
          background: didPass ? "linear-gradient(135deg,#0d9488,#0f766e)" : "linear-gradient(135deg,#475569,#334155)",
        }}
      >
        {didPass ? <Trophy size={40} color="#fff" /> : <Flame size={40} color="#fff" />}
        <div style={styles.bigPct}>{score.pct}%</div>
        <div style={styles.resultLabel}>{didPass ? "PASSED" : "FAILED"}</div>
        <p style={styles.resultSub}>
          You got {score.correct} of {score.total} correct. Pass mark is {PASS_MARK}%.
        </p>
        {didPass && activeModule < 7 && (
          <p style={{ ...styles.resultSub, marginTop: 4 }}>Module {activeModule + 1} is now unlocked.</p>
        )}
        {!didPass && <p style={{ ...styles.resultSub, marginTop: 4 }}>Try again to clear this module.</p>}
      </div>

      <h3 style={{ ...styles.h3, marginTop: 28 }}>Review your answers</h3>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {answers.map((r, idx) => {
          const ok = r.picked === r.q.answer;
          return (
            <div key={idx} style={{ ...styles.reviewCard, borderColor: ok ? "#bbf7d0" : "#fecaca" }}>
              <div style={{ display: "flex", gap: 10 }}>
                {ok ? <CheckCircle2 size={20} color={TEAL} /> : <XCircle size={20} color="#ef4444" />}
                <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 15 }}>
                  {idx + 1}. {r.q.q}
                </p>
              </div>
              <p style={{ marginLeft: 30, marginTop: 6, fontSize: 14, color: ok ? TEAL_DK : "#b91c1c" }}>
                Your answer: {String.fromCharCode(65 + r.picked)}. {r.q.options[r.picked]}
              </p>
              {!ok && (
                <p style={{ marginLeft: 30, marginTop: 2, fontSize: 14, color: TEAL_DK }}>
                  Correct: {String.fromCharCode(65 + r.q.answer)}. {r.q.options[r.q.answer]}
                </p>
              )}
              <p style={{ marginLeft: 30, marginTop: 4, fontSize: 13, color: "#64748b", fontStyle: "italic" }}>
                {r.q.why}
              </p>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
        <button onClick={() => startModule(moduleData)} style={styles.secondaryBtn}>
          <RotateCcw size={16} /> Retry module
        </button>
        <button onClick={() => setScreen("map")} style={styles.primaryBtn}>
          Back to modules <ChevronRight size={18} />
        </button>
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: "28px 16px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={styles.brand}>
          <span style={styles.brandMark}>AF</span>
          <span style={{ fontWeight: 700, color: NAVY, letterSpacing: -0.3 }}>Agent Factory Exam</span>
        </div>
        {children}
      </div>
    </div>
  );
}

const styles = {
  brand: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22 },
  brandMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: NAVY,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 13,
  },
  eyebrow: { color: TEAL, fontSize: 12, fontWeight: 700, letterSpacing: 1.2, margin: 0 },
  h1: { fontSize: 30, fontWeight: 800, color: NAVY, margin: "6px 0 8px", letterSpacing: -0.6 },
  h3: { fontSize: 18, fontWeight: 700, color: NAVY, margin: 0 },
  lead: { color: "#475569", fontSize: 15, margin: 0, lineHeight: 1.5 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 },
  moduleCard: {
    textAlign: "left",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: 18,
    background: "#fff",
    transition: "all .15s",
  },
  moduleTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  moduleNum: {
    width: 30,
    height: 30,
    borderRadius: 9,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 14,
  },
  moduleTitle: { fontSize: 17, fontWeight: 700, color: NAVY, margin: "0 0 4px" },
  moduleSub: { fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.4, minHeight: 36 },
  moduleFoot: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  progressBanner: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
    padding: "14px 18px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    color: "#334155",
    fontSize: 14,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "transparent",
    border: "none",
    color: "#64748b",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
  },
  progressTrack: { height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden", margin: "10px 0 22px" },
  progressFill: { height: "100%", background: `linear-gradient(90deg,${TEAL},${TEAL_DK})`, transition: "width .3s" },
  qCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 24, marginBottom: 18 },
  qText: { fontSize: 19, fontWeight: 700, color: NAVY, margin: "0 0 20px", lineHeight: 1.4 },
  option: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    textAlign: "left",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "14px 16px",
    background: "#fff",
    cursor: "pointer",
    transition: "all .12s",
  },
  optLetter: {
    width: 28,
    height: 28,
    borderRadius: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: NAVY,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "#fff",
    color: NAVY,
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    padding: "14px 22px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  resultHero: {
    borderRadius: 20,
    padding: "32px 24px",
    textAlign: "center",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  bigPct: { fontSize: 52, fontWeight: 800, letterSpacing: -1, marginTop: 6 },
  resultLabel: { fontSize: 16, fontWeight: 800, letterSpacing: 3 },
  resultSub: { fontSize: 14, opacity: 0.92, margin: 0 },
  reviewCard: { border: "1px solid #e2e8f0", borderRadius: 14, padding: 16, background: "#fff" },
};
