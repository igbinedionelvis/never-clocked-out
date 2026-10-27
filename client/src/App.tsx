import { useState } from "react";
import { artifacts } from "./data/artifacts";
import { getNarrativeStage } from "./features/narrative/getNarrativeStage";
import ChatPanel from "./features/chat/ChatPanel";
import "./App.css";

function App() {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);

  const [openedArtifacts, setOpenedArtifacts] = useState<string[]>([]);

  const narrativeStage = getNarrativeStage(openedArtifacts);

  const artifactToView = artifacts.find(
    (artifact) => artifact.id === selectedArtifact,
  );

  return (
    <main className="workshop">
      <header className="workshop-header">
        <p className="eyebrow">MORROW WORKS MACHINE SHOP NO. 4</p>

        <h1>Never Clocked Out</h1>

        <p className="tagline">Some shifts never end.</p>
      </header>

      {selectedArtifact !== null && artifactToView && (
        <section className="artifact-viewer">
          <button onClick={() => setSelectedArtifact(null)}>
            ← Back to archive
          </button>

          <p className="eyebrow">ARCHIVE RECORD</p>

          <h2>{artifactToView.title}</h2>

          <p>{artifactToView.date}</p>

          <p>{artifactToView.author}</p>

          <div className="artifact-content">{artifactToView.content}</div>
        </section>
      )}

      {selectedArtifact === null && (
        <section className="archive">
          <div className="archive-heading">
            <p className="eyebrow">RECORDS ROOM · 1989</p>

            <h2>Workshop Archive</h2>

            <p>Eight surviving records. One unclosed shift.</p>

            <p>
              Records examined: {openedArtifacts.length} / {artifacts.length}
            </p>

            <p>
              Current story stage:{" "}
              {narrativeStage.toUpperCase().replace("-", " ")}
            </p>
          </div>

          <div className="artifact-list">
            {artifacts.map((artifact) => (
              <article
                className="artifact-card"
                key={artifact.id}
                onClick={() => {
                  setSelectedArtifact(artifact.id);

                  setOpenedArtifacts((previous) => {
                    if (previous.includes(artifact.id)) {
                      return previous;
                    }

                    return [...previous, artifact.id];
                  });
                }}
              >
                <span className="artifact-id">{artifact.id}</span>

                <h3>{artifact.title}</h3>

                <p>{artifact.date}</p>

                <p className="artifact-author">{artifact.author}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <ChatPanel
        narrativeStage={narrativeStage}
        openedArtifacts={openedArtifacts}
      />

      <footer className="workshop-footer">
        <p>ARCHIVE STATUS: INCOMPLETE</p>

        <p>SHIFT RECORD 00417 · CLOCK OUT NOT FOUND</p>
      </footer>
    </main>
  );
}

export default App;
