'use strict';

var loadGrid = function (data) {
    var tableElm = document.getElementById('datagrid');

    tableElm.innerHTML = '';

    var html = '';

    for (var i = 0; i < data.length; i++) {
        var elm = data[i];
        if (elm.promotion) {
            html += '<ul class="trow promotion">';
        } else {
            html += '<ul class="trow">';
        }

        html += '<li class="col-8">' + elm.title +
            '</li><li class="col-2">' + (elm.price || "£0.00") +
            '</li><li class="col-2">' + (elm.stars || "") + '</li></ul>';
    }

    tableElm.innerHTML = html;
};

var doSorting = function (arr, key, reverse) {
    if (key != "price") {
        //Sort string
        return arr.sort(function (a, b) {
            if (a[key] > b[key]) return (reverse ? -1 : 1);
            else if (a[key] < b[key]) return (reverse ? 1 : -1);
            else return 0;
        });
    } else {
        //Sort integers
        return arr.sort(function (a, b) {
            var i = a[key].substring(1);
            var j = b[key].substring(1);
            return (reverse ? (j - i) : (i - j));
        });
    }

};

var sortByElement = function (sortBy) {
    var data, reverse, sort;
    //If filtering has taken place, keep the filtered data on screen
    //Else work on the full data set
    if (globalData.selectedGridData.length != 0) data = globalData.selectedGridData;
    else data = globalData.gridData;

    if (sessionStorage){
        if (!sortBy) {
            if (!sessionStorage.sort) {
                //First time page load, set to defaults
                sortBy = 'title';
                reverse = false;
                sessionStorage.setItem('sort', JSON.stringify({'sortBy': sortBy, 'reverse': reverse}));
            } else {
                //Next time page load, get from session Storage
                sort = JSON.parse(sessionStorage.getItem('sort'));
                sortBy = sort.sortBy;
                reverse = sort.reverse;
            }
        } else {
            //Store in session Storage
            if (sessionStorage.sort) {
                sort = JSON.parse(sessionStorage.getItem('sort'));
                reverse = !sort.reverse;
            }else reverse = false;
            sessionStorage.setItem('sort', JSON.stringify({'sortBy': sortBy, 'reverse': reverse}));
        }
    }else {
        //For IE, without a webserver, doesn't support sessionStorage
        if (!sortBy) {
            sortBy = 'title';
            reverse = false;
        }else {
            reverse = !reverse;
        }
    }


    //clear class name from other headers
    var sortIcons = document.getElementsByClassName('sorticon');
    for (var i = 0; i < sortIcons.length; i++) {
        if (sortIcons[i].classList.contains('fa-caret-up')) sortIcons[i].classList.remove('fa-caret-up');
        if (sortIcons[i].classList.contains('fa-caret-down')) sortIcons[i].classList.remove('fa-caret-down');
    }

    //Do the sorting and present the sorted data
    var sortElm = document.getElementById(sortBy);
    doSorting(data, sortBy, reverse);
    loadGrid(data);

    //Add class name to sorted field
    if (reverse) sortElm.className += ' fa-caret-down';
    else sortElm.className += ' fa-caret-up';

};

//Dynamically populate the Filter by Title select list
var populateSelectList = function () {
    doSorting(globalData.gridData, "title", false);
    var selectElm = document.getElementById('filterby');
    for (var i = 0; i < globalData.gridData.length; i++) {
        var optionElm = document.createElement("option");
        optionElm.text = globalData.gridData[i].title;
        selectElm.add(optionElm);
    }
};

//Filter the grid
var filterByValue = function (sel) {
    var selectedText = sel.options[sel.selectedIndex].text;
    globalData.selectedGridData = globalData.gridData.filter(function (item) {
        return item.title === selectedText;
    });
    loadGrid(globalData.selectedGridData);
};

//Clear the filter
var clearFilter = function () {
    var selectElm = document.getElementById('filterby');
    selectElm.selectedIndex = 0;
    globalData.selectedGridData = [];
    loadGrid(globalData.gridData);
};

//global variables - Get the data from data.json
var globalData = {selectedGridData: [], gridData: JSON.parse(data)};
//Default sort by Title
sortByElement();
//Load the data grid
loadGrid(globalData.gridData);
//Populate the select list with options
populateSelectList();


