$( document ).ready(function() {
  $.get("booksAll", function( books ) {
    console.log(books)
    let tableBody = $("#books-table > tbody") 
    books.forEach(function(book) {
      let row = $("<tr>")
      let idCell = $("<td>")
      let titleCell = $("<td>")
      let authorCell = $("<td>")
      let pagesCell = $("<td>")

      idCell.text(book._id)
      titleCell.text(book.title)
      authorCell.text(book.author)
      pagesCell.text(book.numPages)
      row.append(idCell)
      row.append(titleCell)
      row.append(authorCell)
      row.append(pagesCell)
      tableBody.append(row)
      
    });
  });

 /*$('#bookForm').ajaxForm({
    
    //data : JSON.stringify({ $( '#bookId' ).val() }), 
    method: 'GET',
      url:'/books' ,
    //dataType: 'text',
    //contentType: "application/json",
      success:function() {
        //document.location.href="/"
      console.log("Yes it hits here!")
    }
  }); */

  $('#bookForm').submit(function() {  
    $(this).ajaxSubmit({
    url:'/books/' + $('#bookForm #bookId').fieldValue()[0], 
    method: 'GET',
    dataType: 'json',
    contentType: "application/json",
    success:function(book) {
    //document.location.href="/"
    console.log(book)
    let tableBody = $("#book-table > tbody") 
    //books.forEach(function(book) {
      let row = $("<tr>")
      let idCell = $("<td>")
      let titleCell = $("<td>")
      let authorCell = $("<td>")
      let pagesCell = $("<td>")

      idCell.text(book._id)
      titleCell.text(book.title)
      authorCell.text(book.author)
      pagesCell.text(book.numPages)
      row.append(idCell)
      row.append(titleCell)
      row.append(authorCell)
      row.append(pagesCell)
      tableBody.append(row)
    //});  
  }
    }); 
    return false;
    });  
    
});

