/**
 * Interpolate two colors
 *
 * @param color1 - The starting color
 * @param color2 - The end color
 * @return The interpolated color
 */
export function interpolateColor(color1: number[], color2: number[], factor = .5): number[] {
  const result: number[] = [];

  for (let i = 0; i < color1.length; i++) {
    result.push(Math.round(color1[i] + factor * (color2[i] - color1[i])));
  }

  return result;
}


/**
 * Create an array of color values between two colors
 *
 * @param color1 - The starting color
 * @param color2 - The end color
 * @param steps - The number of desired colors
 * @param opacity - The amount of transparency each color should have
 * @return The array of color values
 */
export function interpolateColors(
  color1: string,
  color2: string,
  steps: number,
  opacity: number = 1,
): string[] | undefined {
  if (!color1 || !color2 || !steps) {
    return;
  }

  // At least two steps are needed for interpolation
  if (steps < 2) {
    steps = 2;
  }

  const interpolatedColorArray: string[] = [];
  const stepFactor: number = 1 / (steps - 1);
  const color1Strings: RegExpMatchArray | null = color1.match(/\d+/g);
  const color2Strings: RegExpMatchArray | null = color2.match(/\d+/g);
  const color1Numbers: number[] | null = color1Strings ? color1Strings.map(Number) : null;
  const color2Numbers: number[] | null = color2Strings ? color2Strings.map(Number) : null;

  if (!color1Numbers || !color2Numbers) {
    return;
  }

  for (let i = 0; i < steps; i++) {
    const color = interpolateColor(color1Numbers, color2Numbers, stepFactor * i);
    interpolatedColorArray.push(`rgba(${color},${opacity})`);
  }

  return interpolatedColorArray;
}


/**
 * Interpolate an array of colors
 *
 * @param colors - The array of RGB colors
 * @param steps - The number of steps between each color
 * @param opacity - The amount of transparency each color should have
 * @return The array of RGB color steps
 */
export function interpolateManyColors(
  colors: string[],
  steps: number,
  opacity?: number,
): string[] {
  const final: string[] = [];
  // There is a hard minimum of 2 steps
  if (steps < 2) {
    steps = 2;
  }

  for (let i = 0; i < colors.length; i += 1) {
    if (colors[i] && colors[i + 1]) {
      const c = interpolateColors(colors[i], colors[i + 1], steps, opacity);
      // istanbul ignore else
      if (c) {
        // The first item of subsequent sets will be the same as the last item of the previous step
        if (i > 0) {
          c.shift();
        }
        final.push(...c);
      }
    }
  }

  return final;
}
