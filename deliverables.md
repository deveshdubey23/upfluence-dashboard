# 📦 Official Submission Deliverables

## 🌐 Public Deployment
* **Public Live Production URL:** [https://upfluence-henna.vercel.app](https://upfluence-henna.vercel.app)

---

## 🏗️ Project Architecture Overview
The platform was built using a **Decoupled Serverless Edge Gateway Architecture** within the Next.js framework to guarantee performance stability, data safety, and resilience against third-party API availability or rate constraints.

```text
┌───────────────────────┐        Secure Request        ┌───────────────────────┐
│  Marketing Dashboard  │ ───────────────────────────> │ Secure Internal Proxy │
│ (Visual App Loop)     │ <─────────────────────────── │  (Privacy Gatekeeper) │
└───────────────────────┘       Clean Data Feed        └───────────────────────┘
                                                                   │
                                                      Swaps to     │  Live Connect
                                                      Backup If    │  Handshake
                                                      Rate Limited │  
                                                                   ▼
                                                       ┌───────────────────────┐
                                                       │ Upfluence Live Engine │
                                                       │   (API Data Hub)      │
                                                       └───────────────────────┘
 ```                                     
1. **The Marketing Dashboard (What You See):** A fast, edge-rendered user interface where any team member can easily search, filter by platform tier, and run dynamic creator matchups on demand..
2. **The Secure Internal Proxy (The Gatekeeper)** To comply with strict corporate security policies, our private API keys are kept entirely hidden on the backend server. The public dashboard talks to this gatekeeper, which safely signs and passes the request down the pipeline, keeping our integration credentials completely invisible to the public browser.
3. **The Intelligent Backup System (Uninterrupted Reliability)** Sandbox environments often face data caps or live API network slowdowns. If the connection throws a restriction error, the proxy instantly catches the fault and seamlessly delivers a cached, identical mock data layer. This defensive failover ensures that the system stays running and interactive during executive presentations.


---

## 🛠️ Tech Stack & AI Toolkit

### Core Technologies
* **Next.js 14+ (App Router):** The core blueprint of our app. It handles the secure communication gates and makes the pages load instantly.
* **TypeScript:** The safety net. It acts as a strict code-auditor behind the scenes to find and fix typos automatically so the app can't compile with hidden code crashes.
* **Tailwind CSS:** The design engine. This is what I used to create the light workspace layout, clean color-coded badges, and premium glass-like cards.
* **Lucide React:** The vector icon kit. It provides clean, scalable graphics for the navigation indicators, metrics, and search tools.
* **Bolt.new:** The AI launchpad. I used it to spin up the foundation, establish the file paths, and get the basic code loop off the ground instantly.
*  **Vercel** To host the tool

### AI Co-Pilot Toolkit
This project was developed using a dual-copilot pairing methodology, optimizing for specific task specializations:
* **Gemini (Advanced System Architect):** Leveraged for end-to-end full-stack systems engineering, payload blueprint parsing, custom mathematical indexing, error correction, and Vercel production build troubleshooting.
* **Claude:** Leveraged for accelerated visual design iteration, layout structure refinement, debugging, reviewing,and optimization.

---

## 📝 Key Prompts Used During Development

Development utilized Few-Shot Prompting methodologies to provide explicit input/output structural examples, ensuring the generated React hooks, styling rules, and error handlers adhered directly to enterprise design and performance specifications.

### Prompt 1: Ideation & Architecture Structuring
> "Act as a Lead Software Architect. I need to design a corporate dashboard that evaluates influencer records.

Bad Example: Sorting by Follower size alone fails due to fake follower/bot risks.

Good Example: A combined scoring index wins by measuring authentic audience attention.

Task: Provide a code structure that builds our master metric—the Upfluence Synergy Score (USS). Automatically weigh Engagement, Account Authenticity, Posting Frequency, and Reach into one clean score out of 100"

### Prompt 2: Proxy Router & 402 Error Interception
> *"Write a secure data handler. If the live Upfluence database throws a connection error or hits sandbox data caps during presentations, defensively intercept the crash. Instead of letting the dashboard go blank or break, smoothly hot-swap the background feed to a reliable, built-in fallback dataset so the user experience stays 100% up, responsive, and uninterrupted."*

### Prompt 3: Enterprise UX Adjustments
> *"Upgrade our user experience features with three additions:

Allow the user to select and compare more than 2 creators side-by-side in a dynamic matchup grid.

Add helpful hover cards to every metric explaining exactly what it measures, why it matters to brands, the industry standard, and the creator's percentile standing.

Make rows clickable to slide open a deep-dive profile containing growth trends, target audience breakdowns (age/gender), and a functional booking request button."*

### Prompt 4: Brand Theme Alignment
> *"Review Upfluence's official brand website. Refactor the application layout away from standard, generic dark themes. Rebuild it as a premium, clean corporate workspace using a crisp white background, sharp high-visibility dark text, custom color badges for social channels (pink for Instagram, cyan for TikTok, red for YouTube), and Upfluence's signature electric primary blue (#1610e6) for all active buttons and progress rings."*

---

## 🧮 Ranking Methodology & Rationale
### 1. Algorithmic Ranking Philosophy: The USS Index
Instead of sorting creators by naive follower size—which is highly susceptible to bot inflation—the dashboard introduces a custom-weighted multi-criteria composite matrix called the **Upfluence Synergy Score (USS)**. By default, it evaluates performance out of a maximum score of 100 based on four primary behavioral signals:

$$USS = (0.40 \times \text{Engagement}) + (0.30 \times \text{Authenticity}) + (0.20 \times \text{Frequency}) + (0.10 \times \text{Reach})$$

* **Audience Engagement (40% Weight):** The highest baseline variable. It represents active community attention (likes, saves, comments) and acts as the leading predictor for campaign conversion efficiency.
* **Account Authenticity (30% Weight):** Functions as our programmatic fraud filter. It safeguards marketing budgets by heavily penalizing accounts displaying botted engagement patterns or inorganic follower spikes.
* **Post Frequency (20% Weight):** Measures content momentum (posts per week). Ensures top-of-mind brand recall and stable audience touchpoints.
* **Gross Reach Footprint (10% Weight):** Total scale. Given the lowest weight because large distribution scale is only valuable if it passes the hurdles of authenticity and high engagement.

*Note: The platform features an interactive **Formula Engine Settings panel** allowing managers to dynamically adjust framework weights and re-index the creator cohort instantly based on target campaign KPIs.*

## ⚙️ Setup & Local Installation
## 🚀 Local Installation Setup

1. Clone the project repository:

git clone <your-github-repo-url>
cd upfluence-vetting-dashboard

2. Install dependency assets:

npm install

3. Configure environment variable keys: Create an .env.local file in your root workspace:

UPFLUENCE_CLIENT_ID=your_real_id
UPFLUENCE_CLIENT_SECRET=your_real_secret

4. Boot up the local engineering server:

npm run dev

---

## 🧠 Assumptions Made During Development
* **API Constraints Awareness:** Recognizing that candidate review loops in a sandbox credential key domain frequently encounter threshold blockages, it was assumed that a technical reviewer would favor a platform that remains up and accessible via custom-cached normalization layers over one that goes blank during an evaluation.
* **Default Metric Baseline:** Assumed standard baseline metrics for unindexed criteria parameters: average target engagement thresholds set to 3.5%, account legitimacy pass bars mapped at 82%, and publishing momentum benchmarks scaled at 4.2 posts/week.

---

## 🚧 Challenge Encountered & Resolution Path

### Challenge : API Sandbox Rate Limits & 402 Quota Interception
* **The Problem:** During active testing and evaluation cycles, the Upfluence sandbox API credentials frequently hit strict data thresholds, returning a 402 Payment Required / QuQuota Exhausted status code. In a naive setup, this would cause the data grids to fail to render, crashing the app or leaving the reviewer with a broken, blank UI.
* **The Solution:** Implemented a Defensive Normalization Fallback Ring directly inside the Next.js Serverless Route Handler (app/api/creators/route.ts). The backend proxy script actively sniffs the incoming API response status. If it intercepts a 402 or any connection threshold failure, it catches the exception, logging the error securely without exposing credentials. It then immediately hot-swaps the pipeline to deliver a normalized, production-structured mock dataset to the client. The frontend application remains entirely active and interactive, displaying a system status badge letting the user know they are interacting with a stable, cached dataset layout instead of a broken page.







