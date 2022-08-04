# Getting Started with Platzi Punks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Upload file to IPFS

Check documentation for manage files on [infura](https://docs.infura.io/infura/networks/ipfs/how-to/manage-files)

```
➜  platzi-punks-interface git:(main) curl "https://ipfs.infura.io:5001/api/v0/add?pin=true&cid-version=1" -X POST -H "Content-Type: multipart/form-data" -F file="Bren Platzi Punks"  
{"Name":"bafkreifd7uy5dno5wkanltwnedujy6cqm7f3jjpespzjta4t5t7n2dlfwa","Hash":"bafkreifd7uy5dno5wkanltwnedujy6cqm7f3jjpespzjta4t5t7n2dlfwa","Size":"17
```

### Check public gateway checker IPFS
[https://ipfs.github.io/public-gateway-checker/]
1. Select one hostname of the list
2. Copy the hash and put in in the beggining to test \
[https://bafkreifd7uy5dno5wkanltwnedujy6cqm7f3jjpespzjta4t5t7n2dlfwa.ipfs.dweb.link/#x-ipfs-companion-no-redirect]\
[https://ipfs.io/ipfs/bafkreifd7uy5dno5wkanltwnedujy6cqm7f3jjpespzjta4t5t7n2dlfwa]

