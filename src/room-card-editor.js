import { LitElement, html, css } from 'lit';

class RoomCardEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    _config: { type: Object },
  };

  static styles = css`
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

    .badge-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 8px;
    }

    .badge-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px;
      border-radius: 10px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.05));
      border: 1px solid rgba(127, 127, 127, 0.15);
      position: relative;
    }

    .badge-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      font-size: 12px;
      color: var(--secondary-text-color, #7f7f7f);
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

    /* Buttons styling */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      font-size: 13px;
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

    ha-textfield, ha-entity-picker, ha-icon-picker {
      width: 100%;
      display: block;
    }

    .color-picker-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .color-picker-row ha-textfield {
      flex: 1;
    }

    .color-picker-row input[type="color"] {
      border: none;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
      padding: 0;
      background: none;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: transform 0.1s ease-in-out;
      appearance: none;
      -webkit-appearance: none;
      margin-top: 4px;
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

    .clear-color-btn {
      cursor: pointer;
      color: var(--secondary-text-color, #7f7f7f);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
      width: 24px;
      height: 24px;
      margin-top: 4px;
    }

    .clear-color-btn:hover {
      color: var(--error-color, #db4437);
    }

    .select-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
    }

    .select-container label {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color, #7f7f7f);
      margin-top: 4px;
    }

    .select-container select {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: var(--card-background-color, rgba(127, 127, 127, 0.05));
      color: var(--primary-text-color, #ffffff);
      font-size: 13px;
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s;
    }

    .select-container select:focus {
      border-color: var(--primary-color, #2196F3);
    }

    .rules-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 8px;
      padding: 12px;
      border-radius: 8px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.03));
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
      margin-bottom: 4px;
    }

    .rule-card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 14px;
      border-radius: 10px;
      background: var(--card-background-color, rgba(127, 127, 127, 0.04));
      border: 1px solid rgba(127, 127, 127, 0.12);
      margin-bottom: 8px;
    }

    .rule-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
      font-size: 11px;
      color: var(--secondary-text-color, #7f7f7f);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid rgba(127, 127, 127, 0.08);
      padding-bottom: 6px;
    }

    .rule-card-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .rule-inputs-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      align-items: flex-end;
    }

  `;

  // Set configuration and automatically migrate legacy options
  setConfig(config) {
    this._config = config;

    // Handle legacy variables configuration conversion automatically
    if (config.variables) {
      const migrated = { ...config };
      const vars = config.variables;

      migrated.room_name = vars.room_name || config.room_name || '';
      migrated.room_icon = vars.room_icon || config.room_icon || '';
      migrated.room_color = vars.room_color || config.room_color || '';
      migrated.temp_sensor = vars.temp_sensor || config.temp_sensor || '';
      migrated.hum_sensor = vars.hum_sensor || config.hum_sensor || '';

      // Extract badges
      const badges = [];
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

      if (badges.length > 0) {
        migrated.badges = badges;
      }

      // Clean up legacy keys
      delete migrated.variables;
      for (let i = 1; i <= 10; i++) {
        delete migrated[`badge_${i}_entity`];
        delete migrated[`badge_${i}_icon`];
        delete migrated[`badge_${i}_on_bg`];
        delete migrated[`badge_${i}_state_equals`];
        delete migrated[`badge_${i}_state_not_in`];
      }

      this._config = migrated;
      
      // Dispatch immediately to clean up configuration YAML in Lovelace editor
      setTimeout(() => this._fireConfigChanged(migrated), 50);
    }
  }

  // Handle generic field change
  _valueChanged(ev) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const configValue = target.configValue;
    
    // Resolve value from standard picker details or textfield
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

  // Handle changes inside badge cards
  _badgeChanged(ev, index, field) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const value = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;

    const badges = [...(this._config.badges || [])];
    badges[index] = { ...badges[index], [field]: value };

    // Clean up empty fields
    if (value === '' || value === undefined) {
      delete badges[index][field];
    }

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Add a new empty badge row
  _addBadge() {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    badges.push({ entity: '', icon: '', on_bg: '#FFC107' });

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Delete a badge row
  _removeBadge(index) {
    if (!this._config) return;
    const badges = (this._config.badges || []).filter((_, i) => i !== index);

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  _fireConfigChanged(newConfig) {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _normalizeHex(color, fallback = '#2196F3') {
    if (!color) return fallback;
    if (typeof color !== 'string' || !color.startsWith('#')) return fallback;
    if (color.length === 4) {
      return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    }
    return color;
  }

  _badgeActionChanged(ev, index) {
    if (!this._config || !this.hass) return;
    const actionVal = ev.target.value;

    const badges = [...(this._config.badges || [])];
    const tapAction = actionVal === 'none' ? { action: 'none' } : { action: actionVal };
    badges[index] = { 
      ...badges[index], 
      tap_action: tapAction 
    };

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Get standard state options for a given entity domain
  _getStateOptions(entityId) {
    const options = new Set();
    
    // Add current state if available
    if (this.hass && entityId && this.hass.states[entityId]) {
      options.add(this.hass.states[entityId].state);
    }

    if (entityId) {
      const domain = entityId.split('.')[0];
      const domainOptions = {
        binary_sensor: ['on', 'off'],
        switch: ['on', 'off'],
        light: ['on', 'off'],
        input_boolean: ['on', 'off'],
        cover: ['open', 'closed', 'opening', 'closing'],
        lock: ['locked', 'unlocked', 'locking', 'unlocking'],
        climate: ['heat', 'cool', 'off', 'auto', 'dry', 'fan_only'],
        alarm_control_panel: ['disarmed', 'armed_home', 'armed_away', 'armed_night', 'armed_vacation', 'arming', 'pending', 'triggered'],
        vacuum: ['docked', 'cleaning', 'paused', 'idle', 'returning', 'error'],
        media_player: ['playing', 'paused', 'idle', 'off', 'on', 'standby'],
      };

      if (domainOptions[domain]) {
        domainOptions[domain].forEach(opt => options.add(opt));
      }
    }

    // Default general states
    options.add('on');
    options.add('off');

    return Array.from(options);
  }

  // Add a new empty rule to a badge
  _addRule(index) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    const rules = [...(badges[index].rules || [])];
    
    // Default to the first state option of the entity's domain, fallback to 'on'
    const entity = badges[index].entity;
    const stateOpts = this._getStateOptions(entity);
    const defaultState = stateOpts[0] || 'on';

    rules.push({ state: defaultState, color: '', icon: '' });
    
    badges[index] = { ...badges[index], rules };
    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Remove a rule from a badge
  _removeRule(badgeIndex, ruleIndex) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    const rules = (badges[badgeIndex].rules || []).filter((_, i) => i !== ruleIndex);
    
    badges[badgeIndex] = { ...badges[badgeIndex], rules };
    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Handle changes in a rule select dropdown
  _ruleStateSelectChanged(ev, index, ruleIndex) {
    if (!this._config || !this.hass) return;
    const selectValue = ev.target.value;

    const badges = [...(this._config.badges || [])];
    const rules = [...(badges[index].rules || [])];

    rules[ruleIndex] = { ...rules[ruleIndex], state: selectValue };

    badges[index] = { ...badges[index], rules };
    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Handle changes in a rule's inputs
  _ruleChanged(ev, index, ruleIndex, field) {
    if (!this._config || !this.hass) return;
    const target = ev.target;
    const value = ev.detail && ev.detail.value !== undefined ? ev.detail.value : target.value;

    const badges = [...(this._config.badges || [])];
    const rules = [...(badges[index].rules || [])];
    rules[ruleIndex] = { ...rules[ruleIndex], [field]: value };

    // Clean up empty fields
    if (value === '' || value === undefined) {
      delete rules[ruleIndex][field];
    }

    badges[index] = { ...badges[index], rules };
    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Clear color from a specific rule
  _clearRuleColor(index, ruleIndex) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    const rules = [...(badges[index].rules || [])];
    rules[ruleIndex] = { ...rules[ruleIndex] };
    delete rules[ruleIndex].color;

    badges[index] = { ...badges[index], rules };
    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Clear active color from badge level
  _clearBadgeColor(index) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    badges[index] = { ...badges[index] };
    delete badges[index].on_bg;

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Set rule color to a default active color to enable the picker wheel
  _enableRuleColor(index, ruleIndex) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    const rules = [...(badges[index].rules || [])];
    rules[ruleIndex] = { 
      ...rules[ruleIndex], 
      color: badges[index].on_bg || '#4CAF50' 
    };

    badges[index] = { ...badges[index], rules };
    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  // Set badge active color to a default active color to enable the picker wheel
  _enableBadgeColor(index) {
    if (!this._config) return;
    const badges = [...(this._config.badges || [])];
    badges[index] = { 
      ...badges[index], 
      on_bg: '#FFC107' 
    };

    const newConfig = { ...this._config, badges };
    this._fireConfigChanged(newConfig);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const badges = this._config.badges || [];

    return html`
      <div class="form-container">
        <!-- Room Configuration -->
        <div class="section">
          <div class="section-title">General Settings</div>
          <div class="row">
            <ha-textfield
              label="Room Name"
              .value="${this._config.room_name || ''}"
              .configValue="${'room_name'}"
              @input="${this._valueChanged}"
            ></ha-textfield>
            <ha-icon-picker
              label="Room Icon"
              .hass="${this.hass}"
              .value="${this._config.room_icon || ''}"
              .configValue="${'room_icon'}"
              @value-changed="${this._valueChanged}"
            ></ha-icon-picker>
          </div>
          <div class="row">
            <div class="select-container">
              <label>Card Style</label>
              <select
                .value="${this._config.card_style || 'flat'}"
                .configValue="${'card_style'}"
                @change="${this._valueChanged}"
              >
                <option value="flat">Flat Accent Banner</option>
                <option value="glassmorphism">Frosted Glassmorphism</option>
                <option value="minimal">Minimal Borderless</option>
              </select>
            </div>
            <div class="color-picker-row">
              <ha-textfield
                label="Accent Color"
                .value="${this._config.room_color || ''}"
                .configValue="${'room_color'}"
                @input="${this._valueChanged}"
              ></ha-textfield>
              <input
                type="color"
                .value="${this._normalizeHex(this._config.room_color || '#2196F3', '#2196F3')}"
                .configValue="${'room_color'}"
                @input="${this._valueChanged}"
              />
            </div>
          </div>
          <div class="row">
            <div class="color-picker-row">
              <ha-textfield
                label="Text Color (Optional)"
                .value="${this._config.text_color || ''}"
                .configValue="${'text_color'}"
                @input="${this._valueChanged}"
              ></ha-textfield>
              <input
                type="color"
                .value="${this._normalizeHex(this._config.text_color || '#ffffff', '#ffffff')}"
                .configValue="${'text_color'}"
                @input="${this._valueChanged}"
              />
            </div>
          </div>
        </div>

        <!-- Climate Sensors -->
        <div class="section">
          <div class="section-title">Climate Sensors</div>
          <ha-entity-picker
            .hass="${this.hass}"
            include-domains='["sensor"]'
            label="Temperature Sensor"
            .value="${this._config.temp_sensor || ''}"
            .configValue="${'temp_sensor'}"
            @value-changed="${this._valueChanged}"
          ></ha-entity-picker>
          <ha-entity-picker
            .hass="${this.hass}"
            include-domains='["sensor"]'
            label="Humidity Sensor"
            .value="${this._config.hum_sensor || ''}"
            .configValue="${'hum_sensor'}"
            @value-changed="${this._valueChanged}"
          ></ha-entity-picker>
        </div>

        <!-- Status Badges Section -->
        <div class="section">
          <div class="badge-header">
            <div class="section-title">Status Badges</div>
            <button class="btn btn-secondary" @click="${this._addBadge}">
              + Add Badge
            </button>
          </div>

          ${badges.map((badge, index) => html`
            <div class="badge-card">
              <div class="badge-card-header">
                <span>Badge #${index + 1}</span>
                <span class="delete-btn" @click="${() => this._removeBadge(index)}">
                  <ha-icon icon="mdi:delete"></ha-icon>
                </span>
              </div>

              <!-- Badge Entity -->
              <ha-entity-picker
                .hass="${this.hass}"
                label="Badge Entity"
                .value="${badge.entity || ''}"
                @value-changed="${(ev) => this._badgeChanged(ev, index, 'entity')}"
              ></ha-entity-picker>

              <div class="row">
                <!-- Badge Icon Picker -->
                <ha-icon-picker
                  label="Icon (Optional)"
                  .hass="${this.hass}"
                  .value="${badge.icon || ''}"
                  @value-changed="${(ev) => this._badgeChanged(ev, index, 'icon')}"
                ></ha-icon-picker>

                <!-- Active Color Picker -->
                <div class="color-picker-row">
                  <ha-textfield
                    label="Active Color (Hex)"
                    .value="${badge.on_bg || ''}"
                    @input="${(ev) => this._badgeChanged(ev, index, 'on_bg')}"
                    placeholder="#FFC107 (Optional)"
                  ></ha-textfield>
                  ${badge.on_bg ? html`
                    <input
                      type="color"
                      .value="${this._normalizeHex(badge.on_bg || '#FFC107', '#FFC107')}"
                      @input="${(ev) => this._badgeChanged(ev, index, 'on_bg')}"
                    />
                    <span 
                      class="clear-color-btn"
                      @click="${() => this._clearBadgeColor(index)}"
                      title="Clear Color"
                    >
                      <ha-icon icon="mdi:palette-off"></ha-icon>
                    </span>
                  ` : html`
                    <span 
                      class="clear-color-btn"
                      @click="${() => this._enableBadgeColor(index)}"
                      title="Define Color"
                    >
                      <ha-icon icon="mdi:palette"></ha-icon>
                    </span>
                  `}
                </div>
              </div>

              <!-- Active State Rules & Click Action -->
              <div class="row">
                <ha-textfield
                  label="Active Status Value (State)"
                  .value="${badge.state_equals || ''}"
                  @input="${(ev) => this._badgeChanged(ev, index, 'state_equals')}"
                  placeholder="Defaults to active (not 'off', 'unavailable', 'unknown')"
                ></ha-textfield>

                <div class="select-container">
                  <label>Tap Action</label>
                  <select
                    .value="${badge.tap_action?.action || 'more-info'}"
                    @change="${(ev) => this._badgeActionChanged(ev, index)}"
                  >
                    <option value="more-info">More Info (Default)</option>
                    <option value="toggle">Toggle State</option>
                    <option value="none">No Action</option>
                  </select>
                </div>
              </div>

              <!-- State-specific Colors/Rules -->
              <div class="rules-section">
                <div class="rules-header">
                  <span>State Colors / Rules</span>
                  <button 
                    class="btn btn-secondary" 
                    style="padding: 4px 8px; font-size: 11px;"
                    @click="${() => this._addRule(index)}"
                  >
                    + Add Rule
                  </button>
                </div>
                
                ${(badge.rules || []).map((rule, ruleIndex) => {
                  const stateOpts = this._getStateOptions(badge.entity);
                  const selectValue = rule.state || stateOpts[0] || '';

                  return html`
                    <div class="rule-card">
                      <div class="rule-card-header">
                        <span>Rule #${ruleIndex + 1} (${selectValue})</span>
                        <span 
                          class="delete-btn" 
                          @click="${() => this._removeRule(index, ruleIndex)}"
                          title="Delete Rule"
                        >
                          <ha-icon icon="mdi:close-circle"></ha-icon>
                        </span>
                      </div>

                      <div class="rule-card-body">
                        <!-- Dropdown Selector -->
                        <div class="select-container">
                          <label>State Equals</label>
                          <select
                            .value="${selectValue}"
                            @change="${(ev) => this._ruleStateSelectChanged(ev, index, ruleIndex)}"
                          >
                            ${stateOpts.map(opt => html`
                              <option value="${opt}">${opt}</option>
                            `)}
                          </select>
                        </div>

                        <!-- Visual Options (Icon and Color) in a 2-column row -->
                        <div class="rule-inputs-row">
                          <!-- Icon Picker -->
                          <div class="select-container">
                            <label>Icon (Optional)</label>
                            <ha-icon-picker
                              label=""
                              .hass="${this.hass}"
                              .value="${rule.icon || ''}"
                              @value-changed="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'icon')}"
                            ></ha-icon-picker>
                          </div>

                          <!-- Color Input & Picker -->
                          <div class="select-container">
                            <label>Color (Optional)</label>
                            <div class="color-picker-row">
                              <ha-textfield
                                label=""
                                .value="${rule.color || ''}"
                                @input="${(ev) => this._ruleChanged(ev, index, ruleIndex, 'color')}"
                                placeholder="Default active"
                              ></ha-textfield>
                              ${rule.color ? html`
                                <input
                                  type="color"
                                  .value="${this._normalizeHex(rule.color || '#4CAF50', '#4CAF50')}"
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
                        </div>
                      </div>
                    </div>
                  `;
                })}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('room-card-editor', RoomCardEditor);
export { RoomCardEditor };
