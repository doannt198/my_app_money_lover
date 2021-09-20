export default class FilterModel {
    filter = "";
    offSet = 0;
    pageSize = 10;

    FilterModel(filter = '', offSet = 0, pageSize = 10) {
        filter = filter;
        offSet = offSet;
        pageSize = pageSize;
    }
 }