# Anmol Roy — Personal Portfolio

My personal portfolio website showcasing my work as an AI &  web builder.

**Live →** [anmolroy.dev](https://anmolroy.vercel.app)

---

## What is this?

This is my portfolio — a single-page application that introduces who I am, what I build, and how to reach me. It's designed to feel like a product, not a resume dump.

---

## Sections

| Section | What's in it |
|---|---|
| **Hero** | Introduction, role, socials, and a "View Projects" CTA |
| **About** | Bento grid — bio, stats, current status, skills, interests, and tech ticker |
| **Projects** | Featured project card + filterable project grid with live/GitHub links |
| **Case Studies** | 3 deep-dive engineering stories with metrics and process breakdowns |
| **Tech Stack** | Full dev stack organized by category with Devicon icons |
| **Achievements** | Certifications and hackathon wins |
| **Contact** | Contact form + social links + availability status |
| **Footer** | Parallax name, nav links, animated tagline, back-to-top |

---

## Design Decisions

- **Dark + Light mode** — full theme system with zero flash on load. The last-used theme is saved to `localStorage` and applied via a blocking script before first paint, so there's no flicker.
- **Adaptive background** — grid pattern in light mode, animated serpentine wave with stars in dark mode.
- **Scroll-spy nav** — the active nav item updates automatically as you scroll through sections.
- **Bento grid layout** — About section uses an asymmetric CSS grid for a modern editorial feel.
- **Directional glow borders** — Project and Case Study cards react to where your cursor enters the card edge.
- **No page reloads** — everything is a single scrollable page with smooth anchor navigation.

---

## Built With

- **Next.js 16** — App Router, server components, metadata API
- **TypeScript** — fully typed throughout
- **Tailwind CSS v4** — utility-first styling with custom CSS token system
- **Framer Motion** — page animations, scroll-linked effects, layout transitions
- **Radix UI** — accessible UI primitives
- **Vercel Analytics** — page view tracking
- **Syne + DM Sans + JetBrains Mono** — typography trio

---

## Deployment

Hosted on **Vercel** with automatic deploys from the `main` branch.
