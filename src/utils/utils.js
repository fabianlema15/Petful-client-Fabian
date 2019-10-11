const Utils = {
  generateFakeQueue(){
    let users = 0;
    let time = 0;
    let each = 0;
    while(users<2)
     users = Math.floor(Math.random() * 8);
    while(time<3){
      each = Math.floor(Math.random() * 10)
      time = each * users;
    }

    return {users, time, each}
  }
}

export default Utils;
