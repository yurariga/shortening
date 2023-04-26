const shortening = require('./app');

// test(
//     'Checking function propper working with K', 
//     () => {
//         expect(shortening(123, 'K')).toEqual({ value: 0.123, valueUnit: 'K' })
//     }
// );

test('Checking arguments', () => {
    expect(shortening).toBeDefined()
    }
);

// describe(
//     'checking shortening function is defined', 
//     () => {
//         test('Checking arguments', () => {
//             expect(shortening).toBeDefined()
//             }
//         );
//     }
// );

describe('Checking supported valueUnits', () => {
    const suppotedUnits = ['', 'K', 'M', 'bn', 'T'];
    const testCases = [
        {
            incoming: '',
        }, 
        {
            incoming: 'K',
        },
        {
            incoming: 'M',
        },
        {
            incoming: 'bn',
        },
        {
            incoming: 'T',
        }, 
    ];
    testCases.forEach( test => {
        it(
            `Incoming unit : ${JSON.stringify(test.incoming)}; Expecting units ${JSON.stringify(suppotedUnits)}`,
            () => {
                expect(suppotedUnits.includes(shortening(Math.floor(Math.random() * 1e13), test.incoming).valueUnit)).toBe(true);
            }
        )
    })
    }
);

describe(
    'Checking shortening arguments', 
    () => {
        const testCases = [
            {
                incoming: [123, 'K'],
                expected: [0.123, 'K']
            }, 
            {
                incoming: [-1000000, 'M'],
                expected: [-1, 'M']
            }, 
          
        ];

        testCases.forEach( test => {
            it(
                `Incoming nuber : ${
                        [test.incoming[0], 
                        test.incoming[1]]
                }; Expecting { value: ${test.expected[0]},
                        valueUnit: ${JSON.stringify(test.expected[1])} }`,
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


