const { expect } = require("@jest/globals");
const { nbitadder } = require("./gates");

describe('nbitadder', () => {
    it('adds properly', () => {
        const a = [0, 0, 0, 1, 0, 1];
        const b = [0, 0, 0, 1, 0, 1];
        const c = [0, 1, 1, 0, 1, 0];

        expect(nbitadder(a, b, 0)).toEqual(c)
    })
    it('add different array lengths', () => {
        const a = [0,0,0,1];
        const b = [0,0,0,1,0];
        const c = [0,0,0,1,1];

        expect(nbitadder(a, b, 0)).toEqual(c)
    })
})