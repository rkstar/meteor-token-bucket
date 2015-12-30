let instance = null
TokenBucket = class {
  constructor(){
    instance = instance || this
    return instance
  }

  addToken(token){
    this.underLimit()
      ? this.bucket.push(token)
      : this.stopAddingToken(token, true)
  }

  getToken(){
    let token = this.bucket.shift(),
      ref = this.intervalReferences[token]
    if( ref && ref.paused && this.underLimit() ){
      this.intervalReferences[token].paused = false
      this.addTokenAtInterval(ref.token, ref.interval, ref.intervalValue)
    }
    return token
  }

  addTokenAtInterval(token, interval=1000, intervalValue='ms'){
    if( !_.isNumber(interval) ){
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

    this.addTokenIntervalReference(token, interval, intervalValue)
    this.intervals[token] = setInterval(()=>{
      this.addToken(token)
    }, iv)
  }

  addTokenIntervalReference(token, interval=1000, intervalValue='ms'){
    this.intervalReferences[token] = {token, interval, intervalValue}
  }

  stopAddingToken(token, pause=false){
    if( this.intervals[token] ){
      clearInterval(this.intervals[token])
      delete this.intervals[token]
      if( pause ){
        this.intervalReferences[token].paused = true
      } else {
        delete this.intervalReferences[token]
      }
    }
  }

  underLimit(){
    if( !this.limit ){
      return true
    }
    return (this.bucket.length < this.limit)
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

  get intervalReferences(){
    if( !this._intervalReferences ){
      this.intervalReferences = {}
    }
    return this._intervalReferences
  }
  set intervalReferences(value){
    if( !_.isObject(value) ){
      value = {value}
    }
    this._intervalReferences = value
  }

  get limit(){
    if( !this._limit ){
      this.limit = 0
    }
    return this._limit
  }
  set limit(int){
    this._limit = !_.isNumber(int) ? 0 : int
  }
}