function task_01() {
    let fruits = ['apple', 'orange', 'banana', 'peanut'];
    delete fruits[-1];
    console.log(`Last deleted: ${fruits.join(', ')}`);
    fruits.unshift('pineapple');
    fruits.sort((a, b) => a < b ? 1 : -1);
    console.log(`Sorted: ${fruits.join(', ')}`);
    console.log(`Index of "apple": ${fruits.indexOf('apple')}`);
}

function task_02() {
    let colors = ['red', 'blue', 'green'];
    console.log(Math.max(...colors));
}


// task_01();
task_02();