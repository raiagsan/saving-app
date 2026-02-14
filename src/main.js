const URL = "https://v1.appbackend.io/v1/rows/8XAVgk3LO5Rq";

async function getData(URL) {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error");
    return [];
  }
}

async function main() {
  const savings = await getData(URL);

  savings.data.forEach((saving) => {
    const savingContainer = document.createElement("div");
    savingContainer.className = "saving-item";

    const nominalContainer = document.createElement("p");
    const sourceContainer = document.createElement("p");

    nominalContainer.textContent =
      "Rp. " + parseInt(saving.nominal).toLocaleString("id-ID");
    sourceContainer.textContent = saving.source;
    savingContainer.append(nominalContainer, sourceContainer);
    document.body.append(savingContainer);
  });
}

main();

const nominalInput = document.getElementById("nominal");
const sourceInput = document.getElementById("source");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async () => {
  const nominalValue = nominalInput.value;
  const sourceValue = sourceInput.value;

  if (!nominalValue || !sourceValue) {
    alert("Semua field harus diisi");
    return;
  }

  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ nominal: nominalValue, source: sourceValue }]),
  });

  window.location.reload();
});
