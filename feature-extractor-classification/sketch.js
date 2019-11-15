// 图像分类器
let classifier;
let featureExtractor;

// 识别的图片
let video;

let labelElem;
let buttons = ["冯", "赵"];
let trainingButton;

// 加载模型时
function modelLoaded() {
  console.log("Model Loaded!");
}

// 视频准备就绪时触发
function videoReady() {
  console.log("The video is ready!");
}

// 训练时
function whileTraining(lossValue) {
  if (lossValue === null) {
    // 训练完成
    console.log("训练完成");
    getResult();
  } else {
    console.log("Loss is", lossValue);
  }
}

async function setup() {
  createCanvas(600, 400);
  labelElem = createP();
  video = createCapture(VIDEO);
  video.hide();
  featureExtractor = await ml5.featureExtractor("MobileNet", modelLoaded);
  classifier = featureExtractor.classification(video, videoReady);

  createButtons();
  createElement("hr");
  trainingButton = createButton("训练");
  trainingButton.mousePressed(() => classifier.train(whileTraining));
}

function createButtons() {
  for (const text of buttons) {
    const btn = createButton(text);
    btn.mousePressed(() => {
      classifier.addImage(text);
    });
  }
}

// 获取分类结果
async function getResult() {
  let r = await classifier.classify(video);
  labelElem.html(`${r[0].label} - ${r[0].confidence}`);
  getResult();
}

function draw() {
  background(0);
  translate(width, 0); // 移到角落
  scale(-1.0, 1.0); // 向后翻转X轴
  image(video, 0, 0, width, height);
}
