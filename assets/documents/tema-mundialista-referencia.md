# Tema Mundialista de Referencia

Este documento conserva la version visual del portfolio inspirada en el estilo Mundialista/Argentina para poder recuperarla si se desea volver a usar.

## Identidad visual
- Estilo principal: deportivo, vibrante y con tono institucional.
- Paleta principal: celeste, blanco, amarillo y azul profundo.
- Elementos decorativos: estrellas de campeonatos (1978, 1986, 2022), pelota decorativa y overlays de nombres de jugadores.
- Atmosfera: fondo con luces suaves, textura de campo y profundidad en tarjetas.

## Variables CSS de referencia
Archivo: styles.css

```css
body[data-style="argentina"] {
  --bg: #e9f8ff;
  --bg-soft: #f6fdff;
  --surface: rgba(255, 255, 255, 0.9);
  --surface-solid: #ffffff;
  --surface-muted: #e6f6ff;
  --surface-border: rgba(28, 123, 189, 0.26);
  --text: #08253b;
  --muted: #3f5f73;
  --accent: #46b4ea;
  --accent-2: #1f8ed2;
  --accent-3: #ffd23f;
  --accent-4: #0a6ea8;
  --header-surface: rgba(255, 255, 255, 0.88);
  --header-border: rgba(28, 123, 189, 0.32);
  --topnav-link: #13527d;
  --topnav-link-hover: #08253b;
  --shadow-soft: 0 14px 40px rgba(10, 82, 128, 0.16);
  --shadow-lg: 0 28px 70px rgba(8, 51, 82, 0.2);
}

body[data-style="argentina"][data-theme="dark"] {
  --bg: #041520;
  --bg-soft: #082336;
  --surface: rgba(7, 30, 46, 0.84);
  --surface-solid: #0a2a3f;
  --surface-muted: #133a56;
  --surface-border: rgba(120, 205, 255, 0.3);
  --text: #e7f8ff;
  --muted: #9bc8de;
  --accent: #59c3ff;
  --accent-2: #36a8e6;
  --accent-3: #ffd85a;
  --accent-4: #8ad8ff;
  --header-surface: rgba(6, 24, 38, 0.88);
  --header-border: rgba(120, 205, 255, 0.34);
  --topnav-link: #bdeaff;
  --topnav-link-hover: #f0fbff;
  --shadow-soft: 0 14px 40px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 28px 70px rgba(0, 0, 0, 0.62);
}
```

## Elementos visuales claves
- Estrellas campeones: 1978, 1986, 2022.
- Bloque global con clase `.world-stars`.
- Overlay de jugadores con clase `.player-points` y `.player-point`.
- Pelota decorativa con clase `.world-ball` (opcional si se quiere recuperar el detalle adicional).
- Texturas sutiles con pseudo-elementos en `body::before` y `body::after`.

## Estructura HTML de referencia
```html
<div class="world-stars" aria-hidden="true">
  <div class="world-star-chip"><span class="world-star-icon">★</span><span class="world-star-year">1978</span></div>
  <div class="world-star-chip"><span class="world-star-icon">★</span><span class="world-star-year">1986</span></div>
  <div class="world-star-chip"><span class="world-star-icon">★</span><span class="world-star-year">2022</span></div>
</div>

<ul class="player-points" aria-hidden="true">
  <li class="player-point" style="--x: 1.2%; --y: 4%; --d: -0.2s;"><span class="jersey-number">10</span><span class="jersey-name">Lionel Messi</span></li>
</ul>
```

## Como volver a activarlo
- Estilo: guardar `portfolio-style = argentina` en localStorage.
- Tema: usar `portfolio-theme = light` o `dark` segun se prefiera.
- Si se quiere restaurar completamente, activar el bloque `body[data-style="argentina"]` y los selectores asociados en styles.css.

## Fecha de registro
- 2026-07-23
