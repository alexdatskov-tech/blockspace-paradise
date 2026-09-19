# BlockForge pricing and status refresh

## What will change
- Replace each abstract tier emblem with a recognizable voxel block icon matching the plan tier: grass, copper, iron, gold, diamond, emerald, and netherite.
- Change the first plan to $6/month and show its former $9 price crossed out beside it.
- Turn the three main performance highlights into separate rounded glass cards with more balanced contrast, a gentle lift, and a glowing border on hover.
- Rename the availability badge to “Systems operational” and make it open a dedicated `/status` page.
- Build the status page in the same BlockForge style, clearly label it Beta, and show the prototype services as operational.

## Technical details
- Keep the plan icons local as lightweight voxel-style SVG artwork using the existing design tokens.
- Add unique search and sharing metadata to the new status page.
- Preserve reduced-motion behavior and verify both desktop and mobile layouts after implementation.
