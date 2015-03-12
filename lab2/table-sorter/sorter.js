window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
};

var getAllTables = function() {
    return document.getElementsByTagName('table');
};

var makeAllTablesSortable = function(tables) {
    for (var tableIndex in tables) {
        if (!isNaN(tableIndex)) {
            var ths = tables[tableIndex].getElementsByTagName('th');
            addEventHandler(tables[tableIndex], ths);
        }
    }
};

var addEventHandler = function(table, ths) {
    for (var thIndex in ths) {
        if (!isNaN(thIndex)) {
            ths[thIndex].onclick = (function(thIndex) {
                return function() {
                    sort(table, thIndex);
                    // changeButtonStyle(table, thIndex);
                    // makeTableAlternate(table);
                };
            })(thIndex);
        }
    }
};

var sort = function(table, thIndex) {
    var sortedOrder = sortByStringAndGetOrder(table, thIndex);
    changeTableOrder(table, sortedOrder);
};

var ascend = function(table, thIndex) {
    return table.getElementsByTagName('th')[thIndex].className === 'ascend';
};

var sortByStringAndGetOrder = function(table, thIndex) {
    var trs = table.getElementsByTagName('tr');
    var tds = gettds(trs, thIndex);
    return getOrder(tds);
};

var gettds = function(trs, thIndex) {
    var tds = [];
    for (var trIndex in trs) {
        if (!isNaN(trIndex) && trIndex !== "0") {
            tds.push(trs[trIndex].getElementsByTagName('td')[thIndex]);
        }
    }
    return tds;
};

var getOrder = function(tds) {
    var order = [], sorted = [], reverse = true;
    for (var i = 0; i < tds.length; ++i) {
        var biggest = "", index;
        for (var j = 0; j < tds.length; ++j) {
            if (tds[j].innerHTML > biggest && sorted[j] !== true) {
                biggest = tds[j].innerHTML;
                index = j;
            }
        }
        if (index !== i) {
            reverse = false;
        }
        order.push(index + 1);
        sorted[index] = true;
    }
    return reverse ? order.reverse() : order;
};

var changeTableOrder = function(table, sortedOrder) {
    var trs = table.getElementsByTagName('tr');
    var tbody = document.createElement('tbody');
    for (var index in sortedOrder) {
        tbody.appendChild(trs[sortedOrder[index]].cloneNode(true));
    }
    table.replaceChild(tbody, table.getElementsByTagName('tbody')[0]);
};

