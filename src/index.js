module.exports = function check(str, bracketsConfig) {
    const objBracketsConfig = bracketsConfig.reduce((acc, item) => {
        const [value, key] = item;
        return {...acc, [key]: value}; // return {...acc, [item[0]]: item[1]}
    }, {});
    const openBrackets = Object.values(objBracketsConfig);

    function isBracketsOk(string) {
        let stack = [];
        for (let i = 0; i < string.length; i++) {
            let currentSymbol = string[i];
            if (openBrackets.includes(currentSymbol)) {
                stack.push(currentSymbol);
            } else {
                if (stack.length === 0) {
                    return false;
                }
                let topElement = stack[stack.length - 1];
                if (objBracketsConfig[currentSymbol] === topElement) {
                    stack.pop();
                } else {
                    if (currentSymbol === '|') {
                        stack.push(currentSymbol);
                    }
                    return false;
                }
            }
        }
        return stack.length === 0;
    }

    return isBracketsOk(str);
}
