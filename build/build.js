var gui = new dat.GUI();
var params = {
    Noise_Scale: 7,
    Noise_Amplitude: 175,
    Download_Image: function () { return save(); },
};
gui.add(params, "Noise_Scale", 0, 100, 1);
gui.add(params, "Noise_Amplitude", 0, 1000, 1);
gui.add(params, "Download_Image");
function noisy_line(x1, y1, x2, y2) {
    noiseSeed(random(1000));
    beginShape();
    for (var t = 0; t < 1; t += 0.01) {
        var x = lerp(x1, x2, t);
        var y = lerp(y1, y2, t);
        curveVertex(x + lerp(-params.Noise_Amplitude, params.Noise_Amplitude, noise(params.Noise_Scale * t)), y + lerp(-params.Noise_Amplitude, params.Noise_Amplitude, noise(params.Noise_Scale * t + 1000)));
    }
    endShape();
}
function draw() {
    randomSeed(0);
    background(0);
    stroke("white");
    noFill();
    noisy_line(100, height - 100, width - 100, 100);
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map