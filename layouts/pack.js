
(function () {
    var canvas = makeCanvas('打包图');

    var pack = d3.layout.pack()
            .size([cw, ch])
            .radius(20); // 最小圆半径

    var color20 = d3.scale.category10();

    function paint (data) {
        var nodes = pack.nodes(data),
            links = pack.links(nodes);

        var circles = canvas.selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('transform', function (d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        circles.append('circle')
            .attr('fill', function (d) { return color20(d.depth)})
            .attr('fill-opacity', 0.5)
            .attr('r', function(d) { return d.r})
            .on('mouseover', function (d) {
                d3.select(this)
                    .attr('fill', 'steelblue');
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .transition()
                    .duration(400)
                    .attr('fill', function (d) { return color20(d.depth)})
        })

        circles.each(function (d, i) {
            if (d.children) return ;

            d3.select(this)
                .append('text')
                .attr('alignment-baseline', 'middle')
                .attr('text-anchor', 'middle')
                .attr('font-size', 11)
                .attr('fill', 'white')
                .text(function (d) { return d.name});
        })

    }

    d3.json('datas/city2.json', function (err, data) {
        if (err) console.log(err);
        else paint(data);
    });

})();
