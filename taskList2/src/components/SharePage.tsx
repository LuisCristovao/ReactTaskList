import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Peer from 'peerjs';

const SharePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [peerId, setPeerId] = useState<string | null>(null);

  // Extract peerId from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const remotePeerId = queryParams.get('peerId');

  // Dynamically construct shareUrl using window.location.href
  const baseUrl = window.location.href.split('?')[0]; // Get URL without existing query params
  const shareUrl = peerId ? `${baseUrl}?peerId=${peerId}` : `${baseUrl}?peerId=random-share-link-12345`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(shareUrl)}`;

  // Initialize PeerJS and connect if remotePeerId exists
  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
      console.log('My peer ID is: ' + id);

      // If there's a remotePeerId in the URL, connect to it
      if (remotePeerId && remotePeerId !== id) {
        const conn = peer.connect(remotePeerId);
        conn.on('open', () => {
          console.log('Connected to peer:', remotePeerId);
          conn.send('Hello from ' + id);
        });
        conn.on('data', (data) => {
          console.log('Received data from ' + remotePeerId + ':', data);
        });
      }
    });

    peer.on('connection', (conn) => {
      conn.on('open', () => {
        console.log('Incoming connection from:', conn.peer);
        conn.send('Hello back from ' + peerId);
      });
      conn.on('data', (data) => {
        console.log('Received data from ' + conn.peer + ':', data);
      });
    });

    return () => {
      peer.destroy();
    };
  }, [remotePeerId]); // Re-run if remotePeerId changes

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back to Tasks
      </button>

      <h1>Share Page</h1>

      <div style={{ margin: '20px 0' }}>
        <img src={qrCodeUrl} alt="QR Code" style={{ width: '256px', height: '256px' }} />
      </div>

      <button
        onClick={copyToClipboard}
        style={{
          padding: '10px 20px',
          backgroundColor: copied ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <p style={{ marginTop: '10px', wordBreak: 'break-all' }}>{shareUrl}</p>
    </div>
  );
};

export default SharePage;