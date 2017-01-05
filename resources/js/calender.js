function drawCalendar(totalDay, year, month, day) {
    $('caption').html(year + '年 ' + month + '月');
    var firsrRow = '<tr>', row = '', i = 0;
    for (var nullDay = 0; nullDay < day; nullDay++) {
        firsrRow += '<td></td>';
    }
    for (; i < 7 - day; i++) {
        firsrRow += '<td>' + (i + 1) + '</td>';
    }
    firsrRow += '</tr>';
    for (var j = 0; j < Math.ceil((totalDay - day) / 7); j++) {
        row += '<tr>';
        for (var k = 0; k < 7; k++, i++) {
            i < totalDay && (row += '<td>' + (i + 1) + '</td>');
        }
        row += '</tr>';
    }
    $('tbody').html(firsrRow + row);
}