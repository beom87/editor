# SOL-B1-AUTHORING

-   CSS Keyframe 기반 원리 동영상 저작 도구

<br/>

# Getting Started

**Requirements**

-   Node.js 16.15.0
-   Npm 8.5.5

**Installation**

```bash
$ git clone https://git.esls.io/kec/sol-b1-authoring.git

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

![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![DMEditor](https://img.shields.io/badge/DMEditor-%23D90007.svg?style=for-the-badge)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

<br/>

# Project Structure

| 이름           | 설명                           |
| -------------- | ------------------------------ |
| apis           | 서버 통신 관련 함수 모음       |
| components     | 공통 Components                |
| editor         | 저작 도구 Library              |
| hooks          | 공통 Hooks                     |
| utils          | 유틸성 함수 모음               |
| main.tsx       | entry                          |
| AnimationModal | Animation 설정 Component       |
| Toolbox        | Toolbox Component              |
| SideContainer  | Fortmat 등 세부 설정 Component |

<br/>

# Editor

**지원하는 기능**

| 기능            | 설명                                               |
| --------------- | -------------------------------------------------- |
| Import & Export | 저장 및 불러오기                                   |
| Interaction     | Drag, Size, Rotate, etc...                         |
| Elements        | Image, Sprite, Textbox, Rect, etc...               |
| Function        | Undo, Redo, To Group, Ungroup, Grid, Order, etc... |
| Animation       | 재생, 역재생, 배속, 시간별 재생, etc...            |
| Effect          | Move, Rotate, Scale, Fade In, Fade Out, etc...     |
