let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
  },
  // exposure: {
  //   value: 100,
  //   min: 0,
  //   max: 200,
  //   unit: '%',
  // },
  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: '%',
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: 'deg',
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: 'px',
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: '%',
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: '%',
  },
};

const imageCanvas = document.querySelector('#image-canvas');
const imgInput = document.querySelector('#image-input');
const canvasCtx = imageCanvas.getContext('2d');
const resetButton = document.querySelector('#reset-btn');
const downloadButton = document.querySelector('#download-btn');
const presetsContainer = document.querySelector('.presets');

let file = null;
let image = null;

const filtersContainer = document.querySelector('.filters');

function createFilterElement(name, unit = '%', value, min, max) {
  const div = document.createElement('div');
  div.classList.add('filter');

  const input = document.createElement('input');
  input.type = 'range';
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement('p');
  p.innerText = name.charAt(0).toUpperCase() + name.slice(1);

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener('input', (event) => {
    filters[name].value = input.value;
    // console.log(input.value);
    applyFilters();
  });

  return div;
}

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max
    );
    filtersContainer.appendChild(filterElement);
  });
}

createFilters();

imgInput.addEventListener('change', (event) => {
  const file = event.target.files[0];

  const imagePlaceholder = document.querySelector('.placeholder');
  imageCanvas.style.display = 'block';
  imagePlaceholder.style.display = 'none';

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
  `;
  canvasCtx.drawImage(image, 0, 0);
}

resetButton.addEventListener('click', () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: '%',
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: '%',
    },
    // exposure: {
    //   value: 100,
    //   min: 0,
    //   max: 200,
    //   unit: '%',
    // },
    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: '%',
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: 'deg',
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: 'px',
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: '%',
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: '%',
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: '%',
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: '%',
    },
  };
  applyFilters();

  filtersContainer.innerHTML = '';
  createFilters();
});

downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  drama: {
    brightness: 105,
    contrast: 140,
    saturation: 130,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 10,
    blur: 1,
    grayscale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 95,
    contrast: 110,
    saturation: 70,
    hueRotation: 0,
    blur: 1,
    grayscale: 20,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  blackAndWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  cinematic: {
    brightness: 95,
    contrast: 130,
    saturation: 110,
    hueRotation: 350,
    blur: 0,
    grayscale: 0,
    sepia: 5,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 115,
    contrast: 85,
    saturation: 75,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },
  neon: {
    brightness: 120,
    contrast: 150,
    saturation: 180,
    hueRotation: 280,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  pastel: {
    brightness: 115,
    contrast: 90,
    saturation: 120,
    hueRotation: 20,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  moody: {
    brightness: 85,
    contrast: 140,
    saturation: 70,
    hueRotation: 10,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  sepiaClassic: {
    brightness: 100,
    contrast: 100,
    saturation: 90,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 70,
    opacity: 100,
    invert: 0,
  },

  coldBlue: {
    brightness: 95,
    contrast: 120,
    saturation: 90,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement('button');
  presetButton.classList.add('btn');
  presetButton.innerText = presetName;
  presetsContainer.appendChild(presetButton);

  presetButton.addEventListener('click', () => {
    const preset = presets[presetName];

    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });

    applyFilters();
    filtersContainer.innerHTML = '';
    createFilters();
  });
});
