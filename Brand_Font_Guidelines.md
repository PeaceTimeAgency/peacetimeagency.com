# Peace Time Agency // Brand Typography Guidelines

This document outlines the official typography system for the Peace Time Agency ecosystem. These fonts have been selected to maintain a "High-Fidelity" and "Midnight-on-Rails" luxury aesthetic.

## 1. Primary Display Font (Headlines)
**Font Family:** `Outfit`
**Usage:** Main Hero Headlines, Section Titles (H1 - H4), and the primary Logo.

- **Weight:** Bold (700) or Black (900)
- **Tracking:** Tighter (`tracking-tighter` or `-0.05em`)
- **Purpose:** To provide a bold, geometric, and premium brand presence.

## 2. Secondary Interface Font (Body & Navigation)
**Font Family:** `Space Grotesk`
**Usage:** Body text, paragraph content, navigation links, and button labels.

- **Weight:** Regular (400) or Medium (500)
- **Tracking:** Standard or Slightly Tight
- **Purpose:** To ensure high readability while maintaining a modern, technical feel.

## 3. Technical Accent Font (Mono)
**Font Family:** `Michroma`
**Usage:** Technical data points, stats labels, ID tags, and "Tactical" UI elements.

- **Weight:** Regular (400)
- **Tracking:** Wide (`tracking-[0.2em]`)
- **Purpose:** To add a futuristic, cinematic "heads-up display" (HUD) aesthetic to specific components.

---

### Implementation Details
The site uses **Tailwind CSS v4** with the following theme configuration:

```css
--font-sans: "Space Grotesk", sans-serif;
--font-display: "Outfit", sans-serif;
--font-mono: "Michroma", monospace;
```

To use these fonts in development, apply the following utility classes:
- `.font-display` (Outfit)
- `.font-sans` (Space Grotesk)
- `.font-mono` (Michroma)
