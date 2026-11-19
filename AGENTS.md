
## Project rules
- Invitation details (names, date, venue, texts) live only in `src/lib/invitation.ts`; components read from it so a new couple means editing one file.
- RSVPs are insert-only for visitors; the public page reads only the aggregate head count via the `attending_total()` function, so guest names/phones never leak.
- Countdown math is a pure function in `src/lib/countdown.ts` (tested); components compute it after mount to avoid hydration mismatches.
