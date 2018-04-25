let arrayOfChirps = [];
let id;
let $containerDiv = $("<div class='container'> </div>");
$("body").append($containerDiv);

$.get("http://localhost:3000/api/chirps", data => {
    id = data.nextid;
    arrayOfChirps = Object.values(data)
    displayExistingChirps(arrayOfChirps);
});

function displayIndividualChirp(currentChirpObject) {
    let $row = $("<div class='row'></div>");
    let $col = $("<div class='col-md-10 m-auto pl-0'></div>");
    let $card = $("<div class='card col-md-12'></div>");
    let $cardBody = $("<div class='card-body row'></div>");
    let $Xdiv = $(`<div class='col-md-1' onclick='deleteChirp(${currentChirpObject.id})'> X </div>`);
    let $message = $("<p class='blockquote mb-0 col-md-11'> </p>").text(currentChirpObject.text);
    let $button = $(`<button type="button" class='btn btn-primary' onclick="editChirp(${currentChirpObject})"> Edit Chirp </button>`);
  
    $cardBody.append($Xdiv);
    $cardBody.append($message);
    $cardBody.append($button);
    $card.append($cardBody);
    $col.append($card);
    $row.append($col);
    $($containerDiv).append($row);
}

function displayExistingChirps(arrayOfChirps) {
    for (let i=0; i<arrayOfChirps.length-1; i++) {
        displayIndividualChirp(arrayOfChirps[i]);
      }
}

function postChirp() {
    let $chirpMessage = $("#chirpMessage")[0].value;
    let newChirp = {
        user: "Jessie",  // I will be the user for each chirp (for now)
        text: $chirpMessage,
        id: id
    };
    $.ajax({
        type: "POST",
        url: "/api/chirps/",
        data: JSON.stringify(newChirp),
        contentType: "application/json",
        success: () => {
            console.log("Posted!");
        }
      })
        .done(r => {
          location.reload();
        })
        .fail(err => {
          console.log(err);
        });
}

function deleteChirp(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/chirps/${id}`,
        success: () => {
            console.log("Deleted!");
            location.reload();
        }
      });
}

function editChirp(obj) {
    let text = obj.text;
    let id = obj.id;
    let $modalDiv = $(`<div class="modal" tabindex="-1" role="dialog"></div>`);
    let $modalDialog = $(`<div class="modal-dialog" role="document"></div>`);
    let $modalContent = $(`<div class="modal-content"></div>`);
    let $modalHeader = $(`<div class="modal-header"></div>`);
    let $modalTitle = $(`<h5 class="modal-title">Edit Chirp</h5>`); 
    let $modalCloseButton = $(`<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>`);
    let $span = $(`<span aria-hidden="true">&times;</span>`);
    let $modalBody = $(`<div class="modal-body"></div>`);
    let $input = $(`<input id="modalText" class="form-control" value="${text}" />`);
    let $modalFooter = $(`<div class="modal-footer"></div>`);
    let $modalSaveButton = $(`<button type="button" class="btn btn-primary onclick='updateChirp()'">Save changes</button>`);
    let $modalDismissButton = $(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`);

    $modalFooter.append($modalSaveButton);
    $modalFooter.append($modalDismissButton);
    
    $modalBody.append($input);  
    
    $modalCloseButton.append($span);
    $modalHeader.append($modalTitle);
    $modalHeader.append($modalCloseButton);

    $modalContent.append($modalHeader);
    $modalContent.append($modalBody);
    $modalContent.append($modalFooter);

    $modalDialog.append($modalContent);

    $modalDiv.append($modalDialog);

    // $("body").append($modalDiv);

    obj.text = "something new";

    $.ajax({
        type: "PUT",
        url: `/api/chirps/${id}`,
        success: () => {
            console.log("Edited!");
            location.reload();
        }
      });
}



// <div class="modal" tabindex="-1" role="dialog">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <p>Modal body text goes here.</p>
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-primary">Save changes</button>
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//       </div>
//     </div>
//   </div>
// </div>