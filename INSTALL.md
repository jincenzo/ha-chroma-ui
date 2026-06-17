# Installation Guide - Room Card (`ha-chroma-ui`)

Follow these instructions to install the custom Room Card in your Home Assistant dashboard.

---

## Method 1: Manual Installation (Recommended for Development)

### 1. Build the Bundle
If you have made modifications to the source code, compile the code to generate the production bundle file (`dist/ha-chroma-ui.js`):
```bash
npm run build
```

### 2. Copy the File to Home Assistant
Copy the compiled file `dist/ha-chroma-ui.js` from your local machine to your Home Assistant configuration directory under the `www` folder.
* **Destination Path**: `<home_assistant_config_dir>/www/ha-chroma-ui.js`
* If the `www` folder doesn't exist, create it.

> [!NOTE]
> During the build, Vite also generates a source map file named `ha-chroma-ui.js.map` in the `dist` directory. This file is **only** used for debugging in browser developer tools and is **not required** for the card to function. You can safely ignore it and you do not need to copy it to Home Assistant.

*(Note: The `www` directory maps to the `/local/` URL path in Home Assistant.)*

### 3. Add as a Lovelace Resource
1. In Home Assistant, navigate to **Settings** > **Dashboards**.
2. Click the **three dots** in the top-right corner and select **Resources**.
3. Click **Add Resource** in the bottom-right corner.
4. Configure the settings:
   - **URL**: `/local/ha-chroma-ui.js?v=1.0.0` *(Pro tip: append `?v=1.0.0` or a random string to force refresh cache when upgrading)*
   - **Resource Type**: `JavaScript Module`
5. Click **Create**.

---

## Method 2: Installation via HACS (Home Assistant Community Store)

If you have hosted this repository on GitHub, you can add it as a custom repository in HACS:

1. In Home Assistant, go to **HACS** > **Frontend**.
2. Click the **three dots** in the top-right corner and select **Custom repositories**.
3. Configure the settings:
   - **Repository URL**: Link to your GitHub repository (e.g. `https://github.com/username/ha-chroma-ui`)
   - **Category**: `Lovelace`
4. Click **Add**.
5. Once added, find `ha-chroma-ui` in the list, click on it, and select **Download**.
6. HACS will automatically register the Lovelace resource for you.

---

## Using the Card in Dashboard

Once installed, you can add the card to any of your dashboards.

### Simple Configuration (Visual Editor)
With the new changes, the card is fully compatible with the visual editor:
1. Click **Edit Dashboard** on your dashboard.
2. Click **Add Card** and search for `Room Card` or choose **Manual Card** and type:
   ```yaml
   type: custom:room-card
   room_name: Living Room
   room_icon: mdi:sofa
   room_color: '#87a38d'
   badges:
     - entity: light.living_room_lights
       state_equals: 'on'
       on_bg: '#FFC107'
   ```

### Features Configured via UI
When editing the card, you can use the interactive form editor to:
- Use the **color picker** to select the accent color for the header and badge active colors.
- Use the **icon picker** to select a custom icon. Leave it empty to automatically load the default icon associated with the entity (e.g. lightbulb for light, door for door sensor, etc.).
- Set the **Active Status Value** to configure which state (like `on` or `active`) lights up the badge.
