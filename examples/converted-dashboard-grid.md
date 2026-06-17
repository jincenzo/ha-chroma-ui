# Converted Lovelace Dashboard Configuration

Below is the complete Lovelace YAML configuration for your room dashboard, converted to use the new `custom:room-card` component.

## Option A: Modern Flat Configuration (Recommended)
This uses the clean, modern, and flat structure designed specifically for the new card:

```yaml
type: grid
column_span: 4
cards:
  # Living Room Card
  - type: custom:room-card
    room_name: Living
    room_icon: mdi:sofa
    room_color: '#87a38d'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/living
    badges:
      - entity: light.living_lights
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.living_flag_heather_on
        icon: mdi:heat-wave
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.living_main_door_contact_sensor
        icon: mdi:door-open
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: binary_sensor.living_flag_tv_on
        icon: mdi:monitor
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Kitchen Card
  - type: custom:room-card
    room_name: Kitchen
    room_icon: mdi:pot-steam
    room_color: '#df977d'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/kitchen
    hold_action:
      action: more-info
    badges:
      - entity: light.kitchen_lights
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.induction_plan_on
        icon: mdi:induction
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.dishwasher_running
        icon: mdi:dishwasher
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: binary_sensor.kitchen_flag_oven_on
        icon: mdi:toaster-oven
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Master Bedroom Card
  - type: custom:room-card
    room_name: Master
    room_icon: mdi:bed-king
    room_color: '#3e5c76'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/master-bedroom
    hold_action:
      action: more-info
    badges:
      - entity: light.master_bedroom_all_lights
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.binary_sensor.induction_plan_on
        icon: mdi:heating-coil
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.marti_window_open
        icon: mdi:window-open-variant
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: input_boolean.marti_is_sleeping
        icon: mdi:sleep
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Marti Room Card
  - type: custom:room-card
    room_name: Marti
    room_icon: mdi:teddy-bear
    room_color: '#a78bfa'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/marti
    hold_action:
      action: more-info
    badges:
      - entity: light.marti_bedrom_lights
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.binary_sensor.induction_plan_on
        icon: mdi:heating-coil
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.marti_window_open
        icon: mdi:window-open-variant
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: input_boolean.marti_is_sleeping
        icon: mdi:sleep
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Office Card
  - type: custom:room-card
    room_name: Office
    room_icon: mdi:monitor
    room_color: '#d4af37'
    temp_sensor: sensor.office_climate_sensor_temperature
    hum_sensor: sensor.office_climate_sensor_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/office
    hold_action:
      action: more-info
    badges:
      - entity: light.office_main_light_group
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.binary_sensor.induction_plan_on
        icon: mdi:heating-coil
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.marti_window_open
        icon: mdi:window-open-variant
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: binary_sensor.office_some_pc_on
        icon: mdi:monitor
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Laundry Card
  - type: custom:room-card
    room_name: Laundry
    room_icon: mdi:tshirt-crew
    room_color: '#5c6bc0'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/laundry
    hold_action:
      action: more-info
    badges:
      - entity: light.corridor_light_group
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.washing_machine_running
        icon: mdi:washing-machine
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.dryer_machine_running
        icon: mdi:tumble-dryer
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: input_boolean.marti_is_sleeping
        icon: mdi:water-alert
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Bath 1 Card
  - type: custom:room-card
    room_name: Bath 1
    room_icon: mdi:toilet
    room_color: '#607d8b'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/bath-1
    hold_action:
      action: more-info
    badges:
      - entity: light.master_bathroom_main_light
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.1washing_machine_running
        icon: mdi:heating-coil
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.1dryer_machine_running
        icon: mdi:window-open-variant
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: input_boolean.1marti_is_sleeping
        icon: mdi:water-percent-alert
        on_bg: '#4CAF50'
        state_equals: 'on'

  # Bath 2 Card
  - type: custom:room-card
    room_name: Bath 2
    room_icon: mdi:toilet
    room_color: '#4db6ac'
    temp_sensor: sensor.living_temperature
    hum_sensor: sensor.living_humidity
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/bath-2
    hold_action:
      action: more-info
    badges:
      - entity: light._
        icon: mdi:lightbulb
        on_bg: '#FFC107'
      - entity: binary_sensor.1washing_machine_running
        icon: mdi:heating-coil
        on_bg: '#FF5722'
        state_equals: 'on'
      - entity: binary_sensor.1dryer_machine_running
        icon: mdi:window-open-variant
        on_bg: '#2196F3'
        state_equals: 'on'
      - entity: input_boolean1.marti_is_sleeping
        icon: mdi:water-percent-alert
        on_bg: '#4CAF50'
        state_equals: 'on'
```

---

