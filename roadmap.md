# Roadmap

## Done

- [x] Create BlockForge visual system and brand
- [x] Build Minecraft hosting landing page
- [x] Add a dedicated About page and beta status page
- [x] Add live server CPU and memory activity
- [x] Add custom Minecraft block icons per plan tier
- [x] Build a polished login page
- [x] Rebuild the design system: translucent panels over a always-visible
      wallpaper, hairline borders, restrained accent colour, scroll reveals
- [x] Brighten the wallpaper and keep it fixed and visible on every page
- [x] Replace the horizontal hero ticker with a vertical one
- [x] Drop all third-party host attribution — we present as the operator
- [x] Rebuild the plan catalogue in `src/lib/plans.ts` as a single source of
      truth (standard: Copper/Iron/Gold/Diamond, premium: Netherite/Draconium/
      Bedrockium/Neutronium/Void)
- [x] Five regions at one price, with drawn SVG flags instead of abbreviations
- [x] Region picker with "auto-select the best region"
- [x] Checkout flow: server name, root username, root password, region,
      SSH add-on, promo code, crypto payment, order confirmation
- [x] Quote provisioning honestly at 2–3 minutes
- [x] Remove the fabricated review rail and the unearned Trustpilot rating

## Next

- [ ] Wire checkout to a real provisioning API and payment processor —
      the form is currently client-side only and places no real order
- [ ] Replace the sample telemetry card with a real feed, or keep it clearly
      labelled as a sample
- [ ] Move the SSH promo code out of the bundle: `SSH_PROMO_CODE` in
      `src/lib/plans.ts` ships to the browser and can be read by anyone
- [ ] Confirm the uptime figures on the status page against real monitoring
      before presenting them as measured
- [ ] Add real customer reviews once there are customers to quote

## Pricing model

Retail prices are derived from the supplier's monthly EUR cost (`costEur` on
each plan) rather than typed in, so a rate-card change means editing one number
per plan. Three constants in `src/lib/plans.ts` control the rest:

- `EUR_TO_USD` — conversion rate. **Update this when the rate moves**; it is a
  hardcoded snapshot, not a live feed.
- `MARKUP` — gross margin over cost, applied to the *yearly* rate (1.35 = 35%).
- `MONTHLY_PREMIUM` — what paying monthly costs over the yearly rate (1.30),
  which is where the advertised annual saving comes from.

The yearly rate is the floor on purpose. Deriving it by discounting a marked-up
monthly price sells below cost as soon as the discount exceeds the margin — at
35% markup less a 30% discount, every annual order loses money. `marginPct()`
reports the margin on either cycle.

We advertise and bill **0% VAT** (`VAT_RATE`). The supplier quotes VAT-exclusive
prices, so that tax comes out of `MARKUP` — worth re-checking against real
invoices before launch.
