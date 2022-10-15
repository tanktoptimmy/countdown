import React, { useRef, useEffect } from 'react';
import { createNoise3D } from "simplex-noise";
import './Canvas.css'

const Canvas: React.FC<Props> = ({resolution, speed, scale, bgColours}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const tRef = useRef(0);
  const rafRef = useRef(0);
  const simplex = useRef(createNoise3D());

  

  const lerp = (x:number, x1:number, x2:number, y1:number, y2:number) =>
      y1 + (x - x1) * ((y2 - y1) / (x2 - x1));

    const getPixel = (noise:number, palette: number[][]) => {
      const rgb = [];

      for (let i = 0; i < 3; i++) {
        rgb.push(lerp(Math.abs(noise), 0, 1, palette[0][i], palette[1][i]));
      }
      return rgb;
    };
    const palette = [
      [bgColours[0].rgba.r, bgColours[0].rgba.g, bgColours[0].rgba.b],
      [bgColours[1].rgba.r, bgColours[1].rgba.g, bgColours[1].rgba.b],
    ];

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const render = () => {
        const ctx = canvasCtxRef.current;
        if(!ctx) return;
        const imageData = ctx.createImageData(resolution, resolution);
        for (let x = 0; x < resolution; x++) {
          for (let y = 0; y < resolution; y++) {
            const index = (x + y * resolution) * 4;
            const noise = simplex.current(x / scale, y / scale, tRef.current / (1000/speed))
            const pixel = getPixel(noise, palette);
            imageData.data[index] = pixel[0];
            imageData.data[index + 1] = pixel[1];
            imageData.data[index + 2] = pixel[2];
            imageData.data[index + 3] = 255;
          }
        }
        tRef.current++;
        ctx.putImageData(imageData, 0, 0);
        rafRef.current = requestAnimationFrame(render);
      }
      rafRef.current = requestAnimationFrame(render);
      return () => cancelAnimationFrame(rafRef.current);
    }
  }, []);

  return <canvas ref={canvasRef} className="canvas" height="100px"></canvas>;
};

type Props ={
  resolution: number
  speed: number
  scale: number
}

export default Canvas;


