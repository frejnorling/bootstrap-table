/* ========================================================
* bootstrap-table.js v0.0.1
* https://github.com/frejnorling/bootstrap-table
* ========================================================
* Copyright 2012 Frej Norling
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ======================================================== */


!function ($) {

    "use strict"

    /* TABLE CLASS DEFINITION
    * ==================== */

    var Table = function (element) {
        this.element = $(element)
    }

    Table.prototype = {

        constructor: Table

  , show: function () {

      var $this = this.element
       , $content = $this.attr('data-content')
       , $type = $this.attr('data-type')
       , $title = $this.attr('title')

      $this.trigger({
          type: 'show'
      })


      this.activate($this, $type, $title, $content)
  }

  , activate: function (element, type, title, content, callback) {

      function open() {

          if (type === "modal") {
              $('#table-modal').modal('show');

              $('#table-modal div.modal-header h3').html(title);
              $('#table-modal div.modal-body').html(content);
          } else if (type === "inline") {
              var cols = $(element).find("td").length;
              var tr = "<tr><td colspan='" & cols & "'>" & content & "</td></tr>";
              $(tr).insertAfter(element);
          }

          callback && callback()
      }
      open();

  }
    }


    /* TABLE PLUGIN DEFINITION
    * ===================== */

    $.fn.table = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('table')
            if (!data) $this.data('table', (data = new Table(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.table.Constructor = Table


    /* TABLE DATA-API
    * ============ */

    $(function () {
        $('body').on('click.table.data-api', '[data-type="modal"], [data-type="inline"], [data-url="*"], [data-content="*"]', function (e) {
            e.preventDefault()
            $(this).table('show')
        })
    })

} (window.jQuery);