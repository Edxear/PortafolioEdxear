# Tema Original de Referencia (Antes del Modo Argentina)

Este documento deja asentada la tematica visual base del portfolio para poder volver al estilo anterior cuando se desee.

## Identidad Visual Base
- Estilo principal: calido, profesional y tecnico.
- Paleta principal: tierra/naranja con acentos dorados.
- Fondo: gradientes calidos + particulas + halos radiales.
- Modo oscuro: negro/naranja con contraste alto.

## Variables CSS del Tema Base (Claro)
Archivo: styles.css

```css
:root {
  --bg: #f4f1ec;
  --bg-soft: #fffaf3;
  --surface: rgba(255, 250, 243, 0.88);
  --surface-solid: #fffaf3;
  --surface-muted: #f5ede1;
  --surface-border: rgba(45, 31, 22, 0.14);
  --text: #23170f;
  --muted: #715a49;
  --accent: #ff5f1f;
  --accent-2: #ff8a1d;
  --accent-3: #ffd166;
  --accent-4: #d9480f;
  --header-surface: rgba(255, 250, 243, 0.82);
  --header-border: rgba(45, 31, 22, 0.16);
  --topnav-link: #5e4636;
  --topnav-link-hover: #22150f;
}
```

## Variables CSS del Tema Base (Oscuro)
Archivo: styles.css

```css
body[data-theme="dark"] {
  --bg: #0a0807;
  --bg-soft: #17100d;
  --surface: rgba(20, 14, 10, 0.82);
  --surface-solid: #17100d;
  --surface-muted: #221711;
  --surface-border: rgba(255, 139, 61, 0.22);
  --text: #ffeede;
  --muted: #c09f87;
  --accent: #ff6a2d;
  --accent-2: #ff9f1c;
  --accent-3: #ffd166;
  --accent-4: #ff4d2e;
  --header-surface: rgba(13, 9, 7, 0.82);
  --header-border: rgba(255, 139, 61, 0.28);
  --topnav-link: #ffc9a1;
  --topnav-link-hover: #fff0e6;
}
```

## Como Volver al Estilo Original
Hay dos opciones:

1. Desde la UI:
- Usar el boton de estilo para desactivar "Modo Argentina" y volver al clasico.

2. Desde almacenamiento local del navegador:
- Clave: `portfolio-style`
- Valor original: `default`
- Si se elimina la clave, el sitio vuelve al estilo clasico por defecto.

## Fecha de registro
- 2026-07-10

## Referencia adicional
- Version Mundialista guardada en: [tema-mundialista-referencia.md](tema-mundialista-referencia.md)
