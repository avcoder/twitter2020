// user to type in keyword, then gifs are fetched then displayed
// we have to listen for key events for the keyword search box
const searchGif = document.querySelector("#searchGif");
const browseGifs = document.querySelector("#browsegifs");
const switchGif = document.querySelector("#togglegifs");
const imgGifPoll = document.querySelector(".imgGifPoll");

// Now we are listening for key events,
// let's go ahead and fetch gifs based on what was typed
async function getGifs() {
  const gifs = [];
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=pEPTndRRzEXMhO8Nn5NK9pBd89VyvjT4&q=${searchGif.value}&limit=12`
  );
  const data = await res.json();

  gifs.push(...data.data);

  browseGifs.innerHTML = gifs
    .map(
      (gif) => `
      <img src="${gif.images.fixed_height_small_still.url}"
      data-original="${gif.images.original.url}"
      data-small="${gif.images.fixed_height_small.url}"
      data-still="${gif.images.fixed_height_small_still.url}">
      `
    )
    .join("");
}

// user optionally can click on toggle, which makes gifs still images; and vice versa
// user can click to select a gif, and that is then inserted into tweet area
function toggleGifs() {
  const allImgs = browseGifs.querySelectorAll("img");
  if (switchGif.checked) {
    allImgs.forEach((img) => (img.src = img.dataset.small));
  } else {
    allImgs.forEach((img) => (img.src = img.dataset.still));
  }
}

function selectGif(e) {
  if (!e.target.matches("img")) return;

  const url = e.target.dataset.original;
  console.log(url);

  $("#modalgifs").modal("hide");

  imgGifPoll.innerHTML = `<img src="${url}">`;
}

searchGif.addEventListener("keyup", getGifs);
switchGif.addEventListener("change", toggleGifs);
browseGifs.addEventListener("click", selectGif);
