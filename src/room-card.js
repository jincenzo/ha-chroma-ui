import { LitElement, html, css } from 'lit';
import { sharedStyles } from './shared-styles.js';
import './room-card-editor.js';

class RoomCard extends LitElement {
  static getConfigElement() {
    return document.createElement('room-card-editor');
  }

  static properties = {
    hass: { type: Object },
    _config: { type: Object },
  };

  static styles = [
    sharedStyles,
    css`
      /* Room Card Specific Styles */
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        gap: 10px;
        transition: var(--ha-chroma-transition);
      }

      .header-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        min-width: 0; /* Prevents overflow truncation issues */
      }

      .room-name {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.3px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .room-label {
        font-size: 11px;
        font-weight: 500;
        opacity: 0.85;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .room-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        transition: var(--ha-chroma-transition);
        flex-shrink: 0;
      }

      .room-icon-container ha-icon {
        --mdc-icon-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Flat Style Scoped Header styling */
      .chroma-card.flat .card-header {
        background: var(--room-header-bg, var(--primary-color));
        color: var(--room-header-text, #ffffff);
      }
      .chroma-card.flat .room-icon-container {
        background: rgba(255, 255, 255, 0.2);
        color: var(--room-header-text, #ffffff);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      /* Glassmorphism Style Scoped Header styling */
      .chroma-card.glassmorphism .card-header {
        background: color-mix(in srgb, var(--room-header-bg) 18%, transparent);
        border-bottom: 1px solid var(--ha-chroma-glass-border);
        color: var(--room-header-text, var(--primary-text-color));
      }
      .chroma-card.glassmorphism .room-icon-container {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: var(--room-icon-color, var(--primary-text-color));
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      /* Minimal Style Scoped Header styling */
      .chroma-card.minimal .card-header {
        background: transparent;
        color: var(--room-header-text, var(--primary-text-color));
      }
      .chroma-card.minimal .room-icon-container {
        background: color-mix(in srgb, var(--room-icon-color) 12%, transparent);
        color: var(--room-icon-color, var(--primary-text-color));
      }

      /* Hover interaction */
      .chroma-card:hover .room-icon-container {
        transform: scale(1.05);
      }

      /* Responsive layout for mobile (e.g. 2 columns) */
      @media (max-width: 768px) {
        .card-header {
          padding: 10px;
        }
        .room-name {
          font-size: 14px;
        }
        .room-label {
          font-size: 10px;
        }
        .room-icon-container {
          width: 36px;
          height: 36px;
          border-radius: 9px;
        }
        .room-icon-container ha-icon {
          --mdc-icon-size: 18px;
        }
      }
    `
  ];

  constructor() {
    super();
    this._hass = null;
  }

  // Set configuration
  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this._config = config;
    this._vars = config.variables || config;
    
