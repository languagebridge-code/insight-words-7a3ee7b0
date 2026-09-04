// Talk to Teacher (PWA) — "Install app" button shown on mobile.

import { useState } from 'react';
import { useInstallPrompt } from './useInstallPrompt';

export function InstallAppButton() {
  const { canInstall, ios, promptInstall } = useInstallPrompt();
  const [showIosHelp, setShowIosHelp] = useState(false);
  if (!canInstall) return null;

  const onClick = async () => {
    if (ios) {
      setShowIosHelp((v) => !v);
      return;
    }
    await promptInstall();
  };

  return (
    <div className="ttt-install-wrap">
      <button
        type="button"
        onClick={onClick}
        className="ttt-install-btn"
        aria-label="Install Talk to Teacher app on your device"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3v12m0-12l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Install app
      </button>

      {ios && showIosHelp && (
        <div className="ttt-ios-help" role="status">
          <strong>Add to Home Screen:</strong>
          <ol>
            <li>Tap the <span className="ttt-share">Share</span> icon in Safari's toolbar.</li>
            <li>Choose <em>Add to Home Screen</em>.</li>
            <li>Tap <em>Add</em> — Talk to Teacher opens like a real app.</li>
          </ol>
          <button type="button" className="ttt-ios-close" onClick={() => setShowIosHelp(false)}>
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
