(function () {

    var canvas = makeCanvas('拖拽地图');

    function paint(data) {

        var projection = d3.geo.mercator()
                .center([107, 31])
                .scale(420)
                .translate([cw / 2, ch / 2 ]);

        var path = d3.geo.path()
                .projection(projection);

        var force = d3.layout.force()
                .size([cw, ch])
                ;

        var color = d3.scale.category20();

        var provinces = canvas.selectAll('g.province')
            .data(data.features)
            .enter()
            .append('g')
            .each(function (d, i) {
                var c = path.centroid(d);
                // d[0] 和d[1] 用于计算三角形坐标
                d[0] = d.x = c[0];
                d[1] = d.y = c[1];

                d3.select(this)
                    .attr('transform', 'translate(' + d.x + ',' + d.y + ')')
                    .call(force.drag)
                    .append('path')
                    .attr('transform', 'translate(' + -d.x + ',' + -d.y + ')')
                    .attr('fill', function () { return color(i);})
                    .attr('stroke', '#ccc')
                    .attr('d', path)
                ;
            });

        var triangles = d3.geom.voronoi().triangles(data.features);
        var edges = [];

        triangles.forEach(function(d) {
            d.forEach(function(ds, i) {
                var dt = d[(i + 1) % d.length];
                var disx = dt.x - ds.x,
                    disy = dt.y - ds.y;

                edges.push({
                    source: ds,
                    target: d[(i + 1) % d.length],
                    distance: Math.sqrt(disx * disx + disy * disy)
                });
            });
        });

        var links = canvas.selectAll('line.province')
                .data(edges)
                .enter()
            .append('line')
                .attr({
                    class: 'province',
                    x1: function (d) { return d.source.x; },
                    x2: function (d) { return d.target.x; },
                    y1: function (d) { return d.source.y; },
                    y2: function (d) { return d.target.y; },
                    stroke: '#ccc'
                });

        force.on('tick', function() {
            provinces.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
            links.attr({
                x1: function (d) { return d.source.x; },
                x2: function (d) { return d.target.x; },
                y1: function (d) { return d.source.y; },
                y2: function (d) { return d.target.y; },
            });
        });

        force.charge(0)
            .gravity(0)
            .nodes(data.features)
            .links(edges)
            .linkDistance(function (d) { return d.distance; })
            .start();
    }

    d3.json('datas/china.geojson', function (err, data) {
        if (err) console.log(err);
        else paint(data);
    })

})();
