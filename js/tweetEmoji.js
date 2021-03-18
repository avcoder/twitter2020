const emojiBtn = document.querySelector("#emoji-btn");
const modalContent = document.querySelector("#emoji-modal-body");
const textArea = document.querySelector("#tweet-area");
const emojisArray = [];
const categories = document.querySelector("#emojiCategories");

// fetch some json that contains all emojis, then store the huge array of emojis in our array called emojisArray
fetch("https://unpkg.com/emoji.json@13.1.0/emoji.json")
  .then((res) => res.json())
  .then((emojis) => emojisArray.push(...emojis));

// wait until user clicks emoji icon, upon which the modal window will open and display all emojis from our emojis Array
function showEmojisModal(e, emojis = emojisArray) {
  modalContent.innerHTML = emojis
    .map(
      (emoji) => `
    <span>${emoji.char}</span>
  `
    )
    .join("");
}

// user can click individual emoji which will then appear in textarea box
function insertEmoji(e) {
  textArea.value += e.target.textContent;
}

// user can click on category icon which will change display accordingly
// we need to put click event listeners on the category,
// then depending on which category was clicked on, we can use the data-category to get the actual category name
// then use .filter on our array, and use the test condition of, Does our emoji.category include category?
// if so, .filter will include it, then we need to render our filtered array
function filterDisplay(e) {
  // if we do get a tag we're not interested in (i.e. we only want img tag), then escape this function
  if (!e.target.matches("img")) return;

  const category = e.target.dataset.category;
  const filteredArray = emojisArray.filter((emoji) =>
    emoji.category.toLowerCase().includes(category.toLowerCase())
  );
  showEmojisModal(null, filteredArray);
}

emojiBtn.addEventListener("click", showEmojisModal);
modalContent.addEventListener("click", insertEmoji);
categories.addEventListener("click", filterDisplay);
