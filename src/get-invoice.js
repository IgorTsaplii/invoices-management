let invoiceNumbers = [];

function getInvoice() {
  function clearitemList() {
    const itemList = document.getElementsByClassName("invoice_list_item");
    const counter = itemList.length;
    for (let i = 0; i < counter; i++) {
      itemList[0].remove();
    }
  }

  clearitemList();

  fetch("http://localhost:3000/invoices")
    .then((response) => response.json())
    .then((response) => {
      response.forEach((invoice) =>
        sessionStorage.setItem(invoice.number, invoice.id)
      );

      response.map(function (invoice) {
        const invoiceListItem = document.createElement("ul");

        invoiceListItem.className = "invoice_list_item";
        invoiceListItem.id = invoice.id;
        document.getElementById("invoice_list").appendChild(invoiceListItem);

        const [invoiceCreateDate, invoiceNumber, invoiceSupplyDate, comment] = [
          "invoiceCreateDate",
          "invoiceNumber",
          "invoiceSupplyDate",
          "comment",
        ].map((item) =>
          invoiceListItem.appendChild(document.createElement("li"))
        );

        invoiceListItem.appendChild(document.createElement("li")).className =
          "edit_buttons_block";

        invoiceCreateDate.innerHTML = invoice.date_created;
        invoiceNumber.innerHTML = invoice.number;
        invoiceSupplyDate.innerHTML = invoice.date_supplied;
        comment.innerHTML = invoice.comment;

        invoiceCreateDate.className = "create_date_item_list";
        invoiceNumber.className = "number_item_list";
        invoiceSupplyDate.className = "supply_date_item_list";
        comment.className = "comment_item_list";

        invoiceNumber.style.color = "#6085fe";
      });
      creatButtons();
      getEdit();
      getRemove()
    });
}

function creatButtons() {
  const buttonsBlockArray = document.getElementsByClassName(
    "edit_buttons_block"
  );

  for (let item = 0; item < buttonsBlockArray.length; item++) {
    const editButton = document.createElement("button");
    editButton.className = "edit_button";
    editButton.innerHTML = "Edit";
    const removeButton = document.createElement("button");
    removeButton.className = "remove_button";
    removeButton.innerHTML = "Remove";
    buttonsBlockArray[item].appendChild(editButton);
    buttonsBlockArray[item].appendChild(removeButton);
  }
}

getInvoice();
