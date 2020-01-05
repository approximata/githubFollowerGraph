# Github Follower Graph

Toy project implementing a simple a flat [sociogaph](https://en.wikipedia.org/wiki/Sociometry) about the followers of a github user.
The project aims to experiment with the latest github APIs ([GraphQL API v4](https://developer.github.com/v4/)).

## How to launch the Project

### Creating a personal access token for the github command line

Check this [article](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) to setup a proper token for a github user.
This project read data only!

### Setup local enviroment varaible
Setup the access token to your local enviroment:

```bash
$ echo "REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN={your token}" >> .env
```

### Launch the project locally

```bash
$ npm install
$ npm run start-dev
```
Once the build done server is up under http://localhost:3000.

[Here](https://gitfollowersocio.herokuapp.com/) is a deployed version of the project