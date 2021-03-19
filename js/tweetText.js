import { tweets } from "./app.js";
import { poll } from "./tweetPoll.js";
import { img } from "./tweetImg.js";
import { gif } from "./tweetGifs.js";

// we need to take the text that was typed in the textbox
const textArea = document.querySelector("#tweet-area");
const feed = document.querySelector("#feed");
const tweetBtn = document.querySelector("#tweet-btn");
const imgGifPoll = document.querySelector("#imgGifPoll");


function tweetNew() {
  const text = textArea.value;
  // then we need to create dfynamically an object that looks like:
  // { text: this-value-comes-from-textarea }
  let newTweet = {
    text,
    avatar: "https://avatars.githubusercontent.com/u/7874705?v=4",
  };

  // triage - depending if poll, gif, or image was created, triage new Tweet to that 
  // module so that it will contain all the props needed
  if (poll.isCreated() === true) {
    newTweet = poll.addProps(newTweet);
  } else if (img.isCreated() === true) {
    newTweet = img.addProps(newTweet);
  } else if (gif.isCreated() === true) {
    newTweet = gif.addProps(newTweet);
  }

console.log(newTweet)
  // then we can insert our object into our array called tweets
  tweets.unshift(newTweet);

  // clear field
  textArea.value = "";
  imgGifPoll.innerHTML = '';
  textArea.placeholder = "What's happening?"

  // then we render tweets array
  // Once tweet button is clicked, then do the above steps, then render
  render();
}

function render() {
  feed.innerHTML = tweets
    .map(
      (tweet, idx) => `
    <aside>
    <div>
      <img
        class="avatar"
        src="${tweet.avatar}"
        alt="avatar"
      />
    </div>
    <div class="formatted-tweet">
      <h6>
        <a href="https://twitter.com/avcoder">Albert V.</a>
        <span class="username">@avcoder</span>
      </h6>
      <p>${tweet.text}</p>
      <div class="imgGifPoll w-100">
        ${tweet.isPollCreated ? poll.display(tweet, idx) : ''}
        ${tweet.isGifCreated ? gif.display(tweet) : ''}
        ${tweet.isImgCreated ? img.display(tweet) : ''}
      </div>
      <div>
        <footer>
          <div id="reactions" class="btn-group mr-2">
            <button
              type="button"
              class="btn btn-secondary mdi mdi-message-outline"
              aria-label="reply"
            ></button>
            <button
              type="button"
              class="btn btn-secondary mdi mdi-twitter-retweet"
              aria-label="retweet"
            ></button>
            <button
              type="button"
              class="btn btn-secondary mdi mdi-heart-outline"
              aria-label="like"
              style=""
            ></button>
            <button
              type="button"
              class="btn btn-secondary mdi mdi-upload"
              aria-label="share"
            ></button>
          </div>
        </footer>
      </div>
    </div>
  </aside>    
    `
    )
    .join("");
}

async function pushVoteToServer(value) {
  const res = await fetch(`https://vibrant-beaver-571932.netlify.app/.netlify/functions/hello?vote=${value}`);
  const data = await res.json();

  return data;
}


async function vote(e) {
  if (!e.target.matches('.vote')) return;

  // Assign a const called data to be the return value of our call to 
  // our async function called pushVoteToServer using the argument of e.target.value
  const data = await pushVoteToServer(e.target.value);

  // TODO - find data-idx's value so we know which element in tweets array to change
  const index = e.target.closest('[data-idx]').dataset.idx;

  // add JSON results into our tweets array by dynamically adding new props
  tweets[index].pollResults = {
    a: data[0],
    b: data[1],
    c: data[2],
    d: data[3],
    youChose: e.target.value 
  };
  tweets[index].isPollDone = true;

  render();
}

tweetBtn.addEventListener("click", tweetNew);
feed.addEventListener('click', vote);
