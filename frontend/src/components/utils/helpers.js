// import mime from "mime-types";

export const playable = (filename) => {
  // let video_element = document.createElement("video");
  // let mime_type = mime.lookup(filename);
  // return video_element.canPlayType(mime_type) != "";
  return true; // FIX BEFORE COMMIT - mime import causing issues
};

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
}

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getNextColor = (index, alpha) => {
  alpha = alpha || 1;
  let default_colors = [
    [255, 99, 132],
    [54, 162, 235],
    [240, 176, 26],
    [153, 102, 255],
    [75, 192, 192],
    [255, 159, 64],
    [194, 88, 74],
    [44, 102, 219],
    [44, 163, 23],
    [191, 46, 217],
    [160, 162, 162],
    [163, 151, 27],
  ];
  if (index < default_colors.length) {
    var color_set = default_colors[index];
  } else {
    var color_set = [randInt(64, 196), randInt(64, 196), randInt(64, 196)];
  }
  return (
    "rgba(" +
    color_set[0] +
    ", " +
    color_set[1] +
    ", " +
    color_set[2] +
    ", " +
    alpha +
    ")"
  );
}

export const prettyBytes = (bytes) => {
  let units = ["B", "KB", "MB", "GB", "PB"];
  let i = 0;
  while (bytes > 1024) {
    bytes /= 1024;
    i++;
  }
  let unit = units[i];
  return bytes.toFixed(1) + " " + unit;
}

export const getSaliencyColor = (value) => {
  var color = null;
  if (value < 0) {
    color = [52, 152, 219];
  } else {
    color = [231, 76, 60];
  }
  return colorToString(interpolate(Math.abs(value), [255, 255, 255], color));
}

const interpolate = (val, rgb1, rgb2) => {
  if (val > 1) {
    val = 1;
  }
  val = Math.sqrt(val);
  var rgb = [0, 0, 0];
  var i;
  for (i = 0; i < 3; i++) {
    rgb[i] = Math.round(rgb1[i] * (1.0 - val) + rgb2[i] * val);
  }
  return rgb;
}

const colorToString = (rgb) => {
  return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
}

export const getObjectFitSize = (
  contains /* true = contain, false = cover */,
  containerWidth,
  containerHeight,
  width,
  height
) => {
  var doRatio = width / height;
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}
