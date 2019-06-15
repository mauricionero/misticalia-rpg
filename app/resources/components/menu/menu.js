$(document).ready(function() {
  $('#menubar').menu();
  
  $('#menubar').menu({
    position: { my: 'left top', at: 'left bottom' },
    blur: function() {
      $(this).menu('option', 'position', { my: 'left top', at: 'left bottom' });
    },
    focus: function(e, ui) {
      if ($('#menubar').get(0) !== $(ui).get(0).item.parent().get(0)) {
        $(this).menu('option', 'position', { my: 'left top', at: 'right top' });
      }
    },
  });
});