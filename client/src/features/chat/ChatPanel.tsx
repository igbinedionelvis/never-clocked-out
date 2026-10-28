import { useEffect, useState } from "react";

type ChatMessage = {
  sender: "player" | "ray";
  text: string;
};

type ChatPanelProps = {
  narrativeStage: "act-1" | "act-2" | "act-3";
  openedArtifacts: string[];
};

function ChatPanel({ narrativeStage, openedArtifacts }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Start a fresh interview when a new story act unlocks.
    setMessages([]);
    setError("");
  }, [narrativeStage]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    const playerMessage: ChatMessage = {
      sender: "player",
      text: trimmedMessage,
    };

    // Create the complete conversation history, including this message.
    const updatedMessages = [...messages, playerMessage];

    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          openedArtifactIds: openedArtifacts,
          history: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The server could not respond.");
      }

      if (typeof data.reply !== "string") {
        throw new Error("Ray's response was empty.");
      }

      const rayMessage: ChatMessage = {
        sender: "ray",
        text: data.reply,
      };

      setMessages((previousMessages) => [...previousMessages, rayMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="chat-panel">
      <div className="chat-header">
        <p className="eyebrow">ARCHIVE INTERVIEW</p>

        <h2>Ray Mercer</h2>

        <p>Maintenance Welder · Night Shift</p>

        <p className="eyebrow">
          STORY STAGE: {narrativeStage.toUpperCase().replace("-", " ")}
        </p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && <p>Ray's conversation will appear here.</p>}

        {messages.map((msg, index) => (
          <div
            className={`chat-message ${msg.sender}`}
            key={`${msg.sender}-${index}`}
          >
            <span className="message-sender">
              {msg.sender === "player" ? "YOU" : "RAY"}
            </span>

            <p>{msg.text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message ray">
            <span className="message-sender">RAY</span>
            <p>Thinking...</p>
          </div>
        )}

        {error && (
          <div className="chat-error">
            <p>{error}</p>
            <button onClick={() => setError("")}>Dismiss</button>
          </div>
        )}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask Ray a question..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading || !message.trim()}>
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default ChatPanel;
