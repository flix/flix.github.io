var URL = "http://iostream.dk:8888/";

function mkEditor(editorId, buttonId, outputId) {
    var editor = ace.edit(editorId);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
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
                if (json.status == "success") {
                    $("#" + outputId).html("Result: " + json.result);
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
