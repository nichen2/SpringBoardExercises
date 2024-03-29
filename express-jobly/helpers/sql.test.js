const Helper = require("./sql");
const BadRequestError = require("../expressError");

describe("Helper sqlForPartialUpdate()", function () {
    test("works with valid input", async function () {
        const dataToUpdate = {TestCase: "test"};
        const jsToSql = {TestCase: "test_case"};
        const result = Helper.sqlForPartialUpdate(dataToUpdate, jsToSql);
        expect(result).toEqual({
            setCols: `"test_case"=$1`,
            values: ["test"]
        });
    });

    test("works with multiple inputs", async function () {
        const dataToUpdate = {TestCase: "test", TestCase2: "test2"};
        const jsToSql = {TestCase: "test_case", TestCase2:"test_case_2"};
        const result = Helper.sqlForPartialUpdate(dataToUpdate, jsToSql);
        expect(result).toEqual({
            setCols: `"test_case"=$1, "test_case_2"=$2`,
            values: ["test","test2"]
        });
    });

    test("throws BadRequestError with empty data", function () {
        expect(() => {
          Helper.sqlForPartialUpdate({}, { firstName: "first_name" });
        }).toThrow("No data");
    });
});