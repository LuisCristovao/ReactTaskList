import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Peer from "peerjs";

const SharePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [senderPeerId, setSenderPeerId] = useState<string | null>(null);
  const [receivedTasks, setReceivedTasks] = useState<string[] | null>(null);

  // Extract peerId from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const remotePeerId = queryParams.get("peerId");

  // Dynamically construct shareUrl
  const baseUrl = window.location.href;
  const shareUrl = peerId
    ? `${baseUrl}?peerId=${peerId}`
    : `${baseUrl}?peerId=random-share-link-12345`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
    shareUrl
  )}`;

  // Initialize PeerJS and handle connections
  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("My peer ID is: " + id);

      // If there's a remotePeerId in the URL, connect to it
      if (remotePeerId && remotePeerId !== id) {
        const conn = peer.connect(remotePeerId);
        conn.on("open", () => {
          console.log("Connected to peer:", remotePeerId);
          // Send localStorage["tasks"] to the remote peer
          const tasks = localStorage.getItem("tasks");
          if (tasks) {
            conn.send({ type: "tasks", data: JSON.parse(tasks) }); // Fixed typo here
          }
        });
        conn.on("data", (data: any) => {
          console.log("Received data from " + remotePeerId + ":", data);
          if (data.type === "tasks" && remotePeerId) {
            setSenderPeerId(remotePeerId);
            setReceivedTasks(data.data);
            setShowConfirmation(true);
          }
        });
      }
    });

    peer.on("connection", (conn) => {
      conn.on("open", () => {
        console.log("Incoming connection from:", conn.peer);
        // Send localStorage["tasks"] to the connecting peer
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
          conn.send({ type: "tasks", data: JSON.parse(tasks) }); // Fixed typo here
        }
      });
      conn.on("data", (data: any) => {
        console.log("Received data from " + conn.peer + ":", data);
        if (data.type === "tasks" && remotePeerId) {
          setSenderPeerId(conn.peer);
          setReceivedTasks(data.data);
          setShowConfirmation(true);
        }
      });
    });

    return () => {
      peer.destroy();
    };
  }, [remotePeerId]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Handle confirmation response
  const acceptTasks = () => {
    if (receivedTasks) {
      localStorage.setItem("tasks", JSON.stringify(receivedTasks));
      console.log("Tasks accepted and stored:", receivedTasks);
    }
    setShowConfirmation(false);
    setReceivedTasks(null);
    setSenderPeerId(null);
  };

  const rejectTasks = () => {
    console.log("Tasks rejected");
    setShowConfirmation(false);
    setReceivedTasks(null);
    setSenderPeerId(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Tasks
      </button>

      <h1>Share Page</h1>

      {!remotePeerId ? (
        <>
          <div style={{ margin: "20px 0" }}>
            <img
              src={qrCodeUrl}
              alt="QR Code"
              style={{ width: "256px", height: "256px" }}
            />
          </div>

          <button
            onClick={copyToClipboard}
            style={{
              padding: "10px 20px",
              backgroundColor: copied ? "#28a745" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <p style={{ marginTop: "10px", wordBreak: "break-all" }}>
            {shareUrl}
          </p>
        </>
      ) : (
        // Show waiting message when remotePeerId exists (receiver)
        !showConfirmation && (
        <p style={{ marginTop: "20px" }}>Waiting for connection...</p>
      )
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && senderPeerId && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "black",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <p>Do you accept tasks from {senderPeerId}?</p>
          <button
            onClick={acceptTasks}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Yes
          </button>
          <button
            onClick={rejectTasks}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default SharePage;
