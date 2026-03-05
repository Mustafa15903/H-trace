/**
 * storage.js — Centralized player storage utility
 * Use this file in all pages instead of calling localStorage directly.
 *
 * Usage:
 *   <script src="storage.js"></script>   (or "../storage.js" from samdesktop/)
 *   PlayerStorage.save("Alice");
 *   const name = PlayerStorage.get();
 *   PlayerStorage.clear();
 */

const PlayerStorage = {

  KEY: 'playerName',

  /** Save the player's name */
  save(name) {
    if (!name || typeof name !== 'string') return;
    localStorage.setItem(this.KEY, name.trim());
  },

  /** Get the player's name (falls back to 'Unknown Player') */
  get() {
    return localStorage.getItem(this.KEY) || 'Unknown Player';
  },

  /** Check whether a name has been saved */
  has() {
    return !!localStorage.getItem(this.KEY);
  },

  /** Remove the stored name */
  clear() {
    localStorage.removeItem(this.KEY);
  }

};