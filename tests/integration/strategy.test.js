import GenStrategy from "../../strategy/strategy.js";
import {Readable} from 'stream';

test('strategy should add the gens to save for future save', async () => {
  const strategy = new TestStrategy();

  await strategy.read(
    Readable.from('AAAAAAAAAAAGAAAAAAAAAAAGTCAAAAAAAAAAAWAAAAAAAAAAAG')
  );

  expect(strategy.getSaveCount()).toBe(3);
});

class TestStrategy extends GenStrategy {
  _save() {}

  getSaveCount() {
    return this._waitingForSave.length;
  }
}
