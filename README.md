TokenBucket
===============

Easily create and manage a bucket of tokens

## Package Dependencies
* meteor 1.2.0.2 (uses es2015 syntax)
* underscore
* ecmascript

## Usage
`meteor add rkstar:token-bucket`

## Methods

### addToken(token)
Adds a `token` to your bucket
```javascript
TokenBucket.addToken('single-token')
```
### getToken()
Retrieves a token from your bucket
```javascript
let token = TokenBucket.getToken()
If no tokens are available, `token` will be `null`

### addTokenAtInterval(token, [interval], [intervalValue])
Adds `token` to your bucket at a regular `interval`
```javascript
TokenBucket.addTokenAtInterval('auto-token', 5, 'seconds')
```
* token => your token to add to the bucket
* interval => **default 1** (number) the frequency to add this token to the bucket
* intervalValue => **default ms** (string) value of the frequency number. options are:
`ms / millisonds` => milliseconds
`s / seconds` => seconds
`m / minutes` => minutes
`h / hours` => hours
`d / days` => days

### stopAddingToken(token)
Stops the automatic adding of `token` that was started by using `addTokenAtInterval`
```javascript
TokenBucket.stopAddingToken('auto-token')
```

## Properties

### limit
Set a limit for the number of tokens in your bucket at any one time.  No tokens will be added above the limit.