export class Person {
  constructor(
    public name: string,
    public lastname: string,
    public age: number,
    public weigth: number,
    public heigth: number
  ) {}

  calcIMC(): string {
    const result =  Math.round(this.weigth / (this.heigth * this.heigth));
    // 0 - 18 = down
    // 19 - 24 = normal
    // 25 - 26 = overweigth
    // 27 - 29 = overweigth level 1
    // 30 - 39 = overweigth level 2
    // 40 = overweigth level 3
    if(result < 0){
      return 'not found'
    }else if ( result >= 0 && result < 18){
      return 'down'
    }else if ( result >= 18 && result <= 24){
      return 'normal'
    }else if ( result >= 25 && result <= 26){
      return 'overweigth'
    }else if ( result >= 27 && result <= 29){
      return 'overweigth level 1'
    }else if ( result >= 30 && result <= 39){
      return 'overweigth level 2'
    }else if ( result >= 40){
      return 'overweigth level 3'
    } else {
      return 'not found'
    }
  }
}
