let inputChecker = (arr) => arr.every((v) => v.checkValidity() === true);
let radioChecker = (arr) => arr.some((v) => v.checked === true);
const radioBtns = document.querySelectorAll("input[type=radio]");
const svgFirst = document.querySelectorAll("svg");
const labelFirst = document.querySelectorAll("input[type=radio] ~ label");
const validations = document.querySelectorAll("input:not([type=radio])");
const span = document.getElementsByClassName("error");
let audio = null;

const inputValidations = () => {
  for (const [i, validation] of validations.entries()) {
    function val() {
      validation.checkValidity()
        ? validation.classList.remove("invalid")
        : validation.classList.add("invalid");
      validations[i].checkValidity()
        ? (span[i].textContent = "")
        : (span[i].textContent = "*fill out this field");
      if (validations[1].value !== "") {
        validations[1].checkValidity()
          ? (span[1].textContent = "")
          : (span[1].textContent = "*invalid e-mail");
      }
      if (validations[4].value !== "") {
        validations[4].checkValidity()
          ? (span[4].textContent = "")
          : (span[4].textContent = "*only numbers");
      }
      if (validations[2].value !== "") {
        validations[2].value === validations[5].value
          ? ((span[2].textContent = ""), (span[5].textContent = ""))
          : ((span[2].textContent = "*password mismatch"),
            (span[5].textContent = "*password mismatch"),
            validations[5].classList.add("invalid"));
        validations[2].checkValidity()
          ? (span[2].textContent = "")
          : (span[2].textContent =
              "*at least one number, uppercase and lowercase letter and 8 or more characters");
      }

      radioBtns[i].checkValidity()
        ? (span[6].textContent = "")
        : (span[6].textContent = "*choose your side");
    }
    val();
    validation.addEventListener("keyup", () => {
      val();
    });
  }
};

document.getElementById("btn").addEventListener("click", () => {
  inputValidations();

  radioChecker([...radioBtns])
    ? (svgFirst[0].classList.remove("invalidRadio"),
      labelFirst[0].classList.remove("invalidRadio"))
    : (svgFirst[0].classList.add("invalidRadio"),
      labelFirst[0].classList.add("invalidRadio"));

  inputChecker([...validations]) && radioChecker([...radioBtns])
    ? (audio = document.querySelector(`audio[data-name = lightsaber`))
    : (audio = document.querySelector(`audio[data-name = vader`));

  audio.play();

  document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();
    audio.addEventListener("ended", () => {
      document.forms["myForm"].submit();
    });
  });
});

document.getElementById("radio").addEventListener("click", () => {
  radioChecker([...radioBtns])
    ? (svgFirst[0].classList.remove("invalidRadio"),
      labelFirst[0].classList.remove("invalidRadio"),
      (span[6].textContent = ""))
    : (svgFirst[0].classList.add("invalidRadio"),
      labelFirst[0].classList.add("invalidRadio"));
});

//https://gist.github.com/edysegura/9984108
document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      //prevent the browser from showing default error bubble / hint
      e.preventDefault();
    };
  })(),
  true
);
