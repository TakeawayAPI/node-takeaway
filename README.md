# Takeaway

Script for accessing the Takeaway Android API.

## Installation
Follow these instructions or alternatively copy all files from this boilerplate to your new project.
```bash
# Shallow clone this repository
git clone git@github.com:DanielHuisman/takeaway
cd takeaway

# Change the default settings
cp .env.example .env
nano .env

# Install the dependencies
yarn
```

## Usage
### Development
#### Linting
This boilerplate comes with a preconfigured ESLint installation. Most editors (e.g. Atom) have plugins for ESLint, but you can also use the command line:
```bash
yarn run lint
```

#### Running
This boilerplate supports automatic reloading, but you can also follow the production instructions if you want manual control over restarts.
```bash
# Build and start the application, will automatically rebuild and restart on changes
yarn run watch
```

### Production
#### Using npm
```bash
# Build the application
yarn run build
# Start the application
yarn run start
```

#### Using a process manager
Alternatively you can use a process manager, like [PM2](https://github.com/Unitech/pm2) or [Forever](https://github.com/foreverjs/forever), to start and monitor this application. For example:
```bash
# Build the application
yarn run build
# Start the application using PM2
pm2 start --name my-project index.js
```
