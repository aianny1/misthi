// ─── Intro timeline ────────────────────────────────────────────────────────────
// Every timing of the opening loader lives here. All values are in seconds.
//
//   0s ──── name types in, letter by letter ──── ring grows in alongside ────┐
//                                                                            │ typed
//          "UGC Creator · Jaipur" fades in halfway through the typing        │
//                                                                            ▼
//          finished name holds on screen for `hold` ──▶ curtain lifts over `lift`
//                                                       (website appears underneath)
//
// With the values below: typing ends at 0.9s, the name holds until 1.4s, and the curtain
// is fully gone at 2.0s.
export const INTRO = {
  letterGap: 0.1, // time between one letter starting and the next
  letterIn: 0.3, // how long each letter takes to fade/rise in
  hold: 0.5, // pause on the finished name before the curtain lifts
  lift: 0.6, // how long the curtain takes to slide away
  ringSpin: 90, // degrees the ring turns while it grows in
  maxWait: 6, // safety: close the loader anyway after this long (very slow phones)
};

// Time until the last letter of "Mishthi" is fully in. The ring uses the same length.
export const typedIn = (name) => (name.length - 1) * INTRO.letterGap + INTRO.letterIn;

// How long hero animations wait: until the curtain starts lifting.
export function getIntroDelay() {
  return typedIn('Mishthi') + INTRO.hold;
}
