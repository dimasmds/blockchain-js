const Blockchain = require('./blockchain');

describe('Blockchain', () => {
  it('should create blockchain instance correctly', () => {
    const bitcoin = new Blockchain();

    expect(bitcoin).toBeInstanceOf(Blockchain);
    expect(bitcoin.chain).toEqual([]);
    expect(bitcoin.pendingTransactions).toEqual([]);
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

  describe('createNewTransaction', () => {
    it('should create new transactions correctly', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(789457, 'OIUOEDJETH8754DHKD', '78SHNEG45DER56');

      const result = bitcoin.createNewTransaction(100, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');

      expect(bitcoin.chain).toHaveLength(1);
      expect(bitcoin.pendingTransactions).toHaveLength(1);
      expect(result).toEqual(2);
    });

    it('should add pending transaction to chain', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(789457, 'OIUOEDJETH8754DHKD', '78SHNEG45DER56');

      bitcoin.createNewTransaction(100, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');

      bitcoin.createNewBlock(548764, 'AKMC875E6S1RS9', 'WPLS214R7T6SJ3G2');

      expect(bitcoin.chain).toHaveLength(2);
      expect(bitcoin.pendingTransactions).toHaveLength(0);
      expect(bitcoin.chain[1].transactions).toHaveLength(1);
      expect(bitcoin.chain[1].transactions[0].amount).toEqual(100);
      expect(bitcoin.chain[1].transactions[0].sender).toEqual('ALEXHT845SJ5TKCJ2');
      expect(bitcoin.chain[1].transactions[0].receipt).toEqual('JENN5BG5DF6HT8NG9');
    });

    it('should create other pending transaction again', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(789457, 'OIUOEDJETH8754DHKD', '78SHNEG45DER56');
      bitcoin.createNewTransaction(100, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');
      bitcoin.createNewBlock(548764, 'AKMC875E6S1RS9', 'WPLS214R7T6SJ3G2');

      bitcoin.createNewTransaction(50, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');
      bitcoin.createNewTransaction(200, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');
      bitcoin.createNewTransaction(300, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');

      expect(bitcoin.chain).toHaveLength(2);
      expect(bitcoin.pendingTransactions).toHaveLength(3);
    });

    it('should add pending transaction to chain again', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(789457, 'OIUOEDJETH8754DHKD', '78SHNEG45DER56');
      bitcoin.createNewTransaction(100, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');
      bitcoin.createNewBlock(548764, 'AKMC875E6S1RS9', 'WPLS214R7T6SJ3G2');
      bitcoin.createNewTransaction(50, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');
      bitcoin.createNewTransaction(200, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');
      bitcoin.createNewTransaction(300, 'ALEXHT845SJ5TKCJ2', 'JENN5BG5DF6HT8NG9');

      bitcoin.createNewBlock(8292877, 'AKKIJUSBBVMXZAZXJZ', 'KKSIKMXALSKRSKS');

      expect(bitcoin.chain).toHaveLength(3);
      expect(bitcoin.pendingTransactions).toHaveLength(0);
      expect(bitcoin.chain[2].transactions).toHaveLength(3);
    });
  });
});
