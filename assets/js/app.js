// Variables
const tweetList = document.getElementById('tweet-list');

// Events
eventListeners();

function eventListeners() {
  document.querySelector('#form').addEventListener('submit', newTweet);

  tweetList.addEventListener('click', removeTweet);

  document.addEventListener('DOMContentLoaded', localStorageLoad());
}

// Functions

function newTweet(e) {
  e.preventDefault();

  const tweet = document.getElementById('tweet').value;

  const removeBtn = document.createElement('a');
  removeBtn.classList = 'remove-tweet';
  removeBtn.textContent = 'X';

  const li = document.createElement('li');
  li.textContent = tweet;

  li.appendChild(removeBtn);
  tweetList.appendChild(li);

  addTweetLocalStorage(tweet);

  // alert('Tweet Added');

  this.reset();
}

function removeTweet(e) {
  if (e.target.classList.contains('remove-tweet')) {
    e.target.parentElement.remove();
  }

  removeTweetLocalStorage(e.target.parentElement.textContent);
}

function addTweetLocalStorage(tweet) {
  let tweets = getTweetsFromStoroage();

  tweets.push(tweet);

  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStoroage() {
  let tweets;
  const tweetsLS = localStorage.getItem('tweets');
  if (tweetsLS === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLS);
  }
  return tweets;
}

function localStorageLoad() {
  let tweets = getTweetsFromStoroage();
  tweets.forEach(function(tweet) {
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    const li = document.createElement('li');
    li.textContent = tweet;

    li.appendChild(removeBtn);
    tweetList.appendChild(li);
  });
}

function removeTweetLocalStorage(tweet) {
  let tweets = getTweetsFromStoroage();

  const tweetDelete = tweet.substring(0, tweet.length - 1);

  tweets.forEach(function(tweetLS, index) {
    if (tweetDelete === tweetLS) {
      tweets.splice(index, 1);
    }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets));
}
