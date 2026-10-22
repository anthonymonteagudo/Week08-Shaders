# Unreal student gallery

Open `Week08Student.uproject` in **Unreal Engine 5.7**. Authored and tested with 5.7.4. Shader compilation on first launch can take several minutes. This is an editor exploration project; press Play is not required. No course MCP plugin or C++ compilation is needed.

The startup map is `/Game/Week08/00_Maps/W08_Student_Gallery`. Follow the teal aisle through the numbered bays. Use the World Outliner folders and named CameraActors. Right mouse + WASD flies; F frames a selected object. To inspect a preset view, select its CameraActor and use Pilot from its context menu.

1. Code to material: six lessons, native Graph in front, HLSL behind.
2. Opacity and coverage: opaque, translucent and masked surfaces.
3. Water motion: three rows, four steps per row, shared restrained finish.
4. Palette and shading: smooth, bands, a teal/coral palette, brush and pixel effects.
5. Fresnel and view angle: pale or dark purple edges, plus pixel shading.
6. Lighting and surface: actual key / fill / rim lights on Default Lit surfaces.

Select a display. In Details > Materials open its MI. Duplicate that MI into your own folder before changing it, and assign your copy back to the display. Enable a parameter's override checkbox, then change its value. Open the parent material from the MI editor to inspect commented calculation sections.

Material Instance controls differ by parent. Some feature controls are static switches and can compile a different shader; a zero scalar may only hide a visible contribution. Do not infer GPU time from these switches or from node counts. Save A/B conditions for Week 9.

Lesson 01 uses `01_Tint/M_Tint_Graph` and `01_Tint/M_Tint_HLSL`, with `MI_Source` providing the untinted baseline. Lessons 02–06 use the matching Graph and Custom-node materials under `08_StudentLessons`; exact paths are in `lessons.json`. The pixel-normal approximation uses a small HLSL Custom expression even in the larger native lighting graph. Water and lighting are teaching studies, not complete production rendering systems.

If assets appear gray, wait for shader compilation and check the Output Log. Keep the whole Content folder structure. This project references Epic's built-in BasicShapes and engine material functions; Unreal supplies those. Epic Content Examples is an optional separate download and is not redistributed here.

See `gallery.json` for assigned material instances, `lessons.json` for exact code pairs, and `asset-manifest.json` for the exported files. No source-control workspace, cached shaders, private project config or external paid-course code is included.
