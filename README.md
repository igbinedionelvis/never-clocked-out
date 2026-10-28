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

## Local AI

Ray is brought to life using **Gemma 3 4B**, running locally through Ollama.

The model generates Ray’s dialogue based on the records the player has examined. The narrative is divided into acts, and the backend enforces which information Ray is allowed to discuss at each stage.

The AI is not allowed to rewrite the canonical archive, invent new story facts, or resolve the story’s supernatural ambiguity.

## Getting started

### Requirements

- Node.js
- npm
- [Ollama](https://ollama.com/)
- Gemma 3 4B

### 1. Clone the repository

```bash
git clone https://github.com/igbinedionelvis/never-clocked-out.git
cd never-clocked-out