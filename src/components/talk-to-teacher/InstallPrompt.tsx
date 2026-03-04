import { useState, useEffect } from 'react';
import { X, Share, Plus, Download } from 'lucide-react';

type Platform = 'ios' | 'android' | 'desktop' | 'unknown';

function detectPlatform(): Platform {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Windows|Macintosh|Linux/.test(ua)) return 'desktop';
  return 'unknown';
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  );
}

const DISMISS_KEY = 'lb_install_dismissed';

export function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Don't show if already installed or recently dismissed
    if (isStandalone()) return;
    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      // Show again after 3 days
      if (Date.now() - dismissedAt < 3 * 24 * 60 * 60 * 1000) return;
    }

    setPlatform(detectPlatform());
    setShow(true);

    // Listen for Chrome/Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setShow(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-800 border border-white/20 rounded-2xl p-4 shadow-2xl shadow-black/40">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#f37030]" />
            <h3 className="text-sm font-bold text-white">Install Talk to Teacher</h3>
          </div>
          <button
            onClick={handleDismiss}
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3 text-white/60" />
          </button>
        </div>

        {platform === 'ios' && (
          <div className="text-xs text-white/70 space-y-2">
            <p>Add this app to your home screen for quick access:</p>
            <ol className="list-decimal list-inside space-y-1 text-white/60">
              <li className="flex items-center gap-1.5">
                Tap the <Share className="w-3.5 h-3.5 inline text-blue-400" /> Share button in Safari
              </li>
              <li className="flex items-center gap-1.5">
                Scroll down and tap <Plus className="w-3.5 h-3.5 inline text-white/80" /> <strong className="text-white/90">Add to Home Screen</strong>
              </li>
              <li>Tap <strong className="text-white/90">Add</strong></li>
            </ol>
          </div>
        )}

        {platform === 'android' && !deferredPrompt && (
          <div className="text-xs text-white/70 space-y-2">
            <p>Add this app to your home screen for quick access:</p>
            <ol className="list-decimal list-inside space-y-1 text-white/60">
              <li>Tap the <strong className="text-white/90">⋮ menu</strong> in Chrome</li>
              <li>Tap <strong className="text-white/90">Add to Home screen</strong></li>
              <li>Tap <strong className="text-white/90">Add</strong></li>
            </ol>
          </div>
        )}

        {(platform === 'android' && deferredPrompt) && (
          <div className="text-xs text-white/70 space-y-3">
            <p>Install this app for quick access — no app store needed.</p>
            <button
              onClick={handleInstall}
              className="w-full py-2.5 rounded-xl bg-[#f37030] text-white font-semibold text-sm hover:bg-[#e0622a] transition-colors"
            >
              Install App
            </button>
          </div>
        )}

        {platform === 'desktop' && !deferredPrompt && (
          <div className="text-xs text-white/70">
            <p>Use your browser's install option to add this app to your desktop for quick access.</p>
          </div>
        )}

        {platform === 'desktop' && deferredPrompt && (
          <div className="text-xs text-white/70 space-y-3">
            <p>Install this app to your desktop for quick access.</p>
            <button
              onClick={handleInstall}
              className="w-full py-2.5 rounded-xl bg-[#f37030] text-white font-semibold text-sm hover:bg-[#e0622a] transition-colors"
            >
              Install App
            </button>
          </div>
        )}

        {platform === 'unknown' && (
          <div className="text-xs text-white/70">
            <p>Add this app to your home screen using your browser's menu for quick access.</p>
          </div>
        )}
      </div>
    </div>
  );
}
