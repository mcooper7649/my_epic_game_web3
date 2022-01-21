const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    [
      'ShittyCharmander',
      'Squirtle',
      'BulbaSaur',
      'Pikachu',
      'Charmander',
      'Charzard',
    ], // Names
    [
      'https://i.imgur.com/m6Npjmq.mp4', // shitty charmander
      'https://i.imgur.com/mzO0UdI.mp4',
      'https://i.imgur.com/jwub4R5.gif',
      'https://i.imgur.com/qrV2HqJ.gif',
      'https://i.imgur.com/857Ux1O.gif',
      'https://i.imgur.com/J3gAtBY.gif',
    ],
    [100, 200, 250, 300, 500, 1000], // HP values
    [100, 50, 25, 150, 200, 1000] // Attack damage values
  );
  await gameContract.deployed();
  console.log('Contract deployed to:', gameContract.address);
  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log('Token URI:', returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
