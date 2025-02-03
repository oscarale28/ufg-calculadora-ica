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

function getColiformes() {
  const input = document.getElementById("coliformes").value;

  if (input > 100000) {
    params.coliformes.subi = 3;
  } else {
    // Realizar calculo con interpolacion
  }
}

function getpH() {
  const input = document.getElementById("pH").value;

  if (input <= 2) {
    params.pH.subi = 2;
  } else if (input >= 10) {
    params.pH.subi = 3;
  } else {
    // Realizar calculo
  }
}

function getDBO5() {
  const input = document.getElementById("DBO5").value;

  if (input >= 30) {
    params.DBO5.subi = 2;
  } else {
    // Realizar calculo
  }
}

function getNitratos() {
  const input = document.getElementById("nitratos").value;

  if (input >= 100) {
    params.nitratos.subi = 2;
  } else {
    // Realizar calculo
  }
}

function getFosfatos() {
  const input = document.getElementById("fosfatos").value;

  if (input >= 10) {
    params.fosfatos.subi = 5;
  } else {
    // Realizar calculo
  }
}

function getCambioTemp() {
  const input = document.getElementById("cambioTemp").value;

  if (input >= 10) {
    params.cambioTemp.subi = 2;
  }
}

function getTurbidez() {
  const input = document.getElementById("turbidez").value;

  if (input > 100) {
    params.turbidez.subi = 5;
  } else {
    // Realizar calculo
  }
}

function getSolidosDisueltos() {
  const input = document.getElementById("solidosDisueltos").value;

  if (input > 500) {
    params.solidosDisueltos.subi = 5;
  } else {
    // Realizar calculo
  }
}

function getOxigenoDisuelto() {
  const input = document.getElementById("oxigenoDisuelto").value;

  if (input > 140) {
    params.oxigenoDisuelto.subi = 47;
  } else {
    // Realizar calculo
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
