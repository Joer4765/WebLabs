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

    let colors_only_blue = colors.filter((value) => value.includes('blue'));
    console.log(`Only blue: ${colors_only_blue.join(', ')}`);
}


function task_03() {
    let workers = [
        {
            name: 'Stepan',
            age: 30,
            position: 'driver',
        },
        {
            name: 'Oleh',
            age: 22,
            position: 'developer',
        },
        {
            name: 'Andrii',
            age: 45,
            position: 'cleaner',
        },
    ];

    let sorted_workers = workers.toSorted((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        else if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    console.log(`Workers sorted by name:\n${JSON.stringify(sorted_workers, null, 4)}`);

    let developers = workers.filter((value) => value.position === 'developer');
    console.log(`Developers:\n${JSON.stringify(developers, null, 4)}`);

    // Filter
    workers = workers.filter((value) => value.age < 40);
    // Loop
    for (let i = workers.length - 1; i >= 0; i--) {
        if (workers[i].age >= 25) {
            continue;
        }
        workers.splice(i, 1);
    }
    console.log(`Middle age workers:\n${JSON.stringify(workers, null, 4)}`);

    workers.push(
        {
            name: 'Dima',
            age: 29,
            position: 'developer',
        }
    )
    console.log(`New workers:\n${JSON.stringify(workers, null, 4)}`);

}


function task_04() {
    let students = [
        {
            name: 'Inna',
            age: 17,
            course: 1,
        },
        {
            name: 'Halyna',
            age: 19,
            course: 3,
        },
        {
            name: 'Maria',
            age: 21,
            course: 4,
        },
        {
            name: 'Oleksiy',
            age: 21,
            course: 5,
        },
    ]

    students = students.filter((value) => value.name !== 'Oleksiy');
    console.log(`Oleksiy pruned:\n${JSON.stringify(students, null, 4)}`);

    students.push(
        {
            name: 'Kostya',
            age: 18,
            course: 2,
        },
    )
    console.log(`Added Kostya:\n${JSON.stringify(students, null, 4)}`);

    students.sort((a, b) => b.age - a.age);
    console.log(`Age descent:\n${JSON.stringify(students, null, 4)}`);

    let student_3course = students.find((value) => value.course === 3);
    console.log(`3 course:\n${JSON.stringify(student_3course, null, 4)}`);
}


function task_05() {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let powers = numbers.map((value) => value ** 2);
    console.log(`Numbers**2: ${powers.join(', ')}`);

    let even = numbers.filter((value) => value % 2 === 0);
    console.log(`Even: ${even.join(', ')}`);

    let sum = numbers.reduce((previousValue, currentValue) => previousValue + currentValue);
    console.log(`Sum: ${sum}`);

    let numbers2 = [10, 11, 12, 13, 14, 15];
    numbers = numbers.concat(numbers2);
    console.log(`Numbers + Numbers2: ${numbers.join(', ')}`);

}


function task_06() {
    function libraryManagement() {
        let books = [
            {
                title: 'Майстер і Маргарита',
                author: 'Михайло Булгаков',
                genre: 'Фантастика',
                pages: 384,
                isAvailable: true
            },
            {
                title: '1984',
                author: 'Джордж Оруелл',
                genre: 'Дистопія',
                pages: 328,
                isAvailable: false
            },
            {
                title: 'Гра престолів',
                author: 'Джордж Р. Р. Мартін',
                genre: 'Фентезі',
                pages: 694,
                isAvailable: true
            },
        ];

        function addBook(title, author, genre, pages) {
            let result = [...books];
            result.push(
                {
                    title: title,
                    author: author,
                    genre: genre,
                    pages: pages,
                    isAvailable: true
                }
            );
            return result;
        }

        function removeBook(title) {
            return books.filter((value) => value.title !== title);
        }

        function findBooksByAuthor(author) {
            return books.filter((value) => value.author === author);
        }

        function toggleBookAvailability(title, isBorrowed) {
            let result = [...books];
            result[result.findIndex((value) => value.title === title)].isAvailable = !isBorrowed;
            return result;
        }

        function sortBooksByPages() {
            return books.toSorted((a, b) => a.pages - b.pages);
        }

        function getBooksStatistics() {
            let booksCount = books.length;
            let availableBooks = books.filter((value) => value.isAvailable).length;
            let borrowedBooks= booksCount - availableBooks;

            let pagesArr = books.map((value) => value.pages);
            let pagesCount = pagesArr.reduce((previousValue, currentValue) => previousValue + currentValue);
            let pagesAVG = pagesCount / booksCount;

            return {
                booksCount: booksCount,
                availableBooks: availableBooks,
                borrowedBooks: borrowedBooks,
                pagesAVG: pagesAVG,
            };
        }

        books = addBook('Фундація', 'Айзек Азімов', 'Наукова фантастика', 224);
        console.log(`Book added:\n${JSON.stringify(books, null, 4)}`);

        books = removeBook('Гра престолів');
        console.log(`Book removed:\n${JSON.stringify(books, null, 4)}`);

        console.log(`Айзек Азімов books:\n${JSON.stringify(findBooksByAuthor('Айзек Азімов'), null, 4)}`);

        books = toggleBookAvailability('Фундація', true);
        console.log(`Фундація is borrowed:\n${JSON.stringify(books, null, 4)}`);

        books = sortBooksByPages();
        console.log(`Sorted by pages:\n${JSON.stringify(books, null, 4)}`);

        let books_stats = getBooksStatistics();
        console.log(`Books statistics:\n${JSON.stringify(books_stats, null, 4)}`);

    }
    libraryManagement();
}


function task_07() {

    let student = {
        name: "Ivan",
        age: 20,
        course: 2
    };

    student.sunjects = ["Math", "Physics", "Programming"];

    delete student.age;

    console.log(student);
}


console.log('-------------------------Task 1--------------------------- ');
task_01();
console.log('-------------------------Task 2--------------------------- ');
task_02();
console.log('-------------------------Task 3--------------------------- ');
task_03();
console.log('-------------------------Task 4--------------------------- ');
task_04();
console.log('-------------------------Task 5--------------------------- ');
task_05();
console.log('-------------------------Task 6--------------------------- ');
task_06();
console.log('-------------------------Task 7--------------------------- ');
task_07();
console.log('---------------------------------------------------------- ');