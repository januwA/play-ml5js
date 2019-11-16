// 图像分类器
let featureExtractor;
let knnClassifier;

// 识别的图片
let video;
let value;

let label;
let labelElem;
let ready = false;

let x, y;

// 加载模型时
function modelLoaded() {
  console.log("Model Loaded!");

  // 创建一个KNN分类器
  knnClassifier = ml5.KNNClassifier();
  knnClassifier.load("./model.json", () => {
    getResult();
  });
}

async function setup() {
  createCanvas(600, 400);
  video = createCapture(VIDEO);
  video.style('transform', "scale(-1, 1)")
  // video.hide();

  // 创建一个可以提取图像特征的FeatureExtractor
  featureExtractor = await ml5.featureExtractor("MobileNet", modelLoaded);
  labelElem = createP("需要训练模型");

  x = width / 2;
  y = height / 2;
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
  } else if (keyCode === DOWN_ARROW) {
    console.log("down");
    knnClassifier.addExample(features, "down");
  } else if (key === "s") {
    console.log("save");
    // knnClassifier.save("model.json");
    save(knnClassifier, "model.json");
  }
}

function getResult() {
  const features = featureExtractor.infer(video);
  knnClassifier.classify(features, function(err, result) {
    // console.log(result); // result.label是预测的标签,但是在使用model.json却变成了key值
    label = result.label;
    labelElem.html(label);
    getResult();
  });
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  ellipse(x, y, 30, 30);

  if (label == 0) {
    x--;
  } else if (label == 1) {
    x++;
  } else if (label == 2) {
    y++;
  } else if (label == 3) {
    y--;
  }

  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
}
