// Talk to Teacher (PWA) — home-screen install prompt.
//
// Captures the browser `beforeinstallprompt` event (Chrome/Edge/Android) and
// surfaces an "Install app" button. iOS Safari never fires that event, so on
// iOS we show a short "Add to Home Screen" instruction instead.

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function detectIOS(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const ios = /iphone|ipad|ipod/i.test(ua);
  // iPadOS 13+ reports as desktop Safari but still supports Add to Home Screen.
  const ipadDesktop = /macintosh/i.test(ua) && 'ontouchend' in document;
  return ios || ipadDesktop;
}

export function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [ios] = useState(detectIOS);

  useEffect(() => {
    // Already installed (standalone) → nothing to do.
    const standalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) { setInstalled(true); return; }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => { setDeferred(null); setInstalled(true); };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = async (): Promise<'accepted' | 'dismissed' | null> => {
    if (!deferred) return null;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    setDeferred(null);
    return choice.outcome;
  };

  // Show a button when: Android/Chrome deferred prompt is ready, OR we're on
  // iOS (no event, but Add to Home Screen is always available manually).
  const canInstall = !installed && (Boolean(deferred) || ios);
  return { canInstall, installed, ios, promptInstall };
}
