const fs = require('node:fs');

var raw_input = `xmul(2,4)%&mul[123,1)!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

function removeTextBetweenDontAndDo(str) {
    return str.replace(/don't\(\).*?(do\(\)|$)/gs, '');
}

fs.readFile('./3-1-input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    raw_input = data

    raw_input = removeTextBetweenDontAndDo(raw_input)

    const clean1 = raw_input.split("mul")

    clean1.shift()

    console.log(clean1)

    const checks = [
        "(",
        "number_only",
        "number_only[o]",
        "number_only[o]",
        "comma",
        "number_only",
        "number_only[o]",
        "number_only[o]",
        ")"
    ]

    const checkers = {
        "(": (char) => { return char === "(" },
        "number_only": (char) => { return "0123456789".includes(char) },
        "comma": (text) => { return text === "," },
        ")": (char) => { return char === ")" }
    }

    function getNextCheckIndices(checks, currentIndex) {
        if (currentIndex === checks.length - 1) {
            return undefined
        }
        let index = currentIndex + 1
        let check = checks[index]
        const result = [index]
        while (check.includes("[o]")) {
            // check is optional
            index++
            if (index === checks.length) {
                break
            }
            check = checks[index]
            result.push(index)
        }
        return result
    }

    function getCheckFromIndex(checks, index) {
        return checks[index].includes("[o]") ? checks[index].split("[o]")[0] : checks[index]
    }

    function performCheckAndGetPassedIndex(checks, char, checkIndices) {
        let passedIndex = -1
        checkIndices.forEach(index => {
            if (passedIndex === -1) {
                let check = getCheckFromIndex(checks, index)
                let result = checkers[check](char)
                if (result) {
                    passedIndex = index
                }
            }
        })
        if (passedIndex === -1) {
            return -1
        }
        return getNextCheckIndices(checks, passedIndex)
    }

    function matcher(checks, text) {
        currentCheckIndex = [0]
        for (let i = 0; i < text.length; i++) {
            let nextCheckIndices = performCheckAndGetPassedIndex(checks, text[i], currentCheckIndex)
            if (nextCheckIndices === -1) {
                return false
            } else if (nextCheckIndices === undefined) {
                return text.slice(1, i)
            } else {
                currentCheckIndex = nextCheckIndices
            }
        }
    }

    const clean2 = []

    clean1.forEach(text => {
        let result = matcher(checks, text)
        if (result) {
            clean2.push(result)
        }
    })

    console.log(clean2)
    let sum = 0

    clean2.forEach(text => {
        nums = text.split(",").map(num => parseInt(num))
        sum += nums[0] * nums[1]
    })

    console.log(sum)

});

