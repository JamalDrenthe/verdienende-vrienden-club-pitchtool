import confetti from 'canvas-confetti';

/**
 * Game Show Confetti Effects in VVC Brand Colors
 */
export const fireConfetti = (origin = { x: 0.5, y: 0.6 }) => {
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin,
      colors: ['#e6007e', '#ff2a9d', '#ffffff', '#ffd700', '#10b981'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  } catch {}
};

export const fireJackpotCelebration = () => {
  try {
    const end = Date.now() + 1500;
    const colors = ['#e6007e', '#ff47ab', '#ffd700', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } catch {}
};
