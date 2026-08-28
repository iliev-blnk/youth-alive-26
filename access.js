/* Youth Alive 26 — access whitelist (client-side gate).
   Values are SHA-256 hashes of each allowed email (lower-cased, trimmed),
   so real addresses are NOT exposed in the page source.

   To add someone: give the team member's email to whoever maintains this,
   generate its hash, and add it below. From a terminal:
     printf '%s' "person@example.com" | sha256sum
   (Leave the list EMPTY to disable the gate entirely.)  */
window.YA_ALLOW = [
  "79b414b8adde0b849d64cc8b6195f21a7c7779f990772142669d5571b9aa40d2", // beleniuc.ilie@gmail.com (test)
];
