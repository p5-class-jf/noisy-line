// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Noise_Scale: 7,
    Noise_Amplitude: 175,
    Download_Image: () => save(),
}
gui.add(params, "Noise_Scale", 0, 100, 1)
gui.add(params, "Noise_Amplitude", 0, 1000, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function noisy_line(x1: number, y1: number, x2: number, y2: number) {
    noiseSeed(random(1000))
    beginShape()
    for (let t = 0; t < 1; t += 0.01) {
        const x = lerp(x1, x2, t)
        const y = lerp(y1, y2, t)
        curveVertex(
            x + lerp(-params.Noise_Amplitude, params.Noise_Amplitude, noise(params.Noise_Scale * t)),
            y + lerp(-params.Noise_Amplitude, params.Noise_Amplitude, noise(params.Noise_Scale * t + 1000))
        )
    }
    endShape()
}

function draw() {
    randomSeed(0)
    background(0)
    stroke("white")
    noFill()
    noisy_line(100, height-100, width-100, 100)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}