    // Parse badges from configuration
    this._badges = this._parseBadges(config);
  }

  // Optimize updates: only rerender if relevant entity states changed
  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;

    if (!oldHass) {
      this.requestUpdate();
      return;
    }

    if (this._hasEntityChanged(oldHass, hass)) {
      this.requestUpdate();
    }
  }

  get hass() {
    return this._hass;
  }

  // Helper: check if any configured entity state changed
  _hasEntityChanged(oldHass, newHass) {
    if (!this._config) return false;

    const entities = [];

    // Main sensors
    if (this._vars.temp_sensor) entities.push(this._vars.temp_sensor);
    if (this._vars.hum_sensor) entities.push(this._vars.hum_sensor);

    // Badges
    if (this._badges) {
      for (const badge of this._badges) {
        if (badge.entity) entities.push(badge.entity);
      }
    }

    for (const entity of entities) {
      if (oldHass.states[entity] !== newHass.states[entity]) {
        return true;
      }
    }

    return false;
  }

  // Extract badges from both modern array format and legacy variables format
  _parseBadges(config) {
    const badges = [];

    // Modern configuration array: badges: [{ entity, icon, on_bg, ... }]
    if (config.badges && Array.isArray(config.badges)) {
      return config.badges;
    }

    // Support legacy variables syntax (badge_1_entity up to badge_10_entity)
    const vars = config.variables || config;
    for (let i = 1; i <= 10; i++) {
      const entity = vars[`badge_${i}_entity`] || config[`badge_${i}_entity`];
      const icon = vars[`badge_${i}_icon`] || config[`badge_${i}_icon`];
      
      if (entity) {
        badges.push({
          entity,
          icon: icon || '',
          on_bg: vars[`badge_${i}_on_bg`] || config[`badge_${i}_on_bg`] || '#FFC107',
          state_equals: vars[`badge_${i}_state_equals`] !== undefined ? vars[`badge_${i}_state_equals`] : config[`badge_${i}_state_equals`],
          state_not_in: vars[`badge_${i}_state_not_in`] || config[`badge_${i}_state_not_in`] || ['off', 'unavailable', 'unknown']
        });
      }
    }

    return badges;
  }

  // Helper: get the icon for a badge, falling back to linked entity icon or domain-based default
  _getBadgeIcon(badge) {
    if (badge.icon) return badge.icon;
    if (!this.hass || !badge.entity) return 'mdi:help-circle';
    const stateObj = this.hass.states[badge.entity];
    if (stateObj) {
      if (stateObj.attributes && stateObj.attributes.icon) {
        return stateObj.attributes.icon;
      }
      // Domain-based fallback
      const domain = badge.entity.split('.')[0];
      const domainIcons = {
        light: 'mdi:lightbulb',
        switch: 'mdi:toggle-switch',
        sensor: 'mdi:eye',
        binary_sensor: 'mdi:checkbox-marked-circle',
        media_player: 'mdi:play-pause',
        climate: 'mdi:thermostat',
        fan: 'mdi:fan',
        lock: 'mdi:lock',
        cover: 'mdi:window-shutter',
        automation: 'mdi:robot',
        input_boolean: 'mdi:toggle-switch',
        group: 'mdi:google-circles-communities',
        scene: 'mdi:palette',
        script: 'mdi:script-text',
        vacuum: 'mdi:robot-vacuum',
        alarm_control_panel: 'mdi:shield',
        person: 'mdi:account',
        device_tracker: 'mdi:map-marker',
        sun: 'mdi:white-balance-sunny',
        weather: 'mdi:weather-cloudy',
      };
      return domainIcons[domain] || 'mdi:help-circle';
    }
    return 'mdi:help-circle';
  }

  // Check if a badge is active based on state
  _isBadgeActive(badge) {
    if (!this.hass || !badge.entity) return false;
    const stateObj = this.hass.states[badge.entity];
    if (!stateObj) return false;

    const state = stateObj.state;

    // Strict equality check if specified
    if (badge.state_equals !== null && badge.state_equals !== undefined && badge.state_equals !== '') {
      return state === String(badge.state_equals);
    }

    // Default "not in" state exclusion list
    const notIn = badge.state_not_in || ['off', 'unavailable', 'unknown'];
    const notInStrings = notIn.map(val => String(val));
    return state && !notInStrings.includes(state);
  }

  // Get active properties for a badge (state, color, icon)
  _getBadgeProperties(badge) {
    if (!this.hass || !badge.entity) {
      return { isActive: false, color: '#FFC107', icon: badge.icon || 'mdi:help-circle' };
    }

    const stateObj = this.hass.states[badge.entity];
    const state = stateObj ? stateObj.state : '';

    // Check rules first
    if (badge.rules && Array.isArray(badge.rules) && badge.rules.length > 0) {
      const matchingRule = badge.rules.find(rule => String(rule.state) === state);
      if (matchingRule) {
        return {
          isActive: true,
          color: matchingRule.color || badge.on_bg || '#FFC107',
          icon: matchingRule.icon || badge.icon || this._getBadgeIcon(badge)
        };
      }
      return {
        isActive: false,
        color: '#FFC107',
        icon: badge.icon || this._getBadgeIcon(badge)
      };
    }

    // Default binary active/inactive logic
    const isActive = this._isBadgeActive(badge);
    return {
      isActive,
      color: badge.on_bg || '#FFC107',
      icon: badge.icon || this._getBadgeIcon(badge)
    };
  }

  // Generate transparent version of hex color for drop-shadow glow effect
  _hexToRgba(hex, opacity = 0.3) {
    if (!hex || typeof hex !== 'string') return `rgba(0,0,0,${opacity})`;
    
    // Remove leading hash
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6 && cleanHex.length !== 3) {
      return hex; // Fallback if already rgb/rgba or keyword
    }

    let r, g, b;
    if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    } else {
      r = parseInt(cleanHex.substring(0, 1) + cleanHex.substring(0, 1), 16);
      g = parseInt(cleanHex.substring(1, 2) + cleanHex.substring(1, 2), 16);
      b = parseInt(cleanHex.substring(2, 3) + cleanHex.substring(2, 3), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle click on card
  _handleTap() {
    if (!this._config) return;
    
    const event = new CustomEvent("hass-action", {
      detail: {
        config: this._config,
        action: "tap",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  getCardSize() {
    return 1;
  }

  static getStubConfig(hass, entities, entityIds) {
    const tempSensor = entityIds.find(id => id.startsWith('sensor.') && id.includes('temp')) || 'sensor.living_temperature';
    const humSensor = entityIds.find(id => id.startsWith('sensor.') && id.includes('hum')) || 'sensor.living_humidity';
    const lightEntity = entityIds.find(id => id.startsWith('light.')) || 'light.living_lights';

    return {
      type: 'custom:room-card',
      room_name: 'Living Room',
      room_icon: 'mdi:sofa',
      room_color: '#87a38d',
      temp_sensor: tempSensor,
      hum_sensor: humSensor,
      badges: [
        {
          entity: lightEntity,
          icon: 'mdi:lightbulb',
          on_bg: '#FFC107',
          state_not_in: ['off', 'unavailable', 'unknown']
        }
      ]
    };
  }

  // Helper: calculate relative luminance to decide whether to use white or dark text in the header
  _getContrastColor(hex) {
    if (!hex || typeof hex !== 'string') return '#ffffff';
    
    // Check if it's a CSS variable
    if (hex.startsWith('var(')) {
      return '#ffffff'; // Fallback to white for CSS variables
    }

    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6 && cleanHex.length !== 3) {
      return '#ffffff';
    }

    let r, g, b;
    if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    } else {
      r = parseInt(cleanHex.substring(0, 1) + cleanHex.substring(0, 1), 16);
      g = parseInt(cleanHex.substring(1, 2) + cleanHex.substring(1, 2), 16);
      b = parseInt(cleanHex.substring(2, 3) + cleanHex.substring(2, 3), 16);
    }

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#1c1c1c' : '#ffffff';
  }

  // Handle click on badge
  _handleBadgeTap(ev, badge) {
    ev.stopPropagation(); // Prevent card tap action
    if (!this.hass || !badge.entity) return;

    // Support configurable click action, default is more-info
    const tapAction = badge.tap_action || { action: 'more-info' };
    if (tapAction.action === 'none') return;

    const event = new CustomEvent("hass-action", {
      detail: {
        config: {
          entity: badge.entity,
          tap_action: tapAction,
        },
        action: "tap",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const roomName = this._vars.room_name || 'Room';
    const roomIcon = this._vars.room_icon || 'mdi:help-circle';
    const roomColor = this._vars.room_color || 'var(--primary-color)';
    const cardStyle = this._vars.card_style || 'flat';

    // Choose contrasting header colors or custom text_color if configured
    const headerTextColor = this._vars.text_color || this._getContrastColor(roomColor);
    const iconContainerBg = headerTextColor === '#1c1c1c' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.2)';

    // Temp and humidity processing
    const tempSensor = this._vars.temp_sensor;
    const humSensor = this._vars.hum_sensor;

    const tState = tempSensor && this.hass.states[tempSensor];
    const hState = humSensor && this.hass.states[humSensor];

    const isAvailable = (stateObj) => 
      stateObj && stateObj.state !== undefined && stateObj.state !== null && stateObj.state !== 'unknown' && stateObj.state !== 'unavailable';

    let tStr = isAvailable(tState) ? Number(tState.state).toFixed(1) + '°C' : '';
    let hStr = isAvailable(hState) ? Math.round(Number(hState.state)) + '%' : '';
    let labelStr = (tStr && hStr) ? `${tStr} · ${hStr}` : (tStr || hStr || '');

    // Separate badges into active and inactive lists using the rule-based logic
    const activeBadges = [];
    const inactiveBadges = [];

    for (const badge of (this._badges || [])) {
      if (!badge.entity) continue;
      const props = this._getBadgeProperties(badge);
      if (props.isActive) {
        activeBadges.push({ ...badge, ...props });
      } else {
        inactiveBadges.push({ ...badge, ...props });
      }
    }

    const renderedBadges = [...activeBadges, ...inactiveBadges];

    return html`
      <div 
        class="chroma-card ${cardStyle} interactive" 
        @click="${this._handleTap}"
      >
        <!-- Header Info Layout -->
        <div 
          class="card-header" 
          style="--room-header-bg: ${roomColor}; --room-header-text: ${headerTextColor};"
        >
          <div class="header-left">
            <div class="room-name">${roomName}</div>
            ${labelStr ? html`<div class="room-label">${labelStr}</div>` : ''}
          </div>
          <div class="header-right">
            <div 
              class="room-icon-container"
              style="--room-icon-color: ${roomColor};"
            >
              <ha-icon .icon="${roomIcon}"></ha-icon>
            </div>
          </div>
        </div>

        <!-- Badges Row (Shows all valid sorted badges, with overflow hidden by CSS) -->
        ${renderedBadges.length > 0 ? html`
          <div class="badge-grid">
            ${renderedBadges.map(badge => {
              const activeColor = badge.color || '#FFC107';
              const activeGlow = this._hexToRgba(activeColor, 0.4);
              const badgeClass = badge.isActive ? 'badge-item active' : 'badge-item inactive';
              const badgeStyle = badge.isActive 
                ? `--badge-active-color: ${activeColor}; --badge-active-glow: ${activeGlow};` 
                : '';
              
              // Resolve friendly name for tooltip
              const stateObj = this.hass.states[badge.entity];
              const friendlyName = stateObj ? (stateObj.attributes.friendly_name || badge.entity) : badge.entity;

              return html`
                <div 
                  class="${badgeClass}" 
                  style="${badgeStyle}"
                  title="${friendlyName} - ${badge.isActive ? 'Active' : 'Inactive'}"
                  @click="${(ev) => this._handleBadgeTap(ev, badge)}"
                >
                  <ha-icon .icon="${badge.icon}"></ha-icon>
                </div>
              `;
            })}
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('room-card', RoomCard);
export { RoomCard };
