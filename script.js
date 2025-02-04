const params = {
  coliformes: {
    subi: 0,
    wi: 0.15
  },
  pH: {
    subi: 0,
    wi: 0.12
  },
  DBO5: {
    subi: 0,
    wi: 0.1
  },
  nitratos: {
    subi: 0,
    wi: 0.1
  },
  fosfatos: {
    subi: 0,
    wi: 0.1
  },
  cambioTemp: {
    subi: 0,
    wi: 0.1
  },
  turbidez: {
    subi: 0,
    wi: 0.08
  },
  solidosDisueltos: {
    subi: 0,
    wi: 0.08
  },
  oxigenoDisuelto: {
    subi: 0,
    wi: 0.17
  }
};

const resultColors = {
  25: {
    className: "awful",
    classification: "Pésima"
  },
  50: {
    className: "bad",
    classification: "Mala"
  },
  70: {
    className: "regular",
    classification: "Regular"
  },
  90: {
    className: "good",
    classification: "Buena"
  },
  100: {
    className: "excellent",
    classification: "Excelente"
  }
};


// Puntos para la interpolación - me lo dio la IA xd
const endpoints = {
  coliformes: { x1: 0, x2: 100000, y1: 1, y2: 3 },
  pH: { x1: 2, x2: 10, y1: 2, y2: 3 },
  DBO5: { x1: 0, x2: 30, y1: 1, y2: 2 },
  nitratos: { x1: 0, x2: 100, y1: 1, y2: 2 },
  fosfatos: { x1: 0, x2: 10, y1: 1, y2: 5 },
  cambioTemp: { x1: 0, x2: 15, y1: 1, y2: 9 },
  turbidez: { x1: 0, x2: 100, y1: 1, y2: 5 },
  solidosDisueltos: { x1: 0, x2: 500, y1: 1, y2: 3 },
  oxigenoDisuelto: { x1: 60, x2: 140, y1: 0, y2: 47 } // Se asume que a 60% saturación el subíndice es 0 y a 140% es 47.
};

function interpolate(x, x1, x2, y1, y2) {
  return y1 + ((x - x1) / (x2 - x1)) * (y2 - y1);
}

function getColiformes() {
  const input = parseFloat(document.getElementById("coliformes").value);

  if (input > 100000) {
    params.coliformes.subi = 3;
  } else {
    // Realizar calculo con interpolacion
    params.coliformes.subi = interpolate(input, endpoints.coliformes.x1, endpoints.coliformes.x2, endpoints.coliformes.y1, endpoints.coliformes.y2);
  }
}

function getpH() {
  const input = document.getElementById("pH").value;

  if (input <= 2) {
    params.pH.subi = 2;
  } else if (input >= 10) {
    params.pH.subi = 3;
  } else {
    params.pH.subi = interpolate(input, endpoints.pH.x1, endpoints.pH.x2, endpoints.pH.y1, endpoints.pH.y2);
  }
}

function getDBO5() {
  const input = document.getElementById("DBO5").value;

  if (input >= 30) {
    params.DBO5.subi = 2;
  } else {
    // Realizar calculo
    params.DBO5.subi = interpolate(input, endpoints.DBO5.x1, endpoints.DBO5.x2, endpoints.DBO5.y1, endpoints.DBO5.y2);
  }
}

function getNitratos() {
  const input = document.getElementById("nitratos").value;

  if (input >= 100) {
    params.nitratos.subi = 2;
  } else {
    // Realizar calculo
    params.nitratos.subi = interpolate(input, endpoints.nitratos.x1, endpoints.nitratos.x2, endpoints.nitratos.y1, endpoints.nitratos.y2);
  }
}

function getFosfatos() {
  const input = document.getElementById("fosfatos").value;

  if (input >= 10) {
    params.fosfatos.subi = 5;
  } else {
    // Realizar calculo
    params.fosfatos.subi = interpolate(input, endpoints.fosfatos.x1, endpoints.fosfatos.x2, endpoints.fosfatos.y1, endpoints.fosfatos.y2);
  }
}

function getCambioTemp() {
  const input = document.getElementById("cambioTemp").value;

  if (input >= 10) {
    params.cambioTemp.subi = 2;
  } else {
    params.cambioTemp.subi = interpolate(input, endpoints.cambioTemp.x1, endpoints.cambioTemp.x2, endpoints.cambioTemp.y1, endpoints.cambioTemp.y2);
  }
}

function getTurbidez() {
  const input = document.getElementById("turbidez").value;

  if (input > 100) {
    params.turbidez.subi = 5;
  } else {
    params.turbidez.subi = interpolate(input, endpoints.turbidez.x1, endpoints.turbidez.x2, endpoints.turbidez.y1, endpoints.turbidez.y2);
  }
}

function getSolidosDisueltos() {
  const input = document.getElementById("solidosDisueltos").value;

  if (input > 500) {
    params.solidosDisueltos.subi = 5;
  } else {
    // Realizar calculo
    params.solidosDisueltos.subi = interpolate(input, endpoints.solidosDisueltos.x1, endpoints.solidosDisueltos.x2, endpoints.solidosDisueltos.y1, endpoints.solidosDisueltos.y2);
  }
}

function getOxigenoDisuelto() {
  const input = document.getElementById("oxigenoDisuelto").value;

  if (input > 140) {
    params.oxigenoDisuelto.subi = 47;
  } else {
    // Realizar calculo
    params.oxigenoDisuelto.subi = interpolate(input, endpoints.oxigenoDisuelto.x1, endpoints.oxigenoDisuelto.x2, endpoints.oxigenoDisuelto.y1, endpoints.oxigenoDisuelto.y2);
  }
}

function handleCalculate(e) {
  e.preventDefault();

  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");

  result.classList.remove("show");
  calculateButton.disabled = true;
  resetButton.disabled = true;
  calculateButton.innerHTML = "Calculando...";

  setTimeout(() => {
    getColiformes();
    getpH();
    getDBO5();
    getNitratos();
    getFosfatos();
    getCambioTemp();
    getTurbidez();
    getSolidosDisueltos();
    getOxigenoDisuelto();

    const ica = Object.values(params)
      .reduce((acc, param) => acc + param.subi * param.wi, 0)
      .toFixed(2);

    const result = document.getElementById("result");
    const icaText = document.getElementById("ica");
    const resultClassification = document.getElementById(
      "result-classification"
    );
    calculateButton.disabled = false;
    calculateButton.innerHTML = "Calcular";
    resetButton.disabled = false;
    result.classList.add("show");
    icaText.innerHTML = `El ICA es: ${ica}`;

    for (const [maxValue, { className, classification }] of Object.entries(
      resultColors
    )) {
      if (ica <= maxValue) {
        result.classList.add(className);
        resultClassification.innerHTML = `Clasificación: ${classification}`;
        break;
      }
    }
  }, 2500);
}

function resetForm() {
  const form = document.getElementById("form");

  const result = document.getElementById("result");
  result.classList.remove("show");
  form.reset();
}

// DAME PERMISOSOOOOOSOOSOSOS