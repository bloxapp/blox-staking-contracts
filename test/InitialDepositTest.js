const Web3 = require('web3');
const bloxStaking = artifacts.require("BloxStaking");
const depositContract = artifacts.require("DepositContract");

contract("BloxStaking - initial deposit", async accounts => {
    it("should get counter", async () => {
        let instance = await bloxStaking.deployed();
        let count = await instance.getCount.call();
        assert.equal(count.valueOf(), 0);
    });

    it("test simple deposit", async () => {
        let instance = await bloxStaking.deployed();

        const decimals = Web3.utils.toBN(10).pow(Web3.utils.toBN(18));
        value = Web3.utils.toBN(33).mul(decimals);

        return instance
            .validatorDeposit
            .sendTransaction(
                web3.utils.hexToBytes("0xa70360aa20eb09a00019e47c9775ba8e655b934b86de409a49a25e4196663c5f10dffe29b12b7cf782e4561a43c5c62c"),
                web3.utils.hexToBytes("0x00c76a029adcac82fe161b34f44de3c8c94182ffe75bf29a938691ebfd66bf6b"),
                web3.utils.hexToBytes("0x88ff6c5a44b85db96b684cee772506489ae388838fe4d13435bf415de23ce14a9b4f254dd1f456cffbb581d87f4a6ce806f559e8d1afa28cdbde84a5fba6526e9f948ddde7166d8ba8218478e5e681833492d61a7b49d11ced0718ac317218df"),
                web3.utils.hexToBytes("0x6255505dc4c2ba5828cc6ad8f47bd122f02d8c840fc1aa81abd817f3971c2d79"),
                {from: accounts[1], value: value}
            )
            .then(res => {
                console.log(res);
                res.receipt.logs.forEach(function(v,i,arr) {
                    console.log(v);
                });
            })
            .catch (e => {
                console.log(e);
            })
    });


    // it("should call a function that depends on a linked library", async () => {
    //     let meta = await MetaCoin.deployed();
    //     let outCoinBalance = await meta.getBalance.call(accounts[0]);
    //     let metaCoinBalance = outCoinBalance.toNumber();
    //     let outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    //     let metaCoinEthBalance = outCoinBalanceEth.toNumber();
    //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance);
    // });
    //
    // it("should send coin correctly", async () => {
    //     // Get initial balances of first and second account.
    //     let account_one = accounts[0];
    //     let account_two = accounts[1];
    //
    //     let amount = 10;
    //
    //     let instance = await MetaCoin.deployed();
    //     let meta = instance;
    //
    //     let balance = await meta.getBalance.call(account_one);
    //     let account_one_starting_balance = balance.toNumber();
    //
    //     balance = await meta.getBalance.call(account_two);
    //     let account_two_starting_balance = balance.toNumber();
    //     await meta.sendCoin(account_two, amount, { from: account_one });
    //
    //     balance = await meta.getBalance.call(account_one);
    //     let account_one_ending_balance = balance.toNumber();
    //
    //     balance = await meta.getBalance.call(account_two);
    //     let account_two_ending_balance = balance.toNumber();
    //
    //     assert.equal(
    //         account_one_ending_balance,
    //         account_one_starting_balance - amount,
    //         "Amount wasn't correctly taken from the sender"
    //     );
    //     assert.equal(
    //         account_two_ending_balance,
    //         account_two_starting_balance + amount,
    //         "Amount wasn't correctly sent to the receiver"
    //     );
    // });
});