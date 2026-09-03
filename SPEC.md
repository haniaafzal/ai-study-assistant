# AI Study Assistant — Spec (MVP)

Companion to `PROJECT.md`. This defines exact behavior for v1. See `PROJECT.md` for scope/vision.

## Provider
- **Google Gemini API**, free tier (via Google AI Studio, `ai.google.dev`).
- Called directly from client-side JS (no backend in v1).
- API key is **not** committed to the repo. Kept in a local, gitignored config file (e.g. `config.js` exporting the key), loaded by `index.html`. Anyone running this locally supplies their own key.
- Explicitly a personal/local prototype: this key-handling approach is not safe for public deployment. Revisit before hosting publicly.

## Input: Notes
- Plain pasted text only (no file upload in v1).
- Min length: 200 characters. Below this, show inline validation error: "Add more notes to generate a good quiz (at least 200 characters)." Generate button stays disabled.
- Max length: 20,000 characters. Enforce via `maxlength` on the textarea; show a live character counter as the user approaches the limit.

## MCQ Generation
- Fixed at **5 questions** per quiz.
- Each question: 1 correct answer + 3 distractors (4 options total).
- Request to Gemini must specify a strict JSON response schema so output is parseable, shaped like:
  ```json
  [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctIndex": 0
    }
  ]
  ```
- If the model returns fewer than 5 valid questions or malformed JSON: show an error state with a "Try again" button that re-sends the request. No partial/degraded quiz.
- If notes are too short in substance for 5 distinct questions (e.g. Gemini itself can't produce 5), same error/retry path.

## Quiz Flow
1. **Input screen**: textarea for notes + "Generate Quiz" button (disabled until min length met).
2. **Loading state**: while waiting on Gemini response, show a loading indicator; disable the button to prevent double-submits.
3. **Quiz screen**: one question at a time or all 5 on one page (implementation detail, not fixed here) — each question shows 4 options as radio buttons/selectable choices. No answer is scored until the user submits the whole quiz.
4. **Submit**: user must answer all 5 questions before submit is enabled (or submit is allowed with unanswered = counted wrong — pick one; default: require all 5 answered).
5. **Results screen**: final score as `X / 5`, plus per-question breakdown showing the user's answer vs. the correct answer.
6. **Restart**: a "Start over" action returns to the input screen with notes cleared.

## Error States
- Gemini API call fails (network/auth/rate limit): show a clear error message distinguishing "check your API key" (auth error) from "something went wrong, try again" (other errors).
- Empty/whitespace-only notes: Generate button stays disabled (covered by min-length check).

## Explicitly not in this spec (see PROJECT.md "out of scope")
- No accounts, no persistence of past quizzes.
- No file upload.
- No difficulty levels or topic weighting — Gemini decides question coverage from the notes as given.

## Open questions carried forward
- Exact wording/tone of generated questions (left to the prompt sent to Gemini — not fixed here).
- Whether "all 5 must be answered" or "unanswered = wrong" is the final rule (default above: require all 5).
