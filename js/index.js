// document.addEventListener("DOMContentLoaded", function() {})


// const BASEURL = 'http://localhost:3000'
// const titleList = document.querySelector('ul#list')
// const showPanel = document.querySelector('div#show-panel')
// const newLikeUser = { "id": 10, "username": "macejkovic" }
// // let everyTitle = []

// fetch(BASEURL + '/books')
// .then(res => res.json())
// .then(dataArr => {
//     dataArr.forEach(book => {
//         renderBooks(book)
//     })
// })

// const renderBooks = (details) => {
//     // Creating book list, setting the new elements info to the json data

//     const liBook = document.createElement('li')
//     liBook.textContent = details.title

//     titleList.append(liBook);

// // adds event listener
//     liBook.addEventListener('click', (e) => {
//         showPanel.textContent = ""

//     // create elements and assign JSON data
//     const titleDetails = document.createElement('h1')
//     titleDetails.textContent = details.title;

//     const subtitles = document.createElement('h2')
//     subtitles.textContent = details.subtitle;

//     const bookDesc = document.createElement('p')
//     bookDesc.textContent = details.description;

//     const bookImg = document.createElement('img')
//     bookImg.src = details.img_url;

//      // create a "love" (like) button
//      const loveButton = document.createElement('button')
//      loveButton.className = "like-button"
//      loveButton.textContent = "♥"

//     // create a list of users who have liked the book already
//     let likeList = document.createElement("ul")
//     likeList.id = "user-list"

//     if(details.users.length > 0) {
//         details.users.forEach(user => {
//             const userLiked = document.createElement("li")
//             userLiked.textContent = user.username
//             userLiked.id = user.username

//             likeList.append(userLiked)
//         })
//     }

//     showPanel.append(bookImg, titleDetails, subtitles, bookDesc, likeList, loveButton)

//     loveButton.addEventListener("click", (event) => {
//         details.users.push(newLikeUser)

//         fetch(`${BASEURL}/${details.id}`, {
//             method: "PATCH",
//             headers: {
//               "Content-type": "application/json"
//             },
//             body: JSON.stringify({
//               "users" : details.users
//             })
//         })
//         .then(resp => resp.json())
//         .then(updateDataObj => {
//             details.users = updateDataObj.users
//             const newUserLi = document.createElement('li')
//             newUserLi.textContent = newLikeUser.username
//             likeList.append(newUserLi)
//             })
//         })
//     }
// )}


document.addEventListener("DOMContentLoaded", function() {})
const booksURL = 'http://localhost:3000/books'
const bookList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const myUser = {"id": 1, "username": "pouros"}

fetch(booksURL)
.then(response => response.json())
.then((booksArr) => {
  booksArr.forEach((book) => {
    turnBookIntoLi(book)
  })
})

let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li")
  bookLi.innerText = book.title
  bookList.append(bookLi)

  bookLi.addEventListener("click", (event) => {
    showPanel.innerHTML = ""

    let bookTitle = document.createElement("h1")
    bookTitle.innerText = book.title

    let bookSubtitle = document.createElement("h2")
    bookSubtitle.innerText = book.subtitle

    let bookDescription = document.createElement("p")
    bookDescription.innerText = book.description

    let bookAuthor = document.createElement("p")
    bookAuthor.innerText = book.author

    let bookImage = document.createElement("img")
    bookImage.src = book.img_url

    let likeButton = document.createElement("button")
    likeButton.innerText = "Like"

    let likersList = document.createElement("ul")
    likersList.id = "users-list"

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li")
        likeUser.innerText = user.username
        likeUser.id = user.username

        likersList.append(likeUser)
      })
    }

    showPanel.append(bookImage, bookTitle, bookAuthor, bookSubtitle, bookDescription, likersList, likeButton)

    likeButton.addEventListener("click", (event) => {
      book.users.push(myUser)

      fetch(`${booksURL}/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          users: book.users
        })
      })
      .then(response => response.json())
      .then((updatedBook) => {
        book.users = updatedBook.users
        let newUserLi = document.createElement("li")
        newUserLi.innerText = myUser.username
        likersList.append(newUserLi)
      })
    })
  }
)}
