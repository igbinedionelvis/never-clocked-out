import { useState } from "react";
import { artifacts } from "./data/artifacts";
import { getNarrativeStage } from "./features/narrative/getNarrativeStage";
import ChatPanel from "./features/chat/ChatPanel";
import "./App.css";

type Ending = "record-stand" | "set-record-straight" | "close-shift";

function App() {
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [openedArtifacts, setOpenedArtifacts] = useState<string[]>([]);
  const [selectedEnding, setSelectedEnding] = useState<Ending | null>(null);

  const narrativeStage = getNarrativeStage(openedArtifacts);

  const artifactToView = artifacts.find(
    (artifact) => artifact.id === selectedArtifact,
  );

  const allRecordsExamined = artifacts.every((artifact) =>
    openedArtifacts.includes(artifact.id),
  );

  const handleOpenArtifact = (artifactId: string) => {
    setSelectedArtifact(artifactId);

    setOpenedArtifacts((previous) => {
      if (previous.includes(artifactId)) {
        return previous;
      }

      return [...previous, artifactId];
    });
  };

  const handleChooseEnding = (ending: Ending) => {
    setSelectedEnding(ending);
    setSelectedArtifact(null);
  };

  return (
    <main className="workshop">
      <header className="workshop-header">
        <p className="eyebrow">MORROW WORKS MACHINE SHOP NO. 4</p>

        <h1>Never Clocked Out</h1>

        <p className="tagline">Some shifts never end.</p>
      </header>

      {/* FINAL ENDING SCREEN */}
      {selectedEnding !== null && (
        <section className="ending-screen">
          {selectedEnding === "record-stand" && (
            <>
              <p className="eyebrow">MORROW WORKS · ARCHIVE DECISION</p>

              <h2>Let the Record Stand</h2>

              <p>
                The official incident report remains unchanged.
              </p>

              <blockquote>
                I suppose that's how it goes. They write it down, and then
                that's what happened.
              </blockquote>

              <p className="ending-status">
                The official record remains authoritative.
              </p>
            </>
          )}

          {selectedEnding === "set-record-straight" && (
            <>
              <p className="eyebrow">MORROW WORKS · ARCHIVE DECISION</p>

              <h2>Set the Record Straight</h2>

              <p>
                A corrective note has been added to the archive.
              </p>

              <div className="archive-correction">
                <p className="eyebrow">CORRECTIVE ARCHIVE NOTE</p>

                <p>
                  The surviving records indicate that Raymond Mercer reported
                  abnormal movement and an incomplete safety inspection on
                  Press No. 4 before stopping production. The official incident
                  report does not mention these records.
                </p>
              </div>

              <p className="ending-status">
                The original incident report remains preserved.
              </p>
            </>
          )}

          {selectedEnding === "close-shift" && (
            <div className="shift-closure">
              <p className="eyebrow">MORROW WORKS · TIME RECORD</p>

              <h2>SHIFT CLOSED</h2>

              <p>Raymond Mercer</p>

              <p>17 October 1989</p>

              <p className="final-line">
                Some shifts never end.
                <br />
                This one finally did.
              </p>
            </div>
          )}
        </section>
      )}

      {/* SINGLE ARCHIVE RECORD VIEW */}
      {selectedEnding === null &&
        selectedArtifact !== null &&
        artifactToView && (
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

      {/* MAIN ARCHIVE */}
      {selectedEnding === null && selectedArtifact === null && (
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
                onClick={() => handleOpenArtifact(artifact.id)}
              >
                <span className="artifact-id">{artifact.id}</span>

                <h3>{artifact.title}</h3>

                <p>{artifact.date}</p>

                <p className="artifact-author">{artifact.author}</p>
              </article>
            ))}
          </div>

          {/* ENDING CHOICES */}
          {allRecordsExamined && (
            <section className="ending-choices">
              <p className="eyebrow">ARCHIVE COMPLETE</p>

              <h2>The shift is yours to close.</h2>

              <p>
                The records have been examined. What happens to Ray's story
                now?
              </p>

              <div className="ending-options">
                <button
                  onClick={() => handleChooseEnding("record-stand")}
                >
                  <span>01</span>
                  <strong>Let the Record Stand</strong>
                  <small>Leave the official report unchanged.</small>
                </button>

                <button
                  onClick={() =>
                    handleChooseEnding("set-record-straight")
                  }
                >
                  <span>02</span>
                  <strong>Set the Record Straight</strong>
                  <small>Add a corrective note to the archive.</small>
                </button>

                <button
                  onClick={() => handleChooseEnding("close-shift")}
                >
                  <span>03</span>
                  <strong>Close the Shift</strong>
                  <small>Close Ray's unended time record.</small>
                </button>
              </div>
            </section>
          )}
        </section>
      )}

      {/* RAY'S INTERVIEW */}
      {selectedEnding === null && (
        <ChatPanel
          narrativeStage={narrativeStage}
          openedArtifacts={openedArtifacts}
        />
      )}

      {/* FOOTER */}
      <footer className="workshop-footer">
        {selectedEnding === "close-shift" ? (
          <>
            <p>ARCHIVE STATUS: SHIFT CLOSED</p>

            <p>SHIFT RECORD 00417 · CLOCK OUT RECORDED</p>
          </>
        ) : selectedEnding !== null ? (
          <>
            <p>ARCHIVE STATUS: RECORD PRESERVED</p>

            <p>SHIFT RECORD 00417 · ARCHIVE DECISION RECORDED</p>
          </>
        ) : allRecordsExamined ? (
          <>
            <p>ARCHIVE STATUS: AWAITING FINAL DECISION</p>

            <p>SHIFT RECORD 00417 · CLOCK OUT NOT FOUND</p>
          </>
        ) : (
          <>
            <p>ARCHIVE STATUS: INCOMPLETE</p>

            <p>SHIFT RECORD 00417 · CLOCK OUT NOT FOUND</p>
          </>
        )}
      </footer>
    </main>
  );
}

export default App;