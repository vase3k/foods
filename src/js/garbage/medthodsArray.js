'use strict';

//filter

const names = ['Ivan', 'Ann', 'Ksenia', 'Walmart'];

const shortNames = names.filter((e) => {
    return e % 2 !== 0;
});

//console.log(shortNames);

//map

const result = names.map((e) => e.toLocaleLowerCase());

//console.log(result);

//some and every

const every = names.every((e) => {
    return e === 'Ivan';
});

const some = names.some((e) => {
    return e === 'Ivan';
});

//console.log(every, some);

//reduce

const arr = [1, 2, 3, 5];

const res = arr.reduce((sum, current) => {
    return sum + current;
});

//console.log(res);

const obj = {
    ivan: 'personne',
    ann: 'personne',
    dog: 'animal',
    cat: 'animal',
};

const entries = Object.entries(obj)
    .filter((e) => e.some((e) => e === 'personne'))
    .map((e) => e.shift());

//console.log(entries);

const films = [
    {
        name: 'Titanic',
        rating: 9,
    },
    {
        name: 'Die hard 5',
        rating: 5,
    },
    {
        name: 'Matrix',
        rating: 8,
    },
    {
        name: 'Some bad film',
        rating: 4,
    },
];

function showGoodFilms(arr) {
    return arr.filter((e) => e.rating >= 8);
}

function showListOfFilms(arr) {
    return arr.reduce((acc, e, i) => {
        return arr.length - 1 === i ? acc + e.name : acc + e.name + ', ';
    }, []);
}

function setFilmsIds(arr) {
    return arr.map((e, i) => {
        e.id = i;
        return e;
    });
}

const tranformedArray = setFilmsIds(films);

function checkFilms(arr) {
    return arr.every((e) => {
        return e.id !== '';
    });
}

const funds = [
    { amount: -1400 },
    { amount: 2400 },
    { amount: -1000 },
    { amount: 500 },
    { amount: 10400 },
    { amount: -11400 },
];

const getPositiveIncomeAmount = (data) => {
    return data.reduce((acc, e) => acc + (e.amount > 0 && e.amount), 0);
};

const getTotalIncomeAmount = (data) => {
    return data.some((e) => {
        return e.amount < 0;
    })
        ? data.reduce((acc, e) => {
              return acc + e.amount;
          }, 0)
        : getPositiveIncomeAmount(data);
};

console.log(getTotalIncomeAmount(funds));
