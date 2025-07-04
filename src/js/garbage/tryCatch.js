'use strict';

try {
    console.log('try');
} catch (e) {
    console.log(e.name);
    console.log(e.message);
    console.log(e.stack);
} finally {
    console.log('error end');
}

console.log('continue');
