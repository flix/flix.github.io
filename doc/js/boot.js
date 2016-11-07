gitbook.events.bind("page.change", function () {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
});