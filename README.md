# Algorithmic Flora 🌿

An interactive digital forest created using **L-System (Lindenmayer System)** fractal algorithms and **p5.js**.

## Features

- **Procedural Generation**: Every flora is unique, generated from a seed based on mouse position and time.
- **Dynamic Seasons**: Smooth transitions between Spring, Summer, Autumn, and Winter with custom color palettes.
- **Interactive Growth**: Click anywhere on the ground to plant new flora and watch them grow in real-time.
- **Atmospheric Design**: Gradient backgrounds and ground textures that react to the seasonal slider.

## Controls

- **Mouse Click**: Plant a new flora at the clicked position.
- **Season Slider**: Adjust the slider at the bottom to transition between seasons.
- **Keyboard Shortcuts**:
  - `C`: Clear all flora from the canvas.
  - `R`: Reset and regenerate a few initial plants.
  - `1 - 4`: Quick switch to Spring, Summer, Autumn, or Winter.

## Technologies Used

- **p5.js**: For creative coding and canvas rendering.
- **L-System**: A string-rewriting system used to model the growth processes of plants.
- **Vanilla JS/CSS**: For structure and styling.

## Project Structure

- `index.html`: Main interface and entry point.
- `css/style.css`: Modern glassmorphism UI styling.
- `js/lsystem.js`: Core L-System logic and ruleset definitions.
- `js/plant.js`: Flora object management, growth animation, and rendering.
- `js/seasons.js`: Seasonal color management and interpolation.
- `js/sketch.js`: p5.js main loop and event handling.

## Getting Started

Simply open `index.html` in any modern web browser to start exploring the digital forest.
