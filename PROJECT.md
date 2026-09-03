# AI Study Assistant — Project Brief

## Problem
Studying from raw notes is passive. There's no quick way to turn your own notes into a self-check that tells you what you actually know.

## What it does (MVP)
1. User pastes their study notes into a text box.
2. App generates multiple-choice questions (MCQs) from those notes.
3. User answers the quiz.
4. App shows a final score (and ideally which questions were missed).

## Users
Not yet defined — building for a generic "anyone with notes to study" for now. Revisit once the MVP works.

## Scope (v1 — MVP only)
- Paste notes → generate MCQs → take quiz → see score.
- Single-session, no accounts, no saved history.

## Explicitly out of scope (for now)
- Flashcards / spaced repetition
- Summarization
- Chat/Q&A over notes
- User accounts, saved quiz history, multi-device sync
- File uploads (PDF/docx) — plain pasted text only

## Tech stack
- Frontend: HTML, CSS, JS (no framework)
- MCQ generation: requires an LLM API call — **open decision**: calling the API directly from client-side JS means exposing an API key in the browser, which is unsafe for anything beyond a personal/local prototype. Needs a decision before build: either a minimal backend/serverless proxy to hold the key, or treat this explicitly as local-only/personal-use tooling where that risk is accepted.

## Success criteria (MVP done when...)
- A user can paste a block of notes, get a working MCQ quiz generated from them, answer it, and see a final score — end to end, no errors.

## Open questions
- Who is this really for? (affects UI polish, hosting decisions, whether the API-key issue above matters)
- How many MCQs per quiz, and how is difficulty/coverage decided?
- What happens with very short or very long notes?
