function getEdit() {
  const invoiceToEdit = document.getElementsByClassName("invoice_list_item");
  const editButtons = document.getElementsByClassName("edit_button");

  for (
    let buttonNumber = 0;
    buttonNumber < editButtons.length;
    buttonNumber++
  ) {
    editButtons[buttonNumber].onclick = function (event) {
      document.getElementById("invoices_main_view").style.display = "none";
      document.getElementById("edit_invoice_block").style.display = "block";
      const editInvoiceId = invoiceToEdit[buttonNumber].id;

      const [
        numberItemList,
        createDateItemList,
        supplyDateItemList,
        commentItemList,
      ] = [
        "number_item_list",
        "create_date_item_list",
        "supply_date_item_list",
        "comment_item_list",
      ].map((item) => invoiceToEdit[buttonNumber].getElementsByClassName(item));

      const [
        editNumberInput,
        editInvoiceDateInput,
        editSupllyDateInput,
        editCommentInput,
        editNumberInputBlock,
        editCommentInputBlock,
        closeEditInvoiceBlockButton,
        saveEditIvoiceButton,
        editFormSection,
      ] = [
        "edit_number_input",
        "edit_invoice_date_input",
        "edit_suplly_date_input",
        "edit_comment_input",
        "edit_number_input_block",
        "edit_comment_input_block",
        "close_edit_invoice_block_button",
        "save_edit_ivoice_button",
        "edit_form_section",
      ].map((item) => document.getElementById(item));

      editNumberInput.value = numberItemList[0].innerText;
      editInvoiceDateInput.value = createDateItemList[0].innerText;
      editSupllyDateInput.value = supplyDateItemList[0].innerText;
      editCommentInput.value = commentItemList[0].innerText;

      const numberWarningMessage = document.createElement("p");
      const numberWarningEdit = document.createElement("p");
      let numbersArray = [];
      let sendFlagNumber = true;
      let sendFlagNumber2 = true;

      editNumberInput.oninput = (event) => {
        for (let item = 0; item < sessionStorage.length; item++) {
          numbersArray.push(sessionStorage.key(item));
        }

        if (event.target.value.length < 3) {
          sendFlagNumber = false;
          editNumberInputBlock.appendChild(numberWarningMessage);
          numberWarningMessage.innerHTML = " * at least 3 symbols";
          numberWarningMessage.style = `
          position: absolute;
          color: #f00;
          font-size: 12px;
          padding-top: 4px;
        `;
        } else {
          numberWarningMessage.remove();
          sendFlagNumber = true;
        }

        if (
          numbersArray.some(
            (number) =>
              editNumberInput.value === number &&
              editNumberInput.value !== numberItemList[0].innerText
          )
        ) {
          sendFlagNumber2 = false;
          editNumberInputBlock.appendChild(numberWarningEdit);
          numberWarningEdit.innerHTML = " * this number exists";
          numberWarningEdit.style = `
          position: absolute;
          color: #f00;
          font-size: 12px;
          padding-top: 4px;
        `;
        } else {
          sendFlagNumber2 = true;
          numberWarningEdit.remove();
        }
      };

      const commentWarningMessage = document.createElement("p");

      editCommentInput.oninput = (event) => {
        if (event.target.value.length > 160) {
          editCommentInputBlock.appendChild(commentWarningMessage);
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

      function closeEditInvoiceBlock() {
        document.getElementById("edit_invoice_block").style.display = "none";
        document.getElementById("invoices_main_view").style.display = "block";
        editFormWarningMessage.remove();
        editNumberInput.value = "";
        editInvoiceDateInput.value = "";
        editSupllyDateInput.value = "";
        editCommentInput.value = "";
      }

      closeEditInvoiceBlockButton.onclick = (event) => {
        closeEditInvoiceBlock();
      };

      const editFormWarningMessage = document.createElement("p");

      saveEditIvoiceButton.onclick = (event) => {
        if (
          sendFlagNumber &&
          sendFlagNumber2 &&
          editInvoiceDateInput.value &&
          editSupllyDateInput.value &&
          editCommentInput.value.length <= 160
        ) {
          fetch(`http://localhost:3000/invoices/${editInvoiceId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: JSON.parse(editNumberInput.value),
              date_created: editInvoiceDateInput.value,
              date_supplied: editSupllyDateInput.value,
              comment: editCommentInput.value,
            }),
          }).then((response) => {
            closeEditInvoiceBlock();
            getInvoice();
          });
        } else {
          editFormSection.appendChild(editFormWarningMessage);
          editFormWarningMessage.innerHTML = "* enter all data correctly";
          editFormWarningMessage.style = `
            position: absolute;
            bottom: 20px;
            left:16px;
            color: #f00;
            font-size: 12px;
            padding-top: 4px;
          `;
        }
      };
    };
  }
}
