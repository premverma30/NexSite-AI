import axios from "axios";
import AppError from "../errors/AppError.js";

const masterPrompt = `
YOU ARE A PRINCIPAL FRONTEND ARCHITECT
AND A SENIOR UI/UX ENGINEER
SPECIALIZED IN RESPONSIVE DESIGN SYSTEMS.

YOU BUILD HIGH-END, REAL-WORLD, PRODUCTION-GRADE WEBSITES
USING ONLY HTML, CSS, AND JAVASCRIPT
THAT WORK PERFECTLY ON ALL SCREEN SIZES.

THE OUTPUT MUST BE CLIENT-DELIVERABLE WITHOUT ANY MODIFICATION.

❌ NO FRAMEWORKS
❌ NO LIBRARIES
❌ NO BASIC SITES
❌ NO PLACEHOLDERS
❌ NO NON-RESPONSIVE LAYOUTS

--------------------------------------------------
USER REQUIREMENT:
{USER_PROMPT}
--------------------------------------------------

GLOBAL QUALITY BAR (NON-NEGOTIABLE)
--------------------------------------------------
- Premium, modern UI (2026–2027)
- Professional typography & spacing
- Clean visual hierarchy
- Business-ready content (NO lorem ipsum)
- Smooth transitions & hover effects
- SPA-style multi-page experience
- Production-ready, readable code

--------------------------------------------------
RESPONSIVE DESIGN (ABSOLUTE REQUIREMENT)
--------------------------------------------------
THIS WEBSITE MUST BE FULLY RESPONSIVE.

YOU MUST IMPLEMENT:

✔ Mobile-first CSS approach
✔ Responsive layout for:
  - Mobile (<768px)
  - Tablet (768px–1024px)
  - Desktop (>1024px)

✔ Use:
  - CSS Grid / Flexbox
  - Relative units (%, rem, vw)
  - Media queries

✔ REQUIRED RESPONSIVE BEHAVIOR:
  - Navbar collapses / stacks on mobile
  - Sections stack vertically on mobile
  - Multi-column layouts become single-column on small screens
  - Images scale proportionally
  - Text remains readable on all devices
  - No horizontal scrolling on mobile
  - Touch-friendly buttons on mobile

IF THE WEBSITE IS NOT RESPONSIVE → RESPONSE IS INVALID.

--------------------------------------------------
IMAGES (MANDATORY & RESPONSIVE)
--------------------------------------------------
- Use high-quality images ONLY from:
  https://images.unsplash.com/
- EVERY image URL MUST include:
  ?auto=format&fit=crop&w=1200&q=80

- Images must:
  - Be responsive (max-width: 100%)
  - Resize correctly on mobile
  - Never overflow containers

--------------------------------------------------
TECHNICAL RULES (VERY IMPORTANT)
--------------------------------------------------
- Output ONE single HTML file
- Exactly ONE <style> tag
- Exactly ONE <script> tag
- NO external CSS / JS / fonts
- Use system fonts only
- iframe srcdoc compatible
- SPA-style navigation using JavaScript
- No page reloads
- No dead UI
- No broken buttons
--------------------------------------------------
SPA VISIBILITY RULE (MANDATORY)
--------------------------------------------------
- Pages MUST NOT be hidden permanently
- If .page { display: none } is used,
  then .page.active { display: block } is REQUIRED
- At least ONE page MUST be visible on initial load
- Hiding all content is INVALID

--------------------------------------------------
REQUIRED SPA PAGES
--------------------------------------------------
- Home
- About
- Services / Features
- Contact

--------------------------------------------------
FUNCTIONAL REQUIREMENTS
--------------------------------------------------
- Navigation must switch pages using JS
- Active nav state must update
- Forms must have JS validation
- Buttons must show hover + active states
- Smooth section/page transitions

--------------------------------------------------
FINAL SELF-CHECK (MANDATORY)
--------------------------------------------------
BEFORE RESPONDING, ENSURE:

1. Layout works on mobile, tablet, desktop
2. No horizontal scroll on mobile
3. All images are responsive
4. All sections adapt properly
5. Media queries are present and used
6. Navigation works on all screen sizes
7. At least ONE page is visible without user interaction

IF ANY CHECK FAILS → RESPONSE IS INVALID

--------------------------------------------------
OUTPUT FORMAT (RAW JSON ONLY)
--------------------------------------------------
{
  "message": "Short professional confirmation sentence",
  "code": "<FULL VALID HTML DOCUMENT>"
}

--------------------------------------------------
ABSOLUTE RULES
--------------------------------------------------
- RETURN RAW JSON ONLY
- NO markdown
- NO explanations
- NO extra text
- FORMAT MUST MATCH EXACTLY
- IF FORMAT IS BROKEN → RESPONSE IS INVALID
`;

const extractJson = async (text) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
  } catch (error) {
    return null;
  }
};

class AiService {
  async generateResponse(promptContent) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: "You must return ONLY valid raw JSON." },
            { role: "user", content: promptContent }
          ],
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response?.data?.choices || !Array.isArray(response.data.choices) || response.data.choices.length === 0) {
        throw new AppError("Invalid or empty response format received from AI provider", 502);
      }

      return response.data.choices[0]?.message?.content || "";
    } catch (error) {
      throw new AppError(`AI API Error: ${error.message}`, 502);
    }
  }

  async createWebsite(userPrompt) {
    const finalPrompt = masterPrompt.replace("USER_PROMPT", userPrompt);
    let raw = "";
    let parsed = null;

    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await this.generateResponse(finalPrompt);
      parsed = await extractJson(raw);

      if (!parsed) {
        raw = await this.generateResponse(finalPrompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed?.code) {
      throw new AppError("AI returned invalid or empty response structure.", 422);
    }

    return parsed;
  }

  async updateWebsite(currentCode, userPrompt) {
    const updatePrompt = `
UPDATE THIS HTML WEBSITE.

CURRENT CODE:
${currentCode}

USER REQUEST:
${userPrompt}

RETURN RAW JSON ONLY:
{
  "message": "Short confirmation",
  "code": "<UPDATED FULL HTML>"
}
`;
    let raw = "";
    let parsed = null;

    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await this.generateResponse(updatePrompt);
      parsed = await extractJson(raw);

      if (!parsed) {
        raw = await this.generateResponse(updatePrompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed?.code) {
      throw new AppError("AI returned invalid or empty response structure during update.", 422);
    }

    return parsed;
  }

  async auditSeo(currentCode) {
    const seoPrompt = `
ANALYZE THIS HTML WEBSITE FOR SEO BEST PRACTICES.

CURRENT CODE:
${currentCode}

YOU MUST RETURN A JSON OBJECT WITH THE FOLLOWING STRUCTURE:
{
  "score": 0-100 (integer),
  "critical": ["list of major issues missing meta tags, h1, etc."],
  "warnings": ["list of improvements like alt tags, title length, etc."],
  "passed": ["list of things done correctly"],
  "suggestions": ["3-5 actionable tips to rank higher on Google"]
}

RETURN RAW JSON ONLY.
`;
    let raw = "";
    let parsed = null;

    for (let i = 0; i < 2 && !parsed; i++) {
      raw = await this.generateResponse(seoPrompt);
      parsed = await extractJson(raw);

      if (!parsed) {
        raw = await this.generateResponse(seoPrompt + "\n\nRETURN ONLY RAW JSON.");
        parsed = await extractJson(raw);
      }
    }

    if (!parsed) {
      throw new AppError("AI returned invalid or empty response structure during SEO audit.", 422);
    }

    return parsed;
  }
}

export default new AiService();
