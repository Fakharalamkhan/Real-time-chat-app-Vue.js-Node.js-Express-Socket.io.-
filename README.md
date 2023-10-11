

## Getting started

Make sure the [latest node version](https://nodejs.org/en/) is installed on your machine.

In the folder ChattyChat you can find two folders: _frontend_ and _backend_:
- The _frontend_ folder contains the [Vue3](https://vuejs.org/) application.
- The _backend_ folder contains the [Socket.io](https://socket.io/) server realized with [Express](https://expressjs.com/de/).

To install the dependencies, run the following commands in the _frontend_ and _backend_ folder respectively:
```bash
cd ./ChattyChat/frontend && npm install
cd ./ChattyChat/backend && npm install
```

To start the application, run the following commands in the _frontend_ and _backend_ folder respectively:
```bash 
npm run dev    # to start your frontend
npm run start  # to start the backend server
```

Note: Make sure you are in the right folder before running the commands.

If you succeeded, you can access a basic vue application on http://localhost:5173.