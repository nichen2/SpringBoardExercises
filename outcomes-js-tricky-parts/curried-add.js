function curriedAdd(total) {
    if (total === undefined) {
        total = 0;
        return total;
    }
    return function add(num) {
        if (num == undefined) {
            return total;
        }
        return curriedAdd(total + num);
    }
}

module.exports = { curriedAdd };
