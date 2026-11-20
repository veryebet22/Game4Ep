import React from 'react';

export default function Notification({ text }) {
  if (!text) return null;
  return (
    <div className="notification" role="status" aria-live="polite">
      {text}
    </div>
  );
}
