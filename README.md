# Portfolio (Angular)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Screenshots](#screenshots)  
5. [Getting Started](#getting-started)  
   - Prerequisites
   - Installation
   - Running Locally
   - Set your own data
6. [License](#license)

---

## Overview

Portfolio-public is a personal portfolio website built with **Angular**. It showcases projects, experience, skills, and contact information in a clean, performant, and responsive interface.

---

## Features

- Responsive design (desktop, tablet, mobile)  
- Smooth navigation & scroll animations  
- Sections for about me, experience, projects  
- Easy to extend / maintain

---

## Tech Stack

- **Framework**: Angular (version 20)  
- **Language**: TypeScript, HTML, SCSS  
- **Build / Tools**: Angular CLI
- **Others**: RxJS, PrimeNG

---

## Screenshots

![Homepage Screenshot](/rescources/about-me.png)  
![Experience Section](/rescources/experience.png)  

**Live demo**: [kamil.kopciuch.org](https://kamil.kopciuch.org)

---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js (>= 22.16.0)  
- npm  (>= 10.9.2)
- Angular CLI (>= 20.1.4)


### Installation

```bash
npm install -g @angular/cli
```

### Running Locally

```bash
ng serve
```


### Set your own data

Localization files live in `public/i18n/`:
- `en.json` — English
- `pl.json` — Polish

Edit the values to match your details (keep the keys the same).  
After saving, restart the dev server if changes don’t show up.

---

## License
This project is licensed under the MIT License – see the [LICENSE](https://github.com/kamkop99/portfolio-public?tab=MIT-1-ov-file) file for details.