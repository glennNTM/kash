# Design System — Kash

> Socle visuel de l'application Kash — gestion financière personnelle pour jeunes salariés.
> Construit pour inspirer **clarté, fierté et confiance** à chaque écran.

---

## Sommaire

1. [Identité du projet](#1-identité-du-projet)
2. [Philosophie & Principes](#2-philosophie--principes)
3. [Typographie](#3-typographie)
4. [Couleurs](#4-couleurs)
5. [Espacements](#5-espacements)
6. [Bordures & Radius](#6-bordures--radius)
7. [Ombres & Profondeur](#7-ombres--profondeur)
8. [Animations & Motion](#8-animations--motion)
9. [Composants](#9-composants)
10. [Grille & Layout](#10-grille--layout)
11. [Tokens CSS — Fichier complet](#11-tokens-css--fichier-complet)
12. [Checklist](#12-checklist)
13. [Journal des adaptations](#13-journal-des-adaptations)

---

## 1. Identité du projet

| Champ | Valeur |
|---|---|
| **Nom du projet** | `Kash` |
| **Secteur** | Fintech / Éducation financière |
| **Cible** | Jeunes salariés, 22–32 ans, premier salaire sérieux |
| **Ton général** | Clair · Moderne · Encourageant |
| **Couleur primaire** | `#1A9E6E` (vert confiance) |
| **Couleur de fond** | `#F7F7F5` (blanc chaud, non agressif) |
| **Police titres** | `"Caveat"` (manuscrite — chaleur, ton encourageant) |
| **Police corps** | `"Manrope"` (corps + sous-titres — clarté) |
| **Police montants** | `"JetBrains Mono"` (chiffres tabulaires) |
| **Fournisseur de polices** | Bunny Fonts (`fonts.bunny.net`) — RGPD-friendly, sans tracking |

### Moodboard résumé

- **Clarté** — chaque chiffre est lisible au premier coup d'œil, aucune surcharge
- **Fierté** — l'app montre la progression, elle valorise les bons gestes
- **Confiance** — le vert ancre une sensation de croissance saine, pas de pression bancaire

### Pourquoi ces choix

**Vert plutôt que bleu :** Le bleu évoque les banques traditionnelles et l'institution. Le vert évoque la croissance, l'argent qui travaille, la santé financière. Pour un jeune qui *apprend* à gérer son argent, le vert donne de l'énergie positive sans l'austérité.

**Manrope (corps) + Caveat (titres) :** Manrope est une géométrique-humaniste très lisible sur mobile et nette sur les chiffres — elle porte la clarté et la confiance. Caveat, manuscrite, n'intervient que sur les grands titres pour réchauffer le ton (l'app est *encourageante*, pas une banque froide). Les montants restent en **JetBrains Mono** : des chiffres tabulaires, alignés, sans jamais de manuscrit. Le manuscrit décore le ton, jamais la donnée financière.

**Pourquoi Bunny Fonts :** même catalogue que Google Fonts, mais servi sans cookies ni collecte d'IP. Pour une app qui manipule des données financières personnelles, éviter d'exfiltrer la moindre requête vers Google est cohérent avec la promesse de confiance.

**Fond `#F7F7F5` :** Blanc cassé légèrement chaud — ni blanc pur (fatigue visuelle), ni gris froid (trop corporate). Doux, accueillant, propre.

---

## 2. Philosophie & Principes

### Les règles de Kash

**I. Une seule couleur d'accent — le vert.**
`#1A9E6E` en light, `#22C98A` en dark. Jamais deux accents. La clarté visuelle est non négociable.

**II. Les chiffres sont rois.**
Les montants s'affichent en grand, en gras, avec tracking négatif. Ce sont des visuels, pas du texte.

**III. Le fond respire.**
Padding vertical minimum des sections : `64px` sur mobile, `96px` sur desktop. Le vide est une feature.

**IV. Tous les boutons CTA sont en pilule.**
`border-radius: 980px`. Sans exception. Moderne, mobile-friendly, reconnaissable.

**V. Zéro décoration inutile.**
Pas d'icônes sans sens, pas de patterns, pas de dégradés multicolores. Chaque élément justifie sa présence.

**VI. Le vert signifie toujours "positif".**
Solde positif, dépense cochée payée, objectif atteint = vert accent. L'utilisateur apprend un langage visuel cohérent.

**VII. Le rouge est rare.**
Uniquement pour les dépassements de budget et les erreurs. Ne jamais l'utiliser à des fins décoratives.

**VIII. Mobile d'abord, toujours.**
Tout composant est pensé à 375px de large en premier. Le desktop est l'adaptation, pas l'inverse.

---

## 3. Typographie

### Police

```css
/* Trois rôles distincts */
--font-display : "Caveat", "Brush Script MT", cursive;      /* titres : accent manuscrit, chaleureux */
--font-body    : "Manrope", "Helvetica Neue", sans-serif;   /* corps + sous-titres : clarté */
--font-mono    : "JetBrains Mono", ui-monospace, "Consolas", monospace;  /* montants : chiffres tabulaires */
```

**Import Bunny Fonts (RGPD-friendly, sans tracking) :**
```html
<link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
<link href="https://fonts.bunny.net/css?family=manrope:400,500,600,700,800|caveat:600,700|jetbrains-mono:400,500,700&display=swap" rel="stylesheet">
```

### Application des polices (portée du manuscrit)

| Police | S'applique à | Tracking |
|---|---|---|
| `--font-display` (Caveat) | Titres de page (`text-display-l/m`) et de section (`text-heading-l`) **uniquement** | `normal` (jamais négatif — un manuscrit serré devient illisible) |
| `--font-body` (Manrope) | Tout le reste : sous-titres (`heading-m/s`), corps, labels, eyebrow, boutons, inputs | selon l'échelle |
| `--font-mono` (JetBrains Mono) | Montants : `text-stat`, input montant, chiffres de tableaux | `-0.02em` |

> ⚠️ Caveat ne touche **jamais** un chiffre ni un montant. La donnée financière reste en Manrope ou JetBrains Mono — c'est ce qui préserve la confiance.

### Échelle typographique

| Token | Taille | Poids | Letter-spacing | Line-height | Usage |
|---|---|---|---|---|---|
| `--text-display-xl` | `clamp(36px, 8vw, 72px)` | `700` | `-0.04em` | `1.05` | — (non utilisé dans l'app) |
| `--text-display-l` | `clamp(28px, 5vw, 48px)` | `700` | `-0.03em` | `1.08` | Titre de page principale |
| `--text-display-m` | `clamp(22px, 4vw, 36px)` | `700` | `-0.025em` | `1.1` | Montant total du dashboard |
| `--text-heading-l` | `24px` | `700` | `-0.02em` | `1.2` | Titre de section (Charges, Épargne…) |
| `--text-heading-m` | `20px` | `600` | `-0.015em` | `1.25` | Titre de carte |
| `--text-heading-s` | `17px` | `600` | `-0.01em` | `1.3` | Label important |
| `--text-body-l` | `17px` | `400` | `normal` | `1.6` | Corps principal |
| `--text-body` | `15px` | `400` | `normal` | `1.65` | Corps standard |
| `--text-body-s` | `13px` | `400` | `normal` | `1.6` | Texte secondaire, légendes |
| `--text-caption` | `12px` | `500` | `0.02em` | `1.5` | Date, metadata |
| `--text-eyebrow` | `11px` | `600` | `0.1em` | `1.4` | Label de section (uppercase) |
| `--text-stat` | `clamp(32px, 7vw, 56px)` | `700` | `-0.04em` | `1` | Montants géants (dashboard) |

### Règle de hiérarchie

```
[EYEBROW]     → Manrope / 11px / 600 / uppercase / tracking 0.1em / accent ou t-3
[TITRE]       → Caveat / 28–48px / 700 / tracking normal / t-1
[VALEUR]      → JetBrains Mono / stat size / 700 / tracking -0.02em / accent ou t-1
[DESCRIPTION] → Manrope / 15px / 400 / t-2 / max-width 480px
```

---

## 4. Couleurs

### Mode Light (défaut — fond clair)

| Token | Hex | Usage |
|---|---|---|
| `--bg-1` | `#F7F7F5` | Fond principal (blanc chaud) |
| `--bg-2` | `#FFFFFF` | Cartes, surfaces élevées |
| `--bg-3` | `#EFEFED` | Inputs, hover, fond alterné |
| `--bg-4` | `#E6E6E3` | Surfaces enfoncées |
| `--bg-glass` | `rgba(247,247,245, 0.80)` | Bottom nav, overlays |
| `--t-1` | `#181816` | Texte principal |
| `--t-2` | `#6B6B68` | Texte secondaire |
| `--t-3` | `#A8A8A5` | Texte tertiaire, placeholders |
| `--border-subtle` | `rgba(0,0,0, 0.06)` | Séparateurs, cartes |
| `--border-medium` | `rgba(0,0,0, 0.11)` | Inputs, dividers |
| `--border-strong` | `rgba(0,0,0, 0.22)` | Focus, sélectionné |

### Mode Dark (optionnel — phase 2)

| Token | Hex | Usage |
|---|---|---|
| `--bg-1` | `#111110` | Fond principal |
| `--bg-2` | `#1C1C1A` | Cartes, surfaces |
| `--bg-3` | `#272724` | Hover, inputs |
| `--bg-4` | `#323230` | Elevated surfaces |
| `--bg-glass` | `rgba(17,17,16, 0.80)` | Bottom nav, overlays |
| `--t-1` | `#F2F2EF` | Texte principal |
| `--t-2` | `#8E8E8A` | Texte secondaire |
| `--t-3` | `#5C5C59` | Texte tertiaire |
| `--border-subtle` | `rgba(255,255,255, 0.07)` | Séparateurs |
| `--border-medium` | `rgba(255,255,255, 0.13)` | Inputs |
| `--border-strong` | `rgba(255,255,255, 0.26)` | Focus |

### Couleurs d'accent

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--accent` | `#1A9E6E` | `#22C98A` | Accent principal (vert) |
| `--accent-hover` | `#168A5F` | `#1DB87A` | Hover state |
| `--accent-soft` | `rgba(26,158,110, 0.10)` | `rgba(34,201,138, 0.12)` | Fond badge, highlight léger |
| `--accent-rgb` | `26,158,110` | `34,201,138` | Pour les rgba() |
| `--success` | `#1A9E6E` | `#22C98A` | Payé, validé (= accent) |
| `--warning` | `#D97706` | `#F59E0B` | Attention, proche du budget |
| `--error` | `#DC2626` | `#F87171` | Dépassement, erreur |
| `--neutral` | `#6B6B68` | `#8E8E8A` | Planifié, en attente |

### Sémantique des couleurs — règle métier

```
Dépense PAYÉE          → vert accent (--success)
Dépense PLANIFIÉE      → neutre (--t-2)
Budget DÉPASSÉ         → rouge (--error)
Budget À RISQUE (>80%) → orange (--warning)
Budget OK              → vert (--accent)
Montant restant positif → vert accent
Montant restant négatif → rouge erreur
```

### Dégradés autorisés

```css
/* Gradient montant géant (dashboard hero) */
--gradient-stat : linear-gradient(135deg, #1A9E6E 0%, #0D7A54 100%);

/* Gradient fond carte objectif */
--gradient-goal : linear-gradient(135deg, #F0FBF6 0%, #E0F5EC 100%); /* light */

/* ⛔ INTERDIT : multicolore, néon, arc-en-ciel */
```

---

## 5. Espacements

### Système base-4

| Token | Valeur | Usage principal |
|---|---|---|
| `--space-1` | `4px` | Gap micro, entre icône et texte |
| `--space-2` | `8px` | Gap inline, padding badge |
| `--space-3` | `12px` | Padding compact, gap liste |
| `--space-4` | `16px` | Gap standard, padding carte sm |
| `--space-5` | `24px` | Padding carte, gap entre cards |
| `--space-6` | `32px` | Margin entre blocs |
| `--space-7` | `48px` | Margin intra-section |
| `--space-8` | `64px` | Padding vertical section mobile |
| `--space-9` | `96px` | Padding vertical section desktop |
| `--space-10` | `128px` | Réservé hero landing page |

### Règles de padding — app mobile

```css
/* Padding horizontal global de l'app */
.screen { padding: 0 var(--space-4); }         /* 16px gauche/droite */

/* Cartes */
.card-body { padding: var(--space-5); }         /* 24px */
.card-body-compact { padding: var(--space-4); } /* 16px */

/* Bottom navigation — espace pour ne pas masquer le contenu */
.main-content { padding-bottom: 80px; }

/* Section avec titre */
.section { margin-bottom: var(--space-7); }     /* 48px */
```

---

## 6. Bordures & Radius

### Border radius

| Token | Valeur | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Badges, tags, chips |
| `--radius-md` | `12px` | Inputs, tooltips |
| `--radius-lg` | `16px` | Cartes standard, modals |
| `--radius-xl` | `20px` | Cartes dashboard, sections |
| `--radius-2xl` | `28px` | Bottom sheet, grandes cartes |
| `--radius-pill` | `980px` | **Tous les boutons. Toujours.** |

### Règle des cartes

```css
/* Carte standard */
border: 1px solid var(--border-subtle);
border-radius: var(--radius-lg);   /* 16px */

/* Carte hero (montant total, recap mois) */
border-radius: var(--radius-xl);   /* 20px */

/* Bottom sheet / modal */
border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
```

---

## 7. Ombres & Profondeur

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--shadow-sm` | `0 1px 8px rgba(0,0,0,.07)` | `0 2px 12px rgba(0,0,0,.40)` | Cartes au repos |
| `--shadow-md` | `0 4px 20px rgba(0,0,0,.10)` | `0 8px 32px rgba(0,0,0,.55)` | Cartes actives, FAB |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,.13)` | `0 24px 64px rgba(0,0,0,.65)` | Modals, bottom sheets |
| `--shadow-glow` | `0 0 24px rgba(26,158,110,.15)` | `0 0 32px rgba(34,201,138,.18)` | CTA principal (rare) |

> En light mode les ombres sont douces. L'élévation se crée par la combinaison fond `#F7F7F5` → carte `#FFFFFF` + ombre légère, pas par des contrastes brutaux.

---

## 8. Animations & Motion

### Durées

| Token | Valeur | Usage |
|---|---|---|
| `--duration-instant` | `100ms` | Checkbox, toggle |
| `--duration-fast` | `200ms` | Hover, focus, tap feedback |
| `--duration-base` | `350ms` | Transitions UI standard |
| `--duration-slow` | `600ms` | Apparition de sections |
| `--duration-cinematic` | `900ms` | Réservé animations de célébration |

### Easings

| Token | Valeur | Usage |
|---|---|---|
| `--ease-apple` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | **Défaut absolu** |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Modals, bottom sheets, succès |
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transitions longues |
| `--ease-sharp` | `cubic-bezier(0.4, 0, 0.6, 1)` | Fermeture, dismiss |

### Règles d'animation

```
✓ --ease-apple par défaut sur tout
✓ Animer transform et opacity uniquement
✓ Tap feedback : scale(0.97) à l'active, 100ms
✓ Célébration (objectif atteint) : spring + vert + 900ms max
✓ Respecter prefers-reduced-motion

⛔ Aucune animation > 900ms en usage normal
⛔ Pas d'animation au hover sur mobile
⛔ Pas de transition sur width, height, margin, padding
⛔ Pas de loaders inutiles si < 200ms
```

---

## 9. Composants

### 9.1 Bottom Navigation (mobile-first)

```css
.bottom-nav {
  position        : fixed;
  bottom          : 0;
  left            : 0;
  right           : 0;
  height          : 64px;
  padding-bottom  : env(safe-area-inset-bottom); /* iPhone notch */
  display         : flex;
  align-items     : center;
  justify-content : space-around;
  background      : var(--bg-glass);
  backdrop-filter : blur(20px) saturate(180%);
  -webkit-backdrop-filter : blur(20px) saturate(180%);
  border-top      : 1px solid var(--border-subtle);
  z-index         : 100;
}

.bottom-nav-item { color: var(--t-3); transition: color var(--duration-fast) var(--ease-apple); }
.bottom-nav-item.active { color: var(--accent); }
```

### 9.2 Boutons

```css
.btn {
  display         : inline-flex;
  align-items     : center;
  justify-content : center;
  font-family     : var(--font-body);
  font-size       : 15px;
  font-weight     : 600;
  border-radius   : var(--radius-pill);
  border          : none;
  cursor          : pointer;
  white-space     : nowrap;
  transition      : all var(--duration-fast) var(--ease-apple);
}
.btn:active { transform: scale(0.97); }

/* Variantes */
.btn-primary   { background: var(--accent); color: #fff; padding: 14px 24px; }
.btn-secondary { background: var(--bg-3); color: var(--t-1); padding: 14px 24px; border: 1px solid var(--border-medium); }
.btn-ghost     { background: var(--accent-soft); color: var(--accent); padding: 14px 24px; }
.btn-danger    { background: rgba(220,38,38,0.10); color: var(--error); padding: 14px 24px; }

/* Tailles */
.btn-sm  { font-size: 13px; padding: 8px 16px; }
.btn-lg  { font-size: 17px; padding: 16px 32px; width: 100%; } /* full-width sur mobile */

/* Hover (desktop uniquement) */
@media (hover: hover) {
  .btn-primary:hover   { filter: brightness(1.08); }
  .btn-secondary:hover { background: var(--bg-4); }
}
```

### 9.3 Cartes de dépense

```css
/* Ligne de dépense dans une section */
.expense-item {
  display         : flex;
  align-items     : center;
  justify-content : space-between;
  padding         : var(--space-4) 0;
  border-bottom   : 1px solid var(--border-subtle);
}

.expense-item:last-child { border-bottom: none; }

/* État payé */
.expense-item.paid .expense-label { color: var(--t-3); text-decoration: line-through; }
.expense-item.paid .expense-amount { color: var(--success); }

/* État planifié */
.expense-item.planned .expense-amount { color: var(--t-2); }
```

### 9.4 Carte de section budget (Charges / Épargne / Loisirs)

```css
.budget-section-card {
  background    : var(--bg-2);
  border-radius : var(--radius-xl);
  border        : 1px solid var(--border-subtle);
  padding       : var(--space-5);
  box-shadow    : var(--shadow-sm);
}

/* Barre de progression du budget */
.budget-bar-track {
  height        : 6px;
  background    : var(--bg-3);
  border-radius : var(--radius-pill);
  overflow      : hidden;
  margin-top    : var(--space-3);
}

.budget-bar-fill {
  height        : 100%;
  border-radius : var(--radius-pill);
  background    : var(--accent);
  transition    : width var(--duration-slow) var(--ease-apple);
}

/* États de la barre */
.budget-bar-fill.warning { background: var(--warning); } /* > 80% */
.budget-bar-fill.danger  { background: var(--error); }   /* > 100% */
```

### 9.5 Carte montant total (Dashboard hero)

```css
.dashboard-hero-card {
  background    : var(--accent);
  border-radius : var(--radius-xl);
  padding       : var(--space-6) var(--space-5);
  color         : #fff;
}

.dashboard-hero-amount {
  font-size      : var(--text-stat);
  font-weight    : 700;
  letter-spacing : -0.04em;
  line-height    : 1;
}

.dashboard-hero-label {
  font-size   : 13px;
  opacity     : 0.75;
  margin-top  : var(--space-2);
}
```

### 9.6 Inputs

```css
.input {
  font-family    : var(--font-body);
  font-size      : 17px;
  font-weight    : 500;
  padding        : 14px 16px;
  background     : var(--bg-2);
  border         : 1px solid var(--border-medium);
  border-radius  : var(--radius-md);
  color          : var(--t-1);
  outline        : none;
  width          : 100%;
  transition     : border-color var(--duration-fast) var(--ease-apple),
                   box-shadow var(--duration-fast) var(--ease-apple);
  -webkit-appearance : none;
}
.input:focus {
  border-color : var(--accent);
  box-shadow   : 0 0 0 3px rgba(var(--accent-rgb), 0.15);
}
.input::placeholder { color: var(--t-3); font-weight: 400; }

/* Input montant — chiffres plus grands */
.input-amount {
  font-size      : 24px;
  font-weight    : 700;
  letter-spacing : -0.02em;
  text-align     : right;
}
```

### 9.7 Badges de statut

```css
.badge {
  display       : inline-flex;
  align-items   : center;
  gap           : var(--space-1);
  padding       : 3px 10px;
  border-radius : var(--radius-pill);
  font-size     : 12px;
  font-weight   : 600;
}

.badge-paid    { background: var(--accent-soft); color: var(--accent); }
.badge-planned { background: var(--bg-3);        color: var(--t-2); }
.badge-warning { background: rgba(217,119,6,0.10); color: var(--warning); }
.badge-over    { background: rgba(220,38,38,0.10);  color: var(--error); }
```

### 9.8 Carte objectif / projet

```css
.goal-card {
  background    : var(--gradient-goal);
  border-radius : var(--radius-xl);
  border        : 1px solid rgba(26,158,110,0.15);
  padding       : var(--space-5);
}

/* Progression de l'objectif */
.goal-progress-ring {
  /* Cercle SVG animé — filled en vert selon % atteint */
  stroke        : var(--accent);
  stroke-linecap: round;
  transition    : stroke-dashoffset var(--duration-slow) var(--ease-apple);
}
```

---

## 10. Grille & Layout

### Container mobile

```css
.screen {
  max-width  : 430px;  /* iPhone Pro Max */
  margin     : 0 auto;
  padding    : 0 var(--space-4);  /* 16px */
  min-height : 100dvh;
}
```

### Structure d'écran type (app)

```
<BottomNav />          fixed, z-index 100, glassmorphism

<screen>
  <header>             sticky, titre page + action droite
  <main>
    [HeroCard]         montant total ou résumé mois — radius-xl, accent bg
    [SectionCards]     cartes Charges / Épargne / Loisirs / Objectifs
    [ExpenseList]      liste des dépenses dans une section ouverte
  </main>
</screen>
```

### Grilles dans l'app

```css
/* Résumé 2 colonnes (ex: Budget alloué / Dépensé) */
.grid-2 {
  display               : grid;
  grid-template-columns : 1fr 1fr;
  gap                   : var(--space-3);
}

/* Résumé 4 stats (vue mensuelle rapide) */
.grid-stats {
  display               : grid;
  grid-template-columns : repeat(2, 1fr);
  gap                   : var(--space-3);
}
```

---

## 11. Tokens CSS — Fichier complet

```css
/* ════════════════════════════════════════════════════════
   KASH — Design System v1.0
   Gestion financière personnelle · Mobile-first
   ════════════════════════════════════════════════════════ */

@import url('https://fonts.bunny.net/css?family=manrope:400,500,600,700,800|caveat:600,700|jetbrains-mono:400,500,700&display=swap');

:root {

  /* ── TYPOGRAPHIE ────────────────────────────────────── */
  --font-display : "Caveat", "Brush Script MT", cursive;      /* titres (manuscrit) */
  --font-body    : "Manrope", "Helvetica Neue", sans-serif;   /* corps + sous-titres */
  --font-mono    : "JetBrains Mono", ui-monospace, "Consolas", monospace;  /* montants */

  /* ── TAILLES DE TEXTE ───────────────────────────────── */
  --text-display-l  : clamp(28px, 5vw, 48px);
  --text-display-m  : clamp(22px, 4vw, 36px);
  --text-heading-l  : 24px;
  --text-heading-m  : 20px;
  --text-heading-s  : 17px;
  --text-body-l     : 17px;
  --text-body       : 15px;
  --text-body-s     : 13px;
  --text-caption    : 12px;
  --text-eyebrow    : 11px;
  --text-stat       : clamp(32px, 7vw, 56px);

  /* ── ESPACEMENTS ────────────────────────────────────── */
  --space-1  : 4px;
  --space-2  : 8px;
  --space-3  : 12px;
  --space-4  : 16px;
  --space-5  : 24px;
  --space-6  : 32px;
  --space-7  : 48px;
  --space-8  : 64px;
  --space-9  : 96px;
  --space-10 : 128px;

  /* ── BORDER RADIUS ──────────────────────────────────── */
  --radius-sm   : 8px;
  --radius-md   : 12px;
  --radius-lg   : 16px;
  --radius-xl   : 20px;
  --radius-2xl  : 28px;
  --radius-pill : 980px;

  /* ── ANIMATIONS ─────────────────────────────────────── */
  --ease-apple    : cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring   : cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth   : cubic-bezier(0.4, 0, 0.2, 1);
  --ease-sharp    : cubic-bezier(0.4, 0, 0.6, 1);

  --duration-instant  : 100ms;
  --duration-fast     : 200ms;
  --duration-base     : 350ms;
  --duration-slow     : 600ms;
  --duration-cinematic: 900ms;
}

/* ── LIGHT MODE (défaut) ────────────────────────────── */
:root, [data-theme="light"] {

  --bg-1     : #F7F7F5;
  --bg-2     : #FFFFFF;
  --bg-3     : #EFEFED;
  --bg-4     : #E6E6E3;
  --bg-glass : rgba(247,247,245, 0.80);

  --t-1 : #181816;
  --t-2 : #6B6B68;
  --t-3 : #A8A8A5;

  --border-subtle : rgba(0,0,0, 0.06);
  --border-medium : rgba(0,0,0, 0.11);
  --border-strong : rgba(0,0,0, 0.22);

  --shadow-sm   : 0 1px 8px rgba(0,0,0,.07);
  --shadow-md   : 0 4px 20px rgba(0,0,0,.10);
  --shadow-lg   : 0 12px 40px rgba(0,0,0,.13);
  --shadow-glow : 0 0 24px rgba(26,158,110,.15);

  --accent       : #1A9E6E;
  --accent-hover : #168A5F;
  --accent-soft  : rgba(26,158,110, 0.10);
  --accent-rgb   : 26,158,110;

  --success : #1A9E6E;
  --warning : #D97706;
  --error   : #DC2626;
  --neutral : #6B6B68;

  --gradient-stat : linear-gradient(135deg, #1A9E6E 0%, #0D7A54 100%);
  --gradient-goal : linear-gradient(135deg, #F0FBF6 0%, #E0F5EC 100%);
}

/* ── DARK MODE ──────────────────────────────────────── */
[data-theme="dark"] {

  --bg-1     : #111110;
  --bg-2     : #1C1C1A;
  --bg-3     : #272724;
  --bg-4     : #323230;
  --bg-glass : rgba(17,17,16, 0.80);

  --t-1 : #F2F2EF;
  --t-2 : #8E8E8A;
  --t-3 : #5C5C59;

  --border-subtle : rgba(255,255,255, 0.07);
  --border-medium : rgba(255,255,255, 0.13);
  --border-strong : rgba(255,255,255, 0.26);

  --shadow-sm   : 0 2px 12px rgba(0,0,0,.40);
  --shadow-md   : 0 8px 32px rgba(0,0,0,.55);
  --shadow-lg   : 0 24px 64px rgba(0,0,0,.65);
  --shadow-glow : 0 0 32px rgba(34,201,138,.18);

  --accent       : #22C98A;
  --accent-hover : #1DB87A;
  --accent-soft  : rgba(34,201,138, 0.12);
  --accent-rgb   : 34,201,138;

  --success : #22C98A;
  --warning : #F59E0B;
  --error   : #F87171;
  --neutral : #8E8E8A;

  --gradient-stat : linear-gradient(135deg, #22C98A 0%, #1A9E6E 100%);
  --gradient-goal : linear-gradient(135deg, #1A2E24 0%, #162B22 100%);
}

/* ── BASE GLOBALE ───────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

html { font-size: 16px; }

body {
  font-family            : var(--font-body);
  font-size              : var(--text-body);
  color                  : var(--t-1);
  background             : var(--bg-1);
  line-height            : 1.6;
  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition             : background var(--duration-base) var(--ease-apple),
                           color var(--duration-base) var(--ease-apple);
}

/* ── ACCESSIBILITÉ ──────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration  : 0.01ms !important;
    transition-duration : 0.01ms !important;
  }
}
```

---

## 12. Checklist

À valider avant chaque composant livré.

### Couleurs & Contraste
- [ ] Texte principal sur `--bg-1` : ratio ≥ 4.5:1 (WCAG AA)
- [ ] Une seule couleur d'accent par écran
- [ ] Rouge uniquement pour les dépassements et erreurs
- [ ] Sémantique des couleurs respectée (vert = positif, rouge = dépassement)

### Typographie
- [ ] Corps de texte ≥ 15px (mobile), ≥ 17px (desktop)
- [ ] Tracking négatif sur tous les titres ≥ 20px
- [ ] Hiérarchie 3 niveaux : eyebrow → titre → corps

### Espacements
- [ ] Tous les espacements sont multiples de 4px
- [ ] Padding carte minimum 24px
- [ ] Contenu principal ne déborde pas sous la bottom nav (padding-bottom: 80px)

### Mobile
- [ ] Tap target minimum 44×44px sur tous les éléments interactifs
- [ ] `safe-area-inset-bottom` sur la bottom nav
- [ ] Pas d'animation au hover (mobile = touch)
- [ ] Inputs en 17px minimum (évite le zoom auto sur iOS)

### Composants
- [ ] Tous les CTA en border-radius pill
- [ ] Barre de progression sur chaque section budget
- [ ] Feedback visuel immédiat sur chaque action (100–200ms)

---

## 13. Journal des adaptations

### Projet : Kash
**Date :** Juin 2026
**Statut :** `[x] En cours`

#### Couleurs modifiées
| Token | Template default | Kash | Raison |
|---|---|---|---|
| `--accent` | `#2997ff` (bleu) | `#1A9E6E` (vert) | Finance = croissance, pas institution bancaire |
| `--bg-1` | `#ffffff` (blanc pur) | `#F7F7F5` (blanc chaud) | Moins agressif, plus accueillant |
| `--bg-2` | `#f5f5f7` | `#FFFFFF` | Inversion : cartes plus claires que le fond |

#### Polices modifiées
| Token | Template default | Kash | Raison |
|---|---|---|---|
| `--font-display` | `Plus Jakarta Sans` | `Caveat` (manuscrit) | Réchauffe le ton (app encourageante) — cantonné aux gros titres |
| `--font-body` | `Plus Jakarta Sans` | `Manrope` | Clarté + chiffres nets, sans la froideur d'Inter |
| `--font-mono` | `Fira Code` | `JetBrains Mono` | Chiffres tabulaires pour tous les montants |
| Fournisseur | Google Fonts | Bunny Fonts | RGPD-friendly, zéro tracking — cohérent avec une app financière |

#### Règles adaptées
- **Navigation desktop :** Sidebar gauche fixe (Dashboard / Statistiques / Reste / Historique / Objectifs / Profil)
- **Navigation mobile :** Bottom nav fixe en bas
- **Structure :** Statistiques et Reste sont des pages dédiées, pas des onglets du dashboard
- **Hero card :** Fond accent vert pour le montant total — la fierté de voir son solde bien géré
- **Input montant :** 24px / 700 / right-aligned — les chiffres sont le contenu principal

#### Notes
- Dark mode prévu mais non prioritaire — lancer d'abord en light only
- Polices chargées via **Bunny Fonts** (`fonts.bunny.net`) avec `display=swap` — RGPD-friendly, pas de requête vers Google
- Manuscrit (Caveat) **réservé aux titres** ; jamais sur un chiffre ou un montant (lisibilité + confiance)
- App responsive : sidebar desktop, bottom nav mobile
- Assets logo : à documenter quand l'intégration sera finalisée

---

*Kash Design System v1.2 · Responsive · Clarté · Fierté · Confiance*