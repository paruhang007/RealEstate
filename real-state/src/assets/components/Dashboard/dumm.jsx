// Feet conversion starts here
else if (parsedVal1 == 'Feet' && parsedVal2 == 'Ropani') {
    const result = (parsedNum1) / (16 * 4 * 4 * 21.39);
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'Anna') {
    const result = (parsedNum1) / (4 * 4 * 21.39);
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'Paisa') {
    const result = (parsedNum1) / (4 * 21.39);
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'Daam') {
    const result = (parsedNum1) / 21.39;
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'Bigha') {
    const result = (parsedNum1) / 6772 * 21.39;
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'kattha') {
    const result = (parsedNum1) / 338.6 * 21.39;
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'Dhur') {
    const result = parsedNum1 / 16.93 * 21.39;
    setResult(result);
} else if (parsedVal1 == 'Feet' && parsedVal2 == 'Meter') {
    const result = parsedNum1 / 3.28084;
    setResult(result);
}