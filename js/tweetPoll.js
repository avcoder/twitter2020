const pollBtn = document.querySelector('#poll-btn');
const imgGifPoll = document.querySelector('#imgGifPoll');
const textArea = document.querySelector('#tweet-area');
let tweets;
let render;


function voteOptions() {
    const voted = {
        a: imgGifPoll.querySelector('#pollchoice1')?.value,
        b: imgGifPoll.querySelector('#pollchoice2')?.value,
        c: imgGifPoll.querySelector('#pollchoice3')?.value,
        d: imgGifPoll.querySelector('#pollchoice4')?.value,
    };

    return voted;
}

function isCreated() {
    // collect what was typed for vote options
    // if no poll created, then these will be undefined
    // then it will return false
    const voted = voteOptions();

    // TODO - Write the 1 line of code below that would return true if all values filled
    // TODO - Otherwise it would return false if even one field remained blank
    return !!(voted.a && voted.b && voted.c && voted.d);
}

function addProps(newTweet) {
    const modTweet = {
        // TODO - What's the one line of code that spreads our current newTweet object?
        ...newTweet,
        isPollCreated: true,
        isPollDone: false,
        voteOptions: voteOptions(),
        pollResults: {},
    };

    return modTweet;
}


function insertPoll() {
    // TODO - change the placeholder text from "What's happening" to "Ask a question"
    textArea.placeholder = 'Ask a question';

    imgGifPoll.innerHTML = `
        <br/>
        <form action="" id="pollchoices">
        <div class="form-group">
        <input type="text" class="form-control w-50 mx-auto" id="pollchoice1" maxlength="25" placeholder="Choice 1"/>
        <br/>
        <input type="text" class="form-control w-50 mx-auto" id="pollchoice2" maxlength="25" placeholder="Choice 2"/>
        <br/>
        <input type="text" class="form-control w-50 mx-auto" id="pollchoice3" maxlength="25" placeholder="Choice 3"/>
        <br/>
        <input type="text" class="form-control w-50 mx-auto" id="pollchoice4" maxlength="25" placeholder="Choice 4"/>
        <br/>
        </div>
        </form>
    `;
}

function votesToPercentages(votes) {
    const total = votes.a + votes.b + votes.c + votes.d;
    return {
        a: Math.floor((votes.a / total) * 100),
        b: Math.floor((votes.b / total) * 100),
        c: Math.floor((votes.c / total) * 100),
        d: Math.floor((votes.d / total) * 100),
        totalVotes: total
    }
}

function getIndexOfChosen(letter) {
    const dictionary = ['a', 'b', 'c', 'd'];
    // TODO - use .findIndex to return the index value of the parameter
    // TODO - example: if letter is 'b', then .findIndex would return 1
    return dictionary.findIndex(el => el === letter);
}

function displayVotes(tweet, idx) {
    if (tweet.isPollDone) {
        const percents = votesToPercentages(tweet.pollResults);
        const chose = getIndexOfChosen(tweet.pollResults.youChose);

        return `
        <div class="bargraph">
            <div id="bar1" class="bar ${chose === 0 ? 'chosen' : ''}" style="flex-basis: ${percents.a}%" data-vote="a">${tweet.voteOptions.a}</div>
            <div id="percentage1">${percents.a}%</div>
        </div>
        <div class="bargraph">
            <div id="bar1" class="bar ${chose === 1 ? 'chosen' : ''}" style="flex-basis: ${percents.b}%" data-vote="a">${tweet.voteOptions.b}</div>
            <div id="percentage1">${percents.b}%</div>
        </div>
        <div class="bargraph">
            <div id="bar1" class="bar ${chose === 2 ? 'chosen' : ''}" style="flex-basis: ${percents.c}%" data-vote="a">${tweet.voteOptions.c}</div>
            <div id="percentage1">${percents.c}%</div>
        </div>
        <div class="bargraph">
            <div id="bar1" class="bar ${chose === 3 ? 'chosen' : ''}" style="flex-basis: ${percents.d}%" data-vote="a">${tweet.voteOptions.d}</div>
            <div id="percentage1">${percents.d}%</div>
        </div>
        <p>${percents.totalVotes} votes</p>
        `
    }

    // TODO - What object notation goes inside the template literal for 'a'?
    return `
        <div className="poll flex-col" data-idx="${idx}">
            <button class="vote" value="a">${tweet.voteOptions.a}</button>
            <button class="vote" value="b">${tweet.voteOptions.b}</button>
            <button class="vote" value="c">${tweet.voteOptions.c}</button>
            <button class="vote" value="d">${tweet.voteOptions.d}</button>
        </div>
    `;
}


pollBtn.addEventListener('click', insertPoll)

export const poll = {
    isCreated: isCreated,
    addProps: addProps,
    display: displayVotes,
}