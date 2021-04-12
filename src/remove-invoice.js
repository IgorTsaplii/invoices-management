function getRemove() {
  const invoiceToRemove = document.getElementsByClassName("invoice_list_item");
  const removeButtons = document.getElementsByClassName("remove_button");

  for (
    let buttonNumber = 0;
    buttonNumber < removeButtons.length;
    buttonNumber++
  ) {
    removeButtons[buttonNumber].onclick = function (event) {
      document.getElementById("invoices_main_view").style.display = "none";
      document.getElementById("remove_invoice_block").style.display = "block";
      const removeInvoiceId = invoiceToRemove[buttonNumber].id;

      const [
        confirmButton,
        rejectButton,
        removeMessage,
      ] = [
        "confirm_button",
        'reject_button',
        'remove_message'
      ].map((item) => document.getElementById(item));

      const number = invoiceToRemove[buttonNumber].getElementsByClassName("number_item_list")
      
      removeMessage.innerText = `Are you sure you want to delete your ${number[0].innerText} invoice?`

      confirmButton.onclick = (event) => {
        fetch(`http://localhost:3000/invoices/${removeInvoiceId}`, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(response => {
          document.getElementById(removeInvoiceId).remove()
          document.getElementById("remove_invoice_block").style.display = "none";
          document.getElementById("invoices_main_view").style.display = "block";
          getRemove()
         })
      }

      rejectButton.onclick = (event) => {
        document.getElementById("remove_invoice_block").style.display = "none";
        document.getElementById("invoices_main_view").style.display = "block";
      }
    };
  }
}
