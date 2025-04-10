import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SharePage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Placeholder URL - update this later with your actual URL
  const shareUrl = 'https://example.com/random-share-link-12345';

  // URL for the QR code image using goqr.me API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(shareUrl)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "copied" state after 2 seconds
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '8px 16px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back to Tasks
      </button>

      <h1>Share Page</h1>
      
      {/* QR Code Image */}
      <div style={{ margin: '20px 0' }}>
        <img
          src={qrCodeUrl}
          alt="QR Code"
          style={{ width: '256px', height: '256px' }}
        />
      </div>

      {/* Copy Button */}
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

      {/* Optional: Display the URL */}
      <p style={{ marginTop: '10px', wordBreak: 'break-all' }}>{shareUrl}</p>
    </div>
  );
};

export default SharePage;