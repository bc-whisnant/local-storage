// variables
const tweetList = document.querySelector('#tweet-list');


// event listeners

function eventListeners() {
    document.querySelector('form').addEventListener('submit', newTweet);

    // remove tweet from list
    tweetList.addEventListener('click', removeTweet);

    // when page loads it will print the tweets from storage
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

eventListeners();


// functions

function newTweet(event) {
    // stops form from submitting
    event.preventDefault();
    // console.log('form submitted');

    // read text area value
    const tweet = document.querySelector('#tweet').value;

    // create remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    // crate an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;;

    // add remove button to each tweet
    li.appendChild(removeBtn);

    // add to the list
    tweetList.appendChild(li);

    // add to local storage
    addTweetLocalStorage(tweet);

    // print alert
    alert('Tweet added');

    // reset the form field
    this.reset();
}

// removes tweets from dom
function removeTweet(event) {
    if(event.target.classList.contains('remove-tweet')) {
        event.target.parentElement.remove();
    }
    
    // remove from storage
    removeTweetLocalStorage(event.target.parentElement.textContent);
}

// add tweets to local storage
function addTweetLocalStorage(tweet) {
    let tweets = getTweetsFromStorage();
    
    // add tweet into array
    tweets.push(tweet);

    // convert array into string
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    // get values - if null is returned create empty array
    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

// when page loads it will print the tweets from storage
function localStorageOnLoad() {
    let tweets = getTweetsFromStorage();

    // loop through and print each element
    tweets.forEach(function(tweet) {
        // create remove button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        // crate an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;;

        // add remove button to each tweet
        li.appendChild(removeBtn);

        // add to the list
        tweetList.appendChild(li);
    });
}

// remove tweets from storage
function removeTweetLocalStorage(tweet) {
    // get tweets from storage
    let tweets = getTweetsFromStorage();
    console.log(tweets);

    // remove X from tweet
    const tweetDelete = tweet.substring(0, tweet.length - 1);
    
    // loop through the tweets and remove the tweet that is equal
    tweets.forEach(function(tweetLS, index) {
        if(tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }

    });
    // save the data
    localStorage.setItem('tweets', JSON.stringify(tweets));

}