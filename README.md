# Follow Stocks

## Testing

Run `npm test` to execute all tests files.\
NPM will execute jest through the following command:
``` 
ELECTRON_RUN_AS_NODE=true ./node_modules/.bin/electron ./node_modules/jest-cli/bin/jest.js
```
The reason for this command can be found in this [issue](https://github.com/JoshuaWise/better-sqlite3/issues/545).