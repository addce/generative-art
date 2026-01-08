/**
 * Season System Module
 * Manages seasonal color palettes and transition effects
 */

class SeasonSystem {
    constructor() {
        // Seasonal palette definitions
        this.palettes = {
            // Spring - Fresh Green, Pink (Cherry Blossom), Light Purple
            spring: {
                trunk: { r: 101, g: 67, b: 33 },
                branch: { r: 139, g: 90, b: 43 },
                leaves: [
                    { r: 144, g: 238, b: 144 },
                    { r: 152, g: 251, b: 152 },
                    { r: 255, g: 182, b: 193 },
                    { r: 255, g: 192, b: 203 },
                    { r: 221, g: 160, b: 221 }
                ],
                background: { r: 240, g: 248, b: 255 },
                ground: { r: 124, g: 252, b: 0 }
            },
            // Summer - Deep Green, Emerald
            summer: {
                trunk: { r: 92, g: 64, b: 51 },
                branch: { r: 119, g: 85, b: 51 },
                leaves: [
                    { r: 34, g: 139, b: 34 },
                    { r: 0, g: 128, b: 0 },
                    { r: 50, g: 205, b: 50 },
                    { r: 60, g: 179, b: 113 },
                    { r: 46, g: 139, b: 87 }
                ],
                background: { r: 135, g: 206, b: 235 },
                ground: { r: 34, g: 139, b: 34 }
            },
            // Autumn - Orange, Gold, Brown
            autumn: {
                trunk: { r: 85, g: 55, b: 35 },
                branch: { r: 110, g: 75, b: 45 },
                leaves: [
                    { r: 255, g: 140, b: 0 },
                    { r: 255, g: 165, b: 0 },
                    { r: 255, g: 69, b: 0 },
                    { r: 218, g: 165, b: 32 },
                    { r: 205, g: 92, b: 92 },
                    { r: 178, g: 34, b: 34 }
                ],
                background: { r: 255, g: 228, b: 196 },
                ground: { r: 210, g: 180, b: 140 }
            },
            // Winter - Grey, White, Dark Brown
            winter: {
                trunk: { r: 75, g: 60, b: 50 },
                branch: { r: 100, g: 80, b: 60 },
                leaves: [
                    { r: 169, g: 169, b: 169 },
                    { r: 192, g: 192, b: 192 },
                    { r: 139, g: 119, b: 101 },
                    { r: 160, g: 140, b: 120 }
                ],
                background: { r: 220, g: 230, b: 240 },
                ground: { r: 245, g: 245, b: 245 }
            }
        };

        // Season order (for interpolation)
        this.seasonOrder = ['spring', 'summer', 'autumn', 'winter'];
    }

    /**
     * Interpolate between two colors
     */
    lerpColor(c1, c2, t) {
        return {
            r: Math.round(c1.r + (c2.r - c1.r) * t),
            g: Math.round(c1.g + (c2.g - c1.g) * t),
            b: Math.round(c1.b + (c2.b - c1.b) * t)
        };
    }

    /**
     * Interpolate between two palettes
     */
    lerpPalette(p1, p2, t) {
        const result = {
            trunk: this.lerpColor(p1.trunk, p2.trunk, t),
            branch: this.lerpColor(p1.branch, p2.branch, t),
            leaves: [],
            background: this.lerpColor(p1.background, p2.background, t),
            ground: this.lerpColor(p1.ground, p2.ground, t)
        };

        // Interpolate leaf colors (take the minimum count of leaves between palettes)
        const leafCount = Math.min(p1.leaves.length, p2.leaves.length);
        for (let i = 0; i < leafCount; i++) {
            result.leaves.push(this.lerpColor(p1.leaves[i], p2.leaves[i], t));
        }

        return result;
    }

    /**
     * Get colors for specific time t (0-1) across seasons
     * 0 = Spring, 0.33 = Summer, 0.66 = Autumn, 1 = Winter
     */
    getSeasonColors(t) {
        const scaledT = t * (this.seasonOrder.length - 1);
        const index1 = Math.floor(scaledT);
        const index2 = Math.min(index1 + 1, this.seasonOrder.length - 1);
        const blend = scaledT - index1;

        const season1 = this.seasonOrder[index1];
        const season2 = this.seasonOrder[index2];

        return this.lerpPalette(this.palettes[season1], this.palettes[season2], blend);
    }

    /**
     * Get the name of current season
     */
    getSeasonName(t) {
        if (t < 0.25) return '🌸 Spring';
        if (t < 0.5) return '🌿 Summer';
        if (t < 0.75) return '🍂 Autumn';
        return '❄️ Winter';
    }

    /**
     * Convert color object to CSS color string
     */
    toCSS(color) {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    /**
     * Convert color object to p5.js array
     */
    toP5(color) {
        return [color.r, color.g, color.b];
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SeasonSystem;
}
