import { LitElement, html, css } from 'lit';

class TempMonitoringCardEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    _config: { type: Object },
    _expandedSensors: { type: Object },
    _expandedRules: { type: Object },
    _expandedBadges: { type: Object },
  };

  constructor() {
    super();
    this._expandedSensors = {};
    this._expandedRules = {};
    this._expandedBadges = {};
  }

  static styles = css`
    :host {
      display: block;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      border-radius: 12px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.03));
      border: 1px solid rgba(127, 127, 127, 0.1);
    }

    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--secondary-text-color, #7f7f7f);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    ha-textfield, ha-entity-picker, ha-icon-picker, ha-select {
      width: 100%;
      display: block;
    }

    /* Native labeled input – matches HA condition editor style */
    .labeled-input {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .labeled-input label {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color, #7f7f7f);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .labeled-input input {
      width: 100%;
      padding: 8px 10px;
      font-size: 13px;
      font-family: inherit;
      color: var(--primary-text-color, #fff);
      background: var(--input-fill-color, rgba(127, 127, 127, 0.1));
      border: 1px solid var(--input-ink-color, rgba(127, 127, 127, 0.25));
      border-radius: 6px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s ease;
    }

    .labeled-input input:focus {
      border-color: var(--primary-color, #2196F3);
    }

    .labeled-input input::placeholder {
      color: var(--secondary-text-color, rgba(127, 127, 127, 0.5));
      font-style: italic;
    }

    .color-picker-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      width: 100%;
    }

    .color-picker-row .labeled-input {
      flex: 1;
    }

    .color-picker-row input[type="color"] {
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      cursor: pointer;
      padding: 0;
      background: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
      transition: transform 0.1s ease-in-out;
      appearance: none;
      -webkit-appearance: none;
      flex-shrink: 0;
    }

    .color-picker-row input[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    .color-picker-row input[type="color"]::-webkit-color-swatch {
      border: none;
      border-radius: 50%;
    }

    .color-picker-row input[type="color"]:hover {
      transform: scale(1.05);
    }

    /* Sensors section styling */
    .sensors-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }

    .sensor-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px;
      border-radius: 12px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.05));
      border: 1px solid rgba(127, 127, 127, 0.15);
      margin-bottom: 8px;
    }

    .sensor-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      font-size: 13px;
      color: var(--secondary-text-color, #7f7f7f);
      border-bottom: 1px solid rgba(127, 127, 127, 0.1);
      padding-bottom: 8px;
    }

    .rules-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 8px;
      padding: 12px;
      border-radius: 8px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.02));
      border: 1px dashed rgba(127, 127, 127, 0.2);
    }

    .rules-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-weight: 700;
      color: var(--secondary-text-color, #7f7f7f);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rule-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      border-radius: 8px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.04));
      border: 1px solid rgba(127, 127, 127, 0.10);
    }

    .rule-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      font-size: 11px;
      color: var(--secondary-text-color, #7f7f7f);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      background: var(--primary-color, #2196F3);
      color: var(--text-primary-color, white);
      transition: opacity 0.2s;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .btn-secondary {
      background: rgba(127, 127, 127, 0.1);
      color: var(--primary-text-color, #ffffff);
      border: 1px solid rgba(127, 127, 127, 0.2);
    }

    .delete-btn {
      cursor: pointer;
      color: var(--error-color, #db4437);
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete-btn:hover {
      opacity: 0.8;
    }

    .clear-color-btn {
      cursor: pointer;
      color: var(--secondary-text-color, #7f7f7f);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      width: 24px;
      height: 24px;
    }

    .clear-color-btn:hover {
      color: var(--error-color, #db4437);
    }
  `;

  setConfig(config) {
    this._config = config;

    // Backward compatibility config migration inside visual editor
    if (config.temp_sensor || config.hum_sensor || config.room_name || config.room_icon || config.room_color || config.badge_1_entity || config.badge_2_entity) {
      const migrated = { ...config };

      if (config.room_name && !config.title) migrated.title = config.room_name;
      if (config.room_icon && !config.icon) migrated.icon = config.room_icon;
      if (config.room_color && !config.accent_color) migrated.accent_color = config.room_color;

      delete migrated.room_name;
      delete migrated.room_icon;
      delete migrated.room_color;

      if (!config.sensors) {
        const sensors = [];
        if (config.temp_sensor) {
          sensors.push({
            entity: config.temp_sensor,
            label: config.temp_label || 'Temperature',
            icon: config.temp_icon || '',
            color: config.temp_color || '',
            rules: [
              { below: '19', color: '#2196F3', icon: 'mdi:thermometer-low' },
              { above: '19', below: '24', color: '#4CAF50', icon: 'mdi:thermometer' },
              { above: '24', below: '28', color: '#FF9800', icon: 'mdi:thermometer' },
              { above: '28', color: '#F44336', icon: 'mdi:thermometer-high' }
            ]
          });
        }
        if (config.hum_sensor) {
          sensors.push({
            entity: config.hum_sensor,
            label: config.hum_label || 'Humidity',
            icon: config.hum_icon || '',
            color: config.hum_color || '',
            rules: [
              { below: '35', color: '#FFB300', icon: 'mdi:water-percent' },
              { above: '35', below: '60', color: '#009688', icon: 'mdi:water-percent' },
              { above: '60', color: '#0288D1', icon: 'mdi:water-percent' }
            ]
          });
        }
        if (sensors.length > 0) {
          migrated.sensors = sensors;
        }
      }

      delete migrated.temp_sensor;
      delete migrated.hum_sensor;
      delete migrated.temp_label;
      delete migrated.hum_label;
      delete migrated.temp_icon;
      delete migrated.hum_icon;
      delete migrated.temp_color;
      delete migrated.hum_color;
      delete migrated.temp_tap_action;
      delete migrated.hum_tap_action;

      if (!config.badges) {
        const badges = [];
        if (config.badge_1_entity) {
          badges.push({
            entity: config.badge_1_entity,
            icon: config.badge_1_icon || '',
            active_color: config.badge_1_active_color || '',
          });
        }
        if (config.badge_2_entity) {
          badges.push({
            entity: config.badge_2_entity,
            icon: config.badge_2_icon || '',
            active_color: config.badge_2_active_color || '',
          });
        }
        if (badges.length > 0) {
          migrated.badges = badges;
        }
      }

      delete migrated.badge_1_entity;
      delete migrated.badge_1_icon;
      delete migrated.badge_1_active_color;
      delete migrated.badge_2_entity;
      delete migrated.badge_2_icon;
      delete migrated.badge_2_active_color;

      this._config = migrated;
      setTimeout(() => this._fireConfigChanged(migrated), 50);
    }
  }

  // Handle standard config field changes
  _valueChanged(ev) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const configValue = target.configValue;

    const newValue = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;
    if (this._config[configValue] === newValue) return;

    const newConfig = { ...this._config };
    if (newValue === '' || newValue === undefined) {
      delete newConfig[configValue];
    } else {
      newConfig[configValue] = newValue;
    }

    this._fireConfigChanged(newConfig);
  }

  // Handle sensor property changes
  _sensorChanged(ev, index, field) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const value = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;

    const sensors = [...(this._config.sensors || [])];
    sensors[index] = { ...sensors[index], [field]: value };

    if (value === '' || value === undefined) {
      delete sensors[index][field];
    }

    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _addSensor() {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    sensors.push({ entity: '', label: '', icon: '', rules: [] });

    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _removeSensor(index) {
    if (!this._config) return;
    const sensors = (this._config.sensors || []).filter((_, i) => i !== index);

    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  // Sensor tap actions
  _sensorActionChanged(ev, index) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const value = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;

    const sensors = [...(this._config.sensors || [])];
    const tapAction = value === 'none' ? { action: 'none' } : { action: value };
    sensors[index] = { ...sensors[index], tap_action: tapAction };

    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  // Range-rule property changes (string based to support typing decimal numbers smoothly)
  _ruleChanged(ev, sensorIndex, ruleIndex, field) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const value = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;

    const sensors = [...(this._config.sensors || [])];
    const rules = [...(sensors[sensorIndex].rules || [])];

    rules[ruleIndex] = { ...rules[ruleIndex], [field]: value };

    if (value === '' || value === undefined) {
      delete rules[ruleIndex][field];
    }

    sensors[sensorIndex] = { ...sensors[sensorIndex], rules };
    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _addRule(sensorIndex) {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    const rules = [...(sensors[sensorIndex].rules || [])];
    rules.push({ below: '', above: '', color: '', icon: '' });

    sensors[sensorIndex] = { ...sensors[sensorIndex], rules };
    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _removeRule(sensorIndex, ruleIndex) {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    const rules = (sensors[sensorIndex].rules || []).filter((_, i) => i !== ruleIndex);

    sensors[sensorIndex] = { ...sensors[sensorIndex], rules };
    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  // Color selection triggers
  _clearSensorColor(index) {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    sensors[index] = { ...sensors[index] };
    delete sensors[index].color;

    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _enableSensorColor(index) {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    sensors[index] = { ...sensors[index], color: '#2196F3' };

    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _clearRuleColor(sensorIndex, ruleIndex) {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    const rules = [...(sensors[sensorIndex].rules || [])];
    rules[ruleIndex] = { ...rules[ruleIndex] };
    delete rules[ruleIndex].color;

    sensors[sensorIndex] = { ...sensors[sensorIndex], rules };
    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _enableRuleColor(sensorIndex, ruleIndex) {
    if (!this._config) return;
    const sensors = [...(this._config.sensors || [])];
    const rules = [...(sensors[sensorIndex].rules || [])];
    rules[ruleIndex] = { ...rules[ruleIndex], color: '#4CAF50' };

    sensors[sensorIndex] = { ...sensors[sensorIndex], rules };
    const newConfig = { ...this._config, sensors };
    this._fireConfigChanged(newConfig);
  }

  _normalizeHex(color, fallback = '#2196F3') {
    if (!color) return fallback;
    if (typeof color !== 'string' || !color.startsWith('#')) return fallback;
    if (color.length === 4) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    return color;
  }

  _fireConfigChanged(newConfig) {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _toggleSensorExpanded(index) {
    const expanded = { ...this._expandedSensors };
    expanded[index] = expanded[index] === false ? true : false;
    this._expandedSensors = expanded;
  }

  _toggleRulesExpanded(index) {
    const expanded = { ...this._expandedRules };
    expanded[index] = expanded[index] === true ? false : true;
    this._expandedRules = expanded;
  }

  _toggleBadgeExpanded(index) {
    const expanded = { ...this._expandedBadges };
    expanded[index] = expanded[index] === false ? true : false;
    this._expandedBadges = expanded;
  }

  _badgeChanged(ev, index, field) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const value = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;

    const badges = [...(this._config.badges || [])];
    badges[index] = { ...badges[index], [field]: value };

    if (value === '' || value === undefined) {
      delete badges[index][field];
    }

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  _addBadge() {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    badges.push({ entity: '', icon: '', active_color: '' });

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  _removeBadge(index) {
    if (!this._config) return;
    const badges = (this._config.badges || []).filter((_, i) => i !== index);

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  _clearBadgeColor(index) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    badges[index] = { ...badges[index] };
    delete badges[index].active_color;

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  _enableBadgeColor(index) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    badges[index] = { ...badges[index], active_color: '#FFC107' };

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const sensors = this._config.sensors || [];

    return html`
      <div class="form-container">
        <!-- General Configuration -->
        <div class="section">
          <div class="section-title">General Settings</div>
          <div class="row">
            <div class="labeled-input">
              <label>Card Name</label>
              <input
                type="text"
                .value="${this._config.title || ''}"
                .configValue="${'title'}"
                @input="${this._valueChanged}"
                placeholder="e.g., Living Room Climate"
              />
            </div>
            <ha-icon-picker
              label="Card Icon"
              .hass="${this.hass}"
              .value="${this._config.icon || ''}"
              .configValue="${'icon'}"
              @value-changed="${this._valueChanged}"
            ></ha-icon-picker>
          </div>
          <div class="row">
            <ha-select
              label="Card Style"
              .value="${this._config.card_style || 'flat'}"
              .configValue="${'card_style'}"
              @change="${this._valueChanged}"
              fixedMenuPosition
              naturalMenuWidth
            >
              <ha-list-item value="flat">Flat Accent Banner</ha-list-item>
              <ha-list-item value="glassmorphism">Frosted Glassmorphism</ha-list-item>
              <ha-list-item value="minimal">Minimal Borderless</ha-list-item>
            </ha-select>
            <div class="color-picker-row">
              <div class="labeled-input">
                <label>Accent Color</label>
                <input
                  type="text"
                  .value="${this._config.accent_color || ''}"
                  .configValue="${'accent_color'}"
                  @input="${this._valueChanged}"
                  placeholder="#2196F3"
                />
              </div>
              <input
                type="color"
                .value="${this._normalizeHex(this._config.accent_color || '#2196F3', '#2196F3')}"
                .configValue="${'accent_color'}"
                @input="${this._valueChanged}"
              />
            </div>
          </div>
          <div class="row">
            <div class="color-picker-row">
              <div class="labeled-input">
                <label>Text Color (Optional)</label>
                <input
                  type="text"
                  .value="${this._config.text_color || ''}"
                  .configValue="${'text_color'}"
                  @input="${this._valueChanged}"
                  placeholder="Defaults by contrast"
                />
              </div>
              <input
                type="color"
                .value="${this._normalizeHex(this._config.text_color || '#ffffff', '#ffffff')}"
                .configValue="${'text_color'}"
                @input="${this._valueChanged}"
              />
            </div>
          </div>
        </div>

        <!-- Header Badges Section -->
        <div class="section">
          <div class="sensors-header">
            <div class="section-title">Header Badges (Optional)</div>
            <button class="btn btn-secondary" @click="${this._addBadge}">
              + Add Badge
            </button>
          </div>

          ${(this._config.badges || []).map((badge, badgeIndex) => {
            const isBadgeExpanded = this._expandedBadges[badgeIndex] !== false;
            return html`
              <div class="sensor-card">
                <div 
                  class="sensor-card-header" 
                  @click="${() => this._toggleBadgeExpanded(badgeIndex)}" 
                  style="cursor: pointer; user-select: none;"
                >
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <ha-icon 
                      icon="mdi:chevron-down" 
                      style="transform: ${isBadgeExpanded ? 'none' : 'rotate(-90deg)'}; transition: transform 0.2s ease; --mdc-icon-size: 20px;"
                    ></ha-icon>
                    <span>Badge #${badgeIndex + 1} (${badge.icon || badge.entity || 'New'})</span>
                  </div>
                  <span class="delete-btn" @click="${(ev) => { ev.stopPropagation(); this._removeBadge(badgeIndex); }}" title="Delete Badge">
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </span>
                </div>

                ${isBadgeExpanded ? html`
                  <!-- Badge Entity -->
                  <ha-entity-picker
                    .hass="${this.hass}"
                    include-domains='["binary_sensor","switch","climate","input_boolean","light"]'
                    label="Badge Entity"
                    .value="${badge.entity || ''}"
                    @value-changed="${(ev) => this._badgeChanged(ev, badgeIndex, 'entity')}"
                  ></ha-entity-picker>

                  <div class="row" style="margin-top: 8px;">
                    <!-- Icon Picker -->
                    <ha-icon-picker
                      label="Icon (Optional)"
                      .hass="${this.hass}"
                      .value="${badge.icon || ''}"
                      @value-changed="${(ev) => this._badgeChanged(ev, badgeIndex, 'icon')}"
                    ></ha-icon-picker>

                    <!-- Active Color -->
                    <div class="color-picker-row">
                      <div class="labeled-input">
                        <label>Active Color (Hex)</label>
                        <input
                          type="text"
                          .value="${badge.active_color || ''}"
                          @input="${(ev) => this._badgeChanged(ev, badgeIndex, 'active_color')}"
                          placeholder="#FFC107"
                        />
                      </div>
                      ${badge.active_color ? html`
                        <input
                          type="color"
                          .value="${this._normalizeHex(badge.active_color, '#FFC107')}"
                          @input="${(ev) => this._badgeChanged(ev, badgeIndex, 'active_color')}"
                        />
                        <span 
                          class="clear-color-btn"
                          @click="${() => this._clearBadgeColor(badgeIndex)}"
                          title="Clear Color"
                        >
                          <ha-icon icon="mdi:palette-off"></ha-icon>
                        </span>
                      ` : html`
                        <span 
                          class="clear-color-btn"
                          @click="${() => this._enableBadgeColor(badgeIndex)}"
                          title="Define Color"
                        >
                          <ha-icon icon="mdi:palette"></ha-icon>
                        </span>
                      `}
                    </div>
                  </div>
                ` : html``}
              </div>
            `;
          })}
        </div>

        <!-- Sensors Section -->
        <div class="section">
          <div class="sensors-header">
            <div class="section-title">Sensors</div>
            <button class="btn btn-secondary" @click="${this._addSensor}">
              + Add Sensor
            </button>
          </div>

          ${sensors.map((sensor, index) => {
            const isSensorExpanded = this._expandedSensors[index] !== false;
            const isRulesExpanded = this._expandedRules[index] === true;
            return html`
              <div class="sensor-card">
                <div 
                  class="sensor-card-header" 
                  @click="${() => this._toggleSensorExpanded(index)}" 
                  style="cursor: pointer; user-select: none;"
                >
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <ha-icon 
                      icon="mdi:chevron-down" 
                      style="transform: ${isSensorExpanded ? 'none' : 'rotate(-90deg)'}; transition: transform 0.2s ease; --mdc-icon-size: 20px;"
                    ></ha-icon>
                    <span>Sensor #${index + 1} (${sensor.label || sensor.entity || 'New'})</span>
                  </div>
                  <span class="delete-btn" @click="${(ev) => { ev.stopPropagation(); this._removeSensor(index); }}" title="Delete Sensor">
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </span>
                </div>

                ${isSensorExpanded ? html`
                  <!-- Sensor Entity -->
                  <ha-entity-picker
                    .hass="${this.hass}"
                    include-domains='["sensor"]'
                    label="Sensor Entity"
                    .value="${sensor.entity || ''}"
                    @value-changed="${(ev) => this._sensorChanged(ev, index, 'entity')}"
                  ></ha-entity-picker>

                  <div class="row">
                    <!-- Custom Label -->
                    <div class="labeled-input">
                      <label>Label (Optional)</label>
                      <input
                        type="text"
                        .value="${sensor.label || ''}"
                        @input="${(ev) => this._sensorChanged(ev, index, 'label')}"
                        placeholder="Defaults to friendly name"
                      />
                    </div>

                    <!-- Icon Picker -->
                    <ha-icon-picker
                      label="Icon (Optional)"
                      .hass="${this.hass}"
                      .value="${sensor.icon || ''}"
                      @value-changed="${(ev) => this._sensorChanged(ev, index, 'icon')}"
                    ></ha-icon-picker>
                  </div>

                  <div class="row">
                    <!-- Tap Action -->
                    <ha-select
                      label="Tap Action"
                      .value="${sensor.tap_action?.action || 'more-info'}"
                      @change="${(ev) => this._sensorActionChanged(ev, index)}"
                      fixedMenuPosition
                      naturalMenuWidth
                    >
                      <ha-list-item value="more-info">More Info (Default)</ha-list-item>
                      <ha-list-item value="toggle">Toggle State</ha-list-item>
                      <ha-list-item value="none">No Action</ha-list-item>
                    </ha-select>

                    <!-- Default Color -->
                    <div class="color-picker-row">
                      <div class="labeled-input">
                        <label>Default Color (Hex)</label>
                        <input
                          type="text"
                          .value="${sensor.color || ''}"
                          @input="${(ev) => this._sensorChanged(ev, index, 'color')}"
                          placeholder="var(--primary-color)"
                        />
                      </div>
                      ${sensor.color ? html`
                        <input
                          type="color"
                          .value="${this._normalizeHex(sensor.color, '#2196F3')}"
                          @input="${(ev) => this._sensorChanged(ev, index, 'color')}"
                        />
                        <span 
                          class="clear-color-btn"
                          @click="${() => this._clearSensorColor(index)}"
                          title="Clear Color"
                        >
                          <ha-icon icon="mdi:palette-off"></ha-icon>
                        </span>
                      ` : html`
                        <span 
                          class="clear-color-btn"
                          @click="${() => this._enableSensorColor(index)}"
                          title="Define Color"
                        >
                          <ha-icon icon="mdi:palette"></ha-icon>
                        </span>
                      `}
                    </div>
                  </div>

                  <!-- Nested Range Rules -->
                  <div class="rules-section">
                    <div 
                      class="rules-header" 
                      @click="${(ev) => { ev.stopPropagation(); this._toggleRulesExpanded(index); }}" 
                      style="cursor: pointer; user-select: none; padding: 4px 0;"
                    >
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <ha-icon 
                          icon="mdi:chevron-down" 
                          style="transform: ${isRulesExpanded ? 'none' : 'rotate(-90deg)'}; transition: transform 0.2s ease; --mdc-icon-size: 18px;"
                        ></ha-icon>
                        <span>Range Rules (${(sensor.rules || []).length})</span>
                      </div>
                      <button 
                        class="btn btn-secondary" 
                        style="padding: 4px 8px; font-size: 10px;"
                        @click="${(ev) => { ev.stopPropagation(); this._addRule(index); }}"
                      >
                        + Add Rule
                      </button>
                    </div>

                    ${isRulesExpanded ? (sensor.rules || []).map((rule, ruleIndex) => html`
                      <div class="rule-card">
                        <div class="rule-card-header">
                          <span>Rule #${ruleIndex + 1}</span>
                          <span class="delete-btn" @click="${() => this._removeRule(index, ruleIndex)}">
                            <ha-icon icon="mdi:close-circle"></ha-icon>
                          </span>
                        </div>

                        <div class="row">
                          <div class="labeled-input">
                            <label>Above (&gt;)</label>
                            <input
                              type="number"
                              step="any"
                              .value="${rule.above !== undefined ? rule.above : ''}"
                              @input="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'above')}"
                              placeholder="e.g. 18"
                            />
                          </div>
                          <div class="labeled-input">
                            <label>Below (&lt;)</label>
                            <input
                              type="number"
                              step="any"
                              .value="${rule.below !== undefined ? rule.below : ''}"
                              @input="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'below')}"
                              placeholder="e.g. 28"
                            />
                          </div>
                        </div>

                        <div class="row">
                          <ha-icon-picker
                            label="Rule Icon"
                            .hass="${this.hass}"
                            .value="${rule.icon || ''}"
                            @value-changed="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'icon')}"
                          ></ha-icon-picker>

                          <div class="color-picker-row">
                            <div class="labeled-input">
                              <label>Color (Hex)</label>
                              <input
                                type="text"
                                .value="${rule.color || ''}"
                                @input="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'color')}"
                                placeholder="#4CAF50"
                              />
                            </div>
                            ${rule.color ? html`
                              <input
                                type="color"
                                .value="${this._normalizeHex(rule.color, '#4CAF50')}"
                                @input="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'color')}"
                              />
                              <span 
                                class="clear-color-btn"
                                @click="${() => this._clearRuleColor(index, ruleIndex)}"
                                title="Clear Color"
                              >
                                <ha-icon icon="mdi:palette-off"></ha-icon>
                              </span>
                            ` : html`
                              <span 
                                class="clear-color-btn"
                                @click="${() => this._enableRuleColor(index, ruleIndex)}"
                                title="Define Color"
                              >
                                <ha-icon icon="mdi:palette"></ha-icon>
                              </span>
                            `}
                          </div>
                        </div>

                        <div class="labeled-input">
                          <label>Literal State (Optional)</label>
                          <input
                            type="text"
                            .value="${rule.state || ''}"
                            @input="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'state')}"
                            placeholder="e.g. on, heating"
                          />
                        </div>
                      </div>
                    `) : html``}
                  </div>
                ` : html``}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

customElements.define('temp-monitoring-card-editor', TempMonitoringCardEditor);
export { TempMonitoringCardEditor };
