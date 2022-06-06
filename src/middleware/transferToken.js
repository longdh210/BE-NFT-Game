// require("dotenv").config();
const Web3 = require("web3");

//admin
const PUBLIC_KEY = "0xcafb6E599F3aBE90e3156AaD600eaD165C231c52";
const PRIVATE_KEY =
    "84ff7416e602d85461f57aec895b680894603d3285e64492faeb86e4330270ae";

const web3 = new Web3("https://rpc-mumbai.matic.today");

const rpsTokenAddress = "0x00357e1DD6e51cab030381D3f0278Db21e3f3C32";
const contract = require("../../RPS.json");
const rpsContract = new web3.eth.Contract(contract.abi, rpsTokenAddress);

const transferToken = async (_addressTo, _amount) => {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    //the transaction
    const tx = {
        from: PUBLIC_KEY,
        to: rpsTokenAddress,
        nonce: nonce,
        gas: 500000,
        data: rpsContract.methods.transfer(_addressTo, _amount).encodeABI(),
    };
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "Successfully",
                            "The hash of your transaction is: ",
                            hash
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
};

module.exports = { transferToken };
