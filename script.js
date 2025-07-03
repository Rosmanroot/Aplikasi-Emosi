const video = document.getElementById('video');
const faceResult = document.getElementById('faceEmotionResult');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo);
  

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => console.error("Gagal mengakses kamera:", err));
}

video.addEventListener('play', () => {
  const canvas = document.getElementById('overlay');
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions();

    const resized = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resized);
    faceapi.draw.drawFaceExpressions(canvas, resized);

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxExp = Object.entries(expressions).reduce((a, b) => a[1] > b[1] ? a : b);
      faceResult.textContent = `Ekspresi dominan: ${maxExp[0]} (${(maxExp[1]*100).toFixed(1)}%)`;
    } else {
      faceResult.textContent = "Wajah tidak terdeteksi.";
    }
  }, 1000);
});

if (detections.length > 0) {
  const exp = detections[0].expressions;
  const max = Object.entries(exp).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];

  let label = "Netral", emoji = "😐";

  switch (max) {
    case "happy":
      label = "Senang";
      emoji = "😊";
      break;
    case "sad":
      label = "Sedih";
      emoji = "😢";
      break;
    case "angry":
      label = "Marah";
      emoji = "😠";
      break;
    // Selain itu semua dianggap Netral
    default:
      label = "Netral";
      emoji = "😐";
      break;
  }

  if (label !== latestFaceEmotion) {
    latestFaceEmotion = label;
    document.getElementById("faceEmotionLabel").textContent = `${label} ${emoji}`;
    updateCombinedEmotionResult();
    updateGraphAndHeatmap("Wajah", label);
  }
} else {
  latestFaceEmotion = null;
  document.getElementById("faceEmotionLabel").textContent = "Tidak terdeteksi";
  updateCombinedEmotionResult();
}

