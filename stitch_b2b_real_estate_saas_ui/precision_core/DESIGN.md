---
name: Precision Core
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#47464b'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#77767b'
  outline-variant: '#c8c5cb'
  surface-tint: '#5f5e61'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1e'
  on-primary-container: '#858387'
  inverse-primary: '#c8c5ca'
  secondary: '#5d5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1ec'
  on-secondary-container: '#63646c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b16'
  on-tertiary-container: '#88837c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e1e6'
  primary-fixed-dim: '#c8c5ca'
  on-primary-fixed: '#1b1b1e'
  on-primary-fixed-variant: '#47464a'
  secondary-fixed: '#e3e1ec'
  secondary-fixed-dim: '#c6c5cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#46464e'
  tertiary-fixed: '#e8e2d9'
  tertiary-fixed-dim: '#cbc6bd'
  on-tertiary-fixed: '#1d1b16'
  on-tertiary-fixed-variant: '#494640'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  surface-alt: '#F5F6F7'
  border-subtle: '#E4E4E7'
  status-success: '#19A874'
  status-warning: '#F5D04E'
  status-error: '#EF4444'
  status-info: '#3B82F6'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  meta-text:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  sidebar-width: 240px
  sidebar-collapsed: 64px
  container-margin: 24px
  gutter: 16px
  density-xs: 4px
  density-sm: 8px
  density-md: 12px
---

## Brand & Style

The brand personality is "Nerdy Functional"—a sophisticated, engineered aesthetic designed for B2B real estate professionals who prioritize data integrity and workflow efficiency over visual fluff. The design system is rooted in high-utility minimalism, evoking a sense of technical mastery and reliability.

The visual style is **Modern Minimalist with a Technical Edge**. It draws inspiration from developer tools and high-end productivity software, featuring high information density, rigorous alignment, and a "built-in" feel. The interface should feel like a precision instrument: quiet, capable, and meticulously organized. It avoids decorative elements in favor of functional clarity and structural honesty.

## Colors

The palette is intentionally restrained, focusing on low-saturation neutrals to allow data and status indicators to command attention. 

- **Primary Action:** Used for high-priority interactions and primary buttons. Contrast is achieved through a near-black value against white or light gray surfaces.
- **Surface Strategy:** Use `#FAFAFA` for the main canvas and `#F5F6F7` for secondary regions like the sidebars or grouped container backgrounds to create subtle structural hierarchy.
- **Semantic Accents:** Status colors are desaturated to avoid visual noise while maintaining clear signaling. Use these sparingly for labels, badges, and small icons to denote state changes.
- **Borders:** A consistent `1px` stroke using `#E4E4E7` serves as the primary method for defining space and containment, replacing heavy shadows.

## Typography

Typography focuses on legibility and technical precision. **Geist** is used for headlines and UI labels to provide a distinct, monospaced-influenced feel that reinforces the "engineered" aesthetic. **Inter** handles body text and data entry for maximum readability.

- **Weight Constraint:** To maintain a clean look, use only three weights: Regular (400), Medium (500), and SemiBold (600).
- **Meta Text:** For secondary data points and supporting information, use the `meta-text` (13px) level.
- **Contextual Usage:** Use `label-sm` in uppercase for table headers and section overlines to differentiate them from actionable text.

## Layout & Spacing

The design system utilizes a **Fixed Grid** logic for core navigation with a **Fluid Content Area** to accommodate complex data tables and dashboards.

- **Sidebar:** A persistent, collapsible left sidebar is the primary navigation hub. It uses icons with labels at `240px` width, collapsing to a `64px` icon-only rail for increased workspace.
- **Information Density:** Use an 8px base spacing scale. For data-dense views (tables/lists), decrease internal cell padding to `density-xs` or `density-sm` to maximize visible content.
- **Top Bar:** A slim top bar (56px-64px height) houses global search and the user profile, maintaining a low vertical profile to prioritize content.
- **Breakpoints:**
  - Mobile: < 768px (Hide sidebar, use bottom navigation or hamburger).
  - Tablet: 768px - 1024px (Auto-collapse sidebar).
  - Desktop: > 1024px (Expanded sidebar by default).

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than dramatic shadows. 

- **Surface Levels:** The primary background is `#FAFAFA`. Cards and secondary containers use a white background to "pop" subtly.
- **Outlines:** All containers, cards, and input fields must use a `1px` solid border (`#E4E4E7`). 
- **Shadows:** Use only one level of shadow—a "Soft Minimal" shadow (`0 1px 3px 0 rgba(0,0,0,0.05)`) for floating elements like dropdowns, tooltips, or active cards.
- **Depth Hierarchy:**
  - Level 0: Background (`#FAFAFA`)
  - Level 1: Sidebar/Secondary regions (`#F5F6F7`)
  - Level 2: Main Cards/Content modules (White + 1px border)
  - Level 3: Overlays/Modals (White + 1px border + Soft Shadow)

## Shapes

The shape language is disciplined and geometric. 

- **Standard Elements:** Cards, inputs, and primary containers use a **0.5rem (8px)** corner radius to soften the technical aesthetic without feeling overly playful.
- **Interactive Elements:** Buttons follow the standard 8px radius.
- **Tags & Badges:** Use **Pill-shaped** (fully rounded) geometry for status tags and chips. This distinguishes metadata from interactive structural components.
- **Icons:** Use 1px stroke minimal line icons. Avoid filled icons unless indicating an active/toggled state.

## Components

- **Buttons:** Primary buttons are `#18181B` with white text. Secondary buttons use a white background with an `#E4E4E7` border. Use `label-md` for button text.
- **Input Fields:** 1px border `#E4E4E7` with 8px radius. Active state uses a 1px border of `#18181B` or a subtle 2px focus ring with low opacity.
- **Cards:** White background, 1px border, 8px radius. Title should be `headline-sm`. Padding should be consistent at `24px` for standard views or `16px` for dense data modules.
- **Chips/Tags:** Pill-shaped. Use desaturated background tints of the status colors with darkened text for contrast (e.g., desaturated green background with dark green text).
- **Lists & Tables:** Use horizontal rules only (`1px solid #E4E4E7`). Row hover state should use a subtle `#F5F6F7` background change.
- **Checkboxes/Radios:** Square for checkboxes (slightly rounded, 2px), circular for radios. Use the Primary Action color for selected states.
- **Search Bar:** Global search in the top bar should be persistent, using a 1px border and a keyboard shortcut hint (e.g., `⌘K`) in `meta-text`.