## Option B: Drop-in Legacy Variables Configuration
If you want to keep the exact variables structure you had in your custom:button-card setup, this code works without changing any keys (since our component backward-compatibility parser handles it):

```yaml
type: grid
column_span: 4
cards:
  # Living Room Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/living
    variables:
      room_name: Living
      room_icon: mdi:sofa
      room_color: '#87a38d'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light.living_lights
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.living_flag_heather_on
      badge_2_icon: mdi:heat-wave
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.living_main_door_contact_sensor
      badge_3_icon: mdi:door-open
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: binary_sensor.living_flag_tv_on
      badge_4_icon: mdi:monitor
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Kitchen Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/kitchen
    hold_action:
      action: more-info
    variables:
      room_name: Kitchen
      room_icon: mdi:pot-steam
      room_color: '#df977d'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light.kitchen_lights
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.induction_plan_on
      badge_2_icon: mdi:induction
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.dishwasher_running
      badge_3_icon: mdi:dishwasher
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: binary_sensor.kitchen_flag_oven_on
      badge_4_icon: mdi:toaster-oven
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Master Bedroom Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/master-bedroom
    hold_action:
      action: more-info
    variables:
      room_name: Master
      room_icon: mdi:bed-king
      room_color: '#3e5c76'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light.master_bedroom_all_lights
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.binary_sensor.induction_plan_on
      badge_2_icon: mdi:heating-coil
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.marti_window_open
      badge_3_icon: mdi:window-open-variant
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: input_boolean.marti_is_sleeping
      badge_4_icon: mdi:sleep
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Marti Room Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/marti
    hold_action:
      action: more-info
    variables:
      room_name: Marti
      room_icon: mdi:teddy-bear
      room_color: '#a78bfa'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light.marti_bedrom_lights
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.binary_sensor.induction_plan_on
      badge_2_icon: mdi:heating-coil
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.marti_window_open
      badge_3_icon: mdi:window-open-variant
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: input_boolean.marti_is_sleeping
      badge_4_icon: mdi:sleep
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Office Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/office
    hold_action:
      action: more-info
    variables:
      room_name: Office
      room_icon: mdi:monitor
      room_color: '#d4af37'
      temp_sensor: sensor.office_climate_sensor_temperature
      hum_sensor: sensor.office_climate_sensor_humidity
      badge_1_entity: light.office_main_light_group
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.binary_sensor.induction_plan_on
      badge_2_icon: mdi:heating-coil
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.marti_window_open
      badge_3_icon: mdi:window-open-variant
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: binary_sensor.office_some_pc_on
      badge_4_icon: mdi:monitor
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Laundry Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/laundry
    hold_action:
      action: more-info
    variables:
      room_name: Laundry
      room_icon: mdi:tshirt-crew
      room_color: '#5c6bc0'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light.corridor_light_group
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.washing_machine_running
      badge_2_icon: mdi:washing-machine
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.dryer_machine_running
      badge_3_icon: mdi:tumble-dryer
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: input_boolean.marti_is_sleeping
      badge_4_icon: mdi:water-alert
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Bath 1 Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/bath-1
    hold_action:
      action: more-info
    variables:
      room_name: Bath 1
      room_icon: mdi:toilet
      room_color: '#607d8b'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light.master_bathroom_main_light
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.1washing_machine_running
      badge_2_icon: mdi:heating-coil
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.1dryer_machine_running
      badge_3_icon: mdi:window-open-variant
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: input_boolean.1marti_is_sleeping
      badge_4_icon: mdi:water-percent-alert
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []

  # Bath 2 Card
  - type: custom:room-card
    tap_action:
      action: navigate
      navigation_path: /dashboard-test/bath-2
    hold_action:
      action: more-info
    variables:
      room_name: Bath 2
      room_icon: mdi:toilet
      room_color: '#4db6ac'
      temp_sensor: sensor.living_temperature
      hum_sensor: sensor.living_humidity
      badge_1_entity: light._
      badge_1_icon: mdi:lightbulb
      badge_1_on_bg: '#FFC107'
      badge_1_state_equals: null
      badge_1_state_not_in:
        - 'off'
        - unavailable
        - unknown
      badge_2_entity: binary_sensor.1washing_machine_running
      badge_2_icon: mdi:heating-coil
      badge_2_on_bg: '#FF5722'
      badge_2_state_equals: 'on'
      badge_2_state_not_in: []
      badge_3_entity: binary_sensor.1dryer_machine_running
      badge_3_icon: mdi:window-open-variant
      badge_3_on_bg: '#2196F3'
      badge_3_state_equals: 'on'
      badge_3_state_not_in: []
      badge_4_entity: input_boolean1.marti_is_sleeping
      badge_4_icon: mdi:water-percent-alert
      badge_4_on_bg: '#4CAF50'
      badge_4_state_equals: 'on'
      badge_4_state_not_in: []
```
