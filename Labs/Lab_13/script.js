// Task 1
function fibonacci(number) {
    let n1 = 0, n2 = 1, nextTerm;
    let total = 0;
    let i = 1;
    while (i <= number) {
        total += n1;
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
        i++;
    }
    return total;
}

console.log(`Task 1: The sum of the first 10 fibonacci numbers is ${fibonacci(10)}`)

// Task 2
function prime_numbers_sum(num) {

    const sieve = Array(num + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i * i <= num; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= num; j += i) {
                sieve[j] = false;
            }
        }
    }

    const primes = sieve.map((isPrime, num) => isPrime && num).filter(Boolean);
    return primes.reduce((sum, num) => sum + num, 0);
}

console.log(`Task 2: The sum of the prime numbers in range 1..1000 is ${prime_numbers_sum(1000)}`)

// Task 3
function weekday(day_number) {
    switch (day_number) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
        default:
            return "There is no such day";
    }
}

console.log(`Task 3: The day of the week is ${weekday(3)}`)

// Task 4
function get_odd_strings(arr) {
    let result = [];
    arr.forEach((item) => {
        if (item.length % 2 === 1) {
            result.push(item);
        }
    })
    return result;
}

let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
console.log(`Task 4: Strings with odd length are: ${get_odd_strings(weekdays)}`);

// Task 5
let increment_each_number = (arr) => {
    arr.forEach((item, index) => {
        arr[index] = ++item;
    })
    return arr;
}

let numbers = [0, 1, 2, 3, 4, 5];
console.log(`Task 5: Incremented array: ${increment_each_number(numbers)}`);

// Task 6
let a = 10, b = 0;
let number = 10;
console.log(`Task 6: Does ${a} + ${b} or ${a} - ${b} equals ${number}: ${(() => a + b === number || a - b === number)()}`);