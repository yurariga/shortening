const shortening = require('./shortening');

describe('Checking Shortening function should accept 2 parameters', () => {
    const parameter1 = 123;
    const parameter2 = 'K';
    it(
        `Incoming parameters : ${parameter1} and ${JSON.stringify(parameter2)}; Expecting result: { value: 0.123, valueUnit: ${JSON.stringify(parameter2)} }`,
        () => {
            expect(shortening(parameter1, parameter2)).toMatchObject({
                value: 0.123,
                valueUnit: parameter2
            });
        }
    )
});

describe('Checking supported valueUnits', () => {
    const suppotedUnits = ['', 'K', 'M', 'bn', 'T'];
    for ( let i = 0; i < suppotedUnits.length; i++ ) {
        const randomNumber = Math.floor(Math.random() * 1e12) 
        it(
            `Testing unit ${JSON.stringify(suppotedUnits[i])}`,
            () => {
                expect(suppotedUnits.includes(shortening(randomNumber, suppotedUnits[i]).valueUnit)).toBe(true);
            }
        )
      }
    }
);

describe(
    'Checking given value is converted to desiredValue unit', 
    () => {
        const testCases = [
            {
                incoming: [123, 'K'],
                expected: [0.123, 'K']
            }, 
            {
                incoming: [-1e6, 'M'],
                expected: [-1, 'M']
            },
            {
                incoming: [2e9, 'bn'],
                expected: [2, 'bn']
            }, 
            {
                incoming: [3e12, 'T'],
                expected: [3, 'T']
            }, 
          
        ];

        testCases.forEach( test => {
            it(
                `Incoming arguments : ${
                        [test.incoming[0], 
                        JSON.stringify(test.incoming[1])]
                }; Expecting { value: ${test.expected[0]}, valueUnit: ${JSON.stringify(test.expected[1])} }`,
                () => {
                    expect(shortening(test.incoming[0], test.incoming[1])).toMatchObject({
                        value: test.expected[0],
                        valueUnit: test.expected[1]
                    });
                }
            )
        })
    } 
)

describe('Checking for invalid desiredValueUnit', () => {
    const parameter1 = 123;
    const parameter2 = 'not a real unit';
    it(
        `Incoming desiredValueUnit : ${JSON.stringify(parameter2)}; Expecting ValueUnit result: ${JSON.stringify(parameter2)}`,
        () => {
            expect(shortening(parameter1, parameter2)).toStrictEqual({ value: parameter1, valueUnit: parameter2 })
        }
    )
});

describe('Checking nuber is automaticaly shortened, when no desiredValueUnit is passed', () => {
    const testCases = [
        {
            incoming: [123],
            expected: [123, '']
        },
        {
            incoming: [12345],
            expected: [12.345, 'K']
        },
        {
            incoming: [123456789],
            expected: [123.456789, 'M']
        },
        {
            incoming: [9999999999],
            expected: [9.999999999, 'bn']
        },
        {
            incoming: [1234567890123],
            expected: [1.234567890123, 'T']
        },
    ];
    
    testCases.forEach( test => {
        it(
            `Incoming number : ${test.incoming[0]}; Expecting result: { value: ${test.expected[0]}, valueUnit: ${JSON.stringify(test.expected[1])} }`,
            () => {[0]
                expect(shortening(test.incoming[0])).toMatchObject({
                    value: test.expected[0],
                    valueUnit: test.expected[1]
                });
            }
        )
    });
    
});

describe('Checking for invalid givenValue', () => {
    const parameter1 = '1234K';
    const parameter2 = 'K';
    it(
        `Incoming givenValue : ${JSON.stringify(parameter1)} and Incoming desiredUnitValue : ${JSON.stringify(parameter2)}; Expecting result: { value: ${JSON.stringify(parameter1)}, valueUnit: ${JSON.stringify(parameter2)} }`,
        () => {
            expect(shortening(parameter1, parameter2)).toMatchObject({
                value: parameter1,
                valueUnit: parameter2
            });
        }
    )
});


describe('Checking for invalid givenValue and desiredValueUnit', () => {
    const testCases = [
        {
            incoming: ['123K', undefined],
            expected: ['123K', '']
        },
        {
            incoming: [undefined, null],
            expected: [undefined, '']
        }];

    testCases.forEach( test => {
        it(
            `Incoming number : ${JSON.stringify(test.incoming[0])}, ${test.incoming[1]}; Expecting result: { value: ${JSON.stringify(test.expected[0])}, valueUnit: ${JSON.stringify(test.expected[1])} }`,
            () => {
                expect(shortening(test.incoming[0], test.incoming[1])).toMatchObject({
                    value: test.expected[0],
                    valueUnit: test.expected[1]
                });
            }
        )
    })   
});


