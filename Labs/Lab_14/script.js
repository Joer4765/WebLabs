function task_01() {
    let fruits = ['apple', 'orange', 'banana', 'peanut'];
    delete fruits[-1];
    console.log('Task 1');
    console.log(`Last deleted: ${fruits.join(', ')}`);
    fruits.unshift('pineapple');
    fruits.sort((a, b) => a < b ? 1 : -1);
    console.log(`Sorted: ${fruits.join(', ')}`);
    console.log(`Index of "apple": ${fruits.indexOf('apple')}`);
}



function task_02() {
    let colors = ['red', 'blue', 'green', 'blue-yellow'];


    let longest = colors[0];
    let shortest = colors[0];
    for (let i = 1; i < colors.length; i++) {
        if (colors[i].length > longest.length) {
            longest = colors[i];
        }
        else if (colors[i].length < longest.length) {
            shortest = colors[i];
        }
    }
    console.log(`The longest item is: ${longest}`);
    console.log(`The shortest item is: ${shortest}`);

    colors.forEach((item, index) => {
        if (item.includes('blue')) {
            return;
        }
        colors.splice(index, 1);
    })
    console.log(`Only blue: ${colors.join(', ')}`);
}



// task_01();
console.log('---------------------------------------------------------- ');
// task_02();
console.log('---------------------------------------------------------- ');
task_03();
console.log('---------------------------------------------------------- ');