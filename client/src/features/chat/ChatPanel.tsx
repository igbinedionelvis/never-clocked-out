import { useState } from "react";

type ChatMessage = {
  sender: "player" | "ray";
  text: string;
};

type ChatPanelProps = {
  narrativeStage: "act-1" | "act-2" | "act-3";
};

function ChatPanel({ narrativeStage }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    const playerMessage: ChatMessage = {
      sender: "player",
      text: trimmedMessage,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      playerMessage,
    ]);

    setMessage("");
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
        {messages.length === 0 ? (
          <p>Ray's conversation will appear here.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              className={`chat-message ${msg.sender}`}
              key={index}
            >
              <span className="message-sender">
                {msg.sender === "player" ? "YOU" : "RAY"}
              </span>

              <p>{msg.text}</p>
            </div>
          ))
        )}
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask Ray a question..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default ChatPanel;
