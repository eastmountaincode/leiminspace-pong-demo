import { atom } from 'jotai';

/**
 * App State Atoms
 * 
 * This file contains Jotai atoms for managing the overall application flow
 * and session state, NOT the internal pong game mechanics (like ball position, 
 * paddle movement, score, etc.). 
 * 
 * Use this for:
 * - App state transitions (intro -> playing -> gameOver)
 * - Player session management (ready states, etc.)
 * - UI flow control
 * 
 * For actual game mechanics, create separate atoms (e.g., pongGameAtoms.ts)
 */

// Game states for the overall app flow
export type GameState = 'intro' | 'playing' | 'paused' | 'gameOver';

// Player ready states
export interface PlayerStates {
  player1Ready: boolean;
  player2Ready: boolean;
}

// Player names configuration
export interface PlayerNames {
  player1: string;
  player2: string;
}

// Player names atom - can be easily changed for different themes/modes
export const playerNamesAtom = atom<PlayerNames>({
  player1: 'LEIMIN',
  player2: 'SPACE',
});

// Main game state atom
export const gameStateAtom = atom<GameState>('intro');

// Player ready states atom
export const playerStatesAtom = atom<PlayerStates>({
  player1Ready: false,
  player2Ready: false,
});

// Derived atom to check if both players are ready
export const bothPlayersReadyAtom = atom((get) => {
  const playerStates = get(playerStatesAtom);
  return playerStates.player1Ready && playerStates.player2Ready;
});

// Action atoms for updating state
export const setPlayer1ReadyAtom = atom(
  null,
  (get, set, ready: boolean) => {
    const current = get(playerStatesAtom);
    set(playerStatesAtom, { ...current, player1Ready: ready });
  }
);

export const setPlayer2ReadyAtom = atom(
  null,
  (get, set, ready: boolean) => {
    const current = get(playerStatesAtom);
    set(playerStatesAtom, { ...current, player2Ready: ready });
  }
);

export const resetPlayersAtom = atom(
  null,
  (get, set) => {
    set(playerStatesAtom, { player1Ready: false, player2Ready: false });
    set(gameStateAtom, 'intro');
  }
);

export const startGameAtom = atom(
  null,
  (get, set) => {
    const bothReady = get(bothPlayersReadyAtom);
    if (bothReady) {
      set(gameStateAtom, 'playing');
    }
  }
); 