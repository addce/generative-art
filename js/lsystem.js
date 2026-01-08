/**
 * L-System (Lindenmayer System) Core Module
 * Grammar system for generating fractal flora
 */

class LSystem {
    constructor(seed = null) {
        this.seed = seed || Date.now();
        this.randomState = this.seed;

        this.rulesets = [
            {
                axiom: 'F',
                rules: { 'F': 'FF+[+F-F-F]-[-F+F+F]' },
                angle: 25,
                name: 'classic_tree'
            },
            {
                axiom: 'F',
                rules: { 'F': 'F[+F]F[-F][F]' },
                angle: 20,
                name: 'bush'
            },
            {
                axiom: 'X',
                rules: {
                    'X': 'F+[[X]-X]-F[-FX]+X',
                    'F': 'FF'
                },
                angle: 25,
                name: 'fern'
            },
            {
                axiom: 'F',
                rules: { 'F': 'F[+F]F[-F]F' },
                angle: 25.7,
                name: 'elegant_tree'
            },
            {
                axiom: 'F',
                rules: { 'F': 'FF+[+F-F-F]-[-F+F+F]' },
                angle: 22.5,
                name: 'flower'
            },
            {
                axiom: 'X',
                rules: {
                    'X': 'F[+X][-X]FX',
                    'F': 'FF'
                },
                angle: 30,
                name: 'tall_tree'
            }
        ];
    }

    /**
     * Simple pseudo-random number generator (seedable/reproducible)
     */
    random() {
        this.randomState = (this.randomState * 1103515245 + 12345) & 0x7fffffff;
        return (this.randomState % 1000) / 1000;
    }

    /**
     * Select a ruleset based on seed
     */
    selectRuleset() {
        const index = Math.floor(this.random() * this.rulesets.length);
        return { ...this.rulesets[index] };
    }

    /**
     * Randomly mutate the ruleset for diversity
     */
    mutateRuleset(ruleset) {
        ruleset.angle += (this.random() - 0.5) * 10;
        ruleset.angle = Math.max(15, Math.min(35, ruleset.angle));

        return ruleset;
    }

    /**
     * Generate L-System string
     * @param {number} iterations - Number of iterations
     * @returns {object} Contains generated string and parameters
     */
    generate(iterations = 4) {
        let ruleset = this.selectRuleset();
        ruleset = this.mutateRuleset(ruleset);

        let current = ruleset.axiom;

        for (let i = 0; i < iterations; i++) {
            let next = '';
            for (let char of current) {
                if (ruleset.rules[char]) {
                    next += ruleset.rules[char];
                } else {
                    next += char;
                }
            }
            current = next;
        }

        return {
            sentence: current,
            angle: ruleset.angle,
            name: ruleset.name,
            iterations: iterations
        };
    }
}

// Export for other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LSystem;
}
