import { LitElement, html, css } from 'lit';
import { sharedStyles } from './shared-styles.js';
import './temp-monitoring-card-editor.js';

class TempMonitoringCard extends LitElement {
  static getConfigElement() {
    return document.createElement('temp-monitoring-card-editor');
  }

  static properties = {
    hass: { type: Object },
    _config: { type: Object },
  };

  static styles = [
    sharedStyles,
    css`
      /* Header Info Layout */
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
        min-width: 0;
      }

      .card-title {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: -0.3px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .card-subtitle {
        font-size: 11px;
        font-weight: 500;
        opacity: 0.85;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .card-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        transition: var(--ha-chroma-transition);
        flex-shrink: 0;
      }

      .card-icon-container ha-icon {
        --mdc-icon-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Flat Style Scoped Header styling */
      .chroma-card.flat .card-header {
        background: var(--header-bg, var(--primary-color));
        color: var(--header-text, #ffffff);
      }
      .chroma-card.flat .card-icon-container {
        background: rgba(255, 255, 255, 0.2);
        color: var(--header-text, #ffffff);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      /* Glassmorphism Style Scoped Header styling */
      .chroma-card.glassmorphism .card-header {
        background: color-mix(in srgb, var(--header-bg) 18%, transparent);
        border-bottom: 1px solid var(--ha-chroma-glass-border);
        color: var(--header-text, var(--primary-text-color));
      }
      .chroma-card.glassmorphism .card-icon-container {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: var(--accent-color, var(--primary-text-color));
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      /* Minimal Style Scoped Header styling */
      .chroma-card.minimal .card-header {
        background: transparent;
        color: var(--header-text, var(--primary-text-color));
      }
      .chroma-card.minimal .card-icon-container {
        background: color-mix(in srgb, var(--accent-color) 12%, transparent);
        color: var(--accent-color, var(--primary-text-color));
      }

      .chroma-card:hover .card-icon-container {
        transform: scale(1.05);
      }

      /* Climate content container */
      .climate-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 12px;
        box-sizing: border-box;
        background: rgba(127, 127, 127, 0.02);
      }

      .climate-pill:only-child {
        grid-column: span 2;
      }

      /* Individual Climate Pill */
      .climate-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 14px;
        background: var(--pill-bg, rgba(127, 127, 127, 0.04));
        border: 1px solid var(--pill-border, rgba(127, 127, 127, 0.1));
        transition: var(--ha-chroma-transition);
        cursor: pointer;
        min-width: 0;
        position: relative;
      }

      .climate-pill:hover {
        transform: translateY(-2px);
        background: var(--pill-hover-bg, rgba(127, 127, 127, 0.08));
        border-color: var(--pill-color-alpha, rgba(127, 127, 127, 0.3));
        box-shadow: 0 8px 20px var(--pill-glow-color, rgba(0, 0, 0, 0.1));
      }

      .pill-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: var(--pill-color-alpha, rgba(127, 127, 127, 0.1));
        color: var(--pill-color, var(--secondary-text-color));
        transition: var(--ha-chroma-transition);
        flex-shrink: 0;
      }

      .pill-icon-container ha-icon {
        --mdc-icon-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .climate-pill:hover .pill-icon-container {
        transform: scale(1.08);
        background: var(--pill-color);
        color: #ffffff;
      }

      .pill-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
      }

      .pill-value {
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2;
        color: var(--ha-chroma-primary-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pill-label {
        font-size: 10px;
        font-weight: 500;
        color: var(--ha-chroma-secondary-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 1px;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .header-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        color: var(--header-text, #ffffff);
        cursor: pointer;
        transition: var(--ha-chroma-transition);
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .header-badge ha-icon {
        --mdc-icon-size: 16px;
      }

      .header-badge:hover {
        transform: scale(1.1);
      }

      .header-badge.active {
        background: var(--badge-active-color, var(--primary-color));
        color: #ffffff;
        box-shadow: 0 4px 10px var(--badge-glow-color, rgba(0, 0, 0, 0.15));
        border-color: rgba(255, 255, 255, 0.2);
      }

      .chroma-card.glassmorphism .header-badge {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--primary-text-color);
      }

      .chroma-card.glassmorphism .header-badge.active {
        background: var(--badge-active-color, var(--primary-color));
        color: #ffffff;
        box-shadow: 0 0 10px var(--badge-glow-color, rgba(255, 255, 255, 0.15));
      }

      .chroma-card.minimal .header-badge {
        background: rgba(127, 127, 127, 0.08);
        border: 1px solid rgba(127, 127, 127, 0.12);
        color: var(--primary-text-color);
      }

      .chroma-card.minimal .header-badge.active {
        background: var(--badge-active-color, var(--primary-color));
        color: #ffffff;
        box-shadow: 0 4px 10px var(--badge-glow-color, rgba(0, 0, 0, 0.1));
      }

      /* Responsive layout for mobile */
      @media (max-width: 768px) {
        .card-header {
          padding: 10px;
        }
        .card-title {
          font-size: 14px;
        }
        .card-subtitle {
          font-size: 10px;
        }
        .card-icon-container {
          width: 36px;
          height: 36px;
          border-radius: 9px;
        }
        .card-icon-container ha-icon {
          --mdc-icon-size: 18px;
        }
        .climate-grid {
          gap: 8px;
          padding: 10px;
        }
        .climate-pill {
          padding: 8px 10px;
          border-radius: 12px;
          gap: 8px;
        }
        .pill-icon-container {
          width: 28px;
          height: 28px;
          border-radius: 7px;
        }
        .pill-icon-container ha-icon {
          --mdc-icon-size: 14px;
        }
        .pill-value {
          font-size: 14px;
        }
        .pill-label {
          font-size: 9px;
        }
      }
    `
  ];

