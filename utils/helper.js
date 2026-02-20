

function randomString(qnt) {
    const chr = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";

    for (let i = 0; i < qnt; i++) {
        const index = Math.floor(Math.random() * chr.length);
        randomString += chr[index];
    }
    return randomString;

}


module.exports = { randomString  };



