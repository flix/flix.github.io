var URL = "http://iostream.dk:8888/";

function mkEditor(editorId, buttonId, outputId) {
    var editor = ace.edit(editorId);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    editor.renderer.setPadding(20);
    editor.renderer.setScrollMargin(10, 10);
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/scala");

    $("#" + buttonId).click(function () {
        var input = editor.getValue();

        $("#" + outputId).html("Loading...");

        $.ajax({
            url: URL,
            method: "post",
            data: input,
            success: function (output) {
                var json = JSON.parse(output);
                console.log(json);

                if (json.status == "success") {
                    var buffer = "Result: " + json.result + "\n";

                    if (json.relations.length != 0) {
                        buffer += "\nRelations:\n";
                        json.relations.forEach(function (rel) {
                            rel.rows.forEach(function (row) {
                                buffer += "  " + rel.name + "(";
                                buffer += row.join(", ");
                                buffer += ").\n";
                            });
                        });
                    }

                    if (json.lattices.length != 0) {
                        buffer += "\nLattices:\n";
                        json.lattices.forEach(function (lat) {
                            lat.rows.forEach(function (row) {
                                buffer += "  " + lat.name + "(";
                                buffer += row.join(", ");
                                buffer += ").\n";
                            });
                        });
                    }

                    $("#" + outputId).html(buffer);
                } else {
                    $("#" + outputId).html(json.message);
                }
            },
            error: function () {
                $("#" + outputId).html("The server did not respond.");
            }
        });
    });

}
