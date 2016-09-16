'use strict';

var app = (function (){
    //global variables - Get the data from data.json
    var globalData = {selectedGridData: [], gridData: JSON.parse(data)}, loadGrid, doSorting, sortByElement, populateSelectList, filterByValue, clearFilter, init;

    init = function(){
        //Default sort by Title
        sortByElement();
        //Load the data grid
        loadGrid(globalData.gridData);
        //Populate the select list with options
        populateSelectList();
    };

    loadGrid = function (data) {
        var tableElm, html, i, elm, len = data.length;
        tableElm = document.getElementById('datagrid');

        tableElm.innerHTML = '';

        html = '';

        for (i = 0; i < len; i++) {
            elm = data[i];
            if (elm.promotion) {
                html += '<ul class="trow promotion">';
            } else {
                html += '<ul class="trow">';
            }

            html += '<li class="col-1">' + elm.title +
                '</li><li class="col-2">' + (elm.price || "£0.00") +
                '</li><li class="col-3">' + (elm.stars || "") + '</li></ul>';
        }

        tableElm.innerHTML = html;
    };

    doSorting = function (arr, key, reverse) {
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

    sortByElement = function (sortBy) {
        var data, reverse, sort, i;
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
            }
        }

        //clear class name from other headers
        var sortIcons = document.getElementsByClassName('sorticon');
        for (i = 0; i < sortIcons.length; i++) {
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
    populateSelectList = function () {
        var selectElm, i, optionElm, len=globalData.gridData.length;
        doSorting(globalData.gridData, "title", false);
        selectElm = document.getElementById('filterby');
        for (i = 0; i < len; i++) {
            optionElm = document.createElement("option");
            optionElm.text = globalData.gridData[i].title;
            selectElm.add(optionElm);
        }
    };

    //Filter the grid
    filterByValue = function (sel) {
        var selectedText;
        selectedText = sel.options[sel.selectedIndex].text;
        globalData.selectedGridData = globalData.gridData.filter(function (item) {
            return item.title === selectedText;
        });
        loadGrid(globalData.selectedGridData);
    };

    //Clear the filter
    clearFilter = function () {
        var selectElm;
        selectElm = document.getElementById('filterby');
        selectElm.selectedIndex = 0;
        globalData.selectedGridData = [];
        loadGrid(globalData.gridData);
    };

    return {
        init: init,
        filterByValue: filterByValue,
        clearFilter: clearFilter,
        sortByElement: sortByElement
    }
})();

app.init();

