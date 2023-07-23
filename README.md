<img src="/client/src/assets/logo.png" alt="Chamel Code logo" height="90">

# OpinionMeter
OpinionMeter is a web app serving as a forum for sharing, rating and commenting on different opinions on a variety of topics, using statistical data from users to determain target audiences which agree or dissagree on certain positions. <br>Made with NodeJS, Angular and MongoDB, utilizing Redis for content caching for optimal performance.

## Features

* *Creating a user profile* - To be able to post and rate opinions on the app, users must create a profile providing perosnal data which is used in statistical calculations.
*  *Posting and rating posts* - Any user with an account can create, rate and comment on other opinions.
*  *Viewing opinion statistics* - All users have access to a statistics page of any post, showing statistical data based on users' interactions.
*  *Most engaging posts* - Engagement is tracked for all posts, and the post engaging posts are recommanded to users.
*  *Caching* - Content is cached using Redis, caching is done by category and page to achieve optimal load times and reduce database requests.
*  *Responive design* - The layout of the webiste is adaptable to a variety of screen sizes

## Getting started
```sh
git clone -b main https://github.com/VeljkoMU/OpinionMeter/
cd OpinionMeter
cd server
npm install
node server.js
```
The app should be available on localhost post 5500.
  
