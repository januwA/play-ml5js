// 图像分类器
let classifier;
let featureExtractor;

// 识别的图片
let video;
let value = "loading model...";

let slider;
let addImageButton;
let labelElem;
let trainingButton;
let saveButton;

// 加载模型时
function modelLoaded() {
  console.log("Model Loaded!");
  // 加载自己训练好的model
  classifier.load("./model.json", myModelReady);
}

// 视频准备就绪时触发
function videoReady() {
  console.log("The video is ready!");
}

function myModelReady() {
  console.log("My Model Loaded!");
  getResult();
}

// 训练时
// function whileTraining(lossValue) {
//   if (lossValue === null) {
//     // 训练完成
//     console.log("训练完成");
//     getResult();
//   } else {
//     console.log("Loss is", lossValue);
//   }
// }

async function setup() {
  createCanvas(600, 400);
  labelElem = createP();
  labelElem.html(value);
  video = createCapture(VIDEO);
  video.hide();
  featureExtractor = await ml5.featureExtractor("MobileNet", modelLoaded);
  classifier = featureExtractor.regression(video, videoReady);

  // slider = createSlider(0, 1, 0.5, 0.01);
  // addImageButton = createButton("add image");
  // addImageButton.mousePressed(() => {
  //   classifier.addImage(slider.value());
  // });
  // createElement("hr");
  // trainingButton = createButton("训练");
  // trainingButton.mousePressed(() => classifier.train(whileTraining));

  // saveButton = createButton("保存模型");
  // saveButton.mousePressed(() => classifier.save());
}

// 获取分类结果
async function getResult() {
  let r = await classifier.predict(video);
  value = r.value;
  labelElem.html(value);
  getResult();
}

function draw() {
  background(0);

  translate(width, 0); // 移到角落
  scale(-1.0, 1.0); // 向后翻转X轴
  image(video, 0, 0, width, height);

  resetMatrix();
  rectMode(CENTER);
  noStroke();
  fill(255, 100, 100);
  rect(value * width, height / 2, 50, 50);
}
