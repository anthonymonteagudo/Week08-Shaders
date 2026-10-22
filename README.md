# Week 8 — Materials and shading

Original student examples connecting GLSL calculations, Unreal HLSL and Material Graph nodes.

## Start here

Open the hosted classroom at https://anthonymonteagudo.github.io/Week08-Shaders/ — no installation is needed to explore the web examples.

To edit locally: download the repository ZIP and extract it, or clone it. Open `Week08-Shaders.code-workspace` in VS Code. Install Node.js 18+ (LTS recommended) or Python 3 if neither is installed.

1. Run `npm start` from the repository root. No `npm install` is required.
2. Open http://127.0.0.1:5173 in a browser, or VS Code Command Palette → **Simple Browser: Show** → paste that address. If its webview disables WebGL, use your external browser.
3. Open a numbered lesson's `fragment.glsl`, change it and save. Click **Reload files** in the display. Shader errors appear there; your previous working material stays visible.

Windows shortcut: double-click `START-WINDOWS.cmd`. Python alternative: `python -m http.server 5173 --bind 127.0.0.1`. Do not double-click index.html: browsers block required fetches on file URLs.

## Learning route

01 Color → 02 UVs and masks → 03 Texture motion → 04 Toon response → 05 View mask → 06 Painted bands.

Each lesson contains editable GLSL, a matching UE Custom-node HLSL body, named inputs and a native-node recipe. Only GLSL executes in the browser; test HLSL in Unreal. The project is inspired by the progression and separate shader-file structure of SimonDev's course. Its paid source files are not redistributed.

## Unreal

Open `Unreal/Week08Student.uproject` in Unreal Engine 5.7. The startup map is **W08_Student_Gallery**. No MCP plugin or C++ build is required. See `Unreal/README.md` for navigation and station controls. Keep the downloaded reference assets unchanged and duplicate MIs for experiments.

## Class activities

Open `docs/activities.html`. Lab 1 investigates a supplied water material; Lab 2 begins a small original shader. Save baseline A and modified B for Week 9. A visual change is not evidence of a speed improvement.

## Sources and permissions

See `SOURCES.md` and `THIRD_PARTY_NOTICES.md`. This repository contains original classroom code/assets and the MIT-licensed Three.js runtime. External courses, game images, guest slides, Epic sample packages and meeting links are not included. Unreal Engine itself is obtained separately from Epic under its terms. No license grant is implied for linked external resources.
