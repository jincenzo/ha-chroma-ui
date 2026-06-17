# Temperature Monitoring Card (`custom:temp-monitoring-card`)

The `custom:temp-monitoring-card` is a premium, highly aesthetic, and fully configurable Home Assistant dashboard card. Originally designed for climate parameters, it is fully generalized to display any number of climate or general sensors (e.g., Temperature, Humidity, PM10, Air Quality) in a clean, unified, and responsive grid layout.

---

## Key Features

- **Multi-Style Layouts**: Supports **Flat** (accent banner), **Glassmorphism** (frosted translucent), and **Minimal** styles.
- **Header Badges**: Display any number of clickable, optional indicator badges (e.g., for heater, cooler, lights, window sensors) inline in the card header.
- **Constrained Layout**: Displays sensors in a grid layout with a **maximum of 2 columns**. A single sensor automatically stretches to cover the full width.
- **Header Contrast Smart Tuning**: Automatically adjusts text color inside the header based on the contrast requirement of the selected accent color.
- **Range & State-based Rules**: Configure custom colors and icons for each sensor based on numeric value ranges (e.g. state `< 18` or `> 28`) or literal state matches (e.g. `'heating'`).
- **Interactive Click Actions**: Assign separate click actions (such as opening history, navigating, or toggling) to the card header and each sensor pill individually.
- **Visual Editor Compatibility**: Fully supported by the Lovelace visual card editor with collapsible sensor, badge, and rules panels for easy navigation.

---

## Configuration Reference

### Card Configuration

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `type` | string | **Yes** | — | Must be `custom:temp-monitoring-card`. |
| `title` | string | No | `'Climate'` | The main title text in the header. (Backward compatible fallback: `room_name`). |
| `icon` | string | No | `'mdi:thermometer'` | Material design icon shown in the header. (Backward compatible fallback: `room_icon`). |
| `accent_color` | string | No | `'var(--primary-color)'` | Main theme color for the header banner and glows. (Backward compatible fallback: `room_color`). |
| `text_color` | string | No | — | Custom color for header text. If omitted, contrast color is calculated automatically. |
| `card_style` | string | No | `'flat'` | Design style. Options: `'flat'`, `'glassmorphism'`, `'minimal'`. |
| `badges` | array | No | — | List of header badge configurations. See [Badge Configuration](#badge-configuration). |
| `sensors` | array | No | — | List of sensor configurations. See [Sensor Configuration](#sensor-configuration). |
| `tap_action` | object | No | — | Action triggered when clicking the card header. |

### Badge Configuration

Each badge item in the `badges` list supports:

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `entity` | string | **Yes** | — | Entity ID of the badge (e.g. `binary_sensor.heater`). |
| `icon` | string | No | — | Optional icon override. Defaults to entity's default icon. |
| `active_color` | string | No | `'var(--primary-color)'` | Active color override (HEX) when the badge state is active. |

### Sensor Configuration

Each sensor item in the `sensors` list supports:

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `entity` | string | **Yes** | — | Entity ID of the sensor (e.g. `sensor.living_room_temperature`). |
| `label` | string | No | — | Descriptive label. Defaults to friendly name. |
| `icon` | string | No | — | Default icon for the sensor pill. Defaults to entity's icon attribute or domain fallback. |
| `color` | string | No | `'var(--primary-color)'` | Default active color (HEX) for the sensor pill (glow & icon background). |
| `tap_action` | object | No | `more-info` | Action when clicking this pill. Set `action: none` to disable. |
| `rules` | array | No | — | Optional rules to change color/icon based on state values. See [Range & State Rules](#range--state-rules). |

### Range & State Rules

Under each sensor, you can define an array of `rules`. Rules are evaluated sequentially; the **first** rule that matches will apply its color and/or icon overrides:

1. **Range Match (`below` / `above`)**:
   - `below`: matches if the numeric state value is strictly less than this threshold.
   - `above`: matches if the numeric state value is strictly greater than this threshold.
   - *Example (Comfort range 18°C to 24°C)*: `above: 18, below: 24`
2. **Literal State Match (`state`)**:
   - Matches if the entity's state string matches this value (case-insensitive, e.g. `'on'`, `'heating'`).

---

## Dashboard Card Configuration Example

```yaml
type: custom:temp-monitoring-card
title: Living Room Air Quality
icon: mdi:air-filter
accent_color: '#4caf50'
card_style: glassmorphism
badges:
  - entity: binary_sensor.heater
    icon: mdi:heating-coil
    active_color: '#ff5722'
  - entity: binary_sensor.window
    icon: mdi:window-open
    active_color: '#db4437'
sensors:
  - entity: sensor.living_room_temperature
    label: Temperature
    icon: mdi:thermometer
    rules:
      - below: 19
        color: '#2196F3'
        icon: mdi:thermometer-low
      - above: 19
        below: 24
        color: '#4CAF50'
        icon: mdi:thermometer
      - above: 24
        below: 28
        color: '#FF9800'
        icon: mdi:thermometer
      - above: 28
        color: '#F44336'
        icon: mdi:thermometer-high
  - entity: sensor.living_room_humidity
    label: Humidity
    icon: mdi:water-percent
    rules:
      - below: 35
        color: '#FFB300'
      - above: 35
        below: 60
        color: '#009688'
      - above: 60
        color: '#0288D1'
  - entity: sensor.living_room_pm10
    label: PM10 Density
    icon: mdi:blur
    color: '#9c27b0'
    rules:
      - above: 50
        color: '#db4437'
        icon: mdi:alert-circle
```

---

## Backward Compatibility Auto-Migration

If you have legacy dashboards using the old hardcoded `temp_sensor` and `hum_sensor` properties or the static `badge_1_entity` / `badge_2_entity` properties, the card automatically maps them into the new dynamic structure at runtime. When editing the card in Lovelace, the visual editor will clean up the configuration and save it in the new format automatically.
