// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
    const expected = 30;
    const got = mut.sum(12, 18);
    expect(got).toBe(expected);
});

test("Testing div 0/0", () => {
    const got = mut.div(0,0);
    expect(got).toBeNaN();
});

test("Testing div inf", () => {
    const expected = Infinity;
    const got = mut.div(2,0);
    expect(got).toBe(expected);
});

test("Testing div -inf", () => {
    const expected = -Infinity;
    const got = mut.div(-2,0);
    expect(got).toBe(expected);
});

test("Testing div basic op, negative result", () => {
    const expected = -1;
    const got = mut.div(-2,2);
    expect(got).toBe(expected);
});

test("Testing div basic op, positive result", () => {
    const expected = 1;
    const got = mut.div(2,2);
    expect(got).toBe(expected);
});

test("Testing string with numbers", () => {
    const expected = true;
    const got = mut.containsNumbers("string11");
    expect(got).toBe(expected);
});

test("Testing string without numbers", () => {
    const expected = false;
    const got = mut.containsNumbers("string");
    expect(got).toBe(expected);
});

test("Testing false for empty string", () => {
    const expected = false;
    const got = mut.containsNumbers("");
    expect(got).toBe(expected);
});

test("Testing string with spaces", () => {
    const expected = true;
    const got = mut.containsNumbers("string with space 12");
    expect(got).toBe(expected);
});

test("Testing a string with a space", () => {
    const expected = false;
    const got = mut.containsNumbers(" ");
    expect(got).toBe(expected);
});





