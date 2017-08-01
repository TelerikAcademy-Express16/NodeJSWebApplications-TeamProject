// let socket = io(window.location.href);
// socket.on('connect', function() {
//     console.log('Connected');
//     socket.emit('clientJoin');
// });

// socket.on('updateData', function(json, action, id) {
//     if (action == "create" || action == "edit") {
//         var DT_RowId = json.row['DT_RowId'];
//         console.log('updateData socket event for rowID: '+DT_RowId+' and action: '+action);
//     }
//     var table = $('table#example').DataTable();
//     if (action == "edit") {
//         var editedRow = table.row('#'+DT_RowId).nodes().to$();
//         table.row(editedRow).data(json.row).draw();
//         console.log('Row updated');
//     }
//     if (action == "create") {
//         console.log('Row created');
//         table.row.add(json.row).draw();
//     }
//     if (action == "remove") {
//         var removedRow = table.row('#'+id).nodes().to$();
//         table.row(removedRow).remove().draw();
//         console.log('Row removed with id '+id);
//     }
// });