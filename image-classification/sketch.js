// 图像分类器
let classifier;

// 识别的图片
let _img;

let labelElem;
let confidenceElem;
let inputElem;
let classifyElem;

function preload() {
  _img = loadImage('https://i.loli.net/2019/11/07/fnbOkChHpl92mig.jpg');
}

async function setup() {
  createCanvas(600, 400);
  background(0);
  labelElem = createP();
  confidenceElem = createP();
  inputElem = select('#input');
  classifyElem = select('#classify');
  classifier = await ml5.imageClassifier('MobileNet');

  classifyElem.mouseClicked(classify);
  getResult();
}

// 获取分类结果
async function getResult() {
  let r = await classifier.classify(_img);
  console.log(r);
  labelElem.html(r[0].label);
  confidenceElem.html(r[0].confidence);
}

async function classify() {
  let url = inputElem.value();
  _img = await loadImage(url);
  getResult();
}

function draw() {
  image(_img, 0, 0, width, height);
}
