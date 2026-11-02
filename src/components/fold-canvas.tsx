"use client";

import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Treats the photo as a creased sheet: straight fold lines give each facet its
// own slope, which offsets the image and catches the light.
const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uRes;
  uniform vec2 uImage;
  uniform vec2 uMouse;
  uniform float uFold;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    float canvas = uRes.x / uRes.y;
    float image = uImage.x / uImage.y;
    vec2 scale = canvas > image ? vec2(1.0, image / canvas) : vec2(canvas / image, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

  void crease(vec2 p, vec2 dir, float freq, float offset, float amp, inout vec2 slope) {
    float k = fract(dot(p, dir) * freq + offset) - 0.5;
    slope += amp * freq * sign(k) * dir;
  }

  float grain(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    vec2 m = vec2(uMouse.x * aspect, uMouse.y);

    vec2 slope = vec2(0.0);
    crease(p, normalize(vec2(1.0, 0.18)), 2.0, 0.15, 0.32, slope);
    crease(p, normalize(vec2(-0.24, 1.0)), 2.0, 0.4, 0.3, slope);
    crease(p, normalize(vec2(0.82, 0.62)), 1.3, 0.05, 0.22, slope);
    crease(p, normalize(vec2(-0.7, 0.74)), 1.7, 0.6, 0.16, slope);

    // Creases also rise around the pointer, on top of the scroll-driven fold.
    float near = smoothstep(0.42, 0.0, distance(p, m)) * uHover;
    float amount = clamp(uFold + near * 0.5, 0.0, 1.0);
    slope *= amount;

    vec2 uv = cover(vUv + slope * 0.035);
    vec3 color = texture2D(tMap, uv).rgb;

    vec3 normal = normalize(vec3(-slope, 1.0));
    float light = dot(normal, normalize(vec3(-0.5, 0.65, 0.6)));
    float flat_light = 0.6 / length(vec3(-0.5, 0.65, 0.6));
    color *= 1.0 + (light - flat_light) * 1.5;

    float g = grain(vUv * uRes + fract(uTime) * 91.0) - 0.5;
    color += g * 0.045;

    gl_FragColor = vec4(color, 1.0);
  }
`;

type FoldCanvasProps = {
  src: string;
  className?: string;
  // Unfold as the photo scrolls into view, rather than on page load.
  unfoldOnEnter?: boolean;
};

export function FoldCanvas({
  src,
  className,
  unfoldOnEnter = false,
}: FoldCanvasProps) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || !window.matchMedia(MOTION_OK).matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        dpr: Math.min(window.devicePixelRatio, 1.5),
      });
    } catch {
      return; // No WebGL: the image underneath stays as it is.
    }

    const { gl } = renderer;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .5s";
    el.appendChild(canvas);

    const texture = new Texture(gl, { generateMipmaps: false });
    const uniforms = {
      tMap: { value: texture },
      uRes: { value: [1, 1] },
      uImage: { value: [3, 2] },
      uMouse: { value: [0.5, 0.5] },
      uFold: { value: 1 },
      uHover: { value: 0 },
      uTime: { value: 0 },
    };
    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex, fragment, uniforms }),
    });

    const state = { intro: 1, scroll: 0, hover: 0, targetHover: 0 };
    const target = { x: 0.5, y: 0.5 };
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    const observer = new ResizeObserver(resize);
    observer.observe(el);
    resize();

    const parent = el.parentElement ?? el;
    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      target.x = (event.clientX - box.left) / box.width;
      target.y = 1 - (event.clientY - box.top) / box.height;
      state.targetHover = 1;
    };
    const onLeave = () => {
      state.targetHover = 0;
    };
    if (finePointer) {
      parent.addEventListener("pointermove", onMove);
      parent.addEventListener("pointerleave", onLeave);
    }

    const image = new Image();
    let introTween: gsap.core.Tween | undefined;
    image.onload = () => {
      texture.image = image;
      uniforms.uImage.value = [image.naturalWidth, image.naturalHeight];
      canvas.style.opacity = "1";
      if (unfoldOnEnter) return;
      introTween = gsap.to(state, {
        intro: 0,
        duration: 2.2,
        delay: 0.2,
        ease: "power3.inOut",
      });
    };
    image.src = src;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        state.scroll = self.progress;
      },
    });

    const enterTrigger = unfoldOnEnter
      ? ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            state.intro = 1 - self.progress;
          },
        })
      : undefined;

    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(el);

    const render = (time: number) => {
      if (!visible || !texture.image) return;
      const mouse = uniforms.uMouse.value;
      mouse[0] += (target.x - mouse[0]) * 0.08;
      mouse[1] += (target.y - mouse[1]) * 0.08;
      state.hover += (state.targetHover - state.hover) * 0.06;
      uniforms.uHover.value = state.hover;
      uniforms.uFold.value = Math.min(1, state.intro + state.scroll * 0.9);
      uniforms.uTime.value = time;
      renderer.render({ scene: mesh });
    };
    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      introTween?.kill();
      trigger.kill();
      enterTrigger?.kill();
      observer.disconnect();
      visibility.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      image.onload = null;
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src, unfoldOnEnter]);

  return <div ref={host} aria-hidden="true" className={className} />;
}
