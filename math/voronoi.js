(function(){
    var canvas = makeCanvas('泰森多边形');

    var vo = d3.geom.voronoi();

    var points = [];

    var svg = canvas.node().parentNode;
    svg = d3.select(svg);
    svg.on('click', function () {

        points.push(d3.mouse(this));
        canvas.selectAll('.point')
            .data(points)
            .attr('cx', function (d) { return d[0]; })
            .attr('cy', function (d) { return d[1]; })
          .enter()
          .append('circle')
            .attr('class', 'point')
            .attr('r', 3)
            .attr('fill', 'steelblue')
            .attr('cx', function (d) { return d[0]; })
            .attr('cy', function (d) { return d[1]; });

        canvas.selectAll('.link')
            .data(vo.links(points))
            .attr('x1', function (d) { return d.source[0]; })
            .attr('y1', function (d) { return d.source[1]; })
            .attr('x2', function (d) { return d.target[0]; })
            .attr('y2', function (d) { return d.target[1]; })
          .enter()
          .append('line')
            .attr('class', 'link')
            .attr('stroke', 'steelblue')
            .attr('x1', function (d) { return d.source[0]; })
            .attr('y1', function (d) { return d.source[1]; })
            .attr('x2', function (d) { return d.target[0]; })
            .attr('y2', function (d) { return d.target[1]; });

    });

    svg.on('dblclick', function () {
        console.log('清空画布');
        points = [];
        canvas.selectAll('*').remove();
    })
})();
