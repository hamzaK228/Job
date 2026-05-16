# SKILL.md — Job Predict KG Technical Standards

This document outlines the technical excellence and motion design standards for the **Job Predict KG** platform. It serves as a guide for maintaining "God Level" UI/UX while preserving the core logic of the prediction engine.

## 1. Core Philosophy
- **Aesthetics First**: Every pixel must contribute to a "Premium Cyber-KG" atmosphere.
- **Motion as Language**: Animations are not decorations; they guide the user's attention and explain the flow of data.
- **Data Integrity**: The core algorithm for Acceptance Rate calculation is immutable and must remain scientifically consistent with provided datasets.

## 2. Technical Stack
- **Framework**: React 19 (Functional Components, Hooks).
- **Styling**: Tailwind CSS 4.0+ (utilizing arbitrary values, glassmorphism utilities, and new color spaces).
- **Motion**: Framer Motion (staggered entries, layout transitions, complex gesture handling).
- **Charts**: Recharts (customized with high-fidelity tooltips and glowing lines).
- **Icons**: Lucide React.

## 3. "God Level" UI Standards

### Visual Language
- **Glassmorphism**: Use `backdrop-blur-xl` combined with `bg-white/[0.03]` and multi-layered border gradients.
- **Noise & Texture**: Subtle grain overlays to prevent "flat" digital feels.
- **Glowing Elements**: Utilize `drop-shadow` and `box-shadow` with HSL-tailored colors (Cyan: 190, Fuchsia: 300).
- **Depth**: Use 3D transforms (`rotateX`, `rotateY`) on interactive cards to create a sense of physical presence.

### Motion Design
- **Staggered Entry**: Parent containers must use `staggerChildren` to create a rhythmic reveal of the dashboard.
- **Layout Transitions**: Use `layout` and `layoutId` for smooth size changes in the vacancy list and calculator results.
- **Spring Physics**: Avoid linear timing; use `type: "spring"` with calibrated `stiffness` (100) and `damping` (20) for a "premium" tactile feel.
- **Number Animation**: All data indices must animate when values change, providing immediate visual feedback of the "calculation process."

## 4. Calculator Logic (Immutable)
The `useAcceptanceRate` hook contains the "Secret Sauce." Do not modify the following:
- **Base Probabilities**: Hardcoded per profession in `data.json`.
- **Market Adjustments**: The formula `(graduates - vacancies) / graduates` scaled by `-26`.
- **Age Factors**: The specific brackets (16-21, 22-24, 25-32, etc.).
- **Macro Headwind**: The dependency on the latest unemployment delta.

## 5. Performance & SEO
- **Optimization**: All components must be lightweight. Use `useMemo` for heavy data filtering.
- **A11y**: Ensure high contrast for data points and proper `aria-labels` for interactive elements.
- **SEO**: Use semantic HTML5 (section, article, header, footer) and descriptive title/meta tags.

---
*Maintained by Antigravity AI*
