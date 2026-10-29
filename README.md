# Weeks 8–9 — Materials and shading

[Open the classroom](https://anthonymonteagudo.github.io/Week08-Shaders/) · [Slides](https://anthonymonteagudo.github.io/Week08-Shaders/docs/slides/) · [Activities](docs/activities.html)

## Week 9

[Open all Week 9 materials](https://anthonymonteagudo.github.io/Week08-Shaders/week09/): slides, lab references, shader cheat sheet and final-project outline. Finish your existing shader; the advanced references are optional. The instructor demo’s paid editable source assets are not redistributed here.

## Edit a shader

1. Download and extract [the current ZIP](https://github.com/anthonymonteagudo/Week08-Shaders/archive/refs/heads/main.zip), or clone this repository.
2. Open `Week08-Shaders.code-workspace` in VS Code. Run `npm start` with Node.js 18+; no `npm install` is needed. Windows: `START-WINDOWS.cmd`. Python alternative: `python -m http.server 5173 --bind 127.0.0.1`.
3. Open <http://127.0.0.1:5173>. Edit a lesson's `fragment.glsl`, save, and click **Reload files**. Open through the server, not by double-clicking HTML.

Lessons: **01 Tint → 02 Mask → 03 Texture motion → 04 Toon → 05 View edge**; **06 Painted bands** is optional. The browser runs GLSL. Each lesson also shows matching Unreal HLSL, node instructions, and its lecture links.

## Open Unreal

Open `Unreal/Week08Student.uproject` in **UE 5.7** (authored in 5.7.4). Wait for initial shader compilation. The startup map is **W08_Student_Gallery**; explore in the editor. No C++ build or course plugin is needed.

Right mouse + WASD moves; F frames a selection. Select a display, open its material instance in **Details → Materials**, duplicate the instance into your own folder, and assign your copy to the display. Enable the parameter's override checkbox before editing. Keep the Content folder structure intact.

## Class materials

- [Guide](docs/class-guide.html): gallery route and essential concepts.
- [Activities](docs/activities.html): water investigation and original shader.
- [References](docs/dig-deeper.html): three starting routes and the function lookup.
- [Ned's slides](docs/guest/Rasterization.pdf): download to annotate.

Use Canvas for deadlines and submission requirements. Save baseline A and changed B for Week 9; appearance alone does not establish performance. See [permissions and credits](THIRD_PARTY_NOTICES.md).

## Another machine: Week9

Clone this repository or download and extract its complete ZIP. Open `week09/slides/index.html` directly for the46-slide offline viewer; no Node or Python is needed for those slides, the lab or cheat sheet. External videos require internet. Run `START-WINDOWS.cmd` for interactive Week8 shaders. The public repository includes Week8Student, not the licensed Week9 instructor scene; the instructor has a separate private release bundle.
