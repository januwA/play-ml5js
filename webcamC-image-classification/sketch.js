// 图像分类器
let classifier;

// 识别的图片
let video;

let labelElem;

async function setup() {
  createCanvas(600, 400);
  labelElem = createP();
  video = createCapture(VIDEO);
  video.hide();
  classifier = await ml5.imageClassifier('MobileNet', video);
  getResult();
}

// 获取分类结果
async function getResult() {
  let r = await classifier.classify();
  // console.log(r);
  labelElem.html(r[0].label);
  getResult();
}

function draw() {
  background(0);
  translate(width, 0); // 移到角落
  scale(-1.0, 1.0); // 向后翻转X轴
  image(video, 0, 0, width, height);
}
