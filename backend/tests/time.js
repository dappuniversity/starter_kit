const jsonrpc = '2.0';

export const advanceTime = time => new Promise((resolve, reject) => {
  web3.currentProvider.send({
    jsonrpc,
    method: 'evm_increaseTime',
    params: [time],
    id: new Date().getTime(),
  }, (err, result) => {
    if (err) { return reject(err); }
    return resolve(result);
  });
});

export const advanceBlock = () => new Promise((resolve, reject) => {
  web3.currentProvider.send({
    jsonrpc,
    method: 'evm_mine',
    id: new Date().getTime(),
  }, (err, _result) => {
    if (err) { return reject(err); }
    const newBlockHash = web3.eth.getBlock('latest').hash;

    return resolve(newBlockHash);
  });
});

export const takeSnapshot = () => new Promise((resolve, reject) => {
  web3.currentProvider.send({
    jsonrpc,
    method: 'evm_snapshot',
    id: new Date().getTime(),
  }, (err, snapshotId) => {
    if (err) { return reject(err); }
    return resolve(snapshotId);
  });
});

export const revertToSnapShot = id => new Promise((resolve, reject) => {
  web3.currentProvider.send({
    jsonrpc,
    method: 'evm_revert',
    params: [id],
    id: new Date().getTime(),
  }, (err, result) => {
    if (err) { return reject(err); }
    return resolve(result);
  });
});

export const advanceTimeAndBlock = async time => {
  await advanceTime(time);
  await advanceBlock();
  return Promise.resolve(web3.eth.getBlock('latest'));
};
