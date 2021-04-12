const addNewBatton = document.getElementById("add_new_button");
let idArray = [];

addNewBatton.onclick = (event) => {
  document.getElementById("invoices_main_view").style.display = "none";
  document.getElementById("add_invoice_block").style.display = "block";
};

const [
  newInvoiceNumber,
  newInvoiceCreateDate,
  newInvoiceSupplyDate,
  newInvoiceComment,
  numberInputBlock,
  commentInputBlock,
  saveNewIvoiceButton,
  formSection,
  closeAddInvoiceBlockButton,
] = [
  "number_input",
  "invoice_date_input",
  "suplly_date_input",
  "comment_input",
  "number_input_block",
  "comment_input_block",
  "save_new_ivoice_button",
  "form_section",
  "close_add_invoice_block_button",
].map((item) => document.getElementById(item));

function closeAddInvoiceBlock() {
  document.getElementById("add_invoice_block").style.display = "none";
  document.getElementById("invoices_main_view").style.display = "block";
  formWarningMessage.remove();
  newInvoiceNumber.value = "";
  newInvoiceCreateDate.value = "";
  newInvoiceSupplyDate.value = "";
  newInvoiceComment.value = "";
}

closeAddInvoiceBlockButton.onclick = (event) => {
  closeAddInvoiceBlock();
};

const numberWarningMessage = document.createElement("p");
const numberWarningDuplication = document.createElement("p");
let numbersArray = [];

newInvoiceNumber.oninput = (event) => {
  for (let item = 0; item < sessionStorage.length; item++) {
    numbersArray.push(sessionStorage.key(item));
  }

  if (event.target.value.length < 3) {
    numberInputBlock.appendChild(numberWarningMessage);
    numberWarningMessage.innerHTML = " * at least 3 symbols";
    numberWarningMessage.style = `
      position: absolute;
      color: #f00;
      font-size: 12px;
      padding-top: 4px;
    `;
  } else {
    numberWarningMessage.remove();
  }

  if (numbersArray.some((number) => newInvoiceNumber.value === number)) {
    numberInputBlock.appendChild(numberWarningDuplication);
    numberWarningDuplication.innerHTML = " * this number exists";
    numberWarningDuplication.style = `
      position: absolute;
      color: #f00;
      font-size: 12px;
      padding-top: 4px;
    `;
  } else {
    numberWarningDuplication.remove();
  }
  if (newInvoiceNumber.value === "") numberWarningDuplication.remove();
};

const commentWarningMessage = document.createElement("p");

newInvoiceComment.oninput = (event) => {
  if (event.target.value.length > 160) {
    commentInputBlock.appendChild(commentWarningMessage);
    commentWarningMessage.innerHTML = " * no more than 160 characters";
    commentWarningMessage.style = `
      position: absolute;
      color: #f00;
      font-size: 12px;
      padding-top: 4px;
    `;
  } else {
    commentWarningMessage.remove();
  }
};

const formWarningMessage = document.createElement("p");

saveNewIvoiceButton.onclick = (event) => {
  let invoiceId = "";

  function makeInvoiceId() {
    idArray = Object.values(sessionStorage);

    let newId = "";
    function makeId() {
      const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      newId = "";
      for (let i = 0; i < 24; i++)
        newId += possible.charAt(Math.floor(Math.random() * possible.length));

      return newId;
    }
    makeId();
    if (idArray.some((id) => newId === id)) {
      makeId();
    } else {
      invoiceId = newId;

      return invoiceId;
    }
  }

  makeInvoiceId();

  if (
    newInvoiceNumber.value.length >= 3 &&
    !numbersArray.some((number) => newInvoiceNumber.value === number) &&
    newInvoiceCreateDate.value &&
    newInvoiceSupplyDate.value &&
    newInvoiceComment.value.length <= 160
  ) {
    fetch(`http://localhost:3000/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: invoiceId,
        number: JSON.parse(newInvoiceNumber.value),
        date_created: newInvoiceCreateDate.value,
        date_supplied: newInvoiceSupplyDate.value,
        comment: newInvoiceComment.value,
      }),
    }).then((response) => {
      sessionStorage.setItem(newInvoiceNumber.value, invoiceId);
      closeAddInvoiceBlock();
      getInvoice();
    });
  } else {
    formSection.appendChild(formWarningMessage);
    formWarningMessage.innerHTML = "* enter all data correctly";
    formWarningMessage.style = `
      position: absolute;
      bottom: 20px;
      left:16px;
      color: #f00;
      font-size: 12px;
      padding-top: 4px;
    `;
  }
};
