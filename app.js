'use strict';

var loadGrid = function(data, tableElm){
    tableElm.innerHTML = '';

    var html = '';

    for (var i=0; i< gridData.length; i++){
        var elm = gridData[i];
        if (elm.promotion){
            html += '<ul class="trow promotion">';
        }else {
            html += '<ul class="trow">';
        }

        html += '<li class="col-8">'+elm.title+
            '</li><li class="col-2">'+(elm.price || "£0.00")+
            '</li><li class="col-2">'+(elm.stars || "")+'</li></ul>';
    }

    tableElm.innerHTML = html;
};

var doSorting = function(arr, key, reverse){
    return arr.sort(function(a,b){
        if (a[key] > b[key]) return (reverse? -1 : 1);
        else if (a[key] < b[key]) return (reverse? 1 : -1);
        else return 0;
    });
}

var sortByElement = function(sortBy){
    reverse = !reverse;
    if (!sortBy){
        if(!sessionStorage.sortBy) {
            sortBy = 'title';
            sessionStorage.sortBy = 'title';
        }else sortBy = sessionStorage.sortBy;
    }else {
        sessionStorage.sortBy = sortBy;
    }
    
    //clear class name from other headers
    var sortIcons = document.getElementsByClassName('sorticon');
    console.log(sortIcons);
    for (var i = 0; i < sortIcons.length; i++) {
        console.log(sortIcons[i]);
        sortIcons[i].addclass = "sorticon fa";
    }
    
    var sortElm = document.getElementById(sortBy);
    doSorting(gridData, sortBy, reverse);
    
    //Add class name
    if (reverse) sortElm.className = 'sorticon fa fa-caret-up';
    else sortElm.className = 'sorticon fa fa-caret-down';
    
    loadGrid(gridData, tableElm);
};


//Load the dataGrid
var tableElm = document.getElementById('datagrid');
var gridData = JSON.parse(data);
var reverse = true;
sortByElement();
loadGrid(gridData, tableElm);


