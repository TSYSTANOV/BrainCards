export const showAlert = (text) => {
  const alertBlock = document.createElement("div");
  alertBlock.className = "alert";

  const alertText = document.createElement("p");
  alertText.className = "alert__text";
  alertText.textContent = text;

  alertBlock.append(alertText);
  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.classList.add("alert_show");
  });
  setTimeout(() => {
    alertBlock.classList.remove("alert_show");
    setTimeout(() => {
      alertBlock.remove();
    }, 200);
  }, 2000);
};
