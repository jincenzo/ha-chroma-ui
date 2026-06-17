# HA-Chroma-UI 🎨✨

`ha-chroma-ui` is a suite of premium, high-performance custom Lovelace cards for Home Assistant. Built on modern web technologies (Lit, Vite, Vanilla CSS), it focuses on stunning aesthetics, responsiveness, and seamless integration with Home Assistant dashboards.

---

## Design Philosophy

The suite is built around key UI/UX standards to elevate the look and feel of your smart home:
- **Translucent Glassmorphism**: Cards feature smooth gradients, subtle borders, and optional real-time backdrop blur (`backdrop-filter`) for a premium iOS/macOS-like appearance.
- **Adaptive Contrast**: Smart color-luminance computation ensures that header text and icons dynamically adapt to background colors for perfect readability.
- **Micro-Animations & Feedback**: Subtle hover transitions, custom active state pops, and touch-down scaling effects make the interface feel alive.
- **Dark Mode Optimization**: Inactive states and border colors automatically scale with dark themes using standard CSS properties, avoiding hardcoded, unreadable styles.

---

## Available Cards in the Suite

Currently, the framework delivers the following components:

### 1. Room Card (`custom:room-card`) 🛋️
A comprehensive room controller card that consolidates room information, climate sensors (temperature and humidity), and up to 10 dynamic status badges.
- **Main Documentation**: For a deep dive into configuration options and badge-logic expressions, see [Room Card Documentation](file:///c:/DEV/Repositories/GitHub/ha-chroma-ui/docs/room-card.md).
- **Lovelace Examples**: For complete YAML layouts of room grids, see [Converted Dashboard Grid Example](file:///c:/DEV/Repositories/GitHub/ha-chroma-ui/examples/converted-dashboard-grid.md).

### 2. Upcoming Cards (Under Active Development) 🚀
We are extending this framework to include:
- **Media Player Card**: A matching glassmorphic media control card with track details and scrubbing.
- **Climate Card**: A clean, radial thermostat controller.
- **Light & Group Card**: Grouped controls with HSL color-wheel selectors.

---

## Global Design Tokens (Theme Variables)

You can customize the entire layout of the Chroma UI cards by defining the following custom properties in your Home Assistant theme files:

```yaml
Chroma-Theme:
  # Borders & Corners
  ha-chroma-border-radius: "24px"
  ha-chroma-badge-border-radius: "10px"
  
  # Glassmorphism Details
  ha-chroma-glass-bg-token: "rgba(255, 255, 255, 0.04)"
  ha-chroma-glass-bg-hover-token: "rgba(255, 255, 255, 0.08)"
  ha-chroma-glass-border-token: "rgba(255, 255, 255, 0.09)"
  ha-chroma-glass-border-hover-token: "rgba(255, 255, 255, 0.18)"
```

---

## Quick Installation Summary

For detailed step-by-step instructions, see the [Installation Guide](file:///c:/DEV/Repositories/GitHub/ha-chroma-ui/INSTALL.md).

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. **Copy to Home Assistant**:
   Copy the generated `dist/ha-chroma-ui.js` file to your Home Assistant configuration's `www/` folder.
3. **Register Resource**:
   Add `/local/ha-chroma-ui.js` as a Lovelace resource in **Settings** > **Dashboards** > **Resources** as a `JavaScript Module`.

---

## Development Workflow

### Prerequisites
- Node.js (v18+)
- npm

### Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### Local Dev Server
Vite is used to run a local development server:
```bash
npm run dev
```

### Build Distribution
To build the self-contained JS bundle:
```bash
npm run build
```
*(Bypass powershell script execution policy on Windows if needed: `powershell -ExecutionPolicy Bypass -Command "npm run build"`)*
