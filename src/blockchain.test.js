const Blockchain = require('./blockchain');

describe('Blockchain', () => {
  it('should create blockchain instance correctly', () => {
    const bitcoin = new Blockchain();

    expect(bitcoin).toBeInstanceOf(Blockchain);
    expect(bitcoin.chain).toEqual([]);
    expect(bitcoin.newTransactions).toEqual([]);
  });

  describe('createNewBlock', () => {
    it('should create new block correctly', () => {
      const bitcoin = new Blockchain();

      bitcoin.createNewBlock(2389, 'OIUOEREDHKHKD', '78s97d4x6dsf');

      expect(bitcoin.chain).toHaveLength(1);
      expect(bitcoin.chain[0].index).toEqual(1);
      expect(bitcoin.chain[0].timestamp).toBeTruthy();
      expect(bitcoin.chain[0].nonce).toEqual(2389);
      expect(bitcoin.chain[0].hash).toEqual('78s97d4x6dsf');
      expect(bitcoin.chain[0].previousBlockHash).toEqual('OIUOEREDHKHKD');
    });

    it('should create many new block correctly', () => {
      const bitcoin = new Blockchain();

      bitcoin.createNewBlock(2389, 'OIUOEREDHKHKD', '78s97d4x6dsf');
      bitcoin.createNewBlock(2231, 'OIUASDEDHKWEW', '78s97dxww2qw');
      bitcoin.createNewBlock(2212, 'MOAHSAJJWKASD', '123x239sj22x');

      expect(bitcoin.chain).toHaveLength(3);
    });
  });

  describe('getLastBlock', () => {
    it('should return the last block correctly', () => {
      const bitcoin = new Blockchain();

      bitcoin.createNewBlock(2389, 'OIUOEREDHKHKD', '78s97d4x6dsf');
      bitcoin.createNewBlock(2231, 'OIUASDEDHKWEW', '78s97dxww2qw');
      bitcoin.createNewBlock(2212, 'MOAHSAJJWKASD', '123x239sj22x');

      const block = bitcoin.getLastBlock();

      expect(block.nonce).toEqual(2212);
      expect(block.previousBlockHash).toEqual('MOAHSAJJWKASD');
      expect(block.hash).toEqual('123x239sj22x');
    });
  });
});
