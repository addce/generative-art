/**
 * Algorithmic Flora
 * p5.js Main Module
 * 
 * Create a never-repeating digital forest using L-System fractal algorithms.
 */

// Global variables
let plants = [];
let seasonSystem;
let seasonSlider;
let seasonLabel;
let currentSeason = 0.5; // Default: Autumn

// 画布设置
const GROUND_HEIGHT = 80;

/**
 * p5.js Initialization
 */
function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');

    seasonSystem = new SeasonSystem();

    seasonSlider = select('#season-slider');
    seasonLabel = select('#season-label');

    if (seasonSlider) {
        seasonSlider.value(currentSeason * 100);
    }

    addInitialPlants();

    // Set anti-aliasing
    smooth();
}

/**
 * Add initial example flora
 */
function addInitialPlants() {
    const numInitial = 5;
    for (let i = 0; i < numInitial; i++) {
        const x = width * (0.15 + i * 0.175);
        const y = height - GROUND_HEIGHT;
        const seed = Date.now() + i * 12345;
        plants.push(new Plant(x, y, seed));
    }
}

/**
 * p5.js Main Loop
 */
function draw() {
    if (seasonSlider) {
        currentSeason = parseFloat(seasonSlider.value()) / 100;
    }

    const colors = seasonSystem.getSeasonColors(currentSeason);

    if (seasonLabel) {
        seasonLabel.html(seasonSystem.getSeasonName(currentSeason));
    }

    drawBackground(colors);

    drawGround(colors);

    for (let plant of plants) {
        plant.grow();
        plant.render(window, colors);
    }

    drawHelpText();
}

/**
 * Draw background with gradient
 */
function drawBackground(colors) {
    // Create vertical gradient
    const topColor = colors.background;
    const bottomColor = {
        r: Math.max(0, topColor.r - 30),
        g: Math.max(0, topColor.g - 20),
        b: Math.max(0, topColor.b - 10)
    };

    for (let y = 0; y < height - GROUND_HEIGHT; y++) {
        const t = y / (height - GROUND_HEIGHT);
        const r = lerp(topColor.r, bottomColor.r, t);
        const g = lerp(topColor.g, bottomColor.g, t);
        const b = lerp(topColor.b, bottomColor.b, t);
        stroke(r, g, b);
        line(0, y, width, y);
    }
}

/**
 * Draw ground
 */
function drawGround(colors) {
    noStroke();

    fill(colors.ground.r, colors.ground.g, colors.ground.b);
    rect(0, height - GROUND_HEIGHT, width, GROUND_HEIGHT);

    const groundTop = height - GROUND_HEIGHT;
    for (let i = 0; i < 50; i++) {
        const x = random(width);
        const y = groundTop + random(GROUND_HEIGHT);
        const size = random(2, 5);

        fill(
            colors.ground.r * 0.9,
            colors.ground.g * 0.9,
            colors.ground.b * 0.9,
            100
        );
        ellipse(x, y, size, size * 0.5);
    }
}

/**
 * Draw help text
 */
function drawHelpText() {
    push();
    textAlign(LEFT, TOP);
    textSize(14);
    fill(80, 80, 80, 180);
    noStroke();

    fill(255, 255, 255, 150);
    rect(10, 10, 320, 50, 8);

    fill(60, 60, 60);
    text('🌱 Click anywhere to plant new flora', 20, 20);
    text('🎨 Use the slider below to adjust seasons', 20, 40);
    pop();
}

/**
 * Resize canvas when window size changes
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/**
 * Mouse Click Event - Generate new flora
 */
function mousePressed() {
    if (mouseY < height - GROUND_HEIGHT - 20 && mouseY > 70) {
        const seed = Date.now() + mouseX * 1000 + mouseY;
        const plantY = height - GROUND_HEIGHT;
        const newPlant = new Plant(mouseX, plantY, seed);

        plants.push(newPlant);

        // Limit maximum flora count for performance
        if (plants.length > 30) {
            plants.shift(); // Remove oldest flora
        }
    }
}

/**
 * Keyboard Events
 */
function keyPressed() {
    if (key === 'c' || key === 'C') {
        plants = [];
    }
    if (key === 'r' || key === 'R') {
        plants = [];
        addInitialPlants();
    }

    if (key === '1') {
        currentSeason = 0;
        if (seasonSlider) seasonSlider.value(0);
    }
    if (key === '2') {
        currentSeason = 0.33;
        if (seasonSlider) seasonSlider.value(33);
    }
    if (key === '3') {
        currentSeason = 0.66;
        if (seasonSlider) seasonSlider.value(66);
    }
    if (key === '4') {
        currentSeason = 1;
        if (seasonSlider) seasonSlider.value(100);
    }
}
