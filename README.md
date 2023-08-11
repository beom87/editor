# Animation Authoring

-   Web Animations API 기반 Animation 저작 도구
-   Animation & KeyframeEffect

<br/>

# Getting Started

**Requirements**

-   Node.js 16.15.0
-   Npm 8.5.5

**Installation**

```bash
$ git clone https://github.com/beom87/editor.git

$ npm ci

$ npm run dev
```

<br/>

# Stacks

**Environment**  
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)

**Config**  
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

**Development**  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DMEditor](https://img.shields.io/badge/DMEditor-%23D90007.svg?style=for-the-badge)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

<br/>

# Project Structure

| Name       | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| assets     | styles, images, sounds, etc...                              |
| atoms      | jotai(전역 상태 관리)                                       |
| Authoring  | 저작 도구 Components<br/>Toolbox, Canvas, Format, Animation |
| components | 공통 Components                                             |
| editor     | 저작 도구 Library                                           |
| main.tsx   | entry                                                       |

<br/>

# Editor

**지원하는 기능**

| Function           | Description                                        |
| ------------------ | -------------------------------------------------- |
| Import & Export    | 저장하기 및 불러오기                                  |
| Interaction        | Drag, Size, Rotate, etc...                         |
| Elements           | Image, Textbox, Rect, etc...                       |
| Features           | Undo, Redo, To Group, Ungroup, Grid, Order, etc... |
| Animation          | 재생, 역재생, 배속, 시간별 재생, etc...            |
| Effect             | Move, Rotate, Scale, Fade In, Fade Out, etc...     |
| Keyboard Short cut | ctrl+C(copy), ctrl+v(paste), ctrl+x(cut), etc...   |
