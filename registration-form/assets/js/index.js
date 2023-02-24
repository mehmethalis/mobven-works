async function getCitiesAndDistricts() {
  try {
    const res = await fetch("https://turkiyeapi.cyclic.app/api/v1/provinces");
    const { data } = await res.json();

    const citiesBox = document.getElementById("city");
    const districtsBox = document.getElementById("district");
    districtsBox.setAttribute("disabled", "true");

    if (data && citiesBox) {
      data.forEach((city) => {
        const option = document.createElement("option");
        option.text = city.name;
        option.value = city.id;
        citiesBox.add(option);
      });
    }

    citiesBox.addEventListener("change", async (event) => {
      districtsBox.setAttribute("disabled", "");
      const res = await fetch(
        "https://turkiyeapi.cyclic.app/api/v1/provinces/" + event.target.value
      );

      const {
        data: { districts },
      } = await res.json();

      if (districts && districtsBox) {
        districts.forEach((district) => {
          const option = document.createElement("option");
          option.text = district.name;
          option.value = district.id;
          districtsBox.add(option);
        });
      }
      districtsBox.removeAttribute("disabled");
    });
  } catch (err) {
    console.log(err);
  }
}

getCitiesAndDistricts();

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePhone = (phone) => {
  return (
    String(phone).length >= 13 &&
    /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/.test(phone)
  );
};

const emailEl = document.getElementById("email");
emailEl.addEventListener("blur", (event) => {
  const isValid = validateEmail(event.target.value);
  const alert = document.getElementById("email-alert");
  if (!isValid && !alert) {
    const alert = document.createElement("p");
    alert.id = "email-alert";
    alert.innerText = "Please enter a valid email!";
    alert.className = "alert-danger";
    emailEl.parentElement.append(alert);
  }
  if (isValid && alert) {
    alert.remove();
  }
});

const phoneEl = document.getElementById("phone");
phoneEl.addEventListener("keyup", (event) => {
  phoneEl.value = event.target.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
});

phoneEl.addEventListener("blur", (event) => {
  const isValid = validatePhone(event.target.value);
  const alert = document.getElementById("phone-alert");
  if (!isValid && !alert) {
    const alert = document.createElement("p");
    alert.id = "phone-alert";
    alert.innerText = "Please enter a valid phone!";
    alert.className = "alert-danger";
    phoneEl.parentElement.append(alert);
  }
  if (isValid && alert) {
    alert.remove();
  }
});
