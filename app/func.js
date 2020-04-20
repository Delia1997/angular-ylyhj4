function mergeGridRows(gridId, colTitle) {

    $('#' + gridId + '>.k-grid-content>table').each(function (index, item) {

        var dimension_col = 1;
        // First, scan first row of headers for the "Dimensions" column.
        $('#' + gridId + '>.k-grid-header>.k-grid-header-wrap>table').find('th').each(function () {
            if ($(this).text() == colTitle) {

                // first_instance holds the first instance of identical td
                var first_instance = null;

                $(item).find('tr').each(function () {

                    // find the td of the correct column (determined by the colTitle)
                    var dimension_td = $(this).find('td:nth-child(' + dimension_col + ')');

                    if (first_instance == null) {
                        first_instance = dimension_td;
                    } else if (dimension_td.text() == first_instance.text()) {
                        // if current td is identical to the previous
                        // then remove the current td
                        dimension_td.remove();
                        // increment the rowspan attribute of the first instance
                        first_instance.attr('rowspan', typeof first_instance.attr('rowspan') == "undefined" ? 2 : first_instance.attr('rowspan') + 1);
                    } else {
                        // this cell is different from the last
                        first_instance = dimension_td;
                    }
                });
                return;
            }
            dimension_col++;
        });

    });
}