  constructor() {
    super();
    this._hass = null;
  }

  // Set card configuration
  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this._config = config;
    this._vars = config.variables || config;
    this._sensors = this._parseSensors(config);
    this._badges = this._parseBadges(config);
  }

  // Optimize state updates based on specific entity states
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

  _hasEntityChanged(oldHass, newHass) {
    if (!this._sensors) return false;

    for (const sensor of this._sensors) {
      if (sensor.entity) {
        if (oldHass.states[sensor.entity] !== newHass.states[sensor.entity]) {
          return true;
        }
      }
    }

    if (this._badges) {
      for (const badge of this._badges) {
        if (badge.entity && oldHass.states[badge.entity] !== newHass.states[badge.entity]) {
          return true;
        }
      }
    }

    return false;
  }

  // Parse sensors with backwards compatibility migration
  _parseSensors(config) {
    const vars = config.variables || config;
    
    // Modern format: explicit sensors list
    if (vars.sensors && Array.isArray(vars.sensors)) {
      return vars.sensors;
    }

    // Legacy migration for temp_sensor & hum_sensor
    const sensors = [];
    const tempSensor = vars.temp_sensor;
    if (tempSensor) {
      sensors.push({
        entity: tempSensor,
        label: vars.temp_label || 'Temperature',
        icon: vars.temp_icon || 'mdi:thermometer',
        color: vars.temp_color,
        tap_action: vars.temp_tap_action || { action: 'more-info' },
        rules: [
          { below: 19, color: '#2196F3', icon: 'mdi:thermometer-low' },
          { above: 19, below: 24, color: '#4CAF50', icon: 'mdi:thermometer' },
          { above: 24, below: 28, color: '#FF9800', icon: 'mdi:thermometer' },
          { above: 28, color: '#F44336', icon: 'mdi:thermometer-high' }
        ]
      });
    }

    const humSensor = vars.hum_sensor;
    if (humSensor) {
      sensors.push({
        entity: humSensor,
        label: vars.hum_label || 'Humidity',
        icon: vars.hum_icon || 'mdi:water-percent',
        color: vars.hum_color,
        tap_action: vars.hum_tap_action || { action: 'more-info' },
        rules: [
          { below: 35, color: '#FFB300', icon: 'mdi:water-percent' },
          { above: 35, below: 60, color: '#009688', icon: 'mdi:water-percent' },
          { above: 60, color: '#0288D1', icon: 'mdi:water-percent' }
        ]
      });
    }

    return sensors;
  }

  // Helper: Get contrast text color relative to background hex
  _getContrastColor(hex) {
    if (!hex || typeof hex !== 'string') return '#ffffff';
    if (hex.startsWith('var(')) return '#ffffff';

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

  // Helper: Hex color to RGBA string
  _hexToRgba(hex, opacity = 0.3) {
    if (!hex || typeof hex !== 'string') return `rgba(127,127,127,${opacity})`;
    if (hex.startsWith('var(')) return `rgba(127,127,127,${opacity})`;

    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6 && cleanHex.length !== 3) {
      return hex;
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

  // Evaluate range rules and state overrides
  _evaluateRules(sensor, value) {
    const defaultColor = sensor.color || 'var(--primary-color)';

    if (value === undefined || value === null || value === '' || value === 'unknown' || value === 'unavailable') {
      return { color: defaultColor, icon: null };
    }

    if (sensor.rules && Array.isArray(sensor.rules)) {
      for (const rule of sensor.rules) {
        let isMatch = true;

        // 1. Literal string state match (higher priority for binary/string states)
        if (rule.state !== undefined && rule.state !== null && rule.state !== '') {
          if (String(value).toLowerCase() === String(rule.state).toLowerCase()) {
            return {
              color: rule.color || defaultColor,
              icon: rule.icon || null
            };
          }
          continue; // Skip numeric checks if state was specified but did not match
        }

        // 2. Numeric range checks
        const val = Number(value);
        if (!isNaN(val)) {
          if (rule.below !== undefined && rule.below !== null && rule.below !== '') {
            if (val >= Number(rule.below)) {
              isMatch = false;
            }
          }
          if (rule.above !== undefined && rule.above !== null && rule.above !== '') {
            if (val <= Number(rule.above)) {
              isMatch = false;
            }
          }

          // A rule needs to have at least one numeric limit configured to match as a range
          const hasLimit = (rule.below !== undefined && rule.below !== null && rule.below !== '') ||
                           (rule.above !== undefined && rule.above !== null && rule.above !== '');

          if (isMatch && hasLimit) {
            return {
              color: rule.color || defaultColor,
              icon: rule.icon || null
            };
          }
        }
      }
    }

    return { color: defaultColor, icon: null };
  }

  // Helper: Retrieve the sensor icon, inheriting from config -> HA entity customization -> domain fallbacks
  _getSensorIcon(sensor, activeRuleIcon) {
    if (activeRuleIcon) return activeRuleIcon;
    if (sensor.icon) return sensor.icon;

    if (this.hass && sensor.entity) {
      const stateObj = this.hass.states[sensor.entity];
      if (stateObj && stateObj.attributes && stateObj.attributes.icon) {
        return stateObj.attributes.icon;
      }
      
      const domain = sensor.entity.split('.')[0];
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

      if (domain === 'sensor') {
        const entityId = sensor.entity.toLowerCase();
        if (entityId.includes('temp')) return 'mdi:thermometer';
        if (entityId.includes('humid') || entityId.includes('moist')) return 'mdi:water-percent';
        if (entityId.includes('co2') || entityId.includes('carbon_dioxide')) return 'mdi:molecule-co2';
        if (entityId.includes('pm10')) return 'mdi:blur';
        if (entityId.includes('pm2') || entityId.includes('pm25')) return 'mdi:blur';
        if (entityId.includes('aqi') || entityId.includes('air_quality')) return 'mdi:air-filter';
        if (entityId.includes('power') || entityId.includes('energy')) return 'mdi:flash';
        if (entityId.includes('battery')) return 'mdi:battery';
      }
      return domainIcons[domain] || 'mdi:eye';
    }
    return 'mdi:help-circle';
  }

  _isBadgeActive(entityId) {
    if (!this.hass || !entityId) return false;
    const stateObj = this.hass.states[entityId];
    if (!stateObj) return false;
    const state = stateObj.state.toLowerCase();
    return state !== 'off' && state !== 'unavailable' && state !== 'unknown' && state !== 'idle';
  }

  _getBadgeIcon(entityId, overrideIcon) {
    if (overrideIcon) return overrideIcon;
    if (!this.hass || !entityId) return 'mdi:checkbox-marked-circle';
    const stateObj = this.hass.states[entityId];
    if (stateObj && stateObj.attributes && stateObj.attributes.icon) {
      return stateObj.attributes.icon;
    }
    const domain = entityId.split('.')[0];
    const fallbacks = {
      binary_sensor: 'mdi:checkbox-marked-circle',
      switch: 'mdi:flash',
      climate: 'mdi:thermostat',
      light: 'mdi:lightbulb',
    };
    return fallbacks[domain] || 'mdi:checkbox-marked-circle';
  }

  _handleBadgeTap(ev, entityId) {
    ev.stopPropagation();
    if (!this.hass || !entityId) return;

    const event = new CustomEvent('hass-action', {
      detail: {
        config: {
          entity: entityId,
          tap_action: { action: 'more-info' },
        },
        action: 'tap',
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _parseBadges(config) {
    const vars = config.variables || config;
    if (vars.badges && Array.isArray(vars.badges)) {
      return vars.badges;
    }

    const badges = [];
    if (vars.badge_1_entity) {
      badges.push({
        entity: vars.badge_1_entity,
        icon: vars.badge_1_icon || '',
        active_color: vars.badge_1_active_color || '',
      });
    }
    if (vars.badge_2_entity) {
      badges.push({
        entity: vars.badge_2_entity,
        icon: vars.badge_2_icon || '',
        active_color: vars.badge_2_active_color || '',
      });
    }
    return badges;
  }

  _renderHeaderBadge(badge) {
    if (!badge || !badge.entity) return html``;
    const entityId = badge.entity;
    const isActive = this._isBadgeActive(entityId);
    const icon = this._getBadgeIcon(entityId, badge.icon);
    const color = badge.active_color || 'var(--primary-color)';
    const glow = this._hexToRgba(color, 0.4);

    const style = isActive 
      ? `--badge-active-color: ${color}; --badge-glow-color: ${glow};` 
      : '';

    const stateObj = this.hass.states[entityId];
    const friendlyName = stateObj ? (stateObj.attributes.friendly_name || entityId) : entityId;
    const stateStr = stateObj ? stateObj.state : '';

    return html`
      <div 
        class="header-badge ${isActive ? 'active' : ''}" 
        style="${style}"
        title="${friendlyName} - ${stateStr}"
        @click="${(ev) => this._handleBadgeTap(ev, entityId)}"
      >
        <ha-icon .icon="${icon}"></ha-icon>
      </div>
    `;
  }

  // Tapping individual climate metric sections
  _handleSensorTap(ev, entity, tapActionConfig) {
    ev.stopPropagation();
    if (!this.hass || !entity) return;

    const tapAction = tapActionConfig || { action: 'more-info' };
    if (tapAction.action === 'none') return;

    const event = new CustomEvent('hass-action', {
      detail: {
        config: {
          entity: entity,
          tap_action: tapAction,
        },
        action: 'tap',
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  // Tapping the card header
  _handleHeaderTap() {
    if (!this._config) return;

    const tapAction = this._config.tap_action || { action: 'none' };
    if (tapAction.action === 'none') return;

    const event = new CustomEvent('hass-action', {
      detail: {
        config: this._config,
        action: 'tap',
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
    const tempSensor = entityIds.find(id => id.startsWith('sensor.') && id.includes('temp')) || 'sensor.living_room_temperature';
    const humSensor = entityIds.find(id => id.startsWith('sensor.') && id.includes('hum')) || 'sensor.living_room_humidity';

    return {
      type: 'custom:temp-monitoring-card',
      title: 'Climate Control',
      icon: 'mdi:thermometer',
      accent_color: '#ff5722',
      card_style: 'flat',
      sensors: [
        {
          entity: tempSensor,
          label: 'Temperature',
          icon: 'mdi:thermometer',
          rules: [
            { below: 19, color: '#2196F3', icon: 'mdi:thermometer-low' },
            { above: 19, below: 24, color: '#4CAF50', icon: 'mdi:thermometer' },
            { above: 24, below: 28, color: '#FF9800', icon: 'mdi:thermometer' },
            { above: 28, color: '#F44336', icon: 'mdi:thermometer-high' }
          ]
        },
        {
          entity: humSensor,
          label: 'Humidity',
          icon: 'mdi:water-percent',
          rules: [
            { below: 35, color: '#FFB300', icon: 'mdi:water-percent' },
            { above: 35, below: 60, color: '#009688', icon: 'mdi:water-percent' },
            { above: 60, color: '#0288D1', icon: 'mdi:water-percent' }
          ]
        }
      ]
    };
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const title = this._vars.title || this._vars.room_name || 'Climate';
    const icon = this._vars.icon || this._vars.room_icon || 'mdi:thermometer';
    const accentColor = this._vars.accent_color || this._vars.room_color || 'var(--primary-color)';
    const cardStyle = this._vars.card_style || 'flat';
    const subtitle = this._vars.subtitle || '';

    const headerTextColor = this._vars.text_color || this._getContrastColor(accentColor);

    const isAvailable = (stateObj) =>
      stateObj && stateObj.state !== undefined && stateObj.state !== null && stateObj.state !== 'unknown' && stateObj.state !== 'unavailable';

    const getFormattedValue = (stateObj, fallbackUnit) => {
      if (!isAvailable(stateObj)) return 'N/A';
      const val = stateObj.state;
      const unit = stateObj.attributes?.unit_of_measurement || fallbackUnit;
      if (!isNaN(val) && val !== '') {
        const num = Number(val);
        if (unit.includes('°')) {
          return num.toFixed(1) + unit;
        } else if (unit === '%') {
          return Math.round(num) + unit;
        }
        return num + (unit ? ' ' + unit : '');
      }
      return val + (unit ? ' ' + unit : '');
    };

    return html`
      <div class="chroma-card ${cardStyle} interactive" @click="${this._handleHeaderTap}">
        <!-- Card Header (matching Room Card style) -->
        <div 
          class="card-header" 
          style="--header-bg: ${accentColor}; --header-text: ${headerTextColor};"
        >
          <div class="header-left">
            <div class="card-title">${title}</div>
            ${subtitle ? html`<div class="card-subtitle">${subtitle}</div>` : ''}
          </div>
          <div class="header-right">
            ${(this._badges || []).map(badge => this._renderHeaderBadge(badge))}
            <div 
              class="card-icon-container"
              style="--accent-color: ${accentColor};"
            >
              <ha-icon .icon="${icon}"></ha-icon>
            </div>
          </div>
        </div>

        <!-- Climate Metrics Grid (Bottom) -->
        <div class="climate-grid">
          ${(this._sensors || []).map(sensor => {
            if (!sensor.entity) return html``;
            
            const stateObj = this.hass.states[sensor.entity];
            const stateVal = stateObj ? stateObj.state : null;

            // Determine active rule properties
            const props = this._evaluateRules(sensor, stateVal);

            const activeColor = props.color || 'var(--primary-color)';
            const activeIcon = this._getSensorIcon(sensor, props.icon);

            const colorAlpha = this._hexToRgba(activeColor, 0.15);
            const glowColor = this._hexToRgba(activeColor, 0.25);

            // Determine label
            const label = sensor.label || stateObj?.attributes?.friendly_name || sensor.entity;

            // Determine fallback unit based on device class
            let fallbackUnit = '';
            if (sensor.entity.includes('temp')) fallbackUnit = '°C';
            else if (sensor.entity.includes('humid') || sensor.entity.includes('moist')) fallbackUnit = '%';

            return html`
              <div 
                class="climate-pill" 
                style="--pill-color: ${activeColor}; --pill-color-alpha: ${colorAlpha}; --pill-glow-color: ${glowColor};"
                @click="${(ev) => this._handleSensorTap(ev, sensor.entity, sensor.tap_action)}"
                title="${label}: ${getFormattedValue(stateObj, fallbackUnit)}"
              >
                <div class="pill-icon-container">
                  <ha-icon .icon="${activeIcon}"></ha-icon>
                </div>
                <div class="pill-info">
                  <div class="pill-value">${getFormattedValue(stateObj, fallbackUnit)}</div>
                  <div class="pill-label">${label}</div>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('temp-monitoring-card', TempMonitoringCard);
export { TempMonitoringCard };
