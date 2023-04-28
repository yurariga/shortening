const shortening = (givenValue, desiredValueUnit) => {
    let shortenedValue = givenValue;
    if (typeof(shortenedValue) === 'number') {
        switch(desiredValueUnit) {
            case 'K':
                shortenedValue = givenValue / 1e3;
                break;
            case 'M':
                shortenedValue = givenValue / 1e6;
                break;
            case 'bn':
                shortenedValue = givenValue / 1e9;
                break;
            case 'T':
                shortenedValue = givenValue / 1e12;
                break;
            case '':
                shortenedValue = givenValue;
                break;
            case undefined:
            case null:
                return getNumberClass(givenValue); 
            default:
                shortenedValue = givenValue;
                break;
        }
    } else if (desiredValueUnit === undefined || desiredValueUnit === null) {
        return result = {
            value: shortenedValue, 
            valueUnit: ''
        }
    } else {
        return result = {
            value: shortenedValue, 
            valueUnit: desiredValueUnit
        }
    }
    
    return result = {
        value: shortenedValue, 
        valueUnit: desiredValueUnit
    }
};

const getNumberClass = (number) => {
    try {
        if (Math.abs(number) < 1e3) {
            detectedValueUnit = '';
            largestValue = number;
        } else if (Math.abs(number) >= 1e3 && Math.abs(number) < 1e6) {
            detectedValueUnit = 'K';
            largestValue = number / 1e3;
        } else if (Math.abs(number) >= 1e6 && Math.abs(number) < 1e9) {
            detectedValueUnit = 'M';
            largestValue = number / 1e6;;
        } else if (Math.abs(number) >= 1e9 && Math.abs(number) < 1e12) {
            detectedValueUnit = 'bn';
            largestValue = number / 1e9;;
        } else if (Math.abs(number) >= 1e12) {
            detectedValueUnit = 'T';
            largestValue = number / 1e12;;
        }
        return result = {
            value: largestValue, 
            valueUnit: detectedValueUnit
        }
    } catch(error) {
        return result = {
            value: undefined, 
            valueUnit: undefined
        }
    }
}

module.exports = shortening;
