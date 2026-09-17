import { useEffect } from 'react';

interface KeyboardShortcutOptions {
  onPrev?: () => void;
  onNext?: () => void;
  onFlip?: () => void;
  onEnter?: () => void;
  onPlayAudio?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onPrev,
  onNext,
  onFlip,
  onEnter,
  onPlayAudio,
  enabled = true,
}: KeyboardShortcutOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcut when user is typing in form inputs
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        onPrev?.();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onNext?.();
      } else if (e.code === 'Space') {
        e.preventDefault();
        onFlip?.();
      } else if (e.code === 'Enter') {
        e.preventDefault();
        onEnter?.();
      } else if (
        e.code === 'KeyA' ||
        e.code === 'KeyR' ||
        e.key.toLowerCase() === 'a'
      ) {
        e.preventDefault();
        onPlayAudio?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onFlip, onEnter, onPlayAudio, enabled]);
}
