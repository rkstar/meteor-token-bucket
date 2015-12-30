let instance = null
class Bucket {
  constructor(){
    instance = instance || this
    return instance
  }

  addToken(token){
    if( !this.limit || (this.bucket.length < this.limit) ){
      this.bucket.push(token)
    }
  }

  getToken(){
    return this.bucket.shift()
  }

  addTokenAtInterval(token, interval=1000, intervalValue='ms'){
    if( !_.isInteger(interval) ){
      return
    }

    let iv = interval
    switch( intervalValue ){
      case 'd':
      case 'day':
      case 'days':
        iv *= 1000 * 60 * 60 * 24
        break

      case 'h':
      case 'hr':
      case 'hrs':
      case 'hour':
      case 'hours':
        iv *= 1000 * 60 * 60
        break

      case 'm':
      case 'min':
      case 'mins':
      case 'minute':
      case 'minutes':
        iv *= 1000 * 60
        break

      case 's':
      case 'sec':
      case 'secs':
      case 'second':
      case 'seconds':
        iv *= 1000
        break
    }

    this.intervals[token] = setInterval(()=>{
      this.addToken(token)
    }, iv)
  }

  stopAddingToken(token){
    if( this.intervals[token] ){
      clearInterval(this.intervals[token])
      delete this.intervals[token]
    }
  }

  get bucket(){
    if( !this._bucket ){
      this.bucket = []
    }
    return this._bucket
  }
  set bucket(value){
    if( !_.isArray(value) ){
      value = [value]
    }
    this._bucket = value
  }

  get intervals(){
    if( !this._intervals ){
      this.intervals = {}
    }
    return this._intervals
  }
  set intervals(value){
    if( !_.isObject(value) ){
      value = {value}
    }
    this._intervals = value
  }

  get limit(){
    if( !this._limit ){
      this.limit = 0
    }
    return this._limit
  }
  set limit(int){
    this._limit = !_.isInteger(int) ? 0 : int
  }
}

TokenBucket = new Bucket()