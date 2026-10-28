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

  const handleBackToArchive = () => {
    setSelectedArtifact(null);
  };

  const stageLabel = narrativeStage.toUpperCase().replace("-", " ");

  return (
    <main className="workshop">
      {selectedEnding === null && (
        <header className="workshop-header">
          <section className="archive-hero">
            <div className="hero-image" aria-hidden="true" />

            <div className="hero-content">
              <p className="eyebrow">MORROW WORKS MACHINE SHOP NO. 4</p>

              <h1>Never Clocked Out</h1>

              <p className="tagline">Some shifts never end.</p>
            </div>
          </section>
        </header>
      )}

      {/* ARCHIVE LANDING */}
      {selectedEnding === null && selectedArtifact === null && (
        <section className="archive">
          <div className="archive-heading">
            <div className="archive-heading-label">
              <span className="archive-location">RECORDS ROOM · 1989</span>
              <span className="stage-indicator">
                Current stage: {stageLabel}
              </span>
            </div>

            <div className="archive-heading-main">
              <div>
                <h2>Workshop Archive</h2>
                <p>Eight surviving records. One unclosed shift.</p>
              </div>

              <div className="archive-progress">
                <span>
                  {openedArtifacts.length} / {artifacts.length} records examined
                </span>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-valuenow={openedArtifacts.length}
                  aria-valuemin={0}
                  aria-valuemax={artifacts.length}
                  aria-label="Records examined"
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        (openedArtifacts.length / artifacts.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="artifact-list">
            {artifacts.map((artifact, index) => {
              const isOpened = openedArtifacts.includes(artifact.id);

              return (
                <article
                  className={`artifact-card ${isOpened ? "is-opened" : ""}`}
                  key={artifact.id}
                  onClick={() => handleOpenArtifact(artifact.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleOpenArtifact(artifact.id);
                    }
                  }}
                >
                  <div className={`artifact-thumbnail artifact-thumbnail-${index + 1}`}>
                    <span className="thumbnail-paper">
                      <span className="thumbnail-lines" />
                      <span className="thumbnail-lines" />
                      <span className="thumbnail-lines" />
                      <span className="thumbnail-stamp">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </div>

                  <div className="artifact-card-details">
                    <span className="artifact-id">
                      ARTIFACT-{String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{artifact.title}</h3>

                    <p>{artifact.date}</p>

                    <p className="artifact-author">{artifact.author}</p>
                  </div>

                  {isOpened && (
                    <span className="artifact-opened-mark" aria-label="Examined">
                      ✓
                    </span>
                  )}
                </article>
              );
            })}
          </div>

          {/* ENDING CHOICES */}
          {allRecordsExamined && (
            <section className="ending-choices">
              <p className="eyebrow">ARCHIVE COMPLETE</p>

              <h2>The shift is yours to close.</h2>

              <p>
                The records have been examined. What happens to Ray&apos;s story
                now?
              </p>

              <div className="ending-options">
                <button onClick={() => handleChooseEnding("record-stand")}>
                  <span>01</span>
                  <strong>Let the Record Stand</strong>
                  <small>Leave the official report unchanged.</small>
                </button>

                <button
                  onClick={() => handleChooseEnding("set-record-straight")}
                >
                  <span>02</span>
                  <strong>Set the Record Straight</strong>
                  <small>Add a corrective note to the archive.</small>
                </button>

                <button onClick={() => handleChooseEnding("close-shift")}>
                  <span>03</span>
                  <strong>Close the Shift</strong>
                  <small>Close Ray&apos;s unended time record.</small>
                </button>
              </div>
            </section>
          )}

          {/* CHAT ON ARCHIVE LANDING */}
          <section className="archive-chat-section">
            <ChatPanel
              narrativeStage={narrativeStage}
              openedArtifacts={openedArtifacts}
            />
          </section>
        </section>
      )}

      {/* SELECTED RECORD + CHAT */}
      {selectedEnding === null &&
        selectedArtifact !== null &&
        artifactToView && (
          <section className="record-workspace">
            <div className="record-topbar">
              <button className="back-to-archive" onClick={handleBackToArchive}>
                ← Back to archive
              </button>

              <span className="record-counter">
                ARTIFACT-{String(artifacts.indexOf(artifactToView) + 1).padStart(2, "0")}
                &nbsp; / &nbsp; {artifacts.length}
              </span>
            </div>

            <div className="archive-interview-layout">
              <section className="artifact-viewer">
                <p className="eyebrow">ARCHIVE RECORD</p>

                <h2>{artifactToView.title}</h2>

                <p>{artifactToView.date}</p>

                <p>{artifactToView.author}</p>

                <div className="artifact-content">
                  {artifactToView.content}
                </div>
              </section>

              <ChatPanel
                narrativeStage={narrativeStage}
                openedArtifacts={openedArtifacts}
              />
            </div>
          </section>
        )}

      {/* ENDING SCREENS */}
      {selectedEnding !== null && (
        <section className="ending-screen">
          {selectedEnding === "record-stand" && (
            <>
              <p className="eyebrow">MORROW WORKS · ARCHIVE DECISION</p>

              <h2>Let the Record Stand</h2>

              <p>The official incident report remains unchanged.</p>

              <blockquote>
                I suppose that&apos;s how it goes. They write it down, and then
                that&apos;s what happened.
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

              <p>A corrective note has been added to the archive.</p>

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

          <button
            className="ending-return-button"
            onClick={() => {
              setSelectedEnding(null);
              setSelectedArtifact(null);
            }}
          >
            Return to archive
          </button>
        </section>
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