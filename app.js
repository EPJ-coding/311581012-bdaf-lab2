const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet').hdkey;

function generate_address() {
    //Obtain entropy - Generate mnemonic code
    const mnemonic = bip39.generateMnemonic();

    // Convert entropy to seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    //Use seed to obtain hdwallet
    const hdWallet = hdkey.fromMasterSeed(seed);

    //Generate address
    const keyPair = hdWallet.derivePath("m/44'/60'/0'/0/0");
    const wallet = keyPair.getWallet();
    const address = wallet.getChecksumAddressString();

    return [ mnemonic, address ];
}

function check_prefix(address, _pre) {
    return address.startsWith("0x"+_pre);
}



//Input target prefix
if (process.argv.length != 3) {
    console.log("Invalid argument format. Please use the following format:");
    console.log("node app.js { prefix_number } ");
    process.exit(1);
}

const _pre = process.argv[2];


while(1){
    var [ mnemonic, address ] = generate_address() ;
    if (check_prefix(address, _pre)) break;
}

console.log(mnemonic);
console.log(address)

