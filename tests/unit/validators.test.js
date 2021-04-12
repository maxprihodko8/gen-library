import isValidGen from '../../validators';

const cases = {
  // negative
  null: false,
  'AAA': false,
  'AAAAAAAAAAAR': false,

  // positive
  'AAAAAAAAAAA': true,
  'AAAAAAAAAAAGTC': true,
  'AAAAAAAAAAAGGGGGGGGGGGGGGGGGTTTTTTTCCCCCCCCCCCCCCCCCCCCCCCCCCCAAAAAAAAAAAAA': true,
};

for (const [key, value] of Object.entries(cases)) {
  test('check that the gen is valid', () => {
    expect(isValidGen(key)).toBe(value);
  });
}

