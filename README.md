# Never Clocked Out

**Some shifts never end.**

An interactive AI ghost story set in a fictional machine shop in 1989.

Raymond “Ray” Mercer was a maintenance welder on the night shift at Morrow Works Machine Shop No. 4. On October 17, 1989, he stopped Press No. 4 after documenting abnormal machine behavior and incomplete safety checks.

The official incident report records an unauthorized production stoppage.

The timecard records something else: Ray never clocked out.

## About the project

Never Clocked Out is an interactive archive mystery. Players examine eight surviving records, uncover the events surrounding Ray’s final shift, and interview Ray through a locally running AI model.

The story unfolds in three acts:

- **Act I — The Timecard:** Ray is guarded. The archive reveals an unclosed shift.
- **Act II — The Machine:** The records reveal the machine’s condition and the decision to stop production.
- **Act III — The Final Shift:** The full motive emerges through the surviving evidence.

The player ultimately chooses how to close the archive.

## Endings

- **Let the Record Stand:** Leave the official incident report unchanged.
- **Set the Record Straight:** Add a corrective archive note based on the surviving records.
- **Close the Shift:** Close Ray’s unended time record.

The story preserves ambiguity about Ray’s fate and the nature of the archive.

## Built with

- React
- TypeScript
- Vite
- Express
- Ollama
- Gemma 3 4B

## How Gemma is used

Ray is brought to life using **Gemma 3 4B (`gemma3:4b`)**, running locally through Ollama.

Gemma generates Ray’s dialogue. The player’s progress through the archive determines which records and story information are available to the model.

The application enforces the narrative stage gates:

- Act I keeps Ray guarded and prevents premature disclosure.
- Act II allows Ray to discuss the machine and the production stoppage, but not the full motive.
- Act III allows Ray to explain why he stopped the press.

Gemma is not a bolt-on chatbot. Ray’s dialogue is a core part of the story experience.

The AI is not allowed to rewrite canonical archive records, invent new story facts, or resolve the story’s supernatural ambiguity.

The project runs locally through Ollama and does not require a paid AI API.

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) and npm
- [Ollama](https://ollama.com/)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/igbinedionelvis/never-clocked-out.git
cd never-clocked-out
```

### 2. Install and start Ollama

Install Ollama from [ollama.com](https://ollama.com/).

Pull Gemma 3 4B:

```bash
ollama pull gemma3:4b
```

Make sure Ollama is running. The backend expects the Ollama API at:

```text
http://localhost:11434
```

### 3. Start the backend

Open a terminal at the project root:

```bash
cd server
npm install
npm run dev
```

The Express backend runs at:

```text
http://localhost:3001
```

### 4. Start the frontend

Open a second terminal at the project root:

```bash
cd client
npm install
npm run dev
```

Vite will print the local frontend URL. By default, it is:

```text
http://localhost:5173
```

Keep both the backend and frontend terminals running while playing.

## Verify the backend

Open the health endpoint:

[http://localhost:3001/api/health](http://localhost:3001/api/health)

It reports the API status, configured model, and whether Ollama is reachable.

Expected response when the backend and Ollama are running:

```json
{
  "status": "ok",
  "message": "Never Clocked Out API is running",
  "model": "gemma3:4b",
  "ollama": "reachable"
}
```

## Demo walkthrough

To experience the full narrative progression:

1. Open the app in your browser.
2. Open the timecard (Artifact 01).
3. Interview Ray in Act I. Ask: **“Why did you stop the press?”**
4. Open the work order, notebook, shift schedule, and inspection checklist (Artifacts 02–05).
5. Interview Ray again in Act II with the same question.
6. Open the incident report, unsent letter, and final locker note (Artifacts 06–08).
7. Interview Ray in Act III with the same question.
8. Explore the three endings and choose how to close the archive.

The same question produces different responses as the player uncovers the records. The narrative stage gates are enforced by the application, not left entirely to the model.

## Project structure

```text
never-clocked-out/
├── client/       # React, TypeScript, Vite frontend
├── server/       # Express backend and Ollama integration
└── README.md     # Project overview and setup
```

## Model configuration

The backend uses Gemma 3 4B by default:

```text
gemma3:4b
```

You can override the model through the `OLLAMA_MODEL` environment variable. For example, in PowerShell:

```powershell
$env:OLLAMA_MODEL = "gemma3:4b"
npm run dev
```

The configured model must be available in your local Ollama installation.

## Project status

Never Clocked Out was created for the DEV Hacktoberfest AI Challenge, Week 4: **Ghost in the Machine**.

The experience combines an evidence-driven story, locally generated character dialogue, application-enforced narrative gates, and player-selected endings.
