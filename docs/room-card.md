# Room Card Deep Dive (`custom:room-card`)

The `custom:room-card` is a premium, high-performance dashboard card designed for Home Assistant that combines room information, climate sensors, and interactive status badges into a sleek, cohesive interface.

---

## Key Features

- **Multi-Style Layouts**: Support for **Flat**, **Glassmorphism** (translucent with backdrop blur), and **Minimal** designs.
- **Smart Color Contrast**: The header text and icon colors automatically compute contrast thresholds relative to your accent `room_color` so they are always legible.
- **Dynamic Status Badges**: Display up to 10 interactive badges in a row that dynamically light up, glow, and pop when active.
- **Advanced State Evaluation**: Define exact trigger rules for when a badge is active (e.g., specific states like `open` or general exclusion of states like `off`).
- **Tactile Feedback**: Support for `tap_action` and `hold_action` (navigate, call-service, more-info, etc.) on both the main card and individual badges.
- **Visual Editor**: Fully compatible with the Home Assistant dashboard visual editor.

---

## Configuration Reference

### Card Configuration

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `type` | string | **Yes** | — | Must be `custom:room-card`. |
| `room_name` | string | **Yes** | `'Room'` | The label displayed in the header. |
| `room_icon` | string | **Yes** | `'mdi:help-circle'` | The material design icon displayed in the header. |
| `room_color` | string | No | `'var(--primary-color)'` | Accent color (HEX, RGB, or CSS Variable) used for the header and active badges. |
| `card_style` | string | No | `'flat'` | Design style of the card. Options: `'flat'`, `'glassmorphism'`, `'minimal'`. |
| `temp_sensor` | string | No | — | Entity ID of the temperature sensor (e.g. `sensor.living_room_temperature`). |
| `hum_sensor` | string | No | — | Entity ID of the humidity sensor (e.g. `sensor.living_room_humidity`). |
| `tap_action` | object | No | `more-info` | Action to trigger when the main card is tapped. See [Tap Actions](#tap-actions). |
| `hold_action` | object | No | — | Action to trigger when the main card is held down. |
| `badges` | array | No | — | List of badge configurations. Max 10 badges. |

### Badge Configuration

Each badge inside the `badges` array is defined as follows:

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `entity` | string | **Yes** | — | Entity ID of the device to track (e.g. `light.living_lights`). |
| `icon` | string | No | — | Icon override. If omitted, the card automatically uses the entity's custom icon, or a domain fallback (e.g. lightbulb for lights, key/lock for locks). |
| `on_bg` | string | No | `'#FFC107'` | The background and glow color of the badge when it is active (HEX). |
| `state_equals` | string | No | — | If specified, the badge is active **only** when the state matches this exact string (case-sensitive). |
| `state_not_in` | array | No | `['off', 'unavailable', 'unknown']` | Used if `state_equals` is omitted. The badge is active if its state is **not** in this list. |
| `tap_action` | object | No | `more-info` | Action to trigger when the badge is tapped. Set `action: none` to disable. |
| `rules` | array | No | — | Optional list of state-specific color/icon rules. Overrides default active/inactive colors. See [State Rules](#1-state-rules-priority-rules). |

---

## Badge State Logic & Expressions

The card evaluates whether a badge is **Active** (lit up with an animated entry, custom background color, and drop-shadow glow) or **Inactive** (a translucent dashed border with a dimmed icon) based on three levels of priority:

### 1. State Rules Priority (`rules`)
If a badge has a list of `rules` configured, they take precedence over standard logic. The card checks each rule sequentially. The **first** rule whose `state` matches the current entity state will activate the badge and apply the rule's custom color/icon.

Both **color** and **icon** inside a rule are **optional**:
* **Color Fallback Chain**:
  1. The matching rule's `color` (if defined).
  2. The badge's custom active color `on_bg` (if defined).
  3. The default active badge color (`#FFC107`).
* **Icon Fallback Chain**:
  1. The matching rule's `icon` (if defined).
  2. The badge's custom `icon` (if defined).
  3. The entity's custom icon configured in Home Assistant (if defined).
  4. The domain-based fallback icon (e.g. `mdi:lightbulb` for light, `mdi:door-open` for door contact, etc.).
* **If no rules match**: The badge is treated as **Inactive**.

*Example: Green + Open Icon when open, Red + Closed Icon when closed for a cover:*
```yaml
badges:
  - entity: cover.living_room_blinds
    rules:
      - state: 'open'
        color: '#4CAF50' # Active Green Glow
        icon: mdi:window-open-variant
      - state: 'closed'
        color: '#F44336' # Active Red Glow
        icon: mdi:window-closed-variant
```

### 2. State Equality (`state_equals`)
Used if no `rules` are defined and `state_equals` is set:
$$\text{Active} \iff \text{entity.state} == \text{state\_equals}$$
*Example: Set `state_equals: 'on'` for contact sensors, or `state_equals: 'cleaning'` for a vacuum.*

### 3. Exclusion List (`state_not_in`)
Used if no `rules` or `state_equals` are defined:
$$\text{Active} \iff \text{entity.state} \notin \text{state\_not\_in}$$
By default, `state_not_in` is `['off', 'unavailable', 'unknown']`. This means **any state other than these** will light up the badge.
*Example: Perfect for lights (which might be `on` or dim level percentages), media players (which might be `playing` or `paused`).*

---

## Domain Deep Dive & Configuration Examples

Here are detailed examples of how to configure status badges for different smart home domains using expressions and exclusions.

### 1. Lights (`light.*`)
Lights are active in any state that isn't `off`. Since lights support dimming levels and colors, we use the default exclusion list.
```yaml
- entity: light.living_room_lights
  icon: mdi:lightbulb
  on_bg: '#FFC107' # Warm Amber Glow
```

### 2. Doors, Windows, & Motion (`binary_sensor.*`)
Binary sensors typically use `on` / `off` states. You want the badge to light up when a door or window is open, or when motion is detected.
```yaml
# Front Door (Contact Sensor)
- entity: binary_sensor.front_door_contact
  icon: mdi:door-open
  on_bg: '#2196F3' # Alert Blue Glow
  state_equals: 'on' # Only active when open

# Motion Sensor
- entity: binary_sensor.living_room_motion
  icon: mdi:motion-sensor
  on_bg: '#E91E63' # Vibrant Pink Glow
  state_equals: 'on' # Only active when motion detected
```

### 3. Covers, Blinds, & Shutters (`cover.*`)
Covers can be `open`, `closed`, `opening`, or `closing`. Typically, you want the badge to light up whenever the cover is not closed.
```yaml
# Shutter - active if not closed
- entity: cover.living_room_shutter
  icon: mdi:window-shutter
  on_bg: '#9C27B0' # Royal Purple Glow
  state_not_in:
    - 'closed'
    - 'unavailable'
    - 'unknown'
```

### 4. Smart Locks (`lock.*`)
For security devices, you want the badge to stand out and glow when a lock is in an unsafe state (unlocked).
```yaml
- entity: lock.front_door
  icon: mdi:lock-open-variant
  on_bg: '#F44336' # Warning Red Glow
  state_equals: 'unlocked' # Lights up if someone forgot to lock the door
```

### 5. Media Players (`media_player.*`)
Media players have various states: `playing`, `paused`, `idle`, `off`, `standby`. You might want the badge to light up when active (either playing or paused), but turn grey when turned off or idle.
```yaml
- entity: media_player.living_room_tv
  icon: mdi:television
  on_bg: '#4CAF50' # Forest Green Glow
  state_not_in:
    - 'off'
    - 'idle'
    - 'standby'
    - 'unavailable'
    - 'unknown'
```

### 6. Climate & Thermostats (`climate.*`)
Thermostats are typically considered active when they are heating, cooling, or auto-regulating, and inactive when set to `off`.
```yaml
- entity: climate.living_room_thermostat
  icon: mdi:thermostat
  on_bg: '#FF9800' # Deep Orange Glow
  state_not_in:
    - 'off'
    - 'unavailable'
    - 'unknown'
```

### 7. Robot Vacuums (`vacuum.*`)
You want to know when your vacuum is actively cleaning, returning home, or has an error.
```yaml
- entity: vacuum.robo_cleaner
  icon: mdi:robot-vacuum
  on_bg: '#00BCD4' # Cyan Glow
  state_equals: 'cleaning' # Lights up only when vacuuming
```

### 8. Device Trackers & People (`person.*` / `device_tracker.*`)
Track presence in a room or home. You can light up a badge when a specific person is "home".
```yaml
- entity: person.john_doe
  icon: mdi:account
  on_bg: '#8BC34A' # Light Green Glow
  state_equals: 'home'
```

---

## Tap Actions

Both the main card and individual badges support custom tap actions. The default action is `more-info`.

### Examples of Tap Actions

**1. More Info (Default)**
Opens the standard Home Assistant detail card for the entity.
```yaml
tap_action:
  action: more-info
```

**2. Navigation**
Navigates to another page in your dashboard.
```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/living-room
```

**3. Call Service**
Triggers a Home Assistant service directly from the badge.
```yaml
tap_action:
  action: call-service
  service: light.toggle
  target:
    entity_id: light.living_room_lights
```

**4. None**
Disables any interaction.
```yaml
tap_action:
  action: none
```

---

## Full Dashboard Card YAML Example

Here is a complete YAML configuration using the modern flat syntax:

```yaml
type: custom:room-card
room_name: Living Room
room_icon: mdi:sofa
room_color: '#87a38d'
card_style: glassmorphism
temp_sensor: sensor.living_room_temperature
hum_sensor: sensor.living_room_humidity
tap_action:
  action: navigate
  navigation_path: /dashboard-test/living
badges:
  - entity: light.living_room_lights
    icon: mdi:lightbulb
    on_bg: '#FFC107'
  - entity: binary_sensor.living_room_motion
    icon: mdi:motion-sensor
    on_bg: '#E91E63'
    state_equals: 'on'
  - entity: cover.living_room_shutter
    icon: mdi:window-shutter
    on_bg: '#9C27B0'
    state_not_in:
      - 'closed'
      - 'unavailable'
      - 'unknown'
  - entity: lock.front_door
    icon: mdi:lock-open-variant
    on_bg: '#F44336'
    state_equals: 'unlocked'
```

---

## Legacy Config Compatibility

If you are migrating from an older `custom:button-card` variables layout, the Room Card has a built-in compatibility parser. It translates old `variables` structures on-the-fly:

```yaml
type: custom:room-card
variables:
  room_name: Living Room
  room_icon: mdi:sofa
  room_color: '#87a38d'
  temp_sensor: sensor.living_room_temperature
  hum_sensor: sensor.living_room_humidity
  badge_1_entity: light.living_room_lights
  badge_1_icon: mdi:lightbulb
  badge_1_on_bg: '#FFC107'
```
*(This setup is automatically mapped to the new configuration format internally, ensuring your existing setups do not break.)*
