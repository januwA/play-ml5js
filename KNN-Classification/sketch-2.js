// 图像分类器
let featureExtractor;
let knnClassifier;

// 识别的图片
let video;
let value;

let labelElem;
let ready = false;

// 加载模型时
function modelLoaded() {
  console.log("Model Loaded!");
}

async function setup() {
  createCanvas(600, 400);
  labelElem = createP("需要训练模型");
  video = createCapture(VIDEO);
  video.hide();

  // 创建一个KNN分类器
  knnClassifier = ml5.KNNClassifier();

  // 创建一个可以提取图像特征的FeatureExtractor
  featureExtractor = await ml5.featureExtractor("MobileNet", modelLoaded);
}

function keyPressed() {
  // 获取图像的特征
  const features = featureExtractor.infer(video);
  if (keyCode === LEFT_ARROW) {
    // 将带有标签的示例添加到KNN分类器
    console.log("left");
    knnClassifier.addExample(features, "left");
  } else if (keyCode === RIGHT_ARROW) {
    console.log("right");
    knnClassifier.addExample(features, "right");
  } else if (keyCode === UP_ARROW) {
    console.log("up");
    knnClassifier.addExample(features, "up");
  }
}

function getResult() {
  const features = featureExtractor.infer(video);
  knnClassifier.classify(features, function(err, result) {
    // console.log(result); // result.label是预测的标签
    labelElem.html(result.label);
    getResult();
  });
}

function draw() {
  background(0);
  translate(width, 0); // 移到角落
  scale(-1.0, 1.0); // 向后翻转X轴
  image(video, 0, 0, width, height);

  if (!ready && knnClassifier.getNumLabels() > 0) {
    getResult();
    ready = true;
  }
}
