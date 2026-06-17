import { css } from 'lit';

export const sharedStyles = css`
  :host {
    /* Design Tokens */
    --ha-chroma-card-radius: var(--ha-chroma-border-radius, 24px);
    --ha-chroma-badge-radius: var(--ha-chroma-badge-border-radius, 10px);
    --ha-chroma-transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    /* Sleek Translucent Glassmorphism */
    --ha-chroma-glass-bg: var(--ha-chroma-glass-bg-token, rgba(255, 255, 255, 0.04));
    --ha-chroma-glass-bg-hover: var(--ha-chroma-glass-bg-hover-token, rgba(255, 255, 255, 0.08));
    --ha-chroma-glass-border: var(--ha-chroma-glass-border-token, rgba(255, 255, 255, 0.09));
    --ha-chroma-glass-border-hover: var(--ha-chroma-glass-border-hover-token, rgba(255, 255, 255, 0.18));
    --ha-chroma-glass-blur: blur(20px);
    
    /* Shadows & Glows */
    --ha-chroma-shadow: var(--ha-card-box-shadow, 0 8px 32px 0 rgba(0, 0, 0, 0.15));
    --ha-chroma-shadow-hover: 0 12px 40px 0 rgba(0, 0, 0, 0.25);
    
    /* Typography */
    --ha-chroma-primary-text: var(--primary-text-color, #ffffff);
    --ha-chroma-secondary-text: var(--secondary-text-color, rgba(255, 255, 255, 0.6));

    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  /* Central Card Container */
  .chroma-card {
    border-radius: var(--ha-chroma-card-radius, 24px);
    overflow: hidden;
    position: relative;
    transition: var(--ha-chroma-transition);
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .chroma-card.flat {
    background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    border: 1px solid rgba(127, 127, 127, 0.15);
    box-shadow: var(--ha-chroma-shadow);
  }
  .chroma-card.flat.interactive:hover {
    background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    border-color: rgba(127, 127, 127, 0.25);
    box-shadow: var(--ha-chroma-shadow-hover);
    transform: translateY(-2px);
  }

  .chroma-card.glassmorphism {
    background: var(--ha-chroma-glass-bg);
    backdrop-filter: var(--ha-chroma-glass-blur);
    -webkit-backdrop-filter: var(--ha-chroma-glass-blur);
    border: 1px solid var(--ha-chroma-glass-border);
    box-shadow: var(--ha-chroma-shadow);
  }
  .chroma-card.glassmorphism.interactive:hover {
    background: var(--ha-chroma-glass-bg-hover);
    border-color: var(--ha-chroma-glass-border-hover);
    box-shadow: var(--ha-chroma-shadow-hover);
    transform: translateY(-2px);
  }

  .chroma-card.minimal {
    background: var(--ha-card-background, var(--card-background-color, transparent));
    border: 1px solid rgba(127, 127, 127, 0.1);
    box-shadow: none;
  }
  .chroma-card.minimal.interactive:hover {
    background: rgba(127, 127, 127, 0.03);
    border-color: rgba(127, 127, 127, 0.2);
    transform: translateY(-2px);
  }

  .chroma-card.interactive {
    cursor: pointer;
  }

  /* Badge Container (Wraps when needed, hides overflow cleanly) */
  .badge-grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: hidden;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px 10px 10px;
    background: rgba(127, 127, 127, 0.02);
    transition: var(--ha-chroma-transition);
  }

  /* Badge styling */
  .badge-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;
    width: 28px;
    border-radius: var(--ha-chroma-badge-radius, 8px);
    transition: var(--ha-chroma-transition);
    position: relative;
    flex-shrink: 0; /* Prevents shrinking in flex row overflow */
  }

  .badge-item ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    --mdc-icon-size: 14px;
    transition: var(--ha-chroma-transition);
  }

  /* Active state */
  .badge-item.active {
    background: var(--badge-active-color);
    border: 1px solid var(--badge-active-color);
    box-shadow: 0 4px 12px var(--badge-active-glow);
    animation: badge-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .badge-item.active ha-icon {
    color: #ffffff;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }

  .badge-item.active:hover {
    transform: scale(1.1) translateY(-1px);
    box-shadow: 0 6px 16px var(--badge-active-glow);
  }

  /* Inactive state */
  .badge-item.inactive {
    background: rgba(127, 127, 127, 0.03);
    border: 1px dashed color-mix(in srgb, var(--secondary-text-color, #7f7f7f) 45%, transparent);
  }

  .badge-item.inactive ha-icon {
    color: color-mix(in srgb, var(--secondary-text-color, #7f7f7f) 70%, transparent);
  }

  .badge-item.inactive:hover {
    background: rgba(127, 127, 127, 0.08);
    border-color: color-mix(in srgb, var(--secondary-text-color, #7f7f7f) 70%, transparent);
    transform: scale(1.05);
  }

  @keyframes badge-pop {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
`;
