/* 1.Comparison operators */

// One
function min_max(arr) {
    let max = arr[0], min = arr[0];
    for (let el of arr) {
        if (el > max) {
            max = el;
        }
        else if (el < min) {
            min = el;
        }
    }
    return [min, max]
}

let arr = [1, 2, 3];

min_max_arr = min_max(arr);

console.log(`min: ${min_max_arr[0]}, max: ${min_max_arr[1]}`);

// Two
let obj1 = {name: 'Stepan', age: 45};
let obj2 = {name: 'Oleh', age: 20};

if (obj1.age > obj2.age) {
    console.log(`${obj1.name} is older`);
}

else if (obj1.age < obj2.age) {
    console.log(`${obj2.name} is older`);
}

else {
    console.log(`${obj2.name} and ${obj2.name} are the same age`);
}

/* 2.Logical operators */

// One + Two
function is_success(exit_code) {
    return 0 <= exit_code && exit_code <= 200;
}

console.log(`executing with ${['failure', 'success'][+ !! is_success(200)]}`);

/* Conditional branches */

// One
function grade_one_hundred_to_words(grade) {
    if (0 <= grade && grade <= 29) {
        return "Too bad"
    }
    else if (30 <= grade && grade <= 49) {
        return "You could do better"
    }
    else if (50 <= grade && grade <= 59) {
        return "Well, you pass. Good luck"
    }
    else {
        return "Overkill, bro"
    }
}

console.log(`In this semester you did: ${grade_one_hundred_to_words(100)}`);

// Two
function season_by_month_if_else(month) {
    if (month >= 12 || month <= 2) {
        return "Winter";
    } else if (month >= 3 && month <= 5) {
        return "Spring";
    } else if (month >= 6 && month <= 8) {
        return "Summer";
    } else if (month >= 9 && month <= 11) {
        return "Autumn";
    } else {
        return "Unknown";
    }
}

// Three
function season_by_month_ternary(month) {
        return "Winter" ? [12, 1, 2].includes(month)
            : ("Spring" ? [3, 4, 5].includes(month)
                : ("Summer" ? [6, 7, 8].includes(month)
                    : ("Autumn" ? [9, 10, 11].includes(month)
                        : "Unknown")));
}

function season_by_month(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "Winter";
        case 3:
        case 4:
        case 5:
            return "Spring";
        case 6:
        case 7:
        case 8:
            return "Summer";
        case 9:
        case 10:
        case 11:
            return "Autumn";
        default:
            return "Unknown";
    }
}

console.log(`The season is ${season_by_month(2)}`)
