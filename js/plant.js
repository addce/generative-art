/**
 * Plant Class
 * Responsible for individual flora growth and rendering
 */

class Plant {
    constructor(x, y, seed) {
        this.x = x;
        this.y = y;
        this.seed = seed;

        this.lsystem = new LSystem(seed);

        const iterRandom = (seed * 13) % 1000 / 1000;
        this.iterations = Math.floor(iterRandom * 3) + 3;

        this.result = this.lsystem.generate(this.iterations);

        const lengthRandom = (seed * 17) % 1000 / 1000;
        this.baseLength = 3 + lengthRandom * 4;
        this.growthProgress = 0;
        this.growthSpeed = 0.02;
        this.isGrowing = true;

        this.totalChars = this.result.sentence.length;
    }

    /**
     * Update growth status
     */
    grow() {
        if (this.isGrowing) {
            this.growthProgress += this.growthSpeed;
            if (this.growthProgress >= 1) {
                this.growthProgress = 1;
                this.isGrowing = false;
            }
        }
    }

    /**
     * Render the flora
     * @param {object} p - p5.js instance
     * @param {object} colors - Current seasonal color palette
     */
    render(p, colors) {
        p.push();
        p.translate(this.x, this.y);

        const charsToRender = Math.floor(this.totalChars * this.growthProgress);

        const stateStack = [];

        let currentAngle = -90;
        let currentX = 0;
        let currentY = 0;

        let depth = 0;
        let maxDepth = 0;

        for (let i = 0; i < charsToRender; i++) {
            const char = this.result.sentence[i];
            if (char === '[') depth++;
            if (char === ']') depth--;
            if (depth > maxDepth) maxDepth = depth;
        }

        depth = 0;

        for (let i = 0; i < charsToRender; i++) {
            const char = this.result.sentence[i];

            switch (char) {
                case 'F':
                    const lengthFactor = Math.pow(0.85, depth);
                    const len = this.baseLength * lengthFactor;

                    const newX = currentX + len * p.cos(p.radians(currentAngle));
                    const newY = currentY + len * p.sin(p.radians(currentAngle));

                    let strokeColor;
                    if (depth <= 1) {
                        strokeColor = colors.trunk;
                    } else if (depth <= 3) {
                        strokeColor = colors.branch;
                    } else {
                        const leafIndex = (this.seed + i) % colors.leaves.length;
                        strokeColor = colors.leaves[leafIndex];
                    }

                    const thickness = Math.max(1, (maxDepth - depth + 1) * 0.8);

                    p.stroke(strokeColor.r, strokeColor.g, strokeColor.b);
                    p.strokeWeight(thickness);
                    p.line(currentX, currentY, newX, newY);

                    currentX = newX;
                    currentY = newY;
                    break;

                case 'X':
                    break;

                case '+':
                    currentAngle += this.result.angle;
                    break;

                case '-':
                    currentAngle -= this.result.angle;
                    break;

                case '[':
                    stateStack.push({
                        x: currentX,
                        y: currentY,
                        angle: currentAngle,
                        depth: depth
                    });
                    depth++;
                    break;

                case ']':
                    if (stateStack.length > 0) {
                        const state = stateStack.pop();
                        currentX = state.x;
                        currentY = state.y;
                        currentAngle = state.angle;
                        depth = state.depth;
                    }
                    break;
            }
        }

        p.pop();
    }

    /**
     * Check if flora completed growth
     */
    isFullyGrown() {
        return !this.isGrowing;
    }
}

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Plant;
}
