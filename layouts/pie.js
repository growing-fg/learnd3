// 饼图
(function () {
    var canvas = makeCanvas('饼图');

    var pie = d3.layout.pie();
    var piedata = pie(data);
    var outerRadius = 150;
    var innerRadius = 50;
    var color = d3.scale.category10();

    var arc = d3.svg.arc() // 弧度生成器
                .innerRadius(innerRadius)  // 内半径
                .outerRadius(outerRadius); // 外半径

    var arcs = canvas.selectAll('g')
        .data(piedata)
        .enter()
            .append('g')
            .attr('transform', 'translate(250, 250)');

    arcs.append('path')
        .attr('fill', function (d, i) { return color(i); })
        .attr('d', arc);

    arcs.append('text')
        .attr('transform', function (d) {
            return 'translate(' + arc.centroid(d) + ')';
        })
        .attr('text-anchor', 'middle')
        .text(function (d) { return d.data; });

})();
