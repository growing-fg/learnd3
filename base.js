var cw = 500, ch = 500;
function makeCanvas(name, transCenter) {
    var svg = d3.select('body')
            .append('svg')
            .attr('class', 'canvas')
            .attr({width: cw, height: ch});

    var canvas = svg.append('g');
    if (transCenter) {
        canvas.attr('transform', 'translate(' + cw / 2 + ',' + ch / 2 + ')');
    }

    svg.append('text')
        .attr('class', 'canvas-legend')
        .attr('alignment-baseline', 'before-edge')
        .attr('dx', 10)
        .attr('dy', 10)
        .text(name);

    return canvas;
}
