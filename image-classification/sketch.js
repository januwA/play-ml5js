// 图像分类器
let classifier;

// 识别的图片
let _img;

let labelElem;
let confidenceElem;
let inputElem;
let classifyElem;
let loadingElem;

function preload() {
  _img = loadImage('https://i.loli.net/2019/11/07/fnbOkChHpl92mig.jpg');
}

async function setup() {
  createCanvas(600, 400);
  labelElem = createP();
  confidenceElem = createP();
  loadingElem = createP();
  inputElem = select('#input');
  classifyElem = select('#classify');
  classifier = await ml5.imageClassifier('MobileNet');
  classifyElem.mouseClicked(classify);
  getResult();
}

// 获取分类结果
async function getResult() {
  loadingElem.html('loading...');
  let r = await classifier.classify(_img);
  console.log(r);
  loadingElem.html('');
  labelElem.html(r[0].label);
  confidenceElem.html(r[0].confidence);
}

async function classify() {
  let url = inputElem.value();
  loadImage(url, img => {
    _img = img;
    resizeCanvas(_img.width, _img.height);
    getResult();
  });
}

function draw() {
  background(0);
  image(_img, 0, 0, width, height);